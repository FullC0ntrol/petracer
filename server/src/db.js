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
