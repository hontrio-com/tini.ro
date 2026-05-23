'use client';

import { motion } from 'framer-motion';

const specs = [
  { label: 'Capacitate rezervor', value: '600 ml' },
  { label: 'Viteze ventilator', value: '3 trepte (Joasa / Medie / Puternica)' },
  { label: 'Culori iluminare LED', value: '7 culori + mod ciclu' },
  { label: 'Nivel zgomot', value: '< 45 dB' },
  { label: 'Alimentare', value: 'USB 5V / 2A' },
  { label: 'Consum', value: '10W' },
  { label: 'Autonomie rezervor', value: '3-4 ore (viteza medie)' },
  { label: 'Dimensiuni', value: '18 x 18 x 25 cm' },
  { label: 'Greutate', value: '520g (fara apa)' },
  { label: 'Material', value: 'ABS Premium + Sticla acrilica' },
  { label: 'Culori disponibile', value: 'Alb / Negru' },
];

export default function Specifications() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-mono mb-3">
            Detalii tehnice
          </p>
          <h2 className="tracking-tighttext-3xl md:text-4xl font-bold text-[#0A0A0A]">
            Specificatii
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"
        >
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex items-start sm:items-center gap-4 px-6 py-4 ${
                i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              } ${i !== specs.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <span className="text-sm text-gray-500 w-48 shrink-0 font-medium">
                {spec.label}
              </span>
              <span className="text-sm font-semibold text-[#0A0A0A]">
                {spec.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
