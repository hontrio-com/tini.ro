import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { getShippingPrices, createWootOrder, getAwbPdf } from '@/lib/woot';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2024';

function getAuth(req: NextRequest): boolean {
  return req.headers.get('x-admin-token') === ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!getAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { action } = body;

  try {
    // ── Get shipping prices ──────────────────────────────────────────────
    if (action === 'prices') {
      const { orderId } = body;
      if (!orderId) return NextResponse.json({ error: 'orderId required' }, { status: 400 });

      const supabase = createServerClient();
      const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error || !order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      const prices = await getShippingPrices(order);
      return NextResponse.json({ prices });
    }

    // ── Create AWB ───────────────────────────────────────────────────────
    if (action === 'create') {
      const { orderId, serviceId, courierName } = body;
      if (!orderId || !serviceId) {
        return NextResponse.json({ error: 'orderId and serviceId required' }, { status: 400 });
      }

      const supabase = createServerClient();
      const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error || !order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      const result = await createWootOrder(serviceId, order);

      // Save AWB info to Supabase
      await supabase.from('orders').update({
        woot_order_id: result.woot_order_id,
        woot_awb: result.awb,
        woot_courier: courierName ?? '',
      }).eq('id', orderId);

      return NextResponse.json({ success: true, ...result });
    }

    // ── Download AWB PDF ─────────────────────────────────────────────────
    if (action === 'awb') {
      const { wootOrderId } = body;
      if (!wootOrderId) {
        return NextResponse.json({ error: 'wootOrderId required' }, { status: 400 });
      }

      const pdf = await getAwbPdf(wootOrderId);
      return NextResponse.json({ pdf });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('WOOT API error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
