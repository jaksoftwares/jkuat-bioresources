import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Explicitly select only existing columns and remove ALL ordering dependencies on created_at
    const { data: fridges, error: fError } = await supabase
      .from('lab_fridges')
      .select('id, code, description')
    
    if (fError) {
      console.error('Core Fridge Fetch Error:', fError);
      throw fError;
    }

    // Attempt the join without any 'order' clauses first to ensure base connectivity
    const { data: fullData, error: joinError } = await supabase
      .from('lab_fridges')
      .select('id, code, description, lab_shelves(id, code, lab_trays(id, code, lab_partitions(id, code)))')

    if (joinError) {
      console.error('Infrastructure Join Error:', joinError);
      return NextResponse.json(fridges || []);
    }
    
    // Perform manual sorting in JS if DB sorting is causing issues with schema mismatches
    const sortedData = (fullData || []).sort((a, b) => a.code.localeCompare(b.code));
    
    return NextResponse.json(sortedData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
