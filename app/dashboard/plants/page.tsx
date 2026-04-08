import React from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Leaf } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PlantRepository } from '@/repositories/plant.repository'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { UserRole } from '@/types'
import { PlantRowActions } from '@/components/dashboard/plant-row-actions'

export default async function PlantsManagementPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id || 'dev-user-id'

  /* 
   * PRODUCTION RESTRICTION (TODO):
   * if (!user) return redirect('/login')
   */

  // Fetch the user's role
  let role: UserRole = 'researcher'
  if (user) {
    const { data: roleProfile } = await supabase
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', user.id)
      .single()
    role = (roleProfile?.roles as any)?.name || 'public_user'
  }
  
  // Fetch plants based on role
  let plants = []
  if (role === 'researcher') {
    plants = await PlantRepository.listByUserId(userId)
  } else {
    plants = await PlantRepository.list() // Admins/Tech Team see everything
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Leaf className="w-6 h-6 text-teal-600" />
            Plant Resources
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            {role === 'researcher' ? "Manage your uploaded plant species and varieties." : "Manage all platform plant data."}
          </p>
        </div>
        <Link 
          href="/dashboard/plants/add" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Plant
        </Link>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by scientific or common name..." 
                className="pl-9 bg-white border-slate-200 focus:ring-teal-500/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2 text-slate-600 border-slate-200">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                  <th className="px-6 py-4">Scientific Name</th>
                  <th className="px-6 py-4">Common Name</th>
                  <th className="px-6 py-4">Family</th>
                  <th className="px-6 py-4">AIV Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {plants.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Leaf className="w-10 h-10 opacity-20" />
                        <p className="font-medium">No plants found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  plants.map((plant) => (
                    <tr key={plant.id} className="hover:bg-teal-50/20 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors italic">
                          {plant.scientific_name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600 font-medium">
                          {plant.common_name || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 italic">
                        {plant.family_name || '—'}
                      </td>
                      <td className="px-6 py-4">
                        {plant.is_aiv ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 uppercase">
                            AIV
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 font-medium tracking-tight">
                        {new Date(plant.updated_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <PlantRowActions plantId={plant.id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-2 uppercase tracking-widest">
        <span>Showing {plants.length} resources</span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="xs" disabled className="h-7 w-7 p-0">&lt;</Button>
          <Button variant="outline" size="xs" className="h-7 border-teal-200 text-teal-700 bg-teal-50">1</Button>
          <Button variant="outline" size="xs" disabled className="h-7 w-7 p-0">&gt;</Button>
        </div>
      </div>
    </div>
  )
}
