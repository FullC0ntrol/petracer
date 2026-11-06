import { HttpError } from './errors.js'

/*
  Sprawdzanie danych od klienta. Frontend też waliduje formularze, ale to tylko wygoda:
  żądanie można wysłać z pominięciem interfejsu (np. curl), więc ostatnie słowo ma serwer.
  Każda funkcja zwraca oczyszczony obiekt z dozwolonymi polami albo rzuca HttpError 400.
*/

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+?[0-9 ()-]{9,20}$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const SPECIES = ['dog', 'cat', 'other']

function text(value, maxLength, fieldLabel) {
  if (value === undefined || value === null) return ''
  if (typeof value !== 'string') throw new HttpError(400, `Pole „${fieldLabel}” ma zły format.`)
  const trimmed = value.trim()
  if (trimmed.length > maxLength) {
    throw new HttpError(400, `Pole „${fieldLabel}” jest za długie (max ${maxLength} znaków).`)
  }
  return trimmed
}

export function parseEmail(value) {
  const email = typeof value === 'string' ? value.trim().toLowerCase() : ''
  if (!EMAIL_PATTERN.test(email) || email.length > 254) throw new HttpError(400, 'Wpisz poprawny adres e-mail.')
  return email
}

export function parseName(value) {
  const name = text(value, 60, 'Imię')
  if (!name) throw new HttpError(400, 'Podaj imię.')
  return name
}

export function parsePin(value) {
  if (typeof value !== 'string' || !/^\d{6}$/.test(value)) throw new HttpError(400, 'PIN musi mieć dokładnie 6 cyfr.')
  return value
}

export function parseSettings(body) {
  const name = text(body.name, 60, 'Imię')
  const phone = text(body.phone, 20, 'Telefon')
  if (!name) throw new HttpError(400, 'Podaj imię.')
  if (phone && !PHONE_PATTERN.test(phone)) {
    throw new HttpError(400, 'Wpisz poprawny numer telefonu, np. +48 600 123 456.')
  }
  return { name, phone }
}

// `partial` = edycja: brakujące pola zostają bez zmian. Przy tworzeniu wymagane jest imię.
export function parsePet(body, { partial = false } = {}) {
  const pet = {}

  if (!partial || 'name' in body) {
    pet.name = text(body.name, 60, 'Imię')
    if (!pet.name) throw new HttpError(400, 'Podaj imię zwierzęcia.')
  }
  if (!partial || 'species' in body) {
    pet.species = body.species ?? 'dog'
    if (!SPECIES.includes(pet.species)) throw new HttpError(400, 'Nieznany gatunek.')
  }
  if ('breed' in body) pet.breed = text(body.breed, 80, 'Rasa')
  if ('medicalNotes' in body) pet.medicalNotes = text(body.medicalNotes, 2000, 'Uwagi medyczne')

  if ('birthDate' in body) {
    const value = body.birthDate || null
    if (value !== null && (!DATE_PATTERN.test(value) || Number.isNaN(Date.parse(value)))) {
      throw new HttpError(400, 'Data urodzenia ma zły format.')
    }
    if (value !== null && new Date(value) > new Date()) {
      throw new HttpError(400, 'Data urodzenia nie może być z przyszłości.')
    }
    pet.birthDate = value
  }

  if ('weightKg' in body) {
    const value = body.weightKg === '' || body.weightKg === null ? null : Number(body.weightKg)
    if (value !== null && !(value > 0 && value < 200)) throw new HttpError(400, 'Waga musi być liczbą od 0 do 200 kg.')
    pet.weightKg = value
  }

  return pet
}

export function parseLostMode(body) {
  if (typeof body.isLost !== 'boolean') throw new HttpError(400, 'Brak informacji, czy włączyć tryb zaginięcia.')
  return { isLost: body.isLost, message: text(body.message, 500, 'Komunikat') }
}

export function parseActivity(body) {
  if (!['feeding', 'walk'].includes(body.type)) throw new HttpError(400, 'Nieznany rodzaj aktywności.')
  return { type: body.type }
}
