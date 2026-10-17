import { Router } from 'express'
import { query } from '../db.js'
import { toPet } from '../mappers.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { findOwnPet, PET_SELECT } from '../services/pets.js'
import { parseLostMode, parsePet } from '../validation.js'

export const petsRouter = Router()

// Wszystkie trasy w tym pliku wymagają zalogowania.
petsRouter.use(requireAuth)

// Nazwy pól w JSON → kolumny w bazie. Tylko te pola można zmienić przez PATCH /pets/:id.
const COLUMNS = {
  name: 'name',
  species: 'species',
  breed: 'breed',
  birthDate: 'birth_date',
  weightKg: 'weight_kg',
  medicalNotes: 'medical_notes',
}

petsRouter.get('/', async (req, res) => {
  const { rows } = await query(`${PET_SELECT} WHERE p.owner_id = $1 ORDER BY p.created_at`, [req.user.id])
  res.json(rows.map(toPet))
})

petsRouter.post('/', async (req, res) => {
  const pet = parsePet(req.body)
  const { rows } = await query(
    `INSERT INTO pets (owner_id, name, species, breed, birth_date, weight_kg, medical_notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [req.user.id, pet.name, pet.species, pet.breed ?? '', pet.birthDate ?? null, pet.weightKg ?? null, pet.medicalNotes ?? ''],
  )
  res.status(201).json(toPet(rows[0]))
})

petsRouter.get('/:id', async (req, res) => {
  res.json(toPet(await findOwnPet(req.params.id, req.user.id)))
})

/*
  Edycja tylko przesłanych pól. Budujemy SET dynamicznie, ale nazwy kolumn pochodzą wyłącznie
  z naszej mapy COLUMNS (nie od użytkownika), a wartości idą jako parametry $1, $2…
*/
petsRouter.patch('/:id', async (req, res) => {
  await findOwnPet(req.params.id, req.user.id)
  const changes = parsePet(req.body, { partial: true })
  const entries = Object.entries(changes)

  if (entries.length > 0) {
    const setClause = entries.map(([field], index) => `${COLUMNS[field]} = $${index + 2}`).join(', ')
    await query(`UPDATE pets SET ${setClause} WHERE id = $1`, [req.params.id, ...entries.map(([, value]) => value)])
  }
  res.json(toPet(await findOwnPet(req.params.id, req.user.id)))
})

// Tryb zaginięcia. Przy wyłączaniu czyścimy komunikat, żeby nie wrócił przy kolejnym zaginięciu.
petsRouter.patch('/:id/lost', async (req, res) => {
  await findOwnPet(req.params.id, req.user.id)
  const { isLost, message } = parseLostMode(req.body)
  await query('UPDATE pets SET is_lost = $1, lost_message = $2 WHERE id = $3', [
    isLost,
    isLost ? message : '',
    req.params.id,
  ])
  res.json(toPet(await findOwnPet(req.params.id, req.user.id)))
})
