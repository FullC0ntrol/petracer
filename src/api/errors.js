// Błąd z kodem jak w HTTP (400 — złe dane, 401 — niezalogowany, 404 — nie ma, 429 — za dużo prób,
// 0 — brak połączenia). Obie implementacje (mock i http) rzucają ten sam rodzaj błędu,
// więc strony obsługują je jednakowo. Komunikat jest po polsku, bo trafia prosto do interfejsu.
export function apiError(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}
