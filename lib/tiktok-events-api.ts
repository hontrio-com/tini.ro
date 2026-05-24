import crypto from 'crypto';

const PIXEL_ID = process.env.TIKTOK_PIXEL_ID!;
const ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN!;
const API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

const PRODUCT = {
  content_id: 'ventilator-3in1',
  content_type: 'product',
  content_name: 'Ventilator Portabil 3-in-1',
};

function sha256(str: string): string {
  return crypto.createHash('sha256').update(str.toLowerCase().trim()).digest('hex');
}

interface TikTokEventOptions {
  event: string;
  event_id: string;
  value: number;
  ip: string;
  user_agent: string;
  page_url: string;
  phone?: string;
  ttclid?: string;
}

export async function sendTikTokEvent(opts: TikTokEventOptions): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  try {
    const user: Record<string, string> = {
      ip: opts.ip,
      user_agent: opts.user_agent,
    };
    if (opts.phone) user.phone = sha256(opts.phone);
    if (opts.ttclid) user.ttclid = opts.ttclid;

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({
        pixel_code: PIXEL_ID,
        event: opts.event,
        event_id: opts.event_id,
        timestamp: new Date().toISOString(),
        context: {
          page: { url: opts.page_url },
          user,
        },
        properties: {
          contents: [PRODUCT],
          value: opts.value,
          currency: 'RON',
        },
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error('TikTok Events API error:', res.status, txt);
    }
  } catch (e) {
    console.error('TikTok Events API failed:', e);
  }
}
