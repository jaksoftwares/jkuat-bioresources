import { createClient } from '@/lib/supabase/server'
import { UserRepository } from '@/repositories/user.repository'

export class AuthService {
  private static async getClient() {
    return await createClient()
  }

  /**
   * Complex signUp that also updates user profile and metadata in one flow
   */
  static async registerResearcher(data: any) {
    const supabase = await this.getClient()
    
    // Auth Signup first
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name
        }
      }
    })

    if (authError) throw authError
    if (!authData.user) throw new Error('Auth registration failed')

    // Profile creation is already handled by our SQL on_auth_user_created trigger.
    // However, we can manually enrich it or assign roles here.
    
    // Assign researcher role (default)
    await UserRepository.assignRole(authData.user.id, 'researcher')

    // Create research metadata
    const { error: metaError } = await supabase
      .from('researchers')
      .insert([{
        user_id: authData.user.id,
        qualification: data.qualification,
        specialization: data.specialization,
        research_focus: data.research_focus,
        institution: data.institution || 'JKUAT'
      }])

    if (metaError) throw metaError

    return authData.user
  }

  /**
   * Returns current user identity with roles and profile in one call
   */
  static async getFullSession() {
    const supabase = await this.getClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const profile = await UserRepository.getProfile(user.id)
    return {
      user,
      profile,
      roles: profile.user_roles.map((ur: any) => ur.roles.name)
    }
  }
}
