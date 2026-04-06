import { NextRequest, NextResponse } from 'next/server'
import { UserRepository } from '@/repositories/user.repository'
import { protectRoute } from '@/lib/auth/role-guard'
import { UserRole } from '@/types'

export async function PATCH(request: NextRequest) {
  try {
    await protectRoute(['administrator', 'technical_team'])
    const { userId, role } = await request.json()
    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing userId or role' }, { status: 400 })
    }
    await UserRepository.assignRole(userId, role as UserRole)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
