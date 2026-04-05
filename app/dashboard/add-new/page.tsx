import React from 'react'
import Link from 'next/link'
import { Leaf, Microscope, BookOpen, ChevronRight, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const resourceTypes = [
  {
    title: 'Plant Resource',
    description: 'Register new plant species, varieties, or indigenous knowledge.',
    href: '/dashboard/plants/add',
    icon: Leaf,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'hover:border-teal-400',
    hoverText: 'group-hover:text-teal-700'
  },
  {
    title: 'Microorganism',
    description: 'Upload microbial strains, growth characteristics, and storage data.',
    href: '/dashboard/microorganisms/add',
    icon: Microscope,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'hover:border-indigo-400',
    hoverText: 'group-hover:text-indigo-700'
  },
  {
    title: 'Herbarium Specimen',
    description: 'Add physical voucher specimens with collection details and storage.',
    href: '/dashboard/herbarium/add',
    icon: BookOpen,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'hover:border-amber-400',
    hoverText: 'group-hover:text-amber-700'
  }
]

export default function AddNewResourcePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Upload New Bioresource</h1>
        <p className="text-slate-500 text-lg">Select the type of resource you want to contribute to the database.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {resourceTypes.map((type) => (
          <Link key={type.href} href={type.href} className="group">
            <Card className={cn(
              "border-2 border-slate-100 transition-all duration-300 shadow-sm overflow-hidden",
              type.border,
              "hover:shadow-md hover:bg-slate-50/30"
            )}>
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className={cn("p-5 rounded-2xl transition-all duration-300 group-hover:scale-105", type.bg)}>
                    <type.icon className={cn("w-10 h-10", type.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className={cn("text-xl font-bold text-slate-800 transition-colors", type.hoverText)}>
                      {type.title}
                    </h2>
                    <p className="text-slate-500 mt-1">{type.description}</p>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 group-hover:border-slate-300 group-hover:bg-white text-slate-300 group-hover:text-slate-900 transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-100 p-4 border rounded-xl flex gap-3 items-start">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-700 font-medium">
          Make sure you have scientific identification, collection details, and any relevant supporting documents (images/PDFs) ready before starting the upload process.
        </p>
      </Card>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
