import React from 'react'
import { Users, Shield, Mail, Calendar, ShieldAlert, ShieldCheck, UserCog } from 'lucide-react'
import { UserRepository } from '@/repositories/user.repository'
import { protectRoute } from '@/lib/auth/role-guard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { UserActionMenu } from '@/components/dashboard/user-action-menu'

export default async function UserManagementPage() {
  // RBAC Protection
  await protectRoute(['administrator', 'technical_team'])

  const users = await UserRepository.list()

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">
            User Management
          </h1>
          <p className="text-jkuat-gray-500 mt-2 text-sm font-semibold uppercase tracking-widest leading-relaxed">
            Manage platform access and administrative permissions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-jkuat-gray-200 shadow-sm rounded-xl bg-white overflow-hidden">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-jkuat-green/10 flex items-center justify-center text-jkuat-green border border-jkuat-green/10">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-jkuat-gray-400 uppercase tracking-widest">Total Users</p>
              <p className="text-3xl font-extrabold text-jkuat-gray-900 tracking-tight">{users.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-jkuat-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
        <CardHeader className="border-b border-jkuat-gray-100 bg-jkuat-gray-50/50">
          <CardTitle className="text-lg font-extrabold tracking-tight text-jkuat-gray-900">
             Access Control List
          </CardTitle>
          <CardDescription className="text-xs font-semibold uppercase tracking-widest text-jkuat-gray-400 mt-1">Institutional roles and system access</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-jkuat-gray-100 text-sm font-semibold text-jkuat-gray-600 bg-jkuat-gray-50/30">
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Institutional ID</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jkuat-gray-100">
                {users.map((user: any) => {
                  const roleEntry = (user as any).user_roles_user_id_fkey?.[0] ?? (user as any).user_roles?.[0]
                  const roleName = roleEntry?.roles?.name || 'public_user'
                  return (
                    <tr key={user.id} className="hover:bg-jkuat-green-light/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-9 h-9 rounded-lg bg-jkuat-gray-100 flex items-center justify-center text-jkuat-gray-500 font-bold text-xs border border-jkuat-gray-200 uppercase">
                             {user.full_name?.[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-jkuat-gray-900 tracking-tight">{user.full_name}</p>
                            <p className="text-[10px] text-jkuat-gray-400 font-bold flex items-center gap-1 uppercase tracking-widest mt-0.5">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-[10px] font-bold text-jkuat-gray-600 bg-jkuat-gray-100 px-2.5 py-1 rounded-md border border-jkuat-gray-200 uppercase tracking-widest">
                           {user.staff_number || 'STF-XXXX'}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                         <div className={cn(
                           "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border shadow-none",
                           roleName === 'technical_team' ? "bg-jkuat-gray-900 text-white border-jkuat-gray-800" :
                           roleName === 'administrator' ? "bg-jkuat-green-light text-jkuat-green-dark border-jkuat-green/10" :
                           roleName === 'researcher' ? "bg-jkuat-gray-50 text-jkuat-gray-600 border-jkuat-gray-100" :
                           "bg-jkuat-gray-50 text-jkuat-gray-400 border-jkuat-gray-100"
                         )}>
                           {roleName === 'technical_team' && <ShieldAlert className="w-3.5 h-3.5 font-bold" />}
                           {roleName === 'administrator' && <ShieldCheck className="w-3.5 h-3.5 font-bold" />}
                           {roleName.replace('_', ' ')}
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <Badge className="bg-jkuat-green/10 text-jkuat-green-dark border-jkuat-green/10 font-bold tracking-widest px-2 py-0.5 rounded-md text-[9px] uppercase">
                            Active
                         </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[10px] text-jkuat-gray-400 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                          <Calendar className="w-3.5 h-3.5 opacity-50 font-bold" />
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <UserActionMenu userId={user.id} currentRole={roleName} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-jkuat-gray-900 rounded-2xl p-10 border border-jkuat-gray-800 relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 bg-jkuat-green/20 rounded-2xl flex items-center justify-center border border-jkuat-green/20">
                  <Shield className="w-7 h-7 text-jkuat-green" />
               </div>
               <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Access Control Warning</h3>
                  <p className="text-jkuat-gray-400 text-sm font-semibold uppercase tracking-widest leading-relaxed max-w-xl">
                    Technical roles have absolute platform authority. Always verify institutional credentials before upgrading permissions.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
