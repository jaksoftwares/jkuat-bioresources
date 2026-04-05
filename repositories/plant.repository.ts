import { createClient } from '@/lib/supabase/server'
import { Plant } from '@/types'

export class PlantRepository {
  private static async getClient() {
    return await createClient()
  }

  static async list(filters?: {
    is_aiv?: boolean;
    category?: string;
    family_name?: string;
    search?: string;
  }) {
    const supabase = await this.getClient()
    let query = supabase.from('plants').select('*')

    if (filters?.is_aiv !== undefined) {
      query = query.eq('is_aiv', filters.is_aiv)
    }
    if (filters?.category) {
      query = query.ilike('category', `%${filters.category}%`)
    }
    if (filters?.family_name) {
      query = query.ilike('family_name', `%${filters.family_name}%`)
    }
    if (filters?.search) {
      query = query.or(`scientific_name.ilike.%${filters.search}%,common_name.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.order('scientific_name', { ascending: true })
    if (error) throw error
    return data as Plant[]
  }

  static async listByUserId(userId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .eq('created_by', userId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data as Plant[]
  }

  static async getById(id: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('plants')
      .select('*, plant_local_names(*), plant_recommendations(*)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  static async create(data: Partial<Plant>) {
    const supabase = await this.getClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Unauthorized')

    const { data: newPlant, error } = await supabase
      .from('plants')
      .insert([{ ...data, created_by: user.id, updated_by: user.id }])
      .select()
      .single()

    if (error) throw error
    return newPlant as Plant
  }

  static async update(id: string, data: Partial<Plant>) {
    const supabase = await this.getClient()
    const { data: updatedPlant, error } = await supabase
      .from('plants')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return updatedPlant as Plant
  }

  static async delete(id: string) {
    const supabase = await this.getClient()
    const { error } = await supabase.from('plants').delete().eq('id', id)
    if (error) throw error
    return true
  }

  static async addLocalName(plant_id: string, language_code: string, local_name: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('plant_local_names')
      .insert([{ plant_id, language_code, local_name }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async addRecommendation(plant_id: string, use_case: string, recommendation_text: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('plant_recommendations')
      .insert([{ plant_id, use_case, recommendation_text }])
      .select()
      .single()

    if (error) throw error
    return data
  }
}
