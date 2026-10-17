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
`petracer/src/mocks/`, `api/`, `context/`, `hooks/`.

**Zasada:** strony i komponenty importują tylko z `src/api/`, **nigdy** z `src/mocks/`.
Funkcje w `api/mock/` udają serwer: czekają chwilę, czytają „bazę”, sprawdzają, kto jest zalogowany,
i zwracają dane albo rzucają błąd. Gdy powstanie backend (część H), dopiszesz drugą implementację
w `api/http/`, a strony się nie zmienią.

**Model danych od razu jak w bazie.** Kolekcje i pola odpowiadają tabelom z `docs/04-architektura.md`
(i plikowi `petracer/server/sql/001_init.sql`), tylko w camelCase: `owner_id` → `ownerId`.
Dzięki temu część backendowa będzie „przepisaniem tego samego na SQL”, a nie wymyślaniem od nowa.

**Czas przy etapie** (np. `· ~1,5 h`) to szacunek dla kogoś, kto pierwszy raz robi daną rzecz. Etap dłuższy
niż godzina możesz spokojnie rozłożyć na dwa wieczory — każdy krok z listy to dobre miejsce na przerwę.

**Jak testować funkcje bez interfejsu:** przy włączonym `npm run dev` otwórz konsolę przeglądarki i wpisz np.
`const m = await import('/src/api/pets.js'); await m.getPets()`

### Etap 13 — Dane przykładowe ★★ · ~1 h
*Nowe pojęcia:* modelowanie danych, daty ISO 8601, relacje przez `id`, daty liczone względem „teraz”.
*Wzór:* dane w `petracer/server/sql/seed.sql` (te same rekordy zapisane w SQL) i funkcja `at()` z
`petracer/src/mocks/seed.js`.

> Prototypowy `src/mocks/seed.js` powstał przed specyfikacją i ma więcej kolekcji (trasy spacerów, przypomnienia,
> zgłoszenia lokalizacji). **Nie przepisuj go.** Ty od razu piszesz dane w kształcie bazy — to mniej pracy
> i w etapie 14 nie będziesz ich musiał przekształcać.

1. [ ] Utwórz folder: `src/mocks/`
2. [ ] Utwórz `mocks/seed.js`: funkcja pomocnicza `at(dniOdDziś, godzina, minuta)` i eksportowana
       **funkcja** `createSeed()`, która zwraca obiekt z tablicami opisanymi w tabeli niżej.
       Funkcja, a nie stała, bo daty liczysz względem chwili utworzenia danych (skan „wczoraj” ma być
       wczorajszy także za miesiąc).

| Kolekcja | Pola | Co wpisać |
|---|---|---|
| `users` | `id, email, name, phone` | Maciej, `maciej@pettrace.pl`, `+48 600 123 456` |
| `pets` | `id, ownerId, name, species, breed, birthDate, weightKg, medicalNotes, isLost, lostMessage, createdAt` | Luna (pies, border collie, 2023-05-14, 17,5 kg); Mruczek (kot, europejski krótkowłosy, 2020-08-02, 4,9 kg, **zaginiony** z komunikatem) |
| `tags` | `code, petId, isActive, createdAt` | `LUNA-7K2Q` → Luna, `MRCZ-4P9D` → Mruczek, `XXXX-0000` bez zwierzęcia, nieaktywny |
| `tagScans` | `id, tagCode, scannedAt, userAgent, byOwner` | 4–5 skanów z ostatnich dni, różne przeglądarki (Android, iPhone), jeden `byOwner: true` |
| `activities` | `id, petId, type, occurredAt, durationMin, distanceM, source` | kilka karmień (`feeding`, `quick_tap`) i spacerów (`walk`, `manual`, z czasem i dystansem) z 7 dni |
| `loginTokens`, `sessions` | — | puste tablice (wypełni je logowanie) |

`species`: `dog` / `cat` / `other`. `medicalNotes` to zwykły tekst z podziałem na linie (`\n`), np.
`'Alergia: kurczak.\nLeki: Bravecto co 12 tygodni.'`. User-agenty (długie napisy opisujące przeglądarkę)
skopiuj z `seed.sql`. Identyfikatory mogą być czytelne: `'u-maciej'`, `'luna'`, `'mruczek'`.

**Sprawdź:** w konsoli `(await import('/src/mocks/seed.js')).createSeed()` pokazuje wszystkie dane, a daty
skanów są z ostatnich dni.
**README:** sekcja „Model danych”: lista encji i ich pól + relacje (np. `pet.ownerId → user.id`, `tag.petId → pet.id`).
**Commit:** `Dodaj model danych i dane przykładowe`

### Etap 14 — „Baza” w localStorage ★★★ · ~1 h
*Nowe pojęcia:* **Promise, `async`/`await`**, `setTimeout`, `JSON.stringify`/`parse`, `try/catch`,
`structuredClone` (głęboka kopia), błąd z kodem HTTP.
*Wzór:* `petracer/src/mocks/db.js` (bez funkcji `fromSeed` — Twoje dane już mają właściwy kształt),
`api/errors.js`, `delay` w `api/mock/client.js`.

1. [ ] Utwórz foldery: `src/api/`, `src/api/mock/`
2. [ ] Utwórz `mocks/db.js`: `getDb()` (wczytanie z `localStorage`, a jeśli pusto, to z `createSeed()`;
       zwraca kopię), `saveDb(db)`, `resetDb()`.
3. [ ] Utwórz `api/errors.js`: `apiError(status, message)` — błąd z kodem jak w HTTP (400, 401, 404).
4. [ ] Utwórz `api/mock/client.js`: na razie tylko `delay()` (200–500 ms).

**Sprawdź:** w konsoli wywołaj `getDb()`, potem `saveDb` z jakąś zmianą: w DevTools → Application → Local Storage
pojawi się wpis, a zmiana zostaje po odświeżeniu. Sprawdź też, że zmiana obiektu zwróconego przez `getDb()`
**bez** `saveDb` niczego nie zmienia.
**README:** Architektura → schemat warstw i dlaczego komponenty nie widzą `mocks/`.
**Commit:** `Dodaj bazę mock w localStorage z opóźnieniem odpowiedzi`

### Etap 15 — API logowania (mock) ★★★ · ~1,5 h
*Nowe pojęcia:* `find`/`filter`, `throw`, jednorazowy token, sesja, open redirect, **fasada**
(jeden plik, który ukrywa, skąd są dane).
*Wzór:* `petracer/src/api/mock/client.js` (funkcje sesji), `api/mock/auth.js` (bez `updateSettings`),
`lib/redirect.js`, komentarz na górze `api/auth.js`.

Pliki w `api/mock/` udają serwer. Strony nie importują ich bezpośrednio, tylko przez **fasadę** `api/auth.js`.
Na razie fasada po prostu przekazuje funkcje dalej:
`export { requestMagicLink, verifyToken, getCurrentUser, logout } from './mock/auth.js'`.
W części I dopiszesz drugą implementację (`api/http/`) i fasada będzie wybierać jedną z nich.

1. [ ] **Zedytuj** `api/mock/client.js`: token sesji w `localStorage` (`getAuthToken`, `setAuthToken`,
       `clearAuthToken`), `findSessionUser(db)`, `requireUser(db)` (rzuca 401), `toUser`.
2. [ ] Utwórz `lib/redirect.js`: `safeRedirect(path)` — tylko ścieżki `/…`, nigdy `//…`.
3. [ ] Utwórz `api/mock/auth.js`: `requestMagicLink(email, { name, next })` zwraca `{ email, devLink }`,
       `verifyToken`, `getCurrentUser`, `logout`. Nieznany e-mail zakłada konto, token jest jednorazowy
       i ważny 15 minut.
4. [ ] Utwórz fasadę `api/auth.js` z komentarzem: jakie funkcje, co zwracają, jaki endpoint będą wołać
       (to specyfikacja backendu).

**Sprawdź (konsola):** `const a = await import('/src/api/auth.js')`, potem
`const { devLink } = await a.requestMagicLink('maciej@pettrace.pl')`. Token wyciągniesz z `devLink`
(`new URL(devLink, location.origin).searchParams.get('token')`). `verifyToken(token)` zwraca Macieja,
drugi raz z tym samym tokenem rzuca błąd. `getCurrentUser()` po odświeżeniu strony nadal zwraca Macieja.
**Commit:** `Dodaj API logowania na danych przykładowych`

### Etap 16 — API zwierząt (mock) ★★ · ~1 h
*Nowe pojęcia:* aktualizacje bez mutacji (`{ ...pet, ...zmiany }`), lista dozwolonych pól,
„cudze = nieistniejące” (404 zamiast 403), dane wyliczane przy odczycie (kod zawieszki dołączany do zwierzęcia).
*Wzór:* `petracer/src/api/mock/pets.js` (bez `setLostMode` — dojdzie w etapie 34), `findOwnPet` i `toPet`
w `api/mock/client.js`, komentarz w `api/pets.js`.

1. [ ] **Zedytuj** `api/mock/client.js`: `findOwnPet(db, user, id)` i `toPet(db, pet)` (zwierzę bez `ownerId`,
       za to z `tagCode` aktywnej zawieszki — tak jak zrobi to `LEFT JOIN` w SQL).
