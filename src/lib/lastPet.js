/*
  Zapamiętuje, które zwierzę właściciel oglądał ostatnio, żeby /panel otworzył właśnie je.
  To tylko wygoda, więc błędy localStorage (tryb prywatny, zablokowane dane) po cichu ignorujemy.
*/
const KEY = 'pettrace:lastPet'

export function getLastPetId() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function setLastPetId(petId) {
  try {
    localStorage.setItem(KEY, petId)
  } catch {
    // Bez zapamiętania /panel otworzy po prostu pierwsze zwierzę.
  }
}
