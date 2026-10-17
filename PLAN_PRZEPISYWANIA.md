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

# Od sesji 14: plastry funkcji

Od tego miejsca jednostką pracy nie jest plik, tylko **jedna funkcja widoczna dla użytkownika** (plaster,
ang. *feature slice*). W każdej sesji przepisujesz z prototypu **tylko te kawałki plików**, których ta funkcja
potrzebuje — nawet jeśli plik w prototypie jest większy. Resztę pliku dopiszesz w sesji, która jej potrzebuje.
Po każdej sesji masz coś, co działa i co możesz pokazać.

**Jak czytać sesję:**
- **Cel** — jedno zdanie: co użytkownik może zrobić po tej sesji.
- **Źródło w prototypie** — pliki z `petracer/` i *dokładnie* które części. „Cały plik” znaczy cały;
  w przeciwnym razie przepisujesz tylko wymienione funkcje / komponenty.
- **Czego się uczę** — nowe pojęcia. Przed sesją napisz „sesja N”, wytłumaczę je na Twoim kodzie.
- **Gotowe, gdy** — konkretny test w przeglądarce (albo w terminalu). Dopóki nie przechodzi, sesja trwa.
- **Commit** — w stylu `typ(obszar): opis`: `feat` nowa funkcja, `refactor` przebudowa bez zmiany działania,
  `chore` konfiguracja, `docs` dokumentacja.

**Zasady, które obowiązują w każdej sesji:**
- Strony importują tylko z `src/api/` (fasady), nigdy z `api/mock/`, `api/http/` ani `mocks/`.
- Każda lista / ekran z danymi ma cztery stany: ładowanie, błąd, pusto, dane.
- Przed commitem: `npm run lint`, `npm run build`, konsola przeglądarki bez błędów.
- Po commicie dopisz w README w „Dzienniku” 2–3 zdania: co działa i czego się nauczyłeś.
- Gdy sesja okaże się za długa, przerwij po dowolnym punkcie „Źródła” — każdy jest osobnym kawałkiem.

Czas przy nazwie sesji to szacunek dla kogoś, kto robi daną rzecz pierwszy raz.

---

# Część D (ciąg dalszy) — Pierwsze działające funkcje i logowanie

## Sesja 14: Panel pokazuje moje zwierzęta · ~2 h
- **Cel:** po wejściu na `/panel` widzę spinner, a potem imiona Luny i Mruczka wczytane z „bazy” w przeglądarce.
- **Źródło w prototypie:**
  - `src/mocks/db.js` — `STORAGE_KEY`, `cache`, `load`, `getDb`, `saveDb`, `resetDb`. **Pomiń** `describeHealth`
    i `fromSeed` (Twój `seed.js` od razu ma kształt bazy, więc w `load` wołasz po prostu `createSeed()`).
  - `src/api/errors.js` — cały plik.
  - `src/api/mock/client.js` — tylko `delay`.
  - `src/api/mock/pets.js` — tylko `getPets`, **w uproszczonej wersji**: na razie bez `requireUser`
    i bez `toPet`, zwraca po prostu `getDb().pets` (logowanie i filtrowanie po właścicielu dojdą w sesji 18).
  - `src/api/pets.js` — na razie jedna linijka: `export { getPets } from './mock/pets.js'`
    (wybór mock / http dopiszesz w sesji 41).
  - `src/hooks/useAsync.js` — cały plik.
  - `src/pages/owner/DashboardPage.jsx` — tylko `PetList` i nagłówek strony. W `PetList` zamiast `PetCard`
    na razie lista imion jako linki do `/zwierzeta/:id`, zamiast `ErrorState` zwykły akapit z błędem
    i przyciskiem „Spróbuj ponownie”. **Pomiń** `RecentScans` i `Notice` o telefonie. W nagłówku zamiast
    `Cześć, {user.name}` na razie „Twoje zwierzęta” (`useAuth` jeszcze nie ma).
  - `src/router.jsx` — trasa `panel` (z etapu 3 już istnieje jako placeholder): zamień jej `element`
    na `<DashboardPage />` i dodaj import. Bez tego strona nie pojawi się w przeglądarce.
- **Czego się uczę:** localStorage i JSON, `try/catch`, referencje a kopia (`structuredClone`), Promise,
  `setTimeout`, `async`/`await`, `useEffect` z zależnościami i sprzątaniem, wyścig zapytań (flaga `ignore`).
- **Gotowe, gdy:** `/panel` pokazuje spinner ok. 0,3 s, a potem „Luna, Mruczek”. Gdy tymczasowo dopiszesz
  `throw new Error('test')` w `getPets`, pojawia się komunikat i działający „Spróbuj ponownie”. W konsoli:
  zmiana obiektu z `getDb()` **bez** `saveDb` niczego nie zmienia, a z `saveDb` przetrwa odświeżenie.
- **Commit:** `feat(owner): lista zwierząt w panelu z danych w localStorage`

## Sesja 15: Karty zwierząt z wiekiem, zaginięciem i zawieszką · ~1,5 h
- **Cel:** panel pokazuje karty zwierząt z awatarem, rasą, wiekiem, czerwonym oznaczeniem zaginięcia i kodem zawieszki.
- **Źródło w prototypie:**
  - `src/lib/format.js` — tylko `plural`, `formatAge`, `speciesLabel` (reszta dojdzie w kolejnych sesjach).
  - `src/components/pets/PetAvatar.jsx`, `PetCard.jsx` — całe pliki.
  - `src/api/mock/client.js` — `toPet` (dokleja `tagCode` aktywnej zawieszki i usuwa `ownerId`).
  - `src/api/mock/pets.js` — w `getPets` dodaj `.map((pet) => toPet(db, pet))`.
  - `src/pages/owner/DashboardPage.jsx` — w `PetList` lista imion → siatka `PetCard`.
  - `src/components/ui/ErrorState.jsx` — cały plik; podmień nim akapit z błędem w `PetList`.
- **Czego się uczę:** komponent prezentacyjny, wartości wyliczane w renderze, `Intl` i polska odmiana
  liczebników (1 rok, 2 lata, 5 lat), daty bez godziny a strefa czasowa, dane wyliczane przy odczycie
  (jak `LEFT JOIN` w SQL).
- **Gotowe, gdy:** na 375 px i na komputerze widać dwie karty; Mruczek ma czerwoną obwódkę i „Zaginione”,
  obie karty mają kod zawieszki w czcionce monospace, kliknięcie prowadzi do `/zwierzeta/:id`.
- **Commit:** `feat(owner): karty zwierząt z wiekiem, zaginięciem i kodem zawieszki`

## Sesja 16: Proszę o link do logowania · ~1,5 h
- **Cel:** wpisuję e-mail na `/login`, widzę „Sprawdź pocztę” i przycisk „[DEV] Symuluj kliknięcie w link”.
- **Źródło w prototypie:**
  - `src/lib/redirect.js` — cały plik.
  - `src/api/mock/auth.js` — tylko `EMAIL_PATTERN`, `LINK_TTL_MS` i `requestMagicLink`.
  - `src/api/auth.js` — na razie `export { requestMagicLink } from './mock/auth.js'` + komentarz z opisem
    funkcji (przepisz cały komentarz z prototypu — to specyfikacja przyszłego backendu).
  - `src/pages/public/LoginPage.jsx` — tylko komponent `LoginPage`, **bez** sprawdzania `user` na górze
    (nie ma jeszcze `useAuth`) i **bez** `DemoLogin`. `next` na razie `null`.
  - `src/pages/public/CheckEmailPage.jsx` — cały plik.
- **Czego się uczę:** input kontrolowany, `onSubmit` + `preventDefault`, `noValidate`, blokowanie przycisku
  w trakcie wysyłki, `useNavigate` ze `state`, jednorazowy token z datą ważności, `URLSearchParams`,
  dlaczego prośba o link jeszcze **nie** zakłada konta (token pamięta e-mail, konto powstanie po kliknięciu).
