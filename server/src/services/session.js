import jwt from 'jsonwebtoken'
import { config } from '../config.js'

/*
  Sesja = podpisany token JWT w ciasteczku.

  JWT zawiera id użytkownika (`sub`) i datę ważności, a do tego podpis zrobiony sekretem
  z JWT_SECRET. Serwer nie musi trzymać listy sesji: przy każdym żądaniu sprawdza podpis
  i wie, że tokenu nikt nie podrobił ani nie zmienił.

  Ciasteczko:
  - httpOnly — JavaScript na stronie go nie widzi (kradzież przez XSS jest niemożliwa),
  - secure — wysyłane tylko przez HTTPS (w produkcji),
  - sameSite=lax — przeglądarka nie dołączy go do POST-a wysłanego z cudzej strony (ochrona przed CSRF).
*/
export const SESSION_COOKIE = 'petrace_session'
const SESSION_DAYS = 30

const cookieOptions = {
  httpOnly: true,
  secure: config.cookieSecure,
  sameSite: 'lax',
  path: '/',
}

export function setSessionCookie(res, userId) {
  const token = jwt.sign({ sub: userId }, config.jwtSecret, { expiresIn: `${SESSION_DAYS}d` })
  res.cookie(SESSION_COOKIE, token, { ...cookieOptions, maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000 })
}

export function clearSessionCookie(res) {
  res.clearCookie(SESSION_COOKIE, cookieOptions)
}

// Zwraca id użytkownika z ważnego tokenu albo null (brak ciasteczka, zły podpis, wygasł).
export function readSessionUserId(req) {
  const token = req.cookies?.[SESSION_COOKIE]
  if (!token) return null
  try {
    return jwt.verify(token, config.jwtSecret).sub
  } catch {
    return null
  }
}
