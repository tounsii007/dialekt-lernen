# Frontend-Container: statische PWA über nginx (SPA-Fallback + /api-Proxy).
# Ports/Backend-Adresse kommen zur Laufzeit aus Umgebungsvariablen (envsubst-Template).
FROM nginx:1.27-alpine

# Default-Site entfernen; eigenes Template einspielen (wird beim Start gerendert).
RUN rm -f /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf.template /etc/nginx/templates/app.conf.template

# Statische App-Dateien
COPY index.html styles.css styles.min.css sw.js manifest.webmanifest /usr/share/nginx/html/
COPY js/    /usr/share/nginx/html/js/
COPY data/  /usr/share/nginx/html/data/
COPY icons/ /usr/share/nginx/html/icons/
