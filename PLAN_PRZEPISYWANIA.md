# PetTrace — plan przepisywania krok po kroku

Każdy etap to lista rzeczy do zrobienia **po kolei**. Odhaczaj `[x]` w miarę postępu.

- **Prototyp** = folder `petracer/` (tylko do podglądania, nic w nim nie zmieniasz).
- **Nowy projekt** = folder `pettrace/`, który utworzysz w etapie 0. Tu piszesz kod.

---

## Jak pracujemy (dotyczy każdego etapu)

1. Napisz do mnie **„etap X”**. Wytłumaczę, co robią pliki i jakie są nowe pojęcia.
2. Zrób kroki z listy. Kod piszesz **sam**, ja daję tylko wskazówki.
3. Napisz **„etap X — review”**. Przejrzę Twój kod i powiem, co poprawić.
4. **Sprawdź, czy działa:**
   - `npm run dev`: wejdź na adresy podane w etapie, w konsoli przeglądarki (F12) ma nie być błędów,
   - `npm run lint`: bez błędów,
   - `npm run build`: przechodzi.
5. **Uzupełnij README** według punktu „README” w etapie.
6. **Zrób commit:**
   ```
   git add .
   git commit -m "treść z etapu"
   ```
   Treść commita w planie to propozycja. Po review dopasuję ją do tego, co faktycznie zrobiłeś.

**Oznaczenia:** ★ łatwe … ★★★★★ najtrudniejsze · *Wzór* = gdzie podejrzeć w prototypie.
Gdy w prototypie jest tylko szkic (`SketchBox`), wzorem jest opis w `petracer/CLAUDE.md`.

**Komponenty UI w prototypie a kolejność etapów:** strony prototypu używają już wspólnych komponentów
z `components/ui/` (`Button`, `Badge`, `Card`…), a Ty zbudujesz je dopiero w części C. W etapach 2–7
zamiast `<Button to="…">` pisz zwykły `<Link>` z klasami Tailwinda: odpowiednie klasy znajdziesz w mapach
`VARIANTS` i `SIZES` w `petracer/src/components/ui/Button.jsx`. W etapach 8–9 podmienisz te linki na
komponenty. To celowe: zobaczysz na własnym kodzie, po co jest wspólny komponent.

---

## Część A — Fundamenty

### Etap 0 — Nowy projekt Vite + React ★
*Nowe pojęcia:* npm, `package.json`, Vite, dev server, moduły ES (`import`/`export`), JSX.

1. [ ] Otwórz terminal w `C:\Users\macie\Website` (**poza** folderem `PeTrack`, bo on jest już
       osobnym repozytorium git).
2. [ ] Utwórz projekt:
       ```
       npm create vite@latest pettrace -- --template react
       cd pettrace
       npm install
       npm run dev
       ```
       Otwórz adres z terminala. Powinieneś zobaczyć stronę startową Vite z licznikiem.
3. [ ] Otwórz folder `pettrace` w VS Code (od teraz pracujesz tylko w nim).
4. [ ] **Usuń** pliki szablonu: `src/App.css`, `src/assets/react.svg`, `public/vite.svg`.
5. [ ] **Zedytuj** `src/App.jsx`: zostaw tylko komponent zwracający `<h1>PetTrace</h1>`.
6. [ ] **Zedytuj** `src/index.css`: wyczyść całą zawartość.
7. [ ] **Zedytuj** `src/main.jsx`: usuń import, który odwołuje się do usuniętego pliku (jeśli jest).
8. [ ] **Zedytuj** `index.html`: `lang="pl"`, tytuł `PetTrace`, `meta description`,
       `meta theme-color`, `viewport-fit=cover`. *Wzór:* `petracer/index.html`.
9. [ ] Skopiuj ten plan do nowego projektu jako `docs/PLAN_PRZEPISYWANIA.md`.
10. [ ] **Zastąp** `README.md` swoim szkieletem (sekcje poniżej).
11. [ ] Utwórz repozytorium: `git init`.
12. [ ] Sprawdź: `npm run dev` pokazuje „PetTrace”.

**README: utwórz szkielet z tymi sekcjami:**
```
# PetTrace
Jedno–dwa zdania: czym jest projekt (praca inżynierska, tagi NFC/QR, PWA).

## Stack
Tabela: biblioteka | do czego służy. (Na razie: React, Vite.)

## Uruchomienie
npm install / npm run dev / npm run build / npm run preview

## Struktura folderów
Drzewo folderów + jedno zdanie opisu każdego. Aktualizujesz w każdym etapie.

## Trasy
Tabela: adres | strona | layout | czy wymaga logowania.

## Architektura
(uzupełnisz w części D) warstwy: pages → components → hooks → api → mocks.

## Dziennik etapów
### Etap 0 — data
- Co zrobiłem: …
- Czego się nauczyłem: …
```
Sekcja „Czego się nauczyłem” to Twoja ściąga przed obroną. Pisz ją własnymi słowami.

**Commit:** `Utwórz projekt Vite + React i wyczyść szablon`

---

### Etap 1 — Tailwind, kolory i fonty ★★
*Nowe pojęcia:* utility-first CSS, zmienne CSS, `@theme`, `@layer base`, `@apply`, `:focus-visible`,
`prefers-reduced-motion`.
*Wzór:* `petracer/src/index.css`, `petracer/vite.config.js`, `petracer/src/main.jsx`.

1. [ ] Zainstaluj:
       ```
       npm install @tailwindcss/vite @fontsource-variable/bricolage-grotesque @fontsource-variable/plus-jakarta-sans
       ```
2. [ ] **Zedytuj** `vite.config.js`: dodaj plugin `tailwindcss()` obok `react()`.
3. [ ] **Zedytuj** `src/index.css`: import Tailwinda, blok `@theme` z kolorami, fontami i cieniami
       (wartości z tabeli w `CLAUDE.md` §3), style bazowe w `@layer base`.
4. [ ] **Zedytuj** `src/main.jsx`: zaimportuj oba fonty **przed** `index.css`.
5. [ ] **Zedytuj** `src/App.jsx`: nagłówek z klasą `text-pine` i akapit z `text-ink-muted`.
       Dodaj test: akapit z `text-gray-500`, który **nie powinien** mieć koloru (paleta wyzerowana).

**Sprawdź:** tło jest ciepłobiałe, nagłówek jest zielony i w foncie Bricolage, a `text-gray-500` nie działa.
Wciśnij Tab na jakimś linku i sprawdź, czy widać zielony obrys fokusu.
**README:** Stack → dopisz Tailwind CSS v4 i Fontsource. Wyjaśnij, gdzie są tokeny kolorów.
**Commit:** `Skonfiguruj Tailwind z tokenami kolorów i fontami`

---

### Etap 2 — Router i pierwsze strony ★★
*Nowe pojęcia:* komponent funkcyjny, SPA, `createBrowserRouter`, `RouterProvider`, `Link` vs `<a>`, trasa `*`.
*Wzór:* `petracer/src/router.jsx`, `petracer/src/main.jsx`, `pages/public/LandingPage.jsx`, `NotFoundPage.jsx`.

