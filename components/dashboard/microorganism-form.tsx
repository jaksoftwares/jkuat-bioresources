'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { uploadToCloudinary } from '@/actions/media-actions'
import type { Microorganism, CloudinaryMedia } from '@/types'

interface MicroorganismFormProps {
  initialValues?: Partial<Microorganism>
  submitUrl: string
  submitMethod: 'POST' | 'PUT'
  submitLabel: string
}

export default function MicroorganismForm({
  initialValues,
  submitUrl,
  submitMethod,
  submitLabel,
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
        strain_code: strainCode || null,
        source_isolated_from: sourceIsolatedFrom || null,
        optimum_temperature: optimumTemperature ? parseFloat(optimumTemperature) : null,
        min_ph: minPh ? parseFloat(minPh) : null,
        max_ph: maxPh ? parseFloat(maxPh) : null,
        growth_medium: growthMedium || null,
        characteristics: characteristics || null,
        enzymatic_activity: enzymaticActivity || null,
        experiment_details: experimentDetails || null,
        date_stored: dateStored || null,
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

      router.push('/dashboard/microorganisms')
      router.refresh()
    } catch (error) {
      setErrorMessage((error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-slate-200 shadow-sm bg-white">
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">{submitLabel}</h2>
          <p className="text-sm text-slate-500">
            Enter all microorganism strain details including isolation source, growth parameters, and characteristics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="scientificName">Scientific Name *</Label>
              <Input
                id="scientificName"
                value={scientificName}
                onChange={(event) => setScientificName(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="strainCode">Strain Code</Label>
              <Input
                id="strainCode"
                value={strainCode}
                onChange={(event) => setStrainCode(event.target.value)}
                placeholder="e.g., JKUAT-B001"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sourceIsolatedFrom">Source Isolated From</Label>
              <Input
                id="sourceIsolatedFrom"
                value={sourceIsolatedFrom}
                onChange={(event) => setSourceIsolatedFrom(event.target.value)}
                placeholder="e.g., Soil from maize rhizosphere"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="growthMedium">Growth Medium</Label>
              <Input
                id="growthMedium"
                value={growthMedium}
                onChange={(event) => setGrowthMedium(event.target.value)}
                placeholder="e.g., Nutrient agar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="optimumTemperature">Optimum Temperature (°C)</Label>
              <Input
                id="optimumTemperature"
                type="number"
                step="0.1"
                value={optimumTemperature}
                onChange={(event) => setOptimumTemperature(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateStored">Date Stored</Label>
              <Input
                id="dateStored"
                type="date"
                value={dateStored}
                onChange={(event) => setDateStored(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="minPh">Minimum pH</Label>
              <Input
                id="minPh"
                type="number"
                step="0.1"
                value={minPh}
                onChange={(event) => setMinPh(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxPh">Maximum pH</Label>
              <Input
                id="maxPh"
                type="number"
                step="0.1"
                value={maxPh}
                onChange={(event) => setMaxPh(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="characteristics">Characteristics</Label>
              <textarea
                id="characteristics"
                className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={characteristics}
                onChange={(event) => setCharacteristics(event.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="enzymaticActivity">Enzymatic Activity</Label>
              <textarea
                id="enzymaticActivity"
                className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={enzymaticActivity}
                onChange={(event) => setEnzymaticActivity(event.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="experimentDetails">Experiment Details</Label>
              <textarea
                id="experimentDetails"
                className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={experimentDetails}
                onChange={(event) => setExperimentDetails(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="microscopyImages">Microscopy Images</Label>
              <Input
                id="microscopyImages"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImages}
              />
              {microscopyImages.length > 0 && (
                <div className="mt-2 space-y-1">
                  {microscopyImages.map((img, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-indigo-50 p-2 rounded">
                      <span className="text-indigo-700 truncate">{img.public_id}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="text-rose-600 hover:text-rose-700 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportingDocs">Supporting Documents</Label>
              <Input
                id="supportingDocs"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleDocumentUpload}
                disabled={uploadingDocs}
              />
              {supportingDocs.length > 0 && (
                <div className="mt-2 space-y-1">
                  {supportingDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-blue-50 p-2 rounded">
                      <span className="text-blue-700 truncate">{doc.public_id}</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(idx)}
                        className="text-rose-600 hover:text-rose-700 font-bold"
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
            <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {errorMessage}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Save the microorganism record with all strain and research details.</p>
            <Button type="submit" disabled={isSubmitting || uploadingImages || uploadingDocs}>
              {isSubmitting ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
