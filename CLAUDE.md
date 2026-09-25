# PetTrace — brief projektu (frontend-prototyp)

> Ten plik to stały kontekst dla Claude Code. Czytaj go na początku każdej sesji
> i trzymaj się go. Jeśli coś w nim jest niejasne lub sprzeczne — zapytaj, zanim zgadniesz.

## 1. Czym jest projekt

Praca inżynierska: **„Inteligentny Ekosystem Identyfikacji i Zarządzania Aktywnością Zwierząt Domowych”**.
System identyfikacji i lokalizacji zwierząt domowych oparty na tagach **NFC / QR** przypiętych do obroży,
zintegrowany z aplikacją webową **PWA** z **routingiem kontekstowym**.

Kluczowa idea: tag przechowuje zwykły adres URL `https://<domena>/t/<tagId>`. Telefon znalazcy otwiera go
w przeglądarce — **bez instalowania żadnej aplikacji**. Ten sam adres pokazuje różne widoki zależnie od kontekstu
(czy zwierzę jest zaginione, czy skanuje właściciel itd.).

Cele: bezpieczeństwo (szybkie odnalezienie zgubionego zwierzęcia) i profilaktyka zdrowotna
(harmonogram szczepień/leków, rejestr aktywności, szybkie udostępnienie danych weterynarzowi).

**Zakres TEGO etapu: wyłącznie frontend.** Backendu nie ma — wszystkie dane pochodzą z warstwy mock
(patrz sekcja 6), zaprojektowanej tak, by później podmienić ją na prawdziwe API (Node.js + Express + PostgreSQL)
bez zmian w komponentach.

Autor będzie tę aplikację później przepisywał samodzielnie, ucząc się na niej — kod ma być **czytelny i edukacyjny**.

## 2. Stack

- **Vite + React** (JavaScript, JSX — bez TypeScriptu, dla czytelności)
- **Tailwind CSS v4** (plugin `@tailwindcss/vite`, tokeny w `@theme` w `src/index.css`)
- **React Router v7** (`createBrowserRouter`, zagnieżdżone layouty)
- **react-leaflet + Leaflet** — mapy (kafelki OpenStreetMap)
- **qrcode.react** — kody QR (Vet Quick Share, podgląd tagu)
- **recharts** — wykresy w analityce spacerów
- **lucide-react** — ikony
- **vite-plugin-pwa** — manifest, service worker, instalowalność
- **@fontsource** — fonty hostowane lokalnie (działają offline w PWA)

Nie dodawaj innych bibliotek bez uzasadnienia w odpowiedzi. Żadnych bibliotek komponentów UI (MUI, shadcn itp.) —
komponenty budujemy sami w Tailwindzie.

## 3. Kierunek wizualny

Charakter: **ciepły, spokojny, godny zaufania** — jak dobra przychodnia weterynaryjna połączona z porządną
aplikacją sportową. Nie „słodki” i nie „kliniczno-sterylny”. Mobile-first (projektuj od 375 px), na desktopie
treść w wygodnej kolumnie / siatce, a panel właściciela z boczną nawigacją.

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
| `alert` (Lost Mode) | `#D2362B` | tryb zaginięcia, błędy krytyczne |
| `alert-soft` | `#FCE6E3` | tła alarmowe |
| `sky` | `#3A7CA5` | informacje, mapy, trasy spacerów |
| `amber` | `#C98A12` | ostrzeżenia, zbliżające się terminy |

Kontrast tekstu minimum WCAG AA. Nie używaj czystej czerni ani szarości Tailwinda — tylko tokeny.

### Typografia
- Nagłówki: **Bricolage Grotesque** (600–800), lekko zaciśnięty tracking na dużych rozmiarach
- Tekst i UI: **Plus Jakarta Sans** (400–700)
- Liczby w statystykach: `font-variant-numeric: tabular-nums`
- Identyfikatory tagów: font monospace systemowy

### Język kształtów
- Zaokrąglenia: karty `rounded-2xl`, przyciski i inputy `rounded-xl`, badge `rounded-full`
- Cienie subtelne, ciepłe (lekko brązowawe), zamiast mocnych — hierarchię buduj głównie kolorem i odstępami
- Hojne odstępy, wyraźna hierarchia: jedna główna akcja na ekran
- Mikrointerakcje: delikatne przejścia (150–250 ms), stany hover/active/focus-visible dla każdego elementu klikalnego;
  respektuj `prefers-reduced-motion`
- Zdjęcia zwierząt: placeholdery z inicjałem i kolorowym tłem (bez zewnętrznych obrazków)

