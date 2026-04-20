'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadToCloudinary } from '@/actions/media-actions'
import type { Microorganism, CloudinaryMedia } from '@/types'

interface MicroorganismFormProps {
  initialValues?: Partial<Microorganism>
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
  
  const [scientificName, setScientificName] = useState(initialValues?.scientific_name ?? '')
  const [strainCode, setStrainCode] = useState(initialValues?.strain_code ?? '')
  const [sourceIsolatedFrom, setSourceIsolatedFrom] = useState(initialValues?.source_isolated_from ?? '')
  const [optimumTemperature, setOptimumTemperature] = useState(
    initialValues?.optimum_temperature?.toString() ?? ''
  )
  const [minPh, setMinPh] = useState(initialValues?.min_ph?.toString() ?? '')
  const [maxPh, setMaxPh] = useState(initialValues?.max_ph?.toString() ?? '')
  const [growthMedium, setGrowthMedium] = useState(initialValues?.growth_medium ?? '')
  const [characteristics, setCharacteristics] = useState(initialValues?.characteristics ?? '')
  const [enzymaticActivity, setEnzymaticActivity] = useState(initialValues?.enzymatic_activity ?? '')
  const [experimentDetails, setExperimentDetails] = useState(initialValues?.experiment_details ?? '')
  const [dateStored, setDateStored] = useState(initialValues?.date_stored ?? '')
  const [microscopyImages, setMicroscopyImages] = useState<CloudinaryMedia[]>(initialValues?.microscopy_images || [])
  const [supportingDocs, setSupportingDocs] = useState<CloudinaryMedia[]>(initialValues?.supporting_docs || [])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadingDocs, setUploadingDocs] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const files = event.currentTarget.files
    if (!files) return

    setUploadingImages(true)
    try {
      for (const file of Array.from(files)) {
        const base64 = await fileToBase64(file)
        const result = await uploadToCloudinary(base64, 'jkuat-bioresources/microorganisms/images')
        setMicroscopyImages(prev => [...prev, result])
      }
      event.currentTarget.value = ''
    } catch (err) {
      setErrorMessage(`Upload failed`)
    } finally {
      setUploadingImages(false)
    }
  }

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const files = event.currentTarget.files
    if (!files) return

    setUploadingDocs(true)
    try {
      for (const file of Array.from(files)) {
        const base64 = await fileToBase64(file)
        const result = await uploadToCloudinary(base64, 'jkuat-bioresources/microorganisms/documents')
        setSupportingDocs(prev => [...prev, result])
      }
      event.currentTarget.value = ''
    } catch (err) {
      setErrorMessage(`Upload failed`)
    } finally {
      setUploadingDocs(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const payload = {
        scientific_name: scientificName,
        strain_code: strainCode || undefined,
        source_isolated_from: sourceIsolatedFrom || undefined,
        optimum_temperature: optimumTemperature ? parseFloat(optimumTemperature) : undefined,
        min_ph: minPh ? parseFloat(minPh) : undefined,
        max_ph: maxPh ? parseFloat(maxPh) : undefined,
        growth_medium: growthMedium || undefined,
        characteristics: characteristics || undefined,
        enzymatic_activity: enzymaticActivity || undefined,
        experiment_details: experimentDetails || undefined,
        date_stored: dateStored || undefined,
        microscopy_images: microscopyImages,
        supporting_docs: supportingDocs,
      }

      const response = await fetch(submitUrl, {
        method: submitMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Unable to save record')

      if (onSuccess) onSuccess()
      else router.push('/dashboard/microorganisms')
      router.refresh()
    } catch (error) {
      setErrorMessage((error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="scientificName" className="text-sm font-semibold text-jkuat-gray-700">Scientific Name</Label>
              <Input
                id="scientificName"
                value={scientificName}
                onChange={(event) => setScientificName(event.target.value)}
                required
                className="h-12 bg-white border-jkuat-gray-200 font-medium italic"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="strainCode" className="text-sm font-semibold text-jkuat-gray-700">Strain Code</Label>
              <Input
                id="strainCode"
                value={strainCode}
                onChange={(event) => setStrainCode(event.target.value)}
                className="h-12 bg-white border-jkuat-gray-200 font-medium"
              />
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="sourceIsolatedFrom" className="text-sm font-semibold text-jkuat-gray-700">Source</Label>
            <Input
              id="sourceIsolatedFrom"
              value={sourceIsolatedFrom}
              onChange={(event) => setSourceIsolatedFrom(event.target.value)}
              className="h-12 bg-white border-jkuat-gray-200 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateStored" className="text-sm font-semibold text-jkuat-gray-700">Storage Date</Label>
            <Input
              id="dateStored"
              type="date"
              value={dateStored}
              onChange={(event) => setDateStored(event.target.value)}
              className="h-12 bg-white border-jkuat-gray-200 font-medium"
            />
          </div>
        </div>

        <div className="space-y-4 bg-jkuat-gray-50/50 p-6 rounded-2xl border border-jkuat-gray-100">
           <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="growthMedium" className="text-sm font-semibold text-jkuat-gray-700">Growth Medium</Label>
                <Input
                  id="growthMedium"
                  value={growthMedium}
                  onChange={(event) => setGrowthMedium(event.target.value)}
                  className="h-12 bg-white border-jkuat-gray-200 font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="optimumTemperature" className="text-sm font-semibold text-jkuat-gray-700">Optimum Temp (°C)</Label>
                <Input
                  id="optimumTemperature"
                  type="number"
                  step="0.1"
                  value={optimumTemperature}
                  onChange={(event) => setOptimumTemperature(event.target.value)}
                  className="h-12 bg-white border-jkuat-gray-200 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-jkuat-gray-400">Min pH</Label>
                    <Input type="number" step="0.1" value={minPh} onChange={(e) => setMinPh(e.target.value)} className="h-12 bg-white" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-jkuat-gray-400">Max pH</Label>
                    <Input type="number" step="0.1" value={maxPh} onChange={(e) => setMaxPh(e.target.value)} className="h-12 bg-white" />
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="characteristics" className="text-sm font-semibold text-jkuat-gray-700">Characteristics</Label>
            <textarea
              id="characteristics"
              className="w-full min-h-[100px] rounded-xl border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium"
              value={characteristics}
              onChange={(event) => setCharacteristics(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="enzymaticActivity" className="text-sm font-semibold text-jkuat-gray-700">Enzymatic Activity</Label>
            <textarea
              id="enzymaticActivity"
              className="w-full min-h-[100px] rounded-xl border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium"
              value={enzymaticActivity}
              onChange={(event) => setEnzymaticActivity(event.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experimentDetails" className="text-sm font-semibold text-jkuat-gray-700">Notes</Label>
          <textarea
            id="experimentDetails"
            className="w-full min-h-[100px] rounded-xl border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium"
            value={experimentDetails}
            onChange={(event) => setExperimentDetails(event.target.value)}
          />
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-800">
            {errorMessage}
          </div>
        ) : null}

        <div className="flex justify-end pt-8 border-t border-jkuat-gray-100">
          <Button 
            type="submit" 
            disabled={isSubmitting || uploadingImages || uploadingDocs}
            className="bg-jkuat-green hover:bg-jkuat-green-dark text-white font-extrabold h-14 px-16 rounded-2xl shadow-xl transition-all"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}
