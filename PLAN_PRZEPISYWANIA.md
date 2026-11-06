# PetTrace — plan przepisywania krok po kroku

Każdy etap to lista rzeczy do zrobienia **po kolei**. Odhaczaj `[x]` w miarę postępu.

- **Prototyp** = folder `petracer/` (tylko do podglądania, nic w nim nie zmieniasz).
- **Nowy projekt** = folder `pettrace/`, który utworzysz w etapie 0. Tu piszesz kod.

> **Zmiana z 6.11.2026:** od sesji 17 plan jest nowy: bez trybu mock, z logowaniem PIN-em, bez spacerów,
> harmonogramu i weterynarza. Etapy 0–13 i sesje 14–16 to historia. Zacznij od „Nowy plan od sesji 17”.

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
*Wzór:* `ownerNav.js`, `Sidebar.jsx` (od 31.10 nie ma ich w prototypie — zastąpiła je sesja 15a; stara wersja: `git show e627572:src/components/layout/Sidebar.jsx`).

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

## Sesja 15a: Panel w jednej kolumnie bez sidebara · ~0,5–1 h
> Nowy układ panelu z wersji Alt (decyzja z 31.10). Kolory i fonty zostają. Pełny kod: plan w HTML.
- **Cel:** panel nie ma sidebara, dolnego paska ani pływającego „+”; u góry przyklejony nagłówek z logo, pod nim jedna wąska kolumna (`max-w-2xl`), taka sama na telefonie i komputerze.
- **Źródło w prototypie:**
  - `src/index.css` — `@utility no-scrollbar`.
  - `src/components/layout/OwnerLayout.jsx` — cały, **bez** kółka konta (`useAuth` jeszcze nie ma, dojdzie w sesji 17).
  - Usuń: `git rm src/components/layout/Sidebar.jsx src/components/layout/BottomNav.jsx src/components/layout/ownerNav.js`.
- **Czego się uczę:** jedna kolumna zamiast dwóch układów, `sticky` + `backdrop-blur`, `env(safe-area-inset-top)`, `@utility` w Tailwind v4, `git rm`.
- **Gotowe, gdy:** na 375 px i na komputerze ta sama wyśrodkowana kolumna bez sidebara i dolnego paska; nagłówek zostaje u góry przy przewijaniu; logo wraca do `/panel`.
- **Commit:** `refactor(layout): panel w jednej kolumnie zamiast sidebara i dolnego menu`

## Sesja 15b: Ekran jednego zwierzęcia z przełącznikiem i przyciskiem „Akcje” · ~2,5–3 h
- **Cel:** `/panel` otwiera ostatnio oglądane zwierzę; u góry awatary do przełączania, pod nimi duża karta zwierzęcia, na dole przycisk „Akcje” z arkuszem od dołu (spacer, spacery, harmonogram, zawieszka, weterynarz, edycja, nowe zwierzę, konto i ustawienia).
- **Źródło w prototypie:**
  - `src/api/mock/pets.js` — `getPetById` **w uproszczonej wersji** (`getDb().pets.find(...)`, brak → `apiError(404, ...)`); pełna z `findOwnPet` w sesji 20. Dopisz do fasady.
  - `src/lib/lastPet.js` — cały plik.
  - `src/index.css` — w `@theme`: `--animate-sheet`, `--animate-pop`, `--animate-rise` i ich `@keyframes`.
  - `src/components/ui/Sheet.jsx`, `src/components/pets/PetSwitcher.jsx`, `src/components/pets/PetActionsSheet.jsx` — całe pliki.
  - `src/pages/owner/PetProfilePage.jsx` — tylko `PetProfilePage` (przełącznik, `PetHero`, link „Więcej akcji…”, `ActionsButton`, `PetActionsSheet`), **bez** `PhoneNotice`, `LostModeSwitch`, `ProfileTabs`, `RecentPetScans`.
  - `src/pages/owner/DashboardPage.jsx` — przekierowanie `<Navigate replace>` + `EmptyState`, **bez** `PhoneNotice` i bez `user` (nagłówek „Twoje zwierzęta”).
  - `src/router.jsx` — trasa `zwierzeta/:id` → `PetProfilePage`.
  - Usuń: `git rm src/components/pets/PetCard.jsx`.
- **Czego się uczę:** `<Navigate replace>` w renderze, localStorage jako wygoda, ten sam komponent przy zmianie parametru, `useRef` na element i `scrollTo`, scroll-snap, `<dialog>` jako bottom sheet, animacje z `@theme` i `animationDelay`, elementy warunkowe w tablicy, `pointer-events-none`.
- **Gotowe, gdy:** `/panel` → `/zwierzeta/luna` (a po obejrzeniu Mruczka — Mruczek); karta Mruczka czerwona, kropka w przełączniku i czerwone kółko w „Akcjach”; awatary nie migają przy przełączaniu; arkusz zamykają X, Escape i tło; kafelki Spacery/Harmonogram i „Konto i ustawienia” prowadzą na swoje strony; „Wstecz” nie wraca na `/panel`; `/zwierzeta/xyz` → „Nie znaleziono zwierzęcia”.
- **Commit:** `feat(owner): ekran jednego zwierzęcia z przełącznikiem i arkuszem akcji`

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

# Nowy plan od sesji 17 (decyzja z 6.11.2026)

Etapy 0–13 i sesje 14–16 zostają powyżej jako historia. **Od tego miejsca obowiązuje poniższa kolejność.**

| Decyzja | Co to zmienia |
|---|---|
| **Bez trybu mock** | Każda funkcja powstaje od razu z trasą w Expressie, SQL-em i ekranem. Znikają `api/mock/`, `mocks/`, `api/http/`, wybór `useHttp`, `mode.js` i `.env.http`. |
| **PIN zamiast magic linka** | E-mail + 6-cyfrowy PIN. Znikają maile, SMTP, `login_tokens`, `/login/sprawdz-poczte` i `/auth/verify`. |
| **Usunięte funkcje** | Rozpocznij spacer, Spacery, Harmonogram, Dla weterynarza — razem z trasami, layoutem i tabelami. |
| **Mniejszy zakres** | Bez panelu DEV, „Nowego kodu”, kafelków aktywności i ostatnich skanowań poza stroną zawieszki. Ilustracja na stronie głównej jest opcjonalna. |
| **Jedno wdrożenie** | Od razu cały system w Docker Compose, zamiast najpierw samego frontendu. |

