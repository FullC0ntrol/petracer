import { Router } from 'express'
import { query } from '../db.js'
import { toUser } from '../mappers.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { parseSettings } from '../validation.js'

export const meRouter = Router()

// PATCH /api/me  { name, phone } — dane kontaktowe właściciela (numer trafia do widoku znalazcy).
meRouter.patch('/', requireAuth, async (req, res) => {
  const { name, phone } = parseSettings(req.body)
  const { rows } = await query(
    'UPDATE users SET name = $1, phone = $2 WHERE id = $3 RETURNING id, email, name, phone',
    [name, phone, req.user.id],
  )
  res.json(toUser(rows[0]))
})
