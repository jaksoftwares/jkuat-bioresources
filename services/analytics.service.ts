import { createClient } from '@/lib/supabase/server'

export class AnalyticsService {
  private static async getClient() {
    return await createClient()
  }

  /**
   * Summary overview the dashboard
   */
  static async getDashboardSummary() {
    const supabase = await this.getClient()

    const [plants, microorganisms, herbarium, aivs] = await Promise.all([
      supabase.from('plants').select('id', { count: 'exact', head: true }),
      supabase.from('microorganisms').select('id', { count: 'exact', head: true }),
      supabase.from('herbarium_specimens').select('id', { count: 'exact', head: true }),
      supabase.from('plants').select('id', { count: 'exact', head: true }).eq('is_aiv', true)
    ])

    // Get researcher count
    const { count: researcherCount } = await supabase
      .from('researchers')
      .select('id', { count: 'exact', head: true })

    return {
      plantCount: plants.count || 0,
      microorganismCount: microorganisms.count || 0,
      herbariumCount: herbarium.count || 0,
      aivCount: aivs.count || 0,
      researcherCount: researcherCount || 0
    }
  }

  /**
   * Fetch a stream of recent additions across all bioresource types
   */
  static async getRecentAdditions(limit: number = 5) {
    const supabase = await this.getClient()

    // Combining multiple queries for recent records
    const [plants, microorganisms, herbarium] = await Promise.all([
      supabase.from('plants').select('id, scientific_name, created_at').order('created_at', { ascending: false }).limit(limit),
      supabase.from('microorganisms').select('id, scientific_name, created_at').order('created_at', { ascending: false }).limit(limit),
      supabase.from('herbarium_specimens').select('id, scientific_name, created_at').order('created_at', { ascending: false }).limit(limit)
    ])

    const allItems = [
      ...(plants.data || []).map(i => ({ ...i, type: 'plant' })),
      ...(microorganisms.data || []).map(i => ({ ...i, type: 'microorganism' })),
      ...(herbarium.data || []).map(i => ({ ...i, type: 'herbarium' }))
    ]

    return allItems
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)
  }
}