1. [ ] Zainstaluj: `npm install react-router`
2. [ ] Utwórz foldery: `src/pages/public/`
3. [ ] Utwórz `src/pages/public/LandingPage.jsx`: sam hero (znacznik, nagłówek, opis, link „Zaloguj się”).
       Pomiń `SketchBox`. Zamiast `Badge` i `Button` napisz zwykły `<p>` i `<Link>` z klasami
       (patrz uwaga o komponentach UI na górze planu).
4. [ ] Utwórz `src/pages/public/NotFoundPage.jsx`: przepisz z prototypu (też z `<Link>` zamiast `Button`).
5. [ ] Utwórz `src/router.jsx`: dwie trasy, `/` (Landing) i `*` (404).
6. [ ] **Zedytuj** `src/main.jsx`: zamiast `<App />` wyrenderuj `<RouterProvider router={router} />`
       (import z `react-router/dom`).
7. [ ] **Usuń** `src/App.jsx`, bo nie jest już potrzebny.

**Sprawdź:** `/` pokazuje landing, `/cokolwiek` pokazuje 404, a przycisk „Wróć” na 404 wraca
bez przeładowania strony (w zakładce Network nie ma nowego żądania dokumentu).
**README:** Stack → React Router. Struktura → `src/pages/public/`, `router.jsx`. Trasy → `/`, `*`.
**Commit:** `Dodaj routing ze stroną główną i stroną 404`

---

### Etap 3 — Pełna mapa tras ★★★
*Nowe pojęcia:* **props**, trasy zagnieżdżone (`children`), `index: true`, parametry `:tagId`,
**`useParams`**, trasa-grupa bez `path`.
*Wzór:* `petracer/src/router.jsx` (cała struktura).

1. [ ] Utwórz `src/pages/Placeholder.jsx`: komponent przyjmujący prop `title`, który wyświetla
       tytuł i (jeśli są) parametry z adresu (`useParams`). Zastępuje strony, których jeszcze nie ma.
2. [ ] **Zedytuj** `src/router.jsx`: przepisz **wszystkie** trasy z prototypu w tych samych grupach.
       Tam, gdzie w prototypie jest strona, której nie masz, wstaw `<Placeholder title="…" />`.
       Tam, gdzie jest layout, na razie **nie podawaj `element`**: trasa bez `element`
       sama wyświetla swoje dzieci.

**Sprawdź:** `/t/LUNA-7K2Q` pokazuje `tagId: LUNA-7K2Q`, a `/t/LUNA-7K2Q/lokalizacja` swój placeholder.
`/zwierzeta/nowe` to „Nowe zwierzę” (a **nie** profil z id „nowe”), `/zwierzeta/luna/tag` pokazuje `id: luna`.
**README:** Trasy → pełna tabela z `CLAUDE.md` §4 (kolumna „gotowe?” = nie).
**Commit:** `Dodaj pełną mapę tras z tymczasowymi stronami`

---

## Część B — Layout

### Etap 4 — RootLayout, PublicLayout, Logo ★★
*Nowe pojęcia:* **`<Outlet />`**, kompozycja, props z wartością domyślną, `ScrollRestoration`,
ikony jako komponenty, `aria-hidden`.
*Wzór:* `petracer/src/components/layout/RootLayout.jsx`, `PublicLayout.jsx`, `Logo.jsx`.

1. [ ] Zainstaluj: `npm install lucide-react`
2. [ ] Utwórz folder: `src/components/layout/`
3. [ ] Utwórz `Logo.jsx`: przepisz.
4. [ ] Utwórz `PublicLayout.jsx`: przepisz (link „Zaloguj się” jako `<Link>` z klasami wariantu `ghost`).
5. [ ] Utwórz `RootLayout.jsx`: przepisz **bez** `DevPanel` (dodasz w etapie 43).
6. [ ] **Zedytuj** `src/router.jsx`: podepnij `RootLayout` jako korzeń i `PublicLayout` jako `element` grupy publicznej.

**Sprawdź:** `/`, `/login` i 404 mają nagłówek z logo i stopkę. Kliknięcie logo wraca na `/`.
**README:** Stack → lucide-react. Struktura → `components/layout/` z opisem 3 plików.
Dopisz, czym jest layout route (własnymi słowami).
**Commit:** `Dodaj layout główny i publiczny z logo`

---

### Etap 5 — FinderLayout, VetLayout, PageHeader ★
*Nowe pojęcia:* renderowanie warunkowe `&&`, JSX jako prop, mobile-first (`sm:`, `lg:`), `dvh`.
*Wzór:* `FinderLayout.jsx`, `VetLayout.jsx`, `PageHeader.jsx`.

1. [ ] Utwórz `components/layout/FinderLayout.jsx`: przepisz.
2. [ ] Utwórz `components/layout/VetLayout.jsx`: przepisz.
3. [ ] Utwórz `components/layout/PageHeader.jsx`: przepisz.
4. [ ] **Zedytuj** `src/router.jsx`: podepnij Finder i Vet layout do ich grup.
5. [ ] **Zedytuj** `src/pages/Placeholder.jsx`: użyj w nim `PageHeader` do tytułu.

**Sprawdź:** `/t/LUNA-7K2Q` ma wąską kolumnę bez nawigacji (zwęź okno do ~375 px w DevTools),
a `/vet/abc` ma nagłówek „Paszport medyczny”.
**README:** Struktura → dopisz 3 pliki. Trasy → kolumna „layout”.
**Commit:** `Dodaj layouty znalazcy i weterynarza oraz nagłówek strony`

---

### Etap 6 — Nawigacja boczna (desktop) ★★★
*Nowe pojęcia:* tablica obiektów jako konfiguracja, **`.map()` i `key`**, destrukturyzacja ze zmianą
nazwy (`icon: Icon`), **`NavLink`** i `className` jako funkcja.
*Wzór:* `ownerNav.js`, `Sidebar.jsx`.

1. [ ] Utwórz `components/layout/ownerNav.js`: przepisz.
2. [ ] Utwórz `components/layout/Sidebar.jsx`: przepisz (przycisk „Rozpocznij spacer” jako `<Link>`
       z klasami wariantu `accent`).
3. [ ] Utwórz `components/layout/OwnerLayout.jsx` w wersji **minimalnej**: `Sidebar` + `main` z `<Outlet />`.
4. [ ] **Zedytuj** `src/router.jsx`: podepnij `OwnerLayout` do grupy tras właściciela.

**Sprawdź (szerokie okno):** `/panel` ma sidebar, aktywna pozycja jest podświetlona,
a przejście na `/spacery` przenosi podświetlenie.
**README:** Struktura → `ownerNav.js` i dlaczego jest osobnym plikiem (jedno źródło dla dwóch nawigacji).
**Commit:** `Dodaj panel właściciela z boczną nawigacją`

---

### Etap 7 — Nawigacja mobilna i przycisk szybkiej akcji ★★★
*Nowe pojęcia:* **`useLocation`** (pierwszy hook), zasady hooków, render prop w `NavLink`,
`fixed`/`sticky`, `env(safe-area-inset-bottom)`.
*Wzór:* `BottomNav.jsx`, `OwnerLayout.jsx`.

