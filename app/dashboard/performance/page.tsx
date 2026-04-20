import React from 'react'
import { Server, Zap, Database, HardDrive, ShieldCheck, RefreshCw } from 'lucide-react'
import { protectRoute } from '@/lib/auth/role-guard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export default async function PlatformPerformancePage() {
  // RBAC Protection
  await protectRoute(['administrator', 'technical_team'])

  const healthMetrics = [
    { label: 'API Uptime', value: '99.98%', status: 'optimal', icon: Zap },
    { label: 'DB Latency', value: '24ms', status: 'optimal', icon: Database },
    { label: 'Storage Usage', value: '64.2GB', status: 'normal', icon: HardDrive },
    { label: 'Security Score', value: 'A+', status: 'optimal', icon: ShieldCheck },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">
            Platform Performance
          </h1>
          <p className="text-jkuat-gray-500 mt-2 text-sm font-semibold uppercase tracking-widest leading-relaxed">
            Real-time infrastructure health and system metrics
          </p>
        </div>
        <Button variant="outline" className="border-jkuat-gray-200 text-jkuat-gray-600 font-bold gap-2 h-11 px-6 rounded-xl hover:bg-jkuat-gray-50 transition-all">
          <RefreshCw className="w-4 h-4" />
          Refresh Metrics
        </Button>
      </div>

      {/* Primary Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((m) => (
          <Card key={m.label} className="border-jkuat-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-jkuat-gray-50 rounded-lg border border-jkuat-gray-100">
                  <m.icon className="w-5 h-5 text-jkuat-gray-600" />
                </div>
                <div className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  m.status === 'optimal' ? "bg-jkuat-green" : "bg-jkuat-gold"
                )} />
              </div>
              <div className="mt-4">
                <p className="text-3xl font-extrabold text-jkuat-gray-900 tracking-tight">{m.value}</p>
                <p className="text-[10px] font-bold text-jkuat-gray-400 uppercase tracking-widest mt-1">{m.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* API Response Timeline */}
        <Card className="lg:col-span-2 border-jkuat-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
          <CardHeader className="bg-jkuat-gray-50/50 border-b border-jkuat-gray-100">
            <CardTitle className="text-lg font-extrabold tracking-tight">Global API Response Times</CardTitle>
            <CardDescription className="text-xs font-semibold uppercase tracking-widest text-jkuat-gray-400 mt-1">Last 24 Hours Performance</CardDescription>
          </CardHeader>
          <CardContent className="p-8 flex-1 flex flex-col justify-center">
            <div className="space-y-8">
               {[
                 { route: 'GET /api/plants', time: '180ms', pct: 20 },
                 { route: 'GET /api/microorganisms', time: '240ms', pct: 35 },
                 { route: 'POST /api/media/upload', time: '1.2s', pct: 85 },
                 { route: 'GET /api/search', time: '110ms', pct: 15 },
               ].map((api) => (
                 <div key={api.route} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                       <span className="text-jkuat-gray-600 font-mono">{api.route}</span>
                       <span className={cn(api.pct > 80 ? "text-jkuat-gold" : "text-jkuat-green")}>{api.time}</span>
                    </div>
                    <Progress value={api.pct} className="h-1.5 bg-jkuat-gray-100" />
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure Status */}
        <Card className="border-jkuat-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
           <CardHeader className="bg-jkuat-gray-50/50 border-b border-jkuat-gray-100">
              <CardTitle className="text-lg font-extrabold tracking-tight">Service Status</CardTitle>
              <CardDescription className="text-xs font-semibold uppercase tracking-widest text-jkuat-gray-400 mt-1">Subsystem Availability</CardDescription>
           </CardHeader>
           <CardContent className="p-6 space-y-6">
              {[
                { name: 'Supabase Database', status: 'Operational' },
                { name: 'Cloudinary CDN', status: 'Operational' },
                { name: 'Auth Service', status: 'Operational' },
                { name: 'Email Bridge', status: 'Operational' },
                { name: 'Backup Engine', status: 'Operational' },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between p-3 rounded-lg border border-jkuat-gray-50 bg-jkuat-gray-50/50">
                   <span className="text-xs font-bold text-jkuat-gray-700 uppercase tracking-widest">{s.name}</span>
                   <span className="text-[10px] font-bold text-jkuat-green uppercase tracking-widest bg-jkuat-green/10 px-2 py-0.5 rounded-md">Online</span>
                </div>
              ))}
              <div className="pt-4 border-t border-jkuat-gray-100">
                 <p className="text-[10px] font-semibold text-jkuat-gray-400 uppercase tracking-widest text-center leading-relaxed">
                   All systems go. No incidents reported in the last 72 hours.
                 </p>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Technical Footer */}
      <div className="bg-jkuat-gray-900 rounded-2xl p-10 border border-jkuat-gray-800 relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 bg-jkuat-green/20 rounded-2xl flex items-center justify-center border border-jkuat-green/20">
                  <Server className="w-7 h-7 text-jkuat-green" />
               </div>
               <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Main Cluster: Node-A-01</h3>
                  <p className="text-jkuat-gray-400 text-sm font-semibold uppercase tracking-widest">JKUAT Bio-Hub Infrastructure (Private Cloud)</p>
               </div>
            </div>
            <div className="flex flex-col md:items-end gap-2 text-right">
               <p className="text-xs font-bold text-jkuat-gray-500 uppercase tracking-widest">Environment</p>
               <p className="text-lg font-extrabold text-white tracking-tight">Production v1.0.4-stable</p>
            </div>
         </div>
      </div>
    </div>
  )
}
