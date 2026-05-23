import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Retur | tini.ro',
  robots: { index: false, follow: false },
};

export default function PoliticaDeRetur() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-sm text-[#2563EB] hover:underline mb-8 inline-block">
          ← Înapoi la magazin
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Politica de Retur</h1>
        <p className="text-sm text-gray-400 mb-10">Ultima actualizare: mai 2025</p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-700">

          <section>
            <p>
              SC VOID SFT GAMES SRL respectă integral drepturile consumatorilor prevăzute de <strong>OUG nr. 34/2014</strong> privind drepturile consumatorilor în cadrul contractelor încheiate cu profesioniștii, care transpune Directiva 2011/83/UE. Prezenta politică descrie în detaliu procedura de retur și condițiile de rambursare.
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Dreptul de retragere din contract</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
              <p className="font-semibold text-blue-900">
                Aveți dreptul de a vă retrage din contract în termen de 14 zile calendaristice, fără a invoca niciun motiv.
              </p>
            </div>
            <p>
              Conform <strong>art. 9 din OUG nr. 34/2014</strong>, termenul de retragere expiră după 14 zile calendaristice din ziua în care dumneavoastră sau un terț (altul decât transportatorul) indicat de dumneavoastră intră în posesia fizică a produsului.
            </p>
            <p className="mt-2">
              Pentru contractele care acoperă mai multe produse comandate printr-o singură comandă și livrate separat, termenul de 14 zile curge din ziua în care intrați în posesia fizică a ultimului produs.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Cum se exercită dreptul de retragere</h2>
            <p>
              Pentru a exercita dreptul de retragere, trebuie să ne informați cu privire la decizia de retragere printr-o declarație neechivocă (de ex. o scrisoare trimisă prin poștă sau un mesaj telefonic). Puteți utiliza modelul de formular de mai jos, dar utilizarea acestuia nu este obligatorie.
            </p>
            <p className="mt-2">Ne puteți contacta prin:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Telefon:</strong> 0757 941 553 (Luni – Vineri, 08:00 – 17:00)</li>
              <li><strong>Scrisoare:</strong> SC VOID SFT GAMES SRL, Mătăsari, Str. Progresului Nr. 2, Bl. A29, Sc. 2, Et. 2, Ap. 10, jud. Gorj</li>
            </ul>
            <p className="mt-2">
              Este suficient să transmiteți comunicarea privind exercitarea dreptului de retragere înainte de expirarea perioadei de retragere.
            </p>
          </section>

          {/* 3 - Formular */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Model formular de retragere</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
              <p className="font-semibold mb-2">FORMULAR DE RETRAGERE (conform Anexei I – OUG nr. 34/2014)</p>
              <p className="italic text-gray-500 mb-3">Completați și returnați acest formular numai dacă doriți să vă retrageți din contract.</p>
              <p>Către:</p>
              <p>SC VOID SFT GAMES SRL</p>
              <p>Mătăsari, Str. Progresului, Nr. 2, Bl. A29, Sc. 2, Et. 2, Ap. 10, jud. Gorj</p>
              <p>Telefon: 0757 941 553</p>
              <br />
              <p>Subsemnatul/Subsemnata, ________________________________________,</p>
              <p>cu domiciliul în: _______________________________________________,</p>
              <p>vă informez prin prezenta că mă retrag din contractul de vânzare-cumpărare privind</p>
              <p>produsul: ________________________________________,</p>
              <p>comandat la data de: _________________,</p>
              <p>primit la data de: _________________,</p>
              <br />
              <p>Numărul comenzii (dacă îl cunoașteți): _________________</p>
              <br />
              <p>Data: _________________</p>
              <p>Semnătura (numai în cazul în care formularul este transmis pe hârtie): _______________</p>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Obligațiile consumatorului la returnarea produsului</h2>
            <p>
              Dacă vă retrageți din contract, trebuie să returnați produsul fără întârzieri nejustificate și în orice caz în termen de cel mult <strong>14 zile calendaristice</strong> de la data la care ați comunicat decizia de retragere.
            </p>
            <p className="mt-2">
              Termenul este respectat dacă returnați produsul înainte de expirarea celor 14 zile.
            </p>
            <p className="mt-2 font-semibold">Condiții pentru returnarea produsului:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Produsul trebuie returnat în starea inițială, fără urme de utilizare excesivă;</li>
              <li>Produsul trebuie ambalat corespunzător pentru transport, preferabil în ambalajul original;</li>
              <li>Produsul trebuie să fie complet (toate accesoriile și documentele incluse inițial);</li>
              <li>Produsul nu trebuie să prezinte deteriorări produse de consumator.</li>
            </ul>
            <p className="mt-2">
              <strong>Atenție:</strong> Consumatorul este responsabil numai pentru diminuarea valorii produselor care rezultă din manipularea lor, alta decât cea necesară pentru stabilirea naturii, caracteristicilor și funcționării produselor (art. 14 alin. 2 din OUG nr. 34/2014).
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Costul returnării</h2>
            <p>
              Costul direct al returnării produsului este suportat de consumator, conform art. 13 alin. 2 din OUG nr. 34/2014. Vă rugăm să utilizați un serviciu de curierat cu confirmare de livrare.
            </p>
            <p className="mt-2">
              Adresa de returnare: SC VOID SFT GAMES SRL, Mătăsari, Str. Progresului, Nr. 2, Bl. A29, Sc. 2, Et. 2, Ap. 10, jud. Gorj. Vă rugăm să ne contactați la <strong>0757 941 553</strong> înainte de a expedia coletul.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Rambursarea plăților</h2>
            <p>
              SC VOID SFT GAMES SRL va rambursa toate plățile primite, inclusiv costul livrării inițiale (cu excepția costurilor suplimentare determinate de alegerea unui alt tip de livrare decât livrarea standard), în termen de maxim <strong>14 zile calendaristice</strong> de la data la care suntem informați cu privire la decizia de retragere.
            </p>
            <p className="mt-2">
              Cu toate acestea, ne rezervăm dreptul de a amâna rambursarea până la data la care primim produsul returnat sau până când furnizați dovada că ați expediat produsul, în funcție de care dintre acestea survine mai devreme.
            </p>
            <p className="mt-2">
              <strong>Modalitatea de rambursare:</strong> Deoarece plata s-a efectuat la livrare (numerar), rambursarea se va realiza prin <strong>transfer bancar</strong> în contul indicat de dumneavoastră. Vă rugăm să furnizați IBAN-ul la momentul notificării returului. Nu se aplică niciun comision pentru rambursare.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Excepții de la dreptul de retragere</h2>
            <p>
              Conform art. 16 din OUG nr. 34/2014, dreptul de retragere nu se aplică pentru:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Produse confecționate după specificațiile consumatorului sau personalizate;</li>
              <li>Produse care se deteriorează rapid sau au termen de valabilitate scurt;</li>
              <li>Produse sigilate care nu pot fi returnate din motive de protecție a sănătății sau igienice, dacă au fost desigilate după livrare;</li>
              <li>Produse care, după livrare, sunt inseparabil amestecate cu alte produse.</li>
            </ul>
            <p className="mt-2">
              <strong>Notă:</strong> Produsele comercializate pe tini.ro (ventilatoare portabile) nu intră în niciuna dintre categoriile de excepție de mai sus, dreptul de retragere de 14 zile aplicându-se integral.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Produse neconforme sau defecte</h2>
            <p>
              Dreptul de retragere (14 zile) este distinct de dreptul la conformitate. În cazul în care produsul prezintă un defect de fabricație sau o lipsă de conformitate la momentul livrării, consumatorul poate solicita:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Înlocuirea produsului</strong> cu unul identic sau echivalent;</li>
              <li><strong>Repararea produsului</strong>;</li>
              <li><strong>Reducerea prețului</strong> sau <strong>rezilierea contractului</strong>, dacă celelalte remedii nu sunt posibile.</li>
            </ul>
            <p className="mt-2">
              Pentru sesizarea unui defect, contactați-ne la <strong>0757 941 553</strong>. Costul transportului aferent returnării produsului defect este suportat de comerciant.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Soluționarea litigiilor</h2>
            <p>
              Dacă nu sunteți mulțumit de soluția oferită, puteți apela la:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>
                <strong>ANPC:</strong> tel. 021.9551, <a href="https://www.anpc.ro" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">www.anpc.ro</a>
              </li>
              <li>
                <strong>Platforma SOL (UE):</strong> <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">ec.europa.eu/consumers/odr</a>
              </li>
            </ul>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Contact</h2>
            <ul className="list-none pl-0 space-y-1">
              <li><strong>SC VOID SFT GAMES SRL</strong></li>
              <li>Mătăsari, Str. Progresului, Nr. 2, Bl. A29, Sc. 2, Et. 2, Ap. 10, jud. Gorj</li>
              <li>Telefon: 0757 941 553</li>
              <li>Program: Luni – Vineri, 08:00 – 17:00</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
