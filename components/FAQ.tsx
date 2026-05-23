'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Ventilatorul racoreste cu adevarat aerul?',
    a: 'Da! Spre deosebire de ventilatoarele clasice care recircula aerul cald, acest model foloseste evaporarea apei pentru a scadea efectiv temperatura aerului cu 3-5 grade Celsius. Cu cuburi de gheata in rezervor, efectul este si mai pronuntat.',
  },
  {
    q: 'Cat timp functioneaza cu rezervorul plin?',
    a: 'La viteza medie si temperatura camerei de 25°C, rezervorul de 600ml ofera aproximativ 3-4 ore de functionare continua. La viteza mica, poti ajunge la 5-6 ore. Umplerea rezervorului dureaza mai putin de 30 de secunde.',
  },
  {
    q: 'Pot folosi ventilatorul fara apa?',
    a: 'Da, ventilatorul functioneaza perfect si fara apa - ca un ventilator clasic cu LED. Umidificarea este optionala si o activezi doar cand vrei racorire suplimentara.',
  },
  {
    q: 'Cum se alimenteaza? Am nevoie de o priza speciala?',
    a: 'Nu, ventilatorul se alimenteaza prin USB standard (5V/2A). Il poti conecta la orice incarcator de telefon, laptop, computer sau power bank. Cablul USB este inclus in pachet.',
  },
  {
    q: 'Este dificil de curatat?',
    a: 'Deloc! Rezervorul se detaseaza complet cu o simpla rasucire si se spala cu apa si sapun. Recomandam curatarea saptamanala pentru o functionare optima si prevenirea formarii calcarului.',
  },
  {
    q: 'In cat timp ajunge comanda?',
    a: 'Comenzile plasate pana la ora 15:00 sunt procesate in aceeasi zi. Livrarea prin curier rapid dureaza 24-48 de ore lucratoare in toata Romania. Vei primi un SMS cu numarul de tracking.',
  },
  {
    q: 'Pot comanda mai multe bucati?',
    a: 'Da, poti comanda pana la 3 bucati dintr-o singura comanda. Cu cat comanzi mai mult, cu atat pretul per bucata este mai avantajos.',
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 py-5 text-left hover:text-gray-700 transition-colors"
      >
        <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center">
          {isOpen ? (
            <Minus size={12} className="text-[#0A0A0A]" />
          ) : (
            <Plus size={12} className="text-gray-500" />
          )}
        </span>
        <span className="font-semibold text-[#0A0A0A] text-base pr-4">
          {faq.q}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 text-sm leading-relaxed pb-5 pl-10 pr-4">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 px-4 md:px-6 bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-mono mb-3">
            Intrebari frecvente
          </p>
          <h2 className="tracking-tighttext-3xl md:text-4xl font-bold text-[#0A0A0A]">
            Ai intrebari? Avem raspunsuri.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-gray-100 rounded-xl shadow-sm px-4 md:px-8"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
