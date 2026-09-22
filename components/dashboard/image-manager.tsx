'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, Star, Trash2, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { uploadToCloudinary } from '@/actions/media-actions'
import type { CloudinaryMedia } from '@/types'
import { toast } from 'sonner'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

interface ImageManagerProps {
  images: CloudinaryMedia[]
  onChange: (images: CloudinaryMedia[]) => void
  folder: string
  label: string
  emptyText?: string
}

function getImageSource(image: CloudinaryMedia) {
  return image.secure_url || image.url
}

function orderImages(images: CloudinaryMedia[], primaryIndex: number) {
  return images.map((image, index) => ({
    ...image,
    sort_order: index,
    is_primary: index === primaryIndex,
  }))
}

export default function ImageManager({
  images,
  onChange,
  folder,
  label,
  emptyText = 'No images uploaded yet',
}: ImageManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const invalidFile = files.find(file => !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE)

    if (invalidFile) {
      toast.error(`${invalidFile.name} must be a JPG, PNG, or WebP image under 10 MB`)
      event.target.value = ''
      return
    }

    setPendingFiles(previous => [...previous, ...files])
    event.target.value = ''
  }

  const uploadImages = async () => {
    if (pendingFiles.length === 0) return

    setUploading(true)
    try {
      const uploadedImages: CloudinaryMedia[] = []
      for (const file of pendingFiles) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = () => reject(new Error(`Could not read ${file.name}`))
          reader.readAsDataURL(file)
        })
        uploadedImages.push(await uploadToCloudinary(base64, folder))
      }

      const nextImages = [...images, ...uploadedImages]
      onChange(orderImages(nextImages, nextImages.findIndex(image => image.is_primary) >= 0 ? nextImages.findIndex(image => image.is_primary) : 0))
      setPendingFiles([])
      toast.success('Images uploaded successfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    const nextImages = images.filter((_, imageIndex) => imageIndex !== index)
    onChange(orderImages(nextImages, nextImages.length > 0 ? Math.min(index, nextImages.length - 1) : -1))
  }

  const setPrimaryImage = (index: number) => {
    onChange(orderImages(images, index))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Label className="text-sm font-bold">{label}</Label>
        <span className="text-xs font-medium text-slate-400">{images.length} uploaded</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleFileSelection}
          disabled={uploading}
          className="sr-only"
        />
        <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading} className="gap-2">
          <ImagePlus className="h-4 w-4" /> Choose images
        </Button>
        <Button type="button" onClick={uploadImages} disabled={uploading || pendingFiles.length === 0} className="gap-2">
          <Upload className="h-4 w-4" /> {uploading ? 'Uploading...' : `Upload${pendingFiles.length ? ` (${pendingFiles.length})` : ''}`}
        </Button>
      </div>

      {pendingFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 rounded-lg border border-dashed border-emerald-200 bg-emerald-50/50 p-3">
          {pendingFiles.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-medium text-slate-600">
              <span className="max-w-48 truncate">{file.name}</span>
              <button type="button" aria-label={`Remove ${file.name}`} onClick={() => setPendingFiles(pendingFiles.filter((_, fileIndex) => fileIndex !== index))}>
                <X className="h-3.5 w-3.5 text-slate-400 hover:text-rose-600" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((image, index) => (
            <div key={`${image.public_id}-${index}`} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <Image src={getImageSource(image)} alt={image.alt || `${label} ${index + 1}`} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/60 p-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                <button type="button" aria-label={`Make image ${index + 1} primary`} onClick={() => setPrimaryImage(index)} className="text-white hover:text-amber-300">
                  <Star className={`h-4 w-4 ${image.is_primary || (index === 0 && !images.some(item => item.is_primary)) ? 'fill-amber-300 text-amber-300' : ''}`} />
                </button>
                <button type="button" aria-label={`Remove image ${index + 1}`} onClick={() => removeImage(index)} className="text-white hover:text-rose-300">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {index === 0 && !images.some(item => item.is_primary) && <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-[10px] font-bold uppercase text-white">Primary</span>}
              {image.is_primary && <span className="absolute left-2 top-2 rounded bg-amber-400 px-2 py-1 text-[10px] font-bold uppercase text-amber-950">Primary</span>}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-24 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm font-medium text-slate-400">
          {emptyText}
        </div>
      )}
    </div>
  )
}
