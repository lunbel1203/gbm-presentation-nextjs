#!/bin/bash

# Script de deployment para VPS
echo "🚀 Iniciando deployment de GBM Presentation..."

# Detener contenedores existentes
echo "📦 Deteniendo contenedores anteriores..."
docker compose -f docker-compose.prod.yml down

# Limpiar imágenes antiguas
echo "🧹 Limpiando imágenes antiguas..."
docker image prune -f

# Construir nueva imagen
echo "🔨 Construyendo nueva imagen..."
docker compose -f docker-compose.prod.yml build --no-cache

# Iniciar contenedor
echo "▶️  Iniciando contenedor..."
docker compose -f docker-compose.prod.yml up -d

# Mostrar logs
echo "📋 Mostrando logs..."
docker compose -f docker-compose.prod.yml logs -f
