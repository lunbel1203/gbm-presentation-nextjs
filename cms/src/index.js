'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Sembrado idempotente de tokens al arrancar.
 * Si la variable SEED_TOKENS_FILE apunta a un JSON (array de tokens), crea los
 * que aún no existan. Útil para migrar los tokens del antiguo tokens.json sin
 * necesidad de acceder al panel. No hace nada si la variable no está definida.
 */
async function seedTokens(strapi) {
  const file = process.env.SEED_TOKENS_FILE;
  if (!file) return;
  if (!fs.existsSync(file)) {
    strapi.log.warn(`[seed] SEED_TOKENS_FILE no encontrado: ${file}`);
    return;
  }

  let items;
  try {
    items = JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (err) {
    strapi.log.error(`[seed] JSON inválido en ${file}: ${err.message}`);
    return;
  }
  if (!Array.isArray(items)) return;

  let created = 0;
  let skipped = 0;
  for (const it of items) {
    if (!it || !it.token) continue;
    const existing = await strapi.documents('api::access-token.access-token').findMany({
      filters: { token: { $eq: it.token } },
      limit: 1,
    });
    if (existing && existing.length) {
      skipped++;
      continue;
    }
    await strapi.documents('api::access-token.access-token').create({
      data: {
        clientName: it.clientName || it.client || 'Cliente',
        token: it.token,
        language: it.language || 'rd',
        active: it.active !== false,
        startDate: it.startDate || null,
        endDate: it.endDate || null,
        notes: it.notes || null,
      },
    });
    created++;
  }
  strapi.log.info(`[seed] tokens creados: ${created}, omitidos (ya existían): ${skipped}`);
}

/**
 * Sembrado idempotente de contenido genérico del website.
 * Si SEED_CONTENT_DIR apunta a un directorio con un `index.json` (manifiesto),
 * crea los registros que aún no existan según `uniqueFields`.
 *
 * Manifiesto (index.json):
 *   [{ "uid": "api::service.service", "file": "services.json", "uniqueFields": ["slug", "locale"] }]
 * Cada `file` es un array de objetos con los campos del content-type.
 */
function mimeFromExt(ext) {
  const map = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };
  return map[String(ext).toLowerCase()] || 'application/octet-stream';
}

/**
 * Sube un archivo a la Media Library (o reutiliza uno ya subido con el mismo
 * nombre) y devuelve su id. Idempotente.
 */
async function uploadOrReuse(strapi, absPath) {
  const name = path.basename(absPath);
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name } });
  if (existing) return existing.id;
  if (!fs.existsSync(absPath)) {
    strapi.log.warn(`[seed-content] imagen no encontrada: ${absPath}`);
    return null;
  }
  const stats = fs.statSync(absPath);
  const uploaded = await strapi.plugin('upload').service('upload').upload({
    data: {},
    files: {
      filepath: absPath,
      originalFilename: name,
      mimetype: mimeFromExt(path.extname(name)),
      size: stats.size,
    },
  });
  return Array.isArray(uploaded) && uploaded[0] ? uploaded[0].id : null;
}

async function seedContent(strapi) {
  const dir = process.env.SEED_CONTENT_DIR;
  if (!dir) return;
  const imagesDir = process.env.SEED_IMAGES_DIR;
  const manifestPath = path.join(dir, 'index.json');
  if (!fs.existsSync(manifestPath)) {
    strapi.log.warn(`[seed-content] manifiesto no encontrado: ${manifestPath}`);
    return;
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } catch (err) {
    strapi.log.error(`[seed-content] manifiesto inválido: ${err.message}`);
    return;
  }
  if (!Array.isArray(manifest)) return;

  for (const entry of manifest) {
    const { uid, file, uniqueFields = ['slug'], mediaFields = [] } = entry || {};
    if (!uid || !file) continue;
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
      strapi.log.warn(`[seed-content] archivo no encontrado: ${filePath}`);
      continue;
    }

    let items;
    try {
      items = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      strapi.log.error(`[seed-content] JSON inválido en ${file}: ${err.message}`);
      continue;
    }
    if (!Array.isArray(items)) continue;

    let created = 0;
    let skipped = 0;
    for (const item of items) {
      if (!item) continue;
      const filters = {};
      for (const f of uniqueFields) {
        if (item[f] !== undefined) filters[f] = { $eq: item[f] };
      }
      const existing = await strapi.documents(uid).findMany({ filters, limit: 1 });
      if (existing && existing.length) {
        skipped++;
        continue;
      }
      try {
        const data = { ...item };
        // Subir imágenes y reemplazar la ruta por el id del archivo en Media
        for (const mf of mediaFields) {
          if (data[mf] && imagesDir) {
            const id = await uploadOrReuse(strapi, path.join(imagesDir, data[mf]));
            data[mf] = id || null;
          }
        }
        await strapi.documents(uid).create({ data });
        created++;
      } catch (err) {
        strapi.log.error(`[seed-content] error creando en ${uid}: ${err.message}`);
      }
    }
    strapi.log.info(`[seed-content] ${uid}: creados ${created}, omitidos ${skipped}`);
  }
}

module.exports = {
  /**
   * Registro de custom fields antes de inicializar la app.
   */
  register({ strapi }) {
    strapi.customFields.register({
      name: 'copyable-url',
      type: 'string',
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }) {
    try {
      await seedTokens(strapi);
    } catch (err) {
      strapi.log.error(`[seed] error sembrando tokens: ${err.message}`);
    }
    try {
      await seedContent(strapi);
    } catch (err) {
      strapi.log.error(`[seed-content] error sembrando contenido: ${err.message}`);
    }
  },
};
