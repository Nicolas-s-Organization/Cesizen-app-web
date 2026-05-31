# syntax=docker/dockerfile:1

# ─── Stage 1 : build du SPA ─────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# URL de l'API embarquée dans le build (Vite "bake" la valeur au build, pas au run).
# Surchargée en CD via --build-arg VITE_API_URL=https://api.example.com
ARG VITE_API_URL=
ENV VITE_API_URL=$VITE_API_URL

# Layer caching : install d'abord (ne s'invalide que si les deps changent)
COPY package.json package-lock.json ./
RUN npm ci

# Source puis build (tsc -b + vite build → produit dist/)
COPY . .
RUN npm run build

# ─── Stage 2 : runtime nginx non-root ───────────────────────────────────────
# nginxinc/nginx-unprivileged : image officielle nginx pré-configurée pour
# tourner en utilisateur non-root (USER nginx) et écouter sur le port 8080.
FROM nginxinc/nginx-unprivileged:alpine AS runtime

# Notre config (SPA fallback + cache des assets hashés)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Les fichiers statiques produits par Vite
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