1. [ ] Utwórz `components/layout/BottomNav.jsx`: przepisz.
2. [ ] **Zedytuj** `OwnerLayout.jsx`: dopisz górny pasek mobilny, `BottomNav`, pływający przycisk
       ukrywany na `/spacery/nowy`.

**Sprawdź:** przy wąskim oknie widać dolny pasek i pomarańczowy przycisk „+”, na `/spacery/nowy`
przycisk znika. Przy szerokim oknie jest tylko sidebar.
**README:** Struktura → `BottomNav`. Dziennik → czym jest hook.
**Commit:** `Dodaj dolną nawigację mobilną i przycisk rozpoczęcia spaceru`

---

## Część C — Wspólne komponenty UI

Wspólne klocki interfejsu, z których składają się wszystkie strony. W prototypie są w
`petracer/src/components/ui/`, a każdy wariant zobaczysz na stronie **`/dev/ui`** (galeria; link jest też w panelu DEV).
Każdy nowy komponent dodawaj do swojej galerii, bo tam go testujesz, zanim trafi na prawdziwą stronę.
Komponent piszesz sam: wzór czytaj, żeby zrozumieć pomysł, a nie żeby przepisać linijka po linijce.

### Etap 8 — Card, Badge, Spinner + galeria ★★
*Nowe pojęcia:* **`children`**, łączenie `className` (funkcja `cn`), mapa wariantów (obiekt z klasami),
prop `as` (wybór znacznika), `role="status"`, `sr-only`.
*Wzór:* `petracer/src/lib/cn.js`, `components/ui/Card.jsx`, `Badge.jsx`, `Spinner.jsx`, `pages/dev/UiGalleryPage.jsx`.

1. [ ] Utwórz foldery: `src/lib/`, `src/components/ui/`, `src/pages/dev/`
2. [ ] Utwórz `lib/cn.js`: funkcja sklejająca klasy i pomijająca `false`/`undefined`.
3. [ ] Utwórz `components/ui/Card.jsx`, `Badge.jsx`, `Spinner.jsx`.
4. [ ] Utwórz `pages/dev/UiGalleryPage.jsx`: sekcja na każdy komponent ze wszystkimi wariantami.
5. [ ] **Zedytuj** `src/router.jsx`: dodaj trasę `dev/ui` w grupie publicznej.
6. [ ] **Zedytuj** `LandingPage.jsx`: znacznik „Tag NFC / QR na obroży” → `Badge`.

**Sprawdź:** `/dev/ui` pokazuje karty, badge we wszystkich kolorach i kręcący się spinner. Znacznik na
landingu wygląda jak wcześniej.
**README:** Struktura → `lib/`, `components/ui/` (lista komponentów), `pages/dev/`. Trasy → `/dev/ui`.
**Commit:** `Dodaj komponenty Card, Badge, Spinner i galerię UI`

### Etap 9 — Button ★★★
*Nowe pojęcia:* **rest/spread props** (`...rest`), `type="button"` vs `submit`, komponent, który
renderuje `Link` albo `button`, ikona przekazana jako prop (`icon: Icon`).
*Wzór:* `petracer/src/components/ui/Button.jsx`.

1. [ ] Utwórz `components/ui/Button.jsx`: warianty `primary` / `accent` / `secondary` / `ghost` /
       `danger` / `alert`, rozmiary `sm`–`xl` (`xl` ≥ 56 px dla znalazcy), props `icon`, `fullWidth`,
       `disabled` i opcjonalny `to` (wtedy link).
2. [ ] **Zedytuj** `UiGalleryPage.jsx`: wszystkie warianty i rozmiary.
3. [ ] **Zedytuj** `LandingPage.jsx`, `NotFoundPage.jsx`, `PublicLayout.jsx`, `Sidebar.jsx`:
       zamień ręcznie ostylowane linki-przyciski na `Button`.

**Sprawdź:** galeria, a na landingu, stronie 404, w nagłówku i w sidebarze przyciski wyglądają jak wcześniej.
**README:** Dziennik → dlaczego wspólny `Button` (DRY, spójność, poprawna semantyka link/przycisk).
**Commit:** `Dodaj komponent Button i użyj go w istniejących stronach`

### Etap 10 — Input, Textarea, Select ★★★
*Nowe pojęcia:* `<label htmlFor>`, **`useId`**, `aria-describedby`, `aria-invalid`,
**render prop** (`children` jako funkcja), wspólne klasy w osobnym pliku.
*Wzór:* `petracer/src/components/ui/FormField.jsx`, `fieldClasses.js`, `Input.jsx`, `Textarea.jsx`, `Select.jsx`.

1. [ ] Utwórz `components/ui/FormField.jsx`: etykieta + pole + podpowiedź albo błąd. Wylicza id
       i atrybuty `aria-*`, a pole dostaje je przez render prop.
2. [ ] Utwórz `components/ui/fieldClasses.js`: wspólny wygląd pól (zwykły i z błędem).
3. [ ] Utwórz `components/ui/Input.jsx`, `Textarea.jsx`, `Select.jsx` oparte na `FormField`.
4. [ ] **Zedytuj** `UiGalleryPage.jsx`: pola w stanie zwykłym, z błędem i wyłączone.

**Sprawdź:** kliknięcie w etykietę ustawia kursor w polu, a błąd jest czerwony pod polem. W DevTools
(Elements) pole z błędem ma `aria-invalid="true"` i `aria-describedby` wskazujące na komunikat.
**Commit:** `Dodaj pola formularza Input, Textarea i Select`

### Etap 11 — Toggle, Tabs ★★★
*Nowe pojęcia:* **`useState`**, **komponent kontrolowany**, **podnoszenie stanu**, `role="switch"`,
`role="tablist"` / `tab` / `tabpanel`, „roving tabindex” (obsługa strzałkami).
*Wzór:* `petracer/src/components/ui/Toggle.jsx`, `Tabs.jsx`.

1. [ ] Utwórz `components/ui/Toggle.jsx`: props `checked`, `onChange` (dostaje nową wartość), `label`,
       opcjonalnie `description` i `disabled`.
2. [ ] Utwórz `components/ui/Tabs.jsx`: props `tabs`, `activeTab`, `onChange`, `label`, a treść aktywnej
       zakładki jako `children`.
3. [ ] **Zedytuj** `UiGalleryPage.jsx`: stan w galerii (`useState`), żeby przełącznik i zakładki działały.

**Sprawdź:** przełącznik się przełącza (także kliknięciem w etykietę i Spacją). Zakładki zmieniają treść,
Tab wchodzi tylko na aktywną zakładkę, a strzałki ←/→ przełączają między nimi.
**README:** Dziennik → komponent kontrolowany własnymi słowami.
**Commit:** `Dodaj komponenty Toggle i Tabs`

### Etap 12 — Modal, EmptyState, StatTile ★★★★
*Nowe pojęcia:* **`useEffect` ze sprzątaniem**, **`useRef`** (dostęp do elementu DOM), element `<dialog>`
i `showModal()`, zdarzenie `cancel`, `tabular-nums`.
*Wzór:* `petracer/src/components/ui/Modal.jsx`, `EmptyState.jsx`, `StatTile.jsx`.

