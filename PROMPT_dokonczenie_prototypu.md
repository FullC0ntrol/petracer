# Zadanie: dokończenie prototypu PeTrace do w pełni działającej aplikacji

## Kontekst

To repozytorium (`petracer`) jest prototypem aplikacji PeTrace: system identyfikacji zwierząt przez zawieszki NFC/QR i aplikację webową PWA z routingiem kontekstowym. Na podstawie prototypu autor przepisuje aplikację samodzielnie w osobnym repozytorium, etap po etapie, według `PLAN_PRZEPISYWANIA.md`.

Obecnie prototyp ma gotowe fundamenty (routing, layouty, komponenty UI, dane przykładowe, warstwa `api/` na mockach), ale większość stron to szkice `SketchBox`, a backendu nie ma.

**Cel:** prototyp ma się stać w pełni działającą aplikacją: prawdziwy backend, prawdziwa baza danych, prawdziwe logowanie magic link, wszystkie strony z priorytetu 1 działające, gotowe do wdrożenia na VPS w Dockerze.

## Źródło prawdy: folder `docs/`

W `docs/` jest aktualna specyfikacja projektu. Przeczytaj wszystkie pliki, zanim cokolwiek zmienisz:

- `00-start.md`: opis projektu i założenia
- `01-zakres.md`: zakres i priorytety (P1, P2, P3, kierunki rozwoju)
- `02-przypadki-uzycia.md`: scenariusze UC1–UC12
- `03-widoki-i-trasy.md`: wszystkie trasy i routing kontekstowy
- `04-architektura.md`: architektura, schemat bazy, lista endpointów API, bezpieczeństwo, wdrożenie
- `05-decyzje.md`: decyzje projektowe D1–D20
- `06-harmonogram.md`, `09-testy.md`: kamienie milowe i scenariusze testów

Gdy `CLAUDE.md` albo obecny kod przeczy `docs/`, wygrywa `docs/`. Gdy `docs/` czegoś nie rozstrzyga albo uważasz, że coś w nich jest błędne lub niewykonalne, **zapytaj**, zamiast zgadywać. Nie zmieniaj plików w `docs/` bez mojej zgody.

## Najważniejsza zasada: etapy 0–13 są zamrożone

Autor ma już przepisane etapy 0–13 z `PLAN_PRZEPISYWANIA.md` i używa prototypu jako wzoru do kolejnych etapów. Kod z tych etapów musi zostać taki, jaki jest, żeby wzór nie rozjechał się z tym, co autor już napisał.

**Pliki zamrożone** (powstały w etapach 0–13):

- `index.html`, `vite.config.js`, `eslint.config.js`, `src/main.jsx`, `src/index.css`
- `src/components/layout/*`: `RootLayout`, `PublicLayout`, `FinderLayout`, `VetLayout`, `PageHeader`, `Logo`, `Sidebar`, `BottomNav`, `OwnerLayout`, `ownerNav.js`
- `src/components/ui/*`: wszystkie istniejące komponenty i `fieldClasses.js`
- `src/lib/cn.js`, `src/pages/dev/UiGalleryPage.jsx`, `src/pages/public/LandingPage.jsx`, `src/pages/public/NotFoundPage.jsx`
- `src/mocks/seed.js`
- etapy 0–13 w `PLAN_PRZEPISYWANIA.md`

**Co wolno w zamrożonych plikach** (tylko zmiany dopisujące, takie, jakie i tak przewidują późniejsze etapy planu):

- `src/router.jsx`: zmiana tras zgodnie z `docs/03-widoki-i-trasy.md` (to jest normalna część kolejnych etapów)
- `vite.config.js`: dopisanie proxy `/api` dla serwera deweloperskiego i wtyczki PWA
- `src/main.jsx`: owinięcie aplikacji w providery (np. `AuthProvider`)
- `src/mocks/seed.js`: dopisanie nowych kolekcji (np. `activities`); istniejących nie usuwaj ani nie zmieniaj
- `index.html`: dopisanie linku do ikony apple-touch
- `RequireAuth.jsx` może przejść z `devStore` na prawdziwy `useAuth`

