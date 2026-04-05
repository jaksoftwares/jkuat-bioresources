import { NextRequest, NextResponse } from 'next/server'
import { ImportService } from '@/services/import.service'

/**
 * POST /api/import
 * Batch import data for plants, microorganisms, or herbarium
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, records, fileName } = body

    if (!type || !records || !Array.isArray(records)) {
      return NextResponse.json({ error: 'Missing type or invalid record set' }, { status: 400 })
    }

    let resultCount = 0

    if (type === 'plant') {
      resultCount = await ImportService.processPlantImport(records)
    } else if (type === 'microorganism') {
      resultCount = await ImportService.processMicroorganismImport(records)
    } else {
       return NextResponse.json({ error: 'Unsupported resource type' }, { status: 400 })
    }

    // Log the import to the audit trail
    await ImportService.logImport(fileName || 'API_BULK_IMPORT', type, resultCount)

    return NextResponse.json({ 
      success: true, 
      count: resultCount, 
      message: `Successfully processed ${resultCount} records.` 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
