import { getDb, saveDb } from '../mocks/db.js'
import { apiError, delay, requireUser } from './client.js'

// Pola, które właściciel może ustawić w formularzu. Reszty (id, ownerId, tagId, isLost…)
// nie da się nadpisać przez createPet/updatePet — o nich decydują osobne funkcje.
const EDITABLE_FIELDS = ['name', 'species', 'breed', 'sex', 'birthDate', 'color', 'avatarColor', 'health']

const EMPTY_HEALTH = { allergies: [], conditions: [], medications: [], vaccinations: [], weightHistory: [] }

function pickEditable(data) {
  return Object.fromEntries(Object.entries(data).filter(([key]) => EDITABLE_FIELDS.includes(key)))
}

// Szuka zwierzęcia zalogowanego użytkownika. Cudze zwierzę zwraca ten sam błąd 404 co nieistniejące —
// nie zdradzamy, że takie id w ogóle jest w bazie.
function findOwnPet(db, user, id) {
  const pet = db.pets.find((item) => item.id === id)
  if (!pet || pet.ownerId !== user.id) throw apiError(404, 'Nie znaleziono zwierzęcia.')
  return pet
}

export async function getPets() {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  return db.pets.filter((pet) => pet.ownerId === user.id)
}

export async function getPetById(id) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  return findOwnPet(db, user, id)
}

export async function createPet(data) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  if (!data.name?.trim()) throw apiError(400, 'Podaj imię zwierzęcia.')

  const pet = {
    species: 'dog',
    breed: '',
    sex: 'unknown',
    birthDate: null,
    color: '',
    avatarColor: 'pine',
    health: EMPTY_HEALTH,
    ...pickEditable(data),
    name: data.name.trim(),
    id: crypto.randomUUID(),
    ownerId: user.id,
    tagId: null,
    isLost: false,
    lostSince: null,
    lostMessage: '',
  }

  db.pets.push(pet)
  saveDb(db)
  return pet
}

export async function updatePet(id, changes) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  const pet = findOwnPet(db, user, id)
  if ('name' in changes && !changes.name?.trim()) throw apiError(400, 'Podaj imię zwierzęcia.')

  // Nowy obiekt zamiast zmieniania starego: { ...stare, ...zmiany }.
  const updated = { ...pet, ...pickEditable(changes) }
  db.pets = db.pets.map((item) => (item.id === id ? updated : item))
  saveDb(db)
  return updated
}
