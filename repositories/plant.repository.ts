import { createClient } from '@/lib/supabase/server'
import { Plant } from '@/types'
import { deleteMediaAssets, deleteRemovedMedia } from '@/actions/media-actions'

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
      query = query.ilike('botanical_information->>life_form', `%${filters.category}%`)
    }
    if (filters?.family_name) {
      query = query.ilike('taxonomic_information->>family', `%${filters.family_name}%`)
    }
    if (filters?.search) {
      query = query.or(`taxonomic_information->>genus.ilike.%${filters.search}%,taxonomic_information->>species.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return data as any[]
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

  static async create(data: any) {
    const supabase = await this.getClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { local_names, recommendations, id, created_at, updated_at, ...plantData } = data
    
    // Explicitly exclude any relational joined data that might be in the object
    const cleanedPlantData = { ...plantData }
    delete (cleanedPlantData as any).plant_local_names
    delete (cleanedPlantData as any).plant_recommendations

    const { data: newPlant, error } = await supabase
      .from('plants')
      .insert([{ ...cleanedPlantData, created_by: user.id, updated_by: user.id }])
      .select()
      .single()

    if (error) throw error

    if (local_names && local_names.length > 0) {
      const namesPayload = local_names.map((ln: any) => ({ ...ln, plant_id: newPlant.id }))
      await supabase.from('plant_local_names').insert(namesPayload)
    }

    if (recommendations && recommendations.length > 0) {
      const recsPayload = recommendations.map((r: any) => ({ ...r, plant_id: newPlant.id }))
      await supabase.from('plant_recommendations').insert(recsPayload)
    }

    return newPlant as Plant
  }

  static async update(id: string, data: any) {
    const supabase = await this.getClient()
    const { data: previousPlant } = await supabase.from('plants').select('images').eq('id', id).single()
    const { local_names, recommendations, id: rId, created_at, updated_at, ...plantData } = data

    const cleanedPlantData = { ...plantData }
    delete (cleanedPlantData as any).plant_local_names
    delete (cleanedPlantData as any).plant_recommendations

    const { data: updatedPlant, error } = await supabase
      .from('plants')
      .update({ ...cleanedPlantData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (local_names) {
      await supabase.from('plant_local_names').delete().eq('plant_id', id)
      if (local_names.length > 0) {
        const namesPayload = local_names.map((ln: any) => ({
          language: ln.language,
          name: ln.name,
          region: ln.region,
          plant_id: id 
        }))
        await supabase.from('plant_local_names').insert(namesPayload)
      }
    }

    if (recommendations) {
      await supabase.from('plant_recommendations').delete().eq('plant_id', id)
      if (recommendations.length > 0) {
        const recsPayload = recommendations.map((r: any) => ({
          recommendation_type: r.recommendation_type,
          description: r.description,
          source_reference: r.source_reference,
          plant_id: id
        }))
        await supabase.from('plant_recommendations').insert(recsPayload)
      }
    }

    await deleteRemovedMedia(previousPlant?.images, updatedPlant.images)
    return updatedPlant as Plant
  }

  static async delete(id: string) {
    const supabase = await this.getClient()
    const { data: plant } = await supabase.from('plants').select('images').eq('id', id).single()
    const { error } = await supabase.from('plants').delete().eq('id', id)
    if (error) throw error
    await deleteMediaAssets(plant?.images)
    return true
  }

  static async addLocalName(plant_id: string, language: string, name: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('plant_local_names')
      .insert([{ plant_id, language, name }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}
