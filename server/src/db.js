import pg from 'pg'
import { config } from './config.js'

/*
  Pula połączeń z PostgreSQL. Zamiast otwierać nowe połączenie przy każdym zapytaniu
  (to wolne), pula trzyma kilka otwartych i pożycza je kolejnym zapytaniom.

  Zawsze przekazujemy wartości osobno ($1, $2…), nigdy nie doklejamy ich do tekstu SQL.
  Wtedy baza traktuje je jako dane, a nie kod — to chroni przed SQL injection.
*/
export const pool = new pg.Pool({ connectionString: config.databaseUrl })

// PostgreSQL zwraca typ `date` jako obiekt Date o północy czasu lokalnego, co potrafi przesunąć
// dzień przy zmianie strefy. Prosimy o zwykły tekst "2023-05-14" — dokładnie to, co wpisał użytkownik.
pg.types.setTypeParser(pg.types.builtins.DATE, (value) => value)
// `numeric` przychodzi jako tekst (żeby nie tracić precyzji). Waga w kg mieści się w zwykłej liczbie JS.
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => Number(value))

export function query(text, params) {
  return pool.query(text, params)
}

/*
  Transakcja: kilka zapytań, które mają się wykonać razem albo wcale.
  Przykład: wyłączenie starej zawieszki i utworzenie nowej — gdyby drugie zapytanie się nie
  udało, zwierzę zostałoby bez żadnego aktywnego tagu. ROLLBACK cofa wtedy także pierwsze.
*/
export async function withTransaction(callback) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}
