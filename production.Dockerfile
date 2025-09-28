FROM node:20-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies based on the preferred package manager
RUN  npm ci

# Copy source code
COPY . .

# Environment variables must be present at build time
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ARG NEXT_PUBLIC_BACKEND_ENDPOINT_URL
ENV NEXT_PUBLIC_BACKEND_ENDPOINT_URL=${NEXT_PUBLIC_BACKEND_ENDPOINT_URL}

# Build the application
RUN  npm run build;

# Step 2. Production image, copy all the files and run next
FROM base AS production

# Set working directory
WORKDIR /app

# Copy only the necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Environment variables must be redefined at run time
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ARG NEXT_PUBLIC_BACKEND_ENDPOINT_URL
ENV NEXT_PUBLIC_BACKEND_ENDPOINT_URL=${NEXT_PUBLIC_BACKEND_ENDPOINT_URL}

# Start the application
CMD ["npm", "start"]