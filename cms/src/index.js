'use strict';

const fs = require('fs');

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

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi } */) {},

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
  },
};