- **Gotowe, gdy:** pusty i błędny e-mail pokazują błąd pod polem; poprawny prowadzi na `/login/sprawdz-poczte`
  z Twoim adresem; w Local Storage w `loginTokens` jest nowy token z Twoim e-mailem i `expiresAt` za 15 minut,
  a nowy adres **nie** pojawia się w `users`; odświeżenie strony „Sprawdź pocztę” pokazuje „Wróć do logowania”.
- **Commit:** `feat(auth): formularz prośby o link do logowania`

## Sesja 17: Klikam link i jestem zalogowany · ~2 h
- **Cel:** „Symuluj kliknięcie” loguje mnie i przenosi do panelu, a w sidebarze widzę swoje imię — także po odświeżeniu.
- **Źródło w prototypie:**
  - `src/api/mock/client.js` — `TOKEN_KEY`, `getAuthToken`, `setAuthToken`, `clearAuthToken`,
    `findSessionUser`, `toUser`.
  - `src/api/mock/auth.js` — `verifyToken`, `getCurrentUser`, `logout`.
  - `src/api/auth.js` — dopisz te trzy funkcje do eksportu.
  - `src/context/AuthContext.js` — cały plik.
  - `src/context/AuthProvider.jsx` — cały, **bez** `loginAsDemo` (dojdzie w sesji 19).
  - `src/hooks/useAuth.js` — cały plik.
  - `src/main.jsx` — owinięcie `RouterProvider` w `AuthProvider`.
  - `src/pages/public/AuthVerifyPage.jsx` — cały plik.
  - `src/components/layout/Sidebar.jsx` — linijka z „Zalogowano jako {user.name}”.
  - `src/pages/owner/DashboardPage.jsx` — nagłówek „Cześć, {user.name}”.
- **Czego się uczę:** Context (`createContext`, `useContext`), prop drilling, własny hook, `useMemo`,
  stan „jeszcze nie wiadomo” (`isLoading`), `useSearchParams`, podwójny efekt w `StrictMode` i `useRef`
  jako zabezpieczenie, sesja jako token w localStorage (i dlaczego prawdziwy serwer zrobi to inaczej),
  rejestracja przy pierwszym logowaniu (konto zakłada `verifyToken`, gdy e-maila nie ma w `users`).
- **Gotowe, gdy:** po kliknięciu linku jesteś na `/panel` z „Cześć, Maciej”; po odświeżeniu nadal jesteś
  zalogowany; ponowne otwarcie tego samego linku pokazuje „Nie udało się zalogować”; link dla nowego adresu
  z imieniem „Ola” zakłada konto (widać je w `users`) i wita „Cześć, Ola”; w konsoli brak błędów
  mimo `StrictMode`.
- **Commit:** `feat(auth): weryfikacja linku i kontekst zalogowanego użytkownika`

## Sesja 18: Panel tylko dla zalogowanych, powrót po logowaniu i wylogowanie · ~1,5 h
- **Cel:** niezalogowany trafia z `/panel` na `/login`, po zalogowaniu wraca tam, skąd przyszedł; „Wyloguj się” działa.
- **Źródło w prototypie:**
  - `src/components/layout/RequireAuth.jsx` — cały plik; w `src/router.jsx` owiń nim grupę właściciela.
  - `src/api/mock/client.js` — `requireUser`.
  - `src/api/mock/pets.js` — `getPets` w pełnej wersji: `requireUser` i filtr po `ownerId`.
  - `src/pages/public/LoginPage.jsx` — górna część: `from`/`next` z `location.state` i
    `if (user) return <Navigate …>`.
  - `src/pages/owner/SettingsPage.jsx` — tylko nagłówek i przycisk „Wyloguj się” z `handleLogout`.
- **Czego się uczę:** `<Navigate>`, `replace`, `state` w nawigacji, open redirect (dlaczego `safeRedirect`),
  kolejność „najpierw nawigacja, potem wylogowanie”, 401 jako „brak sesji”.
- **Gotowe, gdy:** wylogowany wchodzi na `/ustawienia` → `/login` → „Symuluj kliknięcie” → wraca na
  **`/ustawienia`**. Odświeżenie zalogowanej strony nie wyrzuca na `/login`. Wylogowanie przenosi na `/`.
  Nowe konto (inny e-mail) widzi pusty panel z `EmptyState`.
- **Commit:** `feat(auth): ochrona panelu, powrót po zalogowaniu i wylogowanie`

## Sesja 19: Wchodzę na konto demo jednym przyciskiem · ~0,5 h
- **Cel:** na `/login` jest przycisk „Wejdź na konto demo”, który od razu loguje na konto Macieja.
- **Źródło w prototypie:**
  - `src/api/mock/auth.js` — `DEMO_EMAIL`, `getDemoLogin`, `loginAsDemo`; dopisz je do fasady `api/auth.js`.
  - `src/context/AuthProvider.jsx` — `loginAsDemo`.
  - `src/pages/public/LoginPage.jsx` — komponent `DemoLogin` i jego użycie pod formularzem.
- **Czego się uczę:** komponent, który sam decyduje, czy się pokazać (`return null`), reakcja na zmianę
  kontekstu (`<Navigate>` przenosi sam, bez `navigate()`).
- **Gotowe, gdy:** jedno kliknięcie na `/login` przenosi do panelu z Luną i Mruczkiem.
- **Commit:** `feat(auth): logowanie na konto demo jednym przyciskiem`

> **Kamień milowy M1:** logowanie na danych przykładowych, ochrona tras, powrót na stronę sprzed logowania.

---

# Część E — Panel właściciela

## Sesja 20: Profil zwierzęcia — dane i zdrowie · ~1,5 h
- **Cel:** klikam kartę Luny i widzę jej profil z zakładkami „Dane” i „Zdrowie”, a zakładka zostaje po odświeżeniu.
- **Źródło w prototypie:**
  - `src/api/mock/client.js` — `findOwnPet`.
  - `src/api/mock/pets.js` — `getPetById`; dopisz do fasady.
  - `src/lib/format.js` — `formatDate`, `formatWeight`.
  - `src/pages/owner/PetProfilePage.jsx` — `TABS` (na razie bez `activity`), `PetProfilePage` **bez**
    `updatedPet` i `LostModeSwitch`, oraz `ProfileHeader`, `ProfileTabs`, `InfoTab`, `HealthTab`.
  - `src/router.jsx` — trasa `zwierzeta/:id`.
- **Czego się uczę:** pobieranie zależne od parametru URL (`useParams` + `useAsync`), stan w adresie
  (`?tab=health`) zamiast w `useState`, `replace` przy zmianie zakładki, `<dl>`, `whitespace-pre-line`,
  „cudze = 404”.
- **Gotowe, gdy:** `/zwierzeta/luna?tab=health` pokazuje uwagi medyczne Luny; przełączanie zakładek zmienia
  adres, a odświeżenie zostawia tę samą; `/zwierzeta/xyz` pokazuje „Nie znaleziono zwierzęcia”.
- **Commit:** `feat(owner): profil zwierzęcia z zakładkami w adresie`

## Sesja 21: Dodaję nowe zwierzę · ~2–3 h
- **Cel:** przycisk „Dodaj zwierzę” otwiera formularz, a po zapisie widzę profil nowego zwierzęcia.
- **Źródło w prototypie:**
  - `src/api/mock/pets.js` — `EDITABLE_FIELDS`, `pickEditable`, `validate`, `createPet`; dopisz do fasady.
  - `src/components/ui/Notice.jsx` — cały plik.
  - `src/components/pets/PetForm.jsx` — cały plik.
  - `src/pages/owner/PetNewPage.jsx` — cały plik; trasa `zwierzeta/nowe` w routerze.
  - `src/pages/owner/DashboardPage.jsx` — przycisk „Dodaj zwierzę” w nagłówku i w `EmptyState`.
