# Imagen de producción para Strapi v5 (GBM CMS)
FROM node:20-alpine

# Dependencias del sistema para sharp / procesamiento de imágenes (vips)
RUN apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git

ENV NODE_ENV=production
WORKDIR /app

# Instalar dependencias (incluye las necesarias para `strapi build`)
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Copiar el resto del código y compilar el panel de administración
COPY . .
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
