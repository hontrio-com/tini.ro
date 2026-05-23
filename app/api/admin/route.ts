import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2024';

const VALID_STATUSES = ['noua', 'in_livrare', 'neridicata', 'anulata', 'nu_a_raspuns', 'livrata'];

function getAuth(req: NextRequest): boolean {
  return req.headers.get('x-admin-token') === ADMIN_PASSWORD;
}

// GET: list orders or stats
export async function GET(req: NextRequest) {
  if (!getAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const supabase = createServerClient();

  // Stats comenzi
  if (searchParams.get('stats') === 'true') {
    const { data, error } = await supabase.from('orders').select('status, total_price');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const counts: Record<string, number> = {};
    let revenue = 0;
    for (const row of data ?? []) {
      counts[row.status] = (counts[row.status] || 0) + 1;
      revenue += Number(row.total_price);
    }
    return NextResponse.json({ counts, total: data?.length ?? 0, revenue });
  }

  // Stats vizionari
  if (searchParams.get('views') === 'true') {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [allRows, todayRows, weekRows, sourcesRows] = await Promise.all([
      supabase.from('page_views').select('session_id', { count: 'exact' }),
      supabase.from('page_views').select('session_id').gte('created_at', todayStart),
      supabase.from('page_views').select('session_id').gte('created_at', weekStart),
      supabase.from('page_views').select('utm_source').gte('created_at', monthStart).not('utm_source', 'is', null),
    ]);

    const uniqueSessions = (rows: { session_id: string }[] | null) =>
      new Set((rows ?? []).map((r) => r.session_id)).size;

    const sourceCounts: Record<string, number> = {};
    for (const row of sourcesRows.data ?? []) {
      const s = row.utm_source || 'direct';
      sourceCounts[s] = (sourceCounts[s] || 0) + 1;
    }
    const topSources = Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([source, count]) => ({ source, count }));

    return NextResponse.json({
      total: allRows.count ?? 0,
      uniqueTotal: uniqueSessions(allRows.data ?? []),
      todayTotal: todayRows.data?.length ?? 0,
      todayUnique: uniqueSessions(todayRows.data ?? []),
      weekTotal: weekRows.data?.length ?? 0,
      weekUnique: uniqueSessions(weekRows.data ?? []),
      topSources,
    });
  }

  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 50;

  let query = supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (status && status !== 'toate') query = query.eq('status', status);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data, total: count });
}

// PATCH: update order (status only or full edit)
export async function PATCH(req: NextRequest) {
  if (!getAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  if (fields.status && !VALID_STATUSES.includes(fields.status)) {
    return NextResponse.json({ error: 'Status invalid' }, { status: 400 });
  }

  const allowed = ['status', 'customer_name', 'customer_phone', 'customer_county', 'customer_city', 'customer_address', 'quantity', 'total_price'];
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in fields) update[key] = fields[key];
  }

  const supabase = createServerClient();
  const { error } = await supabase.from('orders').update(update).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE: remove order permanently
export async function DELETE(req: NextRequest) {
  if (!getAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const supabase = createServerClient();
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
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
