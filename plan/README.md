# PeTrace

System identyfikacji zwierząt domowych oparty na zawieszkach z tagiem NFC i kodem QR oraz aplikacji webowej PWA z routingiem kontekstowym. Projekt realizowany w ramach pracy inżynierskiej *Inteligentny Ekosystem Identyfikacji i Zarządzania Aktywnością Zwierząt Domowych* (WSTiE Sucha Beskidzka).

Zeskanowanie zawieszki dowolnym smartfonem otwiera stronę w przeglądarce, bez instalowania aplikacji. Znalazca widzi dane potrzebne do pomocy i może skontaktować się z opiekunem, a zalogowany właściciel zapisuje aktywność zwierzęcia. Widok zależy od tego, kto skanuje i czy zwierzę zostało oznaczone jako zaginione.

## Stack

| Warstwa | Technologie |
|---|---|
| Aplikacja kliencka | React, Vite, React Router, Tailwind CSS, PWA |
| Serwer | Node.js, Express |
| Baza danych | PostgreSQL |
| Wdrożenie | Docker, Caddy |

## Uruchomienie (aplikacja kliencka)

```bash
cd client
npm install
npm run dev       # serwer deweloperski
npm run build     # wersja produkcyjna
npm run preview   # podgląd wersji produkcyjnej
npm run lint      # analiza kodu
```

## Struktura

```
├── client/              # aplikacja webowa
├── server/              # API (w realizacji)
├── docs/                # dokumentacja projektu
└── docker-compose.yml   # uruchomienie całego systemu (w realizacji)
```

## Dokumentacja

Pełna dokumentacja w folderze [`docs/`](docs/00-start.md): zakres, przypadki użycia, widoki, architektura, dziennik decyzji, harmonogram i plan testów.

## Autor

Maciej Strączek
