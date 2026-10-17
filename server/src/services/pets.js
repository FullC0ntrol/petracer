import { query } from '../db.js'
import { HttpError } from '../errors.js'

// Zwierzę razem z kodem jego aktywnej zawieszki. LEFT JOIN, bo zwierzę może jeszcze nie mieć tagu
// (wtedy t.code = NULL). Warunek `t.is_active` jest w ON, a nie w WHERE — inaczej zwierzęta
// bez aktywnej zawieszki zniknęłyby z wyniku.
export const PET_SELECT = `
  SELECT p.*, t.code AS tag_code
  FROM pets p
  LEFT JOIN tags t ON t.pet_id = p.id AND t.is_active
`

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/*
  Sprawdzenie własności zasobu — podstawa bezpieczeństwa wszystkich tras /pets/:id/….
  Szukamy zwierzęcia o danym id I należącego do zalogowanego użytkownika. Cudze zwierzę
  daje ten sam błąd 404 co nieistniejące: nie zdradzamy, że takie id w ogóle jest w bazie.
*/
export async function findOwnPet(petId, userId) {
  // Zły format id (np. /pets/abc) od razu kończymy 404 — PostgreSQL odrzuciłby go błędem typu.
  if (!UUID_PATTERN.test(petId)) throw new HttpError(404, 'Nie znaleziono zwierzęcia.')
  const { rows } = await query(`${PET_SELECT} WHERE p.id = $1 AND p.owner_id = $2`, [petId, userId])
  if (!rows[0]) throw new HttpError(404, 'Nie znaleziono zwierzęcia.')
  return rows[0]
}
