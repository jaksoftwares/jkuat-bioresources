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
    { label: 'Total Plant Biodiversity', value: plantsCount || 0, icon: Leaf, color: 'text-jkuat-green', bg: 'bg-jkuat-green-light' },
    { label: 'Microbial Cultures', value: microsCount || 0, icon: Microscope, color: 'text-jkuat-green-dark', bg: 'bg-jkuat-green-light/60' },
    { label: 'Herbarium Records', value: herbariumCount || 0, icon: BookOpen, color: 'text-jkuat-gold', bg: 'bg-jkuat-gold-light' },
    { label: 'Active Researchers', value: usersCount || 0, icon: Activity, color: 'text-jkuat-green', bg: 'bg-jkuat-green-light/40' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">
            Bio-Analytics & Reports
          </h1>
          <p className="text-jkuat-gray-500 mt-2 text-sm font-semibold uppercase tracking-widest leading-relaxed max-w-2xl">
            Global repository metrics and biological data distribution
          </p>
        </div>
        <Button className="bg-jkuat-green hover:bg-jkuat-green-dark text-white shadow-lg flex items-center gap-2 h-12 px-6 font-semibold tracking-tight rounded-xl">
          <Download className="w-5 h-5 font-bold" />
          Export Global Report
        </Button>
      </div>

      {/* Summary Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-jkuat-gray-200 shadow-card group hover:shadow-lg transition-all cursor-pointer overflow-hidden relative rounded-xl">
             <CardContent className="p-6">
               <div className="flex items-center justify-between">
                 <div className={cn("p-4 rounded-xl group-hover:scale-110 transition-transform duration-300", stat.bg)}>
                   <stat.icon className={cn("w-7 h-7", stat.color)} />
                 </div>
                 <div className="flex flex-col items-end">
                   <p className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">{stat.value}</p>
                   <p className="text-[10px] font-bold text-jkuat-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
                 </div>
               </div>
               <div className="mt-4 pt-4 border-t border-jkuat-gray-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-jkuat-green flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 font-bold" />
                    Growth: +12%
                  </span>
                  <span className="text-jkuat-gray-300">Updated today</span>
               </div>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Resource Distribution Chart Placeholder */}
        <Card className="xl:col-span-2 border-jkuat-gray-200 shadow-card h-[480px] overflow-hidden flex flex-col rounded-xl">
          <CardHeader className="bg-jkuat-gray-50/50 border-b border-jkuat-gray-100 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-extrabold flex items-center gap-2 tracking-tight">
                Monthly contribution trend
              </CardTitle>
              <CardDescription className="text-xs font-semibold uppercase tracking-widest text-jkuat-gray-400 mt-1">Resource Volume Over Time</CardDescription>
            </div>
            <div className="flex items-center gap-2">
               <Badge className="bg-white border-jkuat-gray-200 text-jkuat-gray-500 font-bold px-3 py-1 uppercase text-[10px] tracking-widest rounded-lg">Historical Data</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center bg-white p-0 relative">
             <div className="w-full h-full flex flex-row p-12 justify-end gap-2 overflow-hidden opacity-[0.2] items-end">
                 {[40, 70, 45, 90, 65, 85, 100, 55, 75, 95, 60, 45].map((h, i) => (
                    <div key={i} className="flex-1 bg-jkuat-gray-400 rounded-lg group-hover:bg-jkuat-green transition-all" style={{ height: `${h}%` }} />
                 ))}
             </div>
             <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                <div className="text-center space-y-4">
                   <Activity className="w-12 h-12 text-jkuat-green mx-auto animate-pulse" />
                   <p className="text-jkuat-gray-400 font-bold uppercase tracking-[0.3em] text-xs">Visualizing global data...</p>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Data Distribution */}
        <Card className="border-jkuat-gray-200 shadow-card flex flex-col h-[480px] rounded-xl">
           <CardHeader className="bg-jkuat-gray-50/50 border-b border-jkuat-gray-100">
              <CardTitle className="text-lg font-extrabold flex items-center gap-2 tracking-tight">
                 Category distribution
              </CardTitle>
              <CardDescription className="text-xs font-semibold uppercase tracking-widest text-jkuat-gray-400 mt-1">Major Taxonomic Groups</CardDescription>
           </CardHeader>
           <CardContent className="p-6 flex-1 flex flex-col justify-center space-y-6">
              {[
                { name: 'Angiosperms', percent: 45, color: 'bg-jkuat-green' },
                { name: 'Fungi / Yeast', percent: 25, color: 'bg-jkuat-green-dark' },
                { name: 'Bacteria', percent: 15, color: 'bg-jkuat-gray-800' },
                { name: 'Algae', percent: 10, color: 'bg-jkuat-gold' },
                { name: 'Other', percent: 5, color: 'bg-jkuat-gray-400' }
              ].map((cat) => (
                <div key={cat.name} className="space-y-2">
                   <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-jkuat-gray-700">{cat.name}</span>
                      <span className="text-jkuat-gray-400">{cat.percent}%</span>
                   </div>
                   <div className="h-2 w-full bg-jkuat-gray-100 rounded-full overflow-hidden border border-jkuat-gray-200/50">
                      <div className={cn("h-full rounded-full transition-all duration-1000", cat.color)} style={{ width: `${cat.percent}%` }} />
                   </div>
                </div>
              ))}
              <div className="pt-6 mt-auto">
                 <Button variant="outline" className="w-full text-jkuat-green font-bold text-xs flex items-center gap-2 uppercase border-jkuat-green/20 hover:bg-jkuat-green-light/30 rounded-xl">
                   Detailed Taxonomy Breakdown
                   <ArrowUpRight className="w-4 h-4 font-bold" />
                 </Button>
              </div>
           </CardContent>
        </Card>
      </div>

       <div className="bg-jkuat-gray-900 rounded-2xl p-10 border border-jkuat-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-96 h-96 bg-jkuat-green/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:blur-[120px] transition-all duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-4 max-w-xl text-center md:text-left">
                <h3 className="text-3xl font-extrabold text-white tracking-tight leading-tight">Generate custom research publication reports</h3>
                <p className="text-jkuat-gray-400 text-lg font-medium leading-relaxed opacity-80">
                   Use our custom query engine to generate datasets, charts, and verification reports instantly.
                </p>
             </div>
             <Button className="bg-white text-jkuat-gray-900 border-none hover:bg-jkuat-gray-100 shadow-2xl h-14 px-10 font-bold text-lg group transition-all rounded-xl border-t-2 border-white/20">
                Access Query Engine
                <TrendingUp className="ml-2 w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform font-bold" />
             </Button>
          </div>
       </div>
    </div>
  )
}
