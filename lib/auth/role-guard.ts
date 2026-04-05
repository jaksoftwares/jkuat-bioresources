import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UserRole } from '@/types'

export async function protectRoute(allowedRoles: UserRole[], redirectTo = '/dashboard/overview') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: roleProfile } = await supabase
    .from('user_roles')
    .select('roles(name)')
    .eq('user_id', user.id)
    .single()

  const userRole = (roleProfile?.roles as any)?.name as UserRole

  if (!allowedRoles.includes(userRole)) {
    redirect(redirectTo)
  }

  return user
}

export async function getUserRole(): Promise<UserRole> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return 'public_user'

  const { data: roleProfile } = await supabase
    .from('user_roles')
    .select('roles(name)')
    .eq('user_id', user.id)
    .single()

  return (roleProfile?.roles as any)?.name || 'public_user'
}
