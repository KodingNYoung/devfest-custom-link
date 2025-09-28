FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies based on the preferred package manager
RUN  npm ci

# Copy source code
COPY . .

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ARG SESSION_SECRET
ENV SESSION_SECRET=${SESSION_SECRET}
ARG NEXT_PUBLIC_BACKEND_ENDPOINT_URL
ENV NEXT_PUBLIC_BACKEND_ENDPOINT_URL=${NEXT_PUBLIC_BACKEND_ENDPOINT_URL}

# Build the application
RUN  npm run build;

# Start the application
CMD ["npm", "start"]