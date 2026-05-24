import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import PageTracker from '@/components/PageTracker';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});


export const metadata: Metadata = {
  title: 'tini.ro | Ventilator Portabil 3-in-1 - Racorire, Umidificare si LED',
  description:
    'Ventilatorul portabil 3-in-1 cu racorire prin apa, umidificator integrat si iluminare LED in 7 culori. Comanda acum cu plata la livrare. Livrare rapida in toata Romania.',
  keywords:
    'ventilator portabil, ventilator usb, racitor aer, umidificator, led, ventilator 3 in 1',
  openGraph: {
    title: 'Ventilator Portabil 3-in-1 — Racorire, Umidificare si LED',
    description:
      'Transforma orice camera cu ventilatorul portabil 3-in-1. Plata la livrare, livrare gratuita.',
    type: 'website',
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ventilator Portabil 3-in-1',
    description: 'Racorire, umidificare si iluminare LED. Plata la livrare.',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Ventilator Portabil 3-in-1',
  description:
    'Ventilator portabil cu racorire prin apa, umidificator integrat si iluminare LED in 7 culori',
  offers: {
    '@type': 'Offer',
    price: '49',
    priceCurrency: 'RON',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '847',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Script id="tiktok-pixel" strategy="afterInteractive">{`
          !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;i++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('D89HRRBC77UA33STHPGG');ttq.page()}(window,document,'ttq');
        `}</Script>
        <PageTracker />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0A0A0A',
              color: '#fff',
              borderRadius: '2px',
              fontFamily: 'var(--font-inter)',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
