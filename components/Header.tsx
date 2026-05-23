'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-9 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.png" alt="tini.ro" width={120} height={30} priority className="h-8 w-auto" />
        </div>

      </div>
    </header>
  );
}
