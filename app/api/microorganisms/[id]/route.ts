import { NextRequest, NextResponse } from 'next/server'
import { MicroorganismRepository } from '@/repositories/microorganism.repository'

type Params = Promise<{ id: string }>

/**
 * GET /api/microorganisms/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params
    const micro = await MicroorganismRepository.getById(id)
    if (!micro) return NextResponse.json({ error: 'Record not found' }, { status: 404 })
    return NextResponse.json(micro)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * PUT /api/microorganisms/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updatedMicro = await MicroorganismRepository.update(id, body)
    return NextResponse.json(updatedMicro)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
