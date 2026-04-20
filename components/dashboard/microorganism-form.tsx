'use client'

import { FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Microscope, MapPin, Search, Settings, Save, Smartphone, History, Trash2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadToCloudinary } from '@/actions/media-actions'
import type { Microorganism, CloudinaryMedia } from '@/types'
import { toast } from 'sonner'

interface MicroorganismFormProps {
  initialValues?: Partial<Microorganism> & { lab_test_tubes?: any[] }
  submitUrl: string
  submitMethod: 'POST' | 'PUT'
  submitLabel: string
  onSuccess?: () => void
}

export default function MicroorganismForm({
  initialValues,
  submitUrl,
  submitMethod,
  submitLabel,
  onSuccess,
}: MicroorganismFormProps) {
  const router = useRouter()
  
  // Basic Info
  const [scientificName, setScientificName] = useState(initialValues?.scientific_name ?? '')
  const [strainCode, setStrainCode] = useState(initialValues?.strain_code ?? '')
  const [source, setSource] = useState(initialValues?.source_isolated_from ?? '')
  const [researcherId, setResearcherId] = useState(initialValues?.researcher_id ?? '')
  
  // Storage
  const [fridge, setFridge] = useState('')
  const [shelf, setShelf] = useState('')
  const [tray, setTray] = useState('')
  const [partition, setPartition] = useState('')
  const [tubeLabel, setTubeLabel] = useState('')
  
  // Suggestions
  const [suggestions, setSuggestions] = useState<{ fridges: string[], shelves: string[], trays: string[], partitions: string[] }>({
    fridges: [], shelves: [], trays: [], partitions: []
  })

  // Biological Params
  const [optTemp, setOptTemp] = useState(initialValues?.optimum_temperature?.toString() ?? '')
  const [minPh, setMinPh] = useState(initialValues?.min_ph?.toString() ?? '')
  const [maxPh, setMaxPh] = useState(initialValues?.max_ph?.toString() ?? '')
  const [medium, setMedium] = useState(initialValues?.growth_medium ?? '')
  
  // Experimental
  const [characteristics, setCharacteristics] = useState(initialValues?.characteristics ?? '')
  const [enzymatic, setEnzymatic] = useState(initialValues?.enzymatic_activity ?? '')
  const [notes, setNotes] = useState(initialValues?.experiment_details ?? '')
  const [dateStored, setDateStored] = useState(initialValues?.date_stored ?? '')

  // Media
  const [images, setImages] = useState<CloudinaryMedia[]>(initialValues?.microscopy_images || [])
  const [docs, setDocs] = useState<CloudinaryMedia[]>(initialValues?.supporting_docs || [])
  const [pendingImages, setPendingImages] = useState<File[]>([])
  const [pendingDocs, setPendingDocs] = useState<File[]>([])

  // Initialize data
  useEffect(() => {
    // Fetch suggestions
    fetch('/api/storage-codes').then(res => res.json()).then(data => setSuggestions(data)).catch(() => {})
    
    // Fetch researchers
    fetch('/api/researchers').then(res => res.json()).then(setResearchers).catch(() => {})

    if (initialValues?.lab_test_tubes?.[0]) {
      const tube = initialValues.lab_test_tubes[0];
      setTubeLabel(tube.tube_label || '');
      
      const getP = (obj: any, key: string) => {
        if (!obj) return null;
        const variations = [key, key.replace(/s$/, ''), `lab_${key}`, `lab_${key.replace(/s$/, '')}`];
        for (const v of variations) {
          if (obj[v]) {
            const val = obj[v];
            return Array.isArray(val) ? val[0] : val;
          }
        }
        return null;
      };
      
      const part = getP(tube, 'lab_partitions');
      if (part) {
        setPartition(part.code || '');
        const t = getP(part, 'lab_trays');
        if (t) {
          setTray(t.code || '');
          const s = getP(t, 'lab_shelves');
          if (s) {
            setShelf(s.code || '');
            const f = getP(s, 'lab_fridges');
            if (f) setFridge(f.code || '');
          }
        }
      }
    }
  }, [initialValues])

  const [researchers, setResearchers] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>, type: 'img' | 'doc') => {
    const selected = event.target.files; if (!selected) return;
    if (type === 'img') setPendingImages(prev => [...prev, ...Array.from(selected)]);
    else setPendingDocs(prev => [...prev, ...Array.from(selected)]);
  }

  const performUpload = async (type: 'img' | 'doc') => {
    const files = type === 'img' ? pendingImages : pendingDocs;
    if (files.length === 0) return;
    
    setUploading(true)
    try {
      const results: CloudinaryMedia[] = [];
      for (const file of files) {
        const reader = new FileReader()
        const base64 = await new Promise<string>(r => { reader.onload = () => r(reader.result as string); reader.readAsDataURL(file) })
        const res = await uploadToCloudinary(base64, `microorganisms/${type === 'img' ? 'images' : 'docs'}`)
        results.push(res);
      }
      if (type === 'img') {
        setImages(prev => [...prev, ...results]);
        setPendingImages([]);
      } else {
        setDocs(prev => [...prev, ...results]);
        setPendingDocs([]);
      }
      toast.success('Files uploaded to archive');
    } catch { 
      setErrorMessage('Media sync failed');
      toast.error('Upload failed');
    } finally { 
      setUploading(false);
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(''); setIsSubmitting(true)

    try {
      let finalImages = [...images];
      if (pendingImages.length > 0) {
        setUploading(true);
        const resultsImg: CloudinaryMedia[] = [];
        for (const file of pendingImages) {
          const reader = new FileReader();
          const base64 = await new Promise<string>(r => { reader.onload = () => r(reader.result as string); reader.readAsDataURL(file); });
          const res = await uploadToCloudinary(base64, 'microorganisms/images');
          resultsImg.push(res);
        }
        finalImages = [...finalImages, ...resultsImg];
        setImages(finalImages);
        setPendingImages([]);
        setUploading(false);
      }

      let finalDocs = [...docs];
      if (pendingDocs.length > 0) {
        setUploading(true);
        const resultsDoc: CloudinaryMedia[] = [];
        for (const file of pendingDocs) {
          const reader = new FileReader();
          const base64 = await new Promise<string>(r => { reader.onload = () => r(reader.result as string); reader.readAsDataURL(file); });
          const res = await uploadToCloudinary(base64, 'microorganisms/docs');
          resultsDoc.push(res);
        }
        finalDocs = [...finalDocs, ...resultsDoc];
        setDocs(finalDocs);
        setPendingDocs([]);
        setUploading(false);
      }

      const payload = {
        scientific_name: scientificName,
        strain_code: strainCode || undefined,
        source_isolated_from: source || undefined,
        researcher_id: researcherId || undefined,
        optimum_temperature: optTemp ? parseFloat(optTemp) : undefined,
        min_ph: minPh ? parseFloat(minPh) : undefined,
        max_ph: maxPh ? parseFloat(maxPh) : undefined,
        growth_medium: medium || undefined,
        characteristics: characteristics || undefined,
        enzymatic_activity: enzymatic || undefined,
        experiment_details: notes || undefined,
        date_stored: dateStored || undefined,
        microscopy_images: finalImages,
        supporting_docs: finalDocs,
        storage_labels: {
          fridge_code: fridge,
          shelf_code: shelf,
          tray_code: tray,
          partition_code: partition,
          tube_label: tubeLabel || strainCode
        }
      }

      const res = await fetch(submitUrl, {
        method: submitMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to save record')
      if (onSuccess) onSuccess(); else router.push('/dashboard/microorganisms');
      router.refresh()
    } catch (err) { setErrorMessage((err as Error).message) } finally { setIsSubmitting(false) }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="space-y-2">
              <Label className="text-sm font-extrabold flex items-center gap-2"><Microscope className="w-4 h-4 text-emerald-600" /> Scientific Name</Label>
              <Input value={scientificName} onChange={e => setScientificName(e.target.value)} required className="h-11 italic" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-extrabold flex items-center gap-2"><Settings className="w-4 h-4 text-emerald-400" /> Strain ID</Label>
              <Input value={strainCode} onChange={e => setStrainCode(e.target.value)} placeholder="e.g. JKUAT-MIC-2024" className="h-11" />
            </div>
        </div>

        <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
           <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Storage Mapping</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                 <Label className="text-[10px] font-black uppercase text-slate-400 pl-1">Fridge Code</Label>
                 <Input list="fridge-list" value={fridge} onChange={e => setFridge(e.target.value)} placeholder="e.g. F1" className="h-10 bg-white" />
                 <datalist id="fridge-list">{suggestions.fridges.map(c => <option key={c} value={c}>{c}</option>)}</datalist>
              </div>
              <div className="space-y-1.5">
                 <Label className="text-[10px] font-black uppercase text-slate-400 pl-1">Shelf Unit</Label>
                 <Input list="shelf-list" value={shelf} onChange={e => setShelf(e.target.value)} placeholder="e.g. S4" className="h-10 bg-white" />
                 <datalist id="shelf-list">{suggestions.shelves.map(c => <option key={c} value={c}>{c}</option>)}</datalist>
              </div>
              <div className="space-y-1.5">
                 <Label className="text-[10px] font-black uppercase text-slate-400 pl-1">Tray ID</Label>
                 <Input list="tray-list" value={tray} onChange={e => setTray(e.target.value)} placeholder="e.g. T2" className="h-10 bg-white" />
                 <datalist id="tray-list">{suggestions.trays.map(c => <option key={c} value={c}>{c}</option>)}</datalist>
              </div>
              <div className="space-y-1.5">
                 <Label className="text-[10px] font-black uppercase text-slate-400 pl-1">Partition/Slot</Label>
                 <Input list="partition-list" value={partition} onChange={e => setPartition(e.target.value)} placeholder="e.g. P12" className="h-10 bg-white" />
                 <datalist id="partition-list">{suggestions.partitions.map(c => <option key={c} value={c}>{c}</option>)}</datalist>
              </div>
           </div>
           <div className="pt-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 pl-1">Vial / Tube Label</Label>
              <Input value={tubeLabel} onChange={e => setTubeLabel(e.target.value)} placeholder="Physical tag on sample vial..." className="h-11 bg-white font-mono font-bold" />
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-emerald-50/20 p-6 rounded-2xl border border-emerald-100">
           <div className="col-span-2 space-y-1.5"><Label className="text-[10px] font-black uppercase tracking-tight text-emerald-800">Culture Medium</Label><Input value={medium} onChange={e => setMedium(e.target.value)} className="h-10 bg-white" /></div>
           <div className="space-y-1.5"><Label className="text-[10px] font-black uppercase tracking-tight text-emerald-800">Temp (°C)</Label><Input type="number" step="0.1" value={optTemp} onChange={e => setOptTemp(e.target.value)} className="h-10 bg-white" /></div>
           <div className="space-y-1.5"><Label className="text-[10px] font-black uppercase tracking-tight text-emerald-800">pH Range</Label><div className="flex gap-1"><Input type="number" step="0.1" value={minPh} onChange={e => setMinPh(e.target.value)} placeholder="Min" className="h-10 bg-white" /><Input type="number" step="0.1" value={maxPh} onChange={e => setMaxPh(e.target.value)} placeholder="Max" className="h-10 bg-white" /></div></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
              <Label className="text-sm font-bold">Researcher</Label>
              <select value={researcherId} onChange={e => setResearcherId(e.target.value)} className="w-full h-11 rounded-xl bg-white border border-slate-200 px-4 text-sm font-bold">
                <option value="">Select Researcher...</option>
                {researchers.map(r => <option key={r.id} value={r.researchers?.[0]?.id}>{r.full_name}</option>)}
              </select>
           </div>
           <div className="space-y-2">
              <Label className="text-sm font-bold">Isolation Source</Label>
              <Input value={source} onChange={e => setSource(e.target.value)} className="h-11 bg-white" />
           </div>
        </div>

        <div className="space-y-4">
           <div className="space-y-2"><Label className="text-sm font-bold">Biochemical Activities / Characteristics</Label><textarea value={characteristics} onChange={e => setCharacteristics(e.target.value)} className="w-full min-h-[100px] rounded-xl border border-slate-200 p-4" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
           <div className="space-y-4">
              <Label className="text-xs font-black uppercase text-slate-400">Microscopy Images</Label>
              <div className="flex gap-2">
                <Input type="file" multiple accept="image/*" onChange={e => handleFileSelection(e, 'img')} disabled={uploading} className="h-11 bg-white pt-2 border-slate-200" />
                <Button type="button" onClick={() => performUpload('img')} disabled={uploading || pendingImages.length === 0} variant="outline" className="h-11 border-emerald-200 text-emerald-600 gap-2">
                   <Upload className="w-4 h-4" /> {uploading ? '...' : 'Upload'}
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-4">
                 {pendingImages.map((file, idx) => (
                   <div key={`pending-img-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                      <img src={URL.createObjectURL(file)} alt="Pending Upload" className="w-full h-full object-cover opacity-70" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[10px] font-bold text-white uppercase tracking-widest">Pending</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setPendingImages(pendingImages.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                         <Trash2 className="w-3 h-3" />
                      </button>
                   </div>
                 ))}
                 {images.map((img, idx) => (
                   <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                      <img src={img.secure_url} alt="Microscopy" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        className="absolute inset-0 bg-rose-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-4">
              <Label className="text-xs font-black uppercase text-slate-400">Supporting Documentation (PDF)</Label>
              <div className="flex gap-2">
                <Input type="file" multiple accept=".pdf" onChange={e => handleFileSelection(e, 'doc')} disabled={uploading} className="h-11 bg-white pt-2 border-slate-200" />
                <Button type="button" onClick={() => performUpload('doc')} disabled={uploading || pendingDocs.length === 0} variant="outline" className="h-11 border-emerald-200 text-emerald-600 gap-2">
                   <Upload className="w-4 h-4" /> {uploading ? '...' : 'Upload'}
                </Button>
              </div>
              
              <div className="space-y-2 mt-4">
                 {pendingDocs.map((file, idx) => (
                   <div key={`pending-doc-${idx}`} className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-[9px] font-bold text-slate-400 italic">
                      Pending Sync: {file.name}
                   </div>
                 ))}
                 {docs.map((doc, idx) => (
                   <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-white rounded-lg"><Settings className="w-3.5 h-3.5 text-slate-400" /></div>
                         <span className="text-[10px] font-bold text-slate-600 truncate max-w-[150px]">RecordDoc_{idx + 1}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setDocs(docs.filter((_, i) => i !== idx))}
                        className="text-slate-300 hover:text-rose-600 transition-colors"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 border-t border-slate-100">
           {errorMessage && <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg">{errorMessage}</div>}
           <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting || uploading} className="bg-jkuat-green hover:bg-jkuat-green-dark text-white font-bold h-12 px-12 rounded-xl transition-all shadow-lg">
                {isSubmitting ? 'Saving...' : submitLabel}
              </Button>
           </div>
        </div>
      </form>
    </div>
  )
}
