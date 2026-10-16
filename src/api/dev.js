import { getDb, resetDb, saveDb } from '../mocks/db.js'
import { clearAuthToken } from './client.js'

/*
  Funkcje TYLKO dla panelu DEV. Celowo omijają sprawdzanie sesji, żeby dało się np. włączyć
  Lost Mode będąc wylogowanym. Prawdziwy backend nie miałby takich drzwi — ten plik
  zniknie razem z warstwą mock.
*/

export function getDevOverview() {
  const db = getDb()
  return db.tags.map((tag) => {
    const pet = db.pets.find((item) => item.id === tag.petId)
    return { tagId: tag.id, isActive: tag.isActive, petId: pet?.id ?? null, petName: pet?.name ?? null, isLost: pet?.isLost ?? false }
  })
}

export function devSetLostMode(petId, isLost) {
  const db = getDb()
  db.pets = db.pets.map((pet) =>
    pet.id === petId ? { ...pet, isLost, lostSince: isLost ? new Date().toISOString() : null } : pet,
  )
  saveDb(db)
}

// Przywraca dane przykładowe i wylogowuje.
export function resetDemoData() {
  resetDb()
  clearAuthToken()
}
