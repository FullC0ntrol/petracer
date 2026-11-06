# PetTrace — brief projektu (wzór: frontend + backend)

> Ten plik to stały kontekst dla Claude Code. Czytaj go na początku każdej sesji i trzymaj się go.
> **Źródłem prawdy jest specyfikacja w folderze `plan/`** (`00-start.md` … `09-testy.md`).
> Gdy ten plik albo kod przeczy `plan/`, wygrywa `plan/`.
> Jeśli coś jest niejasne lub sprzeczne — zapytaj, zanim zgadniesz. Nie zmieniaj plików w `plan/` bez zgody autora.

## 1. Czym jest projekt

Praca inżynierska: **„Inteligentny Ekosystem Identyfikacji i Zarządzania Aktywnością Zwierząt Domowych”**.
System identyfikacji zwierząt oparty na zawieszkach z tagiem **NFC** i kodem **QR**, zintegrowany z aplikacją
webową **PWA** z **routingiem kontekstowym**.

Zawieszka przechowuje adres `https://petracker.pl/t/<kod>`. Telefon znalazcy otwiera go w przeglądarce — bez
instalowania aplikacji. Ten sam adres pokazuje różne widoki zależnie od kontekstu, a **wariant wybiera serwer** (D6).

Zakres i priorytety: `plan/01-zakres.md`. **Priorytet 1 jest zrobiony.** Priorytet 2 (mapa przy lokalizacji, zdjęcie,
wymiana kodu zawieszki) — tylko po akceptacji autora. Kierunki rozwoju (m.in. spacery, harmonogram, weterynarz,
wysyłka maili) — nie implementujemy.

Ten projekt jest **docelową wersją i wzorem**: autor przepisuje go samodzielnie w repozytorium
`PeTracker-FinalVersion` według `PLAN_PRZEPISYWANIA.md`. Kod ma być **czytelny i edukacyjny**.
Plan w HTML zawiera cały kod z wyjaśnieniami. Po każdej zmianie kodu uruchom `node plan/przewodnik/build.mjs`: wstawi nowy kod i przerwie pracę, gdy wyjaśnienie w `plan/przewodnik/*.txt` przestanie pasować albo nowy plik nie będzie miał opisu.
Starsze wersje z trybem mock i magic linkiem są tylko w historii gita (decyzje D21–D24).

## 2. Stack

Frontend (korzeń repozytorium):
- **Vite + React 19** (JavaScript, JSX — bez TypeScriptu)
- **Tailwind CSS v4** (`@tailwindcss/vite`, tokeny w `@theme` w `src/index.css`)
- **React Router v7** (`createBrowserRouter`, zagnieżdżone layouty, importy z `react-router`)
- **qrcode.react** (kod QR zawieszki), **lucide-react** (ikony), **@fontsource** (fonty lokalnie)
- **vite-plugin-pwa** — manifest, service worker

Backend (`server/`):
- **Node.js 22 + Express 5**, **pg** (SQL pisany ręcznie, bez ORM — D15), **jsonwebtoken**, **cookie-parser**, **dotenv**
- **PostgreSQL 17** w Dockerze

Wdrożenie: **Docker Compose** (`db`, `api`, `caddy`) i **Caddy** (HTTPS, frontend, proxy `/api`).

Nie dodawaj innych bibliotek bez uzasadnienia. Żadnych bibliotek komponentów UI (MUI, shadcn itp.) ani ORM-ów.

## 3. Kierunek wizualny

Charakter: **ciepły, spokojny, godny zaufania** — jak dobra przychodnia weterynaryjna połączona z porządną
aplikacją sportową. Mobile-first (od 375 px), panel właściciela w jednej wyśrodkowanej kolumnie na każdej szerokości.

