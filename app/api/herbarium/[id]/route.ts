import { NextRequest, NextResponse } from 'next/server'
import { HerbariumRepository } from '@/repositories/herbarium.repository'

type Params = Promise<{ id: string }>

/**
 * GET /api/herbarium/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params
    const specimen = await HerbariumRepository.getById(id)
    if (!specimen) return NextResponse.json({ error: 'Specimen not found' }, { status: 404 })
    return NextResponse.json(specimen)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * PUT /api/herbarium/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updatedSpecimen = await HerbariumRepository.update(id, body)
    return NextResponse.json(updatedSpecimen)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

/**
 * DELETE /api/herbarium/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params
    await HerbariumRepository.delete(id)
    return NextResponse.json({ message: 'Specimen record deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
