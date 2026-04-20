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
      setErrorMessage(`Image upload failed: ${(err as Error).message}`)
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
      setErrorMessage(`Document upload failed: ${(err as Error).message}`)
    } finally {
      setUploadingDocs(false)
    }
  }

  const removeImage = (index: number) => {
    setMicroscopyImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeDocument = (index: number) => {
    setSupportingDocs(prev => prev.filter((_, i) => i !== index))
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

      if (!response.ok) {
        const body = await response.json()
        throw new Error(body?.error || 'Unable to save microorganism record')
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/dashboard/microorganisms')
      }
      router.refresh()
    } catch (error) {
      setErrorMessage((error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="scientificName" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Scientific Name *</Label>
            <Input
              id="scientificName"
              value={scientificName}
              onChange={(event) => setScientificName(event.target.value)}
              required
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="strainCode" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Strain Code</Label>
            <Input
              id="strainCode"
              value={strainCode}
              onChange={(event) => setStrainCode(event.target.value)}
              placeholder="e.g., JKUAT-B001"
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="sourceIsolatedFrom" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Source Isolated From</Label>
            <Input
              id="sourceIsolatedFrom"
              value={sourceIsolatedFrom}
              onChange={(event) => setSourceIsolatedFrom(event.target.value)}
              placeholder="e.g., Soil from maize rhizosphere"
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="growthMedium" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Growth Medium</Label>
            <Input
              id="growthMedium"
              value={growthMedium}
              onChange={(event) => setGrowthMedium(event.target.value)}
              placeholder="e.g., Nutrient agar"
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="optimumTemperature" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Optimum Temp (°C)</Label>
            <Input
              id="optimumTemperature"
              type="number"
              step="0.1"
              value={optimumTemperature}
              onChange={(event) => setOptimumTemperature(event.target.value)}
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateStored" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Date Stored</Label>
            <Input
              id="dateStored"
              type="date"
              value={dateStored}
              onChange={(event) => setDateStored(event.target.value)}
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="minPh" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Minimum pH</Label>
            <Input
              id="minPh"
              type="number"
              step="0.1"
              value={minPh}
              onChange={(event) => setMinPh(event.target.value)}
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPh" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Maximum pH</Label>
            <Input
              id="maxPh"
              type="number"
              step="0.1"
              value={maxPh}
              onChange={(event) => setMaxPh(event.target.value)}
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="characteristics" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Characteristics</Label>
            <textarea
              id="characteristics"
              className="w-full min-h-[80px] rounded-md border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium shadow-sm focus:border-jkuat-green focus:outline-none focus:ring-2 focus:ring-jkuat-green/10 transition-all font-bold"
              value={characteristics}
              onChange={(event) => setCharacteristics(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="enzymaticActivity" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Enzymatic Activity</Label>
            <textarea
              id="enzymaticActivity"
              className="w-full min-h-[80px] rounded-md border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium shadow-sm focus:border-jkuat-green focus:outline-none focus:ring-2 focus:ring-jkuat-green/10 transition-all font-bold"
              value={enzymaticActivity}
              onChange={(event) => setEnzymaticActivity(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experimentDetails" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Experiment Details</Label>
            <textarea
              id="experimentDetails"
              className="w-full min-h-[80px] rounded-md border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium shadow-sm focus:border-jkuat-green focus:outline-none focus:ring-2 focus:ring-jkuat-green/10 transition-all font-bold"
              value={experimentDetails}
              onChange={(event) => setExperimentDetails(event.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="microscopyImages" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Microscopy Images</Label>
            <Input
              id="microscopyImages"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImages}
              className="bg-white border-jkuat-gray-200 file:text-jkuat-green font-medium"
            />
            {microscopyImages.length > 0 && (
              <div className="mt-2 space-y-1">
                {microscopyImages.map((img, idx) => (
                   <div key={idx} className="flex items-center justify-between text-xs bg-jkuat-green-light/40 p-2 rounded-lg border border-jkuat-green/10 font-semibold leading-relaxed">
                    <span className="text-jkuat-green-dark truncate">{img.public_id}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="text-rose-600 hover:text-rose-700 font-bold px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportingDocs" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Supporting Documents</Label>
            <Input
              id="supportingDocs"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleDocumentUpload}
              disabled={uploadingDocs}
              className="bg-white border-jkuat-gray-200 file:text-jkuat-green font-medium"
            />
            {supportingDocs.length > 0 && (
              <div className="mt-2 space-y-1">
                {supportingDocs.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-jkuat-gray-50 font-semibold text-jkuat-gray-600 p-2 rounded-lg border border-jkuat-gray-200">
                    <span className="truncate">{doc.public_id}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(idx)}
                      className="text-rose-600 hover:text-rose-700 font-bold px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-800">
            {errorMessage}
          </div>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end pt-6 border-t border-jkuat-gray-100">
          <Button 
            type="submit" 
            disabled={isSubmitting || uploadingImages || uploadingDocs}
            className="bg-jkuat-green hover:bg-jkuat-green-dark text-white font-semibold h-12 px-12 rounded-xl shadow-lg transition-all"
          >
            {isSubmitting ? 'Saving...' : 'Save Strain'}
          </Button>
        </div>
      </form>
    </div>
  )
}
