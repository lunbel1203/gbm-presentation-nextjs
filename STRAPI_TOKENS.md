# Sistema de Tokens de Acceso con Strapi

Sistema de control de acceso por cliente y analítica de accesos para las
presentaciones GBM (RD en español y USA en inglés), gestionado desde un único
panel **Strapi** en `https://admin.glaringmaintenance.com`.

---

## 1. Arquitectura

```
Cliente ──(URL con ?t=TOKEN)──► Next.js (middleware)
                                     │  extrae token + IP + User-Agent
                                     ▼
                            /api/validate-token  (runtime Node)
                                     │  + PRESENTATION_LANG (rd | usa)
                                     │  + header x-access-secret
                                     ▼
                       Strapi  POST /api/access/validate
                                     │  valida y registra el acceso
                          ┌──────────┴───────────┐
                          ▼                      ▼
                   access-token            access-log
              (1 por cliente)        (1 por apertura/intento)
                          │
            (futuro) webhook ──► n8n / email  (primer acceso)

Admin (ventas) ──► https://admin.glaringmaintenance.com ──► gestiona tokens y ve logs
```

- **Una sola instancia de Strapi** administra ambas presentaciones (RD y USA).
- Las presentaciones llaman a Strapi **internamente** por la red Docker
  `traefik-public` (`http://gbm-strapi:1337`); la API de validación **no se
  expone a internet** (protegida además por un secreto compartido).

---

## 2. Modelo de datos

### `access-token` (Token de Acceso) — uno por cliente
| Campo | Tipo | Descripción |
|---|---|---|
| `clientName` | string (req.) | Nombre del cliente |
| `token` | string único | Se **autogenera** (64 hex) si se deja vacío |
| `language` | enum `rd` / `usa` (req.) | **Para qué presentación es** |
| `startDate` | datetime | Inicio de validez |
| `endDate` | datetime | Fin de validez |
| `active` | boolean | Habilitar / deshabilitar manualmente |
| `maxAccesses` | integer | Límite de aperturas (`0` = ilimitado) |
| `accessCount` | integer | Aperturas concedidas (automático) |
| `firstAccessAt` / `lastAccessAt` | datetime | Primer / último acceso (automático) |
| `notes` | text | Notas internas |
| `accessLogs` | relación | Historial de accesos |

### `access-log` (Registro de Acceso) — uno por apertura o intento
`accessedAt`, `clientName`, `language`, `ipAddress`, `userAgent`, `browser`,
`os`, `device`, `country`, `city`, `status` (`granted`/`denied`), `reason`.

> Los intentos **denegados** también se registran (token vencido, deshabilitado,
> idioma incorrecto, etc.), útil para detectar enlaces compartidos o caducados.

---

## 3. Despliegue de Strapi en el VPS

> VPS: `89.117.73.203` · SSH puerto `2222` · Docker + Traefik v2.10 ya instalados.

### 3.1 DNS
Crear un registro **A**: `admin.glaringmaintenance.com → 89.117.73.203`.
(Si usa Cloudflare, modo SSL **Full (strict)** para evitar bucles de redirección.)

### 3.2 Subir el CMS
Copiar la carpeta `cms/` de este repo al VPS en `/opt/docker/services/strapi`.

### 3.3 Configurar variables
```bash
cd /opt/docker/services/strapi
cp .env.example .env
```
Generar cada secreto y rellenar `.env`:
```bash
# APP_KEYS necesita 4 valores separados por comas
node -e "console.log(Array.from({length:4},()=>require('crypto').randomBytes(16).toString('base64')).join(','))"
# El resto (uno por variable):
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Variables clave en `.env`:
- `CMS_DOMAIN=admin.glaringmaintenance.com`
- `DATABASE_PASSWORD=...` (fuerte)
- `VALIDATION_SECRET=...` (**el mismo** que pondrás en las presentaciones)
- `GEO_LOOKUP=true`
- `NOTIFY_WEBHOOK_URL=` (vacío por ahora; se llena al integrar n8n)

### 3.4 Levantar
```bash
docker compose up -d --build
```
Abrir `https://admin.glaringmaintenance.com/admin` y crear el usuario administrador.

### 3.5 Crear el API Token (para la migración)
En Strapi: **Settings → API Tokens → Create new API Token** → tipo *Full access*.
Guardar el token; se usa una sola vez para migrar.

---

## 4. Conectar las presentaciones (RD y USA)

En cada despliegue (`/opt/docker/websites/gbm-presentation-rd` y `…-usa`):

**`docker-compose.prod.yml`** ya incluye:
```yaml
environment:
  - STRAPI_URL=http://gbm-strapi:1337
  - PRESENTATION_LANG=rd    # ← 'usa' en el despliegue de USA
```

**`.env.production`** (secreto, no se commitea) — añadir:
```env
VALIDATION_SECRET=el-mismo-secreto-que-en-strapi
```

Reconstruir:
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

> Ambas presentaciones deben estar en la red `traefik-public` (ya lo están) para
> resolver `gbm-strapi`.

---

## 5. Migrar los tokens existentes (`tokens.json` → Strapi)

Desde el repo de cada presentación (o local), una sola vez por idioma:
```bash
STRAPI_URL=https://admin.glaringmaintenance.com \
STRAPI_API_TOKEN=<API token Full access> \
LANG_DEFAULT=rd \
npm run token:migrate -- /ruta/al/data/tokens.json
```
Es idempotente (omite los que ya existan). Repetir con `LANG_DEFAULT=usa` para el
`tokens.json` de la presentación en inglés.

---

## 6. Uso diario (ventas)

**Crear un acceso para un cliente:**
1. Strapi → **Content Manager → Token de Acceso → Create new entry**.
2. Rellenar `clientName`, elegir `language` (**RD o USA**), `startDate`, `endDate`.
   Dejar `token` vacío para que se genere solo. Guardar.
3. Copiar el `token` y armar el enlace según el idioma:
   - RD: `https://presentacionrd.glaringmaintenance.do/?t=<TOKEN>`
   - USA: `https://presentationusa.glaringmaintenance.com/?t=<TOKEN>`

**Ver accesos de un cliente:** abrir el token y revisar `accessCount`,
`firstAccessAt`, `lastAccessAt` y la relación `accessLogs` (fecha, hora, IP,
navegador, SO, país/ciudad).

---

## 7. Razones de denegación (`/access-denied?reason=`)
`missing`, `invalid`, `disabled`, `expired`, `not-started` (antes de `startDate`),
`wrong-language` (token de la otra versión), `limit-reached` (superó `maxAccesses`),
`error`.

---

## 8. Notificaciones (fase posterior con n8n)
El sistema ya dispara un webhook en el **primer acceso** de cada cliente. Para
activarlo, poner la URL del webhook de n8n en `NOTIFY_WEBHOOK_URL` (en el `.env`
de Strapi) y reiniciar. Payload enviado:
```json
{ "event": "first_access", "clientName": "...", "language": "rd",
  "ip": "...", "browser": "...", "os": "...", "device": "...",
  "country": "...", "city": "...", "at": "ISO-8601" }
```
