# Obraz API: Node.js + kod serwera. Budowany przez docker-compose.yml (usługa `api`).
FROM node:22-alpine

WORKDIR /app

# Najpierw same pliki zależności: Docker zapamiętuje ten krok (cache) i przy zmianie kodu
# nie instaluje paczek od nowa — tylko gdy zmieni się package.json albo package-lock.json.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY sql ./sql
COPY scripts ./scripts

# Serwer nie musi działać jako root — użytkownik `node` jest w obrazie gotowy.
USER node
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "src/index.js"]
