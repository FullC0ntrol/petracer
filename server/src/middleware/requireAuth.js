import { query } from '../db.js'
import { HttpError } from '../errors.js'
import { readSessionUserId } from '../services/session.js'

/*
  Middleware to funkcja (req, res, next), która działa PRZED właściwą trasą.
  Może dopisać coś do `req` (tu: zalogowanego użytkownika) albo przerwać żądanie błędem.
*/

// Ustawia `req.user` (albo null), ale nikogo nie blokuje — dla tras publicznych,
// które zachowują się inaczej dla zalogowanego (strona zawieszki, /auth/me).
export async function loadUser(req, res, next) {
  const userId = readSessionUserId(req)
  req.user = null
  if (userId) {
    // Sprawdzamy w bazie, bo ważny podpis nie wystarczy: konto mogło zostać usunięte.
    const { rows } = await query('SELECT id, email, name, phone FROM users WHERE id = $1', [userId])
    req.user = rows[0] ?? null
  }
  next()
}

// Dla tras 🔒: bez zalogowania odpowiada 401 i trasa w ogóle się nie wykona.
export async function requireAuth(req, res, next) {
  await loadUser(req, res, () => {})
  if (!req.user) throw new HttpError(401, 'Sesja wygasła. Zaloguj się ponownie.')
  next()
}
