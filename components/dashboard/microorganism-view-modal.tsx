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
  Microscope, 
  MapPin, 
  HardDrive, 
  Settings, 
  Thermometer, 
  FlaskConical,
  Activity,
  History,
  Globe
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface MicroorganismDetailModalProps {
  micro: any
}

export function MicroorganismDetailModal({ micro }: MicroorganismDetailModalProps) {
  const getVal = (val: any) => Array.isArray(val) ? val[0] : val;
  const storage = micro.lab_test_tubes?.[0];
  const partition = getVal(storage?.lab_partitions);
  const tray = getVal(partition?.lab_trays);
  const shelf = getVal(tray?.lab_shelves);
  const fridge = getVal(shelf?.lab_fridges);

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
        <div className="bg-slate-900 border-b border-slate-800 px-10 py-12 relative overflow-hidden">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                 <Badge className="bg-jkuat-green text-white border-none font-bold uppercase text-[10px] tracking-wider px-3 py-1">
                    {micro.strain_code || 'UNTRACKED'}
                 </Badge>
                 <Badge variant="outline" className="text-white/60 border-white/20 font-medium tracking-widest text-[10px] uppercase px-3 py-1">
                    {micro.type || 'Microbial Culture'}
                 </Badge>
              </div>
              <div className="space-y-2">
                 <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight italic">
                    {micro.scientific_name}
                 </h2>
                 <div className="flex items-center gap-4 text-white/60 font-medium text-lg">
                    <span className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-jkuat-green">
                       <Activity className="w-4 h-4" /> Biochemical Registry
                    </span>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
                 <div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Source</span>
                    <span className="text-sm font-bold text-white/90">{micro.source_isolated_from || 'Not Stated'}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Geographic Origin</span>
                    <span className="text-sm font-bold text-white/90">{micro.geographic_origin || 'Institutional Registry'}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Record ID</span>
                    <span className="text-sm font-bold text-white/90 font-mono">#{micro.id?.slice(0, 8).toUpperCase()}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Last Updated</span>
                    <span className="text-sm font-bold text-white/90">{new Date(micro.updated_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                 </div>
              </div>
           </div>
           <Microscope className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
        </div>

        <div className="p-10 space-y-12 bg-white">
           {/* Primary Narrative Sections */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                 <section className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                       <FlaskConical className="w-4 h-4" /> Identity & Characteristics
                    </h3>
                    <div className="text-slate-600 leading-relaxed text-sm font-medium space-y-4">
                       <p>{micro.characteristics || 'No detailed biochemical sequence archives found.'}</p>
                    </div>
                 </section>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
                    <section className="space-y-4">
                       <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">Enzymatic Activity</h3>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {micro.enzymatic_activity || 'No enzymatic activity assays recorded.'}
                       </p>
                    </section>
                    <section className="space-y-4">
                       <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">Experiment Details</h3>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {micro.experiment_details || 'No linked experimental protocols.'}
                       </p>
                    </section>
                 </div>
              </div>

              {/* Sidebar: Physical Inventory & Parameters */}
              <div className="space-y-10">
                 <section className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                       <Thermometer className="w-4 h-4 text-jkuat-green" /> Growth & Maintenance
                    </h3>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
                       <div className="px-5 py-4 flex flex-col gap-1 bg-slate-50/50">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Growth Medium</span>
                          <span className="text-xs font-bold text-slate-700">{micro.growth_medium || '—'}</span>
                       </div>
                       <div className="px-5 py-4 flex flex-col gap-1 bg-white">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Optimum Temp.</span>
                          <span className="text-xs font-bold text-slate-700">{micro.optimum_temperature ? `${micro.optimum_temperature}°C` : '—'}</span>
                       </div>
                       <div className="px-5 py-4 flex flex-col gap-1 bg-slate-50/50">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">pH Range (Min - Max)</span>
                          <span className="text-xs font-bold text-slate-700">
                             {micro.min_ph || '-'} to {micro.max_ph || '-'}
                          </span>
                       </div>
                    </div>
                 </section>

                 <section className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                       <HardDrive className="w-4 h-4 text-jkuat-green" /> Physical Mapping
                    </h3>
                    <div className="bg-jkuat-green/5 border border-jkuat-green/10 p-5 rounded-xl">
                       {storage ? (
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                               <span className="text-[9px] font-black uppercase text-jkuat-green/60 block">Unit</span>
                               <span className="text-xs font-black text-slate-800">{fridge?.code || '—'}</span>
                            </div>
                            <div className="space-y-1">
                               <span className="text-[9px] font-black uppercase text-jkuat-green/60 block">Shelf/Tray</span>
                               <span className="text-xs font-black text-slate-800">{shelf?.code || '—'} / {tray?.code || '—'}</span>
                            </div>
                            <div className="col-span-2 space-y-1 pt-2 border-t border-jkuat-green/10">
                               <span className="text-[9px] font-black uppercase text-jkuat-green/60 block">Vial ID</span>
                               <span className="text-sm font-black text-jkuat-green tracking-widest">{storage.tube_label}</span>
                            </div>
                         </div>
                       ) : (
                         <p className="text-[11px] font-bold text-slate-500 italic">Inventory allocation pending.</p>
                       )}
                    </div>
                 </section>
                 
                 <section className="space-y-3 pt-6 border-t border-slate-100">
                    <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.1em] flex items-center gap-2">
                       <History className="w-3.5 h-3.5" /> Provenance
                    </h3>
                    <div className="space-y-2">
                       <div>
                          <span className="text-[9px] font-black text-slate-400 uppercase block">Curated By</span>
                          <span className="text-xs font-bold text-slate-600 font-mono">{micro.researcher_id || 'ADMIN'}</span>
                       </div>
                       {micro.date_stored && (
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block">Date Stored</span>
                            <span className="text-xs font-bold text-slate-600">{micro.date_stored}</span>
                         </div>
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
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Microscopy Images</h4>
                    <div className="grid grid-cols-3 gap-4">
                       {micro.microscopy_images?.length > 0 ? (
                         micro.microscopy_images.map((img: any, i: number) => (
                           <div key={i} className="aspect-square rounded-lg overflow-hidden border border-slate-200 shadow-sm transition-all hover:scale-105 duration-300">
                              <img src={img.secure_url} alt="Microscopy" className="w-full h-full object-cover grayscale transition-all hover:grayscale-0" />
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
                       {micro.supporting_docs?.length > 0 ? (
                         micro.supporting_docs.map((doc: any, i: number) => (
                           <a key={i} href={doc.secure_url} target="_blank" className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-jkuat-green transition-all shadow-sm">
                              <div className="p-2 bg-slate-100 rounded-lg">
                                 <FileText className="w-5 h-5 text-slate-500" />
                              </div>
                              <div>
                                 <span className="text-xs font-bold text-slate-700 block">Protocol_Report_{i+1}.pdf</span>
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
