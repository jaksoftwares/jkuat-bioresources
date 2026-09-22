import { createClient } from '@/lib/supabase/server'
import { deleteMediaAssets, deleteRemovedMedia } from '@/actions/media-actions'
import { HerbariumSpecimen } from '@/types'

export class HerbariumRepository {
  private static async getClient() {
    return await createClient()
  }

  static async list(filters?: {
    herbarium_code?: string;
    scientific_name?: string;
    search?: string;
  }) {
    const supabase = await this.getClient()
    let query = supabase.from('herbarium_specimens').select('*')

    if (filters?.herbarium_code) query = query.ilike('specimen_details->>herbarium_code', `%${filters.herbarium_code}%`)
    if (filters?.scientific_name) {
      query = query.or(`taxonomic_information->>genus.ilike.%${filters.scientific_name}%,taxonomic_information->>species.ilike.%${filters.scientific_name}%`)
    }
    if (filters?.search) {
      query = query.or(`taxonomic_information->>genus.ilike.%${filters.search}%,taxonomic_information->>species.ilike.%${filters.search}%,specimen_details->>herbarium_code.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return data as any[]
  }

  static async listByUserId(userId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('herbarium_specimens')
      .select('*')
      .eq('created_by', userId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data as HerbariumSpecimen[]
  }

  static async getById(id: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('herbarium_specimens')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as HerbariumSpecimen
  }

  static async create(data: any) {
    const supabase = await this.getClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { id, created_at, updated_at, ...specimenData } = data

    const { data: newSpecimen, error } = await supabase
      .from('herbarium_specimens')
      .insert([{ ...specimenData, created_by: user.id }])
      .select()
      .single()

    if (error) throw error
    return newSpecimen as HerbariumSpecimen
  }

  static async update(id: string, data: any) {
    const supabase = await this.getClient()
    const { data: previousSpecimen } = await supabase.from('herbarium_specimens').select('specimen_images').eq('id', id).single()
    const { id: recordId, created_at, updated_at, ...specimenData } = data

    const { data: updatedSpecimen, error } = await supabase
      .from('herbarium_specimens')
      .update({ ...specimenData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    await deleteRemovedMedia(previousSpecimen?.specimen_images, updatedSpecimen.specimen_images)
    return updatedSpecimen as HerbariumSpecimen
  }

  static async delete(id: string) {
    const supabase = await this.getClient()
    const { data: specimen } = await supabase.from('herbarium_specimens').select('specimen_images').eq('id', id).single()
    const { error } = await supabase.from('herbarium_specimens').delete().eq('id', id)
    if (error) throw error
    await deleteMediaAssets(specimen?.specimen_images)
    return true
  }
}
