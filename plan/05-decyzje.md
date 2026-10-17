# Dziennik decyzji

Każdy wpis opisuje decyzję projektową, jej uzasadnienie i odrzucone alternatywy. Nowe wpisy dopisywane są na końcu. Zmiana decyzji to nowy wpis z odwołaniem do poprzedniego, bez usuwania starego.

## Spis

| Nr | Decyzja | Obszar |
|---|---|---|
| D1 | Aplikacja webowa PWA zamiast aplikacji natywnej | koncepcja |
| D2 | NFC i kod QR na jednej zawieszce | koncepcja |
| D3 | Krótkie adresy `/t/:tagId` | koncepcja |
| D4 | Lokalizacja znalazcy przez SMS, bez zapisu w bazie | prywatność |
| D5 | Znaczenie „danych zamaskowanych” | prywatność |
| D6 | Wariant strony zawieszki wybiera serwer | bezpieczeństwo |
| D7 | Logowanie magic link | bezpieczeństwo |
| D8 | Sesja w ciasteczku `httpOnly`, jedna domena | bezpieczeństwo |
| D9 | Zawieszka generowana w panelu właściciela | funkcje |
| D10 | Tryb zaginięcia w profilu zwierzęcia | funkcje |
| D11 | Spacery wpisywane ręcznie | funkcje |
| D12 | React z Vite | technologie |
| D13 | Tailwind CSS v4 z własnymi tokenami | technologie |
| D14 | PostgreSQL | technologie |
| D15 | SQL bez ORM | technologie |
| D16 | Warstwa danych przykładowych przed backendem | architektura |
| D17 | Wspólne komponenty interfejsu | architektura |
| D18 | Monorepo `client/` i `server/` | architektura |
| D19 | Caddy jako serwer wejściowy | wdrożenie |
| D20 | Priorytetyzacja zakresu | zakres |

---

### D1 · Aplikacja webowa PWA zamiast aplikacji natywnej
**Decyzja:** system jest aplikacją webową w standardzie PWA.
**Uzasadnienie:** znalazca musi zobaczyć dane zwierzęcia natychmiast po zeskanowaniu zawieszki. Konieczność instalacji aplikacji ze sklepu w tej sytuacji praktycznie eliminuje szansę na kontakt. PWA działa w każdej przeglądarce, a właściciel może ją zainstalować na ekranie głównym.
**Odrzucone:** aplikacja natywna (Android/iOS), aplikacja hybrydowa (React Native, Flutter).
**Konsekwencje:** ograniczony dostęp do funkcji urządzenia (geolokalizacja w tle, powiadomienia na iOS), opisany w kierunkach rozwoju.

### D2 · NFC i kod QR na jednej zawieszce
**Decyzja:** każda zawieszka ma tag NFC i nadrukowany kod QR z tym samym adresem.
**Uzasadnienie:** NFC jest najszybsze (przyłożenie telefonu), ale nie każdy telefon ma NFC, a część użytkowników nie wie, gdzie znajduje się antena. Kod QR odczyta aparat praktycznie każdego smartfona. Obie metody otwierają ten sam adres, więc system nie musi ich rozróżniać.

### D3 · Krótkie adresy `/t/:tagId`
**Decyzja:** adres zawieszki ma postać `domena/t/<kod>`, gdzie kod ma 8 znaków, np. `K7Q2-M9XD`.
**Uzasadnienie:** popularne tagi NFC (NTAG213) mają ok. 140 bajtów pamięci na dane, więc krótki adres zostawia zapas. Krótki kod QR ma mniejszą gęstość i łatwiej go odczytać z małej, zabrudzonej zawieszki.
**Odrzucone:** `/pet/:tagId`, `/tag/<UUID>` (UUID ma 36 znaków).

### D4 · Lokalizacja znalazcy przez SMS, bez zapisu w bazie
**Decyzja:** znalazca udostępnia pozycję GPS, aplikacja buduje link `sms:` z numerem opiekuna i treścią zawierającą link do mapy, a telefon otwiera systemową aplikację wiadomości.
**Uzasadnienie:** dane lokalizacyjne osoby trzeciej nie są przetwarzane ani przechowywane przez system, co ogranicza obowiązki wynikające z RODO. Opiekun dostaje wiadomość w kanale, z którego korzysta na co dzień.
**Odrzucone:** zapis zgłoszeń w bazie z mapą w panelu właściciela.
**Uwagi:** składnia treści w linku `sms:` różni się między Androidem a iOS, co wymaga testów na obu systemach ([09-testy.md](09-testy.md)).

