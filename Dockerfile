FROM nginx:1.13-alpine

COPY nginx/ /etc/nginx
COPY build/* /usr/share/nginx/www/
COPY build/static/ /usr/share/nginx/www/static/

expose 8080