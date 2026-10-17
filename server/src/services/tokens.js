import crypto from 'node:crypto'

/*
  Tokeny jednorazowe (link logowania, później link dla weterynarza).

  - `crypto.randomBytes` to generator kryptograficzny: wyniku nie da się przewidzieć,
    w przeciwieństwie do Math.random(). 32 bajty = 256 bitów losowości.
  - `base64url` daje napis bezpieczny w adresie URL (bez +, / i =).
  - W bazie zapisujemy tylko skrót SHA-256. Przy weryfikacji liczymy skrót tokenu z linku
    i szukamy go w bazie — sam token nigdzie nie jest przechowywany.
*/
export function generateToken() {
  return crypto.randomBytes(32).toString('base64url')
}

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}
