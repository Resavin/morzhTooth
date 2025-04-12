# Use the official Nginx image as the base
FROM nginx:alpine

# Copy the frontend files to the Nginx HTML directory
COPY dist/ /usr/share/nginx/html

# Copy a custom Nginx configuration file (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
