# PetTrace

System identyfikacji zwierząt domowych oparty na zawieszkach z tagiem NFC i kodem QR oraz aplikacji webowej PWA z routingiem kontekstowym. Wzór do pracy inżynierskiej *Inteligentny Ekosystem Identyfikacji i Zarządzania Aktywnością Zwierząt Domowych*.

Zeskanowanie zawieszki otwiera w przeglądarce adres `/t/<kod>`. Serwer decyduje, co pokazać: znalazca widzi imię zwierzęcia i przycisk „Zadzwoń”, przy zaginionym zwierzęciu — alarm i SMS z lokalizacją, a zalogowany właściciel — szybki zapis karmienia lub spaceru.

Specyfikacja: [`plan/`](plan/00-start.md). Plan przepisywania: [`PLAN_PRZEPISYWANIA.md`](PLAN_PRZEPISYWANIA.md) i [wersja HTML](<plan/PeTrace — plan przepisywania.html>). Wdrożenie na serwer: [`DEPLOY.md`](DEPLOY.md).

## Stack

| Warstwa | Technologie |
|---|---|
| Frontend | React 19, Vite, React Router 7, Tailwind CSS 4, qrcode.react, lucide-react, vite-plugin-pwa |
| Backend | Node.js 22, Express 5, pg (SQL bez ORM), jsonwebtoken, cookie-parser |
| Baza danych | PostgreSQL 17 |
| Wdrożenie | Docker Compose, Caddy (HTTPS, pliki aplikacji, proxy `/api`) |

## Uruchomienie

Wymagania: Docker Desktop, a do pracy nad kodem także Node.js 22.

### Najprościej: cały system w Dockerze

```bash
docker compose up --build
```

Otwórz `http://localhost:8080` i kliknij „Wejdź na konto demo” na stronie logowania. Zatrzymanie: `docker compose down` (z usunięciem danych: `down -v`).

> **Masz bazę ze starej wersji?** Schemat wczytuje się tylko do pustej bazy. Przenieś ją: `docker compose exec -T db psql -U petrace petrace < server/sql/002_pin_login.sql`, albo zacznij od zera przez `docker compose down -v`.

### Praca nad kodem

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

W trzecim terminalu uruchom frontend (Vite przekazuje `/api` do serwera).

```bash
npm install
npm run dev
```

Otwórz adres pokazany przez Vite, zwykle `http://localhost:5173`.

### Polecenia

| Polecenie | Gdzie | Co robi |
|---|---|---|
| `npm run dev` | korzeń | frontend (wymaga API) |
| `npm run build` | korzeń | wersja produkcyjna |
| `npm run lint` | korzeń | ESLint |
| `npm run dev` | `server/` | API z przeładowaniem po zmianach |
| `npm run db:reset` | `server/` | **kasuje dane**: czysta baza z danymi przykładowymi |
| `node scripts/generate-icons.mjs` | korzeń | ikony PWA w `public/` |

## Dane przykładowe

| Co | Wartość |
|---|---|
| Konto demo | `maciej@pettrace.pl`, PIN `123456` (Maciej, telefon `+48 600 123 456`) |
| Luna, pies | zawieszka `LUNA-7K2Q` — widok znalazcy / szybki zapis |
| Mruczek, kot | zawieszka `MRCZ-4P9D` — tryb zaginięcia |
| Nieaktywna zawieszka | `XXXX-0000` |

Żeby zobaczyć widok znalazcy, otwórz adres zawieszki w oknie incognito.

## Trasy

| Adres | Strona | Logowanie |
|---|---|---|
| `/` | strona główna | — |
| `/login`, `/rejestracja` | logowanie i nowe konto (e-mail + PIN) | — |
| `/t/:tagId` | strona zawieszki: `inactive` / `owner` / `lost` / `found` | — |
| `/t/:tagId/lokalizacja` | SMS z lokalizacją do opiekuna | — |
| `/panel` | otwiera ostatnio oglądane zwierzę | tak |
| `/zwierzeta/nowe`, `/zwierzeta/:id/edytuj` | formularz zwierzęcia | tak |
| `/zwierzeta/:id` | ekran zwierzęcia, tryb zaginięcia, aktywność | tak |
| `/zwierzeta/:id/tag` | zawieszka, QR, historia skanowań | tak |
| `/ustawienia` | imię, telefon, wylogowanie | tak |

## Struktura

```
├── src/                  frontend
│   ├── api/              jedyne miejsce, które zna adresy serwera
│   ├── components/       ui/, layout/, pets/, finder/, tags/, landing/
│   ├── pages/            public/, finder/, owner/, dev/
│   └── hooks/ context/ lib/
├── server/               API (Express + PostgreSQL)
│   ├── src/              routes/, middleware/, services/
│   └── sql/              schemat i dane przykładowe
├── plan/                 specyfikacja projektu
├── docker-compose.yml    cały system (db, api, caddy)
├── docker-compose.dev.yml  sama baza do pracy lokalnej
├── Dockerfile, Caddyfile frontend + serwer wejściowy
└── DEPLOY.md             wdrożenie na VPS
```
