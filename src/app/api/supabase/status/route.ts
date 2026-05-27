import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    // Try a lightweight query to ensure the DB is reachable
    const { data, error } = await supabase.from('pjl_store').select('key').limit(1);
    if (error) {
      return NextResponse.json({ ok: false, message: 'Query error: ' + (error.message || error) }, { status: 500 });
    }
    return NextResponse.json({ ok: true, message: 'Supabase reachable', sample: data || [] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message || String(e) }, { status: 500 });
  }
}
