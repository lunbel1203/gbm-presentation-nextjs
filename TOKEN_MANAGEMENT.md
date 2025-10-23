# Sistema de Gestión de Tokens - GBM Presentation

Este sistema permite controlar el acceso a la presentación mediante tokens únicos por cliente.

## 🎯 Características

- ✅ **Control granular**: Habilitar/deshabilitar acceso por cliente individual
- ✅ **Tokens únicos**: Cada cliente recibe un link personalizado
- ✅ **Expiración opcional**: Puedes configurar tokens con fecha de vencimiento
- ✅ **Gestión simple**: Scripts CLI para administrar tokens fácilmente
- ✅ **Sin base de datos**: Todo se guarda en un archivo JSON simple

## 📋 Requisitos

- Node.js instalado en tu servidor VPS
- Acceso SSH al servidor

## 🚀 Comandos Disponibles

### 1. Generar un nuevo token

```bash
npm run token:generate "Nombre del Cliente"
```

**Ejemplo:**
```bash
npm run token:generate "Acme Corporation"
```

**Con fecha de expiración (30 días):**
```bash
npm run token:generate "Acme Corporation" 30
```

**Salida:**
```
✅ Token generado exitosamente!

📋 Información del token:
   Cliente: Acme Corporation
   Token: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   Estado: Activo
   Creado: 23/1/2025, 10:30:00
   Expira: Nunca

🔗 URL para el cliente:
   https://tu-dominio.com/?t=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

💡 Tip: Copia esta URL y envíala al cliente
```

---

### 2. Listar todos los tokens

```bash
npm run token:list
```

**Salida:**
```
📊 Tokens registrados (3 total):

════════════════════════════════════════════════════════════════

1. Acme Corporation
   Token: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   Estado: ✅ Activo
   Expira: ♾️  Sin expiración
   Creado: 23/1/2025, 10:30:00
   ──────────────────────────────────────────────────

2. Beta Industries
   Token: z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4
   Estado: ❌ Inactivo
   Expira: 📅 22/2/2025
   Creado: 15/1/2025, 14:20:00
   ──────────────────────────────────────────────────

════════════════════════════════════════════════════════════════
```

---

### 3. Deshabilitar un token

```bash
npm run token:disable <token>
```

**Ejemplo:**
```bash
npm run token:disable a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**Salida:**
```
✅ Token deshabilitado exitosamente!

📋 Información del token:
   Cliente: Acme Corporation
   Token: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   Estado: ❌ Inactivo

⚠️  El cliente ya no podrá acceder a la presentación con este token
```

---

### 4. Habilitar un token

```bash
npm run token:enable <token>
```

**Ejemplo:**
```bash
npm run token:enable a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**Salida:**
```
✅ Token habilitado exitosamente!

📋 Información del token:
   Cliente: Acme Corporation
   Token: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   Estado: ✅ Activo

✅ El cliente ahora puede acceder a la presentación con este token
```

---

### 5. Eliminar un token permanentemente

```bash
npm run token:delete <token>
```

**Ejemplo:**
```bash
npm run token:delete a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**Salida:**
```
✅ Token eliminado exitosamente!

📋 Token eliminado:
   Cliente: Acme Corporation
   Token: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

⚠️  Esta acción no se puede deshacer
```

---

## 🔄 Flujo de Trabajo Típico

### Escenario 1: Nuevo Cliente

1. **Generar token:**
   ```bash
   npm run token:generate "Tesla Inc" 90
   ```

2. **Copiar la URL generada y enviarla al cliente:**
   ```
   https://gbm-presentation.com/?t=abc123xyz
   ```

3. **El cliente accede a la presentación** usando ese link

---

### Escenario 2: Deshabilitar Acceso de un Cliente

1. **Ver lista de tokens:**
   ```bash
   npm run token:list
   ```

2. **Deshabilitar el token del cliente:**
   ```bash
   npm run token:disable abc123xyz
   ```

3. **El cliente ya no puede acceder** - verá página de "Acceso Denegado"

---

### Escenario 3: Rehabilitar Acceso

1. **Habilitar el token nuevamente:**
   ```bash
   npm run token:enable abc123xyz
   ```

2. **El cliente puede volver a acceder** con el mismo link

---

## 📁 Estructura de Archivos

```
gbm-presentation-nextjs/
├── data/
│   ├── tokens.json          # Archivo donde se guardan todos los tokens
│   └── .gitignore          # Evita que tokens.json se suba a git
├── scripts/
│   ├── generate-token.js   # Script para generar tokens
│   ├── list-tokens.js      # Script para listar tokens
│   ├── disable-token.js    # Script para deshabilitar tokens
│   ├── enable-token.js     # Script para habilitar tokens
│   └── delete-token.js     # Script para eliminar tokens
├── src/
│   ├── middleware.ts       # Middleware que valida tokens
│   └── app/
│       └── access-denied/  # Página de acceso denegado
│           └── page.tsx
└── TOKEN_MANAGEMENT.md     # Esta documentación
```

---

## 🔒 Seguridad

### Archivo tokens.json

El archivo `data/tokens.json` contiene información sensible. **IMPORTANTE:**

- ✅ **NO incluir en git** (ya está en `.gitignore`)
- ✅ **Backup regular** del archivo
- ✅ **Permisos restrictivos** en el servidor (chmod 600)
- ✅ **Acceso SSH limitado** solo a administradores

### Backup recomendado

```bash
# En tu servidor VPS
cp data/tokens.json data/tokens.backup.$(date +%Y%m%d).json
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module tokens.json"

**Solución:**
```bash
# Verifica que el archivo existe
ls -la data/tokens.json

# Si no existe, créalo con estructura básica:
echo '{"tokens":{}}' > data/tokens.json
```

### El middleware no valida tokens

**Solución:**
```bash
# Verifica que el archivo middleware.ts existe
ls -la src/middleware.ts

# Reinicia la aplicación
npm run build
npm run start
```

### Token no funciona después de generarlo

**Solución:**
1. Verifica que el token existe:
   ```bash
   npm run token:list
   ```

2. Verifica que está activo (✅ Activo)

3. Si usas Docker, asegúrate de que el archivo `tokens.json` está montado correctamente

---

## 📦 Deployment en VPS con Docker

### docker-compose.yml

Asegúrate de montar el directorio `data/` como volumen:

```yaml
services:
  gbm-presentation:
    build: .
    volumes:
      - ./data:/app/data  # Montar directorio de tokens
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Después de actualizar tokens

Si modificas tokens mientras Docker está corriendo:

```bash
# No es necesario reiniciar, los cambios se leen en cada request
# Pero si experimentas problemas:
docker-compose restart
```

---

## 💡 Tips y Mejores Prácticas

1. **Nombrado de clientes**: Usa nombres descriptivos
   ```bash
   npm run token:generate "Acme Corp - Proyecto Q1 2025"
   ```

2. **Expiración por defecto**: Considera usar 90 días como estándar
   ```bash
   npm run token:generate "Cliente XYZ" 90
   ```

3. **Auditoría regular**: Lista tokens mensualmente
   ```bash
   npm run token:list > tokens-audit-$(date +%Y%m%d).txt
   ```

4. **Comunicación clara**: Envía email al cliente con el link y fecha de expiración

---

## 📞 Soporte

Si tienes problemas o preguntas:
- Revisa esta documentación
- Verifica los logs de la aplicación
- Contacta al equipo de desarrollo

---

**Última actualización:** Enero 2025
