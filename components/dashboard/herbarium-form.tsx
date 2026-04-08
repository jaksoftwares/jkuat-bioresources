'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { uploadToCloudinary } from '@/actions/media-actions'
import type { HerbariumSpecimen, CloudinaryMedia } from '@/types'

interface HerbariumFormProps {
  initialValues?: Partial<HerbariumSpecimen>
  submitUrl: string
  submitMethod: 'POST' | 'PUT'
  submitLabel: string
}

export default function HerbariumForm({
  initialValues,
  submitUrl,
  submitMethod,
  submitLabel,
}: HerbariumFormProps) {
  const router = useRouter()
  const [herbariumCode, setHerbariumCode] = useState(initialValues?.herbarium_code ?? '')
  const [scientificName, setScientificName] = useState(initialValues?.scientific_name ?? '')
  const [commonName, setCommonName] = useState(initialValues?.common_name ?? '')
  const [collectionDate, setCollectionDate] = useState(initialValues?.collection_date ?? '')
  const [habitatDescription, setHabitatDescription] = useState(initialValues?.habitat_description ?? '')
  const [ecologicalNotes, setEcologicalNotes] = useState(initialValues?.ecological_notes ?? '')
  const [medicinalNotes, setMedicinalNotes] = useState(initialValues?.medicinal_notes ?? '')
  const [physicalStorageLocation, setPhysicalStorageLocation] = useState(
    initialValues?.physical_storage_location ?? ''
  )
  const [specimenImages, setSpecimenImages] = useState<CloudinaryMedia[]>(initialValues?.specimen_images || [])
  const [supportingDocuments, setSupportingDocuments] = useState<CloudinaryMedia[]>(
    initialValues?.supporting_documents || []
  )
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
        const result = await uploadToCloudinary(base64, 'jkuat-bioresources/herbarium/images')
        setSpecimenImages(prev => [...prev, result])
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
        const result = await uploadToCloudinary(base64, 'jkuat-bioresources/herbarium/documents')
        setSupportingDocuments(prev => [...prev, result])
      }
      event.currentTarget.value = ''
    } catch (err) {
      setErrorMessage(`Document upload failed: ${(err as Error).message}`)
    } finally {
      setUploadingDocs(false)
    }
  }

  const removeImage = (index: number) => {
    setSpecimenImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeDocument = (index: number) => {
    setSupportingDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const payload = {
        herbarium_code: herbariumCode,
        scientific_name: scientificName,
        common_name: commonName || null,
        collection_date: collectionDate || null,
        habitat_description: habitatDescription || null,
        ecological_notes: ecologicalNotes || null,
        medicinal_notes: medicinalNotes || null,
        physical_storage_location: physicalStorageLocation || null,
        specimen_images: specimenImages,
        supporting_documents: supportingDocuments,
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
        throw new Error(body?.error || 'Unable to save herbarium record')
      }

      router.push('/dashboard/herbarium')
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
            Register herbarium specimen with collection details, habitat information, and preservation metadata.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="herbariumCode">Herbarium Code *</Label>
              <Input
                id="herbariumCode"
                value={herbariumCode}
                onChange={(event) => setHerbariumCode(event.target.value)}
                placeholder="e.g., JKUAT-2026-001"
                required
              />
            </div>
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
              <Label htmlFor="commonName">Common Name</Label>
              <Input
                id="commonName"
                value={commonName}
                onChange={(event) => setCommonName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collectionDate">Collection Date</Label>
              <Input
                id="collectionDate"
                type="date"
                value={collectionDate}
                onChange={(event) => setCollectionDate(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="physicalStorageLocation">Physical Storage Location</Label>
            <Input
              id="physicalStorageLocation"
              value={physicalStorageLocation}
              onChange={(event) => setPhysicalStorageLocation(event.target.value)}
              placeholder="e.g., Building A, Room 102, Cabinet 3"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="habitatDescription">Habitat Description</Label>
              <textarea
                id="habitatDescription"
                className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                value={habitatDescription}
                onChange={(event) => setHabitatDescription(event.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="ecologicalNotes">Ecological Notes</Label>
              <textarea
                id="ecologicalNotes"
                className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                value={ecologicalNotes}
                onChange={(event) => setEcologicalNotes(event.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="medicinalNotes">Medicinal Notes</Label>
              <textarea
                id="medicinalNotes"
                className="w-full min-h-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                value={medicinalNotes}
                onChange={(event) => setMedicinalNotes(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="specimenImages">Specimen Images</Label>
              <Input
                id="specimenImages"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImages}
              />
              {specimenImages.length > 0 && (
                <div className="mt-2 space-y-1">
                  {specimenImages.map((img, idx) => (
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
              <Label htmlFor="supportingDocuments">Supporting Documents</Label>
              <Input
                id="supportingDocuments"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleDocumentUpload}
                disabled={uploadingDocs}
              />
              {supportingDocuments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {supportingDocuments.map((doc, idx) => (
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
            <p className="text-sm text-slate-500">Save the herbarium specimen record with complete collection and preservation details.</p>
            <Button type="submit" disabled={isSubmitting || uploadingImages || uploadingDocs}>
              {isSubmitting ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
