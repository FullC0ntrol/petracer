import { createSeed } from './seed.js'

/*
  Udawana baza danych: cały stan to jeden obiekt zapisany w localStorage jako JSON.
  Dzięki temu prototyp „pamięta” zmiany po odświeżeniu strony.

  Z tego pliku korzysta WYŁĄCZNIE warstwa `src/api/mock/`. Komponenty nie wiedzą, że baza istnieje.

  Kształt danych jest taki sam jak tabele w PostgreSQL (server/sql/001_init.sql), tylko
  w camelCase. Dane przykładowe z seed.js powstały wcześniej i są bogatsze (szczegółowe zdrowie,
  trasy spacerów), więc `fromSeed` przekłada je na model z bazy.

  Numer wersji w kluczu: gdy zmieni się kształt danych, podbij go — stary zapis
  zostanie zignorowany i baza wypełni się od nowa.
*/
const STORAGE_KEY = 'pettrace:db:v2'

// Kopia w pamięci, żeby nie parsować JSON-a przy każdym zapytaniu.
let cache = null

// Przykładowe przeglądarki do historii skanowań (seed.js ich nie ma, a serwer zapisuje user-agent).
const SAMPLE_USER_AGENTS = {
  finder: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36',
  owner: 'Mozilla/5.0 (Linux; Android 14; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36',
  vet: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
}

// Szczegółowe dane zdrowotne z seeda → jedno pole tekstowe `medicalNotes`, jak w bazie.
function describeHealth(health) {
  const lines = []
  if (health.allergies.length) lines.push(`Alergia: ${health.allergies.join(', ')}.`)
  if (health.conditions.length) lines.push(`${health.conditions.join(', ')}.`)
  for (const medication of health.medications) {
    lines.push(`Leki: ${medication.name}, ${medication.dose} ${medication.frequency}.`)
  }
  return lines.join('\n')
}

function fromSeed(seed) {
  return {
    users: seed.users.map(({ id, email, name, phone }) => ({ id, email, name, phone })),
    pets: seed.pets.map((pet) => ({
      id: pet.id,
      ownerId: pet.ownerId,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      birthDate: pet.birthDate,
      weightKg: pet.health.weightHistory.at(-1)?.kg ?? null,
      medicalNotes: describeHealth(pet.health),
      isLost: pet.isLost,
      lostMessage: pet.lostMessage,
      createdAt: pet.health.weightHistory[0]?.date ?? new Date().toISOString(),
    })),
    tags: seed.tags.map((tag) => ({
      code: tag.id,
      petId: tag.petId,
      isActive: tag.isActive,
      createdAt: tag.pairedAt ?? new Date().toISOString(),
    })),
    tagScans: seed.tagScans.map((scan) => ({
      id: scan.id,
      tagCode: scan.tagId,
      scannedAt: scan.scannedAt,
      userAgent: SAMPLE_USER_AGENTS[scan.context],
      byOwner: scan.context === 'owner',
    })),
    activities: [
      ...seed.activities.map((activity) => ({ durationMin: null, distanceM: null, ...activity })),
      ...seed.walks.map((walk) => ({
        id: walk.id,
        petId: walk.petId,
        type: 'walk',
        occurredAt: walk.startedAt,
        durationMin: Math.round(walk.durationS / 60),
        distanceM: walk.distanceM,
        source: 'manual',
      })),
    ],
    loginTokens: [],
    sessions: [],
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // Uszkodzony JSON albo brak dostępu do localStorage — zaczynamy od danych przykładowych.
  }
  return fromSeed(createSeed())
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
