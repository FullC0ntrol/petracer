import { request } from './request.js'

export function logActivity(petId, activity) {
  return request('POST', `/pets/${encodeURIComponent(petId)}/activities`, activity)
}

export function getActivities(petId, days = 7) {
  return request('GET', `/pets/${encodeURIComponent(petId)}/activities?days=${days}`)
}
