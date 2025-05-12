# 1) Build de l'application
FROM node:18-alpine AS builder
WORKDIR /app

# Ajouter package.json + package-lock.json puis installer les dépendances
COPY package.json package-lock.json ./
RUN npm ci

# Copier tout le code source et lancer le build
COPY . .
RUN npm run build

# 2) Serveur Nginx pour servir les fichiers statiques
FROM nginx:stable-alpine
# Enlever la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier la config Nginx custom (voir plus bas) et les fichiers buildés
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