**Zostaje bez zmian:** szybki zapis „Karmienie” i „Spacer” po skanie własnej zawieszki (to część rdzenia, a nie funkcja Spacery), cztery warianty strony zawieszki, tryb zaginięcia, SMS z lokalizacją, QR i NFC, PWA, PostgreSQL, wdrożenie, konto demo.

**Prototyp jest już w tej docelowej wersji.** Uruchom go (`docker compose up --build` w `petracer/`), żeby zobaczyć cel, i traktuj cały jego kod jako wzór. Stare wersje z mockiem i magic linkiem są tylko w historii gita.

**Cały kod do przepisania jest w `plan/PeTrace — plan przepisywania.html`:** w każdej sesji kod tej sesji, pod każdym fragmentem wyjaśnienie, a w dziale „Cały kod” każdy plik w końcowej postaci.

**Oznaczenia w „Źródle”:**
- **[czytaj]** — plik konfiguracyjny lub powtarzalny: możesz przenieść go z prototypu, ale musisz umieć wyjaśnić każdą linię. Zanim tak zrobisz, sprawdź zasady uczelni dotyczące kodu, którego nie piszesz sam.
- Bez oznaczenia — piszesz sam. To jest kod, który będziesz omawiać w pracy i na obronie.

**Ścieżki:** twój kod to `client/` i `server/` w repozytorium `PeTracker-FinalVersion`. Ścieżki w „Źródle” podają położenie w prototypie (`petracer/`), gdzie frontend leży w `src/`.

**Zasady dla każdej sesji:**
- Strony importują dane tylko z `client/src/api/`. To nadal jedyne miejsce, które wie, skąd pochodzą dane.
- Serwer zwraca `camelCase` przez `server/src/mappers.js`. SQL zawsze z parametrami (`$1`).
- Każdy ekran z danymi ma cztery stany: ładowanie, błąd, pusto, dane.
- Przed commitem: `npm run lint`, `npm run build`, konsola przeglądarki bez błędów.
- **Do pracy lokalnej potrzebujesz dwóch terminali:** `npm run dev` w `server/` i w `client/` (baza w Dockerze). Do testów serwera bez ekranu użyj `curl` albo REST Clienta w VS Code.

Czas przy sesji to szacunek dla kogoś, kto robi daną rzecz pierwszy raz. Razem 44–55 h. Ta sama lista z postępem, pytaniami na obronę i mapą systemu jest w `plan/PeTrace — plan przepisywania.html`.

---

# Część D — Porządki i logowanie na serwerze

## Sesja 17: Porządki i nowy układ repozytorium · ~1 h
- **Cel:** aplikacja nie ma już spacerów, harmonogramu ani weterynarza, a frontend leży w `client/`.
- **Kroki:**
  - Najpierw zatwierdź niezapisaną pracę z sesji 16, żeby została w historii.
  - `git mv petracer-final client`, potem `npm install` w `client/` (D18).
  - `client/src/router.jsx` — usuń `vet/:shareToken`, `zwierzeta/:id/vet-share`, `spacery`, `spacery/nowy`, `spacery/:id`, `harmonogram` oraz niepotrzebne `t/:tagId/wyslano` i `zwierzeta/:id/zaginiecie`.
  - `git rm client/src/components/layout/VetLayout.jsx` i pusty, nieużywany `client/src/api/db.js`.
  - `client/src/components/pets/PetActionsSheet.jsx` — usuń kafelki „Rozpocznij spacer”, „Spacery”, „Harmonogram”, „Dla weterynarza” i nieużywane ikony. Sprawdź, czy pole `tone` jest jeszcze komukolwiek potrzebne.
  - `src/components/pets/PetAvatar.jsx` — cały plik: awatar z ikoną gatunku zamiast inicjału.
- **Czego się uczę:** `git mv` i `git rm`, usuwanie funkcji bez zostawiania martwego kodu, ESLint jako wykrywacz nieużywanych importów.
- **Gotowe, gdy:** `npm run lint` i `npm run build` przechodzą w `client/`; arkusz „Akcje” pokazuje Zawieszka, Edytuj profil, Oczami znalazcy, Nowe zwierzę; `/spacery` i `/harmonogram` dają stronę 404.
- **Commit:** `refactor: usuń spacery, harmonogram i weterynarza, przenieś frontend do client/`

## Sesja 18: Serwer odpowiada · ~1,5 h
- **Cel:** uruchamiam własny serwer Express i widzę jego odpowiedź pod `http://localhost:5173/api/health`.
- **Źródło w prototypie:**
  - `server/package.json` — `"type": "module"`, skrypty `dev` (`node --watch src/index.js`) i `start`; `npm install express`.
  - `server/src/app.js` — `createApp` z samą trasą `/api/health`.
  - `server/src/index.js` — tylko `createApp().listen(…)`.
  - **[czytaj]** `server/eslint.config.js`, `server/.gitignore`.
  - `vite.config.js` — sekcja `server.proxy` (u ciebie w `client/`).
- **Czego się uczę:** Node.js, moduły ES w Node, HTTP (metoda, adres, nagłówki, kod, treść), Express: trasa, `req`, `res.json`, port, proxy Vite (dlaczego jedna domena = brak CORS).
- **Gotowe, gdy:** `curl http://localhost:3000/api/health` i `http://localhost:5173/api/health` w przeglądarce zwracają `{"ok":true}`; zmiana tekstu w trasie przeładowuje serwer sam.
- **Commit:** `feat(server): szkielet serwera Express z trasą health`

## Sesja 19: Baza danych z tabelami i Luną w środku · ~2–3 h
- **Cel:** PostgreSQL działa w Dockerze, ma 5 tabel i dane przykładowe, a serwer łączy się z nim przy starcie.
- **Źródło w prototypie:**
  - **[czytaj]** `docker-compose.dev.yml` (port `5434`), `server/.env.example` (skopiuj do `server/.env`); `npm install pg dotenv`.
  - `server/sql/001_init.sql` — cały plik, pisz po jednej tabeli.
  - `server/sql/seed.sql` — cały plik. `pin_hash` to skrót PIN-u `123456`, zrozumiesz go w sesji 20.
  - **[czytaj]** `server/src/config.js` — `required` oraz `isProduction`, `port`, `databaseUrl`, `seedDemoData`.
  - `server/src/db.js` — `pool`, parsery typów, `query` (bez `withTransaction`).
  - **[czytaj]** `server/src/seed.js`, `server/scripts/db-reset.js`; skrypt `db:reset` w `package.json`.
  - `server/src/index.js` — `SELECT 1` i `seedDemoDataIfEmpty` przed startem.
