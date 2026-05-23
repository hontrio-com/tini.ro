'use client';

import { useCountdown } from '@/hooks/useCountdown';

interface Props {
  className?: string;
  dark?: boolean;
}

function TimeBlock({ value, label, dark }: { value: number; label: string; dark?: boolean }) {
  const formatted = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <span className={`font-mono text-xl md:text-2xl font-bold w-12 md:w-14 h-12 md:h-14 flex items-center justify-center rounded-sm ${dark ? 'bg-white/10 text-white' : 'bg-[#2563EB] text-white'}`}>
        {formatted}
      </span>
      <span className={`text-[10px] uppercase tracking-widest mt-1 font-medium ${dark ? 'text-blue-200' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ className = '', dark = false }: Props) {
  const { hours, minutes, seconds } = useCountdown();

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <p className={`text-xs uppercase tracking-widest font-medium ${dark ? 'text-blue-200' : 'text-gray-500'}`}>
        Oferta expira in
      </p>
      <div className="flex items-start gap-2">
        <TimeBlock value={hours} label="Ore" dark={dark} />
        <span className={`text-2xl font-bold mt-2 ${dark ? 'text-white' : 'text-[#2563EB]'}`}>:</span>
        <TimeBlock value={minutes} label="Min" dark={dark} />
        <span className={`text-2xl font-bold mt-2 ${dark ? 'text-white' : 'text-[#2563EB]'}`}>:</span>
        <TimeBlock value={seconds} label="Sec" dark={dark} />
      </div>
    </div>
  );
}
