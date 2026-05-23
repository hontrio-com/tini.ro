import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-10 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Image src="/logo.png" alt="tini.ro" width={100} height={25} className="h-7 w-auto mb-3 brightness-0 invert" />
            <p className="text-gray-500 text-sm leading-relaxed">
              Produse de calitate pentru confortul tau. Livrare rapida in toata Romania.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-3 uppercase tracking-wide">
              Informatii legale
            </p>
            <ul className="space-y-2">
              <li><Link href="/termeni-si-conditii" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Termeni si conditii</Link></li>
              <li><Link href="/politica-de-confidentialitate" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Politica de confidentialitate</Link></li>
              <li><Link href="/politica-de-retur" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Politica de retur</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-3 uppercase tracking-wide">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Telefon: 0757 941 553</li>
              <li>Luni - Vineri: 08:00 - 17:00</li>
            </ul>
          </div>
        </div>

        {/* ANPC logos */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center md:text-left">
            © {new Date().getFullYear()} tini.ro. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://sal.anpc.ro" target="_blank" rel="noopener noreferrer">
              <Image src="/SAL.png" alt="SAL ANPC" width={120} height={40} className="h-10 w-auto" />
            </a>
            <a href="https://sol.anpc.ro" target="_blank" rel="noopener noreferrer">
              <Image src="/SOL.png" alt="SOL ANPC" width={120} height={40} className="h-10 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