1. [ ] Utwórz `components/ui/Modal.jsx`, `EmptyState.jsx`, `StatTile.jsx`.
2. [ ] **Zedytuj** `UiGalleryPage.jsx`: przycisk otwierający modal, przykładowy stan pusty, 3 kafelki statystyk.

**Sprawdź:** modal zamyka się Escape, krzyżykiem i kliknięciem w tło, a fokus po zamknięciu wraca na przycisk.
**README:** Struktura → uzupełnij listę `ui/`.
**Commit:** `Dodaj komponenty Modal, EmptyState i StatTile`

---

## Część D — Dane (mock) i logowanie

Warstwa danych i logowanie, na których stoją wszystkie kolejne strony. Prototyp ma już wszystko:
`petracer/src/mocks/`, `api/`, `context/`, `hooks/`. Wymagania opisuje `CLAUDE.md` §6.

**Zasada:** strony i komponenty importują tylko z `src/api/`, **nigdy** z `src/mocks/`.
Funkcje w `api/` udają serwer: czekają chwilę, czytają „bazę”, sprawdzają, kto jest zalogowany,
i zwracają dane albo rzucają błąd. Gdy powstanie backend, podmienisz tylko wnętrze `api/`.

**Jak testować funkcje bez interfejsu:** przy włączonym `npm run dev` otwórz konsolę przeglądarki i wpisz np.
`const m = await import('/src/api/pets.js'); await m.getPets()`

### Etap 13 — Dane przykładowe ★★
*Nowe pojęcia:* modelowanie danych, daty ISO 8601, relacje przez `id`, daty liczone względem „teraz”.
*Wzór:* `petracer/src/mocks/seed.js`.

1. [ ] Utwórz folder: `src/mocks/`
2. [ ] Utwórz `mocks/seed.js`: eksportuje **funkcję** `createSeed()`, która zwraca obiekt z tablicami
       `users`, `pets`, `tags`, `walks`, `reminders`, `tagScans`, `locationReports`, `vetShares`
       oraz pustymi `magicLinks` i `sessions`. Dane opisuje `CLAUDE.md` §6 (Luna, Mruczek,
       tag `XXXX-0000`, trasy po Krakowie jako `[lat, lng]`).
       Funkcja, a nie stała, bo daty liczysz względem chwili utworzenia danych (przypomnienie
       „zaległe” ma być zaległe także za miesiąc).

**Sprawdź:** w konsoli `(await import('/src/mocks/seed.js')).createSeed()` pokazuje wszystkie dane.
**README:** sekcja „Model danych”: lista encji i ich pól + relacje (np. `pet.ownerId → user.id`).
**Commit:** `Dodaj model danych i dane przykładowe`

### Etap 14 — „Baza” w localStorage ★★★
*Nowe pojęcia:* **Promise, `async`/`await`**, `setTimeout`, `JSON.stringify`/`parse`, `try/catch`,
`structuredClone` (głęboka kopia), błąd z kodem HTTP.
*Wzór:* `petracer/src/mocks/db.js`, `api/client.js`.

1. [ ] Utwórz folder: `src/api/`
2. [ ] Utwórz `mocks/db.js`: `getDb()` (wczytanie z `localStorage`, a jeśli pusto, to z `createSeed()`;
       zwraca kopię), `saveDb(db)`, `resetDb()`.
3. [ ] Utwórz `api/client.js`:
       - `delay()` (200–500 ms),
       - `apiError(status, message)`: błąd z kodem jak w HTTP (400, 401, 404),
       - token sesji w `localStorage`: `getAuthToken`, `setAuthToken`, `clearAuthToken`,
       - `findSessionUser(db)` (zalogowany użytkownik albo `null`) i `requireUser(db)` (rzuca 401).

**Sprawdź:** w konsoli wywołaj `getDb()`, potem `saveDb` z jakąś zmianą. W DevTools → Application →
Local Storage pojawi się wpis, a zmiana zostaje po odświeżeniu. Sprawdź też, że zmiana obiektu zwróconego
przez `getDb()` **bez** `saveDb` niczego w bazie nie zmienia.
**README:** Architektura → schemat warstw i dlaczego komponenty nie widzą `mocks/`.
**Commit:** `Dodaj bazę mock w localStorage z opóźnieniem odpowiedzi`

### Etap 15 — API zwierząt, logowania i tagu ★★★
*Nowe pojęcia:* `find`/`filter`, aktualizacje bez mutacji (`{ ...pet, ...zmiany }`), `throw`,
lista dozwolonych pól, jednorazowy token, open redirect.
*Wzór:* `petracer/src/api/pets.js`, `auth.js`, `tags.js`, `dev.js`.

1. [ ] Utwórz `api/pets.js`: `getPets`, `getPetById`, `createPet`, `updatePet`. Każda wymaga zalogowania,
       a cudze zwierzę daje ten sam błąd 404 co nieistniejące.
2. [ ] Utwórz `api/auth.js`: `requestMagicLink(email, redirectTo)`, `verifyToken`, `getCurrentUser`, `logout`.
       Token z linku jest jednorazowy i ważny 15 minut, a `redirectTo` przyjmujesz tylko jako ścieżkę
       w aplikacji (`/…`, ale nie `//…`).
3. [ ] Utwórz `api/tags.js`: `resolveTag(tagId)` zwraca, czy tag jest aktywny, **publiczne** dane zwierzęcia
       i flagę `isOwner` liczoną z sesji. (Zapis odczytu tagu dojdzie w etapie 28.)
4. [ ] Utwórz `api/dev.js`: funkcje dla panelu DEV (przegląd tagów, Lost Mode bez logowania, reset danych).

**Sprawdź (konsola):** `getPets()` bez logowania rzuca błąd 401. Po zalogowaniu
(`requestMagicLink('maciej@pettrace.pl')` → `verifyToken(devToken)`) zwraca 2 zwierzęta, a
`getPetById('nie-ma')` rzuca 404. Drugi `verifyToken` z tym samym tokenem rzuca błąd. Po `updatePet`
i odświeżeniu strony zmiana nadal jest widoczna. `resolveTag('XXXX-0000')` zwraca `isActive: false`.
**README:** Architektura → lista funkcji API z kodami błędów (to będzie przyszła specyfikacja backendu).
**Commit:** `Dodaj API zwierząt, logowania i tagów`

### Etap 16 — AuthContext ★★★★
*Nowe pojęcia:* **Context** (`createContext`, `useContext`), prop drilling, **własny hook**, `useMemo`,
stan „jeszcze nie wiadomo” (`isLoading`).
*Wzór:* `petracer/src/context/AuthContext.js`, `AuthProvider.jsx`, `hooks/useAuth.js`.

1. [ ] Utwórz foldery: `src/context/`, `src/hooks/`
2. [ ] Utwórz `context/AuthContext.js`: samo `createContext(null)`. Osobny plik, bo `.jsx` z komponentem
       powinien eksportować tylko komponenty.
3. [ ] Utwórz `context/AuthProvider.jsx`: trzyma `user` i `isLoading`, przy starcie pyta `getCurrentUser()`,
       udostępnia `login(token)` (zwraca `redirectTo`) i `logout()`.
