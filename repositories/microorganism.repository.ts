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
    let query = supabase.from('microorganisms').select('*')

    if (filters?.strain_code) query = query.ilike('strain_code', `%${filters.strain_code}%`)
    if (filters?.scientific_name) query = query.ilike('scientific_name', `%${filters.scientific_name}%`)
    if (filters?.search) {
      query = query.or(`scientific_name.ilike.%${filters.search}%,strain_code.ilike.%${filters.search}%,characteristics.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.order('scientific_name', { ascending: true })
    if (error) throw error
    return data as Microorganism[]
  }

  static async getById(id: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('microorganisms')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Microorganism
  }

  static async create(data: Partial<Microorganism>) {
    const supabase = await this.getClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: newMicro, error } = await supabase
      .from('microorganisms')
      .insert([{ ...data, created_by: user.id }])
      .select()
      .single()

    if (error) throw error
    return newMicro as Microorganism
  }

  static async update(id: string, data: Partial<Microorganism>) {
    const supabase = await this.getClient()
    const { data: updatedMicro, error } = await supabase
      .from('microorganisms')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return updatedMicro as Microorganism
  }

  /**
   * Complex storage mapping: Fridge -> Shelf -> Tray -> Partition -> Test Tube
   */
  static async assignStorage(input: {
    microorganism_id: string;
    partition_id: string;
    tube_label: string;
  }) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('lab_test_tubes')
      .upsert([{
        microorganism_id: input.microorganism_id,
        partition_id: input.partition_id,
        tube_label: input.tube_label
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getStorageView() {
    const supabase = await this.getClient()
    // Using the view we created in the migration
    const { data, error } = await supabase
      .from('v_microorganism_storage')
      .select('*')

    if (error) throw error
    return data as LabStorageView[]
  }
}
