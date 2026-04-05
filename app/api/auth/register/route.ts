import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/services/auth.service'
import { signUpSchema } from '@/validators/schema'

/**
 * POST /api/auth/register
 * Complex researcher registration logic
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate input with Zod
    const validatedData = signUpSchema.parse(body)
    
    const user = await AuthService.registerResearcher(validatedData)
    return NextResponse.json({ user, message: 'Registration successful' }, { status: 201 })
  } catch (error: any) {
    console.error('Registration API Error:', error)
    return NextResponse.json({ error: error.message || 'Registration failed' }, { status: 400 })
  }
}