4. [ ] Utwórz `hooks/useAuth.js`: `useContext` + czytelny błąd, gdy brakuje providera.
5. [ ] **Zedytuj** `src/main.jsx`: owiń `RouterProvider` w `AuthProvider`.
6. [ ] **Zedytuj** `Sidebar.jsx`: pod logo pokaż imię zalogowanego użytkownika.

**Sprawdź:** zaloguj się z konsoli (jak w etapie 15), odśwież stronę, a w sidebarze na `/panel` pojawi się imię.
**README:** Struktura → `context/`, `hooks/`. Dziennik → po co Context.
**Commit:** `Dodaj kontekst autoryzacji i hook useAuth`

### Etap 17 — Hook do ładowania danych ★★★★
*Nowe pojęcia:* **`useEffect` z zależnościami**, wyścig zapytań (flaga `ignore`), stany ładowanie/błąd/pusto/dane.
*Wzór:* `petracer/src/hooks/useAsync.js`, funkcja `PetList` w `pages/owner/DashboardPage.jsx`.

1. [ ] Utwórz `hooks/useAsync.js`: `useAsync(funkcja, zależności)` zwraca `{ data, error, isLoading, reload }`.
2. [ ] Utwórz folder `src/pages/owner/` i plik `DashboardPage.jsx`: nagłówek „Cześć, {imię}” i lista
       zwierząt z `getPets()` w 4 stanach: `Spinner`, błąd z „Spróbuj ponownie”, `EmptyState`, lista imion
       (linki do profilu).
3. [ ] **Zedytuj** `src/router.jsx`: `/panel` → `DashboardPage` zamiast placeholdera.

**Sprawdź:** `/panel` pokazuje najpierw spinner, a potem „Luna, Mruczek”. Wymuś błąd w API
(tymczasowo `throw` w `getPets`), a pojawi się komunikat i działający przycisk „Spróbuj ponownie”.
**Commit:** `Dodaj hook useAsync i pierwszą wersję panelu`

### Etap 18 — Ochrona tras ★★
*Nowe pojęcia:* **`<Navigate>`**, `replace`, `state` w nawigacji.
*Wzór:* `petracer/src/components/layout/RequireAuth.jsx`.

1. [ ] Utwórz `components/layout/RequireAuth.jsx`: spinner, dopóki `isLoading`, przekierowanie na `/login`
       z `state: { from: location }`, gdy brak użytkownika.
2. [ ] **Zedytuj** `src/router.jsx`: owiń grupę właściciela w `RequireAuth`.

**Sprawdź:** po wylogowaniu (konsola) wejście na `/panel` przenosi na `/login`. Zalogowany odświeża `/spacery`
i **zostaje** na `/spacery` (to sprawdza obsługę `isLoading`).
**README:** Trasy → kolumna „wymaga logowania”.
**Commit:** `Dodaj ochronę tras panelu właściciela`

### Etap 19 — Formularz logowania ★★★
*Nowe pojęcia:* **input kontrolowany**, **`onSubmit` + `preventDefault`**, **`useNavigate`** ze `state`,
`noValidate`, blokowanie przycisku podczas wysyłki.
*Wzór:* `petracer/src/pages/public/LoginPage.jsx`, `CheckEmailPage.jsx`.

1. [ ] Utwórz `pages/public/LoginPage.jsx`: formularz (`Card as="form"`), pole e-mail (`Input`), walidacja,
       `requestMagicLink(email, redirectTo)`, przejście na `/login/sprawdz-poczte` z e-mailem i `devToken`
       w `state`. `redirectTo` bierzesz z `location.state.from` (zapisał go `RequireAuth`).
       Zalogowanego od razu przekieruj na `/panel`.
2. [ ] Utwórz `pages/public/CheckEmailPage.jsx`: adres z `state`, przycisk „[DEV] Symuluj kliknięcie w link”
       prowadzący na `/auth/verify?token=…` i osobny widok, gdy `state` jest puste (odświeżenie strony).
3. [ ] **Zedytuj** `src/router.jsx`: podmień placeholdery.

**Sprawdź:** pusty lub błędny e-mail pokazuje błąd pod polem, a poprawny prowadzi na `/login/sprawdz-poczte`
z Twoim adresem. Przycisk jest zablokowany w trakcie wysyłki. Odświeżenie tej strony pokazuje „Wróć do logowania”.
**Commit:** `Dodaj formularz logowania magic link`

### Etap 20 — Weryfikacja linku i wylogowanie ★★★
*Nowe pojęcia:* **`useSearchParams`**, efekt jednorazowy, podwójny efekt w `StrictMode` i `useRef` jako zabezpieczenie.
*Wzór:* `petracer/src/pages/public/AuthVerifyPage.jsx`, `handleLogout` w `pages/owner/SettingsPage.jsx`.

1. [ ] Utwórz `pages/public/AuthVerifyPage.jsx`: odczyt `?token=`, `login(token)`, przejście na `redirectTo`
       (a domyślnie na `/panel`), widok błędu dla zużytego lub złego tokenu.
2. [ ] Utwórz `pages/owner/SettingsPage.jsx`: na razie tylko nagłówek i przycisk „Wyloguj się”
       (`Button variant="danger"`): najpierw nawigacja na `/`, potem `logout()`.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź cały przepływ:** wylogowany wchodzi na `/spacery`, trafia na `/login`, potem „Symuluj
kliknięcie”, i wraca na **`/spacery`**. Ponowne otwarcie tego samego linku pokazuje błąd (token jednorazowy).
Wylogowanie przenosi na `/` (nie na `/login`). W konsoli nie ma błędów, mimo `StrictMode`.
**README:** Dziennik → opis przepływu logowania krok po kroku (przyda się w pracy pisemnej).
**Commit:** `Dodaj weryfikację magic linku i wylogowanie`

---

## Część E — Panel właściciela

### Etap 21 — Formatowanie dat i liczb ★★
*Nowe pojęcia:* `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat`, `Intl.NumberFormat`, funkcje czyste.

1. [ ] Utwórz folder `src/lib/` i plik `lib/format.js`: data po polsku, „za 3 dni”, wiek z daty
       urodzenia, dystans (m/km), czas (mm:ss).

**Sprawdź:** w konsoli wywołaj każdą funkcję z kilkoma wartościami (też brzegowymi: 0, wczoraj, dziś).
**README:** Struktura → `lib/`.
**Commit:** `Dodaj funkcje formatowania dat, czasu i dystansu`

### Etap 22 — Avatar i karta zwierzęcia ★★
*Nowe pojęcia:* wartości wyliczane w renderze, komponent prezentacyjny.

1. [ ] Utwórz folder `src/components/pets/` i pliki `PetAvatar.jsx`, `PetCard.jsx`, `LostBanner.jsx`.
2. [ ] **Zedytuj** `DashboardPage.jsx`: lista imion → siatka `PetCard`.
3. [ ] **Zedytuj** `UiGalleryPage.jsx`: dodaj przykłady.

**Sprawdź:** `/panel`: dwie karty, Mruczek z czerwonym oznaczeniem zaginięcia, kliknięcie prowadzi do profilu.
**Commit:** `Dodaj awatar i kartę zwierzęcia`

