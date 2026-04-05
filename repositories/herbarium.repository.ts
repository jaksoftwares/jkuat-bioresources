import { createClient } from '@/lib/supabase/server'
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

    if (filters?.herbarium_code) query = query.ilike('herbarium_code', `%${filters.herbarium_code}%`)
    if (filters?.scientific_name) query = query.ilike('scientific_name', `%${filters.scientific_name}%`)
    if (filters?.search) {
      query = query.or(`scientific_name.ilike.%${filters.search}%,herbarium_code.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.order('herbarium_code', { ascending: true })
    if (error) throw error
    return data as HerbariumSpecimen[]
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

  static async create(data: Partial<HerbariumSpecimen>) {
    const supabase = await this.getClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: newSpecimen, error } = await supabase
      .from('herbarium_specimens')
      .insert([{ ...data, created_by: user.id }])
      .select()
      .single()

    if (error) throw error
    return newSpecimen as HerbariumSpecimen
  }

  static async update(id: string, data: Partial<HerbariumSpecimen>) {
    const supabase = await this.getClient()
    const { data: updatedSpecimen, error } = await supabase
      .from('herbarium_specimens')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return updatedSpecimen as HerbariumSpecimen
  }

  static async delete(id: string) {
    const supabase = await this.getClient()
    const { error } = await supabase.from('herbarium_specimens').delete().eq('id', id)
    if (error) throw error
    return true
  }
}