### Kolory (tokeny w `@theme`)
| Token | Wartość | Użycie |
|---|---|---|
| `paper` | `#FAF7F2` | tło aplikacji (ciepła biel) |
| `surface` | `#FFFFFF` | karty |
| `ink` | `#1B2420` | tekst główny |
| `ink-muted` | `#5E6A64` | tekst pomocniczy |
| `line` | `#E7E1D6` | obramowania, separatory |
| `pine` (primary) | `#1F5E4B` | główny kolor marki, nawigacja, aktywne stany |
| `pine-soft` | `#E3EFE9` | tła wyróżnień primary |
| `ember` (akcent/CTA) | `#E0703A` | najważniejsze akcje, wyróżnienia |
| `ember-soft` | `#FBE9DE` | tła akcentów |
| `alert` | `#D2362B` | tryb zaginięcia, błędy krytyczne |
| `alert-soft` | `#FCE6E3` | tła alarmowe |
| `sky` | `#3A7CA5` | informacje |
| `amber` | `#C98A12` | ostrzeżenia |

Kontrast tekstu minimum WCAG AA. Tylko tokeny — domyślna paleta Tailwinda jest wyłączona.

### Typografia i kształty
- Nagłówki: **Bricolage Grotesque**; tekst: **Plus Jakarta Sans**; liczby `tabular-nums`; kody zawieszek monospace.
- Karty `rounded-2xl`, przyciski i inputy `rounded-xl`, badge `rounded-full`, ciepłe subtelne cienie.
- Jedna główna akcja na ekran, stany hover/active/focus-visible, przejścia 150–250 ms, `prefers-reduced-motion`.
- Zdjęć nie ma (P2): awatar to ikona gatunku (pies, kot, łapka), a kolor tła zależy od imienia.

### Trzy „tonacje” interfejsu
1. **Właściciel** — spokojny, informacyjny, gęstszy układ danych.
2. **Znalazca** — maksymalnie prosty: duży awatar, imię, 1–2 ogromne przyciski (min. 56 px), zero nawigacji i logowania.
3. **Tryb zaginięcia** — prostota znalazcy z czerwonym, jednoznacznym nagłówkiem („Zaginione zwierzę — pomóż mi
   wrócić do domu”) i wyeksponowanym SMS-em z lokalizacją.

Teksty w UI **po polsku**, nazwy w kodzie **po angielsku**. Nazwa aplikacji w interfejsie: **PetTrace**
(`plan/` używa „PeTrace” — rozbieżność do decyzji autora).

## 4. Trasy

Pełna lista: `plan/03-widoki-i-trasy.md`.

```
PUBLICZNE (PublicLayout)
/  /login  /rejestracja  /dev/ui (tylko dev)  *

ZNALAZCA (FinderLayout)
/t/:tagId               routing kontekstowy — wariant z GET /api/tags/:code:
                          1. inactive  kod nie istnieje / tag nieaktywny / bez zwierzęcia
                          2. owner     skanuje zalogowany właściciel → szybki zapis: Karmienie, Spacer
                          3. lost      zwierzę zaginione → alarm, komunikat, numer, SMS z lokalizacją
                          4. found     reszta → imię, uwagi medyczne, „Zadzwoń” (numer niewidoczny jako tekst, D5)
/t/:tagId/lokalizacja   pozycja GPS → link sms: z linkiem do Google Maps; lokalizacja NIE trafia do bazy (D4)

WŁAŚCICIEL (RequireAuth → OwnerLayout)
/panel                      otwiera ostatnio oglądane zwierzę albo pusty stan
/zwierzeta/nowe             formularz jednoetapowy
/zwierzeta/:id              ekran zwierzęcia: Dane / Zdrowie / Aktywność (?tab=), tryb zaginięcia z Modal (D10), arkusz „Akcje”
/zwierzeta/:id/edytuj
/zwierzeta/:id/tag          „Utwórz zawieszkę” (D9), QR, adres NFC, historia skanowań
/ustawienia                 imię, telefon dla znalazcy, wylogowanie
```

## 5. Struktura

