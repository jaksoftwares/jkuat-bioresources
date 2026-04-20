import React from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Leaf } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PlantRepository } from '@/repositories/plant.repository'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { UserRole } from '@/types'
import { PlantModal } from '@/components/dashboard/plant-modal'
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
        <h1 className="text-3xl font-extrabold text-jkuat-gray-900 tracking-tight">
          Plants
        </h1>
        <PlantModal mode="add" />
      </div>

      <Card className="border-jkuat-gray-200 shadow-card overflow-hidden bg-white rounded-xl">
        <CardContent className="p-0">
          <div className="p-4 border-b border-jkuat-gray-100 bg-jkuat-gray-50/50 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jkuat-gray-400 font-bold" />
              <Input 
                placeholder="Search resources..." 
                className="pl-9 bg-white border-jkuat-gray-200 focus:ring-jkuat-green/20 font-medium"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-jkuat-gray-700 border-jkuat-gray-200 font-semibold text-sm">
                Filters
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-jkuat-gray-100 text-sm font-semibold text-jkuat-gray-600 bg-jkuat-gray-50/30">
                  <th className="px-6 py-4">Scientific Name</th>
                  <th className="px-6 py-4">Common Name</th>
                  <th className="px-6 py-4">Family</th>
                  <th className="px-6 py-4">AIV Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jkuat-gray-100">
                {plants.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-jkuat-gray-400">
                      <p className="font-semibold text-sm uppercase tracking-widest">No plants found.</p>
                    </td>
                  </tr>
                ) : (
                  plants.map((plant) => (
                    <tr key={plant.id} className="hover:bg-jkuat-green-light/10 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-jkuat-gray-900 group-hover:text-jkuat-green transition-colors italic">
                          {plant.scientific_name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-jkuat-gray-700 font-medium">
                          {plant.common_name || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-jkuat-gray-500 italic">
                        {plant.family_name || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {plant.is_aiv ? (
                          <span className="text-jkuat-green-dark font-bold">AIV</span>
                        ) : (
                          <span className="text-jkuat-gray-400">Standard</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-jkuat-gray-500 font-medium">
                        {new Date(plant.updated_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <PlantRowActions plant={plant} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between text-xs font-semibold text-jkuat-gray-400 px-2 uppercase tracking-widest">
        <span>Showing {plants.length} records</span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="xs" disabled className="h-7 w-7 p-0">&lt;</Button>
          <Button variant="outline" size="xs" className="h-7 border-jkuat-green/20 text-jkuat-green bg-jkuat-green-light/30 font-semibold">1</Button>
          <Button variant="outline" size="xs" disabled className="h-7 w-7 p-0">&gt;</Button>
        </div>
      </div>
    </div>
  )
}
