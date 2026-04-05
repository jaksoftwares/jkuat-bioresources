import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UserRole } from '@/types'

export async function protectRoute(allowedRoles: UserRole[], redirectTo = '/dashboard/overview') {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { data: roleData } = await supabase
    .from('user_roles')
    .select('roles(name)')
    .eq('user_id', user.id)
    .single()

  const userRole = (roleData?.roles as any)?.name as UserRole || 'public_user'

  // Only redirect if NOT authorized
  if (!allowedRoles.includes(userRole)) {
    // Avoid double redirect loop if already on the target
    if (redirectTo !== '/dashboard/overview') {
       redirect(redirectTo)
    } else {
       // Deeply restricted or generic fallback
       redirect('/login')
    }
  }

  return { user, role: userRole }
}

export async function getUserRole(): Promise<UserRole> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return 'public_user'

  const { data: roleData } = await supabase
    .from('user_roles')
    .select('roles(name)')
    .eq('user_id', user.id)
    .single()

  return (roleData?.roles as any)?.name as UserRole || 'public_user'
}
