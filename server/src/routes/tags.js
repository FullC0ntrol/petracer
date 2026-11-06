import { Router } from 'express'
import { query } from '../db.js'
import { HttpError } from '../errors.js'
import { toPet, toScan } from '../mappers.js'
import { loadUser, requireAuth } from '../middleware/requireAuth.js'
import { findOwnPet } from '../services/pets.js'
import { generateTagCode, normalizeTagCode } from '../services/tagCodes.js'

export const tagsRouter = Router()

// Ponowne wejście z tej samej przeglądarki w ciągu kilku sekund (np. podwójne zbliżenie telefonu
// do NFC) nie tworzy drugiego wpisu w historii skanowań.
const DUPLICATE_SCAN_SECONDS = 5

/*
  GET /api/tags/:code — publiczny. Serce routingu kontekstowego (decyzja D6).

  Serwer sprawdza warunki po kolei i zwraca nazwę wariantu oraz TYLKO dane potrzebne w tym
  wariancie. Przeglądarka nie dostaje pełnego profilu zwierzęcia, więc nic, czego osoba
  skanująca nie powinna widzieć, nie opuszcza serwera.

    1. kod nie istnieje / tag nieaktywny / bez zwierzęcia  → inactive
    2. skanuje zalogowany właściciel                        → owner (szybki zapis)
    3. zwierzę zaginione                                    → lost (komunikat, numer, SMS)
    4. pozostałe                                            → found (imię, uwagi, przycisk „Zadzwoń”)

  Warunek 2 jest przed 3, żeby właściciel, który właśnie odnalazł zwierzę, zobaczył swój widok,
  a nie alarm przeznaczony dla znalazców.
*/
tagsRouter.get('/tags/:code', loadUser, async (req, res) => {
  const code = normalizeTagCode(req.params.code)
  const { rows } = await query(
    `SELECT t.code, t.is_active, p.id AS pet_id, p.owner_id, p.name, p.species, p.medical_notes,
            p.is_lost, p.lost_message, u.phone
     FROM tags t
     LEFT JOIN pets p ON p.id = t.pet_id
     LEFT JOIN users u ON u.id = p.owner_id
     WHERE t.code = $1`,
    [code],
  )
  const tag = rows[0]

  // Nieznanego kodu nie da się zapisać w historii (tag_scans wskazuje na istniejący tag).
  if (!tag) return res.json({ variant: 'inactive', code })

  const isOwner = Boolean(req.user && tag.owner_id === req.user.id)
  await recordScan(code, req.get('user-agent') ?? '', isOwner)

  if (!tag.is_active || !tag.pet_id) return res.json({ variant: 'inactive', code })

  if (isOwner) {
    return res.json({ variant: 'owner', code, pet: { id: tag.pet_id, name: tag.name, species: tag.species } })
  }

  const publicPet = { name: tag.name, species: tag.species, medicalNotes: tag.medical_notes }
  if (tag.is_lost) {
    return res.json({ variant: 'lost', code, pet: publicPet, phone: tag.phone, message: tag.lost_message })
  }
  // D5: numer jest potrzebny do przycisku „Zadzwoń” (link tel:), ale interfejs nie wyświetla go jako tekstu.
  res.json({ variant: 'found', code, pet: publicPet, phone: tag.phone })
})

async function recordScan(code, userAgent, byOwner) {
  // Wstawiamy wiersz tylko wtedy, gdy NIE ma podobnego skanu sprzed kilku sekund.
  await query(
    `INSERT INTO tag_scans (tag_code, user_agent, by_owner)
     SELECT $1, $2, $3
     WHERE NOT EXISTS (
       SELECT 1 FROM tag_scans
       WHERE tag_code = $1 AND user_agent = $2 AND by_owner = $3
         AND scanned_at > now() - make_interval(secs => $4)
     )`,
    [code, userAgent.slice(0, 500), byOwner, DUPLICATE_SCAN_SECONDS],
  )
}

// POST /api/pets/:id/tag — generuje zawieszkę zwierzęcia (D9). Wymiana kodu to priorytet 2.
tagsRouter.post('/pets/:id/tag', requireAuth, async (req, res) => {
  const pet = await findOwnPet(req.params.id, req.user.id)
  if (pet.tag_code) throw new HttpError(409, 'To zwierzę ma już zawieszkę.')
  if (!req.user.phone) {
    throw new HttpError(400, 'Najpierw podaj numer telefonu w ustawieniach — znalazca musi mieć jak się z Tobą skontaktować.')
  }

  // Kolizja losowego kodu jest skrajnie mało prawdopodobna, ale tania do obsłużenia:
  // ON CONFLICT DO NOTHING nic nie wstawi, więc losujemy jeszcze raz.
  for (let attempt = 0; attempt < 5; attempt++) {
    const { rowCount } = await query('INSERT INTO tags (code, pet_id) VALUES ($1, $2) ON CONFLICT (code) DO NOTHING', [
      generateTagCode(),
      req.params.id,
    ])
    if (rowCount === 1) return res.status(201).json(toPet(await findOwnPet(req.params.id, req.user.id)))
  }
  throw new Error('Nie udało się wygenerować unikalnego kodu zawieszki.')
})

// GET /api/pets/:id/scans — historia skanowań zawieszki zwierzęcia (audyt, UC8).
tagsRouter.get('/pets/:id/scans', requireAuth, async (req, res) => {
  await findOwnPet(req.params.id, req.user.id)
  const { rows } = await query(
    `SELECT s.* FROM tag_scans s
     JOIN tags t ON t.code = s.tag_code
     WHERE t.pet_id = $1
     ORDER BY s.scanned_at DESC LIMIT 100`,
    [req.params.id],
  )
  res.json(rows.map(toScan))
})