### D5 · Znaczenie „danych zamaskowanych”
**Decyzja:** gdy zwierzę nie jest zaginione, znalazca widzi imię zwierzęcia, uwagi medyczne i przycisk „Zadzwoń”, ale nie widzi imienia, adresu e-mail ani numeru opiekuna wyświetlonego jako tekst. W trybie zaginięcia numer jest wyświetlany, a dochodzi możliwość wysłania SMS-a z lokalizacją.
**Uzasadnienie:** znalazca musi mieć możliwość kontaktu także wtedy, gdy opiekun jeszcze nie zauważył zaginięcia.
**Ograniczenie:** numer jest zawarty w linku `tel:`, więc technicznie można go odczytać. Pełne ukrycie wymagałoby pośredniczenia w kontakcie przez system (kierunek rozwoju).

### D6 · Wariant strony zawieszki wybiera serwer
**Decyzja:** `GET /api/tags/:code` zwraca nazwę wariantu (`inactive`, `owner`, `lost`, `found`) i wyłącznie dane potrzebne w tym wariancie.
**Uzasadnienie:** dane, których osoba skanująca nie powinna widzieć, w ogóle nie trafiają do przeglądarki. Ukrywanie pól dopiero w interfejsie pozostawiałoby je dostępne w odpowiedzi serwera.
**Odrzucone:** pobranie pełnego profilu i wybór widoku w aplikacji klienckiej.

### D7 · Logowanie magic link
**Decyzja:** logowanie bez hasła, jednorazowym linkiem wysyłanym na e-mail. Link jest ważny 15 minut i działa raz. W bazie przechowywany jest wyłącznie skrót (hash SHA-256) tokenu.
**Uzasadnienie:** brak haseł eliminuje problem słabych i powtarzanych haseł oraz ich wycieków. Dla właściciela, który loguje się rzadko, link w mailu jest wygodniejszy niż pamiętanie hasła.
**Odrzucone:** login i hasło; logowanie danymi zwierzęcia (np. imię i data urodzenia), które łatwo zgadnąć.

### D8 · Sesja w ciasteczku `httpOnly`, jedna domena
**Decyzja:** po weryfikacji linku serwer ustawia podpisany token JWT w ciasteczku `httpOnly`, `Secure`, `SameSite=Lax`. Aplikacja i API działają pod jedną domeną (`/api/*` przekazywane przez serwer wejściowy).
**Uzasadnienie:** skrypty na stronie nie mają dostępu do tokenu (ochrona przed XSS). Jedna domena eliminuje konfigurację CORS.
**Odrzucone:** przechowywanie tokenu w `localStorage`.

### D9 · Zawieszka generowana w panelu właściciela
**Decyzja:** właściciel w profilu zwierzęcia wybiera „Utwórz tag”. System generuje unikalny kod i pokazuje adres oraz kod QR. Właściciel zapisuje adres na pustym tagu NFC dowolną aplikacją do programowania tagów i drukuje kod QR.
**Uzasadnienie:** system nie musi prowadzić puli wcześniej wygenerowanych kodów ani obsługiwać rejestracji z poziomu strony zawieszki. Routing kontekstowy ma o jeden przypadek mniej.
**Odrzucone:** kreator uruchamiany po zeskanowaniu pustej zawieszki, pule kodów generowane przez administratora.

### D10 · Tryb zaginięcia w profilu zwierzęcia
**Decyzja:** przełącznik trybu zaginięcia znajduje się w profilu zwierzęcia, a zmiana wymaga potwierdzenia w oknie dialogowym.
**Uzasadnienie:** jedna akcja nie wymaga osobnej podstrony. Potwierdzenie chroni przed przypadkowym upublicznieniem numeru telefonu.

### D11 · Spacery wpisywane ręcznie
**Decyzja:** spacer zapisywany jest ręcznie (czas trwania, opcjonalnie dystans) albo jednym przyciskiem po zeskanowaniu zawieszki.
**Uzasadnienie:** przeglądarki, zwłaszcza na iOS, wstrzymują geolokalizację przy wygaszonym ekranie lub w tle. Śledzenie trasy w aplikacji webowej dawałoby niekompletne dane.
**Odrzucone:** śledzenie trasy GPS z mapą i wykresami (kierunek rozwoju).

