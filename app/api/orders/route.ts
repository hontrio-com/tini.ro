import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase-server';

const orderSchema = z.object({
  customer_name: z.string().min(3),
  customer_phone: z.string().regex(/^(\+40|0)(7\d{8})$/),
  customer_county: z.string().min(1),
  customer_city: z.string().min(2),
  customer_address: z.string().min(10),
  quantity: z.number().min(1).max(5),
  total_price: z.number().positive(),
  notes: z.string().optional(),
  utm_source: z.string().optional(),
  utm_campaign: z.string().optional(),
});

// In-memory rate limiting (per IP, per hour)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (record.count >= 3) return false;

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Prea multe comenzi. Incearca din nou mai tarziu.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Date invalide. Verifica formularul.' },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const supabase = createServerClient();

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_name: data.customer_name.trim(),
        customer_phone: data.customer_phone.trim(),
        customer_county: data.customer_county,
        customer_city: data.customer_city.trim(),
        customer_address: data.customer_address.trim(),
        quantity: data.quantity,
        total_price: data.total_price,
        notes: data.notes?.trim() || null,
        ip_address: ip,
        utm_source: data.utm_source || null,
        utm_campaign: data.utm_campaign || null,
        status: 'noua',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Eroare la salvarea comenzii. Incearca din nou.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (err) {
    console.error('Order API error:', err);
    return NextResponse.json(
      { error: 'Eroare interna. Incearca din nou.' },
      { status: 500 }
    );
  }
}
