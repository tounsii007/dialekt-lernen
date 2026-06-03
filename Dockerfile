# Frontend-Container: statische PWA über nginx (mit SPA-Fallback + /api-Proxy).
FROM nginx:1.27-alpine

# Eigene Server-Config (ersetzt die Default-Site)
RUN rm -f /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/app.conf

# Statische App-Dateien
COPY index.html styles.css styles.min.css sw.js manifest.webmanifest /usr/share/nginx/html/
COPY js/    /usr/share/nginx/html/js/
COPY data/  /usr/share/nginx/html/data/
COPY icons/ /usr/share/nginx/html/icons/

EXPOSE 80
