import React from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Microscope, Edit, Eye, Trash2, Database } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { MicroorganismRepository } from '@/repositories/microorganism.repository'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { UserRole } from '@/types'

export default async function MicroorganismsManagementPage() {
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
  let micros = []
  if (role === 'researcher') {
    micros = await MicroorganismRepository.listByUserId(userId)
  } else {
    micros = await MicroorganismRepository.list()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Microscope className="w-6 h-6 text-indigo-600" />
            Microorganisms
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            {role === 'researcher' ? "Manage your microbial strains and research data." : "Manage all microbial collections."}
          </p>
        </div>
        <Link 
          href="/dashboard/microorganisms/add" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Strain
        </Link>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by scientific name, strain code..." 
                className="pl-9 bg-white border-slate-200 focus:ring-indigo-500/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2 text-slate-600 border-slate-200">
                <Database className="w-4 h-4" />
                Inventory
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                  <th className="px-6 py-4">Scientific Name</th>
                  <th className="px-6 py-4">Strain Code</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Storage Info</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {micros.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Microscope className="w-10 h-10 opacity-20" />
                        <p className="font-medium">No microorganisms found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  micros.map((micro) => (
                    <tr key={micro.id} className="hover:bg-indigo-50/20 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors italic">
                          {micro.scientific_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-indigo-600 font-bold bg-indigo-50/30 px-2 py-1 rounded inline-block">
                        {micro.strain_code || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {micro.source_isolated_from || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-400 font-medium">
                          {micro.growth_medium || 'No medium specified'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 uppercase">
                          Preserved
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
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
