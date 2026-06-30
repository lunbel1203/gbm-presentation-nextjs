'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Sembrado idempotente de tokens al arrancar (SEED_TOKENS_FILE).
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

/** Sube un archivo a la Media Library (o reutiliza uno por nombre) y devuelve su id. */
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

/**
 * Habilita lectura pública (find/findOne) para las colecciones del website.
 * Idempotente. Permite que el frontend consuma la API sin token.
 */
async function setPublicPermissions(strapi) {
  try {
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });
    if (!publicRole) return;

    const perms = {
      'api::service.service': ['find', 'findOne'],
      'api::job.job': ['find', 'findOne'],
      'api::post.post': ['find', 'findOne'],
      'api::team-member.team-member': ['find', 'findOne'],
      'api::testimonial.testimonial': ['find', 'findOne'],
      'api::certification.certification': ['find', 'findOne'],
      'api::industry.industry': ['find', 'findOne'],
      'api::home.home': ['find'],
      'api::site-setting.site-setting': ['find'],
    };

    let added = 0;
    for (const [uid, actions] of Object.entries(perms)) {
      for (const a of actions) {
        const action = `${uid}.${a}`;
        const existing = await strapi.db
          .query('plugin::users-permissions.permission')
          .findOne({ where: { action, role: publicRole.id } });
        if (!existing) {
          await strapi.db
            .query('plugin::users-permissions.permission')
            .create({ data: { action, role: publicRole.id } });
          added++;
        }
      }
    }
    strapi.log.info(`[permissions] lectura pública habilitada (+${added})`);
  } catch (err) {
    strapi.log.error(`[permissions] error: ${err.message}`);
  }
}

/** Garantiza que el locale `es` exista en i18n. */
async function ensureLocales(strapi) {
  try {
    const svc = strapi.plugin('i18n').service('locales');
    const all = await svc.find();
    if (!all.some((l) => l.code === 'es')) {
      await svc.create({ code: 'es', name: 'Spanish (es)' });
      strapi.log.info('[i18n] locale es creado');
    }
  } catch (err) {
    strapi.log.error(`[i18n] error asegurando locales: ${err.message}`);
  }
}

/**
 * Sembrado idempotente de contenido con i18n nativo.
 * Manifiesto (SEED_CONTENT_DIR/index.json):
 *   [{ "uid", "file", "key": "slug", "mediaFields": [], }]
 * Cada item del archivo trae su propio `locale` (en|es). El `en` crea el
 * documento base; el `es` se añade como traducción del MISMO documento.
 */
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
    const { uid, file, key = 'slug', mediaFields = [], singleType = false } = entry || {};
    if (!uid || !file) continue;
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
      strapi.log.warn(`[seed-content] archivo no encontrado: ${filePath}`);
      continue;
    }
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      strapi.log.error(`[seed-content] JSON inválido en ${file}: ${err.message}`);
      continue;
    }
    // Un single type puede venir como objeto suelto; lo envolvemos en array
    const items = Array.isArray(parsed) ? parsed : [parsed];

    let created = 0;
    let skipped = 0;
    for (const item of items) {
      if (!item) continue;
      const itemLocale = item.locale || 'en';
      const keyVal = item[key];
      const data = { ...item };
      delete data.locale;

      try {
        // Subir imágenes y reemplazar la ruta por el id del archivo
        for (const mf of mediaFields) {
          if (data[mf] && imagesDir) {
            const id = await uploadOrReuse(strapi, path.join(imagesDir, data[mf]));
            data[mf] = id || null;
          }
        }

        const base = singleType
          ? await strapi.documents(uid).findMany({ locale: 'en', limit: 1 })
          : await strapi.documents(uid).findMany({
              filters: { [key]: { $eq: keyVal } },
              locale: 'en',
              limit: 1,
            });

        if (itemLocale === 'en') {
          if (base.length) {
            skipped++;
            continue;
          }
          await strapi.documents(uid).create({ data, locale: 'en' });
          created++;
        } else {
          if (!base.length) {
            strapi.log.warn(`[seed-content] sin base 'en' para ${key}=${keyVal} en ${uid}`);
            continue;
          }
          const documentId = base[0].documentId;
          const existingLoc = await strapi.documents(uid).findOne({ documentId, locale: itemLocale });
          if (existingLoc) {
            skipped++;
            continue;
          }
          await strapi.documents(uid).update({ documentId, locale: itemLocale, data });
          created++;
        }
      } catch (err) {
        strapi.log.error(`[seed-content] error en ${uid} (${keyVal}/${itemLocale}): ${err.message}`);
      }
    }
    strapi.log.info(`[seed-content] ${uid} [${file}]: creados ${created}, omitidos ${skipped}`);
  }
}

module.exports = {
  register({ strapi }) {
    strapi.customFields.register({
      name: 'copyable-url',
      type: 'string',
    });
  },

  async bootstrap({ strapi }) {
    await ensureLocales(strapi);
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
    await setPublicPermissions(strapi);
  },
};