2. [ ] Utwórz `api/mock/pets.js`: `getPets`, `getPetById`, `createPet`, `updatePet` z walidacją
       (imię wymagane, waga 0–200 kg, data urodzenia nie z przyszłości).
3. [ ] Utwórz fasadę `api/pets.js`.

**Sprawdź (konsola):** `getPets()` bez logowania rzuca błąd 401. Po zalogowaniu (jak w etapie 15) zwraca
2 zwierzęta z `tagCode`, a `getPetById('nie-ma')` rzuca 404. Po `updatePet` i odświeżeniu strony zmiana nadal
jest widoczna.
**README:** Architektura → lista funkcji API z kodami błędów (to będzie przyszła specyfikacja backendu).
**Commit:** `Dodaj API zwierząt na danych przykładowych`


### Etap 17 — AuthContext ★★★★ · ~1,5 h
*Nowe pojęcia:* **Context** (`createContext`, `useContext`), prop drilling, **własny hook**, `useMemo`,
stan „jeszcze nie wiadomo” (`isLoading`).
*Wzór:* `petracer/src/context/AuthContext.js`, `AuthProvider.jsx`, `hooks/useAuth.js`.

1. [ ] Utwórz foldery: `src/context/`, `src/hooks/`
2. [ ] Utwórz `context/AuthContext.js`: samo `createContext(null)`. Osobny plik, bo `.jsx` z komponentem
       powinien eksportować tylko komponenty.
3. [ ] Utwórz `context/AuthProvider.jsx`: trzyma `user` i `isLoading`, przy starcie pyta `getCurrentUser()`
       (błąd połączenia = brak sesji), udostępnia `login(token)`, `logout()` i `updateUser(user)`.
4. [ ] Utwórz `hooks/useAuth.js`: `useContext` + czytelny błąd, gdy brakuje providera.
5. [ ] **Zedytuj** `src/main.jsx`: owiń `RouterProvider` w `AuthProvider`.
6. [ ] **Zedytuj** `Sidebar.jsx`: pod logo pokaż imię zalogowanego użytkownika.

**Sprawdź:** zaloguj się z konsoli (jak w etapie 15), odśwież stronę, a w sidebarze na `/panel` pojawi się imię.
**README:** Struktura → `context/`, `hooks/`. Dziennik → po co Context.
**Commit:** `Dodaj kontekst autoryzacji i hook useAuth`

### Etap 18 — Hook do ładowania danych ★★★★ · ~1,5 h
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

### Etap 19 — Ochrona tras ★★ · ~0,5 h
*Nowe pojęcia:* **`<Navigate>`**, `replace`, `state` w nawigacji.
*Wzór:* `petracer/src/components/layout/RequireAuth.jsx`.

1. [ ] Utwórz `components/layout/RequireAuth.jsx`: spinner, dopóki `isLoading`, przekierowanie na `/login`
       z `state: { from: location }`, gdy brak użytkownika.
2. [ ] **Zedytuj** `src/router.jsx`: owiń grupę właściciela w `RequireAuth`.

**Sprawdź:** po wylogowaniu (konsola) wejście na `/panel` przenosi na `/login`. Zalogowany odświeża `/ustawienia`
i **zostaje** na `/ustawienia` (to sprawdza obsługę `isLoading`).
**README:** Trasy → kolumna „wymaga logowania”.
**Commit:** `Dodaj ochronę tras panelu właściciela`

### Etap 20 — Formularz logowania ★★★ · ~1,5 h
*Nowe pojęcia:* **input kontrolowany**, **`onSubmit` + `preventDefault`**, **`useNavigate`** ze `state`,
`noValidate`, blokowanie przycisku podczas wysyłki.
*Wzór:* `petracer/src/pages/public/LoginPage.jsx`, `CheckEmailPage.jsx`.

1. [ ] Utwórz `pages/public/LoginPage.jsx`: formularz (`Card as="form"`), pola e-mail i imię (opcjonalne,
       przy pierwszym logowaniu), walidacja, `requestMagicLink(email, { name, next })`, przejście na
       `/login/sprawdz-poczte` z e-mailem i `devLink` w `state`. `next` bierzesz z `location.state.from`
       (zapisał go `RequireAuth`). Zalogowanego od razu przekieruj.
2. [ ] Utwórz `pages/public/CheckEmailPage.jsx`: adres z `state`, przycisk „[DEV] Symuluj kliknięcie w link”
       **tylko gdy** jest `devLink` (prawdziwy serwer w produkcji go nie zwróci) i osobny widok, gdy `state`
       jest puste (odświeżenie strony).
3. [ ] **Zedytuj** `src/router.jsx`: podmień placeholdery.

**Sprawdź:** pusty lub błędny e-mail pokazuje błąd pod polem, a poprawny prowadzi na `/login/sprawdz-poczte`
z Twoim adresem. Przycisk jest zablokowany w trakcie wysyłki. Odświeżenie tej strony pokazuje „Wróć do logowania”.
**Commit:** `Dodaj formularz logowania magic link`

### Etap 21 — Weryfikacja linku i wylogowanie ★★★ · ~1 h
*Nowe pojęcia:* **`useSearchParams`**, efekt jednorazowy, podwójny efekt w `StrictMode` i `useRef` jako zabezpieczenie.
*Wzór:* `petracer/src/pages/public/AuthVerifyPage.jsx`, `handleLogout` w `pages/owner/SettingsPage.jsx`.

1. [ ] Utwórz `pages/public/AuthVerifyPage.jsx`: odczyt `?token=` i `?next=` (przez `safeRedirect`),
       `login(token)`, przejście na `next` (a domyślnie na `/panel`), widok błędu dla zużytego lub złego tokenu.
       Powrót jest zapisany w linku (`next`), a nie w pamięci przeglądarki — dzięki temu zadziała też link
       otwarty z maila w nowej karcie.
2. [ ] Utwórz `pages/owner/SettingsPage.jsx`: na razie tylko nagłówek i przycisk „Wyloguj się”
       (`Button variant="danger"`): najpierw nawigacja na `/`, potem `logout()`.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź cały przepływ (T12 z `docs/09-testy.md`):** wylogowany wchodzi na `/ustawienia`, trafia na `/login`,
potem „Symuluj kliknięcie”, i wraca na **`/ustawienia`**. Ponowne otwarcie tego samego linku pokazuje błąd
(T11). Wylogowanie przenosi na `/` (nie na `/login`). W konsoli nie ma błędów, mimo `StrictMode`.
**README:** Dziennik → opis przepływu logowania krok po kroku (przyda się w pracy pisemnej).
**Commit:** `Dodaj weryfikację magic linku i wylogowanie`

> **Kamień milowy M1** (`docs/06-harmonogram.md`): logowanie na danych przykładowych, ochrona tras,
> powrót na stronę sprzed logowania.

---

## Część E — Panel właściciela

### Etap 22 — Formatowanie dat i liczb ★★ · ~1 h
*Nowe pojęcia:* `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat`, `Intl.NumberFormat`, funkcje czyste,
polska odmiana liczebników (1 rok, 2 lata, 5 lat), daty bez godziny a strefa czasowa.
*Wzór:* `petracer/src/lib/format.js`.

1. [ ] Utwórz `lib/format.js`: `plural`, `formatDate`, `formatDateTime`, `formatRelative` („wczoraj, 8:12”),
       `formatAge`, `formatDuration`, `formatDistance`, `formatWeight`, `speciesLabel`, `describeUserAgent`
       („Chrome · Android”).

**Sprawdź:** w konsoli wywołaj każdą funkcję z kilkoma wartościami (też brzegowymi: 0, wczoraj, dziś,
12 i 22 lata, `describeUserAgent(navigator.userAgent)`).
**README:** Struktura → `lib/`.
**Commit:** `Dodaj funkcje formatowania dat, liczb i przeglądarki`

### Etap 23 — Avatar, karta zwierzęcia i komunikaty ★★ · ~1,5 h
*Nowe pojęcia:* wartości wyliczane w renderze, komponent prezentacyjny, mapa wariantów.
*Wzór:* `petracer/src/components/pets/PetAvatar.jsx`, `PetCard.jsx`, `components/ui/Notice.jsx`, `ErrorState.jsx`.

1. [ ] Utwórz `components/ui/Notice.jsx` (ramka z komunikatem: info / ostrzeżenie / błąd) i
       `components/ui/ErrorState.jsx` (błąd ładowania z „Spróbuj ponownie”).
2. [ ] Utwórz folder `src/components/pets/` i pliki `PetAvatar.jsx` (inicjał, kolor wg gatunku, czerwona
       obwódka przy zaginięciu) i `PetCard.jsx` (imię, rasa, wiek, oznaczenia „Zaginione” i kod zawieszki).
3. [ ] **Zedytuj** `DashboardPage.jsx`: lista imion → siatka `PetCard`, błąd → `ErrorState`.
4. [ ] **Zedytuj** `UiGalleryPage.jsx`: dodaj przykłady nowych komponentów.

