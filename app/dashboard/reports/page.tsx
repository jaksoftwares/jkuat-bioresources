import React from 'react'
import { 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Activity, 
  Download, 
  ArrowUpRight, 
  Leaf, 
  Microscope, 
  BookOpen 
} from 'lucide-react'
import { protectRoute } from '@/lib/auth/role-guard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'

export default async function ReportsManagementPage() {
  // RBAC Protection
  await protectRoute(['administrator', 'technical_team'])

  const supabase = await createClient()

  // Fetch counts
  const { count: plantsCount } = await supabase.from('plants').select('*', { count: 'exact', head: true })
  const { count: microsCount } = await supabase.from('microorganisms').select('*', { count: 'exact', head: true })
  const { count: herbariumCount } = await supabase.from('herbarium_specimens').select('*', { count: 'exact', head: true })
  const { count: usersCount } = await supabase.from('user_profiles').select('*', { count: 'exact', head: true })

  const stats = [
    { label: 'Total Plant Biodiversity', value: plantsCount || 0, icon: Leaf, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Microbial Cultures', value: microsCount || 0, icon: Microscope, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Herbarium Records', value: herbariumCount || 0, icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Researchers', value: usersCount || 0, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            Bio-Analytics & Reports
          </h1>
          <p className="text-slate-500 mt-2 text-lg font-medium leading-relaxed max-w-2xl">
            Global repository metrics, data distribution across JKUAT bioresources, and resource contribution analytics.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center gap-2 h-12 px-6 font-bold tracking-tight">
          <Download className="w-5 h-5" />
          Export Global Report
        </Button>
      </div>

      {/* Summary Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-slate-200 shadow-sm group hover:border-blue-200 transition-all cursor-pointer overflow-hidden relative">
             <div className={cn("absolute right-0 top-0 w-24 h-24 -translate-y-8 translate-x-8 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity", stat.bg)} />
             <CardContent className="p-6">
               <div className="flex items-center justify-between">
                 <div className={cn("p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300", stat.bg)}>
                   <stat.icon className={cn("w-7 h-7", stat.color)} />
                 </div>
                 <div className="flex flex-col items-end">
                   <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                 </div>
               </div>
               <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-emerald-600 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Growth: +12%
                  </span>
                  <span className="text-slate-300">Updated today</span>
               </div>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Resource Distribution Chart Placeholder */}
        <Card className="xl:col-span-2 border-slate-200 shadow-sm h-[480px] overflow-hidden flex flex-col">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Monthly contribution trend
              </CardTitle>
              <CardDescription>Volume of newly registered bioresources over time.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
               <Badge className="bg-white border-slate-200 text-slate-400 font-bold px-2 py-1 uppercase text-[10px] tracking-widest">Yearly</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center bg-white p-0 relative">
             {/* Abstract visual placeholder for a chart */}
             <div className="w-full h-full flex flex-col p-12 justify-end gap-2 overflow-hidden opacity-[0.4] mix-blend-multiply">
                 {[40, 70, 45, 90, 65, 85, 100, 55, 75, 95, 60, 45].map((h, i) => (
                   <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/40 to-blue-200 rounded-lg group-hover:from-blue-600 transition-all border border-blue-100" style={{ height: `${h}%` }} />
                 ))}
             </div>
             <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
                <div className="text-center space-y-4">
                   <Activity className="w-16 h-16 text-blue-600/20 mx-auto animate-pulse" />
                   <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">Visualizing global data...</p>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Data Distribution */}
        <Card className="border-slate-200 shadow-sm flex flex-col h-[480px]">
           <CardHeader className="bg-slate-50/50 border-b border-slate-100 italic-none">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                 <PieChart className="w-5 h-5 text-amber-600" />
                 Category distribution
              </CardTitle>
              <CardDescription>Breakdown by major biological taxonomic groups.</CardDescription>
           </CardHeader>
           <CardContent className="p-6 flex-1 flex flex-col justify-center space-y-6">
              {[
                { name: 'Angiosperms', percent: 45, color: 'bg-emerald-500' },
                { name: 'Fungi / Yeast', percent: 25, color: 'bg-indigo-500' },
                { name: 'Bacteria', percent: 15, color: 'bg-blue-500' },
                { name: 'Algae', percent: 10, color: 'bg-amber-500' },
                { name: 'Other', percent: 5, color: 'bg-slate-300' }
              ].map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                   <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tight">
                      <span className="text-slate-700">{cat.name}</span>
                      <span className="text-slate-400">{cat.percent}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
                      <div className={cn("h-full rounded-full shadow-sm transition-all duration-1000", cat.color)} style={{ width: `${cat.percent}%` }} />
                   </div>
                </div>
              ))}
              <div className="pt-4 mt-auto">
                 <Button variant="ghost" className="w-full text-blue-600 font-black tracking-tight text-xs flex items-center gap-2 uppercase hover:bg-blue-50">
                   Detailed Taxonomy Breakdown
                   <ArrowUpRight className="w-4 h-4" />
                 </Button>
              </div>
           </CardContent>
        </Card>
      </div>

       <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-3 max-w-xl">
                <h3 className="text-2xl font-black text-white tracking-tight leading-tight">Generate custom research publication reports.</h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                   Looking for specific institutional data for publication? Use our custom query engine to generate datasets, charts, and verification reports instantly.
                </p>
             </div>
             <Button className="bg-white text-slate-900 border-none hover:bg-slate-100 shadow-xl h-14 px-8 font-black text-lg group transition-all">
                Access Query Engine
                <TrendingUp className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
             </Button>
          </div>
       </div>
    </div>
  )
}
