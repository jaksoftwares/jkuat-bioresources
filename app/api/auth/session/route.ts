import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/services/auth.service'

/**
 * GET /api/auth/session
 * Full session (User + Profile + Roles)
 */
export async function GET() {
  try {
    const session = await AuthService.getFullSession()
    if (!session) return NextResponse.json({ session: null }, { status: 401 })
    return NextResponse.json({ session })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
