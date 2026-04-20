'use client'

import React, { useState, useEffect } from 'react'
import { HardDrive, Layers, Box, Plus, Trash2, Smartphone, Cpu, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function InfrastructureManager() {
  const [fridges, setFridges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newFridgeCode, setNewFridgeCode] = useState('')
  const [addingTo, setAddingTo] = useState<{ id: string, type: 'shelf' | 'tray' | 'partition' } | null>(null)
  const [newChildCode, setNewChildCode] = useState('')

  useEffect(() => {
    fetchInfrastructure()
  }, [])

  const fetchInfrastructure = async () => {
    try {
      const res = await fetch('/api/infrastructure')
      const data = await res.json()
      if (Array.isArray(data)) {
        setFridges(data)
      } else if (data.error) {
        console.error('Infrastructure Fetch Error:', data.error);
        toast.error('System failed to fetch hardware data');
      }
    } catch (err) {
      console.error('Infrastructure Network Error:', err);
    } finally {
      setLoading(false)
    }
  }

  const addFridge = async () => {
    if (!newFridgeCode) return
    const res = await fetch('/api/infrastructure/fridges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: newFridgeCode })
    })
    if (res.ok) {
      setNewFridgeCode('')
      fetchInfrastructure()
      toast.success('Fridge registered')
    } else {
      const err = await res.json()
      toast.error(err.error || 'Failed to register hardware')
    }
  }

  const addChild = async () => {
    if (!newChildCode || !addingTo) return
    let endpoint = ''
    let payload = {}
    
    if (addingTo.type === 'shelf') {
      endpoint = '/api/infrastructure/shelves';
      payload = { code: newChildCode, fridge_id: addingTo.id };
    } else if (addingTo.type === 'tray') {
      endpoint = '/api/infrastructure/trays';
      payload = { code: newChildCode, shelf_id: addingTo.id };
    } else {
      endpoint = '/api/infrastructure/partitions';
      payload = { code: newChildCode, tray_id: addingTo.id };
    }
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    
    if (res.ok) {
      setNewChildCode('')
      setAddingTo(null)
      fetchInfrastructure()
      toast.success(`${addingTo.type.charAt(0).toUpperCase() + addingTo.type.slice(1)} registered`)
    } else {
      const err = await res.json()
      toast.error(err.error || 'Failed to register')
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Lab Infrastructure</h1>
          <p className="text-slate-500 mt-2 text-sm font-semibold uppercase tracking-widest leading-relaxed">Hardware Hierarchy Setup</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registration Sidebar */}
        <div className="space-y-6">
           <Card className="border-slate-200 shadow-sm rounded-2xl h-fit sticky top-8 overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6">
                 <CardTitle className="text-sm font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-600" /> New Hardware Hub
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">Fridge / Incubator ID</Label>
                    <div className="flex gap-2">
                       <Input 
                         value={newFridgeCode} 
                         onChange={e => setNewFridgeCode(e.target.value)} 
                         placeholder="e.g. FR-01" 
                         className="h-11 bg-white rounded-xl border-slate-200 font-bold"
                       />
                       <Button onClick={addFridge} className="bg-emerald-600 hover:bg-emerald-700 h-11 px-4 rounded-xl">
                          <Plus className="w-5 h-5 text-white" />
                       </Button>
                    </div>
                 </div>
              </CardContent>
           </Card>

           {addingTo && (
             <Card className="border-emerald-200 shadow-card rounded-2xl overflow-hidden animate-in slide-in-from-right-4 duration-300">
                <CardHeader className="bg-emerald-50 py-4 px-6 flex flex-row items-center justify-between">
                   <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">Adding {addingTo.type}</span>
                   <button onClick={() => setAddingTo(null)} className="text-emerald-400 hover:text-emerald-700">✕</button>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                   <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600 capitalize">{addingTo.type} Code</Label>
                      <Input 
                        value={newChildCode} 
                        onChange={e => setNewChildCode(e.target.value)} 
                        autoFocus
                        placeholder={
                           addingTo.type === 'shelf' ? 'e.g. Shelf-A' : 
                           addingTo.type === 'tray' ? 'e.g. Tray-05' : 
                           'e.g. Slot-12'
                        }
                        className="h-11 bg-white rounded-xl font-bold" 
                      />
                   </div>
                   <Button onClick={addChild} className="w-full bg-emerald-600 hover:bg-emerald-700 h-11 rounded-xl text-white font-bold">
                      Add to {addingTo.id.substring(0, 5)}...
                   </Button>
                </CardContent>
             </Card>
           )}
        </div>

        {/* Hierarchy List */}
        <div className="lg:col-span-2 space-y-6">
           {loading ? (
             <div className="p-24 text-center">
                <Smartphone className="w-8 h-8 text-emerald-200 animate-bounce mx-auto" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scanning lab structure...</span>
             </div>
           ) : fridges.length === 0 ? (
             <div className="p-32 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center gap-4 opacity-50 grayscale">
                <HardDrive className="w-12 h-12 text-slate-200" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">No Infrastructure Managed</p>
             </div>
           ) : (
             fridges.map(fridge => (
               <Card key={fridge.id} className="border-slate-100 shadow-none hover:shadow-card transition-all group rounded-2xl overflow-hidden border">
                  <div className="flex items-center justify-between p-6 bg-white border-b border-slate-50">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                           <HardDrive className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-tight">{fridge.code}</h3>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Hardware Unit</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <BadgeCount count={fridge.lab_shelves?.length || 0} icon={Layers} label="Shelves" />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setAddingTo({ id: fridge.id, type: 'shelf' })}
                          className="w-8 h-8 rounded-lg text-slate-300 hover:text-emerald-600 hover:bg-emerald-50"
                        >
                           <Plus className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
                  
                  {fridge.lab_shelves?.length > 0 && (
                    <div className="bg-slate-50/30 p-6 space-y-4">
                       {fridge.lab_shelves.map((shelf: any) => (
                         <div key={shelf.id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                               <div className="flex items-center gap-2">
                                  <div className="p-1.5 bg-slate-100 rounded-lg"><Layers className="w-3.5 h-3.5 text-slate-400" /></div>
                                  <span className="font-black text-xs text-slate-700 uppercase tracking-tight">{shelf.code}</span>
                               </div>
                               <div className="flex items-center gap-3">
                                  <span className="text-[9px] font-black text-emerald-500 uppercase">{(shelf.lab_trays?.length || 0)} Trays</span>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => setAddingTo({ id: shelf.id, type: 'tray' })}
                                    className="w-7 h-7 rounded-md text-slate-300 hover:text-emerald-600 hover:bg-emerald-50"
                                  >
                                     <Plus className="w-3 h-3" />
                                  </Button>
                               </div>
                            </div>
                             {shelf.lab_trays?.length > 0 && (
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {shelf.lab_trays.map((tray: any) => (
                                    <div key={tray.id} className="p-3 border border-slate-100 bg-slate-50/20 rounded-xl space-y-3">
                                       <div className="flex justify-between items-center group/tray">
                                          <div className="flex items-center gap-2">
                                             <Box className="w-3.5 h-3.5 text-emerald-500" />
                                             <span className="text-[10px] font-black text-slate-700 uppercase">{tray.code}</span>
                                          </div>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => setAddingTo({ id: tray.id, type: 'partition' })}
                                            className="w-6 h-6 rounded-md opacity-0 group-hover/tray:opacity-100 transition-opacity hover:bg-emerald-100 text-emerald-600"
                                          >
                                             <Plus className="w-3 h-3" />
                                          </Button>
                                       </div>
                                       
                                       {tray.lab_partitions?.length > 0 && (
                                         <div className="flex flex-wrap gap-1">
                                            {tray.lab_partitions.map((p: any) => (
                                              <span key={p.id} className="px-1.5 py-0.5 bg-white border border-slate-100 rounded text-[8px] font-bold text-slate-500 uppercase tracking-tighter">
                                                {p.code}
                                              </span>
                                            ))}
                                         </div>
                                       )}
                                    </div>
                                  ))}
                               </div>
                             )}
                         </div>
                       ))}
                    </div>
                  )}
               </Card>
             ))
           )}
        </div>
      </div>
    </div>
  )
}

function BadgeCount({ count, icon: Icon, label }: { count: number, icon: any, label: string }) {
  return (
    <div className="flex flex-col items-end">
       <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg">
          {count}
       </div>
       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
  )
}
