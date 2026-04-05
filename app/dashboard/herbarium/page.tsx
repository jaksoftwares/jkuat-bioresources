import React from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, BookOpen, Edit, Eye, Trash2, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { HerbariumRepository } from '@/repositories/herbarium.repository'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { UserRole } from '@/types'

export default async function HerbariumManagementPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id || 'dev-user-id'

  /* 
   * PRODUCTION RESTRICTION (TODO):
   * if (!user) return redirect('/login')
   */

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
  let specimens = []
  if (role === 'researcher') {
    specimens = await HerbariumRepository.listByUserId(userId)
  } else {
    specimens = await HerbariumRepository.list()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-600" />
            Herbarium Specimens
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            {role === 'researcher' ? "Manage your herbarium collection and voucher data." : "Manage all herbarium specimens."}
          </p>
        </div>
        <Link 
          href="/dashboard/herbarium/add" 
          className={cn(buttonVariants({ className: 'bg-amber-600 hover:bg-amber-700 text-white' }), "flex items-center gap-2")}
        >
          <Plus className="w-4 h-4" />
          Add Specimen
        </Link>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by scientific name, herbarium code..." 
                className="pl-9 bg-white border-slate-200 focus:ring-amber-500/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2 text-slate-600 border-slate-200">
                <Calendar className="w-4 h-4" />
                Collection Date
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                  <th className="px-6 py-4">Herbarium Code</th>
                  <th className="px-6 py-4">Scientific Name</th>
                  <th className="px-6 py-4">Collection Date</th>
                  <th className="px-6 py-4">Storage Location</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {specimens.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <BookOpen className="w-10 h-10 opacity-20" />
                        <p className="font-medium">No specimens found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  specimens.map((specimen) => (
                    <tr key={specimen.id} className="hover:bg-amber-50/20 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                          {specimen.herbarium_code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors italic">
                          {specimen.scientific_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {specimen.collection_date || 'Unknown'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-400 font-medium">
                          {specimen.physical_storage_location || 'Not assigned'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
