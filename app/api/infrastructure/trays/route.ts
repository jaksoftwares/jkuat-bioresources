import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { code, shelf_id } = await request.json()
    
    if (!code || !shelf_id) return NextResponse.json({ error: 'Code and Shelf ID required' }, { status: 400 })

    const { data, error } = await supabase
      .from('lab_trays')
      .insert([{ code, shelf_id }])
      .select('id, code')
      .maybeSingle()
    
    if (error) {
       if (error.code === '23505') return NextResponse.json({ error: 'Tray code exists on this shelf' }, { status: 400 })
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
