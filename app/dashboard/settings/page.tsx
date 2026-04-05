import React from 'react'
import { Settings, Globe, Database, Shield, Bell, Save, Layout, SlidersHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export default function PlatformSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-600" />
          Platform Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">
          Configure global system parameters, appearance, and institutional data policies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-600" />
                Institutional Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 italic-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Platform Name</Label>
                  <Input defaultValue="JKUAT Bioresources Portal" className="bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Primary Email</Label>
                  <Input defaultValue="bioresources@jkuat.ac.ke" className="bg-slate-50 border-slate-200" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Meta Description</Label>
                <Input defaultValue="Standardized repository for JKUAT biological data." className="bg-slate-50 border-slate-200" />
              </div>
            </CardContent>
          </Card>

          {/* Data Policy */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-600" />
                Data Retention & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6 italic-none">
               <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-slate-200">
                  <div className="space-y-1">
                     <p className="text-sm font-bold text-slate-900">Automatic Archiving</p>
                     <p className="text-xs text-slate-400">Move inactive records to cold storage after 24 months.</p>
                  </div>
                  <div className="w-10 h-5 bg-teal-600 rounded-full cursor-pointer relative shadow-inner">
                     <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md" />
                  </div>
               </div>
               <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-slate-200">
                  <div className="space-y-1">
                     <p className="text-sm font-bold text-slate-900">Public Visibility Delay</p>
                     <p className="text-xs text-slate-400">Wait for admin approval before publishing to portal.</p>
                  </div>
                  <div className="w-10 h-5 bg-slate-200 rounded-full cursor-pointer relative shadow-inner">
                     <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md" />
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
           <Card className="border-slate-200 shadow-sm bg-slate-900 text-white overflow-hidden relative group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-8 translate-x-8" />
              <CardHeader className="pb-2 relative z-10">
                 <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    Master Actions
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6 pt-2 relative z-10">
                 <Button className="w-full bg-blue-600 hover:bg-blue-700 border-none font-bold italic-none h-11 shadow-lg">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                 </Button>
                 <Button variant="outline" className="w-full border-slate-700 bg-transparent text-white hover:bg-slate-800 font-bold h-11 italic-none">
                    Restore Defaults
                 </Button>
              </CardContent>
           </Card>

           <div className="space-y-4 italic-none">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Administrative Utilities</p>
              <div className="flex flex-col gap-2">
                 {[
                   { name: 'UI Customizer', icon: Layout, color: 'text-teal-600' },
                   { name: 'API Integrations', icon: SlidersHorizontal, color: 'text-indigo-600' },
                   { name: 'System Alerts', icon: Bell, color: 'text-amber-600' }
                 ].map((nav) => (
                   <button key={nav.name} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm transition-all text-left">
                      <nav.icon className={cn("w-5 h-5", nav.color)} />
                      <span className="text-sm font-bold text-slate-700">{nav.name}</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
