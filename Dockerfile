FROM node:22-bookworm-slim AS deps

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY config.json ./config.json

RUN mkdir -p /app/data && chown -R node:node /app

USER node

CMD ["node", "src/index.js"]
