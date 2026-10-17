/*
  Skąd biorą się dane (decyzja D16):
    mock — „baza” w localStorage przeglądarki (src/mocks/), działa bez serwera,
    http — prawdziwe API: zapytania fetch do /api (folder server/).

  Tryb ustawia zmienna VITE_API_MODE (plik .env.http albo zmienna przy budowaniu).
  Vite podmienia `import.meta.env.…` na stałą już przy budowaniu, więc w paczce
  produkcyjnej zostaje tylko kod wybranego trybu.
*/
export const API_MODE = import.meta.env.VITE_API_MODE === 'http' ? 'http' : 'mock'
