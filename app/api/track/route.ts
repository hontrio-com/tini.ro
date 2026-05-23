import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

const BOT_UA = /bot|crawler|spider|crawling|facebookexternalhit|twitterbot|linkedinbot|whatsapp|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|applebot|semrush|ahrefs|mj12bot/i;

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get('user-agent') || '';
    if (BOT_UA.test(ua)) return NextResponse.json({ ok: true });

    const body = await req.json();
    const { path, referrer, utm_source, utm_campaign, session_id } = body;

    if (!session_id || typeof session_id !== 'string' || session_id.length > 64) {
      return NextResponse.json({ ok: true });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    const supabase = createServerClient();

    // Deduplicare: max 1 inregistrare per session+path per 10 minute
    const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from('page_views')
      .select('id')
      .eq('session_id', session_id)
      .eq('path', path || '/')
      .gte('created_at', tenMinAgo)
      .limit(1)
      .maybeSingle();

    if (existing) return NextResponse.json({ ok: true });

    await supabase.from('page_views').insert({
      path: (path || '/').slice(0, 255),
      referrer: referrer ? String(referrer).slice(0, 500) : null,
      utm_source: utm_source ? String(utm_source).slice(0, 100) : null,
      utm_campaign: utm_campaign ? String(utm_campaign).slice(0, 100) : null,
      user_agent: ua.slice(0, 500),
      ip_address: ip,
      session_id,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
