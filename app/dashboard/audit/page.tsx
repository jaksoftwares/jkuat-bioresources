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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">
            Logs
          </h1>
        </div>
      </div>

      <Card className="border-jkuat-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
        <CardHeader className="bg-jkuat-gray-50/30 border-b border-jkuat-gray-100">
           <CardTitle className="text-lg font-extrabold tracking-tight text-jkuat-gray-900">
              Activity
           </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-jkuat-gray-100 text-sm font-semibold text-jkuat-gray-600 bg-jkuat-gray-50/10">
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Resource</th>
                  <th className="px-6 py-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jkuat-gray-100">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-jkuat-gray-400 font-semibold uppercase tracking-widest">
                       No events recorded
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-jkuat-green-light/5 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-jkuat-gray-500 flex items-center gap-2">
                           <Clock className="w-3.5 h-3.5 opacity-50" />
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
                              <p className="text-[10px] text-jkuat-gray-400 font-bold truncate uppercase tracking-widest mt-0.5">{log.user_profiles?.email || 'System session'}</p>
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
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-1.5 font-semibold text-xs text-jkuat-gray-400">
                            <Monitor className="w-3.5 h-3.5 opacity-50" />
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
    </div>
  )
}
