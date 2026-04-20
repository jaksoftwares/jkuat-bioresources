import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const [fridges, shelves, trays, partitions] = await Promise.all([
      supabase.from('lab_fridges').select('code'),
      supabase.from('lab_shelves').select('code'),
      supabase.from('lab_trays').select('code'),
      supabase.from('lab_partitions').select('code')
    ])

    return NextResponse.json({
      fridges: Array.from(new Set(fridges.data?.map(f => f.code) || [])),
      shelves: Array.from(new Set(shelves.data?.map(s => s.code) || [])),
      trays: Array.from(new Set(trays.data?.map(t => t.code) || [])),
      partitions: Array.from(new Set(partitions.data?.map(p => p.code) || []))
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