```
src/
  api/              request (fetch) + auth, pets, tags, activities
  components/
    ui/  layout/    wspólne klocki i ramy stron
    pets/  finder/  tags/  landing/
  pages/  public/ finder/ owner/ dev/
  hooks/            useAuth, useAsync, useGeolocation
  context/          AuthContext, AuthProvider
  lib/              cn, format, sms, lastPet
server/
  src/              index, app, config, db, errors, mappers, validation, seed
    routes/         auth, me, pets, tags, activities
    middleware/     requireAuth, rateLimit, errorHandler
    services/       pin, session, tagCodes, pets
  sql/              001_init.sql (schemat), seed.sql (dane przykładowe), 002_pin_login.sql (migracja starych baz)
  scripts/          db-reset.js
scripts/            generate-icons.mjs (ikony PWA)
plan/               specyfikacja (źródło prawdy)
```

## 6. Dane i API

- Strony importują dane **tylko** z `src/api/`. Tam jest jedyne miejsce, które zna adresy serwera (D22).
- Kształty odpowiedzi (camelCase): `pet`, `scan`, `activity`, warianty `resolveTag` — opis w komentarzach `src/api/*`
  i w `server/src/mappers.js`.
- Lista endpointów: `plan/04-architektura.md`. `GET /api/auth/me` zwraca `{ user: null }` zamiast 401 (brak błędu w konsoli).
- Bezpieczeństwo: PIN to 6 cyfr, w bazie skrót `scrypt` z solą, porównanie `timingSafeEqual`; limit 5 prób na e-mail
  i 20 na IP w 15 minut; jeden komunikat dla złego e-maila i PIN-u; sesja JWT 30 dni w ciasteczku `httpOnly`,
  `SameSite=Lax`, `Secure` w produkcji; `findOwnPet` w każdej trasie `/pets/:id/…`; kody zawieszek 8 znaków
  `XXXX-XXXX` bez `0/O/1/I/L`. Ograniczenia PIN-u: D21.
- Konto demo: `GET/POST /api/auth/demo` (przycisk na `/login`), tylko na `maciej@pettrace.pl`, włączane
  `DEMO_LOGIN=true` (domyślnie tylko na localhost). Ten sam adres z publicznym PIN-em `123456`.
- Każdy ekran obsługuje stany: ładowanie, pusty, błąd, sukces.

Dane przykładowe: Maciej (`maciej@pettrace.pl`, telefon ustawiony), **Luna** (pies, `LUNA-7K2Q`), **Mruczek** (kot,
`MRCZ-4P9D`, w trybie zaginięcia), `XXXX-0000` (nieaktywny), kilka skanowań i aktywności. Reset: `npm run db:reset` w `server/`.

## 7. PWA i wdrożenie

`vite-plugin-pwa` (manifest z kolorami tokenów, ikony z `scripts/generate-icons.mjs`, service worker bez cache `/api`).
Wdrożenie: `docker-compose.yml` + `Caddyfile` + `.env` (wzór `.env.example`), instrukcja `DEPLOY.md`.
Lokalnie: `docker compose up --build` → `http://localhost:8080`.

## 8. Standardy kodu

- Mniej kodu jest lepsze niż więcej: autor uczy się na tym projekcie i musi obronić każdą linię.
- Komponenty funkcyjne, małe i jednoodpowiedzialne; logika w hookach.
- Semantyczny HTML, etykiety w formularzach, `aria-*` tam, gdzie potrzebne, widoczny focus.
- **Komentarze po polsku** przy nieoczywistych decyzjach. Bez komentowania oczywistości.
- SQL zawsze z parametrami (`$1`), nigdy sklejany z danymi.
- Bez martwego kodu i bez `console.log` (wyjątek: komunikaty startu serwera).
- Przed commitem: `npm run lint` i `npm run build` bez błędów, w konsoli przeglądarki bez błędów.
- Commity po polsku w trybie rozkazującym („Dodaj…”, „Popraw…”).
