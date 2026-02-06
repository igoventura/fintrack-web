# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Build argument for API URL (can be overridden at build time)
ARG API_URL=http://localhost:8080

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Replace API_URL placeholder in environment file
RUN sed -i "s|\${API_URL}|${API_URL}|g" src/environments/environment.prod.ts

# Build the application for production
RUN npm run build:prod

# Run stage
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist/fintrack-web/browser /usr/share/nginx/html

# Expose the web server port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
