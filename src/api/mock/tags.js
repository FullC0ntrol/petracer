import { getDb, saveDb } from '../../mocks/db.js'
import { apiError } from '../errors.js'
import { delay, findOwnPet, findSessionUser, requireUser, toPet } from './client.js'

// Ponowne wejście z tej samej przeglądarki w ciągu kilku sekund nie tworzy drugiego wpisu.
const DUPLICATE_SCAN_MS = 5000

// Alfabet bez mylących znaków (0/O, 1/I/L) — tak samo jak server/src/services/tagCodes.js.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

function generateTagCode() {
  // crypto.getRandomValues daje liczby nieprzewidywalne (w przeciwieństwie do Math.random).
  const values = crypto.getRandomValues(new Uint32Array(8))
  const chars = Array.from(values, (value) => ALPHABET[value % ALPHABET.length])
  return `${chars.slice(0, 4).join('')}-${chars.slice(4).join('')}`
}

function recordScan(db, code, byOwner) {
  const userAgent = navigator.userAgent
  const isDuplicate = db.tagScans.some(
    (scan) =>
      scan.tagCode === code &&
      scan.userAgent === userAgent &&
      scan.byOwner === byOwner &&
      Date.now() - new Date(scan.scannedAt).getTime() < DUPLICATE_SCAN_MS,
  )
  if (isDuplicate) return
  db.tagScans.push({ id: crypto.randomUUID(), tagCode: code, scannedAt: new Date().toISOString(), userAgent, byOwner })
}

/*
  Serce routingu kontekstowego — odpowiednik GET /api/tags/:code (server/src/routes/tags.js).
  „Serwer” sprawdza warunki po kolei i zwraca nazwę wariantu oraz TYLKO dane potrzebne w tym
  wariancie (decyzja D6). O tym, czy skanuje właściciel, decyduje sesja, nie przeglądarka.
*/
export async function resolveTag(rawCode) {
  await delay()
  const db = getDb()
  const code = rawCode.trim().toUpperCase()
  const tag = db.tags.find((item) => item.code === code)
  if (!tag) return { variant: 'inactive', code }

  const pet = db.pets.find((item) => item.id === tag.petId)
  const viewer = findSessionUser(db)
  const isOwner = Boolean(viewer && pet && pet.ownerId === viewer.id)
  recordScan(db, code, isOwner)
  saveDb(db)

  if (!tag.isActive || !pet) return { variant: 'inactive', code }
  if (isOwner) return { variant: 'owner', code, pet: { id: pet.id, name: pet.name, species: pet.species } }

  const owner = db.users.find((user) => user.id === pet.ownerId)
  const publicPet = { name: pet.name, species: pet.species, medicalNotes: pet.medicalNotes }
  if (pet.isLost) return { variant: 'lost', code, pet: publicPet, phone: owner.phone, message: pet.lostMessage }
  return { variant: 'found', code, pet: publicPet, phone: owner.phone }
}

// Nowa zawieszka; poprzednia (jeśli była) przestaje działać, ale jej historia skanowań zostaje.
export async function createTag(petId) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  const pet = findOwnPet(db, user, petId)
  if (!user.phone) {
    throw apiError(400, 'Najpierw podaj numer telefonu w ustawieniach — znalazca musi mieć jak się z Tobą skontaktować.')
  }

  db.tags = db.tags.map((tag) => (tag.petId === pet.id && tag.isActive ? { ...tag, isActive: false } : tag))
  let code
  do code = generateTagCode()
  while (db.tags.some((tag) => tag.code === code))
  db.tags.push({ code, petId: pet.id, isActive: true, createdAt: new Date().toISOString() })
  saveDb(db)
  return toPet(db, pet)
}

// Skan z dopisanym zwierzęciem (jak JOIN tag_scans → tags → pets). Nowsze pierwsze.
function scansOf(db, pets, limit) {
  return db.tagScans
    .map((scan) => {
      const tag = db.tags.find((item) => item.code === scan.tagCode)
      const pet = pets.find((item) => item.id === tag?.petId)
      return pet ? { ...scan, petId: pet.id, petName: pet.name } : null
    })
    .filter(Boolean)
    .sort((a, b) => b.scannedAt.localeCompare(a.scannedAt))
    .slice(0, limit)
}

export async function getTagScans(petId) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  const pet = findOwnPet(db, user, petId)
  return scansOf(db, [pet], 100)
}

export async function getRecentScans(limit = 10) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  return scansOf(db, db.pets.filter((pet) => pet.ownerId === user.id), limit)
}
