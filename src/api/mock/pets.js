import { getDb, saveDb } from '../../mocks/db.js'
import { apiError } from '../errors.js'
import { delay, findOwnPet, requireUser, toPet } from './client.js'

// Pola, które właściciel może ustawić w formularzu. Reszty (id, ownerId, isLost…) nie da się
// nadpisać przez createPet/updatePet — o nich decydują osobne funkcje.
const EDITABLE_FIELDS = ['name', 'species', 'breed', 'birthDate', 'weightKg', 'medicalNotes']

function pickEditable(data) {
  const picked = Object.fromEntries(Object.entries(data).filter(([key]) => EDITABLE_FIELDS.includes(key)))
  if ('name' in picked) picked.name = String(picked.name ?? '').trim()
  if ('weightKg' in picked) picked.weightKg = picked.weightKg === '' || picked.weightKg === null ? null : Number(picked.weightKg)
  if ('birthDate' in picked) picked.birthDate = picked.birthDate || null
  return picked
}

function validate(pet) {
  if (!pet.name) throw apiError(400, 'Podaj imię zwierzęcia.')
  if (pet.weightKg !== null && !(pet.weightKg > 0 && pet.weightKg < 200)) {
    throw apiError(400, 'Waga musi być liczbą od 0 do 200 kg.')
  }
  if (pet.birthDate && new Date(pet.birthDate) > new Date()) {
    throw apiError(400, 'Data urodzenia nie może być z przyszłości.')
  }
}

export async function getPets() {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  return db.pets.filter((pet) => pet.ownerId === user.id).map((pet) => toPet(db, pet))
}

export async function getPetById(id) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  return toPet(db, findOwnPet(db, user, id))
}

export async function createPet(data) {
  await delay()
  const db = getDb()
  const user = requireUser(db)

  const pet = {
    species: 'dog',
    breed: '',
    birthDate: null,
    weightKg: null,
    medicalNotes: '',
    ...pickEditable(data),
    id: crypto.randomUUID(),
    ownerId: user.id,
    isLost: false,
    lostMessage: '',
    createdAt: new Date().toISOString(),
  }
  validate(pet)

  db.pets.push(pet)
  saveDb(db)
  return toPet(db, pet)
}

export async function updatePet(id, changes) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  const pet = findOwnPet(db, user, id)

  // Nowy obiekt zamiast zmieniania starego: { ...stare, ...zmiany }.
  const updated = { ...pet, ...pickEditable(changes) }
  validate(updated)
  db.pets = db.pets.map((item) => (item.id === id ? updated : item))
  saveDb(db)
  return toPet(db, updated)
}

// Przy wyłączaniu czyścimy komunikat, żeby nie wrócił przy kolejnym zaginięciu.
export async function setLostMode(id, isLost, message = '') {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  const pet = findOwnPet(db, user, id)

  const updated = { ...pet, isLost, lostMessage: isLost ? message.trim() : '' }
  db.pets = db.pets.map((item) => (item.id === id ? updated : item))
  saveDb(db)
  return toPet(db, updated)
}
