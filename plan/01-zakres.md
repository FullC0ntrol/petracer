# Zakres projektu

Zakres podzielono na priorytety. Priorytet 1 to rdzeń pracy: identyfikacja zwierzęcia bez instalowania aplikacji i routing kontekstowy. Musi działać w pełni i być wdrożony. Funkcje z priorytetów 2 i 3 są realizowane, jeśli pozwoli na to czas. Pozostałe pomysły opisano w pracy jako kierunki rozwoju.

## Priorytet 1 — rdzeń systemu

| Funkcja | Opis |
|---|---|
| Strona tagu z routingiem kontekstowym | cztery widoki: nieaktywny tag, znalazca, zwierzę zaginione, właściciel |
| Widok znalazcy | imię zwierzęcia, uwagi medyczne, przycisk połączenia z opiekunem (`tel:`) |
| Lokalizacja od znalazcy | pozycja GPS telefonu przekazywana w SMS-ie (`sms:` z linkiem do mapy), bez zapisu w bazie |
| Tryb zaginięcia | przełącznik w profilu zwierzęcia z potwierdzeniem i komunikatem dla znalazcy |
| Logowanie | magic link: jednorazowy link wysyłany na e-mail |
| Zwierzęta | lista, dodawanie, profil, edycja |
| Zawieszka | wygenerowanie kodu, kod QR do wydruku, adres do zapisania na tagu NFC |
| Szybki zapis aktywności | po zeskanowaniu własnej zawieszki: „Karmienie” i „Spacer” |
| Audyt bezpieczeństwa | historia skanowań zawieszki: data, godzina, przeglądarka |
| PWA | manifest, ikony, możliwość instalacji, podstawowy service worker |
| API i baza danych | Node.js + Express + PostgreSQL dla funkcji z tej tabeli |
| Wdrożenie | Docker na serwerze VPS, własna domena, HTTPS |

## Priorytet 2

| Funkcja | Opis |
|---|---|
| Udostępnianie weterynarzowi | link z tokenem i datą ważności, podgląd danych medycznych tylko do odczytu |
| Spacery | ręczny wpis (data, czas trwania, opcjonalnie dystans), lista i podsumowanie z 7 dni |
| Mapa przy wysyłaniu lokalizacji | podgląd pozycji znalazcy na mapie OpenStreetMap (Leaflet) |
| Zdjęcie zwierzęcia | przesyłanie i wyświetlanie zdjęcia w profilu i widoku znalazcy |

## Priorytet 3

| Funkcja | Opis |
|---|---|
| Harmonogram | lista przypomnień (karmienie, leki, wizyty) bez powiadomień |

## Kierunki rozwoju

Funkcje przeanalizowane, ale świadomie pozostawione poza zakresem implementacji:

- **Powiadomienia push** o przypomnieniach. Wymagają Web Push z kluczami VAPID; na iOS działają wyłącznie w zainstalowanej PWA.
- **Śledzenie spaceru przez GPS** z mapą trasy i wykresami. Przeglądarki, szczególnie na iOS, wstrzymują geolokalizację przy wygaszonym ekranie, co ogranicza wiarygodność pomiaru w aplikacji webowej.
- **Mapa zgłoszeń lokalizacji** przechowywanych w systemie. Wymaga podstawy prawnej i polityki retencji danych lokalizacyjnych osób trzecich.
- **Korekta pozycji na mapie** przez znalazcę (map picker).
- **Przybliżona lokalizacja skanu na podstawie adresu IP**. Wymaga zewnętrznej usługi geolokalizacji, a adres IP jest daną osobową.
- **Potwierdzenie wibracją** (Vibration API, nieobsługiwane w Safari na iOS).
- **Kontakt z opiekunem przez system** zamiast bezpośredniego numeru telefonu (pełne ukrycie danych kontaktowych).
- **Wybór zakresu danych** udostępnianych weterynarzowi.

## Zmiany względem karty projektu

| Karta projektu | Realizacja | Uzasadnienie |
|---|---|---|
| Push Reminders | kierunek rozwoju | ograniczona obsługa na iOS, złożoność konfiguracji |
| Analityka spacerów z wykresami 7-dniowymi | ręczny wpis i podsumowanie (priorytet 2) | ograniczenia geolokalizacji w tle |
| Map Picker | kierunek rozwoju | uproszczenie przepływu znalazcy |
| Web Haptics | kierunek rozwoju | brak obsługi w Safari na iOS |
| Audyt z lokalizacją z adresu IP i mapą | historia skanowań bez lokalizacji | minimalizacja przetwarzania danych osobowych |
| Vet Quick Share | wersja uproszczona (priorytet 2) | rdzeń pracy ma pierwszeństwo |
| Rejestracja zawieszki na stronie głównej | generowanie zawieszki w panelu właściciela | prostszy przepływ, mniej przypadków w routingu |
