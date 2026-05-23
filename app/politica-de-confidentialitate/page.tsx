import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate | tini.ro',
  robots: { index: false, follow: false },
};

export default function PoliticaDeConfidentialitate() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-sm text-[#2563EB] hover:underline mb-8 inline-block">
          ← Înapoi la magazin
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Politica de Confidențialitate</h1>
        <p className="text-sm text-gray-400 mb-10">Ultima actualizare: mai 2025</p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-700">

          <section>
            <p>
              SC VOID SFT GAMES SRL, în calitate de operator de date cu caracter personal, se angajează să protejeze confidențialitatea și securitatea datelor dumneavoastră personale. Prezenta Politică de Confidențialitate descrie modul în care colectăm, utilizăm și protejăm datele cu caracter personal, în conformitate cu <strong>Regulamentul (UE) 679/2016 privind protecția datelor cu caracter personal (GDPR)</strong> și <strong>Legea nr. 190/2018</strong> privind măsuri de punere în aplicare a GDPR în România.
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Identitatea operatorului</h2>
            <ul className="space-y-1 list-none pl-0">
              <li><strong>Operator:</strong> SC VOID SFT GAMES SRL</li>
              <li><strong>CUI:</strong> RO 43474393</li>
              <li><strong>Nr. înmatriculare:</strong> J18/1054/2020</li>
              <li><strong>Sediu:</strong> Mătăsari, Str. Progresului, Nr. 2, Bl. A29, Sc. 2, Et. 2, Ap. 10, jud. Gorj</li>
              <li><strong>Telefon:</strong> 0757 941 553</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Categoriile de date cu caracter personal colectate</h2>
            <p>În cadrul procesului de comandă, colectăm următoarele date:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Date de identificare:</strong> nume și prenume</li>
              <li><strong>Date de contact:</strong> număr de telefon</li>
              <li><strong>Date de livrare:</strong> județ, localitate, adresă completă</li>
              <li><strong>Date despre comandă:</strong> produse achiziționate, cantitate, valoare totală, observații opționale</li>
              <li><strong>Date tehnice:</strong> adresă IP (pentru prevenirea fraudei și limitarea comenzilor abuzive), parametri UTM dacă accesați site-ul printr-o campanie publicitară</li>
            </ul>
            <p className="mt-2">
              <strong>Nu colectăm</strong> date sensibile (date de sănătate, date financiare bancare, CNP, date biometrice). Plata se efectuează exclusiv la livrare, prin numerar, fără prelucrarea datelor de card bancar.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Scopurile și temeiul juridic al prelucrării</h2>

            <div className="space-y-4">
              <div>
                <p className="font-semibold">3.1 Executarea contractului (art. 6 alin. 1 lit. b GDPR)</p>
                <p className="mt-1">Datele de identificare, contact și livrare sunt prelucrate pentru: procesarea și confirmarea comenzii, expedierea coletului prin curier, contactarea dumneavoastră în legătură cu comanda (confirmare, livrare, probleme).</p>
              </div>
              <div>
                <p className="font-semibold">3.2 Obligații legale (art. 6 alin. 1 lit. c GDPR)</p>
                <p className="mt-1">Datele de facturare sunt prelucrate pentru respectarea obligațiilor contabile și fiscale prevăzute de Legea nr. 82/1991 (Legea contabilității) și Codul Fiscal.</p>
              </div>
              <div>
                <p className="font-semibold">3.3 Interesul legitim al operatorului (art. 6 alin. 1 lit. f GDPR)</p>
                <p className="mt-1">Adresa IP este procesată în scop de securitate (prevenirea fraudei, limitarea comenzilor abuzive), reprezentând un interes legitim al operatorului care nu prevalează asupra drepturilor și libertăților fundamentale ale persoanelor vizate.</p>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Destinatarii datelor</h2>
            <p>Datele dumneavoastră pot fi transmise exclusiv următorilor destinatari, strict necesar pentru executarea contractului:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Firmele de curierat</strong> (ex: Fan Courier, DPD, Cargus, Sameday) – pentru livrarea coletului; primesc: nume, telefon, adresă de livrare.</li>
              <li><strong>Furnizorul de servicii de hosting și infrastructură tehnică</strong> – găzduiește baza de date a comenzilor; este obligat contractual la confidențialitate și conformitate GDPR.</li>
              <li><strong>Supabase Inc.</strong> – platformă de baze de date (SUA), utilizată pentru stocarea comenzilor, cu clauze contractuale standard UE (Standard Contractual Clauses) care asigură un nivel adecvat de protecție conform art. 46 GDPR.</li>
              <li><strong>Autorități publice</strong> – în cazul în care legea ne obligă (ex: ANAF, instanțe judecătorești).</li>
            </ul>
            <p className="mt-2">
              Nu vindem, nu închiriem și nu comercializăm datele dumneavoastră personale către terți în scopuri de marketing.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Transferuri internaționale de date</h2>
            <p>
              Datele sunt stocate pe serverele Supabase Inc. (SUA). Transferul se realizează cu garanții adecvate prin Clauzele Contractuale Standard aprobate de Comisia Europeană (art. 46 alin. 2 lit. c GDPR). Puteți solicita o copie a acestor garanții contactându-ne la datele din secțiunea 1.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Durata stocării datelor</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Date de comandă:</strong> păstrate timp de <strong>5 ani</strong> de la data comenzii, conform obligațiilor contabile și fiscale (Legea nr. 82/1991).</li>
              <li><strong>Date tehnice (IP):</strong> păstrate maxim <strong>90 de zile</strong>, după care sunt șterse automat.</li>
              <li>La expirarea termenelor, datele sunt șterse sau anonimizate ireversibil.</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Drepturile dumneavoastră</h2>
            <p>Conform GDPR, beneficiați de următoarele drepturi:</p>
            <ul className="mt-2 list-disc pl-5 space-y-2">
              <li><strong>Dreptul de acces (art. 15 GDPR)</strong> – puteți solicita confirmarea dacă vă prelucrăm datele și o copie a acestora.</li>
              <li><strong>Dreptul la rectificare (art. 16 GDPR)</strong> – puteți solicita corectarea datelor inexacte sau incomplete.</li>
              <li><strong>Dreptul la ștergere / „dreptul de a fi uitat" (art. 17 GDPR)</strong> – puteți solicita ștergerea datelor, în măsura în care nu există obligații legale care să ne impună păstrarea acestora.</li>
              <li><strong>Dreptul la restricționarea prelucrării (art. 18 GDPR)</strong> – puteți solicita limitarea prelucrării datelor în anumite circumstanțe.</li>
              <li><strong>Dreptul la portabilitatea datelor (art. 20 GDPR)</strong> – puteți solicita datele furnizate într-un format structurat, utilizat în mod curent și citibil automat.</li>
              <li><strong>Dreptul la opoziție (art. 21 GDPR)</strong> – vă puteți opune prelucrării bazate pe interesul legitim al operatorului.</li>
              <li><strong>Dreptul de a nu face obiectul unei decizii automate (art. 22 GDPR)</strong> – nu aplicăm profilare sau decizii automate cu efecte juridice.</li>
            </ul>
            <p className="mt-3">
              Pentru exercitarea acestor drepturi, ne contactați la <strong>0757 941 553</strong> (Luni – Vineri, 08:00 – 17:00). Vom răspunde solicitării în termen de maxim 30 de zile calendaristice.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Securitatea datelor</h2>
            <p>
              SC VOID SFT GAMES SRL implementează măsuri tehnice și organizatorice adecvate pentru protecția datelor împotriva accesului neautorizat, pierderii, distrugerii sau divulgării: conexiuni HTTPS/TLS, acces restricționat la baza de date, autentificare pentru panoul de administrare, stocare pe servere cu certificări de securitate.
            </p>
            <p className="mt-2">
              În caz de incident de securitate care prezintă risc ridicat pentru drepturile și libertățile dumneavoastră, vă vom notifica în termen de 72 de ore, conform art. 34 GDPR.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Cookie-uri</h2>
            <p>
              Site-ul tini.ro utilizează un număr minim de cookie-uri, strict necesare funcționării:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Cookie-uri de sesiune</strong> – stochează temporar starea comenzii (cantitate selectată, preferințe). Se șterg la închiderea browserului.</li>
              <li><strong>Cookie-uri de stocare locală (localStorage/sessionStorage)</strong> – salvează numărătoarea de stoc și timer-ul de ofertă, exclusiv în browserul dumneavoastră.</li>
            </ul>
            <p className="mt-2">
              Nu utilizăm cookie-uri de tracking terță parte (ex: Facebook Pixel, Google Analytics) fără consimțământul dumneavoastră explicit. Dacă în viitor vom integra astfel de servicii, vom actualiza această politică și vom solicita consimțământul.
            </p>
            <p className="mt-2">
              Puteți dezactiva cookie-urile din setările browserului, însă acest lucru poate afecta funcționarea corectă a site-ului.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Modificări ale politicii</h2>
            <p>
              Această Politică de Confidențialitate poate fi actualizată periodic. Orice modificare substanțială va fi comunicată vizibil pe site. Continuarea utilizării site-ului după publicarea modificărilor constituie acceptarea noii versiuni.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">11. Dreptul de a depune plângere la autoritatea de supraveghere</h2>
            <p>
              Dacă considerați că prelucrarea datelor dumneavoastră personale încalcă GDPR, aveți dreptul de a depune o plângere la:
            </p>
            <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold">ANSPDCP – Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal</p>
              <p>B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, București</p>
              <p>Telefon: +40.318.059.211</p>
              <p>
                <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">www.dataprotection.ro</a>
              </p>
            </div>
            <p className="mt-2">
              Vă încurajăm să ne contactați în primul rând pe noi pentru a rezolva orice problemă amiabil înainte de a formula o plângere.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
