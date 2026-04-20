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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-jkuat-gray-900 tracking-tight">
            System Audit Logs
          </h1>
          <p className="text-jkuat-gray-500 font-semibold mt-1 text-sm uppercase tracking-widest leading-relaxed">
             Real-time technical activity monitor
          </p>
        </div>
        <div className="flex items-center gap-2 bg-jkuat-gray-50 px-4 py-2 rounded-xl border border-jkuat-gray-200">
           <Shield className="w-4.5 h-4.5 text-jkuat-gray-400 font-bold" />
           <span className="text-xs font-bold uppercase tracking-widest text-jkuat-gray-500">Security Module</span>
        </div>
      </div>

      <Card className="border-jkuat-gray-200 shadow-card overflow-hidden bg-white rounded-xl">
        <CardHeader className="bg-jkuat-gray-50/50 border-b border-jkuat-gray-100 italic-none">
           <CardTitle className="text-lg font-extrabold tracking-tight text-jkuat-gray-900">
              Platform Activity Stream
           </CardTitle>
           <CardDescription className="text-xs font-semibold uppercase tracking-widest text-jkuat-gray-400 mt-1">Data modifications and system events</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-jkuat-gray-100 text-sm font-semibold text-jkuat-gray-600 bg-jkuat-gray-50/30">
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Initiator</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Resource</th>
                  <th className="px-6 py-4">Platform Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jkuat-gray-100">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-jkuat-gray-400 font-semibold uppercase tracking-widest">
                       No system events recorded
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-jkuat-green-light/10 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-jkuat-gray-500 flex items-center gap-2 tracking-tight group-hover:text-jkuat-green transition-colors">
                           <Clock className="w-3.5 h-3.5 opacity-50 font-bold" />
                           {new Date(log.created_at).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-jkuat-gray-100 flex items-center justify-center text-[10px] text-jkuat-gray-500 font-bold border border-jkuat-gray-200 uppercase">
                              {log.user_profiles?.full_name?.[0].toUpperCase() || 'SYS'}
                           </div>
                           <div className="min-w-0 max-w-[140px]">
                              <p className="text-sm font-semibold text-jkuat-gray-900 truncate tracking-tight">{log.user_profiles?.full_name || 'System'}</p>
                              <p className="text-[10px] text-jkuat-gray-400 font-bold truncate uppercase tracking-widest mt-0.5">{log.user_profiles?.email || 'AUTOMATED SESSION'}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <Badge className={cn(
                           "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border shadow-none rounded-md",
                           log.action.includes('CREATE') ? "bg-jkuat-green-light text-jkuat-green-dark border-jkuat-green/10" :
                           log.action.includes('DELETE') ? "bg-rose-100 text-rose-700 border-rose-200" :
                           log.action.includes('UPDATE') ? "bg-jkuat-gray-100 text-jkuat-gray-700 border-jkuat-gray-200" :
                           "bg-jkuat-gray-50 text-jkuat-gray-400 border-jkuat-gray-100"
                         )}>
                           {log.action.replace('_', ' ')}
                         </Badge>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-jkuat-gray-700">{log.resource_type}</span>
                            <span className="text-[10px] font-mono font-medium text-jkuat-gray-300">#{log.resource_id.split('-')[0]}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[10px] text-jkuat-gray-400">
                            <Monitor className="w-3.5 h-3.5" />
                            {log.ip_address || '127.0.0.1'}
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
      
      <div className="bg-jkuat-gray-50 border-jkuat-gray-200 border p-12 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
         <Shield className="w-10 h-10 text-jkuat-gray-200" />
         <p className="text-xs font-semibold text-jkuat-gray-400 max-w-sm uppercase tracking-widest leading-relaxed">
           Audit data is immutable and stored for 5 years as per JKUAT institutional compliance.
         </p>
      </div>
    </div>
  )
}