- **Czego się uczę:** relacyjna baza danych, typy kolumn, klucz główny i obcy, `UNIQUE`, `CHECK`, `DEFAULT`, `ON DELETE`, indeks (też częściowy `WHERE is_active`), `psql`, zmienne środowiskowe, pula połączeń, zapytanie z parametrami (`$1`) i SQL injection.
- **Gotowe, gdy:** `docker compose -f docker-compose.dev.yml exec db psql -U petrace -d petrace` → `\dt` pokazuje 5 tabel, a `SELECT name, is_lost FROM pets;` — Lunę i Mruczka; drugi start serwera nie dubluje danych; `npm run db:reset` przywraca stan początkowy.
- **Commit:** `feat(server): schemat PostgreSQL i dane przykładowe`

## Sesja 20: Zakładam konto i loguję się PIN-em na serwerze · ~2–3 h
- **Cel:** przez `curl` zakładam konto z PIN-em i loguję się nim, a w bazie jest tylko skrót PIN-u. Po kilku błędnych próbach serwer odpowiada 429.
- **Źródło w prototypie:**
  - **[czytaj]** `server/src/errors.js`, `server/src/middleware/errorHandler.js`.
  - **[czytaj]** `server/src/validation.js` — `EMAIL_PATTERN`, `text`, `parseEmail`, `parseName`.
  - **[czytaj]** `server/src/mappers.js` — tylko `toUser` (nigdy nie zwracaj `pin_hash`).
  - `server/src/middleware/rateLimit.js` — cały plik; zawiera mechanizm limitu prób.
  - `server/src/app.js` — `express.json`, `app.use('/api/auth', authRouter)`, `notFound`, `errorHandler`.
  - `server/src/validation.js` — `parsePin`: dokładnie 6 cyfr.
  - `server/src/services/pin.js` — cały plik: `hashPin` i `verifyPin` na wbudowanym `crypto.scrypt`.
  - `server/src/routes/auth.js` — limity, `POST /register`, `POST /login` (bez `setSessionCookie`, dojdzie w sesji 21).
- **Czego się uczę:** middleware i ich kolejność, błędy w Expressie 5, walidacja po stronie serwera, skrót a szyfrowanie, sól, dlaczego `scrypt` zamiast SHA-256 przy krótkich sekretach, atak słownikowy i limit prób, dlaczego komunikat błędu nie zdradza, czy konto istnieje, `timingSafeEqual`.
- **Gotowe, gdy:** `curl` zakłada konto, a `psql` pokazuje `pin_hash` bez PIN-u w czystej postaci; dwa konta z tym samym PIN-em mają różne skróty; dobry PIN → 200; zły PIN i nieznany e-mail dają identyczną odpowiedź 401; szósta próba na ten sam e-mail w 15 minut → 429; PIN `12a` → 400.
- **Commit:** `feat(auth): rejestracja i logowanie PIN-em na serwerze`

## Sesja 21: Serwer pamięta, że jestem zalogowany · ~1,5–2 h
- **Cel:** po logowaniu dostaję ciasteczko sesji, `/api/auth/me` wie, kim jestem, a wylogowanie je usuwa.
- **Źródło w prototypie:**
  - `npm install jsonwebtoken cookie-parser`
  - `server/src/services/session.js` — cały plik.
  - **[czytaj]** `server/src/config.js` — `appUrl`, `isLocalApp`, `jwtSecret` z `assertSafeSecret`, `cookieSecure`, `demoLogin`, `demoEmail`. `appUrl` służy tylko do rozpoznania pracy lokalnej.
  - `server/src/middleware/requireAuth.js` — tylko `loadUser`.
  - `server/src/routes/auth.js` — `GET /me`, `POST /logout`; w `/register` i `/login` dopisz `setSessionCookie`.
  - `server/src/app.js` — `cookieParser()`.
- **Czego się uczę:** JWT (nagłówek, dane, podpis), ciasteczko `httpOnly` / `Secure` / `SameSite` (D8), dlaczego `/auth/me` zwraca `{ user: null }` zamiast 401.
- **Gotowe, gdy:** `curl -c cookies.txt` po logowaniu zapisuje ciasteczko `petrace_session`, a `curl -b cookies.txt …/api/auth/me` zwraca użytkownika; bez ciasteczka zwraca `{"user":null}`; po `/logout` ciasteczka już nie ma.
- **Commit:** `feat(auth): sesja w ciasteczku httpOnly`

## Sesja 22: Loguję się w przeglądarce i zostaję zalogowany · ~2–3 h
- **Cel:** zakładam konto albo loguję się na stronie, trafiam do panelu z kółkiem z inicjałem i zostaję zalogowany po odświeżeniu.
- **Źródło w prototypie:**
  - `src/api/request.js` — cały plik; u ciebie `client/src/api/request.js`.
  - `src/context/AuthContext.js`, `src/hooks/useAuth.js` — całe pliki.
  - `src/api/auth.js` — `register`, `login`, `getCurrentUser`, `logout`.
  - `src/context/AuthProvider.jsx` — bez `loginAsDemo` (sesja 24).
  - `src/main.jsx` — owinięcie `RouterProvider` w `AuthProvider`.
  - `src/components/layout/OwnerLayout.jsx` — kółko z inicjałem (link do `/ustawienia`), gdy `user` istnieje.
  - `src/pages/owner/DashboardPage.jsx` — „Cześć, {user?.name}” w pustym panelu.
  - `src/pages/public/LoginPage.jsx` — przerób swój formularz, na razie bez `DemoLogin`, `from` i `<Navigate>` (sesje 23–24).
  - `src/pages/public/RegisterPage.jsx` — trasa `/rejestracja`, bez `from` i `<Navigate>`.
  - `src/components/layout/PublicLayout.jsx`, `src/pages/public/LandingPage.jsx` — przyciski „Załóż konto” i „Zaloguj się” na stronie głównej, sam logotyp w nagłówku.
