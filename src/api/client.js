/*
  Narzędzia wspólne dla wszystkich plików w `api/`.

  Każda funkcja API działa tu jak „serwer”: czeka chwilę (udajemy sieć), czyta bazę z `mocks/`,
  sprawdza uprawnienia i zwraca dane albo rzuca błąd. Komponenty widzą tylko Promise —
  tak samo jak przy prawdziwym `fetch`.
*/

// Sztuczne opóźnienie 200–500 ms, żeby stany ładowania (spinner) było widać w prototypie.
export function delay(minMs = 200, maxMs = 500) {
  const ms = minMs + Math.random() * (maxMs - minMs)
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Błąd z kodem jak w HTTP (401 — niezalogowany, 403 — brak uprawnień, 404 — nie ma, 400 — złe dane).
// Komunikat jest po polsku, bo trafia prosto do interfejsu.
export function apiError(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}

/*
  Token sesji to jedyna rzecz o logowaniu, którą przechowuje przeglądarka — tak samo
  będzie z prawdziwym backendem. Kto jest zalogowany, wie „serwer” (tabela `sessions`).
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
    // Bez localStorage sesja nie przetrwa odświeżenia — w prototypie to akceptowalne.
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
