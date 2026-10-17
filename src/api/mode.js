/*
  Skąd biorą się dane (decyzja D16):
    mock — „baza” w localStorage przeglądarki (src/mocks/), działa bez serwera,
    http — prawdziwe API: zapytania fetch do /api (folder server/).

  Tryb ustawia zmienna VITE_API_MODE (plik .env.http albo zmienna przy budowaniu, np. w Dockerfile).
  Vite podmienia `import.meta.env.…` na stały napis już przy budowaniu. Pliki api/*.js sprawdzają
  ten warunek bezpośrednio (patrz komentarz w api/auth.js); ta stała służy do wyświetlania trybu,
  np. w panelu DEV.
*/
export const API_MODE = import.meta.env.VITE_API_MODE === 'http' ? 'http' : 'mock'