**Czego nie wolno:** zmieniać wyglądu, klas, propsów ani zachowania istniejących komponentów UI i layoutów, zmieniać tokenów w `index.css`, przepisywać treści etapów 0–13 w planie. Jeśli uznasz, że zmiana zamrożonego pliku jest konieczna, **zatrzymaj się i zapytaj**, podając powód. Gdy potrzebujesz komponentu UI, którego nie ma, utwórz nowy plik zamiast zmieniać istniejący.

Pliki z etapu 14 i późniejszych (np. `mocks/db.js`, `api/*`, `context/*`, `hooks/*`, strony z `SketchBox`, `dev/*`) możesz zmieniać i przepisywać dowolnie.

## Zakres

1. **Najpierw cały priorytet 1** z `docs/01-zakres.md`. Każda strona P1 ma działać naprawdę, bez `SketchBox`.
2. **Priorytet 2 dopiero po mojej akceptacji** działającego P1.
3. Priorytet 3 i kierunki rozwoju: nie implementuj.

Najważniejsze różnice między obecnym prototypem a `docs/`:

- lokalizacja znalazcy idzie przez link `sms:` i **nie jest zapisywana w bazie**; nie ma `/t/:tagId/wyslano`, mapy zgłoszeń ani `api/reports`
- tryb zaginięcia to przełącznik w profilu zwierzęcia z potwierdzeniem w `Modal`; nie ma strony `/zwierzeta/:id/zaginiecie`
- zawieszkę **generuje** właściciel w `/zwierzeta/:id/tag` („Utwórz tag”), zamiast parować istniejący kod
- spacery: ręczny wpis (P2) i szybki zapis po skanie; brak śledzenia GPS, brak `/spacery/:id`, brak `recharts`
- formularz zwierzęcia jest jednoetapowy
- routing kontekstowy `/t/:tagId`: cztery warianty w kolejności z `docs/03`; wariant wybiera **serwer** (D6) i zwraca tylko dane potrzebne w tym wariancie
- właściciel tagu jest sprawdzany naprawdę (porównanie właściciela zwierzęcia z zalogowanym użytkownikiem), a nie „każdy zalogowany”
- po zalogowaniu powrót na stronę, z której użytkownik został przekierowany do `/login`

Pliki stron, które według `docs/03` przestają istnieć (`LocationSentPage`, `LostModePage`, `WalkDetailsPage`), usuń razem z ich trasami.

## Architektura techniczna

Szczegóły w `docs/04-architektura.md`. W skrócie:

**Frontend** zostaje w korzeniu repozytorium (nie przenoś go do `client/`, żeby nie zmieniać ścieżek zamrożonych plików).

- Warstwa `src/api/` ma **dwie implementacje** wybierane zmienną `VITE_API_MODE`: `mock` (dane z `localStorage`, jak obecnie) i `http` (`fetch` do `/api`). Komponenty i strony nie wiedzą, która jest aktywna. To odpowiada decyzji D16 i pozwala autorowi przepisywać najpierw wersję mock, a potem przejść na prawdziwe API.
- PWA przez `vite-plugin-pwa`: manifest z kolorami z tokenów, ikony 192, 512 i maskable, podstawowy service worker.

**Backend** w nowym folderze `server/`:

