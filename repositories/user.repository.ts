import { createClient } from '@/lib/supabase/server'
import { UserProfile, UserRole } from '@/types'

export class UserRepository {
  private static async getClient() {
    return await createClient()
  }

  static async getProfile(userId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*, user_roles(roles(name))')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  }

  static async updateProfile(userId: string, data: Partial<UserProfile>) {
    const supabase = await this.getClient()
    const { data: updatedProfile, error } = await supabase
      .from('user_profiles')
      .update(data)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return updatedProfile as UserProfile
  }

  static async listByRole(roleName: UserRole) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*, user_roles!inner(roles!inner(name))')
      .eq('user_roles.roles.name', roleName)

    if (error) throw error
    return data as UserProfile[]
  }

  static async assignRole(userId: string, roleName: UserRole) {
    const supabase = await this.getClient()
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', roleName)
      .single()

    if (roleError) throw roleError

    const { data, error } = await supabase
      .from('user_roles')
      .upsert([{ user_id: userId, role_id: roleData.id }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async checkRole(userId: string, roleName: UserRole) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', userId)
      .eq('roles.name', roleName)

    if (error || !data) return false
    return data.length > 0
  }
}
