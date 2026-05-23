'use client';

const text =
  'PLATA LA LIVRARE   ✦   LIVRARE RAPIDA IN 24 DE ORE IN TOATA ROMANIA   ✦   RETUR IN 14 ZILE   ✦   PLATA LA LIVRARE   ✦   LIVRARE RAPIDA IN 24 DE ORE IN TOATA ROMANIA   ✦   RETUR IN 14 ZILE   ✦   ';

export default function AnnouncementBar() {
  return (
    <div className="h-9 overflow-hidden flex items-center fixed top-0 left-0 right-0 z-50" style={{ background: 'linear-gradient(90deg, #1D4ED8 0%, #2563EB 50%, #1D4ED8 100%)' }}>
      <div className="flex whitespace-nowrap">
        <span
          className="inline-block text-xs font-medium tracking-wide animate-marquee text-white"
          aria-label="Livrare gratuita in toata Romania, retur 14 zile, plata la livrare"
        >
          {text}
        </span>
        <span
          className="inline-block text-xs font-medium tracking-wide animate-marquee text-white"
          aria-hidden="true"
        >
          {text}
        </span>
      </div>
    </div>
  );
}
