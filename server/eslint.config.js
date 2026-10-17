import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

// Osobna konfiguracja dla backendu: kod działa w Node.js, nie w przeglądarce
// (zmienne globalne `process`, `console`… zamiast `window`, `document`).
// ESLint używa najbliższego pliku konfiguracyjnego, więc `npm run lint` w korzeniu sprawdza też serwer.
export default defineConfig([
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
])
