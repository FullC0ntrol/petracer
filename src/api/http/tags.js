import { request } from './request.js'

export function resolveTag(code) {
  return request('GET', `/tags/${encodeURIComponent(code)}`)
}

export function createTag(petId) {
  return request('POST', `/pets/${encodeURIComponent(petId)}/tag`)
}

export function getTagScans(petId) {
  return request('GET', `/pets/${encodeURIComponent(petId)}/scans`)
}

export function getRecentScans(limit = 10) {
  return request('GET', `/scans?limit=${limit}`)
}
