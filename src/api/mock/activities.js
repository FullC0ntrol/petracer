import { getDb, saveDb } from '../../mocks/db.js'
import { apiError } from '../errors.js'
import { delay, findOwnPet, requireUser } from './client.js'

const DAY_MS = 24 * 60 * 60 * 1000

export async function logActivity(petId, { type, source = 'manual', durationMin = null, distanceM = null, occurredAt } = {}) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  findOwnPet(db, user, petId)
  if (!['feeding', 'walk'].includes(type)) throw apiError(400, 'Nieznany rodzaj aktywności.')

  const activity = {
    id: crypto.randomUUID(),
    petId,
    type,
    occurredAt: occurredAt ? new Date(occurredAt).toISOString() : new Date().toISOString(),
    durationMin: durationMin ? Number(durationMin) : null,
    distanceM: distanceM ? Number(distanceM) : null,
    source: source === 'quick_tap' ? 'quick_tap' : 'manual',
  }
  db.activities.push(activity)
  saveDb(db)
  return activity
}

export async function getActivities(petId, days = 7) {
  await delay()
  const db = getDb()
  const user = requireUser(db)
  findOwnPet(db, user, petId)
  const since = Date.now() - days * DAY_MS
  return db.activities
    .filter((activity) => activity.petId === petId && new Date(activity.occurredAt).getTime() > since)
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
}
