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
  History,
  Globe
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { UserRole } from '@/types'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  roles: UserRole[] 
}

const navigation: (NavItem & { section?: string })[] = [
  { 
    name: 'Dashboard', 
    href: '/dashboard/overview', 
    icon: LayoutDashboard, 
    roles: ['technical_team', 'administrator', 'researcher', 'public_user']
  },
  // Section: Bioresources
  { 
    name: 'Plants', 
    href: '/dashboard/plants', 
    icon: Leaf,
    section: 'Bioresources',
    roles: ['technical_team', 'administrator', 'researcher', 'public_user']
  },
  { 
    name: 'Microorganisms', 
    href: '/dashboard/microorganisms', 
    icon: Microscope, 
    section: 'Bioresources',
    roles: ['technical_team', 'administrator', 'researcher', 'public_user']
  },
  { 
    name: 'Herbarium', 
    href: '/dashboard/herbarium', 
    icon: BookOpen, 
    section: 'Bioresources',
    roles: ['technical_team', 'administrator', 'researcher', 'public_user']
  },
  // Section: System
  { 
    name: 'Reports & Analytics', 
    href: '/dashboard/reports', 
    icon: FileText, 
    section: 'System',
    roles: ['technical_team', 'administrator']
  },
  { 
    name: 'User Management', 
    href: '/dashboard/users', 
    icon: Users, 
    section: 'System',
    roles: ['technical_team', 'administrator']
  },
  { 
    name: 'Audit Logs', 
    href: '/dashboard/audit', 
    icon: History, 
    section: 'System',
    roles: ['technical_team']
  },
  { 
    name: 'Platform Performance', 
    href: '/dashboard/performance', 
    icon: Globe, 
    section: 'System',
    roles: ['technical_team', 'administrator']
  },
  { 
    name: 'Platform Settings', 
    href: '/dashboard/settings', 
    icon: Settings, 
    section: 'System',
    roles: ['technical_team', 'administrator']
  },
]

export function DashboardSidebar({ userRole = 'public_user' }: { userRole?: UserRole }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const filteredNav = navigation.filter(item => item.roles.includes(userRole))

  return (
    <aside className={cn(
      "h-screen sticky top-0 transition-all duration-300 bg-white border-r border-jkuat-gray-200 flex flex-col z-40 transition-[width]",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Sidebar Header */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-jkuat-gray-100 overflow-hidden">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            {isCollapsed ? (
              <Image 
                src="/assets/logos/icon.svg" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="h-8 w-auto min-w-[32px] transition-all duration-300 transform scale-125"
              />
            ) : (
              <Image 
                src="/assets/logos/logo-primary.svg" 
                alt="JKUAT Bioresources" 
                width={180} 
                height={48} 
                className="h-9 w-auto transition-all duration-300"
                priority
              />
            )}
          </div>
        </Link>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-jkuat-gray-100 text-jkuat-gray-400 hover:text-jkuat-gray-900 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Role Badge */}
      {!isCollapsed && (
        <div className="px-4 mt-6">
          <div className="flex items-center gap-3 p-3 bg-jkuat-gray-50 rounded-xl border border-jkuat-gray-200 shadow-sm">
            <ShieldCheck className={cn(
              "w-4.5 h-4.5",
              userRole === 'technical_team' ? "text-jkuat-gold" : 
              userRole === 'administrator' ? "text-jkuat-green" :
              userRole === 'researcher' ? "text-jkuat-green" : "text-jkuat-gray-400"
            )} />
            <span className="text-xs font-semibold text-jkuat-gray-600 capitalize">
              {userRole.replace('_', ' ')}
            </span>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-3 mt-4 space-y-4 overflow-y-auto custom-scrollbar">
        {/* Sort into sections for display */}
        {(() => {
          let lastSection = ""
          return filteredNav.map((item) => {
            const isActive = pathname === item.href
            const showSection = item.section && item.section !== lastSection
            if (showSection) lastSection = item.section!

            return (
              <React.Fragment key={item.href}>
                {showSection && !isCollapsed && (
                  <p className="px-3 mt-6 mb-2 text-[10px] font-semibold text-jkuat-gray-400 uppercase tracking-widest">
                    {item.section}
                  </p>
                )}
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-jkuat-green-light border border-jkuat-green/10 text-jkuat-green shadow-sm" 
                      : "text-jkuat-gray-600 hover:bg-jkuat-gray-100 hover:text-jkuat-gray-900 border border-transparent"
                  )}
                >
                  <item.icon className={cn(
                    "w-4.5 h-4.5 flex-shrink-0 transition-colors",
                    isActive ? "text-jkuat-green" : "text-jkuat-gray-400 group-hover:text-jkuat-gray-600"
                  )} />
                  {!isCollapsed && (
                    <span className="text-sm font-semibold whitespace-nowrap tracking-tight">{item.name}</span>
                  )}
                  {!isCollapsed && isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-jkuat-green" />
                  )}
                </Link>
              </React.Fragment>
            )
          })
        })()}
      </nav>

      {/* Footer Actions */}
      <div className={cn("p-4 border-t border-jkuat-gray-100 bg-jkuat-gray-50", isCollapsed && "items-center")}>
        <div className="flex flex-col gap-2">
          {!isCollapsed && (
            <p className="px-2 text-[10px] font-semibold text-jkuat-gray-400 uppercase tracking-widest">Account</p>
          )}
          <button className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm font-semibold text-jkuat-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all",
            isCollapsed && "justify-center"
          )}>
            <LogOut className="w-4.5 h-4.5" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}
