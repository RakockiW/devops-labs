FROM node:20-alpine

WORKDIR /app

ARG IMAGE_VERSION
LABEL version=$IMAGE_VERSION

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src/ ./src/

RUN mkdir -p /data && chown -R node:node /data

EXPOSE 3000

USER node

CMD ["node", "src/server.js"]