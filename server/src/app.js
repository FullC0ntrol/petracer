import cookieParser from 'cookie-parser'
import express from 'express'
import { config } from './config.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { activitiesRouter } from './routes/activities.js'
import { authRouter } from './routes/auth.js'
import { meRouter } from './routes/me.js'
import { petsRouter } from './routes/pets.js'
import { tagsRouter } from './routes/tags.js'

/*
  Konfiguracja aplikacji Express — bez uruchamiania nasłuchu (to robi index.js).
  Żądanie przechodzi przez middleware w kolejności dopisywania: parsowanie → trasy → 404 → błędy.
*/
export function createApp() {
  const app = express()

  // Serwer stoi za Caddy (reverse proxy). Bez tego `req.ip` byłby zawsze adresem Caddy,
  // a limit żądań traktowałby wszystkich użytkowników jak jedną osobę.
  // Gdy przed Caddy stoi jeszcze nginx (np. na serwerze z innymi stronami), pośredników jest dwóch
  // — liczbę ustawia TRUST_PROXY_HOPS (patrz .env.example).
  app.set('trust proxy', config.trustProxyHops)
  app.disable('x-powered-by')

  app.use(express.json({ limit: '20kb' }))
  app.use(cookieParser())

  app.get('/api/health', (req, res) => res.json({ ok: true }))
  app.use('/api/auth', authRouter)
  app.use('/api/me', meRouter)
  app.use('/api/pets', petsRouter)
  app.use('/api', tagsRouter)
  app.use('/api', activitiesRouter)

  app.use('/api', notFound)
  app.use(errorHandler)
  return app
}
