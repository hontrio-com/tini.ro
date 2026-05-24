'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function getSessionId(): string {
  const key = 'tini_sid';
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;

    try {
      const sid = getSessionId();
      const params = new URLSearchParams(window.location.search);

      // Salveaza ttclid daca vizitatorul vine de pe TikTok
      const ttclid = params.get('ttclid');
      if (ttclid) sessionStorage.setItem('ttclid', ttclid);

      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || null,
          utm_source: params.get('utm_source'),
          utm_campaign: params.get('utm_campaign'),
          session_id: sid,
        }),
      });
    } catch {
      // fail silently
    }
  }, [pathname]);

  return null;
}
