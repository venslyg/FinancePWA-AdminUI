# Build stage
FROM node:22-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./package.json


# Install dependencies
RUN npm i

# Copy source code
COPY . .
RUN npm i -g @angular/cli@19.2.19

# Build the Angular app
RUN ng build

# Production stage
FROM nginx

# Copy built application from builder
COPY --from=builder /app/dist/fuse/browser /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
