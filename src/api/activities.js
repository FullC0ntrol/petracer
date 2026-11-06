import { request } from './request.js'

/*
  Aktywności zwierzęcia:
    logActivity(petId, type)         → activity     POST /api/pets/:id/activities
    getActivities(petId, days = 7)   → activity[]   GET  /api/pets/:id/activities?days=

  activity = { id, petId, type: 'feeding' | 'walk', occurredAt }
*/
export function logActivity(petId, type) {
  return request('POST', `/pets/${encodeURIComponent(petId)}/activities`, { type })
}

export function getActivities(petId, days = 7) {
  return request('GET', `/pets/${encodeURIComponent(petId)}/activities?days=${days}`)
}