- **Czego się uczę:** stan formularza jako obiekt, jeden `handleChange` po atrybucie `name`, walidacja
  w przeglądarce i „na serwerze”, zamiana danych API na wartości pól (`null` → `''`), błąd z API pokazany
  w formularzu, lista dozwolonych pól.
- **Gotowe, gdy:** pusty formularz pokazuje błąd przy imieniu; waga „12,5” (z przecinkiem) się zapisuje;
  data z przyszłości daje błąd; po zapisie jesteś na profilu nowego zwierzęcia, a w panelu jest jego karta
  (także po odświeżeniu).
- **Commit:** `feat(owner): dodawanie zwierzęcia`

## Sesja 22: Edytuję zwierzę · ~1 h
- **Cel:** przycisk „Edytuj” w profilu otwiera ten sam formularz z danymi zwierzęcia i zapisuje zmiany.
- **Źródło w prototypie:**
  - `src/api/mock/pets.js` — `updatePet`; dopisz do fasady.
  - `src/pages/owner/PetEditPage.jsx` — cały plik; trasa `zwierzeta/:id/edytuj`.
- **Czego się uczę:** ponowne użycie komponentu w dwóch trybach, `key` do zresetowania stanu formularza,
  aktualizacja bez mutacji (`{ ...pet, ...zmiany }`).
- **Gotowe, gdy:** zmiana rasy Luny jest widoczna w profilu i po odświeżeniu; „Anuluj” wraca do profilu bez zmian.
- **Commit:** `feat(owner): edycja profilu zwierzęcia`

## Sesja 23: Ustawiam numer telefonu dla znalazcy · ~1 h
- **Cel:** w ustawieniach zmieniam imię i telefon, a panel ostrzega, gdy telefonu brak.
- **Źródło w prototypie:**
  - `src/api/mock/auth.js` — `PHONE_PATTERN`, `updateSettings`; dopisz do fasady.
  - `src/context/AuthProvider.jsx` — `updateUser`.
  - `src/pages/owner/SettingsPage.jsx` — cały plik (formularz + wylogowanie z sesji 18).
  - `src/pages/owner/DashboardPage.jsx` — `Notice` „Dodaj numer telefonu”.
- **Czego się uczę:** aktualizacja danych w kontekście po zapisie, status formularza jako jeden napis
  (`idle` / `saving` / `saved` / `error`), `type="tel"` i `autoComplete`.
- **Gotowe, gdy:** zmiana imienia od razu zmienia sidebar; błędny numer pokazuje błąd; konto bez telefonu
  widzi w panelu żółte ostrzeżenie, które znika po zapisaniu numeru.
- **Commit:** `feat(owner): ustawienia z imieniem i numerem telefonu`

> **Kamień milowy M2:** dodanie, edycja i profil zwierzęcia; zmiany zachowane po odświeżeniu.

---

# Część F — Zawieszka i znalazca

## Sesja 24: Znalazca skanuje tag i widzi profil zwierzaka · ~2 h
- **Cel:** niezalogowana osoba wchodzi na `/t/LUNA-7K2Q` i widzi imię, uwagi medyczne i przycisk „Zadzwoń do opiekuna”.
- **Źródło w prototypie:**
  - `src/api/mock/tags.js` — `resolveTag` **bez** `recordScan` i bez gałęzi `owner` i `lost`
    (zostają: nieznany kod → `inactive`, zwierzę → `found`). Utwórz fasadę `api/tags.js` z pełnym komentarzem
    o wariantach.
  - `src/lib/sms.js` — tylko `normalizePhone` i `buildTelLink`.
  - `src/components/finder/ActionLink.jsx`, `MedicalNotes.jsx`, `InactiveTagView.jsx`, `FoundView.jsx` — całe pliki.
  - `src/pages/finder/TagPage.jsx` — `TagContent` z wariantami `found` i `inactive` oraz `Loading`.
    `TagPage` na razie zwraca po prostu `<TagContent code={tagId} />` (czekanie na `useAuth` dojdzie w sesji 28).
  - `src/router.jsx` — trasa `t/:tagId` w `FinderLayout`.
- **Czego się uczę:** routing kontekstowy (D6) — o widoku decyduje „serwer”, a nie strona; zwracanie tylko
  potrzebnych danych; `switch` po wariancie; link `tel:` jako `<a href>` (a nie `<Link>`); projektowanie pod stres.
- **Gotowe, gdy:** po wylogowaniu `/t/LUNA-7K2Q` pokazuje profil Luny z przyciskiem ≥ 56 px prowadzącym do
  `tel:+48600123456`, a numeru ani imienia opiekuna **nie ma na ekranie**; `/t/XXXX-0000` i `/t/ABCD-EFGH`
  pokazują „Ten tag nie jest aktywny”; kod małymi literami (`/t/luna-7k2q`) też działa.
- **Commit:** `feat(finder): profil zwierzaka po zeskanowaniu zawieszki`

## Sesja 25: Zaginione zwierzę — alarm dla znalazcy · ~1 h
- **Cel:** zawieszka zaginionego Mruczka pokazuje czerwony alarm z komunikatem i numerem opiekuna.
- **Źródło w prototypie:**
  - `src/api/mock/tags.js` — w `resolveTag` gałąź `lost` (z `phone` i `message`).
  - `src/components/finder/LostView.jsx` — cały plik (przycisk SMS prowadzi na razie do strony, której jeszcze
    nie ma — to normalne, zrobisz ją w sesji 27).
  - `src/pages/finder/TagPage.jsx` — `case 'lost'`.
- **Czego się uczę:** jednoznaczny komunikat alarmowy, kiedy numer jest widoczny, a kiedy nie (D5),
  `state` przekazany w `<Link>`.
- **Gotowe, gdy:** po wylogowaniu `/t/MRCZ-4P9D` pokazuje czerwony nagłówek „Zaginione zwierzę”, komunikat
  o Mruczku, numer telefonu i przyciski „Wyślij SMS z lokalizacją” oraz „Zadzwoń”.
- **Commit:** `feat(finder): widok alarmowy dla zaginionego zwierzęcia`

## Sesja 26: Włączam tryb zaginięcia w profilu · ~1,5 h
- **Cel:** w profilu przestawiam „Zaginione”, potwierdzam w oknie z komunikatem, a strona zawieszki pokazuje alarm.
- **Źródło w prototypie:**
  - `src/api/mock/pets.js` — `setLostMode`; dopisz do fasady.
  - `src/components/pets/LostModeSwitch.jsx` — cały plik.
  - `src/pages/owner/PetProfilePage.jsx` — `updatedPet` i wyliczenie `pet` w `PetProfilePage`,
    `<LostModeSwitch>`, odznaka „Zaginione” w `ProfileHeader`.
- **Czego się uczę:** potwierdzenie akcji w `Modal`, przełącznik, który nie zmienia stanu od razu,
  aktualizacja widoku danymi zwróconymi przez API (bez ponownego ładowania), `key` przy zmianie zwierzęcia.
- **Gotowe, gdy:** włączenie trybu dla Luny z komunikatem daje czerwone oznaczenie w profilu i na karcie,
  a po wylogowaniu `/t/LUNA-7K2Q` pokazuje alarm z Twoim komunikatem. Wyłączenie też wymaga potwierdzenia.
- **Commit:** `feat(owner): przełącznik trybu zaginięcia z potwierdzeniem`

## Sesja 27: Znalazca wysyła mi SMS z lokalizacją · ~2–3 h
- **Cel:** z widoku alarmowego znalazca pobiera swoją pozycję i otwiera gotowy SMS z linkiem do mapy.
- **Źródło w prototypie:**
  - `src/hooks/useGeolocation.js` — cały plik.
  - `src/lib/sms.js` — `isIOS`, `buildSmsLink`, `mapsLink`, `buildFinderMessage`.
  - `src/pages/finder/ShareLocationPage.jsx` — cały plik; trasa `t/:tagId/lokalizacja`.
