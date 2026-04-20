import Link from 'next/link'
import { Plus, Search, Filter, BookOpen, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { HerbariumRepository } from '@/repositories/herbarium.repository'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { UserRole } from '@/types'
import { HerbariumModal } from '@/components/dashboard/herbarium-modal'
import { HerbariumRowActions } from '@/components/dashboard/herbarium-row-actions'

export default async function HerbariumManagementPage() {
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
  let herbariums = []
  if (role === 'researcher') {
    herbariums = await HerbariumRepository.listByUserId(userId)
  } else {
    herbariums = await HerbariumRepository.list()
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">
            Herbarium
          </h1>
          <p className="text-jkuat-gray-500 mt-2 text-sm font-semibold uppercase tracking-widest leading-relaxed">
            Manage botanical specimens and voucher collections
          </p>
        </div>
        <HerbariumModal mode="add" />
      </div>

      <Card className="border-jkuat-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
        <CardContent className="p-0">
          <div className="p-6 border-b border-jkuat-gray-100 bg-jkuat-gray-50/50 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jkuat-gray-400 font-bold" />
              <Input 
                placeholder="Search herbarium code or scientific name..." 
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
                  <th className="px-6 py-4">Specimen Info</th>
                  <th className="px-6 py-4">Storage Location</th>
                  <th className="px-6 py-4">Date Collected</th>
                  <th className="px-6 py-4">Common Name</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jkuat-gray-100">
                {herbariums.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-jkuat-gray-400">
                      <p className="font-semibold text-sm uppercase tracking-widest">No herbarium specimens found.</p>
                    </td>
                  </tr>
                ) : (
                  herbariums.map((item) => (
                    <tr key={item.id} className="hover:bg-jkuat-green-light/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-jkuat-gray-900 group-hover:text-jkuat-green transition-colors italic">
                            {item.scientific_name}
                          </span>
                          <span className="text-[10px] font-bold text-jkuat-gray-400 uppercase tracking-widest mt-0.5">{item.herbarium_code}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-jkuat-gray-700 font-semibold uppercase tracking-tight">
                          {item.physical_storage_location || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-jkuat-gray-500 font-medium">
                        {item.collection_date ? new Date(item.collection_date).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-xs font-bold text-jkuat-gray-600 bg-jkuat-gray-100 px-2.5 py-1 rounded-md border border-jkuat-gray-200 uppercase tracking-widest">
                           {item.common_name || '—'}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <HerbariumRowActions specimen={item} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between text-[10px] font-bold text-jkuat-gray-400 px-2 uppercase tracking-widest border-t border-jkuat-gray-100 pt-6">
        <span>Showing {herbariums.length} specimens</span>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0 rounded-md border-jkuat-gray-200">&lt;</Button>
          <Button variant="outline" size="sm" className="h-8 min-w-[32px] px-2 border-jkuat-green/20 text-jkuat-green bg-jkuat-green-light/10 font-bold">1</Button>
          <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0 rounded-md border-jkuat-gray-200">&gt;</Button>
        </div>
      </div>
    </div>
  )
}
