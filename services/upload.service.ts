import { uploadToCloudinary, deleteFromCloudinary } from '@/actions/media-actions'
import { CloudinaryMedia } from '@/types'

export class UploadService {
  /**
   * Universal file upload for any bioresource
   * @param fileData base64 or dataURL
   * @param folder Destination folder (plants, micro, herbarium, profiles)
   */
  static async uploadMedia(fileData: string, folder: string = 'general'): Promise<CloudinaryMedia> {
    // 1. Validation (size, type if possible at this stage)
    // 2. Upload to Cloudinary via server action
    try {
      const result = await uploadToCloudinary(fileData, `jkuat-bioresources/${folder}`)
      return result
    } catch (error) {
      console.error('UploadService Error:', error)
      throw new Error('Media upload failed')
    }
  }

  /**
   * Handle multiple file uploads in parallel
   */
  static async uploadMultiple(files: string[], folder: string = 'general'): Promise<CloudinaryMedia[]> {
    const uploadPromises = files.map(file => this.uploadMedia(file, folder))
    try {
      const results = await Promise.all(uploadPromises)
      return results
    } catch (error) {
      console.error('Bulk Upload Error:', error)
      throw new Error('One or more media uploads failed')
    }
  }

  /**
   * Safe removal from both Cloudinary and potential DB references
   * @param publicId Cloudinary public_id
   */
  static async removeMedia(publicId: string) {
    try {
      await deleteFromCloudinary(publicId)
      return true
    } catch (error) {
       console.error('Removal Error:', error)
       return false
    }
  }
}
