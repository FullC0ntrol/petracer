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

const appUrl = required('APP_URL', 'http://localhost:5173').replace(/\/$/, '')
// Aplikacja działa na własnym komputerze (npm run dev albo lokalny Docker), a nie na prawdziwej domenie.
const isLocalApp = /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(appUrl)

/*
  Bezpiecznik: wartości domyślne z docker-compose.yml są wygodne na własnym komputerze,
  ale na prawdziwej domenie oznaczałyby sekret znany każdemu, kto przeczytał repozytorium.
*/
function assertSafeSecret(jwtSecret) {
  if (isProduction && !isLocalApp && (jwtSecret.includes('change-me') || jwtSecret.length < 32)) {
    throw new Error('JWT_SECRET jest domyślny albo za krótki. Ustaw w .env losowy sekret: openssl rand -hex 32')
  }
  return jwtSecret
}

export const config = {
  isProduction,
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: required('DATABASE_URL', 'postgres://petrace:petrace@localhost:5434/petrace'),
  jwtSecret: assertSafeSecret(required('JWT_SECRET', 'dev-only-secret-change-me')),
  // Publiczny adres aplikacji — z niego budujemy link w mailu.
  appUrl,
  // Link logowania także w odpowiedzi API (przycisk „[DEV] Symuluj kliknięcie w link”): poza produkcją
  // albo gdy aplikacja działa na localhost. Na prawdziwej domenie nigdy — każdy mógłby wtedy
  // zalogować się na cudze konto, znając tylko adres e-mail.
  exposeDevLink: !isProduction || isLocalApp,
  // Ciasteczko `Secure` (tylko HTTPS). Domyślnie włączone w produkcji. Przeglądarki traktują
  // http://localhost jako bezpieczny, więc lokalny Docker działa także z `true`.
  cookieSecure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === 'true' : isProduction,
  seedDemoData: process.env.SEED_DEMO_DATA === 'true',
  // Ilu pośredników (reverse proxy) stoi przed API: 1 = sam Caddy, 2 = nginx + Caddy.
  trustProxyHops: Number(process.env.TRUST_PROXY_HOPS ?? 1),
  smtp: {
    host: process.env.SMTP_HOST ?? '',
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
    from: process.env.MAIL_FROM ?? 'PetTrace <no-reply@petracker.pl>',
  },
}
