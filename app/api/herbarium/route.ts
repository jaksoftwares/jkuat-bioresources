import { NextRequest, NextResponse } from 'next/server'
import { HerbariumRepository } from '@/repositories/herbarium.repository'

/**
 * GET /api/herbarium
 * Fetch specimens
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const filters = {
      herbarium_code: searchParams.get('herbarium_code') || undefined,
      scientific_name: searchParams.get('scientific_name') || undefined,
      search: searchParams.get('search') || undefined,
    }

    const specimens = await HerbariumRepository.list(filters)
    return NextResponse.json(specimens)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * POST /api/herbarium
 * Create a new specimen record
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newSpecimen = await HerbariumRepository.create(body)
    return NextResponse.json(newSpecimen, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
