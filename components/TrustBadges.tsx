'use client';

import { motion } from 'framer-motion';
import { Truck, Lock, RotateCcw, Phone } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'Livrare 24-48h',
    desc: 'Livrare rapida in toata Romania prin curier rapid.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Lock,
    title: 'Plata la livrare',
    desc: 'Platesti cash curierului cand primesti coletul. Zero riscuri.',
    color: 'text-[#0A0A0A]',
    bg: 'bg-gray-100',
  },
  {
    icon: RotateCcw,
    title: 'Retur 14 zile',
    desc: 'Returneaza produsul fara intrebari in 14 zile de la livrare.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Phone,
    title: 'Suport telefonic',
    desc: 'Disponibil Luni-Vineri 08:00-17:00 la 0757 941 553.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <div className={`w-12 h-12 rounded-full ${b.bg} flex items-center justify-center`}>
                <b.icon size={22} className={b.color} />
              </div>
              <div>
                <p className="font-semibold text-[#0A0A0A] text-sm mb-1">
                  {b.title}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
