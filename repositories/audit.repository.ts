import { createClient } from '@/lib/supabase/server'

export interface AuditLog {
  id: string
  user_id: string
  action: string
  resource_type: string
  resource_id: string
  details: any
  ip_address?: string
  created_at: string
  user_profiles?: {
    full_name: string
    email: string
  }
}

export class AuditRepository {
  private static async getClient() {
    return await createClient()
  }

  static async log(log: Omit<AuditLog, 'id' | 'created_at'>) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('audit_logs')
      .insert([log])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async list(limit = 100) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*, user_profiles(full_name, email)')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as AuditLog[]
  }

  static async listByUser(userId: string) {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*, user_profiles(full_name, email)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as AuditLog[]
  }
}
