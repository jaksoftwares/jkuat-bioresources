import { NextRequest, NextResponse } from 'next/server'
import { UserRepository } from '@/repositories/user.repository'

/**
 * GET /api/users
 * Filter by role
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role') as any || 'researcher'
    
    const users = await UserRepository.listByRole(role)
    return NextResponse.json(users)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