**Sprawdź:** `/panel`: dwie karty, Mruczek z czerwonym oznaczeniem zaginięcia, kliknięcie prowadzi do profilu.
**Commit:** `Dodaj awatar, kartę zwierzęcia i komponenty komunikatów`

### Etap 24 — Panel: ostatnie skanowania ★★★ · ~1,5 h
*Nowe pojęcia:* łączenie danych z kilku tabel (jak JOIN), sortowanie i przycinanie list, `<time dateTime>`.
*Wzór:* `petracer/src/api/mock/tags.js` (`getRecentScans`), `components/tags/ScanList.jsx`, `pages/owner/DashboardPage.jsx`.

1. [ ] Utwórz `api/mock/tags.js` z `getRecentScans(limit)` (skan + imię zwierzęcia, od najnowszego)
       i fasadę `api/tags.js`.
2. [ ] Utwórz `components/tags/ScanList.jsx`: data względna, przeglądarka, oznaczenie „Ty” / „Inna osoba”.
3. [ ] **Zedytuj** `DashboardPage.jsx`: sekcja „Ostatnie skanowania” (4 stany) i ostrzeżenie `Notice`,
       gdy użytkownik nie ma numeru telefonu.

**Sprawdź:** panel pokazuje 5 skanowań z seeda z nazwami przeglądarek. Zaloguj się nowym e-mailem —
zobaczysz stany puste i ostrzeżenie o braku telefonu.
**Commit:** `Dodaj ostatnie skanowania zawieszek w panelu`

### Etap 25 — Profil zwierzęcia ★★★ · ~1,5 h
*Nowe pojęcia:* pobieranie zależne od parametru URL, zakładka w adresie (`?tab=health`), `<dl>`.
*Wzór:* `petracer/src/pages/owner/PetProfilePage.jsx` (bez `LostModeSwitch` i zakładki „Aktywność” — dojdą w części F).

1. [ ] Utwórz `pages/owner/PetProfilePage.jsx`: nagłówek (awatar, imię, rasa, wiek, przyciski „Zawieszka”
       i „Edytuj”) i `Tabs` z zakładkami „Dane” i „Zdrowie”. Aktywna zakładka w `useSearchParams`.
2. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** `/zwierzeta/luna`: przełączanie zakładek zmienia adres, a odświeżenie zostawia tę samą
zakładkę. `/zwierzeta/xyz` pokazuje błąd „Nie znaleziono zwierzęcia”.
**Commit:** `Dodaj profil zwierzęcia z zakładkami`

### Etap 26 — Formularz zwierzęcia ★★★★ · ~2–3 h
*Nowe pojęcia:* stan formularza jako obiekt, wspólny `handleChange` po `name`, walidacja,
zamiana danych z API na wartości pól (null → ''), błąd z API w formularzu.
*Wzór:* `petracer/src/components/pets/PetForm.jsx`, `pages/owner/PetNewPage.jsx`.

1. [ ] Utwórz `components/pets/PetForm.jsx`: jeden ekran z polami imię, gatunek, rasa, data urodzenia,
       waga, uwagi medyczne; props `pet`, `onSubmit`, `submitLabel`, `cancelTo`.
2. [ ] Utwórz `pages/owner/PetNewPage.jsx`: `PetForm` + `createPet` + przejście do profilu.
3. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** pusty formularz pokazuje błąd przy imieniu, waga „17,5” (z przecinkiem) się zapisuje,
a nowe zwierzę widać na `/panel` (także po odświeżeniu).
**Commit:** `Dodaj formularz dodawania zwierzęcia`

### Etap 27 — Edycja zwierzęcia ★★ · ~0,5 h
*Nowe pojęcia:* ponowne użycie komponentu, `key` do resetu stanu.
*Wzór:* `petracer/src/pages/owner/PetEditPage.jsx`.

1. [ ] Utwórz `pages/owner/PetEditPage.jsx`: ładuje zwierzę, przekazuje je do `PetForm`, `updatePet`.
2. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** zmiana rasy Luny jest widoczna w profilu i po odświeżeniu.
**Commit:** `Dodaj edycję profilu zwierzęcia`

### Etap 28 — Ustawienia ★★★ · ~1 h
*Nowe pojęcia:* aktualizacja danych w kontekście po zapisie, komunikat „Zapisano”, `type="tel"`.
*Wzór:* `petracer/src/pages/owner/SettingsPage.jsx`, `updateSettings` w `api/mock/auth.js`.

1. [ ] **Zedytuj** `api/mock/auth.js` i fasadę `api/auth.js`: `updateSettings({ name, phone })`.
2. [ ] **Zedytuj** `SettingsPage.jsx`: imię, numer telefonu dla znalazcy (z wyjaśnieniem, kiedy jest
       widoczny), zapis z `updateUser`, wylogowanie.

**Sprawdź:** zmiana imienia od razu zmienia sidebar, błędny numer pokazuje błąd, zmiany zostają po odświeżeniu.
**README:** Trasy → oznacz gotowe strony części E.
**Commit:** `Dodaj ustawienia z imieniem i numerem telefonu`

### Dodatek do części E — Strona główna bez szkiców ★★ · ~1–1,5 h (opcjonalny)
*Nowe pojęcia:* SVG w JSX (`viewBox`, `path`, `ellipse`), kolory z tokenów w SVG (`fill-pine`, `stroke-ember`),
`role="img"` i `aria-label` dla grafiki, lista uporządkowana `<ol>` jako kroki.
*Wzór:* `petracer/src/components/landing/HeroIllustration.jsx`, `HowItWorksStep.jsx`, `pages/public/LandingPage.jsx`.

1. [ ] Utwórz folder `src/components/landing/` i plik `HowItWorksStep.jsx` (karta: ikona, „Krok N”, tytuł, opis).
2. [ ] Utwórz `HeroIllustration.jsx`: obroża, zawieszka, fale NFC i telefon. Możesz narysować własny, prostszy
       obrazek — ważne, żeby kolory brać z tokenów, a nie wpisywać ręcznie.
3. [ ] **Zedytuj** `LandingPage.jsx`: ilustracja obok tekstu i sekcja „Jak działa tag” z trzema krokami.

**Sprawdź:** na 375 px ilustracja jest pod tekstem, na komputerze obok; czytnik ekranu (albo DevTools →
Accessibility) czyta opis obrazka.
**Commit:** `Dodaj ilustrację i opis kroków na stronie głównej`

> **Kamień milowy M2:** dodanie, edycja i profil zwierzęcia; zmiany zachowane po odświeżeniu.

---

## Część F — Strona zawieszki i widoki znalazcy

### Etap 29 — Routing kontekstowy w API ★★★★ · ~1,5 h
*Nowe pojęcia:* **decyzja po stronie serwera** (D6), zwracanie tylko potrzebnych danych, zapis skanu
(audit log), ochrona przed podwójnym zapisem.
*Wzór:* `resolveTag` w `petracer/src/api/mock/tags.js` (przeczytaj komentarz w `api/tags.js`).

1. [ ] **Zedytuj** `api/mock/tags.js`: `resolveTag(code)` sprawdza warunki w kolejności z `docs/03` i zwraca
       `{ variant: 'inactive' | 'owner' | 'lost' | 'found', … }` z danymi tylko dla tego wariantu.
       Każde wejście zapisuje skan (`userAgent`, `byOwner`), chyba że identyczny był przed chwilą.
2. [ ] **Zedytuj** fasadę `api/tags.js`: dopisz `resolveTag` i opis wariantów w komentarzu.

**Sprawdź (konsola, tabela 3 × 2):** `LUNA-7K2Q`, `MRCZ-4P9D` i `XXXX-0000`, każdy jako zalogowany
i wylogowany. Wariant `found` nie zawiera `message`, `owner` nie zawiera telefonu. W `getRecentScans()`
pojawiają się nowe wpisy.
**README:** osobna sekcja „Routing kontekstowy”: tabela warunek → widok i dlaczego w tej kolejności.
To jest serce pracy.
**Commit:** `Dodaj wybór wariantu strony zawieszki i zapis skanowań`

### Etap 30 — Strona zawieszki: tag nieaktywny i widok znalazcy ★★★ · ~2 h
*Nowe pojęcia:* `switch` po wariancie, `key` do ponownego pobrania, link `tel:` (zwykłe `<a href>`,
nie `<Link>`), projektowanie pod stres (duże przyciski, kontrast).
*Wzór:* `petracer/src/pages/finder/TagPage.jsx`, `components/finder/InactiveTagView.jsx`, `FoundView.jsx`,
`ActionLink.jsx`, `MedicalNotes.jsx`, `buildTelLink` w `lib/sms.js`.

1. [ ] Utwórz folder `src/components/finder/` i pliki `ActionLink.jsx`, `MedicalNotes.jsx`,
       `InactiveTagView.jsx`, `FoundView.jsx`.
2. [ ] Utwórz `lib/sms.js` na razie z `normalizePhone` i `buildTelLink`.
3. [ ] Utwórz folder `src/pages/finder/` i plik `TagPage.jsx`: czeka na `isLoading` z `useAuth`, potem
       `TagContent` z `key={user?.id}`; warianty `inactive` i `found`, pozostałe na razie jako nagłówek.
4. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź na szerokości 375 px (T3, T4, T9):** `/t/LUNA-7K2Q` w oknie incognito: imię, uwagi medyczne,
przycisk „Zadzwoń” ≥ 56 px z linkiem `tel:`, a numeru ani imienia właściciela **nie ma na ekranie**.
`/t/XXXX-0000` i `/t/ABCD-EFGH`: „Ten tag nie jest aktywny”.
**Commit:** `Dodaj stronę zawieszki z widokiem znalazcy`

### Etap 31 — Widok alarmowy ★★ · ~1 h
*Nowe pojęcia:* jednoznaczny komunikat alarmowy, `state` w `<Link>`.
*Wzór:* `petracer/src/components/finder/LostView.jsx`.

1. [ ] Utwórz `components/finder/LostView.jsx`: czerwony nagłówek, komunikat od opiekuna, widoczny numer,
       przyciski „Wyślij SMS z lokalizacją” (prowadzi do `/t/:tagId/lokalizacja` z `state`) i „Zadzwoń”.
2. [ ] **Zedytuj** `TagPage.jsx`: wariant `lost`.

**Sprawdź (T5):** `/t/MRCZ-4P9D` w oknie incognito pokazuje czerwony widok z komunikatem o Mruczku.
**Commit:** `Dodaj widok alarmowy dla zaginionego zwierzęcia`

### Etap 32 — Szybki zapis i zakładka „Aktywność” ★★★ · ~2 h
*Nowe pojęcia:* stan „zapisano” po akcji, blokowanie przycisków w trakcie zapisu, sumowanie (`reduce`).
*Wzór:* `petracer/src/api/mock/activities.js`, `components/finder/OwnerQuickLog.jsx`,
`components/pets/ActivityList.jsx`, `ActivityTab` w `pages/owner/PetProfilePage.jsx`.

1. [ ] Utwórz `api/mock/activities.js` (`logActivity`, `getActivities(petId, days)`) i fasadę `api/activities.js`.
2. [ ] Utwórz `components/finder/OwnerQuickLog.jsx`: przyciski „Karmienie” i „Spacer”, potwierdzenie z godziną.
3. [ ] **Zedytuj** `TagPage.jsx`: wariant `owner`.
4. [ ] Utwórz `components/pets/ActivityList.jsx` i **zedytuj** `PetProfilePage.jsx`: zakładka „Aktywność”
       (3 × `StatTile` + lista z 7 dni).

**Sprawdź (T8):** zalogowany na `/t/LUNA-7K2Q` widzi szybki zapis, po „Karmienie” pojawia się potwierdzenie,
a wpis jest w zakładce „Aktywność” profilu. Zaloguj się **innym** e-mailem: ta sama zawieszka pokazuje
widok znalazcy, a nie szybki zapis.
**Commit:** `Dodaj szybki zapis aktywności po zeskanowaniu zawieszki`

### Etap 33 — Lokalizacja w SMS-ie ★★★★ · ~2–3 h
*Nowe pojęcia:* Geolocation API, callback, HTTPS/localhost, kody błędów, link `sms:` i różnice
Android/iOS, `encodeURIComponent`, dane, które **nie** trafiają do bazy (D4).
*Wzór:* `petracer/src/hooks/useGeolocation.js`, `lib/sms.js`, `pages/finder/ShareLocationPage.jsx`.

1. [ ] Utwórz `hooks/useGeolocation.js`: `status`, `position`, `error`, `request()`.
2. [ ] **Zedytuj** `lib/sms.js`: `isIOS`, `buildSmsLink`, `mapsLink`, `buildFinderMessage`.
3. [ ] Utwórz `pages/finder/ShareLocationPage.jsx`: numer z `location.state` (a po odświeżeniu z `resolveTag`),
       „Pobierz moją lokalizację” → „Otwórz SMS”, przy błędzie „SMS bez lokalizacji”.
4. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź (T6, T7):** pozycję udawaj w DevTools → ⋮ → More tools → Sensors → Location. Link SMS zawiera
numer i link do Google Maps. Przy odmowie zgody jest SMS z prośbą o opis miejsca. W DevTools włącz
emulację iPhone'a — separator zmienia się z `?body=` na `&body=`.
**README:** Dziennik → dlaczego SMS, a nie zapis lokalizacji w bazie (D4, RODO).
**Commit:** `Dodaj wysyłanie SMS z lokalizacją przez znalazcę`

### Etap 34 — Tryb zaginięcia ★★★ · ~1,5 h
*Nowe pojęcia:* potwierdzenie akcji w modalu, aktualizacja widoku danymi zwróconymi przez API.
*Wzór:* `petracer/src/components/pets/LostModeSwitch.jsx`, `setLostMode` w `api/mock/pets.js`.

1. [ ] **Zedytuj** `api/mock/pets.js` i fasadę: `setLostMode(petId, isLost, message)`.
2. [ ] Utwórz `components/pets/LostModeSwitch.jsx`: `Toggle` otwiera `Modal`; przy włączaniu komunikat
       dla znalazcy i ostrzeżenia (brak telefonu, brak zawieszki); wyłączenie też z potwierdzeniem.
3. [ ] **Zedytuj** `PetProfilePage.jsx`: przełącznik pod nagłówkiem, zwierzę z odpowiedzi zapisane w stanie.

**Sprawdź (T13):** włącz tryb dla Luny z komunikatem — profil i karta w panelu mają czerwone oznaczenie,
a w drugiej karcie `/t/LUNA-7K2Q` (po wylogowaniu) pokazuje widok alarmowy z Twoim komunikatem.
**Commit:** `Dodaj przełącznik trybu zaginięcia z potwierdzeniem`

### Etap 35 — Generowanie zawieszki i kod QR ★★★ · ~2 h
*Nowe pojęcia:* `crypto.getRandomValues`, alfabet bez mylących znaków, `QRCodeSVG`,
`window.location.origin`, schowek (`navigator.clipboard`), pobieranie pliku (`Blob`).
*Wzór:* `createTag` w `petracer/src/api/mock/tags.js`, `CreateTag` i `TagDetails` w `pages/owner/PetTagPage.jsx`.

1. [ ] Zainstaluj: `npm install qrcode.react`
2. [ ] **Zedytuj** `api/mock/tags.js` i fasadę: `createTag(petId)` (wymaga telefonu; stara zawieszka
       zostaje wyłączona).
3. [ ] Utwórz `pages/owner/PetTagPage.jsx`: bez zawieszki — „Utwórz zawieszkę” (albo prośba o telefon);
       z zawieszką — QR, kod, adres z „Kopiuj”, instrukcja NFC, „Pobierz QR (SVG)”.
4. [ ] **Zedytuj** `src/router.jsx`.

**Sprawdź:** dodaj nowe zwierzę i utwórz mu zawieszkę — kod ma format `XXXX-XXXX` bez `0`, `O`, `1`, `I`, `L`.
Zeskanuj QR telefonem: adres z `localhost` nie otworzy się na telefonie i to jest normalne, ważne, że kod
zawiera poprawny adres.
**README:** Stack → qrcode.react.
**Commit:** `Dodaj generowanie zawieszki z kodem QR`

### Etap 36 — Historia skanowań i nowy kod ★★★ · ~1 h
*Nowe pojęcia:* audyt bezpieczeństwa, `key` do przeładowania sekcji, akcja nieodwracalna w modalu.
*Wzór:* `ScanHistory` i modal „Wygenerować nowy kod?” w `petracer/src/pages/owner/PetTagPage.jsx`.

1. [ ] **Zedytuj** `api/mock/tags.js` i fasadę: `getTagScans(petId)`.
2. [ ] **Zedytuj** `PetTagPage.jsx`: sekcja „Historia skanowań” (`ScanList`) i przycisk „Nowy kod”.

**Sprawdź (T14):** zeskanuj zawieszkę jako właściciel i w oknie incognito — oba wpisy są w historii z przeglądarką.
Po „Nowy kod” stary adres pokazuje „Ten tag nie jest aktywny”.
**README:** Trasy → oznacz gotowe strony części F.
**Commit:** `Dodaj historię skanowań i wymianę kodu zawieszki`

### Etap 37 — Panel DEV ★★ · ~1 h (opcjonalny, bardzo przydatny na obronie)
*Nowe pojęcia:* `import.meta.env.DEV`, usuwanie kodu z wersji produkcyjnej.
*Wzór:* `petracer/src/dev/DevPanel.jsx`, `api/mock/dev.js`.

1. [ ] Utwórz `api/mock/dev.js` (przegląd tagów, tryb zaginięcia bez logowania, reset danych).
2. [ ] Utwórz folder `src/dev/` i plik `DevPanel.jsx`: logowanie tą samą drogą co w aplikacji
       (`requestMagicLink` → token z `devLink` → `login`), linki do zawieszek i galerii `/dev/ui`,
       przełączniki zaginięcia, reset. Po zmianie danych panel przeładowuje stronę.
