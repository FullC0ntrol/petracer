import dotenv from 'dotenv'

/*
  Cała konfiguracja serwera w jednym miejscu, czytana ze zmiennych środowiskowych.
  Lokalnie wartości bierzemy z pliku server/.env (wczytuje go dotenv), w Dockerze
  podaje je docker-compose. Opis każdej zmiennej: server/.env.example.
*/
dotenv.config({ quiet: true })

const isProduction = process.env.NODE_ENV === 'production'

function required(name, fallbackForDev) {
  const value = process.env[name]
  if (value) return value
  // W trybie deweloperskim pozwalamy na wartość domyślną, żeby serwer dało się uruchomić
  // bez konfiguracji. W produkcji brak zmiennej to błąd — lepiej nie wystartować, niż
  // np. podpisywać sesje znanym wszystkim sekretem.
  if (!isProduction && fallbackForDev !== undefined) return fallbackForDev
  throw new Error(`Brak wymaganej zmiennej środowiskowej ${name}.`)
}

export const config = {
  isProduction,
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: required('DATABASE_URL', 'postgres://petrace:petrace@localhost:5434/petrace'),
  jwtSecret: required('JWT_SECRET', 'dev-only-secret-change-me'),
  // Publiczny adres aplikacji — z niego budujemy link w mailu.
  appUrl: required('APP_URL', 'http://localhost:5173').replace(/\/$/, ''),
  // Ciasteczko `Secure` (tylko HTTPS). Domyślnie włączone w produkcji. Przeglądarki traktują
  // http://localhost jako bezpieczny, więc lokalny Docker działa także z `true`.
  cookieSecure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === 'true' : isProduction,
  seedDemoData: process.env.SEED_DEMO_DATA === 'true',
  smtp: {
    host: process.env.SMTP_HOST ?? '',
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
    from: process.env.MAIL_FROM ?? 'PeTrace <no-reply@petracker.pl>',
  },
}
