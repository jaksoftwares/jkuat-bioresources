'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, Database, Link as LinkIcon, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { PlantModal } from '@/components/dashboard/plant-modal'
import { PlantRowActions } from '@/components/dashboard/plant-row-actions'
import { Plant } from '@/types'

interface PlantsTableProps {
  initialPlants: Plant[]
  role: string
}

export function PlantsTable({ initialPlants, role }: PlantsTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [plants, setPlants] = useState(initialPlants)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Sync state with search params
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '')
    setPlants(initialPlants)
  }, [initialPlants, searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    router.push(`/dashboard/plants?${params.toString()}`)
  }

  const handleClear = () => {
    setSearchTerm('')
    router.push('/dashboard/plants')
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-jkuat-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-jkuat-gray-900 tracking-tight">
             Plants
          </h1>
          <p className="text-jkuat-gray-500 mt-2 text-sm font-semibold uppercase tracking-widest leading-relaxed">
             Biological Repository Control
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="border-jkuat-gray-200 text-jkuat-gray-600 font-bold gap-2 h-12 rounded-xl">
             <Download className="w-4.5 h-4.5" />
             Export
           </Button>
           <PlantModal mode="add" />
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
                placeholder="Search scientific or common name..." 
                className="pl-10 bg-white border-jkuat-gray-200 focus:ring-jkuat-green/20 font-medium h-12 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit" className="bg-jkuat-green hover:bg-jkuat-green-dark text-white font-bold h-12 px-6 rounded-xl transition-all">
                Search
              </Button>
              {searchParams.get('search') && (
                 <Button onClick={handleClear} variant="ghost" className="text-jkuat-gray-400 font-bold hover:text-rose-600">
                   Clear
                 </Button>
              )}
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-jkuat-gray-100 text-sm font-semibold text-jkuat-gray-600 bg-jkuat-gray-50/20">
                  <th className="px-6 py-4">Scientific Name</th>
                  <th className="px-6 py-4">Common Name</th>
                  <th className="px-6 py-4">Family</th>
                  <th className="px-6 py-4">Classification</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jkuat-gray-100 italic-none">
                {plants.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                         <Database className="w-10 h-10 text-jkuat-gray-400" />
                         <p className="font-bold text-xs uppercase tracking-[0.2em]">No biological records found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  plants.map((plant) => (
                    <tr key={plant.id} className="hover:bg-jkuat-green-light/5 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-jkuat-gray-900 group-hover:text-jkuat-green transition-colors italic tracking-tight">
                          {plant.scientific_name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-jkuat-gray-600 font-medium">
                          {plant.common_name || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-xs font-bold text-jkuat-gray-400 uppercase tracking-widest">
                           {plant.family_name || 'Unclassified'}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                         {plant.is_aiv ? (
                           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-jkuat-green-light text-jkuat-green-dark border border-jkuat-green/10 text-[9px] font-bold uppercase tracking-widest">
                              <span className="w-1 h-1 rounded-full bg-jkuat-green" />
                              AIV Indigenous
                           </div>
                         ) : (
                            <span className="text-[9px] font-bold text-jkuat-gray-400 uppercase tracking-widest">Standard</span>
                         )}
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-[10px] font-bold text-jkuat-gray-400 uppercase tracking-widest">
                           {new Date(plant.updated_at).toLocaleDateString()}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <PlantRowActions plant={plant} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between text-[10px] font-bold text-jkuat-gray-400 px-2 uppercase tracking-widest border-t border-jkuat-gray-100 pt-6">
        <span>Displaying {plants.length} plant records</span>
      </div>
    </div>
  )
}
