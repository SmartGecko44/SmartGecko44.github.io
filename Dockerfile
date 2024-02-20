# Use the Nginx image from Docker Hub
FROM nginx:alpine AS builder
LABEL authors="gecko"

# Copy the static website files into the Nginx container
COPY ./index.html /usr/share/nginx/html
COPY ./styles /usr/share/nginx/html/styles
COPY ./scripts /usr/share/nginx/html/scripts
COPY ./icons /usr/share/nginx/html/icons

FROM nginx:alpine AS runtime
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

# Copy static website files from the builder stage
COPY --from=builder /usr/share/nginx/html /usr/share/nginx/html

# Ensure nonroot user has necessary permissions
RUN chown -R nonroot:nonroot /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html
RUN chmod -R 755 /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx when the container has provisioned
CMD ["nginx", "-g", "daemon off;"]

USER nonroot
