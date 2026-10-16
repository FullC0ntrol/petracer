import { createSeed } from './seed.js'

/*
  Udawana baza danych: cały stan to jeden obiekt zapisany w localStorage jako JSON.
  Dzięki temu prototyp „pamięta” zmiany po odświeżeniu strony.

  Z tego pliku korzysta WYŁĄCZNIE warstwa `src/api/`. Komponenty nie wiedzą, że baza istnieje —
  kiedy powstanie prawdziwy backend, podmienimy tylko pliki w `api/`, a ten folder zniknie.

  Numer wersji w kluczu: gdy zmieni się kształt danych w seed.js, podbij go — stary zapis
  zostanie zignorowany i baza wypełni się od nowa.
*/
const STORAGE_KEY = 'pettrace:db:v1'

// Kopia w pamięci, żeby nie parsować JSON-a przy każdym zapytaniu.
let cache = null

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // Uszkodzony JSON albo brak dostępu do localStorage — zaczynamy od danych przykładowych.
  }
  return createSeed()
}

/*
  Zwraca GŁĘBOKĄ KOPIĘ bazy (`structuredClone`). Funkcja API może ją dowolnie zmieniać,
  a zmiany trafią do bazy dopiero po `saveDb`. Bez kopii każda modyfikacja zwróconego obiektu
  (np. w komponencie) po cichu zmieniałaby „bazę” — trudny do znalezienia błąd.
*/
export function getDb() {
  if (!cache) cache = load()
  return structuredClone(cache)
}

export function saveDb(db) {
  cache = structuredClone(db)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
  } catch {
    // Brak miejsca lub tryb prywatny — dane zostają tylko w pamięci do odświeżenia strony.
  }
}

export function resetDb() {
  cache = null
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // jw.
  }
}