- **Czego się uczę:** Geolocation API (callback, zgoda, kody błędów), dlaczego tylko HTTPS/localhost,
  link `sms:` i różnice Android / iOS, `encodeURIComponent`, wyjście awaryjne bez lokalizacji,
  dane, które celowo **nie** trafiają do bazy (D4, RODO).
- **Gotowe, gdy:** w DevTools → ⋮ → More tools → Sensors ustawiasz pozycję, a link „Otwórz SMS” zawiera numer
  i `https://maps.google.com/?q=…`; przy „Block” jest „SMS bez lokalizacji” z prośbą o opis miejsca;
  w emulacji iPhone'a separator to `&body=`, na Androidzie `?body=`; odświeżenie strony lokalizacji działa.
- **Commit:** `feat(finder): SMS z lokalizacją do opiekuna`

## Sesja 28: Skanuję własny tag i zapisuję karmienie · ~1,5 h
- **Cel:** zalogowany właściciel po wejściu na swoją zawieszkę widzi przyciski „Karmienie” i „Spacer”, a kliknięcie zapisuje aktywność.
- **Źródło w prototypie:**
  - `src/api/mock/tags.js` — w `resolveTag` sprawdzenie `isOwner` (`findSessionUser`) i gałąź `owner`
    **przed** `lost`.
  - `src/api/mock/activities.js` — tylko `logActivity`; utwórz fasadę `api/activities.js`.
  - `src/components/finder/OwnerQuickLog.jsx` — cały plik.
  - `src/lib/format.js` — `formatRelative`.
  - `src/pages/finder/TagPage.jsx` — pełny `TagPage`: czekanie na `isLoading` z `useAuth` i
    `key={user?.id ?? 'anonymous'}`; `case 'owner'`.
- **Czego się uczę:** kolejność warunków w routingu kontekstowym (właściciel przed alarmem — dlaczego?),
  `key` do ponownego pobrania po zmianie użytkownika, stan „zapisano” po akcji, blokowanie przycisków w trakcie zapisu.
- **Gotowe, gdy:** zalogowany na `/t/LUNA-7K2Q` widzi szybki zapis, po „Karmienie” pojawia się
  „Zapisano karmienie (dziś, …)”; zalogowany **innym** e-mailem widzi na tej samej zawieszce zwykły profil;
  właściciel zaginionego Mruczka na `/t/MRCZ-4P9D` widzi szybki zapis, a nie alarm.
- **Commit:** `feat(finder): szybki zapis aktywności po zeskanowaniu własnej zawieszki`

## Sesja 29: Widzę aktywność z ostatnich 7 dni · ~1,5 h
- **Cel:** w profilu zakładka „Aktywność” pokazuje podsumowanie i listę karmień i spacerów z tygodnia.
- **Źródło w prototypie:**
  - `src/api/mock/activities.js` — `getActivities`; dopisz do fasady.
  - `src/lib/format.js` — `formatDuration`, `formatDistance`.
  - `src/components/pets/ActivityList.jsx` — cały plik.
  - `src/pages/owner/PetProfilePage.jsx` — zakładka `activity` w `TABS` i komponent `ActivityTab`.
- **Czego się uczę:** filtrowanie po dacie, sortowanie napisów ISO (`localeCompare`), sumowanie `reduce`,
  `StatTile` i `tabular-nums`, odznaka zamiast tekstu („Po skanie”).
- **Gotowe, gdy:** Luna ma kafelki „Spacery / Karmienia / Czas spacerów” i listę z 7 dni; karmienie zapisane
  w sesji 28 jest na górze z odznaką „Po skanie”; nowe zwierzę widzi stan pusty z podpowiedzią.
- **Commit:** `feat(owner): aktywność zwierzęcia z ostatnich 7 dni`

## Sesja 30: Każde skanowanie zapisuje się, a ja widzę je w panelu · ~1,5 h
- **Cel:** każde otwarcie strony zawieszki zapisuje skan, a panel pokazuje ostatnie skanowania z przeglądarką.
- **Źródło w prototypie:**
  - `src/api/mock/tags.js` — `DUPLICATE_SCAN_MS`, `recordScan` (i jego wywołanie w `resolveTag`),
    `scansOf`, `getRecentScans`; dopisz do fasady.
  - `src/lib/format.js` — `describeUserAgent`.
  - `src/components/tags/ScanList.jsx` — cały plik.
  - `src/pages/owner/DashboardPage.jsx` — komponent `RecentScans` i jego sekcja.
- **Czego się uczę:** audyt bezpieczeństwa (UC8), minimalizacja danych (bez IP i lokalizacji), ochrona
  przed podwójnym zapisem, łączenie danych z trzech kolekcji (jak `JOIN`), rozpoznawanie przeglądarki po User-Agent.
- **Gotowe, gdy:** panel pokazuje skany z danych przykładowych („Safari · iOS”, „Chrome · Android”);
  po wylogowaniu wejdź na `/t/LUNA-7K2Q`, zaloguj się — nowy skan jest na górze jako „Inna osoba”.
  Skan własnej zawieszki jest oznaczony „Ty”. (W trybie mock nie testuj w oknie incognito — ma osobny localStorage.)
- **Commit:** `feat(owner): zapis skanowań i ostatnie skanowania w panelu`

## Sesja 31: Tworzę zawieszkę z kodem QR · ~2 h
- **Cel:** dla nowego zwierzęcia klikam „Utwórz zawieszkę” i dostaję kod `XXXX-XXXX`, kod QR, adres do NFC i plik do druku.
- **Źródło w prototypie:**
  - `npm install qrcode.react`
  - `src/api/mock/tags.js` — `ALPHABET`, `generateTagCode`, `createTag`; dopisz do fasady.
  - `src/pages/owner/PetTagPage.jsx` — `PetTagPage` (bez `<ScanHistory>`), `useCreateTag`, `CreateTag`,
    `TagDetails` **bez** modala „Nowy kod” i bez `handleRegenerate`.
  - `src/router.jsx` — trasa `zwierzeta/:id/tag`.
- **Czego się uczę:** losowość kryptograficzna (`crypto.getRandomValues`), alfabet bez mylących znaków,
  `QRCodeSVG`, `window.location.origin`, schowek (`navigator.clipboard`), pobieranie pliku z `Blob`,
  własny hook z logiką akcji (`useCreateTag`), warunek wstępny (bez telefonu nie ma zawieszki).
- **Gotowe, gdy:** nowe zwierzę dostaje kod bez `0`, `O`, `1`, `I`, `L`; „Kopiuj” kopiuje adres;
  „Pobierz QR (SVG)” zapisuje plik; aparat telefonu odczytuje QR z ekranu (adres z `localhost` nie otworzy się
  na telefonie — to normalne); konto bez telefonu widzi prośbę o uzupełnienie ustawień.
- **Commit:** `feat(tags): generowanie zawieszki z kodem QR`

## Sesja 32: Historia skanowań zawieszki i nowy kod · ~1 h
- **Cel:** na stronie zawieszki widzę wszystkie jej skanowania i mogę wygenerować nowy kod, który wyłącza stary.
- **Źródło w prototypie:**
  - `src/api/mock/tags.js` — `getTagScans`; dopisz do fasady.
  - `src/pages/owner/PetTagPage.jsx` — komponent `ScanHistory` (z `key={pet.tagCode}`) oraz w `TagDetails`
    przycisk „Nowy kod”, `Modal` i `handleRegenerate`.
- **Czego się uczę:** akcja nieodwracalna w oknie potwierdzenia, `key` do przeładowania sekcji,
  dlaczego stary kod zostaje w bazie jako nieaktywny (historia, „jeden aktywny tag na zwierzę”).
