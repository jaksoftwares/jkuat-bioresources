import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { UserRole } from '@/types'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/login')
  }
  
  // Fetch user role
  let role: UserRole = 'public_user'
  
  const { data: roleProfile } = await supabase
    .from('user_roles')
    .select('roles(name)')
    .eq('user_id', user.id)
    .single()
  
  role = (roleProfile?.roles as any)?.name || 'public_user'

  return (
    <div className="flex min-h-screen bg-jkuat-gray-200/20">
      <DashboardSidebar userRole={role} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-jkuat-gray-200 sticky top-0 z-30 flex items-center justify-between px-6">
          <h2 className="text-sm font-bold text-jkuat-gray-500 uppercase tracking-widest">
            Dashboard / {role.replace('_', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-jkuat-gray-900">{user.email?.split('@')[0]}</span>
              <span className="text-[10px] text-jkuat-green font-black uppercase tracking-tight">{role}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-jkuat-green-light border border-jkuat-green/20 flex items-center justify-center text-jkuat-green font-bold shadow-sm">
              {user.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