### Trzy „tonacje” interfejsu
1. **Owner (panel właściciela)** — spokojny, informacyjny, gęstszy układ danych.
2. **Finder (znalazca)** — maksymalnie prosty: duże zdjęcie, imię, 2–3 ogromne przyciski (min. 56 px),
   obsługa jedną ręką, zero nawigacji, zero logowania. Czytelny w słońcu i w stresie.
3. **Lost Mode** — ta sama prostota co Finder, ale z czerwonym, jednoznacznie alarmowym nagłówkiem
   („ZAGINĄŁ — pomóż mi wrócić do domu”) i wyeksponowaną akcją wysłania lokalizacji.

Wszystkie teksty w UI **po polsku**. Nazwy w kodzie (zmienne, pliki, komponenty) **po angielsku**.

## 4. Mapa tras

```
PUBLICZNE (PublicLayout)
/                          Landing: czym jest system, jak działa tag, CTA „Zaloguj się”
/login                     E-mail → „wyślij magic link”
/login/sprawdz-poczte      Informacja o wysłanym linku + [DEV] przycisk „Symuluj kliknięcie w link”
/auth/verify               Obsługa tokenu (mock) → przekierowanie do /panel

FINDER FLOW (FinderLayout, bez logowania)
/t/:tagId                  Routing kontekstowy — jeden komponent decyduje, co pokazać:
                             • tag nieznany / nieaktywny → ekran „Tag nieaktywny”
                             • zalogowany właściciel tego zwierzęcia → Quick NFC Tap
                               (szybki zapis: spacer / karmienie / lek / „tylko sprawdzam”)
                             • zwierzę w Lost Mode → widok alarmowy
                             • w pozostałych przypadkach → publiczny profil znalezionego zwierzęcia
/t/:tagId/lokalizacja      Udostępnienie lokalizacji (Geolocation API + mapa + opcjonalna wiadomość i telefon)
/t/:tagId/wyslano          Potwierdzenie + „co dalej” (np. zostań ze zwierzęciem, podaj wodę)

VET (VetLayout, publiczny, tymczasowy)
/vet/:shareToken           Paszport medyczny: szczepienia, leki, alergie, choroby, waga; licznik ważności;
                           stan „link wygasł”

OWNER FLOW (OwnerLayout, wymaga „zalogowania”)
/panel                     Dashboard: karty zwierząt (z oznaczeniem Lost Mode), najbliższe przypomnienia,
                           podsumowanie aktywności z tygodnia, ostatnie odczyty tagów
/zwierzeta/nowe            Formularz dodania zwierzęcia (wieloetapowy: podstawowe → zdrowie → kontakt)
/zwierzeta/:id             Profil zwierzęcia, zakładki: Informacje / Zdrowie / Aktywność / Tag
/zwierzeta/:id/edytuj      Edycja
/zwierzeta/:id/zaginiecie  Lost Mode: włącz/wyłącz (z potwierdzeniem), komunikat dla znalazców,
                           mapa z pinezkami zgłoszeń lokalizacji od znalazców
/zwierzeta/:id/vet-share   Generowanie tymczasowego QR dla weterynarza (wybór czasu ważności, zakres danych),
                           lista aktywnych udostępnień z możliwością unieważnienia
/zwierzeta/:id/tag         Parowanie tagu (wpisanie/skan ID), podgląd QR tagu, audyt: historia odczytów
                           (data, przybliżone miejsce, kontekst: znalazca / właściciel / weterynarz)
/spacery                   Lista spacerów + analityka (dystans i czas tygodniowo — recharts)
/spacery/nowy              Śledzenie na żywo: mapa, czas, dystans, start/pauza/koniec
                           (Geolocation watchPosition; jeśli brak zgody lub desktop → symulowana trasa)
/spacery/:id               Szczegóły spaceru: trasa na mapie, statystyki, notatka
/harmonogram               Przypomnienia: szczepienia, leki, odrobaczanie, wizyty — widok listy
                           pogrupowany (zaległe / dziś / nadchodzące), dodawanie, oznaczanie jako wykonane
/ustawienia                Konto, powiadomienia (UI przełączników), dane kontaktowe widoczne dla znalazcy,
                           wylogowanie
*                          404
```

Nawigacja Owner: na mobile dolny pasek (Panel · Spacery · Harmonogram · Ustawienia) + pływający przycisk
szybkiej akcji; na desktopie boczny sidebar.

## 5. Struktura folderów

```
src/
  api/              warstwa danych (dziś mock, jutro fetch do backendu)
  mocks/            dane przykładowe + „baza” w localStorage
  components/
    ui/             Button, Card, Input, Textarea, Select, Badge, Tabs, Modal, Toggle, EmptyState, Spinner, StatTile
    layout/         PublicLayout, FinderLayout, VetLayout, OwnerLayout, BottomNav, Sidebar
    pets/           PetAvatar, PetCard, LostBanner
    map/            MapView, WalkRoute, ReportPins
    reminders/      ReminderItem
  pages/
    public/  finder/  vet/  owner/
  hooks/            useAuth, useGeolocation, useWalkTracker …
  context/          AuthContext
  lib/              formatowanie dat/dystansu, obliczenia (haversine) itp.
  router.jsx
  main.jsx
  index.css         Tailwind + @theme (tokeny)
```

