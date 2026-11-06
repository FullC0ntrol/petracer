import { request } from './request.js'

/*
  Zawieszki i historia skanowań:
    resolveTag(code)     → { variant, … }   GET  /api/tags/:code   (publiczne, zapisuje skan)
    createTag(petId)     → pet              POST /api/pets/:id/tag
    getTagScans(petId)   → scan[]           GET  /api/pets/:id/scans

  Warianty resolveTag (wybiera je serwer, decyzja D6):
    { variant: 'inactive', code }
    { variant: 'owner', code, pet: { id, name, species } }
    { variant: 'lost',  code, pet: { name, species, medicalNotes }, phone, message }
    { variant: 'found', code, pet: { name, species, medicalNotes }, phone }

  scan = { id, tagCode, scannedAt, userAgent, byOwner }
*/
export function resolveTag(code) {
  return request('GET', `/tags/${encodeURIComponent(code)}`)
}

export function createTag(petId) {
  return request('POST', `/pets/${encodeURIComponent(petId)}/tag`)
}

export function getTagScans(petId) {
  return request('GET', `/pets/${encodeURIComponent(petId)}/scans`)
}
