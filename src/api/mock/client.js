import { apiError } from '../errors.js'

/*
  Narzędzia wspólne dla implementacji mock.

  Każda funkcja w api/mock/ działa jak „serwer”: czeka chwilę (udajemy sieć), czyta bazę z `mocks/`,
  sprawdza uprawnienia i zwraca dane albo rzuca błąd — dokładnie tak jak trasy w server/src/routes/.
  Zwraca też te same pola co prawdziwe API, więc strony działają z oboma trybami bez zmian.
*/

// Sztuczne opóźnienie 200–500 ms, żeby stany ładowania (spinner) było widać.
export function delay(minMs = 200, maxMs = 500) {
  const ms = minMs + Math.random() * (maxMs - minMs)
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/*
  Token sesji w localStorage. Prawdziwy serwer trzyma sesję w ciasteczku httpOnly, którego
  JavaScript nie widzi (decyzja D8). Bez serwera nie da się ustawić takiego ciasteczka,
  więc w trybie mock to jedyne wyjście — ale tylko tutaj, nigdy w trybie http.
*/
const TOKEN_KEY = 'pettrace:auth-token'

export function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAuthToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // Bez localStorage sesja nie przetrwa odświeżenia — w trybie mock to akceptowalne.
  }
}

export function clearAuthToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    // jw.
  }
}

// Zalogowany użytkownik albo `null` — dla tras, które działają też bez logowania (np. strona tagu).
export function findSessionUser(db) {
  const token = getAuthToken()
  const session = token && db.sessions.find((item) => item.token === token)
  if (!session) return null
  return db.users.find((user) => user.id === session.userId) ?? null
}

// To samo, ale dla tras tylko dla zalogowanych — brak sesji kończy się błędem 401.
export function requireUser(db) {
  const user = findSessionUser(db)
  if (!user) throw apiError(401, 'Sesja wygasła. Zaloguj się ponownie.')
  return user
}

// Cudze zwierzę daje ten sam błąd 404 co nieistniejące — nie zdradzamy, że takie id istnieje.
export function findOwnPet(db, user, id) {
  const pet = db.pets.find((item) => item.id === id)
  if (!pet || pet.ownerId !== user.id) throw apiError(404, 'Nie znaleziono zwierzęcia.')
  return pet
}

// Zwierzę w kształcie z API: bez `ownerId`, za to z kodem aktywnej zawieszki (jak LEFT JOIN w SQL).
export function toPet(db, pet) {
  const tag = db.tags.find((item) => item.petId === pet.id && item.isActive)
  return {
    id: pet.id,
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    birthDate: pet.birthDate,
    weightKg: pet.weightKg,
    medicalNotes: pet.medicalNotes,
    isLost: pet.isLost,
    lostMessage: pet.lostMessage,
    tagCode: tag?.code ?? null,
    createdAt: pet.createdAt,
  }
}

export function toUser({ id, email, name, phone }) {
  return { id, email, name, phone }
}
