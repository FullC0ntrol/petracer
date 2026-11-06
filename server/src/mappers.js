/*
  Zamiana wierszy z bazy (snake_case, jak w SQL) na obiekty JSON dla frontendu (camelCase, jak w JS).
  Jedno miejsce, w którym ustalamy, jak wygląda np. „zwierzę” w API. Mapper sam wybiera pola,
  dlatego np. `pin_hash` nigdy nie wyjdzie poza serwer.
*/

export function toUser(row) {
  return { id: row.id, email: row.email, name: row.name, phone: row.phone }
}

// `tag_code` pochodzi z LEFT JOIN z tabelą tags (aktywna zawieszka zwierzęcia albo NULL).
export function toPet(row) {
  return {
    id: row.id,
    name: row.name,
    species: row.species,
    breed: row.breed,
    birthDate: row.birth_date,
    weightKg: row.weight_kg,
    medicalNotes: row.medical_notes,
    isLost: row.is_lost,
    lostMessage: row.lost_message,
    tagCode: row.tag_code ?? null,
    createdAt: row.created_at,
  }
}

export function toScan(row) {
  return {
    id: row.id,
    tagCode: row.tag_code,
    scannedAt: row.scanned_at,
    userAgent: row.user_agent,
    byOwner: row.by_owner,
  }
}

export function toActivity(row) {
  return { id: row.id, petId: row.pet_id, type: row.type, occurredAt: row.occurred_at }
}
