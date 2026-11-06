# Zakres projektu

Zakres podzielono na priorytety. Priorytet 1 to rdzeń pracy: identyfikacja zwierzęcia bez instalowania aplikacji i routing kontekstowy. Musi działać w pełni i być wdrożony. Funkcje z priorytetu 2 są realizowane, jeśli pozwoli na to czas. Pozostałe pomysły opisano w pracy jako kierunki rozwoju.

## Priorytet 1 — rdzeń systemu

| Funkcja | Opis |
|---|---|
| Strona tagu z routingiem kontekstowym | cztery widoki: nieaktywny tag, znalazca, zwierzę zaginione, właściciel |
| Widok znalazcy | imię zwierzęcia, uwagi medyczne, przycisk połączenia z opiekunem (`tel:`) |
| Lokalizacja od znalazcy | pozycja GPS telefonu przekazywana w SMS-ie (`sms:` z linkiem do mapy), bez zapisu w bazie |
| Tryb zaginięcia | przełącznik w profilu zwierzęcia z potwierdzeniem i komunikatem dla znalazcy |
| Logowanie | konto z adresem e-mail i 6-cyfrowym PIN-em, limit prób, sesja w ciasteczku |
| Zwierzęta | lista, dodawanie, profil, edycja |
| Zawieszka | wygenerowanie kodu, kod QR do wydruku, adres do zapisania na tagu NFC |
| Aktywność | szybki zapis „Karmienie” i „Spacer” po zeskanowaniu własnej zawieszki, lista z ostatnich 7 dni |
| Audyt bezpieczeństwa | historia skanowań zawieszki: data, godzina, przeglądarka |
| PWA | manifest, ikony, możliwość instalacji, podstawowy service worker |
| API i baza danych | Node.js + Express + PostgreSQL dla funkcji z tej tabeli |
| Wdrożenie | Docker na serwerze VPS, własna domena, HTTPS |

## Priorytet 2

| Funkcja | Opis |
|---|---|
| Mapa przy wysyłaniu lokalizacji | podgląd pozycji znalazcy na mapie OpenStreetMap (Leaflet) |
| Zdjęcie zwierzęcia | przesyłanie i wyświetlanie zdjęcia w profilu i widoku znalazcy |
| Wymiana kodu zawieszki | nowy kod wyłączający stary, np. po zgubieniu zawieszki |

## Kierunki rozwoju

Funkcje przeanalizowane, ale świadomie pozostawione poza zakresem implementacji:

- **Spacery:** ręczny wpis z czasem i dystansem, lista i podsumowanie z 7 dni.
- **Śledzenie spaceru przez GPS** z mapą trasy i wykresami. Przeglądarki, szczególnie na iOS, wstrzymują geolokalizację przy wygaszonym ekranie, co ogranicza wiarygodność pomiaru w aplikacji webowej.
- **Harmonogram:** lista przypomnień o karmieniu, lekach i wizytach.
- **Powiadomienia push** o przypomnieniach. Wymagają Web Push z kluczami VAPID; na iOS działają wyłącznie w zainstalowanej PWA.
- **Udostępnianie weterynarzowi:** link z tokenem i datą ważności, podgląd danych medycznych tylko do odczytu.
- **Wysyłka wiadomości e-mail:** potwierdzenie adresu, reset PIN-u albo logowanie jednorazowym linkiem.
- **Mapa zgłoszeń lokalizacji** przechowywanych w systemie. Wymaga podstawy prawnej i polityki retencji danych lokalizacyjnych osób trzecich.
- **Korekta pozycji na mapie** przez znalazcę (map picker).
- **Przybliżona lokalizacja skanu na podstawie adresu IP**. Wymaga zewnętrznej usługi geolokalizacji, a adres IP jest daną osobową.
- **Potwierdzenie wibracją** (Vibration API, nieobsługiwane w Safari na iOS).
- **Kontakt z opiekunem przez system** zamiast bezpośredniego numeru telefonu (pełne ukrycie danych kontaktowych).

## Zmiany względem karty projektu

| Karta projektu | Realizacja | Uzasadnienie |
|---|---|---|
| Push Reminders | kierunek rozwoju | ograniczona obsługa na iOS, złożoność konfiguracji |
| Analityka spacerów z wykresami 7-dniowymi | kierunek rozwoju; zostaje szybki zapis spaceru i lista aktywności | ograniczenia geolokalizacji w tle, ograniczony czas realizacji |
| Map Picker | kierunek rozwoju | uproszczenie przepływu znalazcy |
| Web Haptics | kierunek rozwoju | brak obsługi w Safari na iOS |
| Audyt z lokalizacją z adresu IP i mapą | historia skanowań bez lokalizacji | minimalizacja przetwarzania danych osobowych |
| Vet Quick Share | kierunek rozwoju | rdzeń pracy ma pierwszeństwo |
| Rejestracja zawieszki na stronie głównej | generowanie zawieszki w panelu właściciela | prostszy przepływ, mniej przypadków w routingu |

## Zmiana zakresu z 6.11.2026

Zakres zmniejszono, aby rdzeń systemu i praca pisemna powstały w terminie (decyzje [D21–D24](05-decyzje.md)):

| Wcześniej | Teraz |
|---|---|
| logowanie magic link z wysyłką e-maili | e-mail i 6-cyfrowy PIN, bez wysyłki wiadomości |
| interfejs najpierw na danych przykładowych | od razu na prawdziwym API i bazie danych |
| spacery, harmonogram, link dla weterynarza w priorytetach 2 i 3 | kierunki rozwoju |
| wymiana kodu zawieszki w priorytecie 1 | priorytet 2 |
| ostatnie skanowania w panelu i na ekranie zwierzęcia | jedna pełna historia na stronie zawieszki |
| awatar z inicjałem | awatar z ikoną gatunku |

**Do uzgodnienia z promotorem:** zmiana sposobu logowania oraz to, czy szybki zapis z listą aktywności wystarczająco realizuje „zarządzanie aktywnością” z tytułu pracy.
