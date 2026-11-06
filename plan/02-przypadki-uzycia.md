# Przypadki użycia

Zakres zgodny z `01-zakres.md`. Przypadki użycia stanowią podstawę wymagań funkcjonalnych systemu.

## Aktorzy

| Aktor | Kto to | Konto |
|---|---|---|
| Właściciel | opiekun zwierzęcia | tak (e-mail i PIN) |
| Znalazca | dowolna osoba, która zeskanowała tag | nie |

## Diagram

```mermaid
flowchart LR
  W([Właściciel])
  Z([Znalazca])

  W --- UC1[UC1 Rejestracja i logowanie PIN-em]
  W --- UC2[UC2 Dodanie i edycja zwierzęcia]
  W --- UC3[UC3 Utworzenie tagu]
  W --- UC6[UC6 Tryb zaginięcia]
  W --- UC7[UC7 Szybki zapis aktywności]
  W --- UC8[UC8 Historia skanowań]
  W --- UC9[UC9 Dane kontaktowe]

  Z --- UC4[UC4 Skan tagu: zwierzę niezaginione]
  Z --- UC5[UC5 Skan tagu: tryb zaginięcia]
```

---

### UC1 · Rejestracja i logowanie
**Aktor:** właściciel
**Scenariusz główny (rejestracja):**
1. Wchodzi na `/rejestracja`, wpisuje e-mail, imię i dwukrotnie 6-cyfrowy PIN.
2. System zapisuje konto ze skrótem PIN-u i od razu loguje.
3. Przekierowanie do `/panel`.

**Scenariusz główny (logowanie):**
1. Wchodzi na `/login`, wpisuje e-mail i PIN.
2. System sprawdza dane i ustawia ciasteczko sesji.
3. Przekierowanie do strony, z której przyszedł, a domyślnie do `/panel`.

**Alternatywy:** zły e-mail albo PIN → jeden komunikat „Nieprawidłowy e-mail lub PIN”. Przekroczony limit prób → prośba o ponowienie za kilkanaście minut. Zajęty e-mail przy rejestracji → komunikat. Niepamiętany PIN → kontakt z administratorem.

### UC2 · Dodanie i edycja zwierzęcia
**Aktor:** właściciel (zalogowany)
**Scenariusz główny:**
1. W panelu klika „Dodaj zwierzę”.
2. Wypełnia formularz: imię (wymagane), gatunek, rasa, data urodzenia, waga, uwagi medyczne (choroby, leki, alergie, zachowanie).
3. System zapisuje zwierzę i otwiera jego profil.

**Alternatywy:** brak imienia → błąd walidacji. Edycja działa tak samo z `/zwierzeta/:id/edytuj`.

### UC3 · Utworzenie tagu
**Aktor:** właściciel
**Warunek początkowy:** zwierzę istnieje, właściciel podał numer telefonu (UC9).
**Scenariusz główny:**
1. W akcjach zwierzęcia wybiera „Zawieszka” → „Utwórz zawieszkę”.
2. System generuje unikalny kod (np. `K7Q2-M9XD`) i pokazuje adres `domena/t/K7Q2-M9XD` oraz kod QR.
3. Właściciel zapisuje adres na tagu NFC aplikacją w telefonie (np. NFC Tools) i drukuje QR.
4. Skanuje tag swoim telefonem i widzi szybki zapis (UC7), co potwierdza, że tag działa.

**Alternatywy:** brak numeru telefonu → system prosi o uzupełnienie w ustawieniach.

### UC4 · Skan tagu przez znalazcę: zwierzę niezaginione
**Aktor:** znalazca
**Scenariusz główny:**
1. Przykłada telefon do tagu albo skanuje QR. Przeglądarka otwiera `/t/:tagId`.
2. System zapisuje skan w historii (UC8).
3. Wyświetla imię zwierzęcia i uwagi medyczne. Dane osobowe właściciela nie są wyświetlane.
4. Znalazca może nacisnąć „Zadzwoń do opiekuna”.

**Alternatywy:** kod nie istnieje albo tag jest nieaktywny → „Ten tag nie jest aktywny”.

### UC5 · Skan tagu przez znalazcę: tryb zaginięcia
**Aktor:** znalazca
**Warunek początkowy:** właściciel włączył tryb zaginięcia (UC6).
**Scenariusz główny:**
1. Jak w UC4, kroki 1–2.
2. System pokazuje widok alarmowy: komunikat od właściciela, uwagi medyczne, numer telefonu, przyciski „Zadzwoń” i „Wyślij SMS z lokalizacją”.
3. Po wybraniu SMS przeglądarka prosi o zgodę na lokalizację.
4. Aplikacja buduje link `sms:` z numerem właściciela i treścią zawierającą link do Google Maps.
5. Telefon otwiera aplikację wiadomości z gotowym SMS-em, znalazca go wysyła.

**Alternatywy:** brak zgody na lokalizację → SMS bez linku do mapy, z prośbą o opisanie miejsca. Lokalizacja nie trafia do bazy danych.

### UC6 · Włączenie i wyłączenie trybu zaginięcia
**Aktor:** właściciel
**Scenariusz główny:**
1. W profilu zwierzęcia przestawia przełącznik „Zaginione”.
2. Okno modalne prosi o potwierdzenie i opcjonalny komunikat dla znalazcy.
3. Po potwierdzeniu karta zwierzęcia dostaje czerwone oznaczenie, a strona tagu pokazuje widok z UC5.

**Alternatywy:** wyłączenie trybu zaginięcia też wymaga potwierdzenia.

### UC7 · Szybki zapis aktywności
**Aktor:** właściciel (zalogowany na telefonie)
**Scenariusz główny:**
1. Skanuje tag własnego zwierzęcia.
2. System rozpoznaje właściciela i pokazuje przyciski „Karmienie” i „Spacer”.
3. Kliknięcie zapisuje aktywność z aktualną godziną i pokazuje potwierdzenie.
4. Zapis jest widoczny na liście aktywności z ostatnich 7 dni w profilu zwierzęcia.

**Alternatywy:** zalogowany użytkownik, który nie jest właścicielem → widok znalazcy (UC4 albo UC5).

### UC8 · Historia skanowań (audyt)
**Aktor:** właściciel
**Scenariusz główny:** na stronie zawieszki widzi listę skanowań: data, godzina, przeglądarka i system, informacja, czy skanował sam właściciel.

### UC9 · Dane kontaktowe i wylogowanie
**Aktor:** właściciel
**Scenariusz główny:** w `/ustawienia` uzupełnia imię i numer telefonu używany w UC4 i UC5. Przycisk „Wyloguj się” kończy sesję i przenosi na `/`.
