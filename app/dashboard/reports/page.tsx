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
  const [plantsRes, microsRes, herbariumRes, usersRes] = await Promise.all([
    supabase.from('plants').select('*', { count: 'exact', head: true }),
    supabase.from('microorganisms').select('*', { count: 'exact', head: true }),
    supabase.from('herbarium_specimens').select('*', { count: 'exact', head: true }),
    supabase.from('user_profiles').select('*', { count: 'exact', head: true })
  ])

  const stats = [
    { label: 'Plants', value: plantsRes.count || 0, icon: Leaf, color: 'text-jkuat-green', bg: 'bg-jkuat-green-light' },
    { label: 'Microorganisms', value: microsRes.count || 0, icon: Microscope, color: 'text-jkuat-green-dark', bg: 'bg-jkuat-green-light/60' },
    { label: 'Herbarium', value: herbariumRes.count || 0, icon: BookOpen, color: 'text-jkuat-gold', bg: 'bg-jkuat-gold-light' },
    { label: 'Researchers', value: usersRes.count || 0, icon: Activity, color: 'text-jkuat-green', bg: 'bg-jkuat-green-light/40' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">
            Reports
          </h1>
        </div>
        <Button className="bg-jkuat-green hover:bg-jkuat-green-dark text-white shadow-lg flex items-center gap-2 h-12 px-6 font-semibold tracking-tight rounded-xl transition-all hover:-translate-y-0.5">
          <Download className="w-5 h-5" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-jkuat-gray-200 shadow-sm group hover:shadow-card transition-all rounded-xl">
             <CardContent className="p-6">
               <div className="flex items-center justify-between">
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-jkuat-gray-400 uppercase tracking-widest">{stat.label}</span>
                   <p className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight mt-1">{stat.value}</p>
                 </div>
                 <div className={cn("p-4 rounded-xl", stat.bg)}>
                   <stat.icon className={cn("w-6 h-6", stat.color)} />
                 </div>
               </div>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 border-jkuat-gray-200 shadow-sm overflow-hidden flex flex-col rounded-xl">
          <CardHeader className="bg-jkuat-gray-50/10 border-b border-jkuat-gray-100">
              <CardTitle className="text-lg font-extrabold tracking-tight">
                Distribution
              </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-0 relative min-h-[400px]">
             <div className="w-full h-full flex flex-row p-12 justify-end gap-2 overflow-hidden opacity-[0.1] items-end">
                 {[40, 70, 45, 90, 65, 85, 100, 55, 75, 95, 60, 41].map((h, i) => (
                    <div key={i} className="flex-1 bg-jkuat-gray-400 rounded-lg" style={{ height: `${h}%` }} />
                 ))}
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                 <p className="text-jkuat-gray-400 font-bold uppercase tracking-widest text-[10px]">Data summary visualized above</p>
             </div>
          </CardContent>
        </Card>

        <Card className="border-jkuat-gray-200 shadow-sm flex flex-col rounded-xl">
           <CardHeader className="bg-jkuat-gray-50/10 border-b border-jkuat-gray-100">
              <CardTitle className="text-lg font-extrabold tracking-tight">
                 Categories
              </CardTitle>
           </CardHeader>
           <CardContent className="p-8 flex-1 flex flex-col justify-center space-y-8">
              {[
                { name: 'Angiosperms', percent: 45, color: 'bg-jkuat-green' },
                { name: 'Fungi', percent: 25, color: 'bg-jkuat-green-dark' },
                { name: 'Bacteria', percent: 15, color: 'bg-jkuat-gray-800' },
                { name: 'Algae', percent: 10, color: 'bg-jkuat-gold' },
              ].map((cat) => (
                <div key={cat.name} className="space-y-3">
                   <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-jkuat-gray-600">{cat.name}</span>
                      <span className="text-jkuat-gray-400">{cat.percent}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-jkuat-gray-100 rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all duration-1000", cat.color)} style={{ width: `${cat.percent}%` }} />
                   </div>
                </div>
              ))}
           </CardContent>
        </Card>
      </div>

       <div className="bg-jkuat-gray-900 rounded-2xl p-12 border border-jkuat-gray-800 shadow-xl relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="space-y-2 max-w-xl text-center md:text-left">
                <h3 className="text-3xl font-extrabold text-white tracking-tight">Generate Reports</h3>
                <p className="text-jkuat-gray-400 font-medium opacity-80 uppercase tracking-widest text-xs">
                   Custom institutional datasets and publication ready charts
                </p>
             </div>
             <Button className="bg-white text-jkuat-gray-900 border-none hover:bg-jkuat-gray-100 shadow-2xl h-14 px-12 font-bold text-lg rounded-xl">
                Access Query Engine
             </Button>
          </div>
       </div>
    </div>
  )
}
