import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { code, fridge_id } = await request.json()
    
    if (!code || !fridge_id) return NextResponse.json({ error: 'Code and Fridge ID required' }, { status: 400 })

    const { data, error } = await supabase
      .from('lab_shelves')
      .insert([{ code, fridge_id }])
      .select('id, code')
      .maybeSingle()
    
    if (error) {
      if (error.code === '23505') return NextResponse.json({ error: 'Shelf code exists in this fridge' }, { status: 400 })
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
