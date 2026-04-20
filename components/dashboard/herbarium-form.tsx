'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadToCloudinary } from '@/actions/media-actions'
import type { HerbariumSpecimen, CloudinaryMedia } from '@/types'

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
  const [herbariumCode, setHerbariumCode] = useState(initialValues?.herbarium_code ?? '')
  const [scientificName, setScientificName] = useState(initialValues?.scientific_name ?? '')
  const [commonName, setCommonName] = useState(initialValues?.common_name ?? '')
  const [collectionDate, setCollectionDate] = useState(initialValues?.collection_date ?? '')
  const [collectorName, setCollectorName] = useState((initialValues as any)?.collector_name ?? '')
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
        const result = await uploadToCloudinary(base64, 'jkuat-bioresources/herbarium/documents')
        setSupportingDocuments(prev => [...prev, result])
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
        herbarium_code: herbariumCode,
        scientific_name: scientificName,
        common_name: commonName || undefined,
        collection_date: collectionDate || undefined,
        collector_name: collectorName || undefined,
        habitat_description: habitatDescription || undefined,
        ecological_notes: ecologicalNotes || undefined,
        medicinal_notes: medicinalNotes || undefined,
        physical_storage_location: physicalStorageLocation || undefined,
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

      if (!response.ok) throw new Error('Unable to save record')

      if (onSuccess) onSuccess()
      else router.push('/dashboard/herbarium')
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
              <Label htmlFor="herbariumCode" className="text-sm font-semibold text-jkuat-gray-700">Herbarium Code</Label>
              <Input
                id="herbariumCode"
                value={herbariumCode}
                onChange={(event) => setHerbariumCode(event.target.value)}
                required
                className="h-12 bg-white border-jkuat-gray-200 font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="physicalStorageLocation" className="text-sm font-semibold text-jkuat-gray-700">Storage Location</Label>
              <Input
                id="physicalStorageLocation"
                value={physicalStorageLocation}
                onChange={(event) => setPhysicalStorageLocation(event.target.value)}
                className="h-12 bg-white border-jkuat-gray-200 font-medium"
              />
            </div>
        </div>

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
              <Label htmlFor="commonName" className="text-sm font-semibold text-jkuat-gray-700">Common Name</Label>
              <Input
                id="commonName"
                value={commonName}
                onChange={(event) => setCommonName(event.target.value)}
                className="h-12 bg-white border-jkuat-gray-200 font-medium"
              />
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="collectorName" className="text-sm font-semibold text-jkuat-gray-700">Collector</Label>
              <Input
                id="collectorName"
                value={collectorName}
                onChange={(event) => setCollectorName(event.target.value)}
                className="h-12 bg-white border-jkuat-gray-200 font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collectionDate" className="text-sm font-semibold text-jkuat-gray-700">Collection Date</Label>
              <Input
                id="collectionDate"
                type="date"
                value={collectionDate}
                onChange={(event) => setCollectionDate(event.target.value)}
                className="h-12 bg-white border-jkuat-gray-200 font-medium"
              />
            </div>
        </div>

        <div className="space-y-6 bg-jkuat-gray-50/50 p-6 rounded-2xl border border-jkuat-gray-100">
          <div className="space-y-2">
            <Label htmlFor="habitatDescription" className="text-sm font-semibold text-jkuat-gray-700">Habitat</Label>
            <textarea
              id="habitatDescription"
              className="w-full min-h-[80px] rounded-xl border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium"
              value={habitatDescription}
              onChange={(event) => setHabitatDescription(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ecologicalNotes" className="text-sm font-semibold text-jkuat-gray-700">Ecological Notes</Label>
              <textarea
                id="ecologicalNotes"
                className="w-full min-h-[100px] rounded-xl border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium"
                value={ecologicalNotes}
                onChange={(event) => setEcologicalNotes(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicinalNotes" className="text-sm font-semibold text-jkuat-gray-700">Medicinal Notes</Label>
              <textarea
                id="medicinalNotes"
                className="w-full min-h-[100px] rounded-xl border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium"
                value={medicinalNotes}
                onChange={(event) => setMedicinalNotes(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 py-6 border-t border-jkuat-gray-100">
          <div className="space-y-2">
            <Label htmlFor="specimenImages" className="text-sm font-semibold text-jkuat-gray-700">Images</Label>
            <Input
              id="specimenImages"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImages}
              className="bg-jkuat-gray-50 border-jkuat-gray-200 file:text-jkuat-green font-medium rounded-xl h-12 pt-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportingDocuments" className="text-sm font-semibold text-jkuat-gray-700">Documents</Label>
            <Input
              id="supportingDocuments"
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleDocumentUpload}
              disabled={uploadingDocs}
              className="bg-jkuat-gray-50 border-jkuat-gray-200 file:text-jkuat-green font-medium rounded-xl h-12 pt-2"
            />
          </div>
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
