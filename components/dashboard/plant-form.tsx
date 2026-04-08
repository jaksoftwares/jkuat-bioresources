'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { uploadToCloudinary } from '@/actions/media-actions'
import type { Plant, CloudinaryMedia } from '@/types'

interface PlantFormProps {
  initialValues?: Partial<Plant>
  submitUrl: string
  submitMethod: 'POST' | 'PUT'
  submitLabel: string
}

export default function PlantForm({ initialValues, submitUrl, submitMethod, submitLabel }: PlantFormProps) {
  const router = useRouter()
  const [scientificName, setScientificName] = useState(initialValues?.scientific_name ?? '')
  const [commonName, setCommonName] = useState(initialValues?.common_name ?? '')
  const [familyName, setFamilyName] = useState(initialValues?.family_name ?? '')
  const [genus, setGenus] = useState(initialValues?.genus ?? '')
  const [species, setSpecies] = useState(initialValues?.species ?? '')
  const [isAiv, setIsAiv] = useState(initialValues?.is_aiv ?? false)
  const [category, setCategory] = useState(initialValues?.category ?? '')
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [nutritionalValue, setNutritionalValue] = useState(initialValues?.nutritional_value ?? '')
  const [medicinalValue, setMedicinalValue] = useState(initialValues?.medicinal_value ?? '')
  const [culturalSignificance, setCulturalSignificance] = useState(initialValues?.cultural_significance ?? '')
  const [geographicDistribution, setGeographicDistribution] = useState(
    (initialValues?.geographic_distribution || []).join(', ')
  )
  const [images, setImages] = useState<CloudinaryMedia[]>(initialValues?.images || [])
  const [documents, setDocuments] = useState<CloudinaryMedia[]>(initialValues?.documents || [])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadingDocuments, setUploadingDocuments] = useState(false)
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
        const result = await uploadToCloudinary(base64, 'jkuat-bioresources/plants')
        setImages(prev => [...prev, result])
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

    setUploadingDocuments(true)
    try {
      for (const file of Array.from(files)) {
        const base64 = await fileToBase64(file)
        const result = await uploadToCloudinary(base64, 'jkuat-bioresources/plants/documents')
        setDocuments(prev => [...prev, result])
      }
      event.currentTarget.value = ''
    } catch (err) {
      setErrorMessage(`Document upload failed: ${(err as Error).message}`)
    } finally {
      setUploadingDocuments(false)
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const payload = {
        scientific_name: scientificName,
        common_name: commonName || null,
        family_name: familyName || null,
        genus: genus || null,
        species: species || null,
        is_aiv: isAiv,
        category: category || null,
        description: description || null,
        nutritional_value: nutritionalValue || null,
        medicinal_value: medicinalValue || null,
        cultural_significance: culturalSignificance || null,
        growth_conditions: {},
        geographic_distribution: geographicDistribution
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean),
        images,
        documents,
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
        throw new Error(body?.error || 'Unable to save plant record')
      }

      router.push('/dashboard/plants')
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
          <p className="text-sm text-slate-500">Capture the scientific, traditional and practical details for this plant record.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="scientificName">Scientific Name</Label>
              <Input
                id="scientificName"
                value={scientificName}
                onChange={(event) => setScientificName(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commonName">Common Name</Label>
              <Input
                id="commonName"
                value={commonName}
                onChange={(event) => setCommonName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="familyName">Family</Label>
              <Input
                id="familyName"
                value={familyName}
                onChange={(event) => setFamilyName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genus">Genus</Label>
              <Input id="genus" value={genus} onChange={(event) => setGenus(event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="species">Species</Label>
              <Input id="species" value={species} onChange={(event) => setSpecies(event.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full min-h-[120px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isAiv">AIV Status</Label>
              <div className="flex items-center gap-3">
                <input
                  id="isAiv"
                  type="checkbox"
                  checked={isAiv}
                  onChange={(event) => setIsAiv(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-slate-600">African Indigenous Vegetable</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="nutritionalValue">Nutritional Value</Label>
              <textarea
                id="nutritionalValue"
                className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                value={nutritionalValue}
                onChange={(event) => setNutritionalValue(event.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="medicinalValue">Medicinal Value</Label>
              <textarea
                id="medicinalValue"
                className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                value={medicinalValue}
                onChange={(event) => setMedicinalValue(event.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="culturalSignificance">Cultural Significance</Label>
              <textarea
                id="culturalSignificance"
                className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                value={culturalSignificance}
                onChange={(event) => setCulturalSignificance(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="geographicDistribution">Geographic Distribution</Label>
            <Input
              id="geographicDistribution"
              value={geographicDistribution}
              onChange={(event) => setGeographicDistribution(event.target.value)}
              placeholder="Comma separated regions"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="images">Plant Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImages}
              />
              {images.length > 0 && (
                <div className="mt-2 space-y-1">
                  {images.map((img, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-teal-50 p-2 rounded">
                      <span className="text-teal-700 truncate">{img.public_id}</span>
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
              <Label htmlFor="documents">Supporting Documents</Label>
              <Input
                id="documents"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleDocumentUpload}
                disabled={uploadingDocuments}
              />
              {documents.length > 0 && (
                <div className="mt-2 space-y-1">
                  {documents.map((doc, idx) => (
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
            <p className="text-sm text-slate-500">Save the plant record with all taxonomic and cultural details.</p>
            <Button type="submit" disabled={isSubmitting || uploadingImages || uploadingDocuments}>
              {isSubmitting ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
