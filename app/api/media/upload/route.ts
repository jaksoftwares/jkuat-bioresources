import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/actions/media-actions'

/**
 * POST /api/media/upload
 * Proxy endpoint to securely upload media to Cloudinary
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { file, folder } = body // file is a base64 string or data URL
    
    if (!file) {
      return NextResponse.json({ error: 'No file data provided' }, { status: 400 })
    }

    const result = await uploadToCloudinary(file, folder || 'jkuat-bioresources')
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
