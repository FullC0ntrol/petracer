import { Router } from 'express'
import { query } from '../db.js'
import { toActivity } from '../mappers.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { findOwnPet } from '../services/pets.js'
import { parseActivity } from '../validation.js'

export const activitiesRouter = Router()

// POST /api/pets/:id/activities — szybki zapis po skanie (source: quick_tap) albo ręczny wpis (manual).
activitiesRouter.post('/pets/:id/activities', requireAuth, async (req, res) => {
  await findOwnPet(req.params.id, req.user.id)
  const activity = parseActivity(req.body)
  const { rows } = await query(
    `INSERT INTO activities (pet_id, type, occurred_at, duration_min, distance_m, source)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [req.params.id, activity.type, activity.occurredAt, activity.durationMin, activity.distanceM, activity.source],
  )
  res.status(201).json(toActivity(rows[0]))
})

// GET /api/pets/:id/activities?days=7 — aktywności z ostatnich N dni, od najnowszej.
activitiesRouter.get('/pets/:id/activities', requireAuth, async (req, res) => {
  await findOwnPet(req.params.id, req.user.id)
  const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 365)
  const { rows } = await query(
    `SELECT * FROM activities
     WHERE pet_id = $1 AND occurred_at > now() - make_interval(days => $2)
     ORDER BY occurred_at DESC`,
    [req.params.id, days],
  )
  res.json(rows.map(toActivity))
})
