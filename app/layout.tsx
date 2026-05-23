import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
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
