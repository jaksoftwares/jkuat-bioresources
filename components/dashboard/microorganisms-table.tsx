'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Database, Download, Microscope, MapPin, HardDrive } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MicroorganismModal } from '@/components/dashboard/microorganism-modal'
import { MicroorganismRowActions } from '@/components/dashboard/microorganism-row-actions'
import { Microorganism } from '@/types'

interface MicroorganismsTableProps {
  initialMicros: (Microorganism & { lab_test_tubes?: any[] })[]
  role: string
}

export function MicroorganismsTable({ initialMicros, role }: MicroorganismsTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [microorganisms, setMicroorganisms] = useState(initialMicros)

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '')
    setMicroorganisms(initialMicros)
  }, [initialMicros, searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchTerm) params.set('search', searchTerm)
    else params.delete('search')
    router.push(`/dashboard/microorganisms?${params.toString()}`)
  }

  const handleClear = () => {
    setSearchTerm('')
    router.push('/dashboard/microorganisms')
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">Microorganisms</h1>
          <p className="text-jkuat-gray-500 mt-2 text-sm font-semibold uppercase tracking-widest">Microbial Strain Repository</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="border-jkuat-gray-200 text-jkuat-gray-600 font-bold gap-2 h-12 rounded-xl">
             <Download className="w-4.5 h-4.5" />
             Export
           </Button>
           <MicroorganismModal mode="add" />
        </div>
      </div>

      <Card className="border-jkuat-gray-200 shadow-sm overflow-hidden bg-white rounded-xl">
        <CardContent className="p-0">
          <form onSubmit={handleSearch} className="p-6 border-b border-jkuat-gray-100 bg-jkuat-gray-50/50 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-jkuat-gray-400 font-bold" />
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search strains or characteristics..." 
                className="pl-10 bg-white border-jkuat-gray-200 focus:ring-jkuat-green/20 font-medium h-12 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit" className="bg-jkuat-green hover:bg-jkuat-green-dark text-white font-bold h-12 px-6 rounded-xl">Search Strain</Button>
              {searchParams.get('search') && <Button onClick={handleClear} variant="ghost" className="text-jkuat-gray-400 font-bold">Clear</Button>}
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-jkuat-gray-100 text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400 bg-jkuat-gray-50/20">
                  <th className="px-6 py-5">Strain Nomenclature</th>
                  <th className="px-6 py-5">Physical Inventory Location</th>
                  <th className="px-6 py-5">Isolation Source</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jkuat-gray-100 italic-none">
                {microorganisms.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-24 text-center">
                       <div className="flex flex-col items-center justify-center space-y-4 opacity-30">
                          <Microscope className="w-12 h-12 text-jkuat-gray-400" />
                          <p className="font-bold text-xs uppercase tracking-[0.3em]">No strains detected in repository</p>
                       </div>
                    </td>
                  </tr>
                ) : (
                  microorganisms.map((item) => {
                    const getProp = (obj: any, key: string) => {
                      if (!obj) return null;
                      // Handle the case where obj itself might be the result of a plural/singular join
                      const variations = [key, key.replace(/s$/, ''), `lab_${key}`, `lab_${key.replace(/s$/, '')}`];
                      for (const v of variations) {
                        if (obj[v]) {
                          const val = obj[v];
                          return Array.isArray(val) ? val[0] : val;
                        }
                      }
                      return null;
                    };

                    // Handle both One-to-One (Object) and One-to-Many (Array) from Supabase
                    const rawStorage = item.lab_test_tubes;
                    const storage = Array.isArray(rawStorage) ? rawStorage[0] : rawStorage;
                    
                    const partition = getProp(storage, 'lab_partitions');
                    const tray = getProp(partition, 'lab_trays');
                    const shelf = getProp(tray, 'lab_shelves');
                    const fridge = getProp(shelf, 'lab_fridges');
                    
                    const storageString = storage ? `${fridge?.code || 'F'} › SHL-${shelf?.code || '?'} › TRY-${tray?.code || '?'}` : null;

                    return (
                      <tr key={item.id} className="hover:bg-jkuat-green-light/5 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="font-extrabold text-jkuat-gray-900 group-hover:text-jkuat-green transition-colors italic tracking-tight text-base">{item.scientific_name}</span>
                            <span className="text-[10px] font-black text-jkuat-gray-400 uppercase tracking-widest mt-1 font-mono">{item.strain_code || 'UNTRACKED'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          {storageString ? (
                            <div className="flex flex-col space-y-1">
                               <div className="flex items-center gap-1.5 text-xs font-bold text-jkuat-gray-700">
                                  <HardDrive className="w-3.5 h-3.5 text-jkuat-green" />
                                  {storageString}
                               </div>
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Vial: {storage.tube_label}</span>
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest text-slate-300 border-slate-100">Unallocated</Badge>
                          )}
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-300" />
                              <span className="text-sm text-jkuat-gray-600 font-bold">{item.source_isolated_from || '—'}</span>
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 font-bold text-[10px] uppercase tracking-wider h-6">Active Culture</Badge>
                        </td>
                        <td className="px-6 py-5 text-right"><MicroorganismRowActions microorganism={item} /></td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between text-[10px] font-black text-jkuat-gray-400 px-2 uppercase tracking-widest border-t border-jkuat-gray-100 pt-6">
        <span>Displaying {microorganisms.length} microbial strains from repository</span>
      </div>
    </div>
  )
}
