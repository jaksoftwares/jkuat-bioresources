import React from 'react'
import { Users, Shield, Mail, Calendar, MoreVertical, ShieldAlert, ShieldCheck, UserCog } from 'lucide-react'
import { UserRepository } from '@/repositories/user.repository'
import { protectRoute } from '@/lib/auth/role-guard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export default async function UserManagementPage() {
  // RBAC Protection
  await protectRoute(['administrator', 'technical_team'])

  const users = await UserRepository.list()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            User Management
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Manage platform access, roles, and administrative permissions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-50 border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Users</p>
              <p className="text-2xl font-black text-slate-900">{users.length}</p>
            </div>
          </CardContent>
        </Card>
        {/* Add more summary cards here if needed */}
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-100 bg-slate-50/30">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
             <UserCog className="w-5 h-5 text-slate-400" />
             Access Control List
          </CardTitle>
          <CardDescription>View and manage all registered users and their system roles.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50">
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Staff/PF Number</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 italic-none">
                {users.map((user: any) => {
                  const roleName = user.user_roles?.[0]?.roles?.name || 'public_user'
                  return (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-200">
                             {user.full_name?.[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{user.full_name}</p>
                            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                           {user.staff_number || 'STF-XXXX'}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                         <div className={cn(
                           "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                           roleName === 'technical_team' ? "bg-purple-100 text-purple-700 border border-purple-200" :
                           roleName === 'administrator' ? "bg-blue-100 text-blue-700 border border-blue-200" :
                           roleName === 'researcher' ? "bg-teal-100 text-teal-700 border border-teal-200" :
                           "bg-slate-100 text-slate-500"
                         )}>
                           {roleName === 'technical_team' && <ShieldAlert className="w-3 h-3" />}
                           {roleName === 'administrator' && <ShieldCheck className="w-3 h-3" />}
                           {roleName.replace('_', ' ')}
                         </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="text-[10px] border-emerald-200 text-emerald-700 bg-emerald-50/50 font-black tracking-widest px-2">
                           ACTIVE
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 font-bold">
                            <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs text-purple-600">Upgrade to Technical</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs text-blue-600">Make Administrator</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs text-teal-600">Assign Researcher</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs text-rose-600">Suspend Access</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 items-start">
        <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold text-amber-900 uppercase tracking-widest">Administrative Alert</p>
          <p className="text-xs text-amber-700 font-medium leading-relaxed">
            Role changes affect platform permissions immediately. Technical Team and Administrator roles have the power to delete datasets and manage other users. Always verify the staff's institutional credentials before upgrading permissions.
          </p>
        </div>
      </div>
    </div>
  )
}