### D12 · React z Vite
**Decyzja:** interfejs budowany w React, środowisko i budowanie aplikacji w Vite.
**Uzasadnienie:** React to najpopularniejsza biblioteka do budowy interfejsów z dużym ekosystemem (routing, mapy, kody QR). Vite zapewnia szybki serwer deweloperski i ma gotowe wsparcie dla PWA przez wtyczkę.

### D13 · Tailwind CSS v4 z własnymi tokenami
**Decyzja:** style tworzone klasami Tailwind. Domyślna paleta kolorów jest wyłączona i zastąpiona własnymi tokenami w bloku `@theme`.
**Uzasadnienie:** wszystkie kolory, fonty i cienie zdefiniowane są w jednym miejscu, a użycie koloru spoza palety jest niemożliwe, co pilnuje spójności wyglądu.
**Odrzucone:** wcześniejsza koncepcja kolorystyczna oparta na domyślnej palecie Tailwind (emerald, cyan, rose).

### D14 · PostgreSQL
**Decyzja:** relacyjna baza danych PostgreSQL.
**Uzasadnienie:** dane są silnie powiązane (właściciel → zwierzęta → zawieszki → skanowania). Klucze obce i ograniczenia unikalności pilnują spójności po stronie bazy.
**Odrzucone:** MongoDB (dokumentowa baza danych, rozważana w karcie projektu).

### D15 · SQL bez ORM
**Decyzja:** API korzysta z biblioteki `pg` i jawnie zapisanych zapytań SQL. Schemat bazy znajduje się w pliku `server/sql/001_init.sql`.
**Uzasadnienie:** model danych obejmuje kilka tabel. Jawny SQL jest czytelny, łatwy do omówienia i nie wprowadza dodatkowej warstwy abstrakcji.
**Odrzucone:** Prisma, Sequelize.

### D16 · Warstwa danych przykładowych przed backendem
**Decyzja:** aplikacja kliencka pobiera dane wyłącznie przez moduły w `client/src/api/`. Na etapie budowy interfejsu moduły te korzystają z danych przykładowych w `localStorage` (`client/src/mocks/`). Komponenty nigdy nie importują bezpośrednio z `mocks/`.
**Uzasadnienie:** interfejs można zbudować i przetestować niezależnie od backendu. Funkcje w `api/` stanowią specyfikację przyszłych endpointów, a przejście na prawdziwe API nie zmienia komponentów.

### D17 · Wspólne komponenty interfejsu
**Decyzja:** powtarzalne elementy (przyciski, pola formularzy, karty, okna dialogowe) są osobnymi komponentami w `components/ui/`. Nowy wspólny komponent powstaje, gdy ten sam element jest potrzebny w co najmniej dwóch miejscach.
**Uzasadnienie:** spójny wygląd i jedna implementacja dostępności (etykiety, fokus, obsługa klawiatury) dla całej aplikacji.

### D18 · Monorepo `client/` i `server/`
**Decyzja:** jedno repozytorium zawiera aplikację kliencką, API, dokumentację i konfigurację wdrożenia.
**Uzasadnienie:** cała praca w jednym miejscu, wspólna historia zmian, jedno polecenie `docker compose up` uruchamia system.

### D19 · Caddy jako serwer wejściowy
**Decyzja:** przed aplikacją działa serwer Caddy: serwuje pliki aplikacji klienckiej i przekazuje `/api/*` do API.
**Uzasadnienie:** automatycznie uzyskuje i odnawia certyfikat HTTPS (Let’s Encrypt). HTTPS jest wymagany przez geolokalizację i service worker.
**Odrzucone:** nginx z osobno konfigurowanym certbotem.

### D20 · Priorytetyzacja zakresu
**Decyzja:** zakres podzielony na priorytety według [01-zakres.md](01-zakres.md).
**Uzasadnienie:** ograniczony czas realizacji. Pierwszeństwo ma rdzeń pracy (identyfikacja bez instalacji, routing kontekstowy, prywatność), który musi być kompletny i wdrożony. Funkcje dodatkowe realizowane są po jego ukończeniu.