### Etap 23 — Pełny dashboard ★★★
*Nowe pojęcia:* `Promise.all`, sortowanie i przycinanie list, `EmptyState`, „Spróbuj ponownie”.
*Wzór układu:* `petracer/src/pages/owner/DashboardPage.jsx`.

1. [ ] Utwórz `api/reminders.js` (`getReminders`) i `api/tags.js` (`getTagScans`).
2. [ ] **Zedytuj** `DashboardPage.jsx`: sekcje przypomnień (3 najbliższe), aktywności tygodnia
       (`StatTile`), ostatnich odczytów tagów, przycisk „Dodaj zwierzę”.

**Sprawdź:** wszystkie sekcje mają dane. Wyczyść przypomnienia w danych i sprawdź, czy pojawia się stan pusty.
**Commit:** `Uzupełnij panel o przypomnienia, aktywność i odczyty tagów`

### Etap 24 — Profil zwierzęcia ★★★
*Nowe pojęcia:* pobieranie zależne od parametru URL, zakładka w adresie (`?tab=zdrowie`).
*Wzór układu:* `petracer/src/pages/owner/PetProfilePage.jsx` (tam aktywna zakładka jest w `useState`,
u Ciebie ma trafić do adresu).

1. [ ] Utwórz `pages/owner/PetProfilePage.jsx`: nagłówek, skróty akcji, `Tabs`.
2. [ ] Utwórz `components/pets/PetInfoTab.jsx` i `PetHealthTab.jsx`. Zakładki „Aktywność” i
       „Tag” na razie jako `EmptyState`.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** `/zwierzeta/luna`: przełączanie zakładek zmienia adres, a odświeżenie zostawia tę samą
zakładkę. `/zwierzeta/xyz` pokazuje „Nie znaleziono”.
**Commit:** `Dodaj profil zwierzęcia z zakładkami`

### Etap 25 — Formularz dodawania (3 kroki) ★★★★
*Nowe pojęcia:* stan formularza jako obiekt, wspólny `handleChange` po `name`, stan kroku, walidacja.
*Wzór wskaźnika kroków:* `petracer/src/pages/owner/PetNewPage.jsx`.

1. [ ] Utwórz `components/pets/PetForm.jsx`: kroki Podstawowe, Zdrowie i Kontakt, props `initialValues` i `onSubmit`.
2. [ ] Utwórz `pages/owner/PetNewPage.jsx`: `PetForm` + `createPet` + przejście do profilu.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** „Dalej” nie przejdzie z pustym imieniem, „Wstecz” nie gubi danych, a nowe zwierzę
widać na `/panel` (także po odświeżeniu).
**Commit:** `Dodaj wieloetapowy formularz dodawania zwierzęcia`

### Etap 26 — Edycja zwierzęcia ★★
*Nowe pojęcia:* ponowne użycie komponentu, `key` do resetu stanu.

1. [ ] Utwórz `pages/owner/PetEditPage.jsx`: ładuje zwierzę, przekazuje je do `PetForm`, `updatePet`.
2. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** zmiana rasy Luny jest widoczna w profilu i po odświeżeniu.
**Commit:** `Dodaj edycję profilu zwierzęcia`

### Etap 27 — Ustawienia ★★
*Nowe pojęcia:* kilka przełączników w jednym obiekcie stanu, komunikat „Zapisano”.

1. [ ] Utwórz `api/settings.js`.
2. [ ] **Zedytuj** `SettingsPage.jsx`: konto, powiadomienia (`Toggle`), dane kontaktowe dla znalazcy.

**Sprawdź:** zmiany zostają po odświeżeniu.
**README:** Trasy → oznacz gotowe strony części E.
**Commit:** `Dodaj ustawienia konta, powiadomień i kontaktu`

---

## Część F — Znalazca, tryb zaginięcia i mapa

### Etap 28 — Routing kontekstowy tagu ★★★
*Nowe pojęcia:* **wczesny `return`**, kolejność warunków, zapis odczytu tagu (audit log).
*Wzór:* `petracer/src/pages/finder/TagPage.jsx` (przeczytaj komentarz na górze!).

1. [ ] **Zedytuj** `api/tags.js`: `resolveTag` (z etapu 15) zapisuje też odczyt w `tagScans`
       (data, kontekst: znalazca / właściciel).
2. [ ] Utwórz folder `src/pages/finder/` i plik `TagPage.jsx`: `useAsync(() => resolveTag(tagId), [tagId, user?.id])`
       i 4 warianty, na razie jako proste nagłówki. Kolejność: nieaktywny → `isOwner` → zaginiony → profil.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź (tabela 3 × 2):** `LUNA-7K2Q`, `MRCZ-4P9D` i `XXXX-0000`, każdy jako zalogowany i
wylogowany (okno incognito). Wynik porównaj z komentarzem w prototypie.
**README:** osobna sekcja „Routing kontekstowy”: tabela warunek → widok i dlaczego w tej kolejności.
To jest serce pracy.
**Commit:** `Dodaj routing kontekstowy strony tagu`

### Etap 29 — Widoki dla znalazcy ★★★
*Nowe pojęcia:* link `tel:`, link względny, projektowanie pod stres (duże przyciski, kontrast).
*Wzór:* funkcje `InactiveTagView`, `LostView`, `FoundView` w `TagPage.jsx`.

1. [ ] Utwórz folder `src/components/finder/` i pliki `InactiveTagView.jsx`, `FoundView.jsx`, `LostView.jsx`.
2. [ ] **Zedytuj** `TagPage.jsx`: użyj ich zamiast nagłówków.

**Sprawdź na szerokości 375 px:** przyciski mają ≥ 56 px, „Zadzwoń” otwiera `tel:`, a Mruczek ma czerwony nagłówek.
**Commit:** `Dodaj widoki znalazcy dla profilu, zaginięcia i nieaktywnego tagu`

### Etap 30 — Szybki zapis właściciela ★★★
*Nowe pojęcia:* stan „wysłano” po akcji.

1. [ ] Utwórz `api/activity.js` (`logQuickActivity`).
2. [ ] Utwórz `components/finder/QuickTapView.jsx`: 4 przyciski i potwierdzenie.
3. [ ] **Zedytuj** `TagPage.jsx`: wariant `isOwner` pokazuje `QuickTapView`. Sprawdź, że zalogowany
       właściciel **innego** zwierzęcia (zaloguj się nowym e-mailem) widzi zwykły profil, a nie szybki zapis.

**Sprawdź:** zalogowany na `/t/LUNA-7K2Q` widzi szybki zapis, a po kliknięciu „Karmienie” pojawia się potwierdzenie.
**Commit:** `Dodaj szybki zapis aktywności po zeskanowaniu tagu przez właściciela`

### Etap 31 — Geolokalizacja ★★★
*Nowe pojęcia:* Geolocation API, callback → Promise, HTTPS/localhost, kody błędów.

1. [ ] Utwórz `hooks/useGeolocation.js`.
2. [ ] Utwórz `pages/finder/ShareLocationPage.jsx` w wersji **minimalnej**: przycisk „Pobierz
       lokalizację” i współrzędne lub błąd.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** zgoda pokazuje współrzędne, a odmowa czytelny komunikat. Pozycję możesz udawać w
