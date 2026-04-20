'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Database, Download, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { HerbariumModal } from '@/components/dashboard/herbarium-modal'
import { HerbariumRowActions } from '@/components/dashboard/herbarium-row-actions'
import { HerbariumSpecimen } from '@/types'

interface HerbariumTableProps {
  initialSpecimens: HerbariumSpecimen[]
  role: string
}

export function HerbariumTable({ initialSpecimens, role }: HerbariumTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [specimens, setSpecimens] = useState(initialSpecimens)

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '')
    setSpecimens(initialSpecimens)
  }, [initialSpecimens, searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchTerm) params.set('search', searchTerm)
    else params.delete('search')
    router.push(`/dashboard/herbarium?${params.toString()}`)
  }

  const handleClear = () => {
    setSearchTerm('')
    router.push('/dashboard/herbarium')
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">Herbarium</h1>
          <p className="text-jkuat-gray-500 mt-2 text-sm font-semibold uppercase tracking-widest">Digital Specimen Archive</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="border-jkuat-gray-200 text-jkuat-gray-600 font-bold gap-2 h-12 rounded-xl">
             <Download className="w-4.5 h-4.5" />
             Export
           </Button>
           <HerbariumModal mode="add" />
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
                placeholder="Search archive or collector..." 
                className="pl-10 bg-white border-jkuat-gray-200 focus:ring-jkuat-green/20 font-medium h-12 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit" className="bg-jkuat-green hover:bg-jkuat-green-dark text-white font-bold h-12 px-6 rounded-xl">Search</Button>
              {searchParams.get('search') && <Button onClick={handleClear} variant="ghost" className="text-jkuat-gray-400 font-bold">Clear</Button>}
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-jkuat-gray-100 text-sm font-semibold text-jkuat-gray-600 bg-jkuat-gray-50/20">
                  <th className="px-6 py-4">Specimen Info</th>
                  <th className="px-6 py-4">Collector</th>
                  <th className="px-6 py-4">Collection Date</th>
                  <th className="px-6 py-4">Storage Location</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jkuat-gray-100 italic-none">
                {specimens.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                       <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                          <BookOpen className="w-10 h-10 text-jkuat-gray-400" />
                          <p className="font-bold text-xs uppercase tracking-[0.2em]">No specimens archived</p>
                       </div>
                    </td>
                  </tr>
                ) : (
                  specimens.map((item) => (
                    <tr key={item.id} className="hover:bg-jkuat-green-light/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-jkuat-gray-900 group-hover:text-jkuat-green transition-colors italic tracking-tight">{item.scientific_name}</span>
                          <span className="text-[10px] font-bold text-jkuat-gray-400 uppercase tracking-widest mt-0.5">{item.herbarium_code}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm text-jkuat-gray-600 font-medium">{item.collector_id || 'Institutional'}</span></td>
                      <td className="px-6 py-4"><span className="text-[10px] font-bold text-jkuat-gray-400 uppercase tracking-widest">{item.collection_date || '—'}</span></td>
                      <td className="px-6 py-4"><span className="text-xs font-bold text-jkuat-gray-400 uppercase tracking-widest">{item.physical_storage_location || '—'}</span></td>
                      <td className="px-6 py-4 text-right"><HerbariumRowActions specimen={item} /></td>
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
