FROM node:20-alpine

# Katalog roboczy
WORKDIR /app

# Najpierw zależności (cache-friendly)
COPY package*.json ./
RUN npm ci --omit=dev

# Następnie kod źródłowy
COPY src/ ./src/

# Dokumentacja portu
EXPOSE 3000

# Uruchomienie jako użytkownik niepodwyższony
USER node

CMD ["node", "src/server.js"]