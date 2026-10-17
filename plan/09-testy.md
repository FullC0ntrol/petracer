# Testy na urządzeniach

Scenariusze akceptacyjne wykonywane na prawdziwych urządzeniach, na wersji wdrożonej pod własną domeną (HTTPS).

## Urządzenia

| Oznaczenie | Urządzenie | System | Przeglądarka |
|---|---|---|---|
| A1 | *do uzupełnienia* | Android | Chrome |
| I1 | *do uzupełnienia* | iOS | Safari |
| K1 | komputer | Windows | Chrome |

## Scenariusze

| Nr | Scenariusz | Oczekiwany wynik | A1 | I1 | K1 |
|---|---|---|---|---|---|
| T1 | przyłożenie telefonu do zawieszki NFC | otwiera się `/t/<kod>` | ☐ | ☐ | — |
| T2 | zeskanowanie kodu QR aparatem | otwiera się `/t/<kod>` | ☐ | ☐ | — |
| T3 | skan zawieszki niezaginionego zwierzęcia przez niezalogowaną osobę | widok znalazcy, brak danych opiekuna na ekranie | ☐ | ☐ | ☐ |
| T4 | „Zadzwoń” w widoku znalazcy | otwiera się aplikacja telefonu z numerem opiekuna | ☐ | ☐ | — |
| T5 | skan zawieszki zaginionego zwierzęcia | czerwony widok alarmowy z komunikatem | ☐ | ☐ | ☐ |
| T6 | „Wyślij SMS z lokalizacją”, zgoda na lokalizację | aplikacja wiadomości z numerem i linkiem do mapy | ☐ | ☐ | — |
| T7 | jak T6, odmowa lokalizacji | SMS bez linku do mapy z prośbą o opis miejsca | ☐ | ☐ | — |
| T8 | skan własnej zawieszki przez zalogowanego właściciela | szybki zapis, po kliknięciu potwierdzenie | ☐ | ☐ | — |
| T9 | nieznany kod w adresie | „Ten tag nie jest aktywny” | ☐ | ☐ | ☐ |
| T10 | logowanie: link z maila otwarty na tym samym urządzeniu | zalogowanie i przejście do panelu | ☐ | ☐ | ☐ |
| T11 | ponowne użycie tego samego linku | komunikat o nieważnym linku | ☐ | ☐ | ☐ |
| T12 | wejście na `/panel` bez logowania | przekierowanie do `/login`, po zalogowaniu powrót do `/panel` | ☐ | ☐ | ☐ |
| T13 | włączenie trybu zaginięcia w profilu | po potwierdzeniu T5 daje widok alarmowy | ☐ | ☐ | ☐ |
| T14 | historia skanowań po T3 i T5 | wpisy z datą, godziną i przeglądarką | ☐ | ☐ | ☐ |
| T15 | instalacja aplikacji na ekranie głównym | ikona PeTrace, uruchomienie bez paska przeglądarki | ☐ | ☐ | ☐ |
| T16 | układ na szerokości 375 px i 1440 px | brak przewijania w poziomie, nawigacja odpowiednia do szerokości | ☐ | ☐ | ☐ |

## Audyt Lighthouse

| Kategoria | Cel | Wynik |
|---|---|---|
| Performance | ≥ 90 | |
| Accessibility | ≥ 90 | |
| Best Practices | ≥ 90 | |
| PWA / instalowalność | spełnione | |

## Wyniki

Uwagi i wykryte błędy zapisywane z datą testu, numerem scenariusza i urządzeniem.
