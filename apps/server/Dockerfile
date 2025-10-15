FROM node:22.16.0-alpine3.22 AS base
WORKDIR /app

# Base installer - copie TOUT le monorepo
FROM base AS installer
COPY package.json package-lock.json ./
COPY apps/server/package.json ./apps/server/
COPY . .

# All deps stage
FROM installer AS deps
RUN npm install

# Production only deps stage
FROM installer AS production-deps
RUN npm install --omit=dev

# Build stage
FROM installer AS build
COPY --from=deps /app/node_modules /app/node_modules
WORKDIR /app/apps/server
RUN node ace build
RUN node ace migration:run --force

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/apps/server/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]