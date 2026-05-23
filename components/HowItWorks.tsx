'use client';

import { motion } from 'framer-motion';
import { Droplets, Plug, Wind } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Umple rezervorul',
    desc: 'Adauga apa rece si cateva cuburi de gheata in rezervorul de 600ml. Inchide capacul etans si esti gata.',
    Icon: Droplets,
  },
  {
    num: '02',
    title: 'Conecteaza la USB',
    desc: 'Conecteaza cablul USB la orice sursa - priza, laptop sau power bank. Alege viteza si culoarea LED dorita.',
    Icon: Plug,
  },
  {
    num: '03',
    title: 'Bucura-te de racoare',
    desc: 'Simte aerul racoros si umidificat. Ajusteaza culoarea LED pentru atmosfera perfecta in camera ta.',
    Icon: Wind,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-6 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-mono mb-3">
            Simplu de folosit
          </p>
          <h2 className="tracking-tighttext-3xl md:text-4xl font-bold text-[#0A0A0A]">
            Cum functioneaza
          </h2>
        </motion.div>

        {/* Mobile: compact vertical list */}
        <div className="md:hidden flex flex-col gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <step.Icon size={20} className="text-[#2563EB]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-[10px] font-bold text-gray-300">{step.num}</span>
                  <h3 className="font-semibold text-[#0A0A0A] text-sm">{step.title}</h3>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:gap-4 relative">
          <div className="absolute top-12 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center text-center relative"
            >
              <div className="w-24 h-24 rounded-full bg-white border-2 border-gray-100 shadow-sm flex flex-col items-center justify-center mb-6 relative z-10">
                <step.Icon size={24} className="text-[#2563EB] mb-0.5" />
                <span className="font-mono text-xs font-bold text-gray-300">{step.num}</span>
              </div>
              <h3 className="font-semibold text-[#0A0A0A] text-xl mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
