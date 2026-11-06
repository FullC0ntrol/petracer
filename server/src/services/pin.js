import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

/*
  PIN nigdy nie trafia do bazy — tylko jego skrót w formacie `sól:skrót` (D21).

  - Skrótu nie da się odwrócić. Przy logowaniu liczymy skrót wpisanego PIN-u i porównujemy z zapisanym.
  - Sól to losowy napis osobny dla każdego konta: ten sam PIN daje za każdym razem inny skrót.
  - `scrypt` jest celowo wolny i zużywa dużo pamięci. SHA-256 policzyłby milion PIN-ów w ułamku sekundy.
  - `timingSafeEqual` porównuje zawsze tak samo długo, więc czas odpowiedzi nic nie zdradza.
*/
const scryptAsync = promisify(scrypt)
const KEY_LENGTH = 64

export async function hashPin(pin) {
  const salt = randomBytes(16).toString('hex')
  const key = await scryptAsync(pin, salt, KEY_LENGTH)
  return `${salt}:${key.toString('hex')}`
}

export async function verifyPin(pin, stored) {
  const [salt, expectedHex = ''] = stored.split(':')
  const expected = Buffer.from(expectedHex, 'hex')
  if (expected.length !== KEY_LENGTH) return false
  const key = await scryptAsync(pin, salt, KEY_LENGTH)
  return timingSafeEqual(key, expected)
}
