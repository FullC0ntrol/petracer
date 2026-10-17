import * as http from './http/activities.js'
import * as mock from './mock/activities.js'
import { API_MODE } from './mode.js'

/*
  Aktywności zwierzęcia (karmienie, spacer):
    logActivity(petId, { type, source, durationMin?, distanceM?, occurredAt? }) → activity   POST /api/pets/:id/activities
    getActivities(petId, days = 7)                                              → activity[] GET  /api/pets/:id/activities?days=

  activity = { id, petId, type: 'feeding' | 'walk', occurredAt, durationMin, distanceM, source: 'quick_tap' | 'manual' }
*/
const impl = API_MODE === 'http' ? http : mock

export const { logActivity, getActivities } = impl
