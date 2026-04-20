import React from 'react'
import Link from 'next/link'
import { 
  Leaf, 
  Microscope, 
  BookOpen, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  TrendingUp, 
  UploadCloud,
  Users,
  ShieldAlert,
  Activity,
  History,
  Database
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { UserRole } from '@/types'
import { getUserRole, protectRoute } from '@/lib/auth/role-guard'

export default async function DashboardOverview() {
  // Consolidate Auth & RBAC checks into a single secure call
  const { user, role } = await protectRoute(['technical_team', 'administrator', 'researcher', 'public_user'])
  
  const supabase = await createClient()
  const userId = user.id
  const isAdminOrTech = role === 'administrator' || role === 'technical_team'

  // Optimized parallel data fetching
  const [plantsRes, microsRes, herbariumRes] = await Promise.all([
    isAdminOrTech 
      ? supabase.from('plants').select('*', { count: 'exact', head: true })
      : supabase.from('plants').select('*', { count: 'exact', head: true }).eq('created_by', userId),
    isAdminOrTech
      ? supabase.from('microorganisms').select('*', { count: 'exact', head: true })
      : supabase.from('microorganisms').select('*', { count: 'exact', head: true }).eq('created_by', userId),
    isAdminOrTech
      ? supabase.from('herbarium_specimens').select('*', { count: 'exact', head: true })
      : supabase.from('herbarium_specimens').select('*', { count: 'exact', head: true }).eq('created_by', userId)
  ])

  const plantCount = plantsRes.count || 0
  const microCount = microsRes.count || 0
  const herbariumCount = herbariumRes.count || 0

  const stats = [
    { 
      name: 'Plants', 
      value: plantCount || 0, 
      icon: Leaf, 
      color: 'text-jkuat-green', 
      bg: 'bg-jkuat-green-light' 
    },
    { 
      name: 'Microorganisms', 
      value: microCount || 0, 
      icon: Microscope, 
      color: 'text-jkuat-green-dark', 
      bg: 'bg-jkuat-green-light/60' 
    },
    { 
      name: 'Herbarium', 
      value: herbariumCount || 0, 
      icon: BookOpen, 
      color: 'text-jkuat-gold', 
      bg: 'bg-jkuat-gold-light' 
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">
            Overview
          </h1>
          <p className="text-jkuat-gray-500 mt-1 text-sm font-semibold uppercase tracking-widest leading-relaxed">
            Biological repository status and records
          </p>
        </div>
        {isAdminOrTech && (
          <div className="flex items-center gap-3">
             <Link href="/dashboard/audit" className="text-xs font-bold uppercase tracking-widest text-jkuat-gray-400 hover:text-jkuat-green transition-colors px-4">
                Logs
             </Link>
             <Link href="/dashboard/reports" className="px-6 py-3 rounded-xl bg-jkuat-green hover:bg-jkuat-green-dark text-xs font-bold uppercase tracking-widest transition-all shadow-card text-white">
                Reports
             </Link>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="overflow-hidden border-jkuat-gray-200 transition-all hover:shadow-card group rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-jkuat-gray-400 uppercase tracking-widest">{stat.name}</span>
                  <span className="text-4xl font-extrabold text-jkuat-gray-900 mt-1">{stat.value}</span>
                </div>
                <div className={cn("p-4 rounded-xl group-hover:scale-110 transition-transform duration-300", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-jkuat-gray-100 flex items-center justify-end">
                <Link href={stat.name.includes('Plant') ? '/dashboard/plants' : stat.name.includes('Micro') ? '/dashboard/microorganisms' : '/dashboard/herbarium'} className="text-[10px] font-bold text-jkuat-green uppercase tracking-widest hover:underline">
                  Manage
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 border-jkuat-gray-200 shadow-card overflow-hidden bg-white rounded-xl">
          <CardHeader className="border-b border-jkuat-gray-100 bg-jkuat-gray-50/50">
              <CardTitle className="text-xs font-semibold text-jkuat-gray-400 uppercase tracking-widest">
                Quick Access
              </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
            <Link 
              href="/dashboard/plants" 
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-jkuat-gray-200 hover:border-jkuat-green hover:bg-jkuat-green-light/20 transition-all group"
            >
              <span className="font-bold text-xs uppercase tracking-widest text-jkuat-gray-700">Plants</span>
            </Link>
            <Link 
              href="/dashboard/microorganisms" 
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-jkuat-gray-200 hover:border-jkuat-green hover:bg-jkuat-green-light/20 transition-all group"
            >
              <span className="font-bold text-xs uppercase tracking-widest text-jkuat-gray-700">Microbes</span>
            </Link>
            <Link 
              href="/dashboard/herbarium" 
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-jkuat-gray-200 hover:border-jkuat-green hover:bg-jkuat-green-light/20 transition-all group"
            >
              <span className="font-bold text-xs uppercase tracking-widest text-jkuat-gray-700">Herbarium</span>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-jkuat-gray-200 shadow-card flex flex-col rounded-xl">
          <CardHeader className="border-b border-jkuat-gray-100 bg-jkuat-gray-50/50 py-4.5">
            <CardTitle className="text-xs font-semibold text-jkuat-gray-400 uppercase tracking-widest">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-jkuat-gray-100">
                {[1, 2, 3].map((i) => (
                   <div key={i} className="flex items-center gap-4 p-4 hover:bg-jkuat-gray-50/20 transition-all cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-jkuat-gray-100 flex items-center justify-center flex-shrink-0">
                      {i % 2 === 0 ? <Microscope className="w-4 h-4 text-jkuat-green" /> : <Leaf className="w-4 h-4 text-jkuat-green" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-jkuat-gray-700 truncate text-xs uppercase tracking-tight">
                        {i === 2 ? 'Microbial Strain' : 'Botanical Record'}
                      </p>
                      <p className="text-[10px] text-jkuat-gray-400 font-semibold uppercase tracking-widest mt-0.5">
                        {i + 1}h ago
                      </p>
                    </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
