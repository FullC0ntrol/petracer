import crypto from 'node:crypto'

/*
  Kod zawieszki: 8 znaków w formacie XXXX-XXXX, np. K7Q2-M9XD.

  Alfabet bez znaków, które łatwo pomylić przy przepisywaniu z zawieszki: 0/O oraz 1/I/L.
  Zostaje 31 znaków, czyli 31^8 ≈ 850 miliardów kombinacji — kodu praktycznie nie da się zgadnąć.

  `crypto.randomInt` losuje równomiernie. Popularne `bajt % 31` faworyzowałoby pierwsze znaki
  alfabetu, bo 256 nie dzieli się przez 31.
*/
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

export function generateTagCode() {
  let code = ''
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-'
    code += ALPHABET[crypto.randomInt(ALPHABET.length)]
  }
  return code
}

// Kod z adresu może przyjść małymi literami (ktoś przepisał go ręcznie) — porównujemy wielkimi.
export function normalizeTagCode(value) {
  return String(value ?? '').trim().toUpperCase()
}