3. [ ] **Zedytuj** `RootLayout.jsx`: pokazuj panel tylko w trybie dev.

**Sprawdź:** w kilka sekund przejdziesz przez 4 warianty strony zawieszki. Po `npm run build && npm run preview`
panelu nie ma.
**Commit:** `Dodaj panel deweloperski do demonstracji wariantów`

> **Kamień milowy M3:** cztery warianty strony zawieszki, tryb zaginięcia, SMS z lokalizacją,
> generowanie zawieszki i QR.

---

## Część G — PWA i pierwsze wdrożenie

Wcześnie, bo HTTPS jest wymagany przez geolokalizację i service worker, a problemy z domeną lepiej
odkryć teraz niż tydzień przed obroną. Wdrażasz **sam frontend** na danych przykładowych.

### Etap 38 — PWA ★★★ · ~1,5 h
*Nowe pojęcia:* manifest, service worker, precache, instalowalność, ikona maskable, plik PNG od środka.
*Wzór:* `petracer/vite.config.js`, `scripts/generate-icons.mjs`, `index.html`.

1. [ ] Zainstaluj: `npm install -D vite-plugin-pwa`
2. [ ] Skopiuj `scripts/generate-icons.mjs`, przeczytaj komentarze i uruchom `node scripts/generate-icons.mjs`
       (powstaną ikony 192, 512, maskable i apple-touch w `public/`). Możesz też zrobić ikony w dowolnym
       programie graficznym — ważne są rozmiary.
3. [ ] **Zedytuj** `vite.config.js`: plugin `VitePWA` z manifestem (nazwa, kolory z tokenów, ikony)
       i `navigateFallbackDenylist` dla `/api`.
4. [ ] **Zedytuj** `index.html`: link do ikony apple-touch.

**Sprawdź (tylko build!):** `npm run build && npm run preview`, potem DevTools → Application (Manifest,
Service Workers), ikona instalacji w pasku adresu, tryb Offline i odświeżenie.
**README:** sekcja „PWA”: co jest cache’owane i co działa offline.
**Commit:** `Skonfiguruj PWA z manifestem i service workerem`

### Etap 39 — Monorepo: folder `client/` ★★ · ~0,5 h
*Nowe pojęcia:* monorepo (D18), `git mv` (przeniesienie z zachowaniem historii).

Docelowa struktura z `docs/04-architektura.md`: `client/` (frontend), `server/` (backend), `docs/`.
Prototyp ma frontend w korzeniu — u Ciebie od tego etapu wszystkie ścieżki frontendu zaczynają się od `client/`.

1. [ ] Przenieś frontend: `git mv src public index.html vite.config.js eslint.config.js package.json package-lock.json client/`
       (utwórz najpierw folder `client/`).
2. [ ] Usuń stary `node_modules` z korzenia, w `client/` uruchom `npm install`.
3. [ ] Przenieś plan i dokumentację do `docs/`.

**Sprawdź:** w `client/` działają `npm run dev`, `npm run lint` i `npm run build`.
**README:** Struktura i Uruchomienie → `cd client`.
**Commit:** `Przenieś frontend do folderu client`

### Etap 40 — Docker i Caddy dla frontendu ★★★ · ~2 h
*Nowe pojęcia:* **kontener i obraz**, `Dockerfile`, budowanie wieloetapowe (multi-stage), `docker compose`,
wolumen, serwer wejściowy (reverse proxy), aplikacja jednostronicowa (`try_files`), cache plików.
*Wzór:* `petracer/Dockerfile`, `petracer/Caddyfile` (na razie bez bloku `handle /api/*`),
`petracer/docker-compose.yml` (na razie tylko usługa `caddy`), `.dockerignore`.

1. [ ] Zainstaluj Docker Desktop.
2. [ ] Utwórz `client/Dockerfile`: etap `build` (Node, `npm ci`, `npm run build`) i etap z `caddy:2-alpine`
       kopiujący `dist` do `/srv`.
3. [ ] Utwórz `client/Caddyfile` (obok `Dockerfile`, bo obraz go kopiuje) i `client/.dockerignore`:
       `{$SITE_ADDRESS:http://localhost}`, kompresja, nagłówki bezpieczeństwa, `try_files {path} /index.html`,
       cache dla `/assets` i blok globalny `trusted_proxies` (przyda się, bo na serwerze przed Caddy stoi nginx).
4. [ ] Utwórz w korzeniu `docker-compose.yml` z usługą `caddy` (`build: ./client`, porty, wolumeny `caddy-data` i `caddy-config`).
       Na górze pliku `name: pettrace` — **inna nazwa niż prototyp** (`petrace`), bo oba projekty będą działać
       na jednym serwerze, a Docker po nazwie projektu rozróżnia kontenery i wolumeny (w tym bazę!).

**Sprawdź:** `docker compose up --build`, potem `http://localhost:8080/t/LUNA-7K2Q` działa, a odświeżenie
dowolnej podstrony nie daje błędu 404.
**README:** Uruchomienie → Docker.
**Commit:** `Dodaj obraz Docker z Caddy dla frontendu`

### Etap 41 — Wdrożenie na VPS ★★★ · ~2 h
*Nowe pojęcia:* SSH, rekord DNS typu A, subdomena, **nginx jako reverse proxy**, certbot i Let's Encrypt,
port dostępny tylko z serwera (`127.0.0.1:8081`), `.env` poza repozytorium.
*Wzór:* `petracer/DEPLOY.md`, sekcja 14 (serwer z nginx) — tak jest skonfigurowany Twój VPS.

Na serwerze działa już nginx, Docker i prototyp pod `petracker.pl` (port 8080). Twoja wersja na razie
stanie obok, pod **`app.petracker.pl`** i na porcie **8081**. Gdy będzie gotowa (etap 57), przełączysz na nią
główną domenę.

1. [ ] W panelu domeny dodaj rekord **A**: `app` → adres IP serwera.
2. [ ] Na serwerze: `git clone <adres Twojego repozytorium> ~/pettrace`, a w `~/pettrace/.env`:
       `SITE_ADDRESS=:80`, `HTTP_PORT=127.0.0.1:8081`, `HTTPS_PORT=127.0.0.1:8444`.
3. [ ] `docker compose up -d --build` i `curl -I http://127.0.0.1:8081` (ma być `200 OK`).
4. [ ] Utwórz `/etc/nginx/sites-available/app.petracker.pl` z `proxy_pass http://127.0.0.1:8081` (wzór bloku
       w DEPLOY.md, sekcja 14), włącz go: `sudo ln -s /etc/nginx/sites-available/app.petracker.pl /etc/nginx/sites-enabled/`,
       potem `sudo nginx -t && sudo systemctl reload nginx`.
5. [ ] HTTPS: `sudo certbot --nginx -d app.petracker.pl`.

**Sprawdź:** `https://app.petracker.pl` ma kłódkę, aplikację da się zainstalować na telefonie (T15), a
`https://app.petracker.pl/t/LUNA-7K2Q` otwiera się na telefonie. Prototyp pod `petracker.pl` działa dalej.
Pamiętaj: w trybie mock każdy telefon ma własne dane w swojej przeglądarce.
**README:** link do działającej wersji.
**Commit:** `Dodaj konfigurację wdrożenia na serwer`

### Etap 42 — Prawdziwa zawieszka i pierwsze testy ★★ · ~1–2 h
*Nowe pojęcia:* NDEF, rekord URL, NTAG213, czytelność kodu QR.
*Wzór:* `petracer/DEPLOY.md`, krok 12.

1. [ ] Zapisz adres `https://app.petracker.pl/t/LUNA-7K2Q` na tagu NFC aplikacją NFC Tools. **Nie blokuj tagu** —
       w etapie 57 zmienisz adres na `petracker.pl`.
2. [ ] Wydrukuj kod QR z aplikacji (min. 2 × 2 cm) i przyklej obok tagu.
3. [ ] Przejdź scenariusze T1–T9 i T15–T16 z `docs/09-testy.md` na Androidzie i iPhonie, wyniki wpisz do tabeli.

**Sprawdź:** przyłożenie telefonu i skan aparatem otwierają stronę zawieszki.
**README:** Dziennik → wyniki testów i wykryte problemy.
**Commit:** `Uzupełnij wyniki pierwszej serii testów na urządzeniach`

> **Kamień milowy M4:** aplikacja pod własną domeną przez HTTPS, instalacja jako PWA, skan prawdziwej zawieszki.

---

## Część H — Backend: Node.js, Express i PostgreSQL

Do tej pory „serwerem” były funkcje w `api/mock/`. Teraz napiszesz prawdziwy serwer, który robi
**dokładnie to samo**, tylko dane trzyma w bazie PostgreSQL. Funkcje mock są Twoją specyfikacją:
każdemu plikowi `api/mock/*.js` odpowiada plik tras w `server/src/routes/`.

**Jak testować backend bez frontendu:** narzędziem `curl` w terminalu (jest w Git Bash i w Windows)
albo rozszerzeniem REST Client / Thunder Client w VS Code. Przykłady są w każdym etapie.