DevTools → ⋮ → More tools → Sensors → Location.
**Commit:** `Dodaj hook geolokalizacji`

### Etap 32 — Pierwsza mapa ★★★
*Nowe pojęcia:* Leaflet vs React, `MapContainer`, `TileLayer`, `Marker`.

1. [ ] Zainstaluj: `npm install leaflet react-leaflet`
2. [ ] Utwórz folder `src/components/map/` i plik `MapView.jsx`. Pamiętaj o imporcie
       `leaflet/dist/leaflet.css`, jawnej wysokości mapy i ikonie markera.
3. [ ] **Zedytuj** `ShareLocationPage.jsx`: pokaż mapę z pinezką na pobranej pozycji.

**Sprawdź:** mapa się wyświetla (bez „poszatkowanych” kafelków), pinezka ma ikonę.
**README:** Stack → Leaflet, OpenStreetMap (i wymóg atrybucji).
**Commit:** `Dodaj komponent mapy z pozycją znalazcy`

### Etap 33 — Wysyłanie lokalizacji ★★★
*Nowe pojęcia:* nawigacja względna, formularz działający bez zgody na lokalizację.

1. [ ] Utwórz `api/reports.js` (`reportLocation`).
2. [ ] **Zedytuj** `ShareLocationPage.jsx`: wiadomość, telefon (opcjonalne), wysyłka.
3. [ ] Utwórz `pages/finder/LocationSentPage.jsx`: podziękowanie + lista „co dalej”.
4. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** wysyłka przenosi na `/t/…/wyslano`, a zgłoszenie jest w Local Storage.
**Commit:** `Dodaj wysyłanie lokalizacji przez znalazcę`

### Etap 34 — Tryb zaginięcia (właściciel) ★★★
*Nowe pojęcia:* potwierdzenie akcji w modalu, odświeżenie danych po zapisie.

1. [ ] **Zedytuj** `api/pets.js`: `setLostMode(petId, on, message)`.
2. [ ] Utwórz `pages/owner/LostModePage.jsx`: przełącznik z potwierdzeniem (`Modal`) i komunikat dla znalazców.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** włącz Lost Mode dla Luny, a w oknie incognito `/t/LUNA-7K2Q` pokazuje widok alarmowy z Twoim komunikatem.
**Commit:** `Dodaj włączanie i wyłączanie trybu zaginięcia`

### Etap 35 — Mapa zgłoszeń ★★★
*Nowe pojęcia:* `useMap`, `fitBounds`, `Popup`.

1. [ ] **Zedytuj** `api/reports.js`: `getReports(petId)`.
2. [ ] Utwórz `components/map/ReportPins.jsx`.
3. [ ] **Zedytuj** `LostModePage.jsx`: mapa + lista zgłoszeń.

**Sprawdź:** Mruczek ma 2 pinezki, mapa obejmuje obie, a kliknięcie pokazuje czas i wiadomość.
**README:** Trasy → oznacz gotowe strony części F.
**Commit:** `Dodaj mapę zgłoszeń lokalizacji w trybie zaginięcia`

---

## Część G — Spacery i harmonogram

### Etap 36 — Liczenie dystansu ★★★
*Nowe pojęcia:* wzór haversine, radiany, `reduce`, (opcjonalnie) testy jednostkowe.

1. [ ] Utwórz `lib/geo.js`: odległość między dwoma punktami i długość całej trasy.
2. [ ] (Opcjonalnie) `npm install -D vitest`, skrypt `"test": "vitest"` w `package.json`, plik `lib/geo.test.js`.

**Sprawdź:** odległość Błonia → Rynek porównaj z pomiarem w Google Maps (różnica < 5%).
**README:** Dziennik → dlaczego haversine, a nie Pitagoras. Uruchomienie → `npm test`.
**Commit:** `Dodaj obliczanie dystansu trasy wzorem haversine`

### Etap 37 — Śledzenie spaceru ★★★★★ (najtrudniejszy)
*Nowe pojęcia:* **`useRef`** na id interwału/`watchPosition`, `setInterval` + sprzątanie, `clearWatch`,
**aktualizacja funkcyjna** (`setX(prev => …)`), „stale closure”, maszyna stanów.

1. [ ] Utwórz `hooks/useWalkTracker.js` **w dwóch podejściach**:
       a) tylko stoper: start, pauza, wznów, koniec,
       b) dodaj punkty GPS z `watchPosition` i symulowaną trasę, gdy brak zgody.
2. [ ] Utwórz `pages/owner/WalkNewPage.jsx` w wersji **minimalnej**: przyciski + czas + liczba punktów.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** stoper liczy równo, pauza zatrzymuje, a po wyjściu ze strony w konsoli nie ma błędów (sprzątanie działa).
**Commit:** `Dodaj hook śledzenia spaceru ze stoperem i GPS`

### Etap 38 — Spacer na żywo ★★★
*Nowe pojęcia:* `Polyline`, mapa podążająca za pozycją.

1. [ ] Utwórz `api/walks.js` (`createWalk`).
2. [ ] Utwórz `components/map/WalkRoute.jsx`.
3. [ ] **Zedytuj** `WalkNewPage.jsx`: mapa z trasą, czas / dystans / tempo, zapis po zakończeniu.

**Sprawdź:** trasa rysuje się na mapie (symulowana na komputerze), a po „Zakończ” spacer jest zapisany.
**Commit:** `Dodaj ekran spaceru na żywo z mapą trasy`

### Etap 39 — Lista, wykres i szczegóły spacerów ★★★
*Nowe pojęcia:* grupowanie po tygodniach (`reduce`), `ResponsiveContainer`, `useMemo`.

1. [ ] Zainstaluj: `npm install recharts`
2. [ ] **Zedytuj** `api/walks.js`: `getWalks`, `getWalkById`.
3. [ ] Utwórz `pages/owner/WalksPage.jsx` (wykres + lista) i `WalkDetailsPage.jsx` (trasa + statystyki + notatka).
4. [ ] **Zedytuj** `src/router.jsx` i zakładkę „Aktywność” w `PetProfilePage.jsx`.

**Sprawdź:** wykres pokazuje kilka tygodni, a kliknięcie spaceru pokazuje jego trasę na Błoniach lub Bulwarach.
**README:** Stack → recharts.
**Commit:** `Dodaj listę spacerów z wykresem tygodniowym i szczegóły spaceru`

### Etap 40 — Harmonogram ★★★
*Nowe pojęcia:* porównywanie dat bez godzin, grupowanie listy, formularz w modalu.
*Wzór układu:* `petracer/src/pages/owner/SchedulePage.jsx`.

1. [ ] **Zedytuj** `api/reminders.js`: `createReminder`, `completeReminder`.
2. [ ] Utwórz folder `src/components/reminders/` i plik `ReminderItem.jsx`.
3. [ ] Utwórz `pages/owner/SchedulePage.jsx`: grupy Zaległe / Dziś / Nadchodzące, dodawanie w `Modal`.
4. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** zaległe przypomnienie jest w grupie „Zaległe”, oznaczenie jako wykonane je przenosi lub
chowa, a nowe przypomnienie na dziś trafia do „Dziś”.
**README:** Trasy → oznacz gotowe strony części G.
**Commit:** `Dodaj harmonogram przypomnień z grupowaniem i dodawaniem`

