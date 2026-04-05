'use server'

import cloudinary from '@/lib/cloudinary/cloudinary'
import { CloudinaryMedia } from '@/types'

/**
 * Handle server-side upload to Cloudinary for security
 * Expects a base64 encoded string or a data URL
 */
export async function uploadToCloudinary(fileString: string, folder: string = 'jkuat-bioresources'): Promise<CloudinaryMedia> {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      folder,
      resource_type: 'auto',
    })

    return {
      url: uploadResponse.url,
      public_id: uploadResponse.public_id,
      format: uploadResponse.format,
      resource_type: uploadResponse.resource_type,
      secure_url: uploadResponse.secure_url
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
    await cloudinary.uploader.destroy(publicId)
    return true
  } catch (error) {
    console.error('Cloudinary Delete Error:', error)
    throw new Error('Failed to delete media from Cloudinary')
  }
}
