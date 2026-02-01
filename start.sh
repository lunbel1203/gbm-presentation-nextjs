#!/bin/sh

# Script de inicio que carga tokens desde tokens.json como variable de entorno

# Leer tokens.json y exportar como variable de entorno
if [ -f "/app/data/tokens.json" ]; then
  export ACCESS_TOKENS=$(cat /app/data/tokens.json | tr -d '\n' | tr -d ' ')
  echo "Tokens loaded from tokens.json"
else
  echo "Warning: tokens.json not found, using default tokens"
  export ACCESS_TOKENS='{"tokens":{}}'
fi

# Iniciar el servidor Next.js
exec node server.js
