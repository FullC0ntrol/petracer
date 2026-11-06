import { Router } from 'express'
import { config } from '../config.js'
import { query } from '../db.js'
import { HttpError } from '../errors.js'
import { toUser } from '../mappers.js'
import { loadUser } from '../middleware/requireAuth.js'
import { rateLimit } from '../middleware/rateLimit.js'
import { hashPin, verifyPin } from '../services/pin.js'
import { clearSessionCookie, setSessionCookie } from '../services/session.js'
import { parseEmail, parseName, parsePin } from '../validation.js'

export const authRouter = Router()

const FIFTEEN_MINUTES = 15 * 60 * 1000
const TOO_MANY_LOGINS = 'Za dużo prób logowania. Spróbuj ponownie za kilkanaście minut.'

/*
  Limit prób to główna ochrona PIN-u: 6 cyfr to tylko milion kombinacji. Przy 5 próbach na 15 minut
  sprawdzenie ich wszystkich zajęłoby lata. Limit na adres e-mail chroni jedno konto, a limit
  na adres IP utrudnia sprawdzanie wielu kont naraz.
*/
const limitLoginByIp = rateLimit({ windowMs: FIFTEEN_MINUTES, max: 20, keyFn: (req) => req.ip, message: TOO_MANY_LOGINS })
const limitLoginByEmail = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 5,
  keyFn: (req) => String(req.body?.email ?? '').trim().toLowerCase(),
  message: TOO_MANY_LOGINS,
})
const limitRegisterByIp = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 10,
  keyFn: (req) => req.ip,
  message: 'Za dużo prób założenia konta. Spróbuj ponownie za kilkanaście minut.',
})

// POST /api/auth/register  { email, name, pin } — nowe konto, od razu zalogowane.
authRouter.post('/register', limitRegisterByIp, async (req, res) => {
  const email = parseEmail(req.body.email)
  const name = parseName(req.body.name)
  const pin = parsePin(req.body.pin)

  // ON CONFLICT: dwie równoczesne rejestracje tego samego adresu nie skończą się błędem bazy.
  const { rows } = await query(
    `INSERT INTO users (email, name, pin_hash) VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING
     RETURNING id, email, name, phone`,
    [email, name, await hashPin(pin)],
  )
  if (!rows[0]) throw new HttpError(409, 'Konto z tym adresem e-mail już istnieje. Zaloguj się.')

  setSessionCookie(res, rows[0].id)
  res.status(201).json({ user: toUser(rows[0]) })
})

/*
  POST /api/auth/login  { email, pin }
  Zły e-mail i zły PIN dają ten sam komunikat — inaczej każdy mógłby sprawdzać, kto ma konto.
*/
authRouter.post('/login', limitLoginByIp, limitLoginByEmail, async (req, res) => {
  const email = parseEmail(req.body.email)
  const pin = parsePin(req.body.pin)

  const { rows } = await query('SELECT id, email, name, phone, pin_hash FROM users WHERE email = $1', [email])
  if (!rows[0] || !(await verifyPin(pin, rows[0].pin_hash))) {
    throw new HttpError(401, 'Nieprawidłowy e-mail lub PIN.')
  }

  setSessionCookie(res, rows[0].id)
  res.json({ user: toUser(rows[0]) })
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

/*
  Wejście na konto demonstracyjne jednym przyciskiem — do pokazu i testów.
  Włącza je DEMO_LOGIN=true. Loguje WYŁĄCZNIE na konto demo z danych przykładowych, więc nikt
  nie dostanie się w ten sposób na cudze konto.
*/
authRouter.get('/demo', (req, res) => {
  res.json({ enabled: config.demoLogin, email: config.demoLogin ? config.demoEmail : null })
})

authRouter.post('/demo', async (req, res) => {
  if (!config.demoLogin) throw new HttpError(404, 'Logowanie na konto demo jest wyłączone.')
  const { rows } = await query('SELECT id, email, name, phone FROM users WHERE email = $1', [config.demoEmail])
  if (!rows[0]) {
    throw new HttpError(404, 'Konto demo nie istnieje. Uruchom serwer z SEED_DEMO_DATA=true na pustej bazie.')
  }
  setSessionCookie(res, rows[0].id)
  res.json({ user: toUser(rows[0]) })
})
