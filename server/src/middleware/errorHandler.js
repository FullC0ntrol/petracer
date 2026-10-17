import { HttpError } from '../errors.js'

/*
  Ostatni middleware w łańcuchu. Express 5 sam przekazuje tu błędy rzucone w funkcjach `async`
  (w Expressie 4 trzeba było łapać je ręcznie i wołać next(error)).

  Znane błędy (HttpError) zwracamy z ich kodem i komunikatem. Każdy inny to błąd programu
  albo bazy: logujemy szczegóły w konsoli serwera, a klientowi mówimy tylko „coś poszło nie tak”,
  żeby nie zdradzać budowy systemu (np. treści zapytań SQL).
*/
// eslint-disable-next-line no-unused-vars -- Express rozpoznaje obsługę błędów po 4 parametrach.
export function errorHandler(error, req, res, next) {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ error: error.message })
  }
  // Niepoprawny JSON w treści żądania (rzuca go express.json()).
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Niepoprawny format danych.' })
  }

  console.error(error)
  res.status(500).json({ error: 'Coś poszło nie tak po stronie serwera. Spróbuj ponownie za chwilę.' })
}

export function notFound(req, res) {
  res.status(404).json({ error: 'Nie ma takiego adresu API.' })
}
