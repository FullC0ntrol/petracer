import { useSyncExternalStore } from 'react'

/*
  TYMCZASOWE (etap 1–2): minimalny stan demonstracyjny w localStorage — czy użytkownik
  jest „zalogowany” i które tagi są w Lost Mode. Od etapu 3 zastąpią go AuthContext
  i warstwa `src/api/`, a panel DEV będzie wołał funkcje API.

  useSyncExternalStore pozwala wielu komponentom czytać ten sam obiekt spoza Reacta
  i przerysować się, gdy się zmieni — bez Contextu i bez biblioteki do stanu.
*/

const STORAGE_KEY = 'pettrace:dev-state'

// Tagi z briefu — na razie na sztywno, w etapie 3 przeniosą się do `mocks/`.
export const DEMO_TAGS = [
  { tagId: 'LUNA-7K2Q', petId: 'luna', petName: 'Luna', isActive: true },
  { tagId: 'MRCZ-4P9D', petId: 'mruczek', petName: 'Mruczek', isActive: true },
  { tagId: 'XXXX-0000', petId: null, petName: null, isActive: false },
]

const DEFAULT_STATE = {
  isLoggedIn: false,
  lostTagIds: ['MRCZ-4P9D'],
}

const listeners = new Set()
let state = readState()

function readState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : DEFAULT_STATE
  } catch {
    return DEFAULT_STATE
  }
}

function setState(next) {
  state = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Brak dostępu do localStorage (np. tryb prywatny) — stan zostaje tylko w pamięci.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useDevState() {
  return useSyncExternalStore(subscribe, () => state)
}

export function setLoggedIn(isLoggedIn) {
  setState({ ...state, isLoggedIn })
}

export function toggleLostMode(tagId) {
  const lostTagIds = state.lostTagIds.includes(tagId)
    ? state.lostTagIds.filter((id) => id !== tagId)
    : [...state.lostTagIds, tagId]
  setState({ ...state, lostTagIds })
}

export function resetDevState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // jw.
  }
  state = DEFAULT_STATE
  listeners.forEach((listener) => listener())
}
