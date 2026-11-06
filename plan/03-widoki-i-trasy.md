# Widoki i trasy

Lista wszystkich podstron aplikacji. Priorytety według [01-zakres.md](01-zakres.md).

Strony są pogrupowane według layoutu, czyli wspólnej ramy (nagłówek, nawigacja), w której się wyświetlają. Każda grupa odpowiada innej grupie użytkowników.

```mermaid
flowchart TB
  R[RootLayout] --> P[PublicLayout: odwiedzający]
  R --> F[FinderLayout: znalazca]
  R --> A[RequireAuth: tylko zalogowani]
  A --> O[OwnerLayout: właściciel]
```

## Strony publiczne

| Adres | Strona | Priorytet |
|---|---|---|
| `/` | strona główna: czym jest PeTrace, logowanie | 1 |
| `/login` | formularz adresu e-mail i PIN-u, przycisk konta demo | 1 |
| `/rejestracja` | formularz nowego konta: e-mail, imię, PIN | 1 |
| `*` | strona 404 | 1 |

## Znalazca

Wąska kolumna, bez nawigacji i zbędnych elementów, duże przyciski.

| Adres | Strona | Priorytet |
|---|---|---|
| `/t/:tagId` | strona zawieszki z routingiem kontekstowym | 1 |
| `/t/:tagId/lokalizacja` | pobranie pozycji GPS i wysłanie SMS-a z lokalizacją | 1 |

### Routing kontekstowy `/t/:tagId`

Warunki sprawdzane są po kolei, pierwszy spełniony decyduje o widoku.

| Kolejność | Warunek | Widok |
|---|---|---|
| 1 | kod nie istnieje albo zawieszka nie jest przypisana | „Ten tag nie jest aktywny” |
| 2 | skanuje zalogowany właściciel zwierzęcia | szybki zapis: „Karmienie”, „Spacer” |
| 3 | zwierzę ma włączony tryb zaginięcia | widok alarmowy: komunikat, telefon, SMS z lokalizacją |
| 4 | pozostałe przypadki | profil podstawowy, dane właściciela niewidoczne, przycisk „Zadzwoń” |

Warunek 2 jest przed 3, aby właściciel, który odnalazł zwierzę, po zeskanowaniu zawieszki zobaczył swój widok, a nie alarm przeznaczony dla znalazców.

Każde wejście na stronę zawieszki jest zapisywane w historii skanowań.

## Właściciel

Wymaga zalogowania. Jedna wyśrodkowana kolumna na telefonie i komputerze, a nawigacja mieści się w arkuszu „Akcje” na ekranie zwierzęcia.

| Adres | Strona | Priorytet |
|---|---|---|
| `/panel` | otwiera ostatnio oglądane zwierzę albo pusty stan z zachętą do dodania pierwszego | 1 |
| `/zwierzeta/nowe` | formularz nowego zwierzęcia | 1 |
| `/zwierzeta/:id` | ekran zwierzęcia: dane, zdrowie, aktywność, przełącznik trybu zaginięcia, arkusz „Akcje” | 1 |
| `/zwierzeta/:id/edytuj` | edycja profilu | 1 |
| `/zwierzeta/:id/tag` | zawieszka: generowanie kodu, QR, adres NFC, historia skanowań | 1 |
| `/ustawienia` | imię, numer telefonu dla znalazców, wylogowanie | 1 |

Arkusz „Akcje” zawiera: Zawieszka, Edytuj profil, Oczami znalazcy (gdy zwierzę ma zawieszkę), Nowe zwierzę oraz Konto i ustawienia.

## Strony pomocnicze

| Adres | Strona |
|---|---|
| `/dev/ui` | galeria komponentów interfejsu, dostępna tylko w trybie deweloperskim |
