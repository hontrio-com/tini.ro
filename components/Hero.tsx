'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useOrderModal } from '@/hooks/useOrderModal';
import CountdownTimer from './CountdownTimer';
import SocialProof from './SocialProof';

const INITIAL_STOCK = 23;

const SLIDES = [
  { id: 1, src: '/ImaginePrincipala.webp', label: 'Imagine principala' },
  { id: 2, src: '/Imagine2.webp', label: 'Detaliu produs' },
  { id: 3, src: '/Imagine3.webp', label: 'Detaliu produs' },
  { id: 4, src: '/Imagine4.webp', label: 'Detaliu produs' },
  { id: 5, src: '/Imagine5.webp', label: 'Detaliu produs' },
];

export default function Hero() {
  const { open } = useOrderModal();
  const [stock, setStock] = useState(INITIAL_STOCK);
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    const stored = sessionStorage.getItem('stock_count');
    if (stored) setStock(parseInt(stored));
    const interval = setInterval(() => {
      setStock((prev) => {
        if (prev <= 3) return prev;
        const next = prev - 1;
        sessionStorage.setItem('stock_count', next.toString());
        return next;
      });
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const goTo = useCallback((idx: number) => {
    setActiveSlide((idx + SLIDES.length) % SLIDES.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) goTo(activeSlide + (dx > 0 ? 1 : -1));
  };

  const Gallery = ({ mobile }: { mobile: boolean }) => (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gray-50 shadow-lg"
      style={{ aspectRatio: '1/1' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {mobile ? (
        // Mobile: sliding strip
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div key={slide.id} className="relative w-full h-full flex-shrink-0">
              <Image src={slide.src} alt={slide.label} fill className="object-cover" priority={slide.id === 1} />
            </div>
          ))}
        </div>
      ) : (
        // Desktop: cross-fade
        SLIDES.map((slide, i) => (
          <div key={slide.id} className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === activeSlide ? 1 : 0 }}>
            <Image src={slide.src} alt={slide.label} fill className="object-cover" priority={slide.id === 1} />
          </div>
        ))
      )}

      {/* Arrows */}
      <button onClick={(e) => { e.stopPropagation(); goTo(activeSlide - 1); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md z-10 hover:bg-white transition-colors">
        <ChevronLeft size={16} className="text-gray-700" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); goTo(activeSlide + 1); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md z-10 hover:bg-white transition-colors">
        <ChevronRight size={16} className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === activeSlide ? 'w-6 h-2 bg-[#2563EB]' : 'w-2 h-2 bg-white/60'}`} />
        ))}
      </div>

      {/* Slide label */}
      <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full z-10">
        {activeSlide + 1} / {SLIDES.length}
      </div>

      {/* Discount badge */}
      <div className="absolute top-3 right-3 bg-[#F59E0B] text-[#0A0A0A] text-xs font-black px-3 py-1.5 rounded-full shadow-md z-10">
        -33%
      </div>
    </div>
  );

  const Content = ({ mobile }: { mobile: boolean }) => (
    <div className={`flex flex-col ${mobile ? 'gap-3' : 'gap-4'}`}>
      {/* Rating */}
      <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 w-fit">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        <span className="text-[11px] font-semibold text-amber-800">4.8/5 din 847 recenzii</span>
      </div>

      {/* Title */}
      <h1 className={`tracking-tight font-black text-[#111827] leading-tight ${mobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'}`}>
        Ventilator Portabil cu Racire prin Apa, Umidificator Integrat si Lumini LED in 7 Culori
      </h1>

      {/* Subtitle - shorter on mobile */}
      {mobile ? (
        <p className="text-gray-500 text-sm leading-relaxed">
          Racorire prin evaporare, umidificator si LED RGB. 3 viteze, rezervor 600ml, USB.
        </p>
      ) : (
        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
          Racorire reala prin evaporare, umidificator activ si iluminare ambientala RGB. 3 viteze, rezervor 600ml, alimentare USB. Tot ce ai nevoie pentru vara.
        </p>
      )}

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className={`tracking-tight font-black text-[#111827] ${mobile ? 'text-3xl' : 'text-4xl md:text-5xl'}`}>99 Lei</span>
        <span className="text-lg text-gray-400 line-through">149 Lei</span>
        <span className="bg-[#F59E0B] text-[#0A0A0A] text-xs font-black px-2.5 py-1 rounded-full">-33%</span>
      </div>

      {/* Stock */}
      <motion.div className="flex items-center gap-2"
        animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <span className="text-sm font-semibold text-red-600">Doar {stock} bucati ramase in stoc</span>
      </motion.div>

      {/* CTA */}
      <button onClick={open} className="btn-primary w-full py-4 text-base">
        Plaseaza Comanda - Plata la Livrare
      </button>

      {/* Trust */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: ShieldCheck, text: 'Plata la livrare' },
          { icon: Truck, text: 'Livrare 24-48h' },
          { icon: RotateCcw, text: 'Retur 14 zile' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex flex-col items-center gap-1 text-center">
            <Icon size={18} className="text-[#2563EB]" />
            <span className="text-[11px] text-gray-500 font-medium leading-tight">{text}</span>
          </div>
        ))}
      </div>

      {/* Countdown */}
      <div className="border-t border-gray-100 pt-3">
        <CountdownTimer />
      </div>

      {!mobile && <SocialProof />}
      {mobile && (
        <div className="border-t border-gray-100 pt-2">
          <SocialProof />
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-[#FAFAFA]">
      {/* MOBILE */}
      <div className="lg:hidden" style={{ paddingTop: '100px' }}>
        <div className="px-4 pb-2">
          <Gallery mobile />
        </div>
        <div className="px-4 pt-4 pb-24">
          <Content mobile />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <Gallery mobile={false} />
            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-3">
              {SLIDES.map((slide, i) => (
                <button key={slide.id} onClick={() => goTo(i)}
                  className={`relative flex-1 rounded-lg overflow-hidden border-2 transition-all ${i === activeSlide ? 'border-[#2563EB]' : 'border-transparent opacity-60 hover:opacity-80'}`}
                  style={{ aspectRatio: '1/1' }}>
                  <Image src={slide.src} alt={slide.label} fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Content mobile={false} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