- **Gotowe, gdy:** historia pokazuje skany z przeglądarką i „Ty / Inna osoba”; po „Nowy kod” stary adres
  pokazuje „Ten tag nie jest aktywny”, a nowy działa.
- **Commit:** `feat(tags): historia skanowań i wymiana kodu zawieszki`

## Sesja 33: Panel DEV do pokazu (opcjonalnie) · ~1 h
- **Cel:** w rogu ekranu w `npm run dev` mam panel, którym w kilka sekund pokazuję wszystkie warianty zawieszki.
- **Źródło w prototypie:**
  - `src/api/mock/dev.js` — cały plik.
  - `src/dev/DevPanel.jsx` — cały plik, **bez** gałęzi `isMock ? … : …` dla trybu http (dopiszesz w sesji 42,
    jeśli zechcesz) i bez `API_MODE` w etykiecie.
  - `src/components/layout/RootLayout.jsx` — `{import.meta.env.DEV && <DevPanel />}`.
- **Czego się uczę:** `import.meta.env.DEV`, usuwanie kodu z wersji produkcyjnej, `sessionStorage`,
  zamykanie Escape (`addEventListener` + sprzątanie).
- **Gotowe, gdy:** panel przełącza logowanie i tryb zaginięcia, resetuje dane; po `npm run build && npm run preview` panelu nie ma.
- **Commit:** `feat(dev): panel deweloperski do demonstracji wariantów`

## Sesja 34: Strona główna z ilustracją (opcjonalnie) · ~1–1,5 h
- **Cel:** strona główna ma ilustrację zawieszki i telefonu oraz trzy kroki „Jak działa tag”.
- **Źródło w prototypie:**
  - `src/components/landing/HeroIllustration.jsx`, `HowItWorksStep.jsx` — całe pliki (ilustrację możesz
    narysować prostszą, po swojemu).
  - `src/pages/public/LandingPage.jsx` — cały plik.
- **Czego się uczę:** SVG w JSX (`viewBox`, `path`, `ellipse`), kolory z tokenów w SVG (`fill-pine`),
  `role="img"` + `aria-label`, `<ol>` jako kroki.
- **Gotowe, gdy:** na 375 px ilustracja jest pod tekstem, na komputerze obok; DevTools → Accessibility
  pokazuje opis obrazka.
- **Commit:** `feat(public): ilustracja i kroki na stronie głównej`

> **Kamień milowy M3:** cztery warianty strony zawieszki, tryb zaginięcia, SMS z lokalizacją, zawieszka z QR.

---

# Część G — PWA i pierwsze wdrożenie

Wcześnie, bo HTTPS jest wymagany przez geolokalizację i service worker, a problemy z serwerem lepiej
odkryć teraz niż tydzień przed obroną. Wdrażasz **sam frontend** na danych przykładowych.

## Sesja 35: Instaluję aplikację na telefonie (PWA) · ~1,5 h
- **Cel:** aplikację da się zainstalować z przeglądarki, ma ikonę PetTrace i otwiera się bez paska adresu.
- **Źródło w prototypie:**
  - `npm install -D vite-plugin-pwa`
  - `scripts/generate-icons.mjs` — cały plik (uruchom `node scripts/generate-icons.mjs`) albo własne ikony
    192, 512, maskable 512 i apple-touch 180 z dowolnego programu.
  - `vite.config.js` — blok `VitePWA({ … })`.
  - `index.html` — `<link rel="apple-touch-icon">`.
- **Czego się uczę:** manifest, service worker, precache, ikona maskable, dlaczego `/api` nie trafia do cache,
  jak zbudowany jest plik PNG (jeśli przepisujesz generator).
- **Gotowe, gdy:** po `npm run build && npm run preview` w DevTools → Application widać manifest i aktywny
  service worker, w pasku adresu jest ikona instalacji, a w trybie Offline strona się otwiera.
- **Commit:** `feat(pwa): manifest, ikony i service worker`

## Sesja 36: Aplikacja działa w Dockerze na moim komputerze · ~2–3 h
- **Cel:** jednym poleceniem `docker compose up --build` uruchamiam zbudowaną aplikację pod `http://localhost:8080`.
- **Źródło w prototypie:**
  - Najpierw porządek (D18): przenieś frontend do `client/` — `git mv src public index.html vite.config.js
    eslint.config.js package.json package-lock.json scripts client/`, w `client/` `npm install`.
  - `Dockerfile` → u Ciebie `client/Dockerfile` — cały plik **bez** linijki `ENV VITE_API_MODE=http`.
  - `Caddyfile` → `client/Caddyfile` — cały plik **bez** bloku `handle /api/*`.
  - `.dockerignore` → `client/.dockerignore`.
  - `docker-compose.yml` — tylko `name:` i usługa `caddy` z wolumenami `caddy-data`, `caddy-config`.
    Nazwa projektu **`name: pettrace`** (inna niż prototyp `petrace` — na serwerze będą działać oba).
- **Czego się uczę:** obraz i kontener, `Dockerfile`, budowanie wieloetapowe, `docker compose`, wolumen,
  serwer wejściowy (reverse proxy), aplikacja jednostronicowa (`try_files`), cache plików z hashem w nazwie,
  `trusted_proxies`.
- **Gotowe, gdy:** `http://localhost:8080/t/LUNA-7K2Q` działa, odświeżenie dowolnej podstrony nie daje 404,
  a `docker compose down` i `up` uruchamiają wszystko ponownie.
- **Commit:** `chore(deploy): obraz Docker z Caddy dla frontendu`

## Sesja 37: Aplikacja działa pod app.petracker.pl · ~2 h
- **Cel:** moja wersja działa na serwerze przez HTTPS pod `app.petracker.pl`, obok prototypu.
- **Źródło w prototypie:** `DEPLOY.md`, sekcja 14 (serwer z nginx — tak jest skonfigurowany Twój VPS):
  - rekord DNS **A**: `app` → IP serwera,
  - na serwerze `git clone … ~/pettrace`, w `.env`: `SITE_ADDRESS=:80`, `HTTP_PORT=127.0.0.1:8081`,
    `HTTPS_PORT=127.0.0.1:8444`, potem `docker compose up -d --build`,
  - plik `/etc/nginx/sites-available/app.petracker.pl` z `proxy_pass http://127.0.0.1:8081`,
    `sudo ln -s` do `sites-enabled`, `sudo nginx -t && sudo systemctl reload nginx`,
  - `sudo certbot --nginx -d app.petracker.pl`.
- **Czego się uczę:** SSH, DNS, subdomena, nginx jako reverse proxy, certyfikat Let's Encrypt, port dostępny
  tylko z serwera (`127.0.0.1`), `.env` poza repozytorium, `git pull` jako sposób aktualizacji.
- **Gotowe, gdy:** `https://app.petracker.pl` ma kłódkę, aplikację da się zainstalować na telefonie (T15),
  prototyp pod `petracker.pl` działa dalej. (W trybie mock każdy telefon ma własne dane.)
- **Commit:** `docs(deploy): wdrożenie frontendu na app.petracker.pl`

## Sesja 38: Prawdziwa zawieszka otwiera aplikację · ~1–2 h
- **Cel:** przykładam telefon do tagu NFC albo skanuję nadrukowany QR i otwiera się strona zawieszki.
- **Źródło w prototypie:** `DEPLOY.md`, sekcja 12; tabela `docs/09-testy.md`.
- **Czego się uczę:** NDEF i rekord URL, NTAG213/215/216, dlaczego nie blokować tagu, czytelność kodu QR.
- **Gotowe, gdy:** tag z adresem `https://app.petracker.pl/t/LUNA-7K2Q` (niezablokowany) i wydrukowany QR
  otwierają stronę na Androidzie i iPhonie; wyniki T1–T9, T15–T16 są wpisane do tabeli testów.
- **Commit:** `docs(tests): pierwsza seria testów na urządzeniach`

