import { getDb } from '../mocks/db.js'
import { delay, findSessionUser } from './client.js'

/*
  Serce routingu kontekstowego: co wiadomo o tagu, którego adres właśnie otwarto.
  Strona nie musi być zalogowana — znalazca jest anonimowy.

  Zwracamy tylko PUBLICZNE dane zwierzęcia (bez wagi, leków, historii itd.) oraz flagę `isOwner`.
  O tym, czy skanuje właściciel, decyduje „serwer” na podstawie sesji — przeglądarka nie dostaje
  id właściciela i nie porównuje go sama, bo dane z przeglądarki łatwo podrobić.
*/
export async function resolveTag(tagId) {
  await delay()
  const db = getDb()
  const normalizedId = tagId.toUpperCase()
  const tag = db.tags.find((item) => item.id === normalizedId)
  const pet = tag?.isActive && db.pets.find((item) => item.id === tag.petId)

  if (!pet) return { tagId: normalizedId, isActive: false }

  const viewer = findSessionUser(db)
  return {
    tagId: normalizedId,
    isActive: true,
    isOwner: viewer?.id === pet.ownerId,
    pet: {
      id: pet.id,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      avatarColor: pet.avatarColor,
      isLost: pet.isLost,
      lostMessage: pet.lostMessage,
      allergies: pet.health.allergies,
    },
  }
}
