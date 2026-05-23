'use client';

import { motion, type Variants } from 'framer-motion';
import { Wind, Palette, Gauge, Droplets, Volume2, Plug } from 'lucide-react';

const benefits = [
  {
    icon: Wind,
    title: '3 in 1',
    desc: 'Ventilator + Umidificator + Lampa LED intr-un singur dispozitiv compact si elegant.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Palette,
    title: '7 Culori LED',
    desc: 'Atmosfera personalizata cu 7 culori selectabile. De la alb rece pentru birou la mov relaxant pentru somn.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Gauge,
    title: '3 Viteze de Vant',
    desc: 'Viteza joasa pentru somn, medie pentru zi, puternica pentru calduri extreme. Control precis.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Droplets,
    title: 'Rezervor 600ml',
    desc: '3-4 ore de racorire continua fara reumplere. Adauga cuburi de gheata pentru eficienta maxima.',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: Volume2,
    title: 'Sub 45dB',
    desc: 'Mai silentios decat o conversatie normala. Foloseste-l pe timp de noapte fara sa deranjezi pe nimeni.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Plug,
    title: 'Alimentare USB',
    desc: 'Conecteaza la orice priza USB, power bank sau laptop. Portabil oriunde - birou, dormitor, terasa.',
    color: 'bg-red-50 text-red-600',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Benefits() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-mono mb-3">
            De ce sa alegi
          </p>
          <h2 className="tracking-tighttext-3xl md:text-4xl font-bold text-[#0A0A0A]">
            Tot ce ai nevoie, intr-un singur produs
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${b.color.split(' ')[0]}`}>
                <b.icon size={22} className={b.color.split(' ')[1]} />
              </div>
              <h3 className="font-semibold text-[#0A0A0A] text-lg mb-2">
                {b.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
