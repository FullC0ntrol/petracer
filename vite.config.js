import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    /*
      PWA: manifest (nazwa, kolory, ikony) i service worker generowany przy `npm run build`.
      Service worker zapisuje pliki aplikacji w pamięci telefonu, więc kolejne otwarcia strony
      zawieszki są szybkie, a aplikację da się zainstalować na ekranie głównym.
      W `npm run dev` wtyczka jest wyłączona (service worker przeszkadzałby przy pracy).
    */
    VitePWA({
      // Nowa wersja aplikacji podmienia starą sama, bez pytania użytkownika.
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'PetTrace',
        short_name: 'PetTrace',
        description: 'Identyfikacja zwierząt przez zawieszki NFC i QR oraz opieka na co dzień.',
        lang: 'pl',
        start_url: '/panel',
        scope: '/',
        display: 'standalone',
        // Kolory z tokenów w src/index.css: tło `paper`, pasek systemowy `pine`.
        background_color: '#FAF7F2',
        theme_color: '#1F5E4B',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Każdy adres aplikacji (np. /t/K7Q2-M9XD) ma dostać index.html — routingiem zajmuje się React.
        navigateFallback: '/index.html',
        // …ale nie adresy API: te zawsze idą do serwera, żeby dane nie pochodziły ze starej kopii.
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
  server: {
    // W trybie http frontend pyta o /api/… na swoim adresie (localhost:5173), a Vite przekazuje
    // te zapytania do serwera Express. Tak samo w produkcji robi Caddy — jedna domena, bez CORS.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
