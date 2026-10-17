import * as http from './http/activities.js'
import * as mock from './mock/activities.js'

/*
  Aktywności zwierzęcia (karmienie, spacer):
    logActivity(petId, { type, source, durationMin?, distanceM?, occurredAt? }) → activity   POST /api/pets/:id/activities
    getActivities(petId, days = 7)                                              → activity[] GET  /api/pets/:id/activities?days=

  activity = { id, petId, type: 'feeding' | 'walk', occurredAt, durationMin, distanceM, source: 'quick_tap' | 'manual' }
*/
const useHttp = import.meta.env.VITE_API_MODE === 'http'

export const logActivity = useHttp ? http.logActivity : mock.logActivity
export const getActivities = useHttp ? http.getActivities : mock.getActivities