- **Usuń:** `CheckEmailPage.jsx`, `lib/redirect.js`, `api/mock/auth.js`, trasy `login/sprawdz-poczte` i `auth/verify`.
- **Czego się uczę:** Context (`createContext`, `useContext`), prop drilling, własny hook, `useMemo`, stan „jeszcze nie wiadomo” (`isLoading`), `fetch` i `response.ok`, dlaczego przeglądarka sama wysyła ciasteczko, `autoComplete` i menedżery haseł.
- **Gotowe, gdy:** nowe konto „Ola” zakłada wiersz w `users` i pokazuje kółko „O”; powtórzony inny PIN daje błąd przed wysłaniem; zły PIN pokazuje komunikat pod polem; po odświeżeniu nadal jesteś zalogowany; w DevTools → Application → Cookies ciasteczko ma `HttpOnly`. Lista zwierząt działa jeszcze na starym mocku `getPets` — tak ma być do sesji 25.
- **Commit:** `feat(auth): logowanie PIN-em i kontekst zalogowanego użytkownika`

## Sesja 23: Panel tylko dla zalogowanych, powrót i wylogowanie · ~1,5 h
- **Cel:** niezalogowany trafia z `/panel` na `/login`, po zalogowaniu wraca tam, skąd przyszedł; „Wyloguj się” działa.
- **Źródło w prototypie:**
  - `src/components/layout/RequireAuth.jsx` — cały plik; w `router.jsx` owiń nim grupę właściciela.
  - `src/pages/public/LoginPage.jsx` — górna część: `from` z `location.state` i `if (user) return <Navigate …>`. Tak samo w `RegisterPage`.
  - `src/pages/owner/SettingsPage.jsx` — tylko nagłówek i przycisk „Wyloguj się” z `handleLogout`.
- **Czego się uczę:** `<Navigate>`, `replace`, `state` w nawigacji, kolejność „najpierw nawigacja, potem wylogowanie”. `safeRedirect` nie jest już potrzebny: `from` żyje w `location.state`, więc nie da się go podać w linku — umiesz wyjaśnić, czym jest open redirect i dlaczego tu nie występuje.
- **Gotowe, gdy:** wylogowany wchodzi na `/ustawienia` → `/login` → logowanie → wraca na **`/ustawienia`** (T12). Odświeżenie zalogowanej strony nie wyrzuca na `/login`. Wylogowanie przenosi na `/`.
- **Commit:** `feat(auth): ochrona panelu, powrót po zalogowaniu i wylogowanie`

## Sesja 24: Wchodzę na konto demo jednym przyciskiem · ~0,5–1 h
- **Cel:** na `/login` jest przycisk „Wejdź na konto demo”, który od razu loguje na konto Macieja.
- **Źródło w prototypie:**
  - `server/src/routes/auth.js` — `GET /demo`, `POST /demo`.
  - `src/api/auth.js` — `getDemoLogin`, `loginAsDemo`.
  - `src/context/AuthProvider.jsx` — `loginAsDemo`.
  - `src/pages/public/LoginPage.jsx` — komponent `DemoLogin`.
- **Czego się uczę:** komponent, który sam decyduje, czy się pokazać (`return null`), reakcja na zmianę kontekstu (`<Navigate>` przenosi sam).
- **Gotowe, gdy:** jedno kliknięcie przenosi do panelu; przy `DEMO_LOGIN=false` przycisku nie ma, a `POST /api/auth/demo` daje 404.
- **Commit:** `feat(auth): logowanie na konto demo jednym przyciskiem`

> **Kamień milowy M1 (22.11.2026):** konto i logowanie PIN-em na prawdziwym serwerze, ochrona tras, powrót na stronę sprzed logowania.

---

# Część E — Panel właściciela

## Sesja 25: Panel pokazuje zwierzęta z bazy, a mock znika · ~2 h
- **Cel:** panel i ekran zwierzęcia pokazują dane z PostgreSQL, a cudze zwierzę daje 404. W projekcie nie ma już żadnego mocka.
- **Źródło w prototypie:**
  - `server/src/middleware/requireAuth.js` — `requireAuth`.
  - `server/src/services/pets.js` — cały plik (`PET_SELECT`, `UUID_PATTERN`, `findOwnPet`).
  - **[czytaj]** `server/src/mappers.js` — `toPet`.
  - `server/src/routes/pets.js` — `petsRouter.use(requireAuth)`, `GET /`, `GET /:id`.
  - `src/api/pets.js` — `petPath`, `getPets`, `getPetById`; u ciebie `client/src/api/pets.js`.
- **Usuń:** `client/src/api/mock/`, `client/src/mocks/`.
- **Czego się uczę:** middleware jako strażnik (401), REST (zasób i metody), `req.params`, `LEFT JOIN` z warunkiem w `ON`, sprawdzanie własności zasobu („cudze = 404”), `snake_case` → `camelCase`, 401 jako „brak sesji”.
- **Gotowe, gdy:** konto demo widzi Lunę i Mruczka z bazy (zmiana imienia w `psql` widoczna po odświeżeniu); `curl` bez ciasteczka → 401; drugie konto po id Luny → 404; nowe konto widzi pusty panel; `grep -r "mock" client/src` nic nie znajduje.
- **Commit:** `feat(owner): zwierzęta z bazy danych, usuń warstwę mock`

## Sesja 26: Profil zwierzęcia — dane i zdrowie · ~1–1,5 h
- **Cel:** na ekranie zwierzęcia są zakładki „Dane” i „Zdrowie”, a zakładka zostaje po odświeżeniu.
- **Źródło w prototypie:**
  - `src/lib/format.js` — `formatDate`, `formatWeight`.
  - `src/pages/owner/PetProfilePage.jsx` — `TABS` (na razie bez `activity`), `ProfileTabs`, `InfoTab`, `HealthTab` oraz krótszy opis w `PetHero` (gatunek widać na awatarze).
- **Czego się uczę:** stan w adresie (`?tab=health`) zamiast w `useState`, `replace` przy zmianie zakładki, `<dl>`, `whitespace-pre-line`.
- **Gotowe, gdy:** `?tab=health` pokazuje uwagi medyczne Luny; przełączanie zmienia adres, a odświeżenie zostawia tę samą zakładkę; nieistniejące zwierzę pokazuje „Nie znaleziono zwierzęcia”.
- **Commit:** `feat(owner): profil zwierzęcia z zakładkami w adresie`

