import { NextRequest, NextResponse } from 'next/server'
import { PlantRepository } from '@/repositories/plant.repository'
import { MicroorganismRepository } from '@/repositories/microorganism.repository'
import { HerbariumRepository } from '@/repositories/herbarium.repository'

/**
 * GET /api/search
 * Unified search across plants, microorganisms, and herbarium
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || ''

    if (!query) {
      return NextResponse.json({
        plants: [],
        microorganisms: [],
        herbarium: []
      })
    }

    // Run searches in parallel for efficiency
    const [plants, microorganisms, herbarium] = await Promise.all([
      PlantRepository.list({ search: query }),
      MicroorganismRepository.list({ search: query }),
      HerbariumRepository.list({ search: query })
    ])

    return NextResponse.json({
      plants,
      microorganisms,
      herbarium,
      totalCount: plants.length + microorganisms.length + herbarium.length
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
