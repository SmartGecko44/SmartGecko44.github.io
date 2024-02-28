# Use the Node.js image as builder stage
FROM node:21 AS builder
LABEL authors="gecko"
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy the static website files into the Nginx container
COPY . .

# Build the application
RUN npm run build

# Stage 2: Use Nginx for serving the static files
FROM nginx:alpine AS runtime
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

# Copy static website files from the builder stage
COPY --from=builder /app/ /usr/share/nginx/html

RUN touch /var/run/nginx.pid

# Ensure nonroot user has necessary permissions
RUN chown -R nonroot:nonroot /var/cache/nginx /var/run /var/log/nginx /var/run/nginx.pid /usr/share/nginx/html
RUN chmod -R 755 /var/cache/nginx /var/run /var/log/nginx /var/run/nginx.pid /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx when the container has provisioned
CMD ["nginx", "-g", "daemon off;"]

# Switch to nonroot user
USER nonroot