### Etap 43 — Pierwszy serwer Express ★★★ · ~1,5 h
*Nowe pojęcia:* **Node.js** (JavaScript poza przeglądarką), `process`, moduły ES w Node (`"type": "module"`),
**HTTP: metoda, adres, nagłówki, kod odpowiedzi, treść**, Express, **trasa** (`app.get`), `req`/`res`,
`res.json`, port, `node --watch`.
*Wzór:* `petracer/server/package.json`, `server/src/app.js` (tylko `/api/health`), `server/src/index.js`,
`server/eslint.config.js`.

1. [ ] Utwórz folder `server/` i w nim `npm init -y`. W `package.json` ustaw `"type": "module"`, `"private": true`
       i skrypty `dev` (`node --watch src/index.js`) i `start`.
2. [ ] Zainstaluj: `npm install express`
3. [ ] Utwórz `server/src/app.js`: funkcja `createApp()` z trasą `GET /api/health` → `{ ok: true }`.
4. [ ] Utwórz `server/src/index.js`: `createApp().listen(3000, …)` z komunikatem w konsoli.
5. [ ] Utwórz `server/eslint.config.js` (globalne zmienne Node zamiast przeglądarki) i `server/.gitignore`.

**Sprawdź:** `npm run dev` w `server/`, potem `curl http://localhost:3000/api/health` zwraca `{"ok":true}`.
Zmień tekst w trasie i zapisz — serwer sam się przeładuje. `curl -i` pokazuje też kod 200 i nagłówki.
**README:** Stack → Node.js, Express. Uruchomienie → backend. Dziennik → czym jest żądanie i odpowiedź HTTP.
**Commit:** `Dodaj szkielet serwera Express`

### Etap 44 — PostgreSQL w Dockerze i schemat bazy ★★★★ · ~2–3 h
*Nowe pojęcia:* **relacyjna baza danych**, tabela, wiersz, kolumna, typy (`uuid`, `text`, `date`,
`numeric`, `boolean`, `timestamptz`), **klucz główny i obcy**, `UNIQUE`, `CHECK`, `DEFAULT`,
`ON DELETE CASCADE / SET NULL`, indeks (także częściowy `WHERE`), `psql`.
*Wzór:* `petracer/server/sql/001_init.sql` (przeczytaj komentarze), `petracer/docker-compose.dev.yml`.

1. [ ] Utwórz `docker-compose.dev.yml` z samą usługą `db` (`postgres:17-alpine`, port `5434:5432`,
       wolumen, plik schematu w `/docker-entrypoint-initdb.d`).
2. [ ] Utwórz `server/sql/001_init.sql`: tabele `users`, `login_tokens`, `pets`, `tags`, `tag_scans`,
       `activities`, `vet_shares` według diagramu ERD z `docs/04-architektura.md`. Pisz po jednej tabeli
       i porównuj z polami, które zwracają Twoje funkcje mock.
3. [ ] `docker compose -f docker-compose.dev.yml up -d`.

**Sprawdź:** `docker compose -f docker-compose.dev.yml exec db psql -U petrace -d petrace`, a w środku:
`\dt` (lista tabel), `\d pets` (kolumny), `INSERT INTO users (email) VALUES ('test@test.pl');` i
`SELECT * FROM users;`. Spróbuj wstawić ten sam e-mail drugi raz — baza odmówi (`UNIQUE`). Wyjście: `\q`.
Schemat wczytuje się tylko do pustej bazy: po zmianie pliku `down -v` i `up -d`.
**README:** Dziennik → dlaczego PostgreSQL (D14) i diagram tabel.
**Commit:** `Dodaj schemat bazy danych i PostgreSQL w Dockerze`

### Etap 45 — Połączenie z bazą i dane przykładowe ★★★ · ~2 h
*Nowe pojęcia:* zmienne środowiskowe, `.env` i `dotenv`, **pula połączeń** (`pg.Pool`),
**zapytanie z parametrami** (`$1`) i SQL injection, `SELECT … WHERE`, `ORDER BY`, interwał (`now() - interval '2 days'`).
*Wzór:* `petracer/server/src/config.js`, `db.js`, `seed.js`, `server/sql/seed.sql`, `server/scripts/db-reset.js`,
`server/.env.example`.

1. [ ] Zainstaluj: `npm install pg dotenv`
2. [ ] Utwórz `server/.env.example` i skopiuj go do `server/.env`.
3. [ ] Utwórz `src/config.js` (wszystkie ustawienia w jednym obiekcie, wartości domyślne tylko poza produkcją)
       i `src/db.js` (`pool`, `query`, parsery typów `date` i `numeric`).
4. [ ] Utwórz `server/sql/seed.sql`: Maciej, Luna, Mruczek, zawieszki, kilka skanowań i aktywności
       (daty względem `now()`), te same co w trybie mock.
5. [ ] Utwórz `src/seed.js` (wczytanie do pustej bazy przy starcie, gdy `SEED_DEMO_DATA=true`) i
       `scripts/db-reset.js` ze skryptem `npm run db:reset`.
6. [ ] **Zedytuj** `src/index.js`: przed startem `SELECT 1` (sprawdzenie połączenia) i dane przykładowe.

**Sprawdź:** start serwera wypisuje „Wczytano dane przykładowe”, drugi start już nie. W `psql`:
`SELECT name, is_lost FROM pets;`. `npm run db:reset` przywraca stan początkowy.
**README:** Uruchomienie → baza w Dockerze, `.env`, `db:reset`.
**Commit:** `Połącz serwer z bazą i dodaj dane przykładowe`

### Etap 46 — Błędy i walidacja ★★★ · ~1,5 h
*Nowe pojęcia:* **middleware** (`req, res, next`), kolejność middleware, obsługa błędów w Expressie 5
(błąd w `async` trafia sam do handlera), `express.json()`, kody 400/404/500, nigdy nie ufaj danym od klienta.
*Wzór:* `petracer/server/src/errors.js`, `middleware/errorHandler.js`, `validation.js`, `mappers.js`.

1. [ ] Utwórz `src/errors.js` (`HttpError`) i `src/middleware/errorHandler.js` (`errorHandler`, `notFound`).
2. [ ] Utwórz `src/validation.js` (`parseEmail`, `parsePet`, `parseSettings`, …) i `src/mappers.js`
       (`snake_case` z bazy → `camelCase` dla frontendu).
3. [ ] **Zedytuj** `src/app.js`: `express.json`, na końcu `notFound` i `errorHandler`.

**Sprawdź:** `curl http://localhost:3000/api/nie-ma` → 404 z `{"error": …}`. Tymczasowa trasa, która rzuca
`new HttpError(400, 'Test')`, zwraca 400, a rzucony zwykły `Error` — 500 z ogólnym komunikatem
(szczegóły tylko w konsoli serwera).
**Commit:** `Dodaj obsługę błędów i walidację danych`

### Etap 47 — Magic link: prośba o link ★★★★ · ~2 h
*Nowe pojęcia:* `crypto.randomBytes`, **hash SHA-256** (dlaczego w bazie nie ma samego tokenu),
`INSERT … ON CONFLICT DO NOTHING`, `make_interval`, `Router` w Expressie, `URLSearchParams`.
*Wzór:* `petracer/server/src/services/tokens.js`, `services/mail.js`, `POST /request-link` w `routes/auth.js`.

1. [ ] Utwórz `src/services/tokens.js`: `generateToken`, `hashToken`.
2. [ ] Utwórz `src/services/mail.js`: na razie **tylko wypisanie linku w konsoli** (wysyłkę SMTP dodasz w etapie 57).
3. [ ] Utwórz `src/routes/auth.js` z `POST /request-link`: walidacja e-maila, założenie konta, jeśli go nie ma,
       zapis skrótu tokenu (ważny 15 min), link z `next` (`safeNextPath`), odpowiedź z `devLink` tylko poza produkcją.
4. [ ] **Zedytuj** `src/app.js`: `app.use('/api/auth', authRouter)`.

**Sprawdź:**
```
curl -X POST http://localhost:3000/api/auth/request-link -H "Content-Type: application/json" -d "{\"email\":\"maciej@pettrace.pl\"}"
```
W konsoli serwera jest link, w tabeli `login_tokens` nowy wiersz — z kolumną `token_hash` **innym** niż token z linku.
**README:** Dziennik → przepływ magic link (diagram z `docs/04-architektura.md`).
**Commit:** `Dodaj endpoint wysyłania linku logowania`

### Etap 48 — Magic link: weryfikacja i sesja ★★★★ · ~2–3 h
*Nowe pojęcia:* **JWT** (nagłówek, dane, podpis), **ciasteczko `httpOnly`, `Secure`, `SameSite`** (D8),
`cookie-parser`, `UPDATE … RETURNING`, atomowość (jeden token = jedno logowanie, nawet przy dwóch kliknięciach).
*Wzór:* `petracer/server/src/services/session.js`, `POST /verify`, `GET /me`, `POST /logout` w `routes/auth.js`,
`loadUser` w `middleware/requireAuth.js`.

1. [ ] Zainstaluj: `npm install jsonwebtoken cookie-parser`
2. [ ] Utwórz `src/services/session.js`: `setSessionCookie`, `clearSessionCookie`, `readSessionUserId`.
3. [ ] Utwórz `src/middleware/requireAuth.js` na razie z `loadUser` (ustawia `req.user` albo `null`).
4. [ ] **Zedytuj** `routes/auth.js`: `POST /verify`, `GET /me` (niezalogowany → `{ user: null }`, nie 401),
       `POST /logout`. **Zedytuj** `app.js`: `cookieParser()`.

**Sprawdź (T10, T11):** `curl -c cookies.txt -X POST …/api/auth/verify -d "{\"token\":\"…\"}"` zapisuje ciasteczko,
`curl -b cookies.txt …/api/auth/me` zwraca użytkownika. Drugi `verify` z tym samym tokenem → 400.
Wklej JWT z pliku `cookies.txt` na jwt.io — widać `sub` i datę ważności, ale bez sekretu nie da się go podrobić.
**Commit:** `Dodaj weryfikację linku i sesję w ciasteczku`

### Etap 49 — Ochrona tras, limit żądań i ustawienia ★★★ · ~1,5 h
*Nowe pojęcia:* middleware jako „strażnik”, 401 vs 404, **rate limiting** (okno czasowe, `Map`, kod 429),
`trust proxy`.
*Wzór:* `requireAuth` w `petracer/server/src/middleware/requireAuth.js`, `middleware/rateLimit.js`, `routes/me.js`.

1. [ ] **Zedytuj** `requireAuth.js`: `requireAuth` (bez sesji → 401).
2. [ ] Utwórz `src/middleware/rateLimit.js` i **zedytuj** `routes/auth.js`: limit na IP i na e-mail dla `/request-link`.
3. [ ] Utwórz `src/routes/me.js`: `PATCH /api/me` (imię, telefon). **Zedytuj** `app.js`: `trust proxy`, nowa trasa.

**Sprawdź:** `PATCH /api/me` bez ciasteczka → 401, z ciasteczkiem → zmienione dane. Czwarte żądanie
`request-link` na ten sam e-mail w ciągu 15 minut → 429.
**Commit:** `Dodaj ochronę tras, limit prób logowania i ustawienia konta`

### Etap 50 — Endpointy zwierząt ★★★★ · ~2–3 h
*Nowe pojęcia:* **REST** (zasób, metody GET/POST/PATCH), parametr trasy (`req.params`), kod 201,
**sprawdzanie własności zasobu**, `LEFT JOIN`, dynamiczne `UPDATE … SET` z listy dozwolonych kolumn.
*Wzór:* `petracer/server/src/services/pets.js`, `routes/pets.js` (bez `/lost`).

1. [ ] Utwórz `src/services/pets.js`: `PET_SELECT` (zwierzę + kod aktywnej zawieszki) i `findOwnPet`
       (zły format id albo cudze zwierzę → 404).
2. [ ] Utwórz `src/routes/pets.js`: `GET /`, `POST /`, `GET /:id`, `PATCH /:id`, wszystkie za `requireAuth`.
3. [ ] **Zedytuj** `app.js`: `app.use('/api/pets', petsRouter)`.

**Sprawdź:** porównaj odpowiedź `GET /api/pets` z wynikiem `getPets()` w trybie mock — te same pola.
Zaloguj się drugim kontem i spróbuj pobrać Lunę po jej id → 404.
**Commit:** `Dodaj endpointy zwierząt ze sprawdzaniem własności`

### Etap 51 — Tryb zaginięcia i aktywności ★★★ · ~1,5 h
*Nowe pojęcia:* zapytanie parametru (`req.query`), filtrowanie po dacie, `INSERT … RETURNING`.
*Wzór:* `PATCH /:id/lost` w `petracer/server/src/routes/pets.js`, `routes/activities.js`.

1. [ ] **Zedytuj** `routes/pets.js`: `PATCH /:id/lost`.
2. [ ] Utwórz `src/routes/activities.js`: `POST` i `GET /api/pets/:id/activities?days=7`.

**Sprawdź:** włączenie trybu zaginięcia zmienia `is_lost` w bazie; dodana aktywność jest na liście z 7 dni,
a `?days=1` zwraca mniej wpisów.
**Commit:** `Dodaj endpointy trybu zaginięcia i aktywności`

### Etap 52 — Strona zawieszki na serwerze ★★★★ · ~2 h
*Nowe pojęcia:* **routing kontekstowy po stronie serwera** (D6), trasa publiczna z opcjonalną sesją,
`JOIN` trzech tabel, `INSERT … SELECT … WHERE NOT EXISTS`, nagłówek `User-Agent`.
*Wzór:* `GET /tags/:code` i `recordScan` w `petracer/server/src/routes/tags.js` (przeczytaj komentarz).

1. [ ] Utwórz `src/services/tagCodes.js` z `normalizeTagCode` (generowanie dojdzie w następnym etapie).
2. [ ] Utwórz `src/routes/tags.js` z `GET /tags/:code`: cztery warianty w kolejności z `docs/03`, zapis skanu.
3. [ ] **Zedytuj** `app.js`.

**Sprawdź:** tabela 3 × 2 z etapu 29, tym razem przez `curl` (z ciasteczkiem i bez). Odpowiedź `found`
nie zawiera komunikatu ani id właściciela. Każde wywołanie dodaje wiersz do `tag_scans` (z wyjątkiem
powtórzenia w ciągu 5 sekund).
**README:** sekcja „Routing kontekstowy” → dopisz, że decyzję podejmuje serwer, i dlaczego.
**Commit:** `Dodaj publiczny endpoint strony zawieszki z wyborem wariantu`

### Etap 53 — Generowanie zawieszki i historia skanowań ★★★★ · ~2 h
*Nowe pojęcia:* **transakcja** (`BEGIN`/`COMMIT`/`ROLLBACK`), `crypto.randomInt` (losowanie bez przekłamań),
`ON CONFLICT DO NOTHING` jako obsługa kolizji, `LIMIT`.
*Wzór:* `withTransaction` w `petracer/server/src/db.js`, `generateTagCode` w `services/tagCodes.js`,
`POST /pets/:id/tag`, `GET /pets/:id/scans`, `GET /scans` w `routes/tags.js`.

1. [ ] **Zedytuj** `db.js`: `withTransaction`. **Zedytuj** `tagCodes.js`: `generateTagCode`.
2. [ ] **Zedytuj** `routes/tags.js`: `POST /pets/:id/tag` (wymaga telefonu; w transakcji wyłącza stary kod
       i wstawia nowy), `GET /pets/:id/scans`, `GET /scans?limit=`.

**Sprawdź:** dwa razy `POST …/tag` dla tego samego zwierzęcia — w tabeli `tags` są dwa kody, tylko jeden aktywny.
Konto bez telefonu dostaje 400.
**README:** Architektura → pełna lista endpointów (tabela z `docs/04-architektura.md`, kolumna „gotowe”).
**Commit:** `Dodaj generowanie zawieszki i historię skanowań`

> **Kamień milowy M5:** wszystkie endpointy priorytetu 1 działają na PostgreSQL.

---

## Część I — Integracja i pełne wdrożenie

### Etap 54 — Klient HTTP ★★★★ · ~2 h
*Nowe pojęcia:* **`fetch`**, `Response.ok`, `response.json()`, `credentials`, proxy serwera deweloperskiego,
tryby Vite (`--mode`), pliki `.env.[tryb]`.
*Wzór:* `petracer/src/api/http/request.js`, `api/http/*.js`, `petracer/.env.http`, sekcja `server.proxy`
w `vite.config.js`, skrypty `dev:http` i `build:http` w `package.json`.

1. [ ] Utwórz `api/http/request.js`: jedno miejsce wykonujące `fetch`, błąd sieci → `apiError(0, …)`,
       odpowiedź z błędem → `apiError(status, data.error)`.
2. [ ] Utwórz `api/http/auth.js`, `pets.js`, `tags.js`, `activities.js` — te same nazwy funkcji co w `api/mock/`.
3. [ ] **Zedytuj** `vite.config.js`: proxy `/api` → `http://localhost:3000`.
4. [ ] Utwórz `.env.http` (`VITE_API_MODE=http`) i skrypty `dev:http`, `build:http`.

**Sprawdź:** z działającym serwerem i bazą `npm run dev:http`, w konsoli przeglądarki
`(await import('/src/api/http/pets.js')).getPets()` po zalogowaniu zwraca dane z PostgreSQL.
**Commit:** `Dodaj implementację warstwy api opartą na fetch`

### Etap 55 — Przełączenie aplikacji na API ★★★ · ~2–3 h
*Nowe pojęcia:* wybór implementacji w czasie budowania, **tree shaking** (usuwanie nieużywanego kodu),
`sideEffects` w `package.json`.
*Wzór:* fasady `petracer/src/api/auth.js` (przeczytaj komentarz), `pets.js`, `tags.js`, `activities.js`,
`api/mode.js`, `DevPanel.jsx` (tryb http), `"sideEffects"` w `package.json`.

1. [ ] **Zedytuj** fasady: `export const getPets = useHttp ? http.getPets : mock.getPets` dla każdej funkcji.
2. [ ] Utwórz `api/mode.js` i **zedytuj** `DevPanel.jsx`: w trybie http logowanie przez `devLink` z serwera,
       bez przełączników zaginięcia i resetu.
3. [ ] **Zedytuj** `package.json`: `"sideEffects": ["**/*.css"]`.
4. [ ] Przejdź całą aplikację w trybie http: logowanie, panel, profil, formularze, ustawienia, zawieszka,
       strona znalazcy, SMS, historia skanowań.

**Sprawdź:** pełny przepływ z `docs/09-testy.md` (T3–T14) w `npm run dev:http`, w konsoli bez błędów.
Po `npm run build:http` w plikach `dist/assets/*.js` nie ma tekstu `pettrace:db` (kod mock wycięty).
**README:** Architektura → jak przełączać tryby i dlaczego strony się nie zmieniły (D16).
**Commit:** `Przełącz aplikację na prawdziwe API`

### Etap 56 — Cały system w Docker Compose ★★★ · ~2 h
*Nowe pojęcia:* obraz dla Node.js, `npm ci --omit=dev`, użytkownik bez uprawnień roota, `depends_on` +
`healthcheck`, sieć między kontenerami (adres `db`, `api`), wartości domyślne `${ZMIENNA:-domyślna}`.
*Wzór:* `petracer/server/Dockerfile`, `server/.dockerignore`, `petracer/docker-compose.yml`,
`Caddyfile` (blok `handle /api/*`), `.env.example`, `assertSafeSecret` w `server/src/config.js`.

1. [ ] Utwórz `server/Dockerfile` i `server/.dockerignore`.
2. [ ] **Zedytuj** `docker-compose.yml`: usługi `db`, `api`, `caddy`; obraz frontendu z `VITE_API_MODE=http`.
3. [ ] **Zedytuj** `Caddyfile`: `/api/*` → `reverse_proxy api:3000`.
4. [ ] Utwórz `.env.example` z opisem każdej zmiennej. **Zedytuj** `config.js`: serwer nie wystartuje
       z domyślnym sekretem na prawdziwej domenie, a `TRUST_PROXY_HOPS` mówi, ilu pośredników stoi przed API
       (lokalnie 1 — Caddy; na Twoim serwerze 2 — nginx i Caddy). Bez tego limit prób logowania liczyłby
       wszystkich użytkowników jako jeden adres IP.

**Sprawdź:** `docker compose up --build`, `http://localhost:8080`, logowanie linkiem z `docker compose logs api`,
ciasteczko w DevTools → Application → Cookies ma `HttpOnly`. `docker compose down` i ponowne `up` — dane zostają.
**README:** Uruchomienie → cały system jednym poleceniem.
**Commit:** `Uruchom cały system w Docker Compose`

### Etap 57 — Pełne wdrożenie, poczta i kopie zapasowe ★★★ · ~2–3 h
*Nowe pojęcia:* SMTP, `nodemailer`, SPF/DKIM, `pg_dump`, `cron`, aktualizacja aplikacji na serwerze.
*Wzór:* `petracer/server/src/services/mail.js`, `petracer/DEPLOY.md` (kroki 5–11).

1. [ ] Zainstaluj w `server/`: `npm install nodemailer` i **zedytuj** `mail.js`: wysyłka przez SMTP,
       gdy `SMTP_HOST` jest ustawiony, inaczej link w konsoli.
2. [ ] Na serwerze w `~/pettrace`: `git pull`, uzupełnij `.env` (`POSTGRES_PASSWORD`, `JWT_SECRET`,
       `APP_URL=https://app.petracker.pl`, `TRUST_PROXY_HOPS=2`, SMTP), `docker compose up -d --build`.
       Hasło do bazy ustawia się **tylko przy pierwszym starcie** — późniejsza zmiana w `.env` kończy się błędem
       `password authentication failed` (wtedy `docker compose down -v`, co kasuje dane).
3. [ ] Ustaw kopię zapasową bazy (`pg_dump` + `cron`, DEPLOY.md krok 8) i raz przećwicz jej przywrócenie.
4. [ ] Przełącz główną domenę na swoją wersję: w `/etc/nginx/sites-available/petracker.pl` zmień
       `proxy_pass` na `http://127.0.0.1:8081`, w `.env` ustaw `APP_URL=https://petracker.pl`, przeładuj nginx
       i zrestartuj API. Prototyp zatrzymaj (`docker compose down` w `~/prototyp`). Przepisz adres na tagu NFC.

**Sprawdź:** logowanie na `https://petracker.pl` linkiem z prawdziwego maila (sprawdź też folder spam),
dane zostają po `docker compose restart`, w katalogu kopii jest plik z dzisiejszą datą, a stary tag
prowadzi już do Twojej wersji.
**README:** link do `DEPLOY.md`.
**Commit:** `Dodaj wysyłkę maili przez SMTP i kopie zapasowe bazy`

> **Kamień milowy M6:** aplikacja korzysta z API, całość uruchamiana przez `docker compose`.

---

## Część J — Testy i poprawki

### Etap 58 — Testy na urządzeniach ★★★ · ~3 h (dwa podejścia)
*Nowe pojęcia:* testy akceptacyjne, Lighthouse, obsługa klawiaturą, czytnik ekranu.

1. [ ] Przejdź wszystkie scenariusze T1–T16 z `docs/09-testy.md` na Androidzie, iPhonie i komputerze.
2. [ ] Lighthouse na `/`, `/t/LUNA-7K2Q` i `/panel`: cel ≥ 90 w każdej kategorii.
3. [ ] Przejdź każdą stronę samą klawiaturą (Tab, Enter, Esc w oknach) i sprawdź stany puste i błędów.
4. [ ] Popraw znalezione błędy (każdy osobnym commitem) i zrób zrzuty ekranu do pracy.

**Sprawdź:** tabela w `docs/09-testy.md` wypełniona, wszystkie scenariusze zaliczone albo opisane.
**README:** uzupełnij całość: aktualna struktura, wszystkie trasy jako gotowe, zrzuty ekranu.
**Commit:** `Uzupełnij wyniki testów na urządzeniach`

---

## Priorytet 2 (po ukończeniu priorytetu 1)

Udostępnianie weterynarzowi, ręczny wpis spaceru, mapa przy wysyłaniu lokalizacji i zdjęcie zwierzęcia
(`docs/01-zakres.md`). Etapy dopiszemy, gdy priorytet 1 będzie działał i zostanie zaakceptowany.
Do tego czasu strony `/spacery`, `/spacery/nowy`, `/zwierzeta/:id/vet-share` i `/vet/:shareToken`
zostają szkicami, a `/harmonogram` (priorytet 3) — szkicem na stałe.

---

## Dodatek: pułapki i rzeczy, których nie kopiujemy z prototypu

- **React Router v7:** importy z `react-router` (nie `react-router-dom`). Tutoriale z `<BrowserRouter>` i
  `<Routes>` opisują inne podejście.
- **Tailwind v4:** nie ma `tailwind.config.js` ani `npx tailwindcss init`. Konfiguracja jest w `@theme` w CSS.
- **Nie przepisuj** `petracer/src/dev/SketchBox.jsx`. To tymczasowe rusztowanie prototypu.
- **Prototyp ma frontend w korzeniu,** a Ty od etapu 39 w `client/`. Ścieżki w „Wzór” podają położenie w prototypie.
- **Express 5, nie 4:** błąd rzucony w funkcji `async` trafia sam do obsługi błędów. Starsze tutoriale
  owijają trasy w `try/catch` i wołają `next(error)` — tu nie trzeba.
- **SQL zawsze z parametrami** (`$1`, `$2`). Nigdy nie sklejaj zapytania z danymi od użytkownika
  (`'… WHERE id = ' + id`) — to otwiera drogę do SQL injection.
- **Schemat bazy wczytuje się tylko raz** (do pustej bazy). Po zmianie `001_init.sql` lokalnie:
  `docker compose -f docker-compose.dev.yml down -v` i `up -d`; na serwerze: osobny plik migracji (DEPLOY.md, krok 9).
- **Port bazy 5434, nie 5432:** na Windowsie często działa już PostgreSQL zainstalowany w systemie
  i zajmuje port 5432.
- **Szkice zostają szkicami:** strony priorytetu 2 i 3 mają w prototypie `SketchBox`. Nie przepisuj ich,
  dopóki nie dojdziemy do priorytetu 2.

## Postęp

| Część | Etapy | Gotowe |
|---|---|---|
| A. Fundamenty | 0–3 | ☐ |
| B. Layout | 4–7 | ☐ |
| C. Komponenty UI | 8–12 | ☐ |
| D. Dane i logowanie | 13–21 | ☐ |
| E. Panel właściciela | 22–28 | ☐ |
| F. Strona zawieszki i znalazca | 29–37 | ☐ |
| G. PWA i pierwsze wdrożenie | 38–42 | ☐ |
| H. Backend | 43–53 | ☐ |
| I. Integracja i pełne wdrożenie | 54–57 | ☐ |
| J. Testy | 58 | ☐ |
