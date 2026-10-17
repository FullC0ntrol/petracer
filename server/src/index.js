import { createApp } from './app.js'
import { config } from './config.js'
import { pool } from './db.js'
import { seedDemoDataIfEmpty } from './seed.js'

// Punkt startowy: sprawdź bazę, opcjonalnie wczytaj dane demo, zacznij nasłuchiwać.
await pool.query('SELECT 1')
if (config.seedDemoData) await seedDemoDataIfEmpty()

const server = createApp().listen(config.port, () => {
  console.log(`API PetTrace działa na http://localhost:${config.port} (${config.isProduction ? 'produkcja' : 'dev'})`)
})

// `docker compose stop` wysyła SIGTERM. Kończymy rozpoczęte żądania i zamykamy połączenia z bazą,
// zamiast urywać je w połowie.
process.on('SIGTERM', () => {
  server.close(() => pool.end())
})
