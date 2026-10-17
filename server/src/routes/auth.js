import { Router } from 'express'
import { config } from '../config.js'
import { query } from '../db.js'
import { HttpError } from '../errors.js'
import { toUser } from '../mappers.js'
import { loadUser } from '../middleware/requireAuth.js'
import { rateLimit } from '../middleware/rateLimit.js'
import { sendLoginLink } from '../services/mail.js'
import { clearSessionCookie, setSessionCookie } from '../services/session.js'
import { generateToken, hashToken } from '../services/tokens.js'
import { parseEmail, parseOptionalName } from '../validation.js'

export const authRouter = Router()

const LINK_TTL_MINUTES = 15
const FIFTEEN_MINUTES = 15 * 60 * 1000

/*
  Dokąd wrócić po zalogowaniu. Przyjmujemy tylko ścieżki wewnątrz aplikacji ("/zwierzeta/…"),
  a odrzucamy pełne adresy i "//inna-strona.pl". Inaczej ktoś mógłby rozesłać prawdziwy link
  logowania, który po zalogowaniu przenosi na fałszywą stronę (tzw. open redirect).
*/
function safeNextPath(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return null
  }
  return value
}

// Dwa limity: na adres IP (ktoś klika w kółko) i na adres e-mail (ktoś zasypuje cudzą skrzynkę).
const limitByIp = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 10,
  keyFn: (req) => req.ip,
  message: 'Za dużo prób logowania. Spróbuj ponownie za kilkanaście minut.',
})
const limitByEmail = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 3,
  keyFn: (req) => String(req.body?.email ?? '').trim().toLowerCase(),
  message: 'Wysłaliśmy już kilka linków na ten adres. Sprawdź skrzynkę (także spam) albo spróbuj za kilkanaście minut.',
})

/*
  POST /api/auth/request-link  { email, name?, next? }
  Magic link służy też do rejestracji: nieznany e-mail od razu zakłada konto. Konto powstaje
  już tutaj, bo token w bazie musi wskazywać użytkownika (login_tokens.user_id).
*/
authRouter.post('/request-link', limitByIp, limitByEmail, async (req, res) => {
  const email = parseEmail(req.body.email)
  const name = parseOptionalName(req.body.name)

  // INSERT … ON CONFLICT: „dodaj, a jeśli taki e-mail już jest, nic nie zmieniaj”.
  // RETURNING zwraca wiersz, ale przy konflikcie z DO NOTHING nie zwraca nic — stąd drugi SELECT.
  await query(
    `INSERT INTO users (email, name) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING`,
    [email, name || email.split('@')[0]],
  )
  const { rows } = await query('SELECT id FROM users WHERE email = $1', [email])
  const userId = rows[0].id

  const token = generateToken()
  await query(
    `INSERT INTO login_tokens (user_id, token_hash, expires_at)
     VALUES ($1, $2, now() + make_interval(mins => $3))`,
    [userId, hashToken(token), LINK_TTL_MINUTES],
  )

  const params = new URLSearchParams({ token })
  const next = safeNextPath(req.body.next)
  if (next) params.set('next', next)
  const path = `/auth/verify?${params}`

  await sendLoginLink(email, `${config.appUrl}${path}`)

  // Odpowiedź jest taka sama dla nowego i istniejącego konta — z niej nie da się sprawdzić,
  // czy ktoś ma konto. `devLink` tylko lokalnie (config.exposeDevLink): przycisk „[DEV] Symuluj kliknięcie w link”.
  res.json({ email, ...(config.exposeDevLink ? { devLink: path } : {}) })
})

/*
  POST /api/auth/verify  { token }
  Jedno zapytanie UPDATE … WHERE used_at IS NULL AND expires_at > now() jednocześnie sprawdza
  token i oznacza go jako użyty. Dzięki temu dwa równoczesne kliknięcia nie zalogują dwa razy:
  baza zmieni wiersz tylko raz, a drugie zapytanie nie znajdzie już nieużytego tokenu.
*/
authRouter.post('/verify', async (req, res) => {
  const token = typeof req.body.token === 'string' ? req.body.token : ''
  const { rows } = await query(
    `UPDATE login_tokens SET used_at = now()
     WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now()
     RETURNING user_id`,
    [hashToken(token)],
  )
  if (!rows[0]) throw new HttpError(400, 'Ten link jest nieprawidłowy, wygasł albo został już użyty. Poproś o nowy.')

  const userResult = await query('SELECT id, email, name, phone FROM users WHERE id = $1', [rows[0].user_id])
  setSessionCookie(res, rows[0].user_id)
  res.json({ user: toUser(userResult.rows[0]) })
})

/*
  GET /api/auth/me — „kim jestem?”, wołane przy każdym starcie aplikacji.
  Niezalogowany dostaje 200 z `user: null` zamiast 401: to normalna sytuacja, a nie błąd,
  i przeglądarka nie pokazuje wtedy czerwonego wpisu w konsoli.
*/
authRouter.get('/me', loadUser, (req, res) => {
  res.json({ user: req.user ? toUser(req.user) : null })
})

authRouter.post('/logout', (req, res) => {
  clearSessionCookie(res)
  res.status(204).end()
})
