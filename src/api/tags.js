import * as http from './http/tags.js'
import * as mock from './mock/tags.js'
import { API_MODE } from './mode.js'

/*
  Zawieszki i historia skanowań:
    resolveTag(code)        → { variant, … }   GET  /api/tags/:code   (publiczne, zapisuje skan)
    createTag(petId)        → pet              POST /api/pets/:id/tag
    getTagScans(petId)      → scan[]           GET  /api/pets/:id/scans
    getRecentScans(limit)   → scan[]           GET  /api/scans?limit=

  Warianty resolveTag (wybiera je serwer, decyzja D6):
    { variant: 'inactive', code }
    { variant: 'owner', code, pet: { id, name, species } }
    { variant: 'lost',  code, pet: { name, species, medicalNotes }, phone, message }
    { variant: 'found', code, pet: { name, species, medicalNotes }, phone }

  scan = { id, tagCode, scannedAt, userAgent, byOwner, petId, petName }
*/
const impl = API_MODE === 'http' ? http : mock

export const { resolveTag, createTag, getTagScans, getRecentScans } = impl
