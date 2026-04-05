import { createClient } from '@/lib/supabase/server'
import { UserRepository } from '@/repositories/user.repository'
import { UserProfile, UserRole } from '@/types'

export class UsersService {
  private static async getClient() {
    return await createClient()
  }

  /**
   * Universal profile & researcher data fetch
   */
  static async getFullUserProfile(userId: string) {
    const supabase = await this.getClient()
    
    const [profile, researcher] = await Promise.all([
      UserRepository.getProfile(userId),
      supabase.from('researchers').select('*').eq('user_id', userId).single()
    ])

    return {
      ...profile,
      research_details: researcher.data || null
    }
  }

  /**
   * Admin: List all users categorized by their roles
   */
  static async getAllUsersWithRoles() {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*, user_roles(roles(name))')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  /**
   * Update researcher academic metadata
   */
  static async updateResearcherMetadata(userId: string, data: any) {
    const supabase = await this.getClient()
    const { data: updated, error } = await supabase
      .from('researchers')
      .update(data)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return updated
  }

  /**
   * Deactivate a user account (Admin only)
   */
  static async toggleUserStatus(userId: string, isActive: boolean) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ is_active: isActive })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
