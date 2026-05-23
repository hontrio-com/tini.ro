import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2024';

function getAuth(req: NextRequest): boolean {
  const auth = req.headers.get('x-admin-token');
  return auth === ADMIN_PASSWORD;
}

// GET: list all orders
export async function GET(req: NextRequest) {
  if (!getAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 50;

  const supabase = createServerClient();
  let query = supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (status && status !== 'toate') {
    query = query.eq('status', status);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data, total: count });
}

// PATCH: update order status
export async function PATCH(req: NextRequest) {
  if (!getAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, status } = body;

  const validStatuses = ['noua', 'confirmata', 'in_livrare', 'livrata', 'anulata'];
  if (!id || !validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  const supabase = createServerClient();
  const { error } = await supabase.from('orders').update({ status }).eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// POST: verify password
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.password === ADMIN_PASSWORD) {
    return NextResponse.json({ success: true, token: ADMIN_PASSWORD });
  }
  return NextResponse.json({ error: 'Parola incorecta' }, { status: 401 });
}
