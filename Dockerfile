# Obraz frontendu: najpierw budujemy aplikację (Node.js), potem kopiujemy gotowe pliki do Caddy.
# Tzw. multi-stage build — w obrazie końcowym nie ma Node.js ani node_modules, tylko statyczne pliki.

# --- Etap 1: budowanie ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# W produkcji frontend rozmawia z prawdziwym API (patrz src/api/mode.js).
ENV VITE_API_MODE=http
RUN npm run build

# --- Etap 2: serwer WWW ---
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
