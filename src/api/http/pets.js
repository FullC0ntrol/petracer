import { request } from './request.js'

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
