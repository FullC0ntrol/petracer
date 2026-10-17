/*
  Dokąd wrócić po zalogowaniu. Przyjmujemy tylko ścieżki wewnątrz aplikacji ("/zwierzeta/…"),
  a odrzucamy pełne adresy i "//inna-strona.pl". Inaczej ktoś mógłby rozesłać prawdziwy link
  logowania, który po zalogowaniu przenosi na fałszywą stronę (tzw. open redirect).
  Serwer sprawdza to samo (server/src/routes/auth.js) — tu tylko dla pewności i trybu mock.
*/
export function safeRedirect(path) {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//') || path.includes('\\')) {
    return null
  }
  return path
}