- Node.js + Express, biblioteka `pg`, zapytania SQL pisane ręcznie, bez ORM (D15)
- schemat w `server/sql/001_init.sql` według ERD z `docs/04`
- skrypt z danymi przykładowymi (Luna, Mruczek, ich zawieszki, kilka skanowań i aktywności), żeby po uruchomieniu było co oglądać
- logowanie magic link: token z `crypto.randomBytes`, w bazie tylko hash SHA-256, ważny 15 minut, jednorazowy; sesja jako JWT w ciasteczku `httpOnly`, `Secure` (w produkcji), `SameSite=Lax` (D7, D8)
- wysyłka maili przez `nodemailer` i SMTP z konfiguracją w zmiennych środowiskowych; **w trybie deweloperskim link wypisywany w konsoli serwera**, żeby dało się logować bez skrzynki
- ograniczenie liczby żądań na `/api/auth/request-link`, sprawdzanie własności zasobu w każdym chronionym endpoincie
- generowanie kodu zawieszki: 8 znaków w formacie `XXXX-XXXX`, alfabet bez mylących znaków (`0/O`, `1/I/L`)
- `GET /api/tags/:code` zapisuje skan (data, user-agent, czy właściciel) i zwraca wariant

**Wdrożenie:**

- `docker-compose.yml` w korzeniu z usługami `db` (PostgreSQL, wolumen, schemat ładowany przy pierwszym starcie), `api` i `caddy` (serwuje zbudowany frontend, `/api/*` przekazuje do `api`, automatyczny HTTPS)
- osobna konfiguracja do pracy lokalnej, w której wystarczy `docker compose up` (albo uruchomienie samej bazy w Dockerze i `npm run dev` dla frontendu i backendu)
- `.env.example` z opisem każdej zmiennej; prawdziwe `.env` w `.gitignore`

## Baza danych i serwer

Utwórz wszystko, co da się utworzyć w repozytorium: schemat, dane przykładowe, `Dockerfile` dla API, `docker-compose.yml`, `Caddyfile`. Sprawdź lokalnie, że baza startuje, schemat się ładuje, a aplikacja działa w trybie `http`.

Tego, czego nie możesz zrobić sam (dostęp do mojego VPS, konfiguracja DNS domeny, konto u dostawcy poczty), nie zgaduj. Napisz `DEPLOY.md`: instrukcję krok po kroku dla osoby, która pierwszy raz wdraża aplikację na VPS. Ma zawierać: co zainstalować na serwerze, jak ustawić rekordy DNS, jak przenieść projekt na serwer, jak ustawić zmienne środowiskowe, jak uruchomić, jak sprawdzić, że działa, jak zrobić kopię zapasową bazy (`pg_dump`), jak zaktualizować aplikację po zmianach i co robić, gdy coś nie działa. Każde polecenie w osobnym bloku kodu z jednym zdaniem wyjaśnienia.

Do tego w `DEPLOY.md` sekcja o zawieszkach: jak zapisać adres na tagu NFC aplikacją NFC Tools (bez blokowania tagu) i jak wydrukować kod QR.

## Plan przepisywania

Gdy aplikacja będzie działać, zaktualizuj `PLAN_PRZEPISYWANIA.md` **od etapu 14 włącznie**. Etapy 0–13 zostają bez zmian, słowo w słowo.

- Etapy od 14 mają odpowiadać temu, co faktycznie jest w działającym prototypie, i prowadzić autora do tej samej aplikacji.
- Zachowaj format istniejących etapów: gwiazdki trudności, „Nowe pojęcia”, „Wzór” (wskazanie plików prototypu), kroki z checkboxami, „Sprawdź”, „README”, „Commit”.
- Usuń etapy dla funkcji spoza zakresu, dopisz nowe części: backend (Express, baza, magic link, endpointy), integrację (przełączenie `api/` na `http`) i wdrożenie (Docker, Caddy, VPS). Część backendowa ma być równie szczegółowa i dydaktyczna jak frontendowa, bo autor dopiero uczy się Node.js i SQL.
- Kolejność etapów ma pasować do kamieni milowych z `docs/06-harmonogram.md`: najpierw frontend na mockach, wcześnie wdrożenie samego frontendu (PWA), potem backend, na końcu integracja.
- Etapy mają być krótkie: autor ma ok. 1 godzinę w dni robocze i dłuższe bloki w weekend. Jeden etap to maksymalnie 2–3 godziny pracy; większe rozbij.

