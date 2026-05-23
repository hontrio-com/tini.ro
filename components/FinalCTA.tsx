'use client';

import { motion } from 'framer-motion';
import { useOrderModal } from '@/hooks/useOrderModal';
import CountdownTimer from './CountdownTimer';
import { CheckCircle2 } from 'lucide-react';

const bonuses = [
  'Cablu USB inclus in pachet',
  'Livrare gratuita in toata Romania',
  'Plata la livrare - zero riscuri',
  'Livrare in 24-48h',
];

export default function FinalCTA() {
  const { open } = useOrderModal();

  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2A5C 50%, #1D4ED8 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#60A5FA', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: '#93C5FD', transform: 'translate(-30%, 30%)' }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-8"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-300 font-mono mb-4">
              Oferta limitata
            </p>
            <h2 className="tracking-tighttext-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Comanda acum si primesti{' '}
              <span className="text-[#F59E0B]">GRATUIT</span>
            </h2>
            <p className="text-blue-200 text-lg">
              Livrare gratuita + cablu USB + garantie 2 ani incluse in pret
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            {bonuses.map((b) => (
              <div key={b} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#34D399] mt-0.5 shrink-0" />
                <span className="text-sm text-blue-100 text-left">{b}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="tracking-tighttext-5xl md:text-6xl font-bold text-white">
              99 Lei
            </span>
            <div className="flex flex-col items-start">
              <span className="text-blue-300 line-through text-xl">149 Lei</span>
              <span className="bg-[#F59E0B] text-[#0A0A0A] text-sm font-bold px-2 py-0.5 rounded">
                -33%
              </span>
            </div>
          </div>

          <CountdownTimer dark />

          <button
            onClick={open}
            className="bg-[#F59E0B] text-[#0A0A0A] font-bold uppercase tracking-wide text-base md:text-lg px-10 py-5 rounded-sm hover:bg-amber-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full max-w-md shadow-lg shadow-amber-500/30"
          >
            Plaseaza Comanda Acum
          </button>

          <p className="text-blue-300 text-sm">
            Plata la livrare · Fara cont necesar · Livrare garantata
          </p>
        </motion.div>
      </div>
    </section>
  );
}
