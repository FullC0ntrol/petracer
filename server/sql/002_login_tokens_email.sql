-- Zmiana schematu dla baz założonych przed 2026-10-17: konto powstaje dopiero po kliknięciu
-- w link logowania (UC1), więc token pamięta e-mail i imię zamiast id użytkownika.
--
-- Nowa baza dostaje ten kształt od razu z 001_init.sql, ten plik jest tylko dla istniejących.
-- Uruchom ręcznie (DEPLOY.md, sekcja 9):
--   docker compose exec -T db psql -U petrace petrace < server/sql/002_login_tokens_email.sql
--
-- Tabelę można bezpiecznie usunąć: tokeny żyją 15 minut, a sesje są w ciasteczkach (JWT),
-- więc nikt nie zostanie wylogowany. Najwyżej link wysłany przed chwilą przestanie działać.

DROP TABLE IF EXISTS login_tokens;

CREATE TABLE login_tokens (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text NOT NULL,
  name       text NOT NULL DEFAULT '',
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at    timestamptz
);