Zaktualizuj też `CLAUDE.md`, żeby nie przeczył `docs/`, i `README.md` (uruchomienie frontendu, backendu i całości).

## Sposób pracy

1. **Rozpoznanie.** Przeczytaj `docs/`, `CLAUDE.md`, `PLAN_PRZEPISYWANIA.md` i kod. Zanim napiszesz jakikolwiek kod, wypisz:
   - różnice między kodem a `docs/`, które znalazłeś,
   - pytania (lista niżej plus wszystko, co jest niejasne),
   - plan faz z listą plików, które utworzysz, zmienisz i usuniesz w każdej fazie.

   **Poczekaj na moją odpowiedź.**
2. **Fazy.** Pracuj fazami w tej kolejności, po każdej zatrzymaj się i podsumuj:
   1. backend i baza lokalnie (schemat, dane przykładowe, logowanie z linkiem w konsoli)
   2. warstwa `api/` z trybami `mock` i `http`, kontekst logowania, ochrona tras, logowanie w interfejsie
   3. strony właściciela z P1
   4. strona zawieszki z czterema wariantami, widoki znalazcy, SMS z lokalizacją, generowanie zawieszki i QR
   5. PWA, `docker-compose.yml`, `Caddyfile`, `.env.example`, `DEPLOY.md`
   6. `PLAN_PRZEPISYWANIA.md` od etapu 14, `CLAUDE.md`, `README.md`
   7. priorytet 2, tylko po mojej akceptacji
3. **Po każdej fazie:** `npm run lint` i `npm run build` bez błędów, krótka lista „jak to sprawdzić ręcznie” (adresy, co kliknąć, co powinno się stać), commit z opisem po polsku w trybie rozkazującym, np. „Dodaj endpointy logowania magic link”.
4. **Pytaj**, gdy coś jest niejasne, gdy dwie rzeczy w specyfikacji sobie przeczą, gdy chcesz dodać zależność spoza listy z `docs/` albo gdy rozwiązanie wymaga zmiany zamrożonego pliku. Lepiej jedno pytanie za dużo niż przepisywanie fazy.

## Pytania, które zadaj na początku

- Jaka jest domena aplikacji (potrzebna do `Caddyfile`, linków w mailach i adresów zawieszek)?
- Jaki dostawca poczty do wysyłki linków w produkcji (np. własne SMTP, Gmail z hasłem aplikacji, dostawca poczty transakcyjnej)? Do tego czasu wystarczy link w konsoli.
- Na jakich telefonach będę testować (Android, iPhone)? Od tego zależy obsługa składni `sms:`.
- Czy wersje bibliotek w `package.json` mogą zostać, czy aktualizujemy?
- Wszystko, czego nie rozstrzygają `docs/`.

## Definicja ukończenia

Aplikacja jest gotowa, gdy:

- działa cały przepływ: logowanie linkiem → dodanie zwierzęcia → utworzenie zawieszki z QR → skan jako właściciel (szybki zapis) → włączenie trybu zaginięcia → skan jako niezalogowany (widok alarmowy) → SMS z lokalizacją → historia skanowań w panelu
- wszystkie scenariusze z `docs/09-testy.md`, które da się sprawdzić na komputerze, przechodzą
- `docker compose up` uruchamia całość lokalnie
- `npm run lint` i `npm run build` przechodzą bez błędów
- w konsoli przeglądarki nie ma błędów
- `DEPLOY.md` pozwala wdrożyć aplikację na czysty VPS bez dodatkowej wiedzy
- etapy 0–13 planu i zamrożone pliki są nienaruszone (sprawdź `git diff` przed ostatnim commitem i wypisz wszystkie zmiany w zamrożonych plikach z uzasadnieniem)
