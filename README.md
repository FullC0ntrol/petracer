# PetTrace — prototyp

System identyfikacji zwierząt domowych oparty na zawieszkach z tagiem NFC i kodem QR oraz aplikacji webowej PWA z routingiem kontekstowym. Prototyp do pracy inżynierskiej *Inteligentny Ekosystem Identyfikacji i Zarządzania Aktywnością Zwierząt Domowych*.

Zeskanowanie zawieszki otwiera w przeglądarce adres `/t/<kod>`. Serwer decyduje, co pokazać: znalazca widzi imię zwierzęcia i przycisk „Zadzwoń”, przy zaginionym zwierzęciu — alarm i SMS z lokalizacją, a zalogowany właściciel — szybki zapis karmienia lub spaceru.

Specyfikacja: [`plan/`](plan/00-start.md). Plan przepisywania aplikacji etap po etapie: [`PLAN_PRZEPISYWANIA.md`](PLAN_PRZEPISYWANIA.md). Wdrożenie na serwer: [`DEPLOY.md`](DEPLOY.md).

## Stack

| Warstwa | Technologie |
|---|---|
| Frontend | React 19, Vite, React Router 7, Tailwind CSS 4, qrcode.react, lucide-react, vite-plugin-pwa |
| Backend | Node.js 22, Express 5, pg (SQL bez ORM), jsonwebtoken, cookie-parser, nodemailer |
| Baza danych | PostgreSQL 17 |
| Wdrożenie | Docker Compose, Caddy (HTTPS, pliki aplikacji, proxy `/api`) |

## Uruchomienie

Wymagania: Node.js 22, Docker Desktop (dla bazy i wersji kontenerowej).

### 1. Sam frontend na danych przykładowych (bez serwera)

Najszybszy sposób na obejrzenie aplikacji. Dane są w `localStorage` przeglądarki.

```bash
npm install
npm run dev
```

Otwórz `http://localhost:5173`. Logowanie: e-mail `maciej@pettrace.pl` → przycisk „[DEV] Symuluj kliknięcie w link”. Panel **DEV** w lewym dolnym rogu przełącza logowanie, tryb zaginięcia i otwiera zawieszki.

### 2. Frontend z prawdziwym API i bazą

Uruchom bazę PostgreSQL w Dockerze (port 5434).

```bash
docker compose -f docker-compose.dev.yml up -d
```

W drugim terminalu uruchom API (port 3000). Przy pierwszym starcie wczyta dane przykładowe.

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

W trzecim terminalu uruchom frontend w trybie `http` (Vite przekazuje `/api` do serwera).

```bash
npm run dev:http
```

Otwórz `http://localhost:5173`. Link logowania pojawia się w konsoli serwera, a w trybie deweloperskim także pod przyciskiem „[DEV] Symuluj kliknięcie w link”. Dane przykładowe przywraca `npm run db:reset` w folderze `server/`.

### 3. Cały system w Dockerze (jak na serwerze)

```bash
docker compose up --build
```

Otwórz `http://localhost:8080`. Serwer działa w trybie produkcyjnym, więc link logowania jest tylko w logach: `docker compose logs api`. Zatrzymanie: `docker compose down` (z usunięciem danych: `down -v`).

### Polecenia

| Polecenie | Gdzie | Co robi |
|---|---|---|
| `npm run dev` | korzeń | frontend, tryb mock |
| `npm run dev:http` | korzeń | frontend, tryb http (wymaga API) |
| `npm run build` / `build:http` | korzeń | wersja produkcyjna w trybie mock / http |
| `npm run lint` | korzeń | ESLint dla frontendu i backendu |
| `npm run dev` | `server/` | API z przeładowaniem po zmianach |
| `npm run db:reset` | `server/` | czysta baza z danymi przykładowymi |
| `node scripts/generate-icons.mjs` | korzeń | ikony PWA w `public/` |

## Dane przykładowe

| Co | Wartość |
|---|---|
| Konto | `maciej@pettrace.pl` (Maciej, telefon `+48 600 123 456`) |
| Luna, pies | zawieszka `LUNA-7K2Q` — widok znalazcy / szybki zapis |
| Mruczek, kot | zawieszka `MRCZ-4P9D` — tryb zaginięcia |
| Nieaktywna zawieszka | `XXXX-0000` |

## Trasy

| Adres | Strona | Logowanie |
|---|---|---|
| `/` | strona główna | — |
| `/login`, `/login/sprawdz-poczte`, `/auth/verify` | logowanie magic link | — |
| `/t/:tagId` | strona zawieszki: `inactive` / `owner` / `lost` / `found` | — |
| `/t/:tagId/lokalizacja` | SMS z lokalizacją do opiekuna | — |
| `/panel` | zwierzęta i ostatnie skanowania | tak |
| `/zwierzeta/nowe`, `/zwierzeta/:id/edytuj` | formularz zwierzęcia | tak |
| `/zwierzeta/:id` | profil, tryb zaginięcia | tak |
| `/zwierzeta/:id/tag` | zawieszka, QR, historia skanowań | tak |
| `/ustawienia` | imię, telefon, wylogowanie | tak |
| `/spacery`, `/spacery/nowy`, `/zwierzeta/:id/vet-share`, `/vet/:token` | priorytet 2 — szkice | — |
| `/harmonogram` | priorytet 3 — szkic | tak |

## Struktura

```
├── src/                  frontend
│   ├── api/              fasady + mock/ (localStorage) + http/ (fetch)
│   ├── components/       ui/, layout/, pets/, finder/, tags/
│   ├── pages/            public/, finder/, owner/, vet/, dev/
│   ├── hooks/ context/ lib/ mocks/ dev/
├── server/               API (Express + PostgreSQL)
│   ├── src/              routes/, middleware/, services/
│   └── sql/              schemat i dane przykładowe
├── plan/                 specyfikacja projektu
├── docker-compose.yml    cały system (db, api, caddy)
├── docker-compose.dev.yml  sama baza do pracy lokalnej
├── Dockerfile, Caddyfile frontend + serwer wejściowy
└── DEPLOY.md             wdrożenie na VPS
```
