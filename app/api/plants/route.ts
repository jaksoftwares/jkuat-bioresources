import { NextRequest, NextResponse } from 'next/server'
import { PlantRepository } from '@/repositories/plant.repository'

/**
 * GET /api/plants
 * Fetch plants with optional filters
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const filters = {
      is_aiv: searchParams.get('is_aiv') === 'true' ? true : undefined,
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
    }

    const plants = await PlantRepository.list(filters)
    return NextResponse.json(plants)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * POST /api/plants
 * Create a new plant/AIV record
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newPlant = await PlantRepository.create(body)
    return NextResponse.json(newPlant, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export const dynamic = 'force-dynamic'

