import { createClient } from '@/lib/supabase/server'
import { Microorganism, LabStorageView } from '@/types'

export class MicroorganismRepository {
  private static async getClient() {
    return await createClient()
  }

  static async list(filters?: {
    strain_code?: string;
    scientific_name?: string;
    search?: string;
  }) {
    const supabase = await this.getClient()
    let query = supabase.from('microorganisms').select('*, lab_test_tubes(*, lab_partitions(*, lab_trays(*, lab_shelves(*, lab_fridges(*)))))')

    if (filters?.strain_code) query = query.ilike('strain_code', `%${filters.strain_code}%`)
    if (filters?.scientific_name) query = query.ilike('scientific_name', `%${filters.scientific_name}%`)
    if (filters?.search) {
      query = query.or(`scientific_name.ilike.%${filters.search}%,strain_code.ilike.%${filters.search}%,characteristics.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.order('scientific_name', { ascending: true })
    if (error) throw error
    return data
  }

  static async listByUserId(userId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('microorganisms')
      .select('*, lab_test_tubes(*, lab_partitions(*, lab_trays(*, lab_shelves(*, lab_fridges(*)))))')
      .eq('created_by', userId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data
  }

  static async getById(id: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('microorganisms')
      .select('*, lab_test_tubes(*, lab_partitions(*, lab_trays(*, lab_shelves(*, lab_fridges(*)))))')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  private static async resolveStorageHierarchy(supabase: any, labels: any) {
    if (!labels?.fridge_code || labels.fridge_code.trim() === '') return null;

    try {
      // 1. Resolve Fridge
      let { data: fridge, error: fError } = await supabase.from('lab_fridges').select('id').eq('code', labels.fridge_code).limit(1).maybeSingle();
      if (!fridge) {
        const { data: newFridge, error: fInsertError } = await supabase.from('lab_fridges').insert([{ code: labels.fridge_code }]).select('id').maybeSingle();
        if (fInsertError || !newFridge) {
          console.error('Fridge Resolution/Insert Error:', fInsertError);
          return null;
        }
        fridge = newFridge;
      }

      // 2. Resolve Shelf
      if (!labels.shelf_code || labels.shelf_code.trim() === '') return null;
      let { data: shelf, error: sError } = await supabase.from('lab_shelves').select('id').eq('code', labels.shelf_code).eq('fridge_id', fridge.id).limit(1).maybeSingle();
      if (!shelf) {
         const { data: newShelf, error: sInsertError } = await supabase.from('lab_shelves').insert([{ code: labels.shelf_code, fridge_id: fridge.id }]).select('id').maybeSingle();
         if (sInsertError || !newShelf) {
           console.error('Shelf Resolution/Insert Error:', sInsertError);
           return null;
         }
         shelf = newShelf;
      }

      // 3. Resolve Tray
      if (!labels.tray_code || labels.tray_code.trim() === '') return null;
      let { data: tray, error: tError } = await supabase.from('lab_trays').select('id').eq('code', labels.tray_code).eq('shelf_id', shelf.id).limit(1).maybeSingle();
      if (!tray) {
         const { data: newTray, error: tInsertError } = await supabase.from('lab_trays').insert([{ code: labels.tray_code, shelf_id: shelf.id }]).select('id').maybeSingle();
         if (tInsertError || !newTray) {
           console.error('Tray Resolution/Insert Error:', tInsertError);
           return null;
         }
         tray = newTray;
      }

      // 4. Resolve Partition
      if (!labels.partition_code || labels.partition_code.trim() === '') return null;
      let { data: part, error: pError } = await supabase.from('lab_partitions').select('id').eq('code', labels.partition_code).eq('tray_id', tray.id).limit(1).maybeSingle();
      if (!part) {
         const { data: newPart, error: pInsertError } = await supabase.from('lab_partitions').insert([{ code: labels.partition_code, tray_id: tray.id }]).select('id').maybeSingle();
         if (pInsertError || !newPart) {
           console.error('Partition Resolution/Insert Error:', pInsertError);
           return null;
         }
         part = newPart;
      }

      return part?.id;
    } catch (err) {
      console.error('Critical Storage Resolution Error:', err);
      return null;
    }
  }

  static async create(data: any) {
    const supabase = await this.getClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { storage_labels, id, created_at, updated_at, lab_test_tubes, ...microData } = data

    const { data: newMicro, error } = await supabase
      .from('microorganisms')
      .insert([{ ...microData, created_by: user.id }])
      .select()
      .single()

    if (error) throw error

    if (storage_labels) {
      const partition_id = await this.resolveStorageHierarchy(supabase, storage_labels);
      if (partition_id) {
        await supabase.from('lab_test_tubes').insert([{
          microorganism_id: newMicro.id,
          partition_id: partition_id,
          tube_label: storage_labels.tube_label || newMicro.strain_code
        }])
      }
    }

    return newMicro
  }

  static async update(id: string, data: any) {
    const supabase = await this.getClient()
    const { storage_labels, id: recordId, created_at, updated_at, lab_test_tubes, ...microData } = data

    const { data: updatedMicro, error } = await supabase
      .from('microorganisms')
      .update({ ...microData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (storage_labels) {
      console.log('🔄 Updating Storage for Microorganism:', id);
      
      const partition_id = await this.resolveStorageHierarchy(supabase, storage_labels);
      console.log('📍 Resolved Partition ID:', partition_id);
      
      if (partition_id) {
        // Only delete OLD test tube mapping if we successfully resolved a NEW partition
        const { error: delError } = await supabase.from('lab_test_tubes').delete().eq('microorganism_id', id)
        if (delError) throw new Error(`Failed to update storage mapping (delete): ${delError.message}`);
        
        const { error: storageError } = await supabase.from('lab_test_tubes').insert([{
          microorganism_id: id,
          partition_id: partition_id,
          tube_label: storage_labels.tube_label || updatedMicro.strain_code
        }])
        
        if (storageError) {
           console.error('❌ Storage Insert Error:', storageError);
           throw new Error(`Failed to update storage mapping (insert): ${storageError.message}`);
        } else {
           console.log('✅ Storage mapping updated successfully');
           // Fetch and log the final state to verify joins
           const { data: final } = await supabase.from('microorganisms')
             .select('*, lab_test_tubes(*, lab_partitions(*, lab_trays(*)))')
             .eq('id', id)
             .single();
           const finalTube = Array.isArray(final?.lab_test_tubes) ? final.lab_test_tubes[0] : final?.lab_test_tubes;
           console.log('🧐 Final Record Storage State:', JSON.stringify(finalTube, null, 2));
        }
      } else {
        // Check if all labels are empty to determine if user wants to CLEAR storage
        const allEmpty = !storage_labels.fridge_code && !storage_labels.shelf_code && !storage_labels.tray_code && !storage_labels.partition_code;
        if (allEmpty) {
          console.log('🗑️ Clearing storage mapping as requested (empty fields)');
          await supabase.from('lab_test_tubes').delete().eq('microorganism_id', id);
        } else {
          // If labels were provided but resolution failed, we don't throw but we log
          // Actually, let's throw if they provided codes but it couldn't be resolved (likely RLS)
          console.warn('⚠️ Storage resolution failed.');
          if (storage_labels.fridge_code) {
             throw new Error('Failed to resolve storage location. Are you sure you have permission to create new hardware codes?');
          }
        }
      }
    }

    return updatedMicro
  }

  static async delete(id: string) {
    const supabase = await this.getClient()
    const { error } = await supabase.from('microorganisms').delete().eq('id', id)
    if (error) throw error
    return true
  }

  static async getStorageView() {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('v_microorganism_storage')
      .select('*')
    if (error) throw error
    return data as LabStorageView[]
  }
}
