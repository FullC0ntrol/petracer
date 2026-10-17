import { getDb, resetDb, saveDb } from '../../mocks/db.js'
import { clearAuthToken } from './client.js'

/*
  Funkcje TYLKO dla panelu DEV w trybie mock. Celowo omijają sprawdzanie sesji, żeby dało się
  np. włączyć tryb zaginięcia będąc wylogowanym. Prawdziwy backend nie ma takich drzwi —
  w trybie http panel DEV ich nie używa.
*/

export function getDevOverview() {
  const db = getDb()
  return db.tags.map((tag) => {
    const pet = db.pets.find((item) => item.id === tag.petId)
    return {
      code: tag.code,
      isActive: tag.isActive,
      petId: pet?.id ?? null,
      petName: pet?.name ?? null,
      isLost: pet?.isLost ?? false,
    }
  })
}

export function devSetLostMode(petId, isLost) {
  const db = getDb()
  db.pets = db.pets.map((pet) => (pet.id === petId ? { ...pet, isLost } : pet))
  saveDb(db)
}

// Przywraca dane przykładowe i wylogowuje.
export function resetDemoData() {
  resetDb()
  clearAuthToken()
}
