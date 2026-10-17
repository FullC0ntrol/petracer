# Wdrożenie PetTrace na serwer VPS

Instrukcja krok po kroku dla osoby, która pierwszy raz wdraża aplikację. Po jej wykonaniu aplikacja działa pod adresem `https://petracker.pl` z automatycznym certyfikatem HTTPS.

Każde polecenie jest w osobnym bloku. Polecenia z sekcji „na serwerze” wpisujesz w terminalu połączonym z serwerem przez SSH, a te z sekcji „na komputerze” — w terminalu na swoim komputerze.

## Spis treści

1. [Co będzie potrzebne](#1-co-będzie-potrzebne)
2. [Przygotowanie serwera](#2-przygotowanie-serwera)
3. [Ustawienie domeny (DNS)](#3-ustawienie-domeny-dns)
4. [Przeniesienie projektu na serwer](#4-przeniesienie-projektu-na-serwer)
5. [Zmienne środowiskowe](#5-zmienne-środowiskowe)
6. [Uruchomienie](#6-uruchomienie)
7. [Sprawdzenie, że działa](#7-sprawdzenie-że-działa)
8. [Kopia zapasowa bazy](#8-kopia-zapasowa-bazy)
9. [Aktualizacja aplikacji](#9-aktualizacja-aplikacji)
10. [Podłączenie poczty](#10-podłączenie-poczty)
11. [Gdy coś nie działa](#11-gdy-coś-nie-działa)
12. [Zawieszki: tag NFC i kod QR](#12-zawieszki-tag-nfc-i-kod-qr)
13. [Uruchomienie całości lokalnie](#13-uruchomienie-całości-lokalnie)

---

## 1. Co będzie potrzebne

- **Serwer VPS** z systemem Ubuntu 24.04 (wystarczy 1 procesor i 1–2 GB RAM). Od dostawcy dostajesz adres IP serwera i hasło (albo klucz SSH) do konta `root`.
- **Domena** `petracker.pl` z dostępem do panelu, w którym ustawia się rekordy DNS (zwykle panel firmy, w której kupiono domenę).
- **Repozytorium** z projektem, np. na GitHubie (może być prywatne).
- Na komputerze: terminal z poleceniem `ssh` (w Windows: PowerShell albo Git Bash).

Jak to działa na serwerze: `docker compose` uruchamia trzy kontenery — `db` (PostgreSQL), `api` (Node.js) i `caddy` (serwer WWW, który serwuje aplikację, przekazuje `/api` do API i sam załatwia certyfikat HTTPS).

## 2. Przygotowanie serwera

### Na komputerze

Połącz się z serwerem (zamiast `203.0.113.10` wpisz adres IP swojego serwera).

```bash
ssh root@203.0.113.10
```

### Na serwerze

Zaktualizuj listę pakietów i zainstalowane programy.

```bash
apt update && apt upgrade -y
```

Zainstaluj Dockera razem z `docker compose` oficjalnym skryptem instalacyjnym.

```bash
curl -fsSL https://get.docker.com | sh
```

Sprawdź, że Docker działa — polecenie powinno wypisać numer wersji.

```bash
docker compose version
```

Zainstaluj Gita, żeby pobrać projekt z repozytorium.

```bash
apt install -y git
```

Zezwól w zaporze na połączenia SSH, żeby nie odciąć sobie dostępu do serwera.

```bash
ufw allow OpenSSH
```

Otwórz porty 80 i 443 — przez nie działa strona i przez nie Caddy pobiera certyfikat HTTPS.

```bash
ufw allow 80,443/tcp
```

Włącz zaporę (potwierdź literą `y`).

```bash
ufw enable
```

> Część dostawców VPS ma też własną zaporę w panelu www. Jeśli tak jest, otwórz tam porty 22, 80 i 443.

## 3. Ustawienie domeny (DNS)

W panelu domeny dodaj rekord, który kieruje domenę na Twój serwer:

| Typ | Nazwa (host) | Wartość | TTL |
|---|---|---|---|
| A | `@` (sama domena `petracker.pl`) | adres IP serwera | 3600 |

Jeśli serwer ma też adres IPv6, dodaj analogiczny rekord `AAAA`. Jeśli nie — upewnij się, że dla domeny nie istnieje stary rekord `AAAA` wskazujący gdzie indziej (Let's Encrypt by go użył i certyfikat by się nie wygenerował).

Zmiana DNS rozchodzi się od kilku minut do kilku godzin.

### Na komputerze

Sprawdź, czy domena wskazuje już na serwer — w odpowiedzi powinien być adres IP serwera.

```bash
nslookup petracker.pl
```

Nie uruchamiaj aplikacji (krok 6), dopóki domena nie wskazuje na serwer — Caddy nie dostanie certyfikatu.

## 4. Przeniesienie projektu na serwer

Projekt pobierasz z repozytorium Gitem — dzięki temu późniejsza aktualizacja to jedno polecenie.

### Na serwerze

Jeśli repozytorium jest **prywatne**, utwórz klucz, którym serwer przedstawi się GitHubowi (naciśnij Enter przy każdym pytaniu).

```bash
ssh-keygen -t ed25519 -C "serwer-petrace"
```

Wypisz klucz publiczny i skopiuj cały wiersz.

```bash
cat ~/.ssh/id_ed25519.pub
```

Na GitHubie wejdź w repozytorium → **Settings → Deploy keys → Add deploy key**, wklej klucz i zapisz (bez zaznaczania „Allow write access”).

Pobierz projekt do katalogu `/opt/petrace` (adres repozytorium skopiuj z GitHuba: przycisk **Code → SSH**).

```bash
git clone git@github.com:TWOJ-LOGIN/petracer.git /opt/petrace
```

Przejdź do katalogu projektu — wszystkie kolejne polecenia wykonujesz tutaj.

```bash
cd /opt/petrace
```

## 5. Zmienne środowiskowe

Konfiguracja (hasła, domena) jest w pliku `.env`, który nie trafia do repozytorium. Wzór z opisem każdej zmiennej to `.env.example`.

### Na serwerze

Utwórz plik `.env` na podstawie wzoru.

```bash
cp .env.example .env
```

Wygeneruj losowe hasło do bazy i skopiuj wynik.

```bash
openssl rand -hex 24
```

Wygeneruj losowy sekret sesji i skopiuj wynik.

```bash
openssl rand -hex 32
```

Otwórz plik w edytorze i uzupełnij `POSTGRES_PASSWORD` oraz `JWT_SECRET` wygenerowanymi wartościami.

```bash
nano .env
```

W edytorze `nano` zapisujesz skrótem `Ctrl+O` (potem Enter), a wychodzisz `Ctrl+X`.

Najważniejsze wartości w `.env`:

| Zmienna | Wartość na serwerze |
|---|---|
| `SITE_ADDRESS` | `petracker.pl` |
| `APP_URL` | `https://petracker.pl` |
| `HTTP_PORT` / `HTTPS_PORT` | `80` / `443` |
| `POSTGRES_PASSWORD` | wynik `openssl rand -hex 24` |
| `JWT_SECRET` | wynik `openssl rand -hex 32` |
| `SEED_DEMO_DATA` | `false` (na pokaz możesz dać `true` — patrz niżej) |
| `COOKIE_SECURE` | `true` |
| `SMTP_*` | na razie puste — link logowania będzie w logach (krok 7) |

> **Hasło do bazy ustawiasz raz.** PostgreSQL zapisuje je przy pierwszym uruchomieniu. Późniejsza zmiana `POSTGRES_PASSWORD` w `.env` nie zmieni hasła w bazie i API przestanie się łączyć.

> **Dane przykładowe na pokaz:** `SEED_DEMO_DATA=true` przy pierwszym uruchomieniu wczyta Lunę i Mruczka z kontem `maciej@pettrace.pl`. Zawieszki demo (`LUNA-7K2Q`, `MRCZ-4P9D`) będą wtedy działać pod `https://petracker.pl/t/LUNA-7K2Q`.

## 6. Uruchomienie

### Na serwerze

Zbuduj obrazy i uruchom wszystkie usługi w tle (pierwsze budowanie trwa kilka minut).

```bash
docker compose up -d --build
```

## 7. Sprawdzenie, że działa

### Na serwerze

Sprawdź stan kontenerów — wszystkie trzy powinny mieć status `Up`, a `db` dodatkowo `(healthy)`.

```bash
docker compose ps
```

Zobacz ostatnie komunikaty Caddy — szukaj informacji `certificate obtained successfully`.

```bash
docker compose logs caddy --tail 50
```

Sprawdź, czy API odpowiada przez HTTPS — wynik powinien zawierać `{"ok":true}`.

```bash
curl https://petracker.pl/api/health
```

### W przeglądarce

1. Otwórz `https://petracker.pl` — powinna być widoczna strona główna z kłódką w pasku adresu.
2. Kliknij **Zaloguj się**, wpisz swój e-mail i wyślij link.

### Na serwerze

Dopóki poczta nie jest podłączona, link logowania jest w logach API — skopiuj go i otwórz w przeglądarce.

```bash
docker compose logs api --tail 20
```

Po zalogowaniu uzupełnij numer telefonu w **Ustawieniach**, dodaj zwierzę i utwórz mu zawieszkę.

### Na telefonie

Otwórz `https://petracker.pl` w Chrome (Android) albo Safari (iPhone) i wybierz **Dodaj do ekranu głównego** — aplikacja zainstaluje się jako PWA z ikoną PetTrace.

## 8. Kopia zapasowa bazy

Kopia to plik SQL z całą zawartością bazy, tworzony narzędziem `pg_dump`.

### Na serwerze

Utwórz katalog na kopie.

```bash
mkdir -p /opt/petrace-backups
```

Zrób kopię bazy do pliku z dzisiejszą datą w nazwie.

```bash
docker compose exec -T db pg_dump -U petrace petrace > /opt/petrace-backups/petrace-$(date +%F).sql
```

Otwórz harmonogram zadań, żeby kopia robiła się sama co noc (przy pierwszym uruchomieniu wybierz edytor `nano`).

```bash
crontab -e
```

Dopisz na końcu ten wiersz: kopia codziennie o 3:00 i usuwanie kopii starszych niż 14 dni.

```
0 3 * * * cd /opt/petrace && docker compose exec -T db pg_dump -U petrace petrace > /opt/petrace-backups/petrace-$(date +\%F).sql && find /opt/petrace-backups -name '*.sql' -mtime +14 -delete
```

### Na komputerze

Pobierz kopie z serwera na swój komputer — kopia trzymana tylko na tym samym serwerze nie chroni przed awarią serwera.

```bash
scp -r root@203.0.113.10:/opt/petrace-backups ./petrace-backups
```

### Przywracanie kopii (na serwerze)

Zatrzymaj API, żeby nikt nie zmieniał danych w trakcie przywracania.

```bash
docker compose stop api
```

Wyczyść bazę (usuwa wszystkie obecne dane!).

```bash
docker compose exec -T db psql -U petrace petrace -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

Wczytaj wybraną kopię (podmień nazwę pliku).

```bash
docker compose exec -T db psql -U petrace petrace < /opt/petrace-backups/petrace-2027-01-10.sql
```

Uruchom API ponownie.

```bash
docker compose start api
```

## 9. Aktualizacja aplikacji

Gdy wypchniesz zmiany do repozytorium, zaktualizuj serwer.

### Na serwerze

Przejdź do katalogu projektu.

```bash
cd /opt/petrace
```

Pobierz najnowszą wersję kodu.

```bash
git pull
```

Przebuduj obrazy i podmień kontenery na nowe (baza i jej dane zostają bez zmian).

```bash
docker compose up -d --build
```

Usuń stare, nieużywane obrazy, żeby nie zapychały dysku.

```bash
docker image prune -f
```

> **Zmiany w schemacie bazy.** Plik `server/sql/001_init.sql` wykonuje się tylko przy pierwszym starcie pustej bazy. Jeśli aktualizacja dodaje tabelę lub kolumnę, zapisz zmianę jako nowy plik (np. `server/sql/002_photos.sql`), zrób kopię zapasową (krok 8) i wykonaj go ręcznie:

```bash
docker compose exec -T db psql -U petrace petrace < server/sql/002_photos.sql
```

## 10. Podłączenie poczty

Do wysyłki linków logowania potrzebny jest serwer SMTP. Możliwości:

- **dostawca poczty transakcyjnej** (np. Brevo, Mailgun, Amazon SES) — najlepsza dostarczalność; dostawca poprosi o dodanie rekordów DNS SPF i DKIM dla domeny, żeby maile nie trafiały do spamu,
- **skrzynka u dostawcy domeny/hostingu** — zwykle w panelu są dane SMTP,
- **Gmail z hasłem aplikacji** — tylko do testów (limity wysyłki, adres nadawcy z gmail.com).

### Na serwerze

Uzupełnij w `.env` zmienne `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` i `MAIL_FROM` danymi od dostawcy.

```bash
nano .env
```

Uruchom ponownie API, żeby wczytało nową konfigurację.

```bash
docker compose up -d api
```

Wyślij sobie link logowania ze strony i sprawdź w logach, czy nie ma błędów wysyłki.

```bash
docker compose logs api --tail 30
```

## 11. Gdy coś nie działa

Najpierw zawsze zajrzyj do logów — prawie każdy problem jest tam opisany.

```bash
docker compose logs --tail 100
```

| Objaw | Przyczyna i rozwiązanie |
|---|---|
| Przeglądarka ostrzega o certyfikacie albo strona się nie otwiera | Domena nie wskazuje jeszcze na serwer (krok 3) albo porty 80/443 są zamknięte w zaporze serwera lub w panelu dostawcy. Sprawdź `docker compose logs caddy`. Po poprawce: `docker compose restart caddy`. |
| Caddy pisze o `too many failed authorizations` / `rate limit` | Let's Encrypt chwilowo blokuje domenę po wielu nieudanych próbach. Popraw DNS i porty, odczekaj godzinę, potem `docker compose restart caddy`. |
| Kontener `api` ciągle się restartuje | Zobacz `docker compose logs api`. Komunikat o `JWT_SECRET` → ustaw losowy sekret w `.env` (krok 5). Błąd hasła do bazy → `POSTGRES_PASSWORD` w `.env` różni się od hasła z pierwszego uruchomienia. |
| Strona działa, ale logowanie kończy się błędem lub od razu wylogowuje | `APP_URL` w `.env` musi być dokładnie `https://petracker.pl`, a `COOKIE_SECURE=true`. Po zmianie: `docker compose up -d api`. |
| Komunikat „Błąd 502” przy akcjach w aplikacji | API nie działa — sprawdź `docker compose ps` i logi `api`. |
| Nie przychodzi mail z linkiem | Bez SMTP link jest tylko w logach (`docker compose logs api`). Z SMTP — sprawdź spam i logi API. |
| Po aktualizacji telefon pokazuje starą wersję | Service worker podmienia wersję przy kolejnym otwarciu. Zamknij aplikację całkowicie i otwórz ponownie. |
| Lokalizacja w SMS-ie nie działa | Geolokalizacja wymaga HTTPS. Sprawdź, czy adres zaczyna się od `https://`. |
| Brak miejsca na dysku | `docker system df` pokazuje zajętość; `docker image prune -f` usuwa stare obrazy. |

Restart wszystkich usług bez utraty danych.

```bash
docker compose restart
```

> **Uwaga:** polecenie `docker compose down -v` usuwa także wolumeny, czyli **całą bazę danych i certyfikaty**. Na serwerze używaj go tylko świadomie, po zrobieniu kopii zapasowej.

## 12. Zawieszki: tag NFC i kod QR

Każda zawieszka ma ten sam adres zapisany na dwa sposoby: w tagu NFC i w kodzie QR. Adres i kod QR znajdziesz w aplikacji: **profil zwierzęcia → Zawieszka**.

### Zapis adresu na tagu NFC (aplikacja NFC Tools)

Potrzebny jest pusty tag NFC typu **NTAG213, NTAG215 albo NTAG216** (naklejka, brelok lub zawieszka) i telefon z NFC.

1. Zainstaluj aplikację **NFC Tools** (Android: Google Play, iPhone: App Store).
2. W PetTrace otwórz **Zawieszka** i naciśnij **Kopiuj** przy adresie (np. `https://petracker.pl/t/K7Q2-M9XD`).
3. W NFC Tools wybierz zakładkę **Zapisz** (Write) → **Dodaj rekord** (Add a record) → **URL / URI**.
4. Wklej adres i zatwierdź. Sprawdź, czy wybrany prefiks to `https://` i adres nie zawiera go podwójnie.
5. Naciśnij **Zapisz** (Write) i przyłóż tag do tylnej części telefonu (na iPhonie — do górnej krawędzi). Poczekaj na komunikat o sukcesie.
6. **Nie blokuj tagu.** Nie używaj opcji **Inne → Zablokuj tag** (Other → Lock tag / Make read-only). Zablokowanego tagu nie da się już zmienić — gdybyś wygenerował nowy kod, zawieszkę trzeba by wyrzucić.
7. Sprawdź tag: odblokuj telefon i przyłóż go do zawieszki. Powinna otworzyć się strona zawieszki — jako zalogowany właściciel zobaczysz **szybki zapis**.

> Na iPhonie odczyt NFC w tle działa od modelu XS. Starsze iPhone'y i telefony bez NFC odczytają kod QR.

### Wydruk kodu QR

1. W PetTrace otwórz **Zawieszka** i naciśnij **Pobierz QR (SVG)**. Plik SVG można powiększać bez utraty jakości.
2. Wydrukuj kod w rozmiarze co najmniej **2 × 2 cm**, czarny na białym tle, z białym marginesem wokół.
3. Pod kodem możesz wydrukować krótki napis, np. „Znalazłeś mnie? Zeskanuj” — ludzie chętniej skanują, gdy wiedzą po co.
4. Zabezpiecz nadruk przed wodą i ścieraniem (laminowanie, naklejka z folią, żywica epoksydowa).
5. Przed przypięciem do obroży zeskanuj kod aparatem telefonu i sprawdź, czy otwiera właściwą stronę.

> Po wygenerowaniu nowego kodu (przycisk **Nowy kod**) stara zawieszka przestaje działać: zapisz nowy adres na tagu i wydrukuj nowy kod QR.

## 13. Uruchomienie całości lokalnie

To samo co na serwerze, ale na własnym komputerze — do sprawdzenia wersji produkcyjnej przed wdrożeniem. Wymaga Docker Desktop.

### Na komputerze (w katalogu projektu)

Zbuduj i uruchom wszystkie usługi (plik `.env` nie jest potrzebny — działają wartości domyślne z danymi przykładowymi).

```bash
docker compose up --build
```

Otwórz w przeglądarce `http://localhost:8080` i zaloguj się kontem `maciej@pettrace.pl` przyciskiem „[DEV] Symuluj kliknięcie w link” (działa tylko na `localhost`). Ten sam link jest też w logach — bierz zawsze **ostatni**, bo każdy działa tylko raz i 15 minut:

```bash
docker compose logs api
```

Zatrzymaj wszystko (dane zostają na wolumenie).

```bash
docker compose down
```

Zatrzymaj i usuń dane, żeby następne uruchomienie zaczęło od czystej bazy.

```bash
docker compose down -v
```
