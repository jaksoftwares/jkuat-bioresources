'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadToCloudinary } from '@/actions/media-actions'
import type { Plant, CloudinaryMedia } from '@/types'

interface PlantFormProps {
  initialValues?: Partial<Plant>
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
  
  const [scientificName, setScientificName] = useState(initialValues?.scientific_name ?? '')
  const [commonName, setCommonName] = useState(initialValues?.common_name ?? '')
  const [familyName, setFamilyName] = useState(initialValues?.family_name ?? '')
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [medicinalValue, setMedicinalValue] = useState(initialValues?.medicinal_value ?? '')
  const [category, setCategory] = useState(initialValues?.category ?? '')
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
        const result = await uploadToCloudinary(base64, 'jkuat-bioresources/plants/images')
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
      const payload: Partial<Plant> = {
        scientific_name: scientificName,
        common_name: commonName || undefined,
        family_name: familyName || undefined,
        description: description || undefined,
        medicinal_value: medicinalValue || undefined,
        category: category || undefined,
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

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/dashboard/plants')
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
            <Label htmlFor="commonName" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Common Name</Label>
            <Input
              id="commonName"
              value={commonName}
              onChange={(event) => setCommonName(event.target.value)}
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="familyName" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Family</Label>
            <Input
              id="familyName"
              value={familyName}
              onChange={(event) => setFamilyName(event.target.value)}
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="e.g. Indigenous Vegetable"
              className="bg-white border-jkuat-gray-200 font-medium focus:ring-jkuat-green/20"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Description</Label>
            <textarea
              id="description"
              className="w-full min-h-[100px] rounded-md border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium shadow-sm focus:border-jkuat-green focus:outline-none focus:ring-2 focus:ring-jkuat-green/10 transition-all"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medicinalValue" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Medicinal Value & Properties</Label>
            <textarea
              id="medicinalValue"
              className="w-full min-h-[100px] rounded-md border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium shadow-sm focus:border-jkuat-green focus:outline-none focus:ring-2 focus:ring-jkuat-green/10 transition-all"
              value={medicinalValue}
              onChange={(event) => setMedicinalValue(event.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="images" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Plant Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImages}
              className="bg-white border-jkuat-gray-200 file:text-jkuat-green font-medium"
            />
            {images.length > 0 && (
              <div className="mt-2 space-y-1">
                {images.map((img, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-jkuat-green-light/20 p-2 rounded-lg border border-jkuat-green/10 font-semibold leading-relaxed">
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
            <Label htmlFor="documents" className="text-sm font-semibold text-jkuat-gray-700 pl-1">Supporting Documents</Label>
            <Input
              id="documents"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleDocumentUpload}
              disabled={uploadingDocuments}
              className="bg-white border-jkuat-gray-200 file:text-jkuat-green font-medium"
            />
            {documents.length > 0 && (
              <div className="mt-2 space-y-1">
                {documents.map((doc, idx) => (
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
            disabled={isSubmitting || uploadingImages || uploadingDocuments}
            className="bg-jkuat-green hover:bg-jkuat-green-dark text-white font-semibold h-12 px-12 rounded-xl shadow-lg transition-all"
          >
            {isSubmitting ? 'Saving...' : 'Save Plant'}
          </Button>
        </div>
      </form>
    </div>
  )
}
