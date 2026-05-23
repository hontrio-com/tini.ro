-- ============================================================
-- MONLINE — Migratie Supabase
-- Ruleaza acest script in Supabase SQL Editor
-- ============================================================

-- TABLE: orders
CREATE TABLE IF NOT EXISTS orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT now(),
  customer_name   TEXT NOT NULL,
  customer_phone  TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city   TEXT NOT NULL,
  customer_county TEXT NOT NULL,
  quantity        INTEGER NOT NULL DEFAULT 1,
  total_price     NUMERIC(10,2) NOT NULL,
  status          TEXT DEFAULT 'noua' CHECK (status IN ('noua', 'confirmata', 'in_livrare', 'livrata', 'anulata')),
  notes           TEXT,
  ip_address      TEXT,
  utm_source      TEXT,
  utm_campaign    TEXT
);

-- TABLE: reviews
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ DEFAULT now(),
  name        TEXT NOT NULL,
  city        TEXT NOT NULL,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text        TEXT NOT NULL,
  verified    BOOLEAN DEFAULT true,
  avatar_seed TEXT
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- orders: INSERT public, rest service_role only
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can insert orders"
  ON orders FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "service_role full access orders"
  ON orders FOR ALL TO service_role USING (true) WITH CHECK (true);

-- reviews: SELECT public, rest service_role only
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can read reviews"
  ON reviews FOR SELECT TO anon USING (true);

CREATE POLICY "service_role full access reviews"
  ON reviews FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================
-- SEED: 12 recenzii realiste in romana
-- ============================================================

INSERT INTO reviews (name, city, rating, text, avatar_seed) VALUES
(
  'Maria Ionescu', 'Bucuresti', 5,
  'Am cumparat ventilatorul acum doua saptamani si sunt absolut incantata. Camera devine racuroasa in cateva minute si lumina LED creeaza o atmosfera minunata seara. Sotul meu l-a luat imediat si el pentru birou!',
  'maria'
),
(
  'Alexandru Popa', 'Cluj-Napoca', 5,
  'Sincer, nu ma asteptam sa fie atat de silentios. L-am pus langa pat si doarme toata familia fara sa il auda. Rezervorul de 600ml tine toata noaptea la viteza medie. Recomand cu toata inima!',
  'alex'
),
(
  'Ioana Gheorghe', 'Timisoara', 5,
  'Calitate exceptionala pentru pretul acesta. Am comparat cu altele de trei ori mai scumpe din magazin si acesta il bate clar. Umidificatorul chiar functioneaza, nu este doar decorativ ca la altele. Comanda a ajuns in 24 de ore!',
  'ioana'
),
(
  'Mihai Dumitrescu', 'Iasi', 4,
  'Foarte multumit de produs. L-am luat pentru copil in camera si functioneaza excelent. Singura sugestie ar fi un rezervor putin mai mare, dar pentru 49 de lei este un deal excelent. Livrarea a fost rapida si ambalajul ingrijit.',
  'mihai'
),
(
  'Elena Constantin', 'Brasov', 5,
  'Am folosit ventilatoare clasice toata viata, dar acesta este cu totul altceva. Umidificarea aerului face o diferenta enorma, mai ales dimineata. Culorile LED sunt superbe, le schimb dupa stare. Il recomand tuturor prietenilor!',
  'elena'
),
(
  'Andrei Stanescu', 'Constanta', 5,
  'Traiesc la mare si vara este insuportabila. Acest ventilator a schimbat tot! Cu cuburi de gheata in rezervor, camera se racoreste vizibil. Design-ul este elegant, arata premium pe orice birou sau noptiera.',
  'andrei'
),
(
  'Cristina Munteanu', 'Galati', 4,
  'L-am comandat cu scepticism, dar am fost placut surprinsa. Functioneaza exact cum promite, cele 3 viteze sunt bine calibrate. Lumina albastra ma ajuta sa ma relaxez seara. Il recomand in special pentru dormitor!',
  'cristina'
),
(
  'Bogdan Radu', 'Craiova', 5,
  'Al treilea ventilator pe care il cumpar in aceasta vara si singurul care m-a impresionat cu adevarat. Raportul calitate-pret este imbatabil. Functia de umidificare este ideala si pentru cei cu probleme respiratorii. Bravo!',
  'bogdan'
),
(
  'Ana-Maria Florescu', 'Ploiesti', 5,
  'L-am luat pentru nepotica mea de 4 ani si adora luminile colorate. Este silentios cat e ziua de lunga, nu am niciun deranj. Il umplu dimineata si tine toata ziua la viteza mica. Super produs!',
  'ana'
),
(
  'Vlad Petrescu', 'Sibiu', 5,
  'Lucrez de acasa si biroul devine un cuptor vara. De cand am acest ventilator, productivitatea mea a crescut vizibil. Il recomand tuturor celor care lucreaza remote. USB-ul se conecteaza direct la laptop, fara prize ocupate!',
  'vlad'
),
(
  'Roxana Iliescu', 'Oradea', 4,
  'Design modern, functioneaza impecabil, livrare rapida. Singurul mic minus este ca nu vine cu instructiuni in romana, dar functionarea este intuitiva. Lumina LED alba este perfecta pentru birou. Il recomand!',
  'roxana'
),
(
  'Daniel Stoica', 'Pitesti', 5,
  'Am cumparat doua bucati, unul pentru sufragerie si unul pentru dormitor. Ambele functioneaza perfect dupa 3 saptamani de utilizare intensa. Rezervorul se umple usor si se curata simplu. Cea mai buna achizitie a verii!',
  'daniel'
);