> **Kamień milowy M4:** aplikacja pod własną domeną przez HTTPS, instalacja jako PWA, skan prawdziwej zawieszki.

---

# Część H — Backend, plaster po plastrze

Każda sesja przenosi **jedną funkcję** z `api/mock/` na prawdziwy serwer: piszesz trasę w Expressie,
zapytanie SQL i funkcję w `api/http/`, a potem przełączasz tę jedną funkcję w fasadzie. Funkcje mock są
Twoją specyfikacją — serwer ma zwracać dokładnie te same pola.

Tryb `mock` (`npm run dev`) działa przez cały czas. Tryb `http` (`npm run dev:http`) działa w tych częściach
aplikacji, które już przeniosłeś — to normalne, że reszta jeszcze nie.

**Testowanie serwera bez frontendu:** `curl` w terminalu albo rozszerzenie REST Client / Thunder Client w VS Code.

## Sesja 39: Serwer odpowiada · ~1,5 h
- **Cel:** uruchamiam własny serwer Express i widzę jego odpowiedź pod `http://localhost:5173/api/health`.
- **Źródło w prototypie:**
  - `server/package.json` — `"type": "module"`, skrypty `dev` (`node --watch src/index.js`) i `start`;
    `npm install express`.
  - `server/src/app.js` — `createApp` z samą trasą `/api/health` (bez routerów, cookie-parser i obsługi błędów).
  - `server/src/index.js` — tylko `createApp().listen(…)` (bez bazy i danych przykładowych).
  - `server/eslint.config.js`, `server/.gitignore` — całe pliki.
  - `client/vite.config.js` — sekcja `server.proxy`.
- **Czego się uczę:** Node.js (JavaScript poza przeglądarką), moduły ES w Node, HTTP (metoda, adres,
  nagłówki, kod, treść), Express: trasa, `req`, `res.json`, port, przeładowanie przy zmianach, proxy Vite
  (dlaczego jedna domena = brak CORS).
- **Gotowe, gdy:** `curl http://localhost:3000/api/health` i `http://localhost:5173/api/health` w przeglądarce
  zwracają `{"ok":true}`; zmiana tekstu w trasie przeładowuje serwer sam.
- **Commit:** `feat(server): szkielet serwera Express z trasą health`

## Sesja 40: Baza danych z tabelami i Luną w środku · ~2–3 h
- **Cel:** PostgreSQL działa w Dockerze, ma wszystkie tabele i dane przykładowe, a serwer łączy się z nim przy starcie.
- **Źródło w prototypie:**
  - `docker-compose.dev.yml` — cały plik (port `5434`).
  - `server/sql/001_init.sql` — cały plik; pisz po jednej tabeli i porównuj z polami w swoim `mocks/seed.js`.
  - `server/sql/seed.sql` — cały plik (te same dane co w `seed.js`, tylko w SQL).
  - `server/.env.example` — cały plik (skopiuj do `server/.env`); `npm install pg dotenv`.
  - `server/src/config.js` — `required` i z obiektu `config` tylko `isProduction`, `port`, `databaseUrl`,
    `seedDemoData` (resztę pól dopiszesz w kolejnych sesjach).
  - `server/src/db.js` — `pool`, parsery typów, `query` (bez `withTransaction`).
  - `server/src/seed.js`, `server/scripts/db-reset.js` — całe pliki; skrypt `db:reset` w `package.json`.
  - `server/src/index.js` — `SELECT 1` i `seedDemoDataIfEmpty` przed startem.
- **Czego się uczę:** relacyjna baza danych, typy kolumn, klucz główny i obcy, `UNIQUE`, `CHECK`, `DEFAULT`,
  `ON DELETE`, indeks (też częściowy `WHERE is_active`), `psql`, zmienne środowiskowe, pula połączeń,
  zapytanie z parametrami (`$1`) i SQL injection.
- **Gotowe, gdy:** `docker compose -f docker-compose.dev.yml exec db psql -U petrace -d petrace` → `\dt`
  pokazuje 7 tabel, a `SELECT name, is_lost FROM pets;` — Lunę i Mruczka; drugi start serwera nie dubluje danych;
  `npm run db:reset` przywraca stan początkowy.
- **Commit:** `feat(server): schemat PostgreSQL i dane przykładowe`

## Sesja 41: Prośba o link trafia do prawdziwego serwera · ~2–3 h
- **Cel:** w trybie `http` wpisuję e-mail na `/login`, a link logowania pojawia się w konsoli serwera.
- **Źródło w prototypie:**
  - `server/src/errors.js`, `server/src/middleware/errorHandler.js` — całe pliki.
  - `server/src/validation.js` — `EMAIL_PATTERN`, `text`, `parseEmail`, `parseOptionalName`.
  - `server/src/services/tokens.js` — cały plik.
  - `server/src/services/mail.js` — tylko gałąź „brak SMTP → `console.log`” (bez `nodemailer`).
  - `server/src/config.js` — `appUrl`, `isLocalApp`, `exposeDevLink`.
  - `server/src/routes/auth.js` — `safeNextPath` i `POST /request-link` **bez** `limitByIp` / `limitByEmail`
    (dojdą w sesji 45).
  - `server/src/app.js` — `express.json`, `app.use('/api/auth', authRouter)`, `notFound`, `errorHandler`.
  - Frontend: `client/.env.http` i skrypt `dev:http`; `src/api/http/request.js` — cały plik;
    `src/api/http/auth.js` — tylko `requestMagicLink`.
  - `src/api/auth.js` — przejście na wybór per funkcja: `const useHttp = …` i
    `export const requestMagicLink = useHttp ? http.requestMagicLink : mock.requestMagicLink`.
    Pozostałe funkcje na razie `export const verifyToken = mock.verifyToken` itd. (przeczytaj komentarz
    w prototypowym `api/auth.js` — dlaczego osobna linijka na funkcję).
- **Czego się uczę:** middleware i ich kolejność, obsługa błędów w Expressie 5, walidacja po stronie serwera,
  `crypto.randomBytes`, hash SHA-256 (dlaczego w bazie nie ma samego tokenu), `make_interval`,
  `fetch` i `response.ok`, tryby Vite (`--mode`), tree shaking.
- **Gotowe, gdy:** `npm run dev:http` → `/login` → e-mail → strona „Sprawdź pocztę”, a w konsoli serwera jest
  link; w tabeli `login_tokens` jest wiersz z Twoim e-mailem i `token_hash` **innym** niż token z linku,
  a w `users` nowego adresu jeszcze nie ma; błędny e-mail pokazuje komunikat z serwera; `npm run dev` (mock)
  działa jak wcześniej.
- **Commit:** `feat(auth): prośba o link logowania obsługiwana przez serwer`

## Sesja 42: Logowanie przez serwer — ciasteczko sesji · ~2–3 h
- **Cel:** w trybie `http` klikam link (albo „Wejdź na konto demo”), jestem zalogowany i zostaję zalogowany po odświeżeniu.
- **Źródło w prototypie:**
  - `npm install jsonwebtoken cookie-parser`
  - `server/src/services/session.js` — cały plik.
  - `server/src/config.js` — `jwtSecret` z `assertSafeSecret`, `cookieSecure`, `demoLogin`, `demoEmail`.
  - `server/src/mappers.js` — tylko `toUser`.
  - `server/src/middleware/requireAuth.js` — tylko `loadUser`.
  - `server/src/routes/auth.js` — `POST /verify`, `GET /me`, `POST /logout`, `GET /demo`, `POST /demo`.
  - `server/src/app.js` — `cookieParser()`.
  - `src/api/http/auth.js` — `verifyToken`, `getCurrentUser`, `logout`, `getDemoLogin`, `loginAsDemo`;
    przełącz je w fasadzie.
  - (opcjonalnie) `src/dev/DevPanel.jsx` — gałąź dla trybu http i `API_MODE` z `src/api/mode.js`.