## Sesja 27: Dodaję nowe zwierzę · ~2,5–3 h
- **Cel:** „Nowe zwierzę” otwiera formularz, a po zapisie widzę ekran nowego zwierzęcia. Dane są w bazie.
- **Źródło w prototypie:**
  - **[czytaj]** `server/src/validation.js` — `DATE_PATTERN`, `SPECIES`, `parsePet`.
  - `server/src/routes/pets.js` — `COLUMNS`, `POST /`.
  - `src/api/pets.js` — `createPet`.
  - `src/components/ui/Notice.jsx`, `src/components/pets/PetForm.jsx` — całe pliki.
  - `src/pages/owner/PetNewPage.jsx` — cały plik; trasa `zwierzeta/nowe`.
- **Czego się uczę:** stan formularza jako obiekt, jeden `handleChange` po atrybucie `name`, walidacja w przeglądarce i na serwerze, `null` → `''`, błąd z API w formularzu, kod 201, `INSERT … RETURNING`.
- **Gotowe, gdy:** pusty formularz pokazuje błąd przy imieniu (także gdy ominiesz przeglądarkę przez `curl`); waga „12,5” się zapisuje; data z przyszłości daje błąd; nowe zwierzę jest w `psql` i w przełączniku.
- **Commit:** `feat(owner): dodawanie zwierzęcia`

## Sesja 28: Edytuję zwierzę · ~1 h
- **Cel:** „Edytuj profil” otwiera ten sam formularz i zapisuje zmiany w bazie.
- **Źródło w prototypie:**
  - `server/src/routes/pets.js` — `PATCH /:id`.
  - `src/api/pets.js` — `updatePet`.
  - `src/pages/owner/PetEditPage.jsx` — cały plik; trasa `zwierzeta/:id/edytuj`.
- **Czego się uczę:** ponowne użycie komponentu w dwóch trybach, `key` do zresetowania formularza, dynamiczne `UPDATE … SET` z listy dozwolonych kolumn (i dlaczego to bezpieczne), walidacja częściowa.
- **Gotowe, gdy:** zmiana rasy Luny jest widoczna w profilu i w `psql`; „Anuluj” wraca do profilu bez zmian.
- **Commit:** `feat(owner): edycja profilu zwierzęcia`

## Sesja 29: Ustawiam numer telefonu dla znalazcy · ~1,5 h
- **Cel:** w ustawieniach zmieniam imię i telefon, a ekran zwierzęcia ostrzega, gdy telefonu brak.
- **Źródło w prototypie:**
  - **[czytaj]** `server/src/validation.js` — `PHONE_PATTERN`, `parseSettings`.
  - `server/src/routes/me.js` — cały plik; `app.use('/api/me', meRouter)`.
  - `src/api/auth.js` — `updateSettings`.
  - `src/context/AuthProvider.jsx` — `updateUser`.
  - `src/pages/owner/SettingsPage.jsx` — cały plik.
  - `src/components/pets/PhoneNotice.jsx` — cały plik; użyj w `PetProfilePage` i w pustym `DashboardPage`.
- **Czego się uczę:** aktualizacja danych w kontekście po zapisie, status formularza jako jeden napis (`idle` / `saving` / `saved` / `error`), `type="tel"`.
- **Gotowe, gdy:** zmiana imienia od razu zmienia literę w kółku; błędny numer pokazuje błąd; konto bez telefonu widzi ostrzeżenie, które znika po zapisie; telefon jest w `psql`.
- **Commit:** `feat(owner): ustawienia z imieniem i numerem telefonu`

> **Kamień milowy M2 (6.12.2026):** dodanie, edycja i profil zwierzęcia na bazie danych.

---

# Część F — Wdrożenie i PWA

Wcześnie, bo geolokalizacja na telefonie wymaga HTTPS, a problemy z serwerem lepiej odkryć teraz niż tydzień przed obroną.

## Sesja 30: Cały system w Docker Compose · ~2–3 h
- **Cel:** `docker compose up --build` uruchamia bazę, API i frontend pod `http://localhost:8080`.
- **Źródło w prototypie:**
  - **[czytaj]** `Dockerfile` → `client/Dockerfile`, `.dockerignore` → `client/.dockerignore`.
  - **[czytaj]** `Caddyfile` → `client/Caddyfile`.
  - **[czytaj]** `server/Dockerfile`, `server/.dockerignore`.
  - **[czytaj]** `docker-compose.yml` z **`name: pettrace`** (prototyp ma `petrace`) i `.env.example`.
  - **[czytaj]** `server/src/config.js` — `trustProxyHops`; `server/src/app.js` — `trust proxy`, `x-powered-by`.
- **Czego się uczę:** obraz i kontener, budowanie wieloetapowe, wolumen, serwer wejściowy (reverse proxy), `try_files`, `depends_on` + `healthcheck`, sieć między kontenerami, `${ZMIENNA:-domyślna}`, `trust proxy` i `X-Forwarded-For` (bez tego limit prób widziałby jeden adres IP dla wszystkich).
- **Gotowe, gdy:** na `http://localhost:8080` działają logowanie i konto demo, odświeżenie dowolnej podstrony nie daje 404; `docker compose down` i `up` zachowują dane; `down -v` je kasuje.
- **Commit:** `chore(deploy): cały system w Docker Compose`

## Sesja 31: Aplikacja działa pod app.petracker.pl · ~2 h
- **Cel:** moja wersja działa na serwerze przez HTTPS pod `app.petracker.pl`, obok prototypu.
- **Źródło w prototypie:** `DEPLOY.md`, sekcja 14 i 5:
  - rekord DNS **A**: `app` → IP serwera,
  - na serwerze `git clone … ~/pettrace`, w `.env`: `SITE_ADDRESS=:80`, `HTTP_PORT=127.0.0.1:8081`, `HTTPS_PORT=127.0.0.1:8444`, `APP_URL=https://app.petracker.pl`, `POSTGRES_PASSWORD`, `JWT_SECRET`, `TRUST_PROXY_HOPS=2`, `DEMO_LOGIN=true`; potem `docker compose up -d --build`,
  - plik nginx z `proxy_pass http://127.0.0.1:8081`, `sudo nginx -t && sudo systemctl reload nginx`,
  - `sudo certbot --nginx -d app.petracker.pl`.
