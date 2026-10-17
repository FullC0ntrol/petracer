import { useState } from 'react'

const ERROR_MESSAGES = {
  1: 'Nie zgodzono się na udostępnienie lokalizacji.',
  2: 'Telefon nie potrafi teraz ustalić pozycji (słaby sygnał GPS?).',
  3: 'Ustalanie pozycji trwało zbyt długo.',
}

/*
  Jednorazowe pobranie pozycji z Geolocation API.

    const { status, position, error, request } = useGeolocation()
    status: 'idle' → 'locating' → 'success' | 'error'

  Pozycję pobieramy dopiero po kliknięciu (`request`), a nie od razu przy wejściu na stronę:
  przeglądarki pokazują wtedy pytanie o zgodę w zrozumiałym kontekście, a część z nich
  (Safari) w ogóle blokuje pytania niewywołane działaniem użytkownika.

  Geolokalizacja działa tylko na stronach HTTPS (i na localhost) — na zwykłym HTTP przeglądarka
  od razu zwraca błąd.
*/
export function useGeolocation() {
  const [state, setState] = useState({ status: 'idle', position: null, error: null })

  function request() {
    if (!('geolocation' in navigator)) {
      setState({ status: 'error', position: null, error: 'Ta przeglądarka nie obsługuje lokalizacji.' })
      return
    }

    setState({ status: 'locating', position: null, error: null })
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setState({
          status: 'success',
          position: { latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy },
          error: null,
        }),
      (geoError) =>
        setState({
          status: 'error',
          position: null,
          error: ERROR_MESSAGES[geoError.code] ?? 'Nie udało się pobrać lokalizacji.',
        }),
      // Dokładny GPS, maks. 15 s czekania, pozycja sprzed najwyżej 30 s jest wystarczająco świeża.
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 },
    )
  }

  return { ...state, request }
}
