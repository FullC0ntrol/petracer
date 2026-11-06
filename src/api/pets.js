import { request } from './request.js'

/*
  Zwierzęta zalogowanego właściciela:
    getPets()                           → pet[]   GET   /api/pets
    getPetById(id)                      → pet     GET   /api/pets/:id
    createPet(data)                     → pet     POST  /api/pets
    updatePet(id, changes)              → pet     PATCH /api/pets/:id
    setLostMode(id, isLost, message)    → pet     PATCH /api/pets/:id/lost

  pet = { id, name, species, breed, birthDate, weightKg, medicalNotes, isLost, lostMessage, tagCode, createdAt }
*/

// encodeURIComponent: id trafia do adresu, więc znaki specjalne nie mogą zmienić ścieżki.
const petPath = (id) => `/pets/${encodeURIComponent(id)}`

export function getPets() {
  return request('GET', '/pets')
}

export function getPetById(id) {
  return request('GET', petPath(id))
}

export function createPet(data) {
  return request('POST', '/pets', data)
}

export function updatePet(id, changes) {
  return request('PATCH', petPath(id), changes)
}

export function setLostMode(id, isLost, message = '') {
  return request('PATCH', `${petPath(id)}/lost`, { isLost, message })
}
