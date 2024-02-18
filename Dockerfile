# Use the Nginx image from Docker Hub
FROM nginx:alpine
LABEL authors="gecko"

# Copy the static website files into the Nginx container
COPY ./index.html /usr/share/nginx/html
COPY ./styles /usr/share/nginx/html/styles
COPY ./scripts /usr/share/nginx/html/scripts
COPY ./icons /usr/share/nginx/html/icons

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx when the container has provisioned
CMD ["nginx", "-g", "daemon off;"]