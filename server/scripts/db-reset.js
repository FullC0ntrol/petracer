import { pool } from '../src/db.js'
import { runSqlFile } from '../src/seed.js'

/*
  npm run db:reset — usuwa WSZYSTKIE dane i tworzy schemat od nowa z danymi przykładowymi.
  Tylko do pracy lokalnej. Na serwerze produkcyjnym nigdy tego nie uruchamiaj.
*/
await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;')
await runSqlFile('001_init.sql')
await runSqlFile('seed.sql')
console.log('Baza wyczyszczona: schemat i dane przykładowe wczytane od nowa.')
await pool.end()