---

## Część H — Tag i udostępnianie weterynarzowi

### Etap 41 — Zarządzanie tagiem ★★★
*Nowe pojęcia:* `QRCodeSVG`, `window.location.origin`, walidacja wyrażeniem regularnym.

1. [ ] Zainstaluj: `npm install qrcode.react`
2. [ ] **Zedytuj** `api/tags.js`: `pairTag(petId, tagId)`.
3. [ ] Utwórz `pages/owner/PetTagPage.jsx`: parowanie, kod QR z adresem `/t/<tagId>`, historia odczytów.
4. [ ] **Zedytuj** `src/router.jsx` i zakładkę „Tag” w `PetProfilePage.jsx`.

**Sprawdź:** zeskanuj QR telefonem. Adres z `localhost` nie otworzy się na telefonie i to jest
normalne, ważne, że kod zawiera poprawny adres.
**README:** Stack → qrcode.react.
**Commit:** `Dodaj parowanie tagu, kod QR i historię odczytów`

### Etap 42a — Udostępnianie weterynarzowi (strona właściciela) ★★★
*Nowe pojęcia:* `crypto.randomUUID()`, data wygaśnięcia, zasada minimalnego udostępniania.

1. [ ] Utwórz `api/vetShares.js`: `createVetShare`, `getVetShares`, `revokeVetShare`, `getVetShareByToken`.
2. [ ] Utwórz `pages/owner/VetSharePage.jsx`: czas ważności, zakres danych (checkboxy), QR, lista z „Unieważnij”.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** nowe udostępnienie pojawia się na liście, a unieważnienie je usuwa.
**Commit:** `Dodaj generowanie tymczasowego linku dla weterynarza`

### Etap 42b — Paszport medyczny (strona weterynarza) ★★★
*Nowe pojęcia:* licznik z `setInterval`, własny hook `useCountdown`.

1. [ ] Utwórz `hooks/useCountdown.js`.
2. [ ] Utwórz folder `src/pages/vet/` i plik `VetPassportPage.jsx`: tylko wybrany zakres danych,
       licznik ważności, stan „link wygasł”.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** link z QR otwiera paszport, licznik odlicza, a link unieważniony lub z krótkim czasem
pokazuje „wygasł”.
**README:** Trasy → oznacz gotowe strony części H.
**Commit:** `Dodaj paszport medyczny z licznikiem ważności`

---

## Część I — PWA i wykończenie

### Etap 43 — Panel DEV ★★ (opcjonalny, bardzo przydatny na obronie)
*Nowe pojęcia:* `import.meta.env.DEV`, usuwanie kodu z wersji produkcyjnej.
*Wzór:* `petracer/src/dev/DevPanel.jsx` (korzysta z `useAuth`, `api/auth.js` i `api/dev.js`).

1. [ ] Utwórz folder `src/dev/` i plik `DevPanel.jsx`: logowanie tą samą drogą co w aplikacji
       (`requestMagicLink` → `login`) i Lost Mode (`Toggle`), linki do tagów, widoku weterynarza
       i galerii `/dev/ui`, reset danych (`Button`). Po zmianie danych panel przeładowuje stronę.
2. [ ] **Zedytuj** `RootLayout.jsx`: pokazuj panel tylko w trybie dev.

**Sprawdź:** panel działa w `npm run dev`, a po `npm run build && npm run preview` go nie ma.
**Commit:** `Dodaj panel deweloperski do demonstracji wariantów`

### Etap 44 — PWA ★★★
*Nowe pojęcia:* manifest, service worker, precache, strategie cache, instalowalność.

1. [ ] Zainstaluj: `npm install -D vite-plugin-pwa`
2. [ ] Utwórz folder `public/icons/` z ikonami 192 px, 512 px i wersją maskable.
3. [ ] **Zedytuj** `vite.config.js`: plugin `VitePWA` z manifestem (nazwa, kolory z tokenów, ikony).
4. [ ] **Zedytuj** `index.html`: link do ikony apple-touch.

**Sprawdź (tylko build!):** `npm run build && npm run preview`, potem DevTools → Application (Manifest,
Service Workers), ikona instalacji w pasku adresu, Lighthouse, tryb Offline i odświeżenie.
**README:** sekcja „PWA”: co jest cache’owane i co działa offline.
**Commit:** `Skonfiguruj PWA z manifestem i service workerem`

### Etap 45 — Wydajność i dostępność ★★★
*Nowe pojęcia:* code splitting, `lazy` w trasach, audyt dostępności.

1. [ ] **Zedytuj** `src/router.jsx`: leniwe ładowanie stron właściciela (Finder i Vet mają ładować się szybko).
2. [ ] Przejdź każdą stronę: obsługa klawiaturą, etykiety, kontrast, stany puste i błędów, układ na desktopie.
3. [ ] **Usuń** `pages/Placeholder.jsx`, jeśli nigdzie go już nie używasz.

**Sprawdź:** `npm run build` pokazuje kilka mniejszych plików JS zamiast jednego dużego, a Lighthouse
Accessibility ≥ 90.
**README:** uzupełnij całość: aktualna struktura, wszystkie trasy jako gotowe, zrzuty ekranu.
**Commit:** `Dodaj leniwe ładowanie tras i popraw dostępność`

---

## Dodatek: pułapki i rzeczy, których nie kopiujemy z prototypu

- **React Router v7:** importy z `react-router` (nie `react-router-dom`). Tutoriale z `<BrowserRouter>` i
  `<Routes>` opisują inne podejście.
- **Tailwind v4:** nie ma `tailwind.config.js` ani `npx tailwindcss init`. Konfiguracja jest w `@theme` w CSS.
- **Nie przepisuj** `petracer/src/dev/SketchBox.jsx`. To tymczasowe rusztowanie prototypu.
- **Poprawki względem prototypu:** zakładka profilu zapisana w adresie (etap 24).
- **Szkice zostają szkicami:** tam, gdzie prototyp ma `SketchBox` (np. przyciski szybkiego zapisu,
  karty zwierząt), docelowo użyjesz komponentów z `ui/` w etapie, który tę funkcję buduje.
- **Prototyp bywa „do przodu”:** czasem ma już fragment z późniejszego etapu (np. `resolveTag`
  i `TagPage` na prawdziwych danych w części D). Trzymaj się kolejności planu, a wzór potraktuj jako podgląd.

## Postęp

| Część | Etapy | Gotowe |
|---|---|---|
| A. Fundamenty | 0–3 | ☐ |
| B. Layout | 4–7 | ☐ |
| C. Komponenty UI | 8–12 | ☐ |
| D. Dane i logowanie | 13–20 | ☐ |
| E. Panel właściciela | 21–27 | ☐ |
| F. Znalazca i mapa | 28–35 | ☐ |
| G. Spacery i harmonogram | 36–40 | ☐ |
| H. Tag i weterynarz | 41–42b | ☐ |
| I. PWA i wykończenie | 43–45 | ☐ |