- **Czego się uczę:** SSH, DNS, subdomena, nginx jako reverse proxy, Let's Encrypt, port dostępny tylko z serwera (`127.0.0.1`), `.env` poza repozytorium, aktualizacja przez `git pull`.
- **Gotowe, gdy:** `https://app.petracker.pl` ma kłódkę; logowanie działa na telefonie; ciasteczko ma `Secure`; po 6 złych PIN-ach dostajesz 429; prototyp pod `petracker.pl` działa dalej.
- **Commit:** `docs(deploy): wdrożenie na app.petracker.pl`

## Sesja 32: Instaluję aplikację na telefonie (PWA) · ~1–1,5 h
- **Cel:** aplikację da się zainstalować z przeglądarki, ma ikonę PetTrace i otwiera się bez paska adresu.
- **Źródło w prototypie:**
  - `npm install -D vite-plugin-pwa`
  - Ikony 192, 512, maskable 512 i apple-touch 180 z dowolnego programu (nie przepisuj `generate-icons.mjs`).
  - `vite.config.js` — blok `VitePWA({ … })`; `index.html` — `<link rel="apple-touch-icon">`.
- **Czego się uczę:** manifest, service worker, precache, ikona maskable, dlaczego `/api` nie trafia do cache.
- **Gotowe, gdy:** w DevTools → Application widać manifest i aktywny service worker; po wdrożeniu aplikacja instaluje się na telefonie (T15).
- **Commit:** `feat(pwa): manifest, ikony i service worker`

> **Kamień milowy M3 (13.12.2026):** aplikacja pod własną domeną przez HTTPS, instalacja jako PWA.

---

# Część G — Zawieszka i znalazca

## Sesja 33: Znalazca skanuje tag i widzi profil zwierzaka · ~2,5–3 h
- **Cel:** niezalogowana osoba wchodzi na `/t/LUNA-7K2Q` i widzi imię, uwagi medyczne i „Zadzwoń do opiekuna”.
- **Źródło w prototypie:**
  - `server/src/services/tagCodes.js` — tylko `normalizeTagCode`.
  - `server/src/routes/tags.js` — `GET /tags/:code` **bez** `recordScan` i bez gałęzi `owner` i `lost`; `app.use('/api', tagsRouter)`.
  - `src/api/tags.js` — `resolveTag` razem z komentarzem o wariantach.
  - `src/lib/sms.js` — tylko `normalizePhone` i `buildTelLink`.
  - `src/components/finder/ActionLink.jsx`, `MedicalNotes.jsx`, `InactiveTagView.jsx`, `FoundView.jsx` — całe pliki.
  - `src/pages/finder/TagPage.jsx` — `TagContent` z wariantami `found` i `inactive` oraz `Loading`.
  - `src/router.jsx` — trasa `t/:tagId` w `FinderLayout`.
- **Czego się uczę:** routing kontekstowy (D6) — o widoku decyduje serwer, zwracanie tylko potrzebnych danych, `JOIN`, trasa publiczna, `switch` po wariancie, `tel:` jako `<a href>`, projektowanie pod stres.
- **Gotowe, gdy:** `/t/LUNA-7K2Q` pokazuje przycisk ≥ 56 px do `tel:+48600123456`, a numeru ani imienia opiekuna **nie ma na ekranie**; odpowiedź `found` w DevTools → Network nie zawiera id właściciela; `/t/XXXX-0000` i `/t/ABCD-EFGH` pokazują „Ten tag nie jest aktywny”; małe litery też działają.
- **Commit:** `feat(finder): profil zwierzaka po zeskanowaniu zawieszki`

## Sesja 34: Zaginione zwierzę — alarm dla znalazcy · ~1 h
- **Cel:** zawieszka zaginionego Mruczka pokazuje czerwony alarm z komunikatem i numerem opiekuna.
- **Źródło w prototypie:**
  - `server/src/routes/tags.js` — w `GET /tags/:code` gałąź `lost` (z `phone` i `message`).
  - `src/components/finder/LostView.jsx` — cały plik (przycisk SMS zadziała po sesji 36).
  - `src/pages/finder/TagPage.jsx` — `case 'lost'`.
- **Czego się uczę:** jednoznaczny komunikat alarmowy, kiedy numer jest widoczny, a kiedy nie (D5), `state` w `<Link>`.
- **Gotowe, gdy:** `/t/MRCZ-4P9D` pokazuje czerwony nagłówek, komunikat, numer i oba przyciski; `/t/LUNA-7K2Q` nadal nie pokazuje numeru jako tekstu; odpowiedź `found` nie zawiera komunikatu o zaginięciu.
- **Commit:** `feat(finder): widok alarmowy dla zaginionego zwierzęcia`

## Sesja 35: Włączam tryb zaginięcia w profilu · ~1,5–2 h
- **Cel:** w profilu przestawiam „Zaginione”, potwierdzam w oknie z komunikatem, a strona zawieszki pokazuje alarm.
- **Źródło w prototypie:**
  - **[czytaj]** `server/src/validation.js` — `parseLostMode`.
  - `server/src/routes/pets.js` — `PATCH /:id/lost`.
  - `src/api/pets.js` — `setLostMode`.
  - `src/components/pets/LostModeSwitch.jsx` — cały plik.
  - `src/pages/owner/PetProfilePage.jsx` — `updatedPet`, wyliczenie `pet`, `<LostModeSwitch>` pod kartą.
- **Czego się uczę:** potwierdzenie akcji w `Modal`, przełącznik, który nie zmienia stanu od razu, aktualizacja widoku danymi z API, `key` przy zmianie zwierzęcia.
- **Gotowe, gdy:** włączenie dla Luny od razu zmienia kartę na czerwoną i zmienia `is_lost` w bazie; po wylogowaniu `/t/LUNA-7K2Q` pokazuje alarm z twoim komunikatem (T13); wyłączenie też wymaga potwierdzenia.
- **Commit:** `feat(owner): przełącznik trybu zaginięcia z potwierdzeniem`

