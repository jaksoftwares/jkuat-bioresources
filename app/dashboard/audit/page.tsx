import React from 'react'
import { History, Shield, Clock, Monitor, Box, Terminal } from 'lucide-react'
import { protectRoute } from '@/lib/auth/role-guard'
import { AuditRepository } from '@/repositories/audit.repository'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default async function AuditLogsPage() {
  // Strict RBAC Enforcement
  await protectRoute(['technical_team'])
  
  const logs = await AuditRepository.list(100)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <History className="w-8 h-8 text-purple-600" />
            System Audit Logs
          </h1>
          <p className="text-slate-500 font-medium mt-1">
             Real-time monitoring of all administrative and researcher actions.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl border border-purple-100 shadow-sm">
           <Shield className="w-5 h-5 text-purple-600" />
           <span className="text-xs font-black uppercase tracking-widest text-purple-700">Protected Module</span>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 italic-none">
           <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-slate-400" />
              Platform Activity Stream
           </CardTitle>
           <CardDescription>Comprehensive record of data modifications and system events.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Initiated By</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Resource</th>
                  <th className="px-6 py-4">Platform Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 italic-none">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-bold uppercase tracking-widest opacity-50">
                       No system events recorded
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-2 tracking-tight group-hover:text-purple-600 transition-colors">
                           <Clock className="w-3 h-3 opacity-50 font-black" />
                           {new Date(log.created_at).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-black border border-slate-200">
                              {log.user_profiles?.full_name?.[0].toUpperCase() || 'SYS'}
                           </div>
                           <div className="min-w-0 max-w-[140px]">
                              <p className="text-xs font-bold text-slate-800 truncate">{log.user_profiles?.full_name || 'System'}</p>
                              <p className="text-[10px] text-slate-400 font-medium truncate">{log.user_profiles?.email || 'automated'}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <Badge className={cn(
                           "text-[10px] font-black uppercase tracking-tight px-2 py-0.5 border-none shadow-none",
                           log.action.includes('CREATE') ? "bg-emerald-100 text-emerald-700" :
                           log.action.includes('DELETE') ? "bg-rose-100 text-rose-700" :
                           log.action.includes('UPDATE') ? "bg-blue-100 text-blue-700" :
                           "bg-slate-100 text-slate-600"
                         )}>
                           {log.action.replace('_', ' ')}
                         </Badge>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                            <Box className="w-3 h-3 text-slate-400" />
                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">{log.resource_type}</span>
                            <span className="text-[10px] font-mono text-slate-300">#{log.resource_id.split('-')[0]}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3 text-xs text-slate-400">
                             <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[9px]">
                                <Monitor className="w-3 h-3" />
                                {log.ip_address || '127.0.0.1'}
                             </div>
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
      
      <div className="bg-slate-50 border-slate-100 border p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
         <Shield className="w-10 h-10 text-purple-600/20" />
         <p className="text-sm font-bold text-slate-500 max-w-sm uppercase tracking-widest leading-relaxed">
           Audit data is immutable and stored for 5 years as per JKUAT institutional compliance.
         </p>
      </div>
    </div>
  )
}
