import { getDb, saveDb } from '../../mocks/db.js'
import { safeRedirect } from '../../lib/redirect.js'
import { apiError } from '../errors.js'
import { clearAuthToken, delay, findSessionUser, requireUser, setAuthToken, toUser } from './client.js'

/*
  Logowanie bez hasła („magic link”) — odpowiednik server/src/routes/auth.js:
    1. requestMagicLink — „serwer” zapisuje jednorazowy token i „wysyła” e-mail z linkiem
       /auth/verify?token=…  (e-maila nie ma, link wraca jako `devLink`)
    2. verifyToken — sprawdza token, zakłada sesję, przeglądarka zapamiętuje token sesji
    3. getCurrentUser — przy każdym starcie aplikacji: „kim jestem?”
    4. logout — usuwa sesję
*/

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+?[0-9 ()-]{9,20}$/
const LINK_TTL_MS = 15 * 60 * 1000

export async function requestMagicLink(email, { name = '', next = null } = {}) {
  await delay()
  const normalizedEmail = email.trim().toLowerCase()
  if (!EMAIL_PATTERN.test(normalizedEmail)) throw apiError(400, 'Wpisz poprawny adres e-mail.')

  const db = getDb()
  // Magic link służy też do rejestracji: nieznany e-mail zakłada konto.
  let user = db.users.find((item) => item.email === normalizedEmail)
  if (!user) {
    user = { id: crypto.randomUUID(), email: normalizedEmail, name: name.trim() || normalizedEmail.split('@')[0], phone: '' }
    db.users.push(user)
  }

  const token = crypto.randomUUID()
  db.loginTokens.push({ token, userId: user.id, expiresAt: new Date(Date.now() + LINK_TTL_MS).toISOString(), usedAt: null })
  saveDb(db)

  const params = new URLSearchParams({ token })
  const safeNext = safeRedirect(next)
  if (safeNext) params.set('next', safeNext)

  // Prawdziwy serwer w produkcji NIGDY nie zwraca linku — wysyła go e-mailem.
  // `devLink` istnieje tylko po to, żeby przycisk „[DEV] Symuluj kliknięcie w link” miał dokąd prowadzić.
  return { email: normalizedEmail, devLink: `/auth/verify?${params}` }
}

export async function verifyToken(token) {
  await delay()
  const db = getDb()
  const link = db.loginTokens.find((item) => item.token === token)
  const isExpired = link && new Date(link.expiresAt) < new Date()

  if (!link || link.usedAt || isExpired) {
    throw apiError(400, 'Ten link jest nieprawidłowy, wygasł albo został już użyty. Poproś o nowy.')
  }

  // Link jest jednorazowy — drugie kliknięcie w ten sam e-mail już nie zaloguje.
  link.usedAt = new Date().toISOString()
  const sessionToken = crypto.randomUUID()
  db.sessions.push({ token: sessionToken, userId: link.userId, createdAt: new Date().toISOString() })
  saveDb(db)
  setAuthToken(sessionToken)

  return { user: toUser(db.users.find((user) => user.id === link.userId)) }
}

export async function getCurrentUser() {
  await delay()
  const user = findSessionUser(getDb())
  return user ? toUser(user) : null
}

export async function logout() {
  await delay()
  const db = getDb()
  const user = findSessionUser(db)
  if (user) {
    db.sessions = db.sessions.filter((session) => session.userId !== user.id)
    saveDb(db)
  }
  clearAuthToken()
}

export async function updateSettings({ name = '', phone = '' }) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  if (!name.trim()) throw apiError(400, 'Podaj imię.')
  if (phone.trim() && !PHONE_PATTERN.test(phone.trim())) {
    throw apiError(400, 'Wpisz poprawny numer telefonu, np. +48 600 123 456.')
  }

  const updated = { ...user, name: name.trim(), phone: phone.trim() }
  db.users = db.users.map((item) => (item.id === user.id ? updated : item))
  saveDb(db)
  return toUser(updated)
}
