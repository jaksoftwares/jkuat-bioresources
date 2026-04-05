import { NextRequest, NextResponse } from 'next/server'
import { MicroorganismRepository } from '@/repositories/microorganism.repository'

/**
 * GET /api/microorganisms
 * Fetch microorganisms with filters
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const filters = {
      strain_code: searchParams.get('strain_code') || undefined,
      scientific_name: searchParams.get('scientific_name') || undefined,
      search: searchParams.get('search') || undefined,
    }

    const micro = await MicroorganismRepository.list(filters)
    return NextResponse.json(micro)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * POST /api/microorganisms
 * Create a new microorganism record
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newMicro = await MicroorganismRepository.create(body)
    return NextResponse.json(newMicro, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
