'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
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
  const [genus, setGenus] = useState(initialValues?.genus ?? '')
  const [species, setSpecies] = useState(initialValues?.species ?? '')
  const [isAiv, setIsAiv] = useState(initialValues?.is_aiv ?? false)
  const [category, setCategory] = useState(initialValues?.category ?? '')
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [nutritionalValue, setNutritionalValue] = useState(initialValues?.nutritional_value ?? '')
  const [medicinalValue, setMedicinalValue] = useState(initialValues?.medicinal_value ?? '')
  const [culturalSignificance, setCulturalSignificance] = useState(initialValues?.cultural_significance ?? '')
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
      setErrorMessage(`Upload failed: ${(err as Error).message}`)
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
      setErrorMessage(`Upload failed: ${(err as Error).message}`)
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
        genus: genus || undefined,
        species: species || undefined,
        is_aiv: isAiv,
        category: category || undefined,
        description: description || undefined,
        nutritional_value: nutritionalValue || undefined,
        medicinal_value: medicinalValue || undefined,
        cultural_significance: culturalSignificance || undefined,
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
        throw new Error(body?.error || 'Unable to save record')
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
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="scientificName" className="text-sm font-semibold text-jkuat-gray-700">Scientific Name</Label>
              <Input
                id="scientificName"
                value={scientificName}
                onChange={(event) => setScientificName(event.target.value)}
                required
                className="h-12 bg-white border-jkuat-gray-200 font-medium"
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="familyName" className="text-sm font-semibold text-jkuat-gray-700">Family</Label>
            <Input
              id="familyName"
              value={familyName}
              onChange={(event) => setFamilyName(event.target.value)}
              className="h-12 bg-white border-jkuat-gray-200 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="genus" className="text-sm font-semibold text-jkuat-gray-700">Genus</Label>
            <Input
              id="genus"
              value={genus}
              onChange={(event) => setGenus(event.target.value)}
              className="h-12 bg-white border-jkuat-gray-200 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="species" className="text-sm font-semibold text-jkuat-gray-700">Species</Label>
            <Input
              id="species"
              value={species}
              onChange={(event) => setSpecies(event.target.value)}
              className="h-12 bg-white border-jkuat-gray-200 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 bg-jkuat-gray-50/50 p-6 rounded-2xl border border-jkuat-gray-100">
           <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-jkuat-gray-700">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-12 bg-white border-jkuat-gray-200 font-medium"
                />
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-jkuat-gray-100 shadow-sm">
                <Checkbox 
                  id="isAiv" 
                  checked={isAiv} 
                  onCheckedChange={(checked) => setIsAiv(!!checked)}
                  className="w-5 h-5 border-jkuat-gray-300 data-[state=checked]:bg-jkuat-green"
                />
                <Label htmlFor="isAiv" className="text-sm font-bold text-jkuat-gray-900 cursor-pointer tracking-tight">Indigenous Vegetable</Label>
              </div>
           </div>
           <div className="space-y-2">
              <Label htmlFor="nutritionalValue" className="text-sm font-semibold text-jkuat-gray-700">Nutritional Value</Label>
              <textarea
                id="nutritionalValue"
                className="w-full min-h-[120px] rounded-xl border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium shadow-sm focus:border-jkuat-green focus:outline-none focus:ring-2 focus:ring-jkuat-green/10 transition-all"
                value={nutritionalValue}
                onChange={(event) => setNutritionalValue(event.target.value)}
              />
           </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-jkuat-gray-700">Description</Label>
            <textarea
              id="description"
              className="w-full min-h-[100px] rounded-xl border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="medicinalValue" className="text-sm font-semibold text-jkuat-gray-700">Medicinal Value</Label>
              <textarea
                id="medicinalValue"
                className="w-full min-h-[100px] rounded-xl border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium"
                value={medicinalValue}
                onChange={(event) => setMedicinalValue(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="culturalSignificance" className="text-sm font-semibold text-jkuat-gray-700">Cultural Significance</Label>
              <textarea
                id="culturalSignificance"
                className="w-full min-h-[100px] rounded-xl border border-jkuat-gray-200 bg-white px-3 py-2 text-sm text-jkuat-gray-900 font-medium"
                value={culturalSignificance}
                onChange={(event) => setCulturalSignificance(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 py-6 border-t border-jkuat-gray-100">
          <div className="space-y-2">
            <Label htmlFor="images" className="text-sm font-semibold text-jkuat-gray-700">Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImages}
              className="bg-jkuat-gray-50 border-jkuat-gray-200 file:text-jkuat-green font-medium rounded-xl h-12 pt-2 file:bg-white file:border file:border-jkuat-gray-200 file:rounded-md file:text-[10px] file:uppercase file:font-semibold file:px-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="documents" className="text-sm font-semibold text-jkuat-gray-700">Documents</Label>
            <Input
              id="documents"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleDocumentUpload}
              disabled={uploadingDocuments}
              className="bg-jkuat-gray-50 border-jkuat-gray-200 file:text-jkuat-green font-medium rounded-xl h-12 pt-2 file:bg-white file:border file:border-jkuat-gray-200 file:rounded-md file:text-[10px] file:uppercase file:font-semibold file:px-3"
            />
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-800">
             {errorMessage}
          </div>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end pt-8 border-t border-jkuat-gray-100">
          <Button 
            type="submit" 
            disabled={isSubmitting || uploadingImages || uploadingDocuments}
            className="bg-jkuat-green hover:bg-jkuat-green-dark text-white font-extrabold h-14 px-16 rounded-2xl shadow-xl transition-all"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}
