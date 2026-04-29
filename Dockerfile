# Stage 1: Build
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy dependency files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN bun prisma generate

# Build the application
RUN bun run build

# Stage 2: Runtime
FROM node:20-slim AS runner

WORKDIR /app

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy the build output and necessary files
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/.bin ./node_modules/.bin

# Create upload directory and symlink it to the public directory in .output
RUN mkdir -p /app/public/uploads && \
    mkdir -p /app/.output/public && \
    ln -s /app/public/uploads /app/.output/public/uploads

# Expose the port Nuxt runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Script to start the app
RUN echo '#!/bin/sh\nexec node .output/server/index.mjs' > /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Start the application
ENTRYPOINT ["/app/entrypoint.sh"]
