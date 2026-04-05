import { NextRequest, NextResponse } from 'next/server'
import { PlantRepository } from '@/repositories/plant.repository'

// Define the context type for Next.js 15+ params
type Params = Promise<{ id: string }>

/**
 * GET /api/plants/[id]
 * Fetch a single plant with local names and recommendations
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params
    const plant = await PlantRepository.getById(id)
    if (!plant) return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    return NextResponse.json(plant)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * PUT /api/plants/[id]
 * Update a plant record
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updatedPlant = await PlantRepository.update(id, body)
    return NextResponse.json(updatedPlant)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

/**
 * DELETE /api/plants/[id]
 * Delete a plant record
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params
    await PlantRepository.delete(id)
    return NextResponse.json({ message: 'Plant deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