## 6. Dane i „backend” mock

- Komponenty **nigdy** nie importują danych z `mocks/` bezpośrednio — tylko przez funkcje z `src/api/`
  (np. `getPets()`, `getPetById(id)`, `resolveTag(tagId)`, `setLostMode(petId, on)`, `createWalk(...)`,
  `getReminders()`, `createVetShare(...)`, `getTagScans(petId)`, `reportLocation(tagId, payload)`).
- Funkcje API są `async`, dodają sztuczne opóźnienie 200–500 ms i zapisują zmiany w `localStorage`,
  żeby prototyp „pamiętał” akcje po odświeżeniu. Dodaj funkcję resetu danych.
- Każdy ekran obsługuje stany: **ładowanie, pusty, błąd, sukces**.
- Autoryzacja: `AuthContext` z mockowym magic linkiem; trasy Owner chronione (przekierowanie na /login).

Dane przykładowe (realistyczne, polskie):
- Właściciel: Maciej, Kraków.
- **Luna** — pies, border collie, 3 lata, tag `LUNA-7K2Q`, stan normalny, kilkanaście spacerów
  z trasami po Krakowie (Błonia, Bulwary Wiślane), szczepienia i leki.
- **Mruczek** — kot, europejski, 6 lat, tag `MRCZ-4P9D`, **w Lost Mode**, 2 zgłoszenia lokalizacji od znalazców.
- Tag `XXXX-0000` — nieaktywny (do demonstracji ekranu „Tag nieaktywny”).
- Historia odczytów tagów, kilka przypomnień (w tym jedno zaległe), jedno aktywne udostępnienie dla weterynarza.

## 7. Tryb demonstracyjny

Dodaj dyskretny, zwijany **panel DEV** (widoczny tylko w trybie deweloperskim) pozwalający:
przełączyć zalogowanie, otworzyć `/t/<tagId>` każdego zwierzęcia, włączyć/wyłączyć Lost Mode, zresetować dane.
Chodzi o to, by w kilka sekund zobaczyć każdy wariant routingu kontekstowego.

## 8. PWA

`vite-plugin-pwa`: manifest (nazwa, kolory z tokenów, ikony — wygeneruj proste SVG/PNG), service worker
z cache zasobów aplikacji. Widoki Finder i Vet powinny działać możliwie szybko i lekko.
Powiadomienia push — tylko UI zgody w ustawieniach, bez implementacji (wymagają backendu).

## 9. Standardy kodu

- Komponenty funkcyjne, małe i jednoodpowiedzialne; logika w hookach.
- Semantyczny HTML (`header`, `main`, `nav`, `section`, `button` zamiast klikalnych `div`), etykiety w formularzach,
  `aria-*` tam, gdzie potrzebne, widoczny focus.
- **Komentarze po polsku** przy nieoczywistych decyzjach (np. jak działa routing kontekstowy, dlaczego tak liczymy
  dystans) — autor będzie się na tym kodzie uczył. Bez komentowania rzeczy oczywistych.
- Bez martwego kodu i bez `console.log` w gotowych etapach.
- Po każdym etapie aplikacja musi się budować (`npm run build`) i uruchamiać bez błędów w konsoli.

## 10. Sposób pracy

Pracujemy **etapami**. Na koniec każdego etapu: krótko podsumuj, co powstało, jak to sprawdzić
(konkretne adresy do kliknięcia) i co jest uproszczone względem docelowej wersji.

1. Setup: zależności, Tailwind z tokenami i fontami, router ze wszystkimi trasami (strony-szkielety), layouty, panel DEV.
2. UI kit (`components/ui`) + strona `/dev/ui` prezentująca wszystkie komponenty i warianty.
3. Warstwa mock (`api/`, `mocks/`) + AuthContext + logowanie magic link.
4. Owner Flow: dashboard, profil zwierzęcia z zakładkami, formularz dodawania/edycji.
5. Finder Flow + Lost Mode + Vet view (routing kontekstowy `/t/:tagId`).
6. Mapy i spacery: śledzenie, szczegóły, analityka; mapa zgłoszeń w Lost Mode.
7. Harmonogram, Vet Quick Share, audyt tagu, ustawienia, 404.
8. PWA + dopracowanie: responsywność desktop, dostępność, stany puste/błędów, spójność wizualna.
