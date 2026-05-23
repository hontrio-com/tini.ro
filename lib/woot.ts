/**
 * WOOT Courier API helper
 * Docs: https://ws.woot.ro/latest/
 * Base URL: https://ws.woot.ro/test
 */

const WOOT_BASE = 'https://ws.woot.ro/latest';

// Module-level token cache (server-side)
let cachedToken: string | null = null;
let tokenExpiry = 0;
let cachedSenderId: number | null = null;

// --- Auth ---

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const res = await fetch(`${WOOT_BASE}/account/authorize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      public_key: process.env.WOOT_PUBLIC_KEY,
      secret_key: process.env.WOOT_SECRET_KEY,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`WOOT auth failed [${res.status}]: ${txt}`);
  }

  const data = await res.json();
  cachedToken = data.token as string;
  // expires_in in seconds, fallback 50 minutes
  tokenExpiry = Date.now() + ((data.expires_in ?? 3000) - 60) * 1000;
  return cachedToken;
}

async function wootFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = await getToken();
  return fetch(`${WOOT_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init.headers as Record<string, string> | undefined),
    },
  });
}

// --- Sender address ---

export async function getSenderId(): Promise<number> {
  if (cachedSenderId) return cachedSenderId;

  const res = await wootFetch('/addresses/sender?page=1&limit=10');
  if (!res.ok) throw new Error(`WOOT get sender failed [${res.status}]`);

  const data = await res.json();
  const list: Array<{ id: number }> = data.list ?? data ?? [];
  if (!list.length) throw new Error('No sender addresses configured in WOOT');

  cachedSenderId = list[0].id;
  return cachedSenderId;
}

// --- Parcel builder ---

function buildParcels(quantity: number) {
  // Dimensions per unit with box: 25×25×30cm, ~1.5kg
  return [
    {
      type: 'package',
      content: 'Ventilator Portabil 3-in-1',
      length: 25,
      width: 25,
      height: quantity > 1 ? 30 * quantity : 30,
      weight: parseFloat((1.5 * quantity).toFixed(1)),
    },
  ];
}

// --- Prices ---

export interface WootPrice {
  service_id: number;
  service_name: string;
  courier_name: string;
  price: number;
  currency: string;
  delivery_days?: number;
}

export async function getShippingPrices(order: {
  customer_name: string;
  customer_phone: string;
  customer_county: string;
  customer_city: string;
  customer_address: string;
  quantity: number;
  total_price: number;
}): Promise<WootPrice[]> {
  const sender_id = await getSenderId();

  const res = await wootFetch('/orders/prices', {
    method: 'POST',
    body: JSON.stringify({
      sender: { address_id: sender_id },
      receiver: {
        company: 0,
        contact: order.customer_name,
        phone: order.customer_phone,
        country_id: 1, // Romania
        county: order.customer_county,
        city: order.customer_city,
        address: order.customer_address,
      },
      parcels: buildParcels(order.quantity),
      repayment: order.total_price,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`WOOT prices failed [${res.status}]: ${txt}`);
  }

  const data = await res.json();
  console.log('WOOT prices raw:', JSON.stringify(data));
  const raw: Array<Record<string, unknown>> = Array.isArray(data) ? data : (data.list ?? data.services ?? []);

  return raw
    .map((s) => ({
      service_id: s.service_id as number,
      service_name: s.service_name as string ?? '',
      courier_name: s.courier_name as string ?? '',
      price: parseFloat(String(s.final_total ?? s.total ?? s.price ?? 0)),
      currency: 'RON',
      delivery_days: s.delivery_days as number ?? undefined,
    }))
    .filter((s) => s.price > 0);
}

// --- Create order (AWB) ---

export interface WootOrderResult {
  woot_order_id: string;
  awb: string;
}

export async function createWootOrder(
  serviceId: number,
  order: {
    customer_name: string;
    customer_phone: string;
    customer_county: string;
    customer_city: string;
    customer_address: string;
    quantity: number;
    total_price: number;
    notes?: string | null;
  }
): Promise<WootOrderResult> {
  const sender_id = await getSenderId();

  const res = await wootFetch('/orders', {
    method: 'POST',
    body: JSON.stringify({
      service_id: serviceId,
      sender: { address_id: sender_id },
      receiver: {
        company: 0,
        contact: order.customer_name,
        phone: order.customer_phone,
        country_id: 1,
        county: order.customer_county,
        city: order.customer_city,
        address: order.customer_address,
      },
      parcels: buildParcels(order.quantity),
      repayment: order.total_price,
      payment_method: 'credit',
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`WOOT create order failed [${res.status}]: ${txt}`);
  }

  const data = await res.json();
  return {
    woot_order_id: String(data.id ?? data.order_id ?? data.woot_id),
    awb: String(data.awb ?? data.awb_number ?? data.barcode ?? data.id),
  };
}

// --- Download AWB PDF ---

export async function getAwbPdf(wootOrderId: string): Promise<string> {
  const res = await wootFetch(`/orders/${wootOrderId}/awb`);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`WOOT AWB download failed [${res.status}]: ${txt}`);
  }

  const data = await res.json();
  // WOOT returns base64 PDF in content or pdf field
  return (data.content ?? data.pdf ?? data.awb ?? '') as string;
}
