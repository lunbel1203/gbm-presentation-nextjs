# 🚀 Deployment en VPS con Docker

## Requisitos previos
- ✅ Docker instalado en VPS
- ✅ Git instalado en VPS
- ✅ Puerto 3000 abierto (o el puerto que elijas)

## Paso 1: Subir código a Git

En tu máquina local:

```bash
# Asegúrate de tener todos los cambios commiteados
git add .
git commit -m "Ready for production deployment"
git push origin main
```

## Paso 2: Configurar VPS

Conéctate a tu VPS:

```bash
ssh usuario@tu-vps-ip
```

Clona el repositorio:

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

# O si ya está clonado, actualiza:
git pull origin main
```

## Paso 3: Configurar variables de entorno

Crea el archivo `.env.production`:

```bash
nano .env.production
```

Pega el siguiente contenido (ajusta según necesites):

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tudominio.com
NEXT_TELEMETRY_DISABLED=1
```

Guarda con `Ctrl+O`, Enter, `Ctrl+X`

## Paso 4: Dar permisos al script de deploy

```bash
chmod +x deploy.sh
```

## Paso 5: Ejecutar deployment

```bash
./deploy.sh
```

Esto hará:
1. Detener contenedores existentes
2. Construir nueva imagen Docker
3. Iniciar el contenedor
4. Mostrar logs en tiempo real

## Paso 6: Verificar que funciona

Abre en tu navegador:
```
http://tu-vps-ip:3000
```

## 🔄 Para actualizar la aplicación en el futuro

```bash
# En tu VPS
cd /ruta/del/proyecto
git pull origin main
./deploy.sh
```

## 🛠️ Comandos útiles

### Ver logs del contenedor
```bash
docker logs gbm-presentation -f
```

### Detener la aplicación
```bash
docker-compose -f docker-compose.prod.yml down
```

### Reiniciar la aplicación
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Ver estado del contenedor
```bash
docker ps
```

### Entrar al contenedor (debug)
```bash
docker exec -it gbm-presentation sh
```

## 🌐 Configurar dominio (opcional)

Si tienes un dominio, configura tu DNS:

1. Añade un registro A apuntando a la IP de tu VPS
2. Usa nginx o traefik como reverse proxy
3. Configura SSL con Let's Encrypt

## 🔥 Troubleshooting

### El contenedor no inicia
```bash
docker logs gbm-presentation
```

### Puerto en uso
```bash
# Cambiar puerto en docker-compose.prod.yml
ports:
  - "8080:3000"  # Usa 8080 en lugar de 3000
```

### Reconstruir desde cero
```bash
docker-compose -f docker-compose.prod.yml down
docker system prune -a
./deploy.sh
```
