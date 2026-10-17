-- Schemat bazy PetTrace (PostgreSQL 13+).
-- W Dockerze plik uruchamia się sam przy pierwszym starcie pustej bazy
-- (katalog /docker-entrypoint-initdb.d). Lokalnie: `npm run db:reset` w folderze server/.
--
-- Identyfikatory to UUID z wbudowanej funkcji gen_random_uuid(): nie da się ich zgadnąć
-- ani policzyć (w przeciwieństwie do 1, 2, 3…), więc adres /zwierzeta/<id> nic nie zdradza.

CREATE TABLE users (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text NOT NULL UNIQUE,
  name       text NOT NULL DEFAULT '',
  phone      text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Jednorazowe linki logowania. Trzymamy tylko skrót SHA-256 tokenu: ktoś, kto wykradnie
-- kopię bazy, nie zaloguje się, bo ze skrótu nie da się odtworzyć linku.
CREATE TABLE login_tokens (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at    timestamptz
);

CREATE TABLE pets (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id      uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  name          text NOT NULL CHECK (length(trim(name)) > 0),
  species       text NOT NULL DEFAULT 'dog' CHECK (species IN ('dog', 'cat', 'other')),
  breed         text NOT NULL DEFAULT '',
  birth_date    date,
  weight_kg     numeric(5, 2) CHECK (weight_kg > 0),
  medical_notes text NOT NULL DEFAULT '',
  is_lost       boolean NOT NULL DEFAULT false,
  lost_message  text NOT NULL DEFAULT '',
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX pets_owner_id_idx ON pets (owner_id);

-- Kod zawieszki jest kluczem głównym: to on jest zapisany na tagu NFC i w kodzie QR.
-- pet_id = NULL oznacza zawieszkę nieprzypisaną (widok „Ten tag nie jest aktywny”).
CREATE TABLE tags (
  code       text PRIMARY KEY CHECK (code ~ '^[A-Z0-9]{4}-[A-Z0-9]{4}$'),
  pet_id     uuid REFERENCES pets (id) ON DELETE SET NULL,
  is_active  boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- „Jedno zwierzę ma jeden aktywny tag”. Indeks częściowy (WHERE is_active) pilnuje tego
-- po stronie bazy, a jednocześnie pozwala zachować stare, wyłączone zawieszki razem z ich
-- historią skanowań, gdy właściciel wygeneruje nowy kod.
CREATE UNIQUE INDEX tags_one_active_per_pet ON tags (pet_id) WHERE is_active;

-- Audyt: każde otwarcie strony zawieszki. Bez lokalizacji i bez adresu IP (minimalizacja danych).
CREATE TABLE tag_scans (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_code   text NOT NULL REFERENCES tags (code) ON DELETE CASCADE,
  scanned_at timestamptz NOT NULL DEFAULT now(),
  user_agent text NOT NULL DEFAULT '',
  by_owner   boolean NOT NULL DEFAULT false
);

CREATE INDEX tag_scans_tag_code_scanned_at_idx ON tag_scans (tag_code, scanned_at DESC);

-- type: feeding (karmienie) albo walk (spacer); source: quick_tap (po skanie) albo manual (formularz).
CREATE TABLE activities (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id       uuid NOT NULL REFERENCES pets (id) ON DELETE CASCADE,
  type         text NOT NULL CHECK (type IN ('feeding', 'walk')),
  occurred_at  timestamptz NOT NULL DEFAULT now(),
  duration_min integer CHECK (duration_min > 0),
  distance_m   integer CHECK (distance_m >= 0),
  source       text NOT NULL DEFAULT 'manual' CHECK (source IN ('quick_tap', 'manual'))
);

CREATE INDEX activities_pet_id_occurred_at_idx ON activities (pet_id, occurred_at DESC);

-- Priorytet 2: tymczasowe linki dla weterynarza. Tabela jest już w schemacie, żeby
-- dodanie funkcji nie wymagało migracji.
CREATE TABLE vet_shares (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id     uuid NOT NULL REFERENCES pets (id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
