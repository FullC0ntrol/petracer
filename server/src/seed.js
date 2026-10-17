import { readFile } from 'node:fs/promises'
import { pool } from './db.js'

const SQL_DIR = new URL('../sql/', import.meta.url)

export async function runSqlFile(name) {
  const sql = await readFile(new URL(name, SQL_DIR), 'utf8')
  await pool.query(sql)
}

// Dane demo wczytujemy tylko do pustej bazy — restart serwera nie może zdublować Luny i Mruczka.
export async function seedDemoDataIfEmpty() {
  const { rows } = await pool.query('SELECT count(*)::int AS count FROM users')
  if (rows[0].count > 0) return
  await runSqlFile('seed.sql')
  console.log('Wczytano dane przykładowe (Luna, Mruczek). Konto demo: maciej@pettrace.pl')
}
