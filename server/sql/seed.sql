-- Dane przykładowe: te same co w trybie mock (src/mocks/seed.js), żeby oba tryby wyglądały tak samo.
-- Daty liczone względem now(), więc demo zawsze wygląda świeżo.
-- Ładuje je serwer przy starcie, gdy SEED_DEMO_DATA=true i baza jest pusta, albo `npm run db:reset`.

INSERT INTO users (id, email, name, phone) VALUES
  ('00000000-0000-4000-8000-000000000001', 'maciej@pettrace.pl', 'Maciej', '+48 600 123 456');

INSERT INTO pets (id, owner_id, name, species, breed, birth_date, weight_kg, medical_notes, is_lost, lost_message) VALUES
  (
    '00000000-0000-4000-8000-0000000000a1', '00000000-0000-4000-8000-000000000001',
    'Luna', 'dog', 'Border collie', '2023-05-14', 17.5,
    E'Alergia: kurczak.\nLeki: Bravecto, 1 tabletka co 12 tygodni.\nSzczepienia: wścieklizna, DHPPi + L4 (aktualne).',
    false, ''
  ),
  (
    '00000000-0000-4000-8000-0000000000a2', '00000000-0000-4000-8000-000000000001',
    'Mruczek', 'cat', 'Europejski krótkowłosy', '2020-08-02', 4.9,
    E'Przewlekła choroba nerek (wczesne stadium).\nLeki: Semintra 0,5 ml raz dziennie.\nPłochliwy — nie łapać na siłę.',
    true, 'Mruczek jest płochliwy — nie łap go, tylko daj znać, gdzie jest. Lubi suchą karmę.'
  );

INSERT INTO tags (code, pet_id, is_active, created_at) VALUES
  ('LUNA-7K2Q', '00000000-0000-4000-8000-0000000000a1', true, now() - interval '400 days'),
  ('MRCZ-4P9D', '00000000-0000-4000-8000-0000000000a2', true, now() - interval '380 days'),
  ('XXXX-0000', NULL, false, now() - interval '30 days');

INSERT INTO tag_scans (tag_code, scanned_at, user_agent, by_owner) VALUES
  ('MRCZ-4P9D', now() - interval '1 day 4 hours',
    'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36', false),
  ('MRCZ-4P9D', now() - interval '14 hours',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1', false),
  ('LUNA-7K2Q', now() - interval '1 day 5 hours',
    'Mozilla/5.0 (Linux; Android 14; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36', true),
  ('LUNA-7K2Q', now() - interval '5 days 2 hours',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1', false),
  ('LUNA-7K2Q', now() - interval '12 days 6 hours',
    'Mozilla/5.0 (Linux; Android 13; Redmi Note 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Mobile Safari/537.36', false);

INSERT INTO activities (pet_id, type, occurred_at, duration_min, distance_m, source) VALUES
  ('00000000-0000-4000-8000-0000000000a1', 'walk',    now() - interval '1 day 5 hours', 41, 3240, 'quick_tap'),
  ('00000000-0000-4000-8000-0000000000a1', 'feeding', now() - interval '1 day 4 hours', NULL, NULL, 'quick_tap'),
  ('00000000-0000-4000-8000-0000000000a1', 'walk',    now() - interval '2 days',        52, 3780, 'manual'),
  ('00000000-0000-4000-8000-0000000000a1', 'feeding', now() - interval '2 days 1 hour', NULL, NULL, 'quick_tap'),
  ('00000000-0000-4000-8000-0000000000a1', 'walk',    now() - interval '3 days',        22, 1650, 'manual'),
  ('00000000-0000-4000-8000-0000000000a1', 'walk',    now() - interval '4 days',        44, 3240, 'manual'),
  ('00000000-0000-4000-8000-0000000000a1', 'walk',    now() - interval '6 days',        27, 1890, 'manual'),
  ('00000000-0000-4000-8000-0000000000a2', 'feeding', now() - interval '3 days',        NULL, NULL, 'quick_tap');
