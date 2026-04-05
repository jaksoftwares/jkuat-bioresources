'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Leaf, 
  Microscope, 
  BookOpen, 
  Users, 
  Settings, 
  FileText, 
  PlusCircle, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  ShieldCheck,
  Globe,
  History
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserRole } from '@/types'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  roles: UserRole[] 
}

const navigation: NavItem[] = [
  { 
    name: 'Dashboard', 
    href: '/dashboard/overview', 
    icon: LayoutDashboard, 
    roles: ['technical_team', 'administrator', 'researcher', 'public_user']
  },
  { 
    name: 'Plants', 
    href: '/dashboard/plants', 
    icon: Leaf, 
    roles: ['technical_team', 'administrator', 'researcher', 'public_user']
  },
  { 
    name: 'Microorganisms', 
    href: '/dashboard/microorganisms', 
    icon: Microscope, 
    roles: ['technical_team', 'administrator', 'researcher', 'public_user']
  },
  { 
    name: 'Herbarium', 
    href: '/dashboard/herbarium', 
    icon: BookOpen, 
    roles: ['technical_team', 'administrator', 'researcher', 'public_user']
  },
  { 
    name: 'Add New Resource', 
    href: '/dashboard/add-new', 
    icon: PlusCircle, 
    roles: ['technical_team', 'administrator', 'researcher']
  },
  { 
    name: 'Reports & Analytics', 
    href: '/dashboard/reports', 
    icon: FileText, 
    roles: ['technical_team', 'administrator']
  },
  { 
    name: 'User Management', 
    href: '/dashboard/users', 
    icon: Users, 
    roles: ['technical_team', 'administrator']
  },
  { 
    name: 'Audit Logs', 
    href: '/dashboard/audit', 
    icon: History, 
    roles: ['technical_team']
  },
  { 
    name: 'Platform Settings', 
    href: '/dashboard/settings', 
    icon: Settings, 
    roles: ['technical_team', 'administrator']
  },
]

export function DashboardSidebar({ userRole = 'public_user' }: { userRole?: UserRole }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const filteredNav = navigation.filter(item => item.roles.includes(userRole))

  return (
    <aside className={cn(
      "h-screen sticky top-0 transition-all duration-300 bg-white border-r border-slate-200 flex flex-col z-40 transition-[width]",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 overflow-hidden">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex-shrink-0 flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-slate-800 text-lg truncate">BioResources</span>
          )}
        </Link>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Role Badge */}
      {!isCollapsed && (
        <div className="px-4 mt-6">
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
            <ShieldCheck className={cn(
              "w-4 h-4",
              userRole === 'technical_team' ? "text-purple-600" : 
              userRole === 'administrator' ? "text-blue-600" :
              userRole === 'researcher' ? "text-teal-600" : "text-slate-400"
            )} />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-tighter truncate">
              {userRole.replace('_', ' ')}
            </span>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto custom-scrollbar">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-100" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              {!isCollapsed && (
                <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
              )}
              {!isCollapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <Link
          href="/portal"
          className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-slate-800 rounded-lg group transition-colors"
        >
          <Globe className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Public Portal</span>}
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 text-rose-500 hover:bg-rose-50 rounded-lg group transition-colors mt-1"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}
