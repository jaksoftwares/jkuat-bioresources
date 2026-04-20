'use client'

import React from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { 
  Eye, 
  Globe, 
  Droplets, 
  HeartPulse, 
  MapPin, 
  BookOpen, 
  Dna,
  Thermometer,
  FileText,
  Leaf
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface PlantDetailModalProps {
  plant: any
}

export function PlantDetailModal({ plant }: PlantDetailModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200">
          <Eye className="w-3.5 h-3.5 text-jkuat-green" />
          Full Details
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto rounded-xl border border-slate-200 shadow-2xl p-0 gap-0 bg-white">
        {/* Professional Research Header */}
        <div className="bg-slate-50 px-10 py-12 border-b border-slate-200 relative overflow-hidden">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                 <Badge variant="outline" className="bg-white text-jkuat-green border-jkuat-green/20 font-bold uppercase text-[10px] tracking-widest px-3 py-1">
                    {plant.category || 'Botanical Entry'}
                 </Badge>
                 {plant.is_aiv && (
                   <Badge className="bg-jkuat-green text-white border-none font-black uppercase text-[10px] tracking-wider px-3 py-1">
                      AIV Certified
                   </Badge>
                 )}
              </div>
              <div className="space-y-2">
                 <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 italic leading-tight">
                    {plant.scientific_name}
                 </h2>
                 <div className="flex items-center gap-4 text-slate-500 font-medium text-lg">
                    <span>{plant.common_name || 'Vernacular name unlisted'}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="text-sm font-bold uppercase tracking-wider">{plant.family_name || 'Family unspecified'}</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Genus</span>
                    <span className="text-sm font-bold text-slate-700 italic">{plant.genus || '—'}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Species</span>
                    <span className="text-sm font-bold text-slate-700 italic">{plant.species || '—'}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Record ID</span>
                    <span className="text-sm font-bold text-slate-700 font-mono">#{plant.id?.slice(0, 8).toUpperCase()}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Last Updated</span>
                    <span className="text-sm font-bold text-slate-700">{new Date(plant.updated_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                 </div>
              </div>
           </div>
           <Leaf className="absolute -bottom-10 -right-10 w-64 h-64 text-slate-200/40 rotate-12" />
        </div>

        <div className="p-10 space-y-12">
           {/* Primary Narrative Sections */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                 <section className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                       <FileText className="w-4 h-4" /> Technical Narrative
                    </h3>
                    <div className="text-slate-600 leading-relaxed text-sm font-medium space-y-4">
                       <p>{plant.description || 'No descriptive technical data available for this record.'}</p>
                    </div>
                 </section>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
                    <section className="space-y-4">
                       <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">Nutritional Profile</h3>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {plant.nutritional_value || 'Nutritional analysis pending laboratory verification.'}
                       </p>
                    </section>
                    <section className="space-y-4">
                       <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">Medicinal Application</h3>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {plant.medicinal_value || 'Medicinal properties not documented in this record.'}
                       </p>
                    </section>
                 </div>

                 <section className="space-y-4 border-t border-slate-100 pt-10">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">Ethnobotanical & Cultural Significance</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                       {plant.cultural_significance || 'Cultural data unrecorded for this species.'}
                    </p>
                 </section>
              </div>

              {/* Sidebar: Growth Matrix & Distribution */}
              <div className="space-y-10">
                 <section className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                       <Dna className="w-4 h-4 text-jkuat-green" /> Growth Parameters
                    </h3>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
                       <div className="px-5 py-4 flex justify-between items-center bg-slate-50/50">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Soil Media</span>
                          <span className="text-xs font-bold text-slate-700">{plant.growth_conditions?.soil_type || '—'}</span>
                       </div>
                       <div className="px-5 py-4 flex justify-between items-center bg-white">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Rainfall</span>
                          <span className="text-xs font-bold text-slate-700">{plant.growth_conditions?.rainfall || '—'}</span>
                       </div>
                       <div className="px-5 py-4 flex justify-between items-center bg-slate-50/50">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Sunlight</span>
                          <span className="text-xs font-bold text-slate-700">{plant.growth_conditions?.sunlight || '—'}</span>
                       </div>
                    </div>
                 </section>

                 <section className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-jkuat-green" /> Regional Distribution
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {plant.geographic_distribution?.length > 0 ? (
                         plant.geographic_distribution.map((d: string, i: number) => (
                           <span key={i} className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                              {d}
                           </span>
                         ))
                       ) : (
                         <span className="text-xs text-slate-400 italic">No distribution data mapped.</span>
                       )}
                    </div>
                 </section>
              </div>
           </div>

           {/* Media Archives */}
           <div className="space-y-8 pt-12 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-[0.2em]">Visual Evidence & Supporting Archives</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <section className="space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Field Photographs</h4>
                    <div className="grid grid-cols-3 gap-4">
                       {plant.images?.length > 0 ? (
                         plant.images.map((img: any, i: number) => (
                           <div key={i} className="aspect-square rounded-lg overflow-hidden border border-slate-200 shadow-sm transition-all hover:scale-105 duration-300">
                              <img src={img.secure_url} alt="Specimen" className="w-full h-full object-cover" />
                           </div>
                         ))
                       ) : (
                         <div className="col-span-3 aspect-video bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                            <span className="text-[10px] font-bold text-slate-300 uppercase">No Visual Evidence Found</span>
                         </div>
                       )}
                    </div>
                 </section>

                 <section className="space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Technical Documents</h4>
                    <div className="space-y-3">
                       {plant.documents?.length > 0 ? (
                         plant.documents.map((doc: any, i: number) => (
                           <a key={i} href={doc.secure_url} target="_blank" className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-jkuat-green transition-all shadow-sm">
                              <div className="p-2 bg-jkuat-green/10 rounded-lg">
                                 <FileText className="w-5 h-5 text-jkuat-green" />
                              </div>
                              <div>
                                 <span className="text-xs font-bold text-slate-700 block">Botanical_Report_{i+1}.pdf</span>
                                 <span className="text-[10px] text-slate-400 font-medium uppercase">{doc.format} • ARCHIVE</span>
                              </div>
                           </a>
                         ))
                       ) : (
                         <div className="p-8 border border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                            <span className="text-[10px] font-bold text-slate-300 uppercase italic">No supporting documents archived.</span>
                         </div>
                       )}
                    </div>
                 </section>
              </div>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
