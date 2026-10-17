import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // W trybie http frontend pyta o /api/… na swoim adresie (localhost:5173), a Vite przekazuje
    // te zapytania do serwera Express. Tak samo w produkcji robi Caddy — jedna domena, bez CORS.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