## Sesja 36: Znalazca wysyła mi SMS z lokalizacją · ~2–3 h
- **Cel:** z widoku alarmowego znalazca pobiera swoją pozycję i otwiera gotowy SMS z linkiem do mapy.
- **Źródło w prototypie:**
  - `src/hooks/useGeolocation.js` — cały plik.
  - `src/lib/sms.js` — `isIOS`, `buildSmsLink`, `mapsLink`, `buildFinderMessage`.
  - `src/pages/finder/ShareLocationPage.jsx` — cały plik; trasa `t/:tagId/lokalizacja`.
- **Czego się uczę:** Geolocation API (callback, zgoda, kody błędów), dlaczego tylko HTTPS/localhost, link `sms:` i różnice Android / iOS, `encodeURIComponent`, wyjście awaryjne bez lokalizacji, dane, które celowo **nie** trafiają do bazy (D4, RODO).
- **Gotowe, gdy:** w DevTools → Sensors ustawiasz pozycję, a „Otwórz SMS” zawiera numer i `https://maps.google.com/?q=…`; przy „Block” jest SMS z prośbą o opis miejsca; działa na prawdziwym telefonie pod `app.petracker.pl` (T6, T7).
- **Commit:** `feat(finder): SMS z lokalizacją do opiekuna`

## Sesja 37: Skanuję własny tag i zapisuję karmienie · ~2 h
- **Cel:** zalogowany właściciel na swojej zawieszce widzi „Karmienie” i „Spacer”, a kliknięcie zapisuje aktywność w bazie.
- **Źródło w prototypie:**
  - `server/src/routes/tags.js` — sprawdzenie właściciela i gałąź `owner` **przed** `lost`.
  - `server/src/validation.js` — `parseActivity`.
  - `server/src/routes/activities.js` — `POST`; `server/src/mappers.js` — `toActivity`.
  - `src/api/activities.js` — `logActivity`; u ciebie `client/src/api/activities.js`.
  - `src/components/finder/OwnerQuickLog.jsx` — cały plik.
  - `src/lib/format.js` — `formatRelative`.
  - `src/pages/finder/TagPage.jsx` — czekanie na `isLoading` z `useAuth`, `key={user?.id ?? 'anonymous'}`, `case 'owner'`.
- **Czego się uczę:** trasa publiczna z opcjonalną sesją (`loadUser`), kolejność warunków w routingu kontekstowym, `key` do ponownego pobrania po zmianie użytkownika, blokowanie przycisków w trakcie zapisu.
- **Gotowe, gdy:** zalogowany właściciel widzi „Zapisano karmienie (dziś, …)” i wiersz w `activities`; **inne** konto na tej samej zawieszce widzi zwykły profil; właściciel zaginionego Mruczka widzi szybki zapis, a nie alarm (T8).
- **Commit:** `feat(finder): szybki zapis aktywności po skanie własnej zawieszki`

## Sesja 38: Widzę aktywność z ostatnich 7 dni · ~1 h
- **Cel:** w profilu zakładka „Aktywność” pokazuje listę karmień i spacerów z tygodnia.
- **Źródło w prototypie:**
  - `server/src/routes/activities.js` — `GET`.
  - `src/api/activities.js` — `getActivities`.
  - `src/components/pets/ActivityList.jsx` — cały plik.
  - `src/pages/owner/PetProfilePage.jsx` — zakładka `activity` i `ActivityTab`.
- **Czego się uczę:** `req.query`, `make_interval`, filtrowanie po dacie w SQL, granice wartości (`Math.min`/`Math.max`).
- **Gotowe, gdy:** karmienie z sesji 37 jest na górze listy; `?days=1` zwraca mniej wpisów niż `?days=7`; nowe zwierzę widzi stan pusty z podpowiedzią.
- **Commit:** `feat(owner): aktywność zwierzęcia z ostatnich 7 dni`

## Sesja 39: Tworzę zawieszkę z kodem QR · ~2–3 h
- **Cel:** dla nowego zwierzęcia klikam „Utwórz zawieszkę” i dostaję kod `XXXX-XXXX`, kod QR, adres do NFC i plik do druku.
- **Źródło w prototypie:**
  - `npm install qrcode.react`
  - `server/src/services/tagCodes.js` — `ALPHABET`, `generateTagCode`.
  - `server/src/routes/tags.js` — `POST /pets/:id/tag`.
  - `src/api/tags.js` — `createTag`.
  - `src/pages/owner/PetTagPage.jsx` — `PetTagPage` bez `ScanHistory`, `CreateTag`, `TagDetails`; trasa `zwierzeta/:id/tag`.
- **Czego się uczę:** `crypto.randomInt` (losowanie bez przekłamań), alfabet bez mylących znaków, kolizja kodu i `ON CONFLICT DO NOTHING`, `QRCodeSVG`, `window.location.origin`, `navigator.clipboard`, `Blob`, warunek wstępny (bez telefonu nie ma zawieszki).
- **Gotowe, gdy:** nowy kod nie ma `0`, `O`, `1`, `I`, `L`; „Kopiuj” kopiuje adres; „Pobierz QR (SVG)” zapisuje plik; aparat telefonu otwiera adres z QR; konto bez telefonu widzi prośbę o uzupełnienie ustawień.
- **Commit:** `feat(tags): generowanie zawieszki z kodem QR`

## Sesja 40: Każde skanowanie zapisuje się w historii · ~2 h
- **Cel:** każde otwarcie strony zawieszki zapisuje skan, a strona zawieszki pokazuje historię z datą i przeglądarką.
- **Źródło w prototypie:**
  - `server/src/routes/tags.js` — `DUPLICATE_SCAN_SECONDS`, `recordScan` (wywołanie w `GET /tags/:code`), `GET /pets/:id/scans`.
  - `server/src/mappers.js` — `toScan`; `src/api/tags.js` — `getTagScans`.
  - `src/lib/format.js` — `describeUserAgent`.
  - `src/components/tags/ScanList.jsx` — cały plik.
  - `src/pages/owner/PetTagPage.jsx` — komponent `ScanHistory`.
- **Czego się uczę:** audyt bezpieczeństwa (UC8), minimalizacja danych (bez IP i lokalizacji), `INSERT … SELECT … WHERE NOT EXISTS` i ochrona przed podwójnym zapisem, nagłówek `User-Agent`.
- **Gotowe, gdy:** historia pokazuje skany z seeda („Safari · iOS”, „Chrome · Android”); wejście w incognito dodaje wpis „Inna osoba”, a własny skan ma „Ty”; jedno wejście daje jeden wiersz w `tag_scans` mimo `StrictMode` (T14).
- **Commit:** `feat(tags): zapis skanów i historia zawieszki`

