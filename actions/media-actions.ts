'use server'

import cloudinary from '@/lib/cloudinary/cloudinary'
import { CloudinaryMedia } from '@/types'
import { getUserRole } from '@/lib/auth/role-guard'

const ALLOWED_IMAGE_FOLDERS = new Set([
  'plants/images',
  'microorganisms/images',
  'herbarium/images',
])
const ALLOWED_DOCUMENT_FOLDERS = new Set(['microorganisms/docs'])
const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const DOCUMENT_MIME_TYPES = new Set(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])

/**
 * Handle server-side upload to Cloudinary for security
 * Expects a base64 encoded string or a data URL
 */
export async function uploadToCloudinary(fileString: string, folder: string = 'jkuat-bioresources'): Promise<CloudinaryMedia> {
  try {
    const role = await getUserRole()
    if (!['administrator', 'technical_team'].includes(role)) {
      throw new Error('Unauthorized')
    }

    if (!ALLOWED_IMAGE_FOLDERS.has(folder) && !ALLOWED_DOCUMENT_FOLDERS.has(folder)) {
      throw new Error('Unsupported media folder')
    }

    const match = fileString.match(/^data:([^;]+);base64,(.+)$/)
    if (!match) throw new Error('Invalid media data')

    const [, mimeType, encodedData] = match
    const isImage = IMAGE_MIME_TYPES.has(mimeType)
    const isDocument = DOCUMENT_MIME_TYPES.has(mimeType)
    if ((ALLOWED_IMAGE_FOLDERS.has(folder) && !isImage) || (ALLOWED_DOCUMENT_FOLDERS.has(folder) && !isDocument)) {
      throw new Error('Unsupported media type')
    }
    const byteSize = Math.ceil((encodedData.length * 3) / 4) - (encodedData.endsWith('==') ? 2 : encodedData.endsWith('=') ? 1 : 0)
    if (byteSize > MAX_IMAGE_SIZE) throw new Error('Image must be 10 MB or smaller')

    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      folder,
      resource_type: isImage ? 'image' : 'raw',
    })

    return {
      url: uploadResponse.url,
      public_id: uploadResponse.public_id,
      format: uploadResponse.format,
      resource_type: uploadResponse.resource_type,
      secure_url: uploadResponse.secure_url,
      width: uploadResponse.width,
      height: uploadResponse.height,
    }
  } catch (error) {
    console.error('Cloudinary Upload Error:', error)
    throw new Error('Failed to upload media to Cloudinary')
  }
}

/**
 * Delete a media file from Cloudinary by its public_id
 */
export async function deleteFromCloudinary(publicId: string) {
  try {
    const role = await getUserRole()
    if (!['administrator', 'technical_team'].includes(role)) {
      throw new Error('Unauthorized')
    }
    if (!publicId || publicId.length > 300) {
      throw new Error('Invalid media identifier')
    }
    await cloudinary.uploader.destroy(publicId)
    return true
  } catch (error) {
    console.error('Cloudinary Delete Error:', error)
    throw new Error('Failed to delete media from Cloudinary')
  }
}

export async function deleteRemovedMedia(previousMedia: unknown, nextMedia: unknown) {
  const previousIds = new Set(
    Array.isArray(previousMedia)
      ? previousMedia.map(media => typeof media === 'object' && media !== null && 'public_id' in media ? media.public_id : null).filter((id): id is string => typeof id === 'string' && id.length > 0)
      : [],
  )
  const nextIds = new Set(
    Array.isArray(nextMedia)
      ? nextMedia.map(media => typeof media === 'object' && media !== null && 'public_id' in media ? media.public_id : null).filter((id): id is string => typeof id === 'string' && id.length > 0)
      : [],
  )
  const removedIds = [...previousIds].filter(publicId => !nextIds.has(publicId))

  await Promise.allSettled(removedIds.map(publicId => deleteFromCloudinary(publicId)))
}

export async function deleteMediaAssets(media: unknown) {
  const publicIds = Array.isArray(media)
    ? media.map(item => typeof item === 'object' && item !== null && 'public_id' in item ? item.public_id : null).filter((id): id is string => typeof id === 'string' && id.length > 0)
    : []

  await Promise.allSettled(publicIds.map(publicId => deleteFromCloudinary(publicId)))
}
