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
  
  // DEVELOPMENT ONLY: bypass auth restrictions
  const devUser = user || { id: 'dev-user-id', email: 'researcher@jkuat.ac.ke' }

  /* 
   * PRODUCTION RESTRICTION (TODO):
   * if (authError || !user) {
   *   redirect('/login')
   * }
   */
  
  // Fetch user role if user exists, otherwise default to researcher for dev
  let role: UserRole = 'researcher'
  
  if (user) {
    const { data: roleProfile } = await supabase
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', user.id)
      .single()
    
    role = (roleProfile?.roles as any)?.name || 'public_user'
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <DashboardSidebar userRole={role} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Dashboard / {role.replace('_', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-900">{devUser.email?.split('@')[0]}</span>
              <span className="text-[10px] text-teal-600 font-bold uppercase">{role}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold">
              {devUser.email?.[0].toUpperCase()}
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
