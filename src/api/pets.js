import * as http from './http/pets.js'
import * as mock from './mock/pets.js'

/*
  Zwierzęta zalogowanego właściciela:
    getPets()                           → pet[]   GET   /api/pets
    getPetById(id)                      → pet     GET   /api/pets/:id
    createPet(data)                     → pet     POST  /api/pets
    updatePet(id, changes)              → pet     PATCH /api/pets/:id
    setLostMode(id, isLost, message)    → pet     PATCH /api/pets/:id/lost

  pet = { id, name, species, breed, birthDate, weightKg, medicalNotes, isLost, lostMessage, tagCode, createdAt }
*/
const useHttp = import.meta.env.VITE_API_MODE === 'http'

export const getPets = useHttp ? http.getPets : mock.getPets
export const getPetById = useHttp ? http.getPetById : mock.getPetById
export const createPet = useHttp ? http.createPet : mock.createPet
export const updatePet = useHttp ? http.updatePet : mock.updatePet
export const setLostMode = useHttp ? http.setLostMode : mock.setLostMode
