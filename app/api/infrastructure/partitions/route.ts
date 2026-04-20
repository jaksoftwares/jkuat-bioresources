import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { code, tray_id } = await request.json()
    
    if (!code || !tray_id) return NextResponse.json({ error: 'Code and Tray ID required' }, { status: 400 })

    const { data, error } = await supabase
      .from('lab_partitions')
      .insert([{ code, tray_id }])
      .select('id, code')
      .maybeSingle()
    
    if (error) {
       if (error.code === '23505') return NextResponse.json({ error: 'Partition code exists on this tray' }, { status: 400 })
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
