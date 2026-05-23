import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termeni și Condiții | tini.ro',
  robots: { index: false, follow: false },
};

export default function TermeniSiConditii() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-sm text-[#2563EB] hover:underline mb-8 inline-block">
          ← Înapoi la magazin
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Termeni și Condiții</h1>
        <p className="text-sm text-gray-400 mb-10">Ultima actualizare: mai 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed text-gray-700">

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Datele comerciantului</h2>
            <p>
              Prezentul site <strong>tini.ro</strong> este deținut și operat de:
            </p>
            <ul className="mt-2 space-y-1 list-none pl-0">
              <li><strong>Denumire:</strong> SC VOID SFT GAMES SRL</li>
              <li><strong>CUI:</strong> RO 43474393</li>
              <li><strong>Nr. înmatriculare:</strong> J18/1054/2020</li>
              <li><strong>Sediu social:</strong> Mătăsari, Str. Progresului, Nr. 2, Bl. A29, Sc. 2, Et. 2, Ap. 10, județul Gorj</li>
              <li><strong>Telefon:</strong> 0757 941 553 (Luni – Vineri, 08:00 – 17:00)</li>
            </ul>
            <p className="mt-2">
              SC VOID SFT GAMES SRL este înregistrată în Registrul Comerțului și plătitoare de TVA conform legislației române în vigoare.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Definiții</h2>
            <ul className="space-y-1 list-disc pl-5">
              <li><strong>„Comerciant"</strong> – SC VOID SFT GAMES SRL, cu datele de mai sus.</li>
              <li><strong>„Consumator"</strong> – orice persoană fizică ce acționează în afara activității sale profesionale sau comerciale, care plasează o comandă pe site.</li>
              <li><strong>„Contract la distanță"</strong> – contractul încheiat între comerciant și consumator în cadrul unui sistem de vânzare la distanță organizat, fără prezența fizică simultană a părților, conform OUG nr. 34/2014.</li>
              <li><strong>„Produs"</strong> – Ventilatorul Portabil 3-în-1 comercializat pe site.</li>
              <li><strong>„Site"</strong> – platforma web disponibilă la adresa tini.ro.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Obiectul contractului</h2>
            <p>
              Prezentele Termeni și Condiții reglementează relația contractuală dintre SC VOID SFT GAMES SRL și consumatorii care achiziționează produse prin intermediul site-ului tini.ro, în conformitate cu:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>OUG nr. 34/2014 privind drepturile consumatorilor în cadrul contractelor încheiate cu profesioniștii;</li>
              <li>Legea nr. 365/2002 privind comerțul electronic;</li>
              <li>OG nr. 21/1992 privind protecția consumatorilor;</li>
              <li>Regulamentul UE nr. 679/2016 (GDPR);</li>
              <li>Codul Civil al României.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Produsele și prețurile</h2>
            <p>
              Caracteristicile principale ale produselor sunt descrise pe paginile de produs. Ne rezervăm dreptul de a modifica specificațiile tehnice fără notificare prealabilă, cu condiția că modificările să nu afecteze substanțial funcționalitatea produsului.
            </p>
            <p className="mt-2">
              Toate prețurile afișate pe site sunt exprimate în Lei (RON) și includ TVA (19%), conform legislației fiscale române. Costul de livrare este afișat separat în procesul de comandă și este de <strong>20 Lei</strong> per comandă.
            </p>
            <p className="mt-2">
              Comerciantul depune toate eforturile pentru a afișa prețuri corecte. În cazul unei erori de preț evidente, comenzile plasate la prețuri greșite pot fi anulate, consumatorul fiind notificat și rambursat integral.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Procesul de comandă și încheierea contractului</h2>
            <p>Contractul la distanță se consideră încheiat în momentul în care comerciantul confirmă comanda prin SMS sau mesaj electronic la datele de contact furnizate de consumator.</p>
            <p className="mt-2">Etapele procesului de comandă:</p>
            <ol className="mt-2 list-decimal pl-5 space-y-1">
              <li>Consumatorul selectează produsul și cantitatea dorită;</li>
              <li>Completează datele de livrare (nume, telefon, județ, localitate, adresă);</li>
              <li>Confirmă comanda prin apăsarea butonului „Plată la livrare";</li>
              <li>Comerciantul procesează comanda și contactează consumatorul pentru confirmare dacă este necesar;</li>
              <li>Produsul este expediat prin curier la adresa indicată.</li>
            </ol>
            <p className="mt-2">
              Prin plasarea comenzii, consumatorul confirmă că a citit și acceptat prezentele Termeni și Condiții, Politica de Confidențialitate și Politica de Retur.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Modalități de plată</h2>
            <p>
              SC VOID SFT GAMES SRL oferă exclusiv plata la livrare (ramburs). Consumatorul achită contravaloarea produsului și costurile de livrare direct curierului, în numerar, la momentul livrării coletului.
            </p>
            <p className="mt-2">
              Nu se percepe niciun cost suplimentar pentru această modalitate de plată față de prețul indicat la momentul plasării comenzii.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Livrarea produselor</h2>
            <p>
              Livrarea se realizează prin curier rapid în toată România. Termenul estimat de livrare este de <strong>24 – 48 de ore lucrătoare</strong> de la confirmarea și procesarea comenzii.
            </p>
            <p className="mt-2">
              Termenele de livrare sunt orientative și pot varia din cauze independente de voința comerciantului (greve, condiții meteo extreme, forță majoră). Comerciantul nu este responsabil pentru întârzierile cauzate de firma de curierat sau de informațiile incorecte furnizate de consumator.
            </p>
            <p className="mt-2">
              La recepționarea coletului, consumatorul este obligat să verifice integritatea fizică a ambalajului în prezența curierului. Orice deteriorare vizibilă trebuie menționată în procesul verbal de livrare.
            </p>
            <p className="mt-2">
              Riscul pierderii sau deteriorării produsului se transferă consumatorului la momentul preluării fizice a coletului.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Dreptul de retragere (retur)</h2>
            <p>
              În conformitate cu <strong>art. 9 din OUG nr. 34/2014</strong>, consumatorul are dreptul de a se retrage din contract în termen de <strong>14 zile calendaristice</strong> de la data la care intră în posesia fizică a produsului, fără a invoca niciun motiv și fără a suporta alte costuri decât cele prevăzute la art. 13 alin. (2) și art. 14 din OUG nr. 34/2014.
            </p>
            <p className="mt-2">
              <strong>Cum se exercită dreptul de retragere:</strong> Consumatorul poate notifica comerciantul prin:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Telefon: 0757 941 553</li>
              <li>Utilizând formularul de retragere de mai jos (sau din Politica de Retur)</li>
            </ul>
            <p className="mt-2">
              <strong>Returnarea produsului:</strong> După notificarea retragerii, consumatorul are la dispoziție <strong>maximum 14 zile calendaristice</strong> pentru a returna produsul. Produsul trebuie returnat în starea în care a fost recepționat, în ambalajul original, complet și fără urme de utilizare excesivă.
            </p>
            <p className="mt-2">
              <strong>Costul returnării:</strong> Costul direct al returnării produsului este suportat de consumator.
            </p>
            <p className="mt-2">
              <strong>Rambursarea:</strong> SC VOID SFT GAMES SRL va rambursa toate plățile primite (inclusiv costul de livrare inițial, dar nu mai mult decât tipul de livrare standard) în termen de maximum <strong>14 zile calendaristice</strong> de la data la care comerciantul este informat cu privire la decizia de retragere sau de la data primirii produsului returnat, oricare survine mai târziu.
            </p>
            <p className="mt-2">
              Rambursarea se face prin același mijloc de plată utilizat la achiziție (în cazul plății la livrare, prin transfer bancar sau alt mijloc agreat de consumator).
            </p>
          </section>

          {/* 9 - Formular */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Model formular de retragere</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
              <p className="font-semibold mb-2">FORMULAR DE RETRAGERE (Anexa I – OUG nr. 34/2014)</p>
              <p className="italic text-gray-500 mb-3">Completați și returnați acest formular numai dacă doriți să vă retrageți din contract.</p>
              <p>Către:</p>
              <p>SC VOID SFT GAMES SRL, Mătăsari, Str. Progresului Nr. 2, Bl. A29, Sc. 2, Et. 2, Ap. 10, jud. Gorj</p>
              <p>Telefon: 0757 941 553</p>
              <br />
              <p>Subsemnatul/Subsemnata, ________________________________________,</p>
              <p>adresă: _______________________________________________,</p>
              <p>vă informez prin prezenta că mă retrag din contractul de vânzare-cumpărare a produsului:</p>
              <p>________________________________________,</p>
              <p>comandat la data de _________________ / primit la data de _________________,</p>
              <br />
              <p>Data: _________________</p>
              <p>Semnătura (numai în cazul în care formularul este notificat pe hârtie): _______________</p>
            </div>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Conformitatea produselor</h2>
            <p>
              Comerciantul răspunde față de consumator pentru orice lipsă de conformitate existentă la momentul livrării produsului, conform <strong>Legii nr. 449/2003</strong> privind vânzarea produselor și garanțiile asociate acestora, cu modificările și completările ulterioare.
            </p>
            <p className="mt-2">
              În cazul unui defect de conformitate, consumatorul are dreptul să solicite, în ordine: remedierea sau înlocuirea produsului, reducerea prețului sau rezilierea contractului, conform legislației în vigoare.
            </p>
            <p className="mt-2">
              Defectele cauzate de utilizarea necorespunzătoare, deteriorarea mecanică accidentală, neglijența sau modificările neautorizate ale produsului nu sunt acoperite de drepturile de conformitate.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">11. Limitarea răspunderii</h2>
            <p>
              SC VOID SFT GAMES SRL nu poate fi ținută responsabilă pentru: daune indirecte sau consecvente, întreruperi ale serviciului cauzate de factori externi, utilizarea necorespunzătoare a produselor sau forța majoră. Răspunderea totală a comerciantului față de consumator este limitată la valoarea comenzii afectate.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">12. Proprietatea intelectuală</h2>
            <p>
              Toate elementele de conținut ale site-ului tini.ro (texte, imagini, logo-uri, grafice, cod sursă) sunt proprietatea SC VOID SFT GAMES SRL sau sunt utilizate cu permisiunea titularilor și sunt protejate de legislația privind drepturile de autor. Reproducerea fără acordul scris al comerciantului este interzisă.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">13. Soluționarea litigiilor</h2>
            <p>
              În cazul unui litigiu, consumatorul poate contacta comerciantul la numărul <strong>0757 941 553</strong> (Luni – Vineri, 08:00 – 17:00) pentru soluționare amiabilă.
            </p>
            <p className="mt-2">
              Dacă soluționarea amiabilă nu este posibilă, consumatorul poate apela la:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>
                <strong>ANPC (Autoritatea Națională pentru Protecția Consumatorilor)</strong> – tel. 021.9551, <a href="https://www.anpc.ro" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">www.anpc.ro</a>
              </li>
              <li>
                <strong>Platforma SOL (Soluționarea Online a Litigiilor)</strong> – pusă la dispoziție de Comisia Europeană: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">ec.europa.eu/consumers/odr</a>
              </li>
              <li>
                <strong>Instanțele judecătorești competente</strong> – conform dreptului comun.
              </li>
            </ul>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">14. Legea aplicabilă</h2>
            <p>
              Prezentul contract este guvernat de legislația română în vigoare. Orice litigiu care nu poate fi soluționat pe cale amiabilă va fi dedus spre soluționare instanțelor judecătorești competente de pe raza județului Gorj, fără a aduce atingere drepturilor consumatorilor prevăzute de legislația de protecție a consumatorilor.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">15. Modificarea termenilor</h2>
            <p>
              SC VOID SFT GAMES SRL își rezervă dreptul de a modifica prezentele Termeni și Condiții în orice moment, modificările intrând în vigoare de la data publicării pe site. Comenzile plasate anterior modificărilor rămân guvernate de termenii valabili la momentul plasării comenzii.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