- **Czego się uczę:** JWT (nagłówek, dane, podpis), ciasteczko `httpOnly` / `Secure` / `SameSite` (D8),
  `UPDATE … RETURNING` jako atomowe „sprawdź i zużyj”, `INSERT … ON CONFLICT DO NOTHING` (konto przy
  pierwszym logowaniu), dlaczego `/auth/me` zwraca `{ user: null }` zamiast 401.
- **Gotowe, gdy:** link dla nowego adresu zakłada wiersz w `users` dopiero po kliknięciu; po kliknięciu linku
  z konsoli serwera trafiasz do panelu — lista zwierząt pokaże
  „Sesja wygasła”, bo `getPets` jest jeszcze z mocka, który nie zna ciasteczka serwera (naprawisz w sesji 43); w DevTools → Application → Cookies `petrace_session` ma `HttpOnly`; ponowny link daje błąd;
  odświeżenie nie wylogowuje; „Wyloguj się” usuwa ciasteczko.
- **Commit:** `feat(auth): sesja w ciasteczku httpOnly i logowanie przez serwer`

## Sesja 43: Panel pokazuje zwierzęta z bazy · ~2 h
- **Cel:** w trybie `http` panel i profil pokazują zwierzęta z PostgreSQL, a cudze zwierzę daje 404.
- **Źródło w prototypie:**
  - `server/src/middleware/requireAuth.js` — `requireAuth`.
  - `server/src/services/pets.js` — cały plik (`PET_SELECT`, `UUID_PATTERN`, `findOwnPet`).
  - `server/src/mappers.js` — `toPet`.
  - `server/src/routes/pets.js` — `petsRouter.use(requireAuth)`, `GET /`, `GET /:id`.
  - `src/api/http/pets.js` — `petPath`, `getPets`, `getPetById`; przełącz w fasadzie.
- **Czego się uczę:** middleware jako strażnik (401), REST (zasób i metody), `req.params`, `LEFT JOIN`
  z warunkiem w `ON`, sprawdzanie własności zasobu, `snake_case` → `camelCase`.
- **Gotowe, gdy:** w trybie `http` panel pokazuje Lunę i Mruczka z bazy (sprawdź: zmiana imienia w `psql`
  widoczna po odświeżeniu); `curl` bez ciasteczka → 401; drugie konto po id Luny → 404. Sekcja „Ostatnie skanowania” do sesji 48
  pokazuje błąd — to normalne, skanowania są jeszcze z mocka.
- **Commit:** `feat(owner): zwierzęta z bazy danych`

## Sesja 44: Dodawanie, edycja i tryb zaginięcia zapisują się w bazie · ~2 h
- **Cel:** w trybie `http` dodaję i edytuję zwierzę oraz włączam tryb zaginięcia, a zmiany są w PostgreSQL.
- **Źródło w prototypie:**
  - `server/src/validation.js` — `DATE_PATTERN`, `SPECIES`, `parsePet`, `parseLostMode`.
  - `server/src/routes/pets.js` — `COLUMNS`, `POST /`, `PATCH /:id`, `PATCH /:id/lost`.
  - `src/api/http/pets.js` — `createPet`, `updatePet`, `setLostMode`; przełącz w fasadzie.
- **Czego się uczę:** kod 201, `INSERT … RETURNING`, dynamiczne `UPDATE … SET` z listy dozwolonych kolumn
  (i dlaczego to bezpieczne), walidacja częściowa przy edycji.
- **Gotowe, gdy:** nowe zwierzę i edycja są widoczne w `psql`; pusty formularz dostaje błąd z serwera;
  tryb zaginięcia zmienia `is_lost` w bazie.
- **Commit:** `feat(owner): zapis zwierząt i trybu zaginięcia w bazie`

## Sesja 45: Ustawienia w bazie i limit prób logowania · ~1,5 h
- **Cel:** w trybie `http` zapisuję telefon w bazie, a zbyt wiele próśb o link kończy się komunikatem „za dużo prób”.
- **Źródło w prototypie:**
  - `server/src/validation.js` — `PHONE_PATTERN`, `parseSettings`.
  - `server/src/routes/me.js` — cały plik; `app.use('/api/me', meRouter)`.
  - `server/src/middleware/rateLimit.js` — cały plik.
  - `server/src/routes/auth.js` — `limitByIp`, `limitByEmail` w `POST /request-link`.
  - `server/src/config.js` — `trustProxyHops`; `server/src/app.js` — `trust proxy`, `x-powered-by`.
  - `src/api/http/auth.js` — `updateSettings`; przełącz w fasadzie.
- **Czego się uczę:** rate limiting (okno czasowe, `Map`, kod 429, `Retry-After`), `trust proxy`
  i nagłówek `X-Forwarded-For`, dlaczego dwa limity (IP i e-mail).
- **Gotowe, gdy:** zmiana telefonu jest w `psql`; czwarta prośba o link na ten sam e-mail w 15 minut pokazuje
  „Wysłaliśmy już kilka linków…”.
- **Commit:** `feat(auth): ustawienia konta w bazie i limit prób logowania`

## Sesja 46: Znalazca skanuje tag — wariant wybiera serwer · ~2 h
- **Cel:** w trybie `http` strona zawieszki dostaje wariant i dane z serwera, a każde skanowanie trafia do bazy.
- **Źródło w prototypie:**
  - `server/src/services/tagCodes.js` — tylko `normalizeTagCode`.
  - `server/src/routes/tags.js` — `DUPLICATE_SCAN_SECONDS`, `GET /tags/:code`, `recordScan`; `app.use('/api', tagsRouter)`.
  - `src/api/http/tags.js` — `resolveTag`; utwórz fasadę z wyborem per funkcja.
- **Czego się uczę:** routing kontekstowy po stronie serwera (D6), trasa publiczna z opcjonalną sesją,
  `JOIN` trzech tabel, `INSERT … SELECT … WHERE NOT EXISTS`, nagłówek `User-Agent`.
- **Gotowe, gdy:** w trybie `http` cztery warianty działają jak w mocku (sprawdź jako zalogowany i w incognito —
  tym razem incognito **widzi te same dane**, bo są na serwerze); odpowiedź `found` w DevTools → Network
  nie zawiera komunikatu ani id właściciela; każde wejście dodaje wiersz do `tag_scans`.
- **Commit:** `feat(finder): wybór wariantu zawieszki i zapis skanów na serwerze`

## Sesja 47: Szybki zapis i aktywność w bazie · ~1,5 h
- **Cel:** w trybie `http` „Karmienie” po skanie i zakładka „Aktywność” korzystają z bazy.
- **Źródło w prototypie:**
  - `server/src/validation.js` — `parseActivity`.
  - `server/src/mappers.js` — `toActivity`.
  - `server/src/routes/activities.js` — cały plik; `app.use('/api', activitiesRouter)`.
  - `src/api/http/activities.js` — cały plik; fasada `api/activities.js` z wyborem per funkcja.
- **Czego się uczę:** `req.query`, `make_interval`, filtrowanie po dacie w SQL, granice wartości (`Math.min`/`Math.max`).
- **Gotowe, gdy:** karmienie zapisane po skanie jest w `psql` i w zakładce „Aktywność”; `?days=1` zwraca mniej wpisów niż `?days=7`.
- **Commit:** `feat(owner): aktywności zapisywane w bazie`

## Sesja 48: Zawieszka i historia skanowań w bazie · ~2 h
- **Cel:** w trybie `http` tworzę zawieszkę, wymieniam kod i widzę historię skanowań — wszystko z bazy.
- **Źródło w prototypie:**
  - `server/src/db.js` — `withTransaction`.
  - `server/src/services/tagCodes.js` — `ALPHABET`, `generateTagCode`.
  - `server/src/mappers.js` — `toScan`.
  - `server/src/routes/tags.js` — `POST /pets/:id/tag`, `SCAN_SELECT`, `GET /pets/:id/scans`, `GET /scans`.
  - `src/api/http/tags.js` — `createTag`, `getTagScans`, `getRecentScans`; przełącz w fasadzie.
  - `client/package.json` — `"sideEffects": ["**/*.css"]`.
