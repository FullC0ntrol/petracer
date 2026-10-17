import { HttpError } from '../errors.js'

/*
  Prosty ogranicznik liczby żądań („fixed window”): dla każdego klucza (np. adresu IP)
  liczymy żądania w oknie czasu. Po przekroczeniu limitu odpowiadamy 429 Too Many Requests.

  Chroni /auth/request-link przed zasypaniem czyjejś skrzynki mailami i przed masowym
  zakładaniem kont. Liczniki są w pamięci procesu — po restarcie serwera się zerują,
  co przy jednym serwerze w zupełności wystarcza (przy kilku trzeba by trzymać je np. w Redisie).
*/
export function rateLimit({ windowMs, max, keyFn, message }) {
  const hits = new Map()

  // Co jakiś czas usuwamy wygasłe wpisy, żeby mapa nie rosła bez końca.
  // `unref()` sprawia, że ten timer nie trzyma procesu przy życiu.
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key)
  }, windowMs).unref()

  return function rateLimitMiddleware(req, res, next) {
    const key = keyFn(req)
    const now = Date.now()
    const entry = hits.get(key)

    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs })
      return next()
    }

    entry.count += 1
    if (entry.count > max) {
      res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)))
      throw new HttpError(429, message)
    }
    next()
  }
}
