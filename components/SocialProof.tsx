'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export default function SocialProof() {
  const [count, setCount] = useState(18);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.random() < 0.5 ? -1 : 1;
        const next = prev + delta;
        return Math.min(Math.max(next, 12), 31);
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm rounded-full px-4 py-2 text-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
      </span>
      <Eye size={14} className="text-gray-500" />
      <span className="font-medium text-gray-700">
        <span className="text-[#0A0A0A] font-bold">{count}</span> persoane se
        uita acum
      </span>
    </div>
  );
}
