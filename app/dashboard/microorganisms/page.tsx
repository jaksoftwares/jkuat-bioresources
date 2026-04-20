import Link from 'next/link'
import { Plus, Search, Filter, Microscope, Database } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { MicroorganismRepository } from '@/repositories/microorganism.repository'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { UserRole } from '@/types'
import { MicroorganismModal } from '@/components/dashboard/microorganism-modal'
import { MicroorganismRowActions } from '@/components/dashboard/microorganism-row-actions'

export default async function MicroorganismsManagementPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id || 'dev-user-id'

  // Fetch role
  let role: UserRole = 'researcher'
  if (user) {
    const { data: roleProfile } = await supabase
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', user.id)
      .single()
    role = (roleProfile?.roles as any)?.name || 'public_user'
  }
  
  // Fetch data
  let microorganisms = []
  if (role === 'researcher') {
    microorganisms = await MicroorganismRepository.listByUserId(userId)
  } else {
    microorganisms = await MicroorganismRepository.list()
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">
            Microorganisms
          </h1>
          <p className="text-jkuat-gray-500 mt-2 text-sm font-semibold uppercase tracking-widest leading-relaxed">
            Manage research strains and isolation records
          </p>
        </div>
        <MicroorganismModal mode="add" />
      </div>

      <Card className="border-jkuat-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
        <CardContent className="p-0">
          <div className="p-6 border-b border-jkuat-gray-100 bg-jkuat-gray-50/50 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jkuat-gray-400 font-bold" />
              <Input 
                placeholder="Search strains..." 
                className="pl-9 bg-white border-jkuat-gray-200 focus:ring-jkuat-green/20 font-medium h-11"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-jkuat-gray-700 border-jkuat-gray-200 font-semibold text-sm h-11 px-6">
                Filters
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-jkuat-gray-100 text-sm font-semibold text-jkuat-gray-600 bg-jkuat-gray-50/30">
                  <th className="px-6 py-4">Strain Info</th>
                  <th className="px-6 py-4">Isolation Source</th>
                  <th className="px-6 py-4">Growth Media</th>
                  <th className="px-6 py-4">Storage Info</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jkuat-gray-100">
                {microorganisms.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-jkuat-gray-400">
                      <p className="font-semibold text-sm uppercase tracking-widest">No microorganisms found.</p>
                    </td>
                  </tr>
                ) : (
                  microorganisms.map((item) => (
                    <tr key={item.id} className="hover:bg-jkuat-green-light/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-jkuat-gray-900 group-hover:text-jkuat-green transition-colors italic">
                            {item.scientific_name}
                          </span>
                          <span className="text-[10px] font-bold text-jkuat-gray-400 uppercase tracking-widest mt-0.5">{item.strain_code || 'No Strain Code'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-jkuat-gray-700 font-semibold uppercase tracking-tight">
                          {item.source_isolated_from || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-jkuat-gray-600 bg-jkuat-gray-100 px-2.5 py-1 rounded-md border border-jkuat-gray-200 uppercase tracking-widest">
                           {item.growth_medium || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex flex-col">
                           <span className="text-sm text-jkuat-gray-600 font-medium">{item.date_stored || '—'}</span>
                           <span className="text-[10px] text-jkuat-gray-400 font-bold uppercase tracking-widest">Date Stored</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <MicroorganismRowActions microorganism={item} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between text-[10px] font-bold text-jkuat-gray-400 px-2 uppercase tracking-widest">
        <span>Showing {microorganisms.length} records</span>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0 rounded-md border-jkuat-gray-200">&lt;</Button>
          <Button variant="outline" size="sm" className="h-8 min-w-[32px] px-2 border-jkuat-green/20 text-jkuat-green bg-jkuat-green-light/10 font-bold">1</Button>
          <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0 rounded-md border-jkuat-gray-200">&gt;</Button>
        </div>
      </div>
    </div>
  )
}
