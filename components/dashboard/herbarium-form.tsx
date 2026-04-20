'use client'

import { FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, MapPin, User, Calendar, FileText, Trash2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadToCloudinary } from '@/actions/media-actions'
import type { HerbariumSpecimen, CloudinaryMedia } from '@/types'
import { toast } from 'sonner'

interface HerbariumFormProps {
  initialValues?: Partial<HerbariumSpecimen>
  submitUrl: string
  submitMethod: 'POST' | 'PUT'
  submitLabel: string
  onSuccess?: () => void
}

export default function HerbariumForm({
  initialValues,
  submitUrl,
  submitMethod,
  submitLabel,
  onSuccess,
}: HerbariumFormProps) {
  const router = useRouter()
  
  // Specimen Identification
  const [herbariumCode, setHerbariumCode] = useState(initialValues?.herbarium_code ?? '')
  const [scientificName, setScientificName] = useState(initialValues?.scientific_name ?? '')
  const [commonName, setCommonName] = useState(initialValues?.common_name ?? '')
  
  // Provenance & Context
  const [collectorId, setCollectorId] = useState(initialValues?.collector_id ?? '')
  const [collectionDate, setCollectionDate] = useState(initialValues?.collection_date ?? '')
  const [storageLocation, setStorageLocation] = useState(initialValues?.physical_storage_location ?? '')

  // Descriptive Data
  const [habitat, setHabitat] = useState(initialValues?.habitat_description ?? '')
  const [ecological, setEcological] = useState(initialValues?.ecological_notes ?? '')
  const [medicinal, setMedicinal] = useState(initialValues?.medicinal_notes ?? '')

  // Media
  const [images, setImages] = useState<CloudinaryMedia[]>(initialValues?.specimen_images || [])
  const [docs, setDocs] = useState<CloudinaryMedia[]>(initialValues?.supporting_documents || [])
  const [pendingImages, setPendingImages] = useState<File[]>([])
  const [pendingDocs, setPendingDocs] = useState<File[]>([])

  // Researchers List
  const [researchers, setResearchers] = useState<any[]>([])
  useEffect(() => {
    fetch('/api/researchers').then(res => res.json()).then(data => {
       if (Array.isArray(data)) setResearchers(data);
    });
  }, [])

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
        const res = await uploadToCloudinary(base64, `herbarium/${type === 'img' ? 'images' : 'docs'}`)
        results.push(res);
      }
      if (type === 'img') {
        setImages(prev => [...prev, ...results]);
        setPendingImages([]);
      } else {
        setDocs(prev => [...prev, ...results]);
        setPendingDocs([]);
      }
      toast.success('Archival media synced successfully');
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
      const payload = {
        herbarium_code: herbariumCode,
        scientific_name: scientificName,
        common_name: commonName || undefined,
        collector_id: collectorId || undefined,
        collection_date: collectionDate || undefined,
        physical_storage_location: storageLocation || undefined,
        habitat_description: habitat || undefined,
        ecological_notes: ecological || undefined,
        medicinal_notes: medicinal || undefined,
        specimen_images: images,
        supporting_documents: docs,
      }

      const res = await fetch(submitUrl, {
        method: submitMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to save specimen')
      if (onSuccess) onSuccess(); else router.push('/dashboard/herbarium');
      router.refresh()
    } catch (err) { setErrorMessage((err as Error).message) } finally { setIsSubmitting(false) }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Section: Archival Reference */}
        <div className="space-y-6">
           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-extrabold flex items-center gap-2 text-slate-700"><BookOpen className="w-4 h-4 text-emerald-600" /> Physical Accession Code</Label>
                <Input value={herbariumCode} onChange={e => setHerbariumCode(e.target.value)} required placeholder="e.g., JKUAT-BOT-2024-001" className="h-12 font-bold bg-white rounded-xl shadow-sm border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-extrabold flex items-center gap-2 text-slate-700"><MapPin className="w-4 h-4 text-emerald-600" /> Storage Location</Label>
                <Input value={storageLocation} onChange={e => setStorageLocation(e.target.value)} placeholder="e.g., Cabinet 4, Drawer B" className="h-12 bg-white rounded-xl shadow-sm border-slate-200" />
              </div>
           </div>
        </div>

        {/* Section: Botanical Identification */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-6 bg-slate-50 rounded-2xl border border-slate-100">
           <div className="space-y-2">
              <Label className="text-xs font-black uppercase text-slate-400 tracking-widest">Scientific Name</Label>
              <Input value={scientificName} onChange={e => setScientificName(e.target.value)} required className="h-12 italic bg-white rounded-xl shadow-sm border-slate-200" />
           </div>
           <div className="space-y-2">
              <Label className="text-xs font-black uppercase text-slate-400 tracking-widest">Common / Vernacular Name</Label>
              <Input value={commonName} onChange={e => setCommonName(e.target.value)} className="h-12 bg-white rounded-xl shadow-sm border-slate-200" />
           </div>
        </div>

        {/* Section: Collection History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <Label className="text-xs font-black uppercase text-slate-400 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Institutional Collector</Label>
              <select 
                value={collectorId} 
                onChange={e => setCollectorId(e.target.value)}
                className="w-full h-12 rounded-xl bg-white border border-slate-200 px-3 text-sm font-bold shadow-sm"
              >
                <option value="">Select Personnel...</option>
                {researchers.map(r => (
                  <option key={r.id} value={r.researchers?.[0]?.id}>{r.full_name} {r.researchers?.[0]?.specialization ? `(${r.researchers[0].specialization})` : ''}</option>
                ))}
              </select>
           </div>
           <div className="space-y-2">
              <Label className="text-xs font-black uppercase text-slate-400 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Date of Collection</Label>
              <Input type="date" value={collectionDate} onChange={e => setCollectionDate(e.target.value)} className="h-12 bg-white rounded-xl shadow-sm border-slate-200" />
           </div>
        </div>

        {/* Section: Environmental & Curatorial Notes */}
        <div className="space-y-6">
           <div className="space-y-2">
              <Label className="text-sm font-bold flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" /> Habitat Description</Label>
              <textarea value={habitat} onChange={e => setHabitat(e.target.value)} placeholder="Describe the environmental context at the point of collection..." className="w-full min-h-[80px] rounded-xl border border-slate-200 p-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <Label className="text-sm font-bold flex items-center gap-2">Ecological Notes</Label>
                 <textarea value={ecological} onChange={e => setEcological(e.target.value)} className="w-full min-h-[120px] rounded-xl border border-slate-200 p-4 text-sm font-medium" />
              </div>
              <div className="space-y-2">
                 <Label className="text-sm font-bold flex items-center gap-2">Medicinal / Ethnobotanical Value</Label>
                 <textarea value={medicinal} onChange={e => setMedicinal(e.target.value)} className="w-full min-h-[120px] rounded-xl border border-slate-200 p-4 text-sm font-medium" />
              </div>
           </div>
        </div>

        {/* Section: Visual & Scanned Documentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
           <div className="space-y-4">
              <Label className="text-xs font-black uppercase text-slate-400 flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Specimen Scans / Photographs</Label>
              <div className="flex gap-2">
                <Input type="file" multiple accept="image/*" onChange={e => handleFileSelection(e, 'img')} disabled={uploading} className="h-11 bg-white pt-2 border-slate-200" />
                <Button type="button" onClick={() => performUpload('img')} disabled={uploading || pendingImages.length === 0} variant="outline" className="h-11 border-emerald-200 text-emerald-600 gap-2">
                   <Upload className="w-4 h-4" /> {uploading ? '...' : 'Upload'}
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mt-4">
                 {pendingImages.map((file, idx) => (
                   <div key={`pending-img-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group shadow-sm transition-all">
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
                   <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group shadow-sm">
                      <img src={img.secure_url} alt="Specimen" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        className="absolute inset-0 bg-rose-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-4">
              <Label className="text-xs font-black uppercase text-slate-400 flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Supporting Field Notes (PDF)</Label>
              <div className="flex gap-2">
                <Input type="file" multiple accept=".pdf" onChange={e => handleFileSelection(e, 'doc')} disabled={uploading} className="h-11 bg-white pt-2 border-slate-200" />
                <Button type="button" onClick={() => performUpload('doc')} disabled={uploading || pendingDocs.length === 0} variant="outline" className="h-11 border-emerald-200 text-emerald-600 gap-2">
                   <Upload className="w-4 h-4" /> {uploading ? '...' : 'Upload'}
                </Button>
              </div>
              
              <div className="space-y-2 mt-4">
                 {pendingDocs.map((file, idx) => (
                   <div key={`pending-doc-${idx}`} className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 italic">
                      Pending Sync: {file.name}
                   </div>
                 ))}
                 {docs.map((doc, idx) => (
                   <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-white rounded-lg"><FileText className="w-3.5 h-3.5 text-slate-400" /></div>
                         <span className="text-[10px] font-bold text-slate-600">FieldNote_{idx + 1}.pdf</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setDocs(docs.filter((_, i) => i !== idx))}
                        className="text-slate-200 hover:text-rose-600"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-6 pt-6 border-t border-slate-100">
           {errorMessage && <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-xl">{errorMessage}</div>}
           <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting || uploading} className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold h-14 px-20 rounded-2xl shadow-2xl transition-all">
                {isSubmitting ? 'Syncing Archive...' : 'Archive Specimen'}
              </Button>
           </div>
        </div>
      </form>
    </div>
  )
}
