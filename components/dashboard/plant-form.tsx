'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Globe, HeartPulse, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import type { Plant, CloudinaryMedia } from '@/types'
import ImageManager from '@/components/dashboard/image-manager'

interface PlantFormProps {
  initialValues?: Partial<Plant> & { plant_local_names?: any[], plant_recommendations?: any[] }
  submitUrl: string
  submitMethod: 'POST' | 'PUT'
  submitLabel: string
  onSuccess?: () => void
}

export default function PlantForm({
  initialValues,
  submitUrl,
  submitMethod,
  submitLabel,
  onSuccess,
}: PlantFormProps) {
  const router = useRouter()
  
  // Core Fields
  const [scientificName, setScientificName] = useState(initialValues?.scientific_name ?? '')
  const [commonName, setCommonName] = useState(initialValues?.common_name ?? '')
  const [familyName, setFamilyName] = useState(initialValues?.family_name ?? '')
  const [genus, setGenus] = useState(initialValues?.genus ?? '')
  const [species, setSpecies] = useState(initialValues?.species ?? '')
  const [isAiv, setIsAiv] = useState(initialValues?.is_aiv ?? false)
  const [category, setCategory] = useState(initialValues?.category ?? '')
  
  // Distribution & Conditions
  const [distribution, setDistribution] = useState(initialValues?.geographic_distribution?.join(', ') ?? '')
  const [soilType, setSoilType] = useState(initialValues?.growth_conditions?.soil_type ?? '')
  const [rainfall, setRainfall] = useState(initialValues?.growth_conditions?.rainfall ?? '')
  const [sunlight, setSunlight] = useState(initialValues?.growth_conditions?.sunlight ?? '')

  // Descriptions
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [nutritionalValue, setNutritionalValue] = useState(initialValues?.nutritional_value ?? '')
  const [medicinalValue, setMedicinalValue] = useState(initialValues?.medicinal_value ?? '')
  const [culturalSignificance, setCulturalSignificance] = useState(initialValues?.cultural_significance ?? '')

  // Nested Data: Local Names
  const [localNames, setLocalNames] = useState<any[]>(initialValues?.plant_local_names || [])
  const addLocalName = () => setLocalNames([...localNames, { language_code: '', local_name: '' }])
  const removeLocalName = (idx: number) => setLocalNames(localNames.filter((_, i) => i !== idx))
  const updateLocalName = (idx: number, field: string, val: string) => {
     const next = [...localNames]; next[idx][field] = val; setLocalNames(next);
  }

  // Nested Data: Recommendations
  const [recommendations, setRecommendations] = useState<any[]>(initialValues?.plant_recommendations || [])
  const addRecommendation = () => setRecommendations([...recommendations, { use_case: '', recommendation_text: '' }])
  const removeRecommendation = (idx: number) => setRecommendations(recommendations.filter((_, i) => i !== idx))
  const updateRecommendation = (idx: number, field: string, val: string) => {
    const next = [...recommendations]; next[idx][field] = val; setRecommendations(next);
  }

  // Media
  const [images, setImages] = useState<CloudinaryMedia[]>(initialValues?.images || [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(''); setIsSubmitting(true)

    try {
      const payload = {
        scientific_name: scientificName,
        common_name: commonName || undefined,
        family_name: familyName || undefined,
        genus: genus || undefined,
        species: species || undefined,
        is_aiv: isAiv,
        category: category || undefined,
        geographic_distribution: distribution ? distribution.split(',').map(s => s.trim()) : [],
        growth_conditions: { soil_type: soilType, rainfall, sunlight },
        description: description || undefined,
        nutritional_value: nutritionalValue || undefined,
        medicinal_value: medicinalValue || undefined,
        cultural_significance: culturalSignificance || undefined,
        images,
        local_names: localNames.filter(n => n.local_name),
        recommendations: recommendations.filter(r => r.recommendation_text),
      }

      const res = await fetch(submitUrl, {
        method: submitMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to save')
      if (onSuccess) onSuccess(); else router.push('/dashboard/plants');
      router.refresh()
    } catch (err) { setErrorMessage((err as Error).message) } finally { setIsSubmitting(false) }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Section: Identification */}
        <div className="space-y-6">
           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Scientific Name</Label>
                <Input value={scientificName} onChange={e => setScientificName(e.target.value)} required className="h-12 italic bg-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Common Name</Label>
                <Input value={commonName} onChange={e => setCommonName(e.target.value)} className="h-12 bg-white" />
              </div>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1"><Label className="text-[10px] uppercase font-bold text-slate-400">Family</Label><Input value={familyName} onChange={e => setFamilyName(e.target.value)} className="h-10 bg-white" /></div>
              <div className="space-y-1"><Label className="text-[10px] uppercase font-bold text-slate-400">Genus</Label><Input value={genus} onChange={e => setGenus(e.target.value)} className="h-10 bg-white" /></div>
              <div className="space-y-1"><Label className="text-[10px] uppercase font-bold text-slate-400">Species</Label><Input value={species} onChange={e => setSpecies(e.target.value)} className="h-10 bg-white" /></div>
              <div className="flex items-center space-x-3 pt-5"><Checkbox id="aiv" checked={isAiv} onCheckedChange={c => setIsAiv(!!c)} /><Label htmlFor="aiv" className="text-xs font-bold">AIV</Label></div>
           </div>
        </div>

        {/* Section: Local Names (Multilingual) */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
           <div className="flex items-center justify-between">
              <Label className="text-sm font-extrabold flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-600" /> Multilingual Local Names</Label>
              <Button type="button" onClick={addLocalName} variant="ghost" size="sm" className="text-emerald-600 font-bold">+ Add Name</Button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {localNames.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                   <Input value={item.language_code} onChange={e => updateLocalName(idx, 'language_code', e.target.value)} placeholder="Code (sw, ky)" className="w-20 h-9 border-none shadow-none font-bold" />
                   <Input value={item.local_name} onChange={e => updateLocalName(idx, 'local_name', e.target.value)} placeholder="Local Name" className="flex-1 h-9 border-none shadow-none font-medium" />
                   <Button type="button" onClick={() => removeLocalName(idx)} variant="ghost" size="sm" className="text-slate-300 hover:text-rose-600"><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
           </div>
        </div>

        {/* Section: Environmental Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <Label className="text-sm font-extrabold flex items-center gap-2"><Droplets className="w-4 h-4 text-blue-600" /> Optimal Growth Conditions</Label>
              <div className="grid grid-cols-1 gap-4">
                 <div className="space-y-1"><Label className="text-[10px] uppercase font-bold text-slate-400">Soil Type</Label><Input value={soilType} onChange={e => setSoilType(e.target.value)} placeholder="e.g., Well-drained loamy" className="h-11 bg-white" /></div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><Label className="text-[10px] uppercase font-bold text-slate-400">Rainfall</Label><Input value={rainfall} onChange={e => setRainfall(e.target.value)} placeholder="700-1200mm" className="h-11 bg-white" /></div>
                    <div className="space-y-1"><Label className="text-[10px] uppercase font-bold text-slate-400">Sunlight</Label><Input value={sunlight} onChange={e => setSunlight(e.target.value)} placeholder="Full Sun" className="h-11 bg-white" /></div>
                 </div>
              </div>
           </div>
           <div className="space-y-4">
              <Label className="text-sm font-extrabold flex items-center gap-2">Geographic Distribution</Label>
              <textarea value={distribution} onChange={e => setDistribution(e.target.value)} className="w-full min-h-[120px] rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium" placeholder="Kenya, Tanzania, Uganda (comma separated)..." />
           </div>
        </div>

        {/* Section: Health Recommendations */}
        <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-4">
           <div className="flex items-center justify-between">
              <Label className="text-sm font-extrabold flex items-center gap-2"><HeartPulse className="w-4 h-4 text-emerald-600" /> Dietary & Health Recommendations</Label>
              <Button type="button" onClick={addRecommendation} variant="ghost" size="sm" className="text-emerald-600 font-bold">+ Add Use Case</Button>
           </div>
           <div className="space-y-3">
              {recommendations.map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-white p-3 rounded-xl border border-emerald-100 items-start">
                   <div className="flex-1 space-y-2">
                      <Input value={item.use_case} onChange={e => updateRecommendation(idx, 'use_case', e.target.value)} placeholder="Condition (e.g., High Blood Pressure)" className="h-9 font-bold bg-slate-50 border-none" />
                      <textarea value={item.recommendation_text} onChange={e => updateRecommendation(idx, 'recommendation_text', e.target.value)} placeholder="Guidelines..." className="w-full min-h-[60px] text-xs font-medium border-none focus:ring-0 p-0" />
                   </div>
                   <Button type="button" onClick={() => removeRecommendation(idx)} variant="ghost" size="sm" className="text-slate-300 hover:text-rose-600 mt-1"><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
           </div>
        </div>

        {/* Multi-fields TextAreas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2"><Label className="text-sm font-bold">Nutritional Profile</Label><textarea value={nutritionalValue} onChange={e => setNutritionalValue(e.target.value)} className="w-full min-h-[100px] rounded-xl border border-slate-200 p-3 text-sm" /></div>
           <div className="space-y-2"><Label className="text-sm font-bold">Cultural Significance</Label><textarea value={culturalSignificance} onChange={e => setCulturalSignificance(e.target.value)} className="w-full min-h-[100px] rounded-xl border border-slate-200 p-3 text-sm" /></div>
        </div>

        <div className="flex flex-col gap-4 py-8 border-t border-slate-100">
           <div className="space-y-2">
                <ImageManager images={images} onChange={setImages} folder="plants/images" label="Research Photographs" />
           </div>
           {errorMessage && <p className="text-rose-600 text-xs font-bold bg-rose-50 p-3 rounded-xl border border-rose-100">{errorMessage}</p>}
           <div className="flex justify-end gap-3 pt-6">
              <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold h-14 px-16 rounded-2xl shadow-xl transition-all">
                {isSubmitting ? 'Syncing...' : 'Save Record'}
              </Button>
           </div>
        </div>
      </form>
    </div>
  )
}
