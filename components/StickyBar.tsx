'use client';

import { motion } from 'framer-motion';
import { useOrderModal } from '@/hooks/useOrderModal';
import { ShoppingBag } from 'lucide-react';

export default function StickyBar() {
  const { open, isOpen } = useOrderModal();

  if (isOpen) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-100 shadow-2xl px-4 py-3"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 truncate">
            Ventilator Portabil 3-in-1
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#111827]">99 Lei</span>
            <span className="text-xs text-gray-400 line-through">149 Lei</span>
          </div>
        </div>
        <button onClick={open} className="btn-primary flex items-center gap-2 px-5 py-3 text-sm flex-shrink-0">
          <ShoppingBag size={16} />
          Comanda Acum
        </button>
      </div>
    </motion.div>
  );
}
