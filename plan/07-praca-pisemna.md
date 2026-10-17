# Konspekt pracy dyplomowej

Wstępny układ rozdziałów. Wymagania redakcyjne uczelni (szablon, objętość, styl bibliografii) do potwierdzenia z promotorem.

**Tytuł:** Inteligentny Ekosystem Identyfikacji i Zarządzania Aktywnością Zwierząt Domowych
**Planowana objętość:** ok. 50–60 stron

| Rozdział | Zawartość | Źródło w dokumentacji | Strony | Stan |
|---|---|---|---|---|
| Wstęp | problem, cel pracy, zakres, układ pracy | 00-start, 01-zakres | 3 | ☐ |
| 1. Analiza problemu i istniejących rozwiązań | sposoby identyfikacji zwierząt (adresówki, mikroczipy, lokalizatory GPS, systemy z kodami QR), porównanie, luka, którą wypełnia projekt | — | 8 | ☐ |
| 2. Wymagania | aktorzy, przypadki użycia, wymagania funkcjonalne i niefunkcjonalne (prywatność, dostępność, wydajność, mobile-first) | 02-przypadki-uzycia, 01-zakres | 8 | ☐ |
| 3. Dobór technologii | PWA, NFC i QR, React, Tailwind, Node.js, PostgreSQL, Docker; uzasadnienia i alternatywy | 05-decyzje | 6 | ☐ |
| 4. Projekt systemu | architektura, model danych (ERD), API, routing kontekstowy, projekt interfejsu, bezpieczeństwo | 04-architektura, 03-widoki-i-trasy | 10 | ☐ |
| 5. Implementacja | struktura projektu, kluczowe fragmenty: routing kontekstowy, magic link, wybór wariantu na serwerze, PWA, programowanie zawieszek | kod źródłowy | 10 | ☐ |
| 6. Wdrożenie i testy | konfiguracja serwera, scenariusze testów na urządzeniach, wyniki, audyt Lighthouse | 06-harmonogram, 09-testy | 6 | ☐ |
| 7. Badanie ankietowe (opcjonalnie) | metoda, grupa badawcza, wyniki | 08-ankieta | 4 | ☐ |
| Podsumowanie | realizacja celu, ograniczenia, kierunki rozwoju | 01-zakres | 3 | ☐ |
| Bibliografia, spis rysunków i tabel | | | 2 | ☐ |
| Załączniki | instrukcja uruchomienia, adres repozytorium | README | 1 | ☐ |

## Materiały do zebrania w trakcie realizacji

- zrzuty ekranu każdego widoku na telefonie i komputerze,
- zdjęcia zawieszki i skanowania telefonem (NFC i QR),
- diagramy z dokumentacji (architektura, ERD, przepływy logowania i skanowania),
- wyniki audytu Lighthouse,
- tabela wyników testów z [09-testy.md](09-testy.md),
- źródła do rozdziału 1 (statystyki zaginięć zwierząt, opisy istniejących rozwiązań), zapisywane od razu z pełnym opisem bibliograficznym.

## Ograniczenia do omówienia w podsumowaniu

- geolokalizacja w tle i powiadomienia push w przeglądarkach mobilnych,
- numer telefonu w linku `tel:` w widoku niezaginionego zwierzęcia,
- zależność od zasięgu sieci w miejscu znalezienia zwierzęcia,
- fizyczna trwałość zawieszki i czytelność kodu QR.
