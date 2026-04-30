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
  BookOpen, 
  MapPin, 
  User, 
  Calendar, 
  FileText, 
  History,
  Info
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface HerbariumDetailModalProps {
  specimen: any
}

export function HerbariumDetailModal({ specimen }: HerbariumDetailModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200">
          <Eye className="w-3.5 h-3.5 text-jkuat-green" />
          Quick View
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-100 shadow-xl p-0 gap-0 bg-white">
        {/* Simplified Header */}
        <div className="bg-slate-50 border-b border-slate-100 px-8 py-10 relative">
           <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                 <Badge className="bg-jkuat-green text-white border-none font-bold uppercase text-[9px] tracking-widest px-2">
                    {specimen.herbarium_code}
                 </Badge>
                 <Badge variant="outline" className="bg-white text-slate-500 border-slate-200 font-medium text-[9px] uppercase">
                    Specimen Record
                 </Badge>
              </div>
              <div>
                 <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none italic">{specimen.scientific_name}</h2>
                 <p className="text-slate-500 text-base font-medium mt-2">{specimen.common_name || 'Common name unlisted'}</p>
              </div>
           </div>
           <BookOpen className="absolute top-1/2 -translate-y-1/2 right-10 w-24 h-24 text-slate-200/50" />
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
           {/* Left Column: Collection Context */}
           <div className="md:col-span-2 space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">Date</span>
                    <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
                       <Calendar className="w-3.5 h-3.5 text-jkuat-green" />
                       {specimen.collection_date || '—'}
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">Hub</span>
                    <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
                       <MapPin className="w-3.5 h-3.5 text-jkuat-green" />
                       {specimen.physical_storage_location || '—'}
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">Collector</span>
                    <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
                       <User className="w-3.5 h-3.5 text-jkuat-green" />
                       {specimen.collector_id || 'System'}
                    </div>
                 </div>
              </div>

              <section className="space-y-3">
                 <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.1em] flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" /> Environmental Context
                 </h3>
                 <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 leading-relaxed italic">
                    {specimen.habitat_description || 'Habitat details pending archival review.'}
                 </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-3">
                    <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.1em]">Ecological Data</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{specimen.ecological_notes || '—'}</p>
                 </div>
                 <div className="space-y-3">
                    <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.1em]">Ethnobotany</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{specimen.medicinal_notes || '—'}</p>
                 </div>
              </section>
           </div>

           {/* Right Column: Visual Evidence */}
           <div className="space-y-8">
              <section className="space-y-3">
                 <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.1em] flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5" /> Digital Scans
                 </h3>
                 <div className="grid grid-cols-2 gap-2">
                    {specimen.specimen_images?.length > 0 ? (
                      specimen.specimen_images.map((img: any, i: number) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden border border-slate-200">
                           <img src={img.secure_url} alt="Scan" className="w-full h-full object-cover grayscale transition-all hover:grayscale-0" />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 aspect-video rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                         <span className="text-[9px] font-bold text-slate-300 uppercase underline">No Assets</span>
                      </div>
                    )}
                 </div>
              </section>

              <section className="space-y-3">
                 <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.1em] flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" /> Field Records
                 </h3>
                 <div className="space-y-2">
                    {specimen.supporting_documents?.length > 0 ? (
                      specimen.supporting_documents.map((doc: any, i: number) => (
                        <a key={i} href={doc.secure_url} target="_blank" className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg transition-all hover:border-jkuat-green/30 text-xs font-bold text-slate-600">
                           <FileText className="w-3.5 h-3.5 text-slate-400" />
                           Field_Narrative_{i+1}.pdf
                        </a>
                      ))
                    ) : (
                      <p className="text-[10px] font-bold text-slate-400 italic">No attachments indexed.</p>
                    )}
                 </div>
              </section>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
