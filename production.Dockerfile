FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package*.json ./
RUN  npm ci


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_BACKEND_ENDPOINT_URL
ENV NEXT_PUBLIC_BACKEND_ENDPOINT_URL=${NEXT_PUBLIC_BACKEND_ENDPOINT_URL}

RUN npm run build;

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_BACKEND_ENDPOINT_URL
ENV NEXT_PUBLIC_BACKEND_ENDPOINT_URL=${NEXT_PUBLIC_BACKEND_ENDPOINT_URL}

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]