# PetTrace — brief projektu (prototyp: frontend + backend)

> Ten plik to stały kontekst dla Claude Code. Czytaj go na początku każdej sesji i trzymaj się go.
> **Źródłem prawdy jest specyfikacja w folderze `plan/`** (`00-start.md` … `09-testy.md`; w repozytorium
> autora ten folder nazywa się `docs/`). Gdy ten plik albo kod przeczy `plan/`, wygrywa `plan/`.
> Jeśli coś jest niejasne lub sprzeczne — zapytaj, zanim zgadniesz. Nie zmieniaj plików w `plan/` bez zgody autora.

## 1. Czym jest projekt

Praca inżynierska: **„Inteligentny Ekosystem Identyfikacji i Zarządzania Aktywnością Zwierząt Domowych”**.
System identyfikacji zwierząt oparty na zawieszkach z tagiem **NFC** i kodem **QR**, zintegrowany z aplikacją
webową **PWA** z **routingiem kontekstowym**.

Zawieszka przechowuje adres `https://petracker.pl/t/<kod>`. Telefon znalazcy otwiera go w przeglądarce — bez
instalowania aplikacji. Ten sam adres pokazuje różne widoki zależnie od kontekstu, a **wariant wybiera serwer** (D6).

Zakres i priorytety: `plan/01-zakres.md`. **Priorytet 1 jest zrobiony.** Priorytet 2 (weterynarz, ręczne spacery,
mapa przy lokalizacji, zdjęcie) — tylko po akceptacji autora. Priorytet 3 i kierunki rozwoju — nie implementujemy.

Ten prototyp jest **wzorem**: autor przepisuje aplikację samodzielnie w osobnym repozytorium według
`PLAN_PRZEPISYWANIA.md`. Kod ma być **czytelny i edukacyjny**.

## 2. Stack

Frontend (korzeń repozytorium):
- **Vite + React 19** (JavaScript, JSX — bez TypeScriptu)
- **Tailwind CSS v4** (`@tailwindcss/vite`, tokeny w `@theme` w `src/index.css`)
- **React Router v7** (`createBrowserRouter`, zagnieżdżone layouty, importy z `react-router`)
- **qrcode.react** (kod QR zawieszki), **lucide-react** (ikony), **@fontsource** (fonty lokalnie)
- **vite-plugin-pwa** — manifest, service worker
- **leaflet / react-leaflet** — zainstalowane na priorytet 2 (mapa przy wysyłaniu lokalizacji), dziś nieużywane

Backend (`server/`):
- **Node.js 22 + Express 5**, **pg** (SQL pisany ręcznie, bez ORM — D15), **jsonwebtoken**, **cookie-parser**,
  **nodemailer**, **dotenv**
- **PostgreSQL 17** w Dockerze

Wdrożenie: **Docker Compose** (`db`, `api`, `caddy`) i **Caddy** (HTTPS, frontend, proxy `/api`).

Nie dodawaj innych bibliotek bez uzasadnienia. Żadnych bibliotek komponentów UI (MUI, shadcn itp.) ani ORM-ów.

## 3. Kierunek wizualny

Charakter: **ciepły, spokojny, godny zaufania** — jak dobra przychodnia weterynaryjna połączona z porządną
aplikacją sportową. Mobile-first (od 375 px), na desktopie treść w kolumnie / siatce, panel właściciela z boczną nawigacją.

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
- Zdjęć nie ma (P2): awatar z inicjałem na tle w kolorze zależnym od gatunku.

### Trzy „tonacje” interfejsu
1. **Właściciel** — spokojny, informacyjny, gęstszy układ danych.
2. **Znalazca** — maksymalnie prosty: duży awatar, imię, 1–2 ogromne przyciski (min. 56 px), zero nawigacji i logowania.
3. **Tryb zaginięcia** — prostota znalazcy z czerwonym, jednoznacznym nagłówkiem („Zaginione zwierzę — pomóż mi
   wrócić do domu”) i wyeksponowanym SMS-em z lokalizacją.

Teksty w UI **po polsku**, nazwy w kodzie **po angielsku**. Nazwa aplikacji w interfejsie: **PetTrace**
(`plan/` używa „PeTrace” — rozbieżność do decyzji autora; logo i `index.html` są zamrożone).

## 4. Trasy

Pełna lista: `plan/03-widoki-i-trasy.md`.

```
PUBLICZNE (PublicLayout)
/  /login  /login/sprawdz-poczte  /auth/verify?token=…&next=…  /dev/ui (tylko dev)  *

ZNALAZCA (FinderLayout)
/t/:tagId               routing kontekstowy — wariant z GET /api/tags/:code:
                          1. inactive  kod nie istnieje / tag nieaktywny / bez zwierzęcia
                          2. owner     skanuje zalogowany właściciel → szybki zapis: Karmienie, Spacer
                          3. lost      zwierzę zaginione → alarm, komunikat, numer, SMS z lokalizacją
                          4. found     reszta → imię, uwagi medyczne, „Zadzwoń” (numer niewidoczny jako tekst, D5)
/t/:tagId/lokalizacja   pozycja GPS → link sms: z linkiem do Google Maps; lokalizacja NIE trafia do bazy (D4)

WETERYNARZ (VetLayout)  /vet/:shareToken — P2, szkic

WŁAŚCICIEL (RequireAuth → OwnerLayout)
/panel                      zwierzęta + ostatnie skanowania
/zwierzeta/nowe             formularz jednoetapowy
/zwierzeta/:id              profil: Dane / Zdrowie / Aktywność (?tab=), przełącznik trybu zaginięcia z Modal (D10)
/zwierzeta/:id/edytuj
/zwierzeta/:id/tag          „Utwórz zawieszkę” (D9), QR, adres NFC, historia skanowań, „Nowy kod”
/zwierzeta/:id/vet-share    P2, szkic
/spacery  /spacery/nowy     P2, szkice (ręczny wpis; śledzenia GPS nie ma — D11)
/harmonogram                P3, szkic na stałe (jest w zamrożonej nawigacji)
/ustawienia                 imię, telefon dla znalazcy, wylogowanie
```

Nie ma (i nie dodawaj): `/t/:tagId/wyslano`, `/zwierzeta/:id/zaginiecie`, `/spacery/:id`, mapy zgłoszeń, `recharts`.

## 5. Struktura

```
src/
  api/              fasady (auth, pets, tags, activities) + mode.js + errors.js
    mock/           implementacja na localStorage (udaje serwer)
    http/           implementacja fetch do /api
  mocks/            seed.js (zamrożony) + db.js (przekłada seed na model z bazy)
  components/
    ui/  layout/    zamrożone (wolno dodawać NOWE pliki, np. Notice, ErrorState)
    pets/  finder/  tags/
  pages/  public/ finder/ owner/ vet/ dev/
  hooks/            useAuth, useAsync, useGeolocation
  context/          AuthContext, AuthProvider
  lib/              cn, format, sms, redirect
  dev/              DevPanel, SketchBox (tylko szkice P2/P3)
server/
  src/              index, app, config, db, errors, mappers, validation, seed
    routes/         auth, me, pets, tags, activities
    middleware/     requireAuth, rateLimit, errorHandler
    services/       mail, tokens, session, tagCodes, pets
  sql/              001_init.sql (schemat), seed.sql (dane przykładowe)
  scripts/          db-reset.js
scripts/            generate-icons.mjs (ikony PWA)
plan/               specyfikacja (źródło prawdy)
```

## 6. Dane i API

- Strony importują **tylko** fasady z `src/api/` — nigdy z `api/mock/`, `api/http/` ani `mocks/` (D16).
- Tryb wybiera `VITE_API_MODE`: `mock` (domyślnie, `npm run dev`) albo `http` (`npm run dev:http`, `.env.http`, Docker).
  Fasady wybierają implementację per funkcja (`useHttp ? http.x : mock.x`), żeby kod mock wypadał z paczki produkcyjnej.
- Obie implementacje zwracają **te same kształty** (camelCase): `pet`, `scan`, `activity`, warianty `resolveTag`
  — opis w komentarzach fasad i w `server/src/mappers.js`. Zmieniasz jedną — zmień drugą.
- Lista endpointów: `plan/04-architektura.md`, plus `GET /api/scans?limit=` (ostatnie skanowania w panelu)
  i `GET /api/health`. `GET /api/auth/me` zwraca `{ user: null }` zamiast 401 (brak błędu w konsoli).
- Bezpieczeństwo: token logowania z `crypto.randomBytes`, w bazie skrót SHA-256, 15 min, jednorazowy (atomowy `UPDATE`);
  sesja JWT 30 dni w ciasteczku `httpOnly`, `SameSite=Lax`, `Secure` w produkcji; limit `/auth/request-link`;
  `findOwnPet` w każdej trasie `/pets/:id/…`; kody zawieszek 8 znaków `XXXX-XXXX` bez `0/O/1/I/L`.
- Bez SMTP link logowania jest wypisywany w konsoli serwera. `devLink` w odpowiedzi tylko poza produkcją albo gdy `APP_URL` to localhost (`config.exposeDevLink`).
- Każdy ekran obsługuje stany: ładowanie, pusty, błąd, sukces.

Dane przykładowe (te same w obu trybach): Maciej (`maciej@pettrace.pl`, telefon ustawiony), **Luna** (pies,
`LUNA-7K2Q`), **Mruczek** (kot, `MRCZ-4P9D`, w trybie zaginięcia), `XXXX-0000` (nieaktywny), kilka skanowań
i aktywności.

## 7. Tryb demonstracyjny

Panel DEV (tylko `npm run dev`): logowanie kontem demo, linki do zawieszek; w trybie mock także przełączniki
zaginięcia i reset danych. W trybie http reset: `npm run db:reset` w `server/`.

## 8. PWA i wdrożenie

`vite-plugin-pwa` (manifest z kolorami tokenów, ikony z `scripts/generate-icons.mjs`, service worker bez cache `/api`).
Wdrożenie: `docker-compose.yml` + `Caddyfile` + `.env` (wzór `.env.example`), instrukcja `DEPLOY.md`.
Lokalnie: `docker compose up --build` → `http://localhost:8080`.

## 9. Pliki zamrożone (wzór dla etapów 0–13 planu)

Nie zmieniaj wyglądu, klas, propsów ani zachowania: `index.html`, `vite.config.js`, `eslint.config.js`,
`src/main.jsx`, `src/index.css`, `src/components/layout/*` (RootLayout, PublicLayout, FinderLayout, VetLayout,
PageHeader, Logo, Sidebar, BottomNav, OwnerLayout, ownerNav.js), istniejące `src/components/ui/*` i `fieldClasses.js`,
`src/lib/cn.js`, `src/pages/dev/UiGalleryPage.jsx`, `src/pages/public/NotFoundPage.jsx`,
`src/mocks/seed.js`, etapy 0–13 w `PLAN_PRZEPISYWANIA.md`.

`LandingPage.jsx` był zamrożony, ale na prośbę autora szkice zastąpiono ilustracją i krokami (`components/landing/`).

Dozwolone dopiski: trasy w `router.jsx`, proxy i PWA w `vite.config.js`, providery w `main.jsx`, nowe kolekcje
w `seed.js`, link apple-touch w `index.html`. `RequireAuth.jsx` nie jest zamrożony. Potrzebny nowy komponent UI —
nowy plik. Inna zmiana zamrożonego pliku — najpierw zapytaj autora.

## 10. Standardy kodu

- Komponenty funkcyjne, małe i jednoodpowiedzialne; logika w hookach.
- Semantyczny HTML, etykiety w formularzach, `aria-*` tam, gdzie potrzebne, widoczny focus.
- **Komentarze po polsku** przy nieoczywistych decyzjach (autor się na tym kodzie uczy). Bez komentowania oczywistości.
- SQL zawsze z parametrami (`$1`), nigdy sklejany z danymi.
- Bez martwego kodu i bez `console.log` (wyjątek: komunikaty startu serwera i link logowania bez SMTP).
- Przed commitem: `npm run lint` i `npm run build` bez błędów, w konsoli przeglądarki bez błędów.
- Commity po polsku w trybie rozkazującym („Dodaj…”, „Popraw…”).
