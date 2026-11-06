// Błąd z kodem jak w HTTP (400 — złe dane, 401 — niezalogowany, 404 — nie ma, 429 — za dużo prób,
// 0 — brak połączenia). Komunikat jest po polsku, bo trafia prosto do interfejsu.
function apiError(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}

/*
  Jedno miejsce, które wykonuje zapytania do serwera. Pozostałe pliki w api/ podają tylko
  metodę, adres i dane.

  - Adres zaczyna się od /api: frontend i API są pod tą samą domeną (w produkcji rozdziela je Caddy,
    w `npm run dev` — proxy Vite), więc nie trzeba konfigurować CORS.
  - Ciasteczko sesji (httpOnly) przeglądarka dołącza sama; JavaScript go nie widzi i nie musi.
  - Odpowiedź z błędem (4xx, 5xx) zamieniamy na wyjątek z komunikatem od serwera.
*/
export async function request(method, path, body) {
  let response
  try {
    response = await fetch(`/api${path}`, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: 'same-origin',
    })
  } catch {
    // fetch rzuca tylko wtedy, gdy w ogóle nie dostał odpowiedzi (brak internetu, serwer wyłączony).
    throw apiError(0, 'Brak połączenia z serwerem. Sprawdź internet i spróbuj ponownie.')
  }

  if (response.status === 204) return null

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw apiError(response.status, data?.error ?? 'Coś poszło nie tak. Spróbuj ponownie za chwilę.')
  }
  return data
}
