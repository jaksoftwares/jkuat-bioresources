import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Fetch users who have the 'researcher', 'technical_team' or 'administrator' role
    // and join with their profiles for names
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, full_name, researchers(id, qualification, specialization)')
    
    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
