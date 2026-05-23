'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Phone, Package } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmareClient() {
  const params = useSearchParams();

  const name = params.get('name') || '';
  const qty = params.get('qty') || '1';
  const total = params.get('total') || '49';
  const orderId = params.get('orderId') || '';

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const shortId = orderId ? orderId.slice(0, 8).toUpperCase() : 'N/A';

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-16">
      {/* Confetti dots (CSS-based) */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: -20,
                x: `${Math.random() * 100}vw`,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                y: '110vh',
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 1.5,
                ease: 'easeIn',
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#0A0A0A'][
                  Math.floor(Math.random() * 6)
                ],
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 25 }}
        className="relative z-10 bg-white border border-gray-100 rounded-2xl shadow-xl max-w-md w-full p-8 text-center"
      >
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
          className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-green-500" />
        </motion.div>

        <h1 className="tracking-tighttext-2xl md:text-3xl font-bold text-[#0A0A0A] mb-2">
          Comanda inregistrata cu succes!
        </h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          {name ? `Multumim, ${name.split(' ')[0]}!` : 'Multumim!'} Te vom contacta in maxim{' '}
          <strong className="text-[#0A0A0A]">24 de ore</strong> pentru confirmarea livrarii.
        </p>

        {/* Order summary */}
        <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Package size={16} className="text-gray-500" />
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Detalii comanda #{shortId}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Produs</span>
            <span className="font-medium text-[#0A0A0A]">Ventilator Portabil 3-in-1</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Cantitate</span>
            <span className="font-medium text-[#0A0A0A]">{qty} buc</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Transport</span>
            <span className="font-medium text-green-600">Gratuit</span>
          </div>
          <div className="flex justify-between font-bold border-t border-gray-200 pt-3 mt-1">
            <span className="text-[#0A0A0A]">Total de plata</span>
            <span className="text-lg text-[#0A0A0A]">{total} Lei</span>
          </div>
          <p className="text-xs text-gray-400 text-center pt-1">
            Plata se face la livrare, in numerar curierului
          </p>
        </div>

        {/* Phone note */}
        <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4 mb-6 text-left">
          <Phone size={16} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Vei primi un apel de confirmare pe numarul furnizat. Asigura-te ca telefonul este accesibil.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#0A0A0A] transition-colors"
        >
          <ArrowLeft size={16} />
          Inapoi la magazin
        </Link>
      </motion.div>
    </div>
  );
}
