'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { X, User, Phone, MapPin, Home, Loader2, Banknote, Zap } from 'lucide-react';
import { useOrderModal } from '@/hooks/useOrderModal';
import { orderSchema, OrderFormData } from '@/lib/validations';
import { JUDETE } from '@/lib/types';
import { ttqAddToCart, ttqInitiateCheckout, ttqPlaceAnOrder } from '@/lib/tiktok-pixel';

const PRICE_TIERS = [
  { qty: 1, label: '1 x Ventilator 3-in-1', productPrice: 99, transport: 20, img: '/1bucata.webp' },
  { qty: 2, label: '2 x Ventilator 3-in-1', productPrice: 179, transport: 20, img: '/2bucati.webp' },
  { qty: 3, label: '3 x Ventilator 3-in-1', productPrice: 279, transport: 20, img: '/3bucati.webp' },
];

const PRIORITY_PRICE = 4.99;

function getTier(qty: number) {
  return PRICE_TIERS.find((t) => t.qty === qty) || PRICE_TIERS[0];
}

function IconInput({ icon: Icon, error, children }: { icon: React.ElementType; error?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex overflow-hidden rounded-lg border ${error ? 'border-red-400' : 'border-gray-300'} focus-within:border-[#2563EB] transition-colors`}>
      <span className="flex items-center justify-center w-10 shrink-0 bg-[#EFF6FF]">
        <Icon size={15} className="text-[#2563EB]" />
      </span>
      {children}
    </div>
  );
}

const inputCls = 'flex-1 px-3 py-2.5 text-sm text-gray-800 bg-white placeholder:text-gray-400 focus:outline-none';

export default function OrderModal() {
  const { isOpen, close } = useOrderModal();
  const router = useRouter();
  const [priority, setPriority] = useState(true);

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting }, reset } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { quantity: 1 },
  });

  const quantity = watch('quantity', 1);
  const tier = getTier(quantity);
  const total = tier.productPrice + tier.transport + (priority ? PRIORITY_PRICE : 0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    if (isOpen) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
      ttqAddToCart(tier.productPrice);
      ttqInitiateCheckout(tier.productPrice);
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, close, tier.productPrice]);

  const onSubmit = async (data: OrderFormData) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const finalTotal = getTier(data.quantity).productPrice + getTier(data.quantity).transport + (priority ? PRIORITY_PRICE : 0);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          total_price: finalTotal,
          utm_source: urlParams.get('utm_source') || undefined,
          utm_campaign: urlParams.get('utm_campaign') || undefined,
          ttclid: urlParams.get('ttclid') || sessionStorage.getItem('ttclid') || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || 'Eroare la plasarea comenzii. Incearca din nou.');
        return;
      }
      close();
      reset();
      setPriority(true);
      await ttqPlaceAnOrder(finalTotal, data.customer_phone, json.orderId);
      router.push(`/confirmare?${new URLSearchParams({ name: data.customer_name, qty: data.quantity.toString(), total: finalTotal.toString(), orderId: json.orderId || '' })}`);
    } catch {
      toast.error('Eroare de retea. Verifica conexiunea si incearca din nou.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            onClick={close} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />

          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full md:max-w-md max-h-[94vh] overflow-y-auto"
            style={{ background: '#fff', border: '3px solid #2563EB', borderRadius: '21px 21px 0 0', boxShadow: 'rgba(0,0,0,0.55) 0px 4px 20px' }}
          >
            {/* Mobile handle */}
            <div className="md:hidden flex justify-center pt-3">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
              <div className="flex-1 text-center">
                <h2 className="text-lg font-black text-gray-900 tracking-tight">Finalizeaza comanda</h2>
              </div>
              <button onClick={close} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors shrink-0">
                <X size={17} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-5 pt-4 pb-6 space-y-3">

              {/* QUANTITY CARDS */}
              <div className="space-y-2">
                {PRICE_TIERS.map((t) => {
                  const selected = quantity === t.qty;
                  return (
                    <button key={t.qty} type="button" onClick={() => setValue('quantity', t.qty)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-lg border-2 transition-all text-left"
                      style={{ borderColor: selected ? '#2563EB' : '#D1D5DB', background: selected ? '#EFF6FF' : '#fff' }}>
                      <div className="w-12 h-12 rounded-lg shrink-0 overflow-hidden border border-gray-200">
                        <Image src={t.img} alt={t.label} width={48} height={48} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-sm text-gray-900">{t.label}</p>
                        {t.qty > 1 && (
                          <span className="inline-block mt-0.5 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                            Cel mai bun pret
                          </span>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-extrabold text-base text-gray-900">{t.productPrice} lei</p>
                        <p className="text-xs text-gray-400">+ {t.transport} lei transport</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* FIELDS */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nume <span className="text-red-500">*</span></label>
                <IconInput icon={User} error={!!errors.customer_name}>
                  <input {...register('customer_name')} placeholder="Nume complet" className={inputCls} />
                </IconInput>
                {errors.customer_name && <p className="text-xs text-red-500 mt-0.5">{errors.customer_name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Numar de telefon <span className="text-red-500">*</span></label>
                <IconInput icon={Phone} error={!!errors.customer_phone}>
                  <input {...register('customer_phone')} placeholder="07XXXXXXXX" type="tel" className={inputCls} />
                </IconInput>
                {errors.customer_phone && <p className="text-xs text-red-500 mt-0.5">{errors.customer_phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Judet <span className="text-red-500">*</span></label>
                <IconInput icon={MapPin} error={!!errors.customer_county}>
                  <select {...register('customer_county')} className={`${inputCls} bg-white`}>
                    <option value="">Selecteaza judetul</option>
                    {JUDETE.map((j) => <option key={j} value={j}>{j}</option>)}
                  </select>
                </IconInput>
                {errors.customer_county && <p className="text-xs text-red-500 mt-0.5">{errors.customer_county.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Oras <span className="text-red-500">*</span></label>
                <IconInput icon={MapPin} error={!!errors.customer_city}>
                  <input {...register('customer_city')} placeholder="Oras / Localitate" className={inputCls} />
                </IconInput>
                {errors.customer_city && <p className="text-xs text-red-500 mt-0.5">{errors.customer_city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Adresa <span className="text-red-500">*</span></label>
                <IconInput icon={Home} error={!!errors.customer_address}>
                  <input {...register('customer_address')} placeholder="Strada, nr., bloc, ap." className={inputCls} />
                </IconInput>
                {errors.customer_address && <p className="text-xs text-red-500 mt-0.5">{errors.customer_address.message}</p>}
              </div>

              {/* PRIORITY UPSELL */}
              <div
                className="rounded-xl p-3 cursor-pointer"
                style={{ border: '2px dashed #2563EB', background: priority ? '#EFF6FF' : '#fff' }}
                onClick={() => setPriority(!priority)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border-2 transition-colors ${priority ? 'bg-[#2563EB] border-[#2563EB]' : 'border-gray-300 bg-white'}`}>
                    {priority && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-[#F59E0B]" />
                      <span className="font-bold text-sm text-gray-900">Prioritizeaza comanda mea</span>
                      <span className="ml-auto font-bold text-sm text-[#2563EB]">+{PRIORITY_PRICE} lei</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 ml-0">Comanda ta va fi procesata si expediata inaintea celorlalte comenzi din aceeasi zi.</p>
                  </div>
                </div>
              </div>

              {/* ORDER SUMMARY */}
              <div className="rounded-lg p-3 space-y-1.5 text-sm" style={{ background: '#F9F9F9', border: '1px solid #D3D3D3' }}>
                <div className="flex justify-between">
                  <span className="text-gray-500">Produs ({quantity} buc)</span>
                  <span className="font-medium">{tier.productPrice} lei</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Transport</span>
                  <span className="font-medium">{tier.transport} lei</span>
                </div>
                {priority && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Prioritizare comanda</span>
                    <span className="font-medium">{PRIORITY_PRICE} lei</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-base border-t border-gray-200 pt-2 mt-1">
                  <span>Total</span>
                  <span>{total.toFixed(2)} lei</span>
                </div>
              </div>

              {/* SUBMIT */}
              <button type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-4 font-bold text-base transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 rounded-xl"
                style={{ background: '#2563EB', color: '#fff', boxShadow: '0px 2px 10px rgba(37,99,235,0.45)', border: '2px solid #1D4ED8' }}>
                {isSubmitting ? (
                  <><Loader2 size={18} className="animate-spin" />Se proceseaza...</>
                ) : (
                  <><Banknote size={20} />Plata la livrare - {total.toFixed(2)} lei</>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Platesti cash curierului - Fara card necesar
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
