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
import { Separator } from '@/components/ui/separator'

interface HerbariumDetailModalProps {
  specimen: any
}

export function HerbariumDetailModal({ specimen }: HerbariumDetailModalProps) {
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
                 <Badge className="bg-jkuat-green text-white border-none font-bold uppercase text-[10px] tracking-widest px-3 py-1">
                    {specimen.herbarium_code}
                 </Badge>
                 <Badge variant="outline" className="bg-white text-slate-500 border-slate-200 font-medium tracking-widest text-[10px] uppercase px-3 py-1">
                    Voucher Specimen
                 </Badge>
              </div>
              <div className="space-y-2">
                 <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight italic">
                    {specimen.scientific_name}
                 </h2>
                 <div className="flex items-center gap-4 text-slate-500 font-medium text-lg">
                    <span>{specimen.common_name || 'Vernacular name unlisted'}</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-mono">Collection Date</span>
                    <span className="text-sm font-bold text-slate-700">{specimen.collection_date || '—'}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-mono">Collector ID</span>
                    <span className="text-sm font-bold text-slate-700">{specimen.collector_id || 'System'}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-mono">Physical Hub</span>
                    <span className="text-sm font-bold text-slate-700">{specimen.physical_storage_location || '—'}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-mono">Last Updated</span>
                    <span className="text-sm font-bold text-slate-700">{new Date(specimen.updated_at || Date.now()).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                 </div>
              </div>
           </div>
           <BookOpen className="absolute -bottom-10 -right-10 w-64 h-64 text-slate-200/40 rotate-12" />
        </div>

        <div className="p-10 space-y-12 bg-white">
           {/* Primary Narrative Sections */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                 <section className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                       <Info className="w-4 h-4 text-jkuat-green" /> Environmental Context
                    </h3>
                    <div className="text-slate-600 leading-relaxed text-sm font-medium space-y-4">
                       <p>{specimen.habitat_description || 'Habitat details pending archival review.'}</p>
                    </div>
                 </section>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
                    <section className="space-y-4">
                       <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">Ecological Data</h3>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {specimen.ecological_notes || 'No specific ecological interactions recorded.'}
                       </p>
                    </section>
                    <section className="space-y-4">
                       <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">Ethnobotany & Uses</h3>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {specimen.medicinal_notes || 'Medicinal properties not documented in this record.'}
                       </p>
                    </section>
                 </div>
              </div>

              {/* Sidebar: Digital Scans and Files */}
              <div className="space-y-10">
                 <section className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                       <Eye className="w-4 h-4 text-jkuat-green" /> Digital Scans
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                       {specimen.specimen_images?.length > 0 ? (
                         specimen.specimen_images.map((img: any, i: number) => (
                           <div key={i} className="aspect-square rounded-lg overflow-hidden border border-slate-200 shadow-sm transition-all hover:scale-105 duration-300">
                              <img src={img.secure_url} alt="Scan" className="w-full h-full object-cover grayscale transition-all hover:grayscale-0" />
                           </div>
                         ))
                       ) : (
                         <div className="col-span-2 aspect-video bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                            <span className="text-[10px] font-bold text-slate-300 uppercase underline">No Assets</span>
                         </div>
                       )}
                    </div>
                 </section>

                 <section className="space-y-4 pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                       <FileText className="w-4 h-4 text-jkuat-green" /> Field Records
                    </h3>
                    <div className="space-y-3">
                       {specimen.supporting_documents?.length > 0 ? (
                         specimen.supporting_documents.map((doc: any, i: number) => (
                           <a key={i} href={doc.secure_url} target="_blank" className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-jkuat-green transition-all shadow-sm">
                              <div className="p-2 bg-white rounded-lg border border-slate-200/60">
                                 <FileText className="w-4 h-4 text-slate-400" />
                              </div>
                              <div>
                                 <span className="text-xs font-bold text-slate-700 block">Field_Narrative_{i+1}.pdf</span>
                                 <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{doc.format} • ARCHIVE</span>
                              </div>
                           </a>
                         ))
                       ) : (
                         <div className="p-6 border border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50/50">
                            <span className="text-[10px] font-bold text-slate-400 italic">No attachments indexed.</span>
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
