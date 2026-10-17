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

// Imię podawane przy pierwszym logowaniu — opcjonalne.
export function parseOptionalName(value) {
  return text(value, 60, 'Imię')
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
  const source = body.source === 'quick_tap' ? 'quick_tap' : 'manual'

  const durationMin = body.durationMin ? Number(body.durationMin) : null
  if (durationMin !== null && !(Number.isInteger(durationMin) && durationMin > 0 && durationMin <= 1440)) {
    throw new HttpError(400, 'Czas trwania musi być liczbą minut od 1 do 1440.')
  }
  const distanceM = body.distanceM ? Number(body.distanceM) : null
  if (distanceM !== null && !(Number.isInteger(distanceM) && distanceM >= 0 && distanceM <= 100000)) {
    throw new HttpError(400, 'Dystans musi być liczbą metrów od 0 do 100 000.')
  }

  const occurredAt = body.occurredAt ? new Date(body.occurredAt) : new Date()
  if (Number.isNaN(occurredAt.getTime())) throw new HttpError(400, 'Data aktywności ma zły format.')
  if (occurredAt > new Date(Date.now() + 60 * 1000)) throw new HttpError(400, 'Data aktywności nie może być z przyszłości.')

  return { type: body.type, source, durationMin, distanceM, occurredAt }
}
