import type { Metadata } from 'next';
import { Suspense } from 'react';
import ConfirmareClient from './ConfirmareClient';

export const metadata: Metadata = {
  title: 'Comanda confirmata | VentShop Romania',
  robots: { index: false, follow: false },
};

export default function ConfirmarePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0A0A0A] rounded-full animate-spin" />
      </div>
    }>
      <ConfirmareClient />
    </Suspense>
  );
}
