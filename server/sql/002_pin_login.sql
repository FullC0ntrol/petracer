-- Przeniesienie bazy założonej przed 2026-11-06 na logowanie PIN-em i mniejszy zakres (D21, D23).
-- Nowa baza dostaje ten kształt od razu z 001_init.sql, ten plik jest tylko dla istniejących.
-- Uruchom ręcznie (DEPLOY.md, sekcja 9):
--   docker compose exec -T db psql -U petrace petrace < server/sql/002_pin_login.sql
--
-- Istniejące konta zostają, ale bez PIN-u nie da się na nie zalogować: PIN nadaje administrator
-- (DEPLOY.md, sekcja „Reset PIN-u”). Wyjątek to konto demo, które dostaje publiczny PIN 123456.

BEGIN;

ALTER TABLE users ADD COLUMN IF NOT EXISTS pin_hash text NOT NULL DEFAULT '';
ALTER TABLE users ALTER COLUMN pin_hash DROP DEFAULT;
UPDATE users
SET pin_hash = '70a6854c0170586385c982388bf5e094:184f0a6e16ea088ff3eaa9bdac8e2e9622c2cf07f28ea22f152a8527c3915605811a15dceef961e3c21def2c4bacb81405ddd1384b6bc646e757bfa3be397b78'
WHERE email = 'maciej@pettrace.pl';

DROP TABLE IF EXISTS login_tokens;
DROP TABLE IF EXISTS vet_shares;

ALTER TABLE activities
  DROP COLUMN IF EXISTS duration_min,
  DROP COLUMN IF EXISTS distance_m,
  DROP COLUMN IF EXISTS source;

COMMIT;
