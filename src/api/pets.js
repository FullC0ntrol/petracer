import * as http from './http/pets.js'
import * as mock from './mock/pets.js'
import { API_MODE } from './mode.js'

/*
  Zwierzęta zalogowanego właściciela:
    getPets()                           → pet[]   GET   /api/pets
    getPetById(id)                      → pet     GET   /api/pets/:id
    createPet(data)                     → pet     POST  /api/pets
    updatePet(id, changes)              → pet     PATCH /api/pets/:id
    setLostMode(id, isLost, message)    → pet     PATCH /api/pets/:id/lost

  pet = { id, name, species, breed, birthDate, weightKg, medicalNotes, isLost, lostMessage, tagCode, createdAt }
*/
const impl = API_MODE === 'http' ? http : mock

export const { getPets, getPetById, createPet, updatePet, setLostMode } = impl