- **Czego się uczę:** transakcja (`BEGIN` / `COMMIT` / `ROLLBACK`), `crypto.randomInt` (losowanie bez przekłamań),
  obsługa kolizji przez `ON CONFLICT DO NOTHING`, `LIMIT`.
- **Gotowe, gdy:** cała aplikacja działa w `npm run dev:http` (przejdź T3–T14 z `docs/09-testy.md`);
  w `tags` jest stary kod jako nieaktywny i nowy aktywny; po `npm run build -- --mode http` w plikach
  `dist/assets/*.js` nie ma tekstu `pettrace:db` (kod mock wycięty).
- **Commit:** `feat(tags): zawieszki i historia skanowań w bazie`

> **Kamień milowy M5:** wszystkie funkcje priorytetu 1 działają na PostgreSQL.

---

# Część I — Pełne wdrożenie i testy

## Sesja 49: Cały system w Docker Compose · ~2 h
- **Cel:** `docker compose up --build` uruchamia bazę, API i frontend w trybie `http` pod `http://localhost:8080`.
- **Źródło w prototypie:**
  - `server/Dockerfile`, `server/.dockerignore` — całe pliki.
  - `docker-compose.yml` — usługi `db` i `api` oraz `depends_on` w `caddy`.
  - `Caddyfile` — blok `handle /api/*`.
  - `Dockerfile` — `ENV VITE_API_MODE=http`.
  - `.env.example` — cały plik.
- **Czego się uczę:** obraz dla Node (`npm ci --omit=dev`, użytkownik bez roota), `depends_on` + `healthcheck`,
  sieć między kontenerami (adresy `db`, `api`), `${ZMIENNA:-domyślna}`, dlaczego hasło do bazy ustawia się
  tylko przy pierwszym starcie.
- **Gotowe, gdy:** na `http://localhost:8080` działa „Wejdź na konto demo” i cała aplikacja; `docker compose down`
  i `up` zachowują dane; `down -v` je kasuje.
- **Commit:** `chore(deploy): cały system w Docker Compose`

## Sesja 50: petracker.pl działa na mojej wersji · ~2–3 h
- **Cel:** moja aplikacja z bazą działa pod `https://petracker.pl`, wysyła maile i ma codzienną kopię zapasową.
- **Źródło w prototypie:**
  - `server/src/services/mail.js` — cały plik (`npm install nodemailer`), `smtp` w `config.js`.
  - `DEPLOY.md` — kroki 5 (`.env`: `POSTGRES_PASSWORD`, `JWT_SECRET`, `TRUST_PROXY_HOPS=2`, SMTP),
    8 (kopie zapasowe), 9 (aktualizacja), 10 (poczta), 14 (nginx).
  - Przełączenie domeny: w `/etc/nginx/sites-available/petracker.pl` `proxy_pass http://127.0.0.1:8081`,
    w `.env` `APP_URL=https://petracker.pl`, prototyp zatrzymany (`docker compose down` w `~/prototyp`).
- **Czego się uczę:** SMTP, SPF i DKIM (dlaczego maile trafiają do spamu), `pg_dump` i `cron`, przywracanie
  kopii, aktualizacja aplikacji na serwerze.
- **Gotowe, gdy:** link logowania przychodzi mailem; w katalogu kopii jest plik z dzisiejszą datą, a próbne
  przywrócenie działa; tag NFC przepisany na `https://petracker.pl/t/…` otwiera Twoją wersję.
- **Commit:** `feat(deploy): wysyłka maili, kopie zapasowe i wdrożenie na petracker.pl`

> **Kamień milowy M6:** aplikacja korzysta z API, całość uruchamiana przez `docker compose`.

## Sesja 51: Testy na urządzeniach · ~3 h (dwa podejścia)
- **Cel:** wszystkie scenariusze z `docs/09-testy.md` są sprawdzone na Androidzie, iPhonie i komputerze.
- **Źródło w prototypie:** `plan/09-testy.md` (tabela), Lighthouse w Chrome DevTools.
- **Czego się uczę:** testy akceptacyjne, audyt Lighthouse, obsługa samą klawiaturą, czytnik ekranu.
- **Gotowe, gdy:** tabela T1–T16 wypełniona; Lighthouse ≥ 90 na `/`, `/t/LUNA-7K2Q` i `/panel`; każdy
  znaleziony błąd poprawiony osobnym commitem; zrzuty ekranu do pracy zrobione.
- **Commit:** `docs(tests): wyniki testów na urządzeniach`

---

# Priorytet 2 (po ukończeniu priorytetu 1)

Udostępnianie weterynarzowi, ręczny wpis spaceru, mapa przy wysyłaniu lokalizacji i zdjęcie zwierzęcia
(`docs/01-zakres.md`). Sesje dopiszemy, gdy priorytet 1 będzie działał. Do tego czasu `/spacery`,
`/spacery/nowy`, `/zwierzeta/:id/vet-share` i `/vet/:shareToken` zostają prostymi stronami-zaślepkami,
a `/harmonogram` (priorytet 3) — zaślepką na stałe.

---

# Dodatek: pułapki i rzeczy, których nie kopiujemy z prototypu

- **React Router v7:** importy z `react-router` (nie `react-router-dom`).
- **Tailwind v4:** nie ma `tailwind.config.js`. Konfiguracja jest w `@theme` w CSS.
- **Nie przepisuj** `petracer/src/dev/SketchBox.jsx` ani funkcji `fromSeed` / `describeHealth` z `mocks/db.js`.
- **Prototyp ma frontend w korzeniu,** a Ty od sesji 36 w `client/`. Ścieżki w „Źródle” podają położenie w prototypie.
- **W trybie mock incognito to „inny komputer”** — ma osobny localStorage. Wspólne dane dla wielu
  przeglądarek będą dopiero w trybie `http`.
- **Express 5, nie 4:** błąd rzucony w funkcji `async` trafia sam do obsługi błędów. Starsze tutoriale
  owijają trasy w `try/catch` i wołają `next(error)` — tu nie trzeba.
- **SQL zawsze z parametrami** (`$1`, `$2`). Nigdy nie sklejaj zapytania z danymi od użytkownika.
- **Schemat bazy wczytuje się tylko raz** (do pustej bazy). Po zmianie `001_init.sql` lokalnie:
  `docker compose -f docker-compose.dev.yml down -v` i `up -d`.
- **Hasło do bazy w Dockerze ustawia się tylko przy pierwszym starcie.** Zmiana `POSTGRES_PASSWORD` później
  daje `password authentication failed` — wtedy `down -v` (kasuje dane).
- **Port bazy 5434, nie 5432:** na Windowsie często działa już PostgreSQL zainstalowany w systemie.
- **Dwa projekty na jednym serwerze:** prototyp ma w `docker-compose.yml` nazwę `petrace`, Twój — `pettrace`.
  Bez różnych nazw Docker pomieszałby kontenery i bazy.

# Postęp

| Część | Sesje | Kamień milowy | Gotowe |
|---|---|---|---|
| A–C. Fundamenty, layout, komponenty UI | etapy 0–12 | — | ☑ |
| D. Pierwsze funkcje i logowanie | 13–19 | M1 | ☐ |
| E. Panel właściciela | 20–23 | M2 | ☐ |
| F. Zawieszka i znalazca | 24–34 | M3 | ☐ |
| G. PWA i pierwsze wdrożenie | 35–38 | M4 | ☐ |
| H. Backend | 39–48 | M5 | ☐ |
| I. Pełne wdrożenie i testy | 49–51 | M6 | ☐ |
