import { getDb, saveDb } from '../mocks/db.js'
import { apiError, clearAuthToken, delay, findSessionUser, setAuthToken } from './client.js'

/*
  Logowanie bez hasła („magic link”):
    1. requestMagicLink(email) — serwer zapisuje jednorazowy token i wysyła e-mail z linkiem
       /auth/verify?token=…  (u nas e-maila nie ma — patrz `devToken` niżej)
    2. użytkownik klika link → verifyToken(token) — serwer sprawdza token, zakłada sesję,
       przeglądarka zapamiętuje token sesji
    3. getCurrentUser() — przy każdym starcie aplikacji: „kim jestem?”
    4. logout() — serwer usuwa sesję, przeglądarka zapomina token
*/

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAGIC_LINK_TTL_MS = 15 * 60 * 1000

/*
  Dokąd wrócić po zalogowaniu. Przyjmujemy tylko ścieżki wewnątrz aplikacji ("/spacery"),
  a odrzucamy pełne adresy i "//inna-strona.pl" — inaczej ktoś mógłby wysłać link do logowania,
  który po zalogowaniu przekierowuje na fałszywą stronę (tzw. open redirect).
*/
function safeRedirect(path) {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) return null
  return path
}

export async function requestMagicLink(email, redirectTo) {
  await delay()
  const normalizedEmail = email.trim().toLowerCase()
  if (!EMAIL_PATTERN.test(normalizedEmail)) throw apiError(400, 'Wpisz poprawny adres e-mail.')

  const db = getDb()
  const token = crypto.randomUUID()
  db.magicLinks.push({
    token,
    email: normalizedEmail,
    redirectTo: safeRedirect(redirectTo),
    expiresAt: new Date(Date.now() + MAGIC_LINK_TTL_MS).toISOString(),
    usedAt: null,
  })
  saveDb(db)

  // Prawdziwy serwer NIGDY nie zwróciłby tokenu — wysłałby go e-mailem. Zwracamy go tylko po to,
  // żeby przycisk „[DEV] Symuluj kliknięcie w link” miał czym się posłużyć.
  return { email: normalizedEmail, devToken: token }
}

export async function verifyToken(token) {
  await delay()
  const db = getDb()
  const link = db.magicLinks.find((item) => item.token === token)
  const isExpired = link && new Date(link.expiresAt) < new Date()

  if (!link || link.usedAt || isExpired) {
    throw apiError(400, 'Ten link jest nieprawidłowy albo wygasł. Poproś o nowy.')
  }

  // Link jest jednorazowy — drugie kliknięcie w ten sam e-mail już nie zaloguje.
  link.usedAt = new Date().toISOString()

  // Magic link służy jednocześnie do rejestracji: nieznany e-mail = nowe konto.
  let user = db.users.find((item) => item.email === link.email)
  if (!user) {
    user = { id: crypto.randomUUID(), email: link.email, name: link.email.split('@')[0], city: '', phone: '' }
    db.users.push(user)
  }

  const sessionToken = crypto.randomUUID()
  db.sessions.push({ token: sessionToken, userId: user.id, createdAt: new Date().toISOString() })
  saveDb(db)
  setAuthToken(sessionToken)

  return { user, redirectTo: link.redirectTo }
}

export async function getCurrentUser() {
  await delay()
  return findSessionUser(getDb())
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
