/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window { ttq: any; }
}

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str.toLowerCase().trim())
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const PRODUCT = {
  content_id: 'ventilator-3in1',
  content_type: 'product',
  content_name: 'Ventilator Portabil 3-in-1',
};

export function ttqViewContent(price: number) {
  try {
    window.ttq?.track('ViewContent', {
      contents: [PRODUCT],
      value: price,
      currency: 'RON',
    });
  } catch {}
}

export function ttqInitiateCheckout(price: number) {
  try {
    window.ttq?.track('InitiateCheckout', {
      contents: [PRODUCT],
      value: price,
      currency: 'RON',
    });
  } catch {}
}

export async function ttqPlaceAnOrder(value: number, phone?: string) {
  try {
    if (!window.ttq) return;
    if (phone) {
      const hashed = await sha256(phone);
      window.ttq.identify({ phone_number: hashed });
    }
    window.ttq.track('PlaceAnOrder', {
      contents: [PRODUCT],
      value,
      currency: 'RON',
    });
  } catch {}
}
