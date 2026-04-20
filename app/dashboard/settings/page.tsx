import React from 'react'
import { Settings, Globe, Database, Shield, Bell, Save, Layout, SlidersHorizontal, ArrowUpRight } from 'lucide-react'
import { protectRoute } from '@/lib/auth/role-guard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export default async function PlatformSettingsPage() {
  // RBAC Protection
  await protectRoute(['administrator', 'technical_team'])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">
            Platform Settings
          </h1>
          <p className="text-jkuat-gray-500 mt-2 text-sm font-semibold uppercase tracking-widest leading-relaxed">
            Configure global system parameters and institutional policies
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Information */}
          <Card className="border-jkuat-gray-200 shadow-sm rounded-xl overflow-hidden bg-white">
            <CardHeader className="border-b border-jkuat-gray-100 bg-jkuat-gray-50/50">
              <CardTitle className="text-lg font-extrabold tracking-tight text-jkuat-gray-900">
                Institutional Identity
              </CardTitle>
              <CardDescription className="text-xs font-semibold uppercase tracking-widest text-jkuat-gray-400 mt-1">Platform branding and contact info</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-jkuat-gray-700 pl-1">Platform Name</Label>
                  <Input defaultValue="JKUAT Bioresources Portal" className="bg-white border-jkuat-gray-200 font-medium text-jkuat-gray-900 focus:ring-jkuat-green/20 h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-jkuat-gray-700 pl-1">Primary Email</Label>
                  <Input defaultValue="bioresources@jkuat.ac.ke" className="bg-white border-jkuat-gray-200 font-medium text-jkuat-gray-900 focus:ring-jkuat-green/20 h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-jkuat-gray-700 pl-1">Meta Description</Label>
                <Input defaultValue="Standardized repository for JKUAT biological data." className="bg-white border-jkuat-gray-200 font-medium text-jkuat-gray-900 focus:ring-jkuat-green/20 h-11" />
              </div>
            </CardContent>
          </Card>

          {/* Data Policy */}
          <Card className="border-jkuat-gray-200 shadow-sm rounded-xl overflow-hidden bg-white">
            <CardHeader className="border-b border-jkuat-gray-100 bg-jkuat-gray-50/50">
              <CardTitle className="text-lg font-extrabold tracking-tight text-jkuat-gray-900">
                Data Retention & Compliance
              </CardTitle>
              <CardDescription className="text-xs font-semibold uppercase tracking-widest text-jkuat-gray-400 mt-1">Global archiving and visibility policies</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <div className="flex items-center justify-between p-5 rounded-2xl border border-jkuat-gray-100 bg-jkuat-gray-50/50 transition-all hover:border-jkuat-green/20">
                  <div className="space-y-1">
                     <p className="text-sm font-bold text-jkuat-gray-900">Automatic Archiving</p>
                     <p className="text-xs text-jkuat-gray-500 font-medium tracking-tight">Move inactive records to cold storage after 24 months.</p>
                  </div>
                  <div className="w-11 h-6 bg-jkuat-green rounded-full cursor-pointer relative shadow-inner">
                     <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all" />
                  </div>
               </div>
               <div className="flex items-center justify-between p-5 rounded-2xl border border-jkuat-gray-100 bg-jkuat-gray-50/50 transition-all hover:border-jkuat-green/20">
                  <div className="space-y-1">
                     <p className="text-sm font-bold text-jkuat-gray-900">Public Visibility Delay</p>
                     <p className="text-xs text-jkuat-gray-500 font-medium tracking-tight">Wait for admin approval before publishing to portal.</p>
                  </div>
                  <div className="w-11 h-6 bg-jkuat-gray-200 rounded-full cursor-pointer relative shadow-inner">
                     <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all" />
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-8">
           <Card className="border-jkuat-gray-800 shadow-xl bg-jkuat-gray-900 text-white overflow-hidden relative group rounded-2xl px-2">
              <div className="absolute right-0 top-0 w-32 h-32 bg-jkuat-green/20 rounded-full blur-2xl -translate-y-8 translate-x-8" />
              <CardHeader className="pb-4 relative z-10 pt-8">
                 <CardTitle className="text-xl font-extrabold flex items-center gap-2 tracking-tight">
                    Actions
                 </CardTitle>
                 <CardDescription className="text-jkuat-gray-400 font-medium text-xs">Commit changes to production</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0 relative z-10">
                 <Button className="w-full bg-jkuat-green hover:bg-jkuat-green-dark border-none font-bold h-12 shadow-2xl rounded-xl transition-all">
                    <Save className="w-4.5 h-4.5 mr-2" />
                    Save Configuration
                 </Button>
                 <Button variant="outline" className="w-full border-jkuat-gray-700 bg-transparent text-white hover:bg-jkuat-gray-800 font-bold h-12 rounded-xl transition-all">
                    Restore Defaults
                 </Button>
              </CardContent>
           </Card>

           <div className="space-y-4 px-2">
              <p className="text-xs font-semibold text-jkuat-gray-400 uppercase tracking-widest pl-1">Technical Utilities</p>
              <div className="flex flex-col gap-3">
                 {[
                   { name: 'UI Customizer', icon: Layout, color: 'text-jkuat-green' },
                   { name: 'API Integrations', icon: SlidersHorizontal, color: 'text-jkuat-green-dark' },
                   { name: 'System Alerts', icon: Bell, color: 'text-jkuat-gold' }
                 ].map((nav) => (
                   <button key={nav.name} className="flex items-center gap-4 p-4 rounded-xl border border-jkuat-gray-100 bg-white hover:border-jkuat-green/20 hover:shadow-md transition-all text-left group">
                      <div className="w-9 h-9 rounded-lg bg-jkuat-gray-50 flex items-center justify-center border border-jkuat-gray-100 group-hover:bg-white group-hover:border-jkuat-green/10 transition-colors">
                        <nav.icon className={cn("w-4.5 h-4.5 transition-transform group-hover:scale-110", nav.color)} />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-extrabold text-jkuat-gray-800 block tracking-tight">{nav.name}</span>
                        <span className="text-[10px] text-jkuat-gray-400 font-bold uppercase tracking-widest group-hover:text-jkuat-green transition-colors">Manage</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-jkuat-gray-300 group-hover:text-jkuat-green opacity-0 group-hover:opacity-100 transition-all font-bold" />
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
