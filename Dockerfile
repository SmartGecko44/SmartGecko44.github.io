# Use the Node.js image as builder stage
FROM node:22 AS builder
LABEL authors="gecko"
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy the static website files into the container
COPY gxcko.me/icons ./gxcko.me/icons/
COPY gxcko.me/redirect ./gxcko.me/redirect/
COPY gxcko.me/scripts ./gxcko.me/scripts/
COPY gxcko.me/styles ./gxcko.me/styles/
COPY gxcko.me/src ./gxcko.me/src/
COPY gxcko.me/404.html ./gxcko.me/
COPY gxcko.me/favicon.ico ./gxcko.me/
COPY gxcko.me/index.html ./gxcko.me/
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Copy the build config
COPY webpack.config.js ./

# Build the application
RUN npm run build

# Stage 2: Use Nginx for serving the static files
FROM nginx:alpine AS runtime
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

# Set the working directory to the Nginx directory
WORKDIR /usr/share/nginx/html

# Copy static website files from the builder stage
COPY --from=builder /app/gxcko.me/ ./
COPY --from=builder /app/gxcko.me/dist/index.html ./
COPY --from=builder /app/gxcko.me/dist/assets/ ./assets/

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
