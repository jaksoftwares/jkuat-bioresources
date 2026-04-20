import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { code } = body
    
    if (!code) {
      return NextResponse.json({ error: 'Hardware code is required' }, { status: 400 })
    }

    // Explicitly insert and select only existing columns
    const { data, error } = await supabase
      .from('lab_fridges')
      .insert([{ code, description: 'Technically managed unit' }])
      .select('id, code, description')
      .maybeSingle()
    
    if (error) {
      console.error('Fridge Registration Error:', error);
      // Handle the duplicate code error specifically for better UX
      if (error.code === '23505') {
        return NextResponse.json({ error: 'This hardware code is already registered' }, { status: 400 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