> **Kamień milowy M4 (3.01.2027):** cztery warianty strony zawieszki, tryb zaginięcia, SMS z lokalizacją, zawieszka z QR, historia skanowań.

---

# Część H — Finał

## Sesja 41: Prawdziwa zawieszka otwiera aplikację · ~1–2 h
- **Cel:** przykładam telefon do tagu NFC albo skanuję wydrukowany QR i otwiera się strona zawieszki.
- **Źródło w prototypie:** `DEPLOY.md`, sekcja 12; `plan/09-testy.md`.
- **Czego się uczę:** NDEF i rekord URL, NTAG213/215/216, dlaczego nie blokować tagu, czytelność kodu QR.
- **Gotowe, gdy:** tag i wydrukowany QR otwierają stronę na Androidzie i iPhonie (T1, T2).
- **Commit:** `docs(tests): skan prawdziwej zawieszki na urządzeniach`

## Sesja 42: petracker.pl działa na mojej wersji · ~1 h
- **Cel:** moja aplikacja działa pod `https://petracker.pl`, a prototyp jest zatrzymany.
- **Źródło w prototypie:** `DEPLOY.md`, kroki 9 i 14. W `/etc/nginx/sites-available/petracker.pl` `proxy_pass http://127.0.0.1:8081`, w `.env` `APP_URL=https://petracker.pl`, prototyp `docker compose down` w `~/prototyp`.
- **Opcjonalnie, jeśli zostanie czas:** kopia bazy (`DEPLOY.md`, krok 8).
- **Czego się uczę:** przełączanie domeny, aktualizacja aplikacji na serwerze.
- **Gotowe, gdy:** logowanie działa pod `petracker.pl`; tag NFC przepisany na `https://petracker.pl/t/…` otwiera twoją wersję.
- **Commit:** `docs(deploy): przełącz petracker.pl na docelową wersję`

## Sesja 43: Testy na urządzeniach · ~3 h (dwa podejścia)
- **Cel:** wszystkie scenariusze z `plan/09-testy.md` są sprawdzone na Androidzie, iPhonie i komputerze.
- **Źródło w prototypie:** `plan/09-testy.md`, Lighthouse w Chrome DevTools.
- **Czego się uczę:** testy akceptacyjne, audyt Lighthouse, obsługa samą klawiaturą, czytnik ekranu.
- **Gotowe, gdy:** tabela testów wypełniona; Lighthouse ≥ 90 na `/`, `/t/LUNA-7K2Q` i `/panel`; każdy znaleziony błąd poprawiony osobnym commitem; zrzuty ekranu do pracy zrobione.
- **Commit:** `docs(tests): wyniki testów na urządzeniach`

> **Kamień milowy M5 (17.01.2027):** system zintegrowany i przetestowany pod docelową domeną.

---

# Poza planem

**Jeśli zostanie czas:** ilustracja i trzy kroki „Jak działa tag” na stronie głównej (są w prototypie), mapa przy wysyłaniu lokalizacji, zdjęcie zwierzęcia, „Nowy kod” zawieszki.

**Usunięte z zakresu:** spacery (ręczny wpis i GPS), harmonogram, udostępnianie weterynarzowi, logowanie magic linkiem z wysyłką maili, panel DEV.

**Ograniczenia logowania PIN-em do omówienia w pracy:**
- Sześć cyfr to tylko milion kombinacji. Przed zgadywaniem przez internet chroni limit prób, ale po wycieku bazy skróty da się złamać, mimo że używają `scrypt`.
- Nie ma potwierdzenia adresu e-mail, więc konto można założyć na cudzy adres.
- Nie ma samodzielnego resetu PIN-u, bo aplikacja nie wysyła maili. Reset robi administrator.
- Limit prób na e-mail pozwala komuś obcemu zablokować logowanie na czyjeś konto na 15 minut, a liczniki w pamięci zerują się przy restarcie serwera.
- Rejestracja zdradza, że e-mail ma już konto (409).

---

# Dodatek: pułapki i rzeczy, których nie kopiujemy z prototypu

- **React Router v7:** importy z `react-router` (nie `react-router-dom`).
- **Tailwind v4:** nie ma `tailwind.config.js`. Konfiguracja jest w `@theme` w CSS.
- **Express 5, nie 4:** błąd rzucony w funkcji `async` trafia sam do obsługi błędów. Starsze tutoriale owijają trasy w `try/catch` i wołają `next(error)` — tu nie trzeba.
- **SQL zawsze z parametrami** (`$1`, `$2`). Nigdy nie sklejaj zapytania z danymi od użytkownika.
- **Nigdy nie loguj PIN-u** i nie zwracaj `pin_hash` w odpowiedzi. Mapper `toUser` jest jedynym miejscem, które decyduje o polach użytkownika.
- **Schemat bazy wczytuje się tylko raz** (do pustej bazy). Po zmianie `001_init.sql` lokalnie: `docker compose -f docker-compose.dev.yml down -v` i `up -d`.
- **Hasło do bazy w Dockerze ustawia się tylko przy pierwszym starcie.** Zmiana `POSTGRES_PASSWORD` później daje `password authentication failed` — wtedy `down -v` (kasuje dane).
- **Port bazy 5434, nie 5432:** na Windowsie często działa już PostgreSQL zainstalowany w systemie.
- **Dwa projekty na jednym serwerze:** prototyp ma w `docker-compose.yml` nazwę `petrace`, twój — `pettrace`. Bez różnych nazw Docker pomieszałby kontenery i bazy.

# Postęp

| Część | Sesje | Kamień milowy | Gotowe |
|---|---|---|---|
| A–C. Fundamenty, layout, komponenty UI | etapy 0–12 | — | ☑ |
| Pierwsze funkcje na mocku | 13–16 | — | ☑ |
| D. Porządki i logowanie na serwerze | 17–24 | M1 | ☐ |
| E. Panel właściciela | 25–29 | M2 | ☐ |
| F. Wdrożenie i PWA | 30–32 | M3 | ☐ |
| G. Zawieszka i znalazca | 33–40 | M4 | ☐ |
| H. Finał | 41–43 | M5 | ☐ |
| Praca pisemna gotowa do złożenia | — | M6 (24.01.2027) | ☐ |
