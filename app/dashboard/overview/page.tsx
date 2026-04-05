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
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { UserRole } from '@/types'
import { getUserRole, protectRoute } from '@/lib/auth/role-guard'

export default async function DashboardOverview() {
  // Ensure user is logged in
  const user = await protectRoute(['technical_team', 'administrator', 'researcher', 'public_user'])
  const role = await getUserRole()
  
  const supabase = await createClient()
  const userId = user.id
  
  const isAdminOrTech = role === 'administrator' || role === 'technical_team'

  // Fetch counts based on role
  const { count: plantCount } = await (isAdminOrTech 
    ? supabase.from('plants').select('*', { count: 'exact', head: true })
    : supabase.from('plants').select('*', { count: 'exact', head: true }).eq('created_by', userId))

  const { count: microCount } = await (isAdminOrTech
    ? supabase.from('microorganisms').select('*', { count: 'exact', head: true })
    : supabase.from('microorganisms').select('*', { count: 'exact', head: true }).eq('created_by', userId))

  const { count: herbariumCount } = await (isAdminOrTech
    ? supabase.from('herbarium_specimens').select('*', { count: 'exact', head: true })
    : supabase.from('herbarium_specimens').select('*', { count: 'exact', head: true }).eq('created_by', userId))

  const stats = [
    { 
      name: isAdminOrTech ? 'Global Biodiversity' : 'My Contributions', 
      value: plantCount || 0, 
      icon: Leaf, 
      color: 'text-teal-600', 
      bg: 'bg-teal-50' 
    },
    { 
      name: isAdminOrTech ? 'Total Microbes' : 'My Cultures', 
      value: microCount || 0, 
      icon: Microscope, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50' 
    },
    { 
      name: isAdminOrTech ? 'Specimens' : 'My Specimens', 
      value: herbariumCount || 0, 
      icon: BookOpen, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50' 
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {isAdminOrTech ? 'Management Dashboard' : 'Researcher Portal'}
          </h1>
          <p className="text-slate-500 mt-2 text-lg font-medium">
            {isAdminOrTech 
              ? 'Platform performance and institutional data overview.' 
              : "Welcome back! Here's an overview of your bioresource contributions."}
          </p>
        </div>
        {isAdminOrTech ? (
          <div className="flex items-center gap-3">
             <Link href="/dashboard/audit" className={cn(buttonVariants({ variant: 'outline' }), "flex items-center gap-2 border-slate-200")}>
                <History className="w-4 h-4" />
                Audit Logs
             </Link>
             <Link href="/dashboard/reports" className={cn(buttonVariants({ className: 'bg-blue-600 hover:bg-blue-700 text-white' }), "flex items-center gap-2")}>
                <TrendingUp className="w-4 h-4" />
                Full Analytics
             </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard/add-new" 
              className={cn(buttonVariants({ size: 'lg', className: 'bg-teal-600 hover:bg-teal-700 shadow-md text-white' }), "flex items-center gap-2")}
            >
              <Plus className="w-5 h-5" />
              Upload Resource
            </Link>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="overflow-hidden border-slate-200 transition-all hover:shadow-lg group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300", stat.bg)}>
                  <stat.icon className={cn("w-7 h-7", stat.color)} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                  <span className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-tighter">{stat.name}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span>{isAdminOrTech ? 'System Growth' : 'Active Contribution'}</span>
                </div>
                <button className="text-slate-400 hover:text-teal-600 transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Module-Specific Content for Admin vs Researcher */}
        {isAdminOrTech ? (
          <Card className="border-slate-200 shadow-sm overflow-hidden bg-slate-50">
             <CardHeader className="bg-slate-900 text-white pb-6">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                   <ShieldAlert className="w-5 h-5 text-amber-400 shadow-xl" />
                   System Management
                </CardTitle>
                <CardDescription className="text-slate-400">Core platform configuration modules</CardDescription>
             </CardHeader>
             <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 italic-none">
                <Link href="/dashboard/users" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition-all group shadow-sm">
                   <Users className="w-6 h-6 text-blue-600 mb-2" />
                   <p className="font-bold text-slate-900">User Access</p>
                   <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">Manage Roles</p>
                </Link>
                <Link href="/dashboard/settings" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-400 transition-all group shadow-sm">
                   <Database className="w-6 h-6 text-slate-600 mb-2" />
                   <p className="font-bold text-slate-900">System Parameters</p>
                   <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">Global Configuration</p>
                </Link>
             </CardContent>
          </Card>
        ) : (
          <Card className="border-slate-200 shadow-sm overflow-hidden bg-gradient-to-br from-white to-slate-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Fast access to frequent tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 mt-4">
              <Link 
                href="/dashboard/plants" 
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 transition-all group"
              >
                <div className="p-3 bg-teal-100 rounded-xl text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Leaf className="w-8 h-8" />
                </div>
                <span className="font-bold text-slate-700">Add Plant</span>
              </Link>
              <Link 
                href="/dashboard/microorganisms" 
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all group"
              >
                <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Microscope className="w-8 h-8" />
                </div>
                <span className="font-bold text-slate-700">Add Microbe</span>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Dynamic Activity / Contributions */}
        <Card className="border-slate-200 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-800">
              <Activity className={cn("w-5 h-5", isAdminOrTech ? "text-purple-600" : "text-blue-500")} />
              {isAdminOrTech ? 'Global Activity Line' : 'Recent Uploads'}
            </CardTitle>
            <CardDescription>
               {isAdminOrTech ? 'Most recent dataset modifications system-wide.' : 'Your latest contributions to the repository.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
             <div className="flex flex-col gap-4 py-2 italic-none">
                {/* Mock recent items */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-teal-200 hover:shadow-md transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                      {i % 2 === 0 ? <Microscope className="w-5 h-5 text-indigo-500" /> : <Leaf className="w-5 h-5 text-teal-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 truncate text-sm">
                        {i === 2 ? 'Bacillus subtilis isolation' : 'Solanum nigrum (Nightshade)'}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                        Updated {i + 1} hours ago {isAdminOrTech && 'by Dr. Maina'}
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
