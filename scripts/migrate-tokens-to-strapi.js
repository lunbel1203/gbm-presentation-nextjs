#!/usr/bin/env node
/**
 * Migra los tokens del antiguo `data/tokens.json` al CMS Strapi.
 *
 * Uso:
 *   STRAPI_URL=https://admin.glaringmaintenance.com \
 *   STRAPI_API_TOKEN=xxxxx \
 *   LANG_DEFAULT=rd \
 *   node scripts/migrate-tokens-to-strapi.js [ruta/al/tokens.json]
 *
 * - STRAPI_API_TOKEN: un API Token de Strapi con permisos de creación
 *   (Settings -> API Tokens -> Create new API Token -> Full access).
 * - LANG_DEFAULT: 'rd' o 'usa' (idioma a asignar a los tokens migrados).
 *
 * El script es idempotente: si un token ya existe en Strapi, lo omite.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const STRAPI_URL = (process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';
const LANG_DEFAULT = (process.env.LANG_DEFAULT || 'rd').toLowerCase();
const TOKENS_FILE = process.argv[2] || path.join(process.cwd(), 'data', 'tokens.json');

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

async function strapiFetch(endpoint, options = {}) {
  const res = await fetch(`${STRAPI_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  return { ok: res.ok, status: res.status, json };
}

async function tokenExists(token) {
  const q = `?filters[token][$eq]=${encodeURIComponent(token)}&fields[0]=token`;
  const { ok, json } = await strapiFetch(`/api/access-tokens${q}`);
  return ok && Array.isArray(json.data) && json.data.length > 0;
}

async function main() {
  if (!STRAPI_API_TOKEN) fail('Falta STRAPI_API_TOKEN (API Token de Strapi con permisos de creación).');
  if (!['rd', 'usa'].includes(LANG_DEFAULT)) fail("LANG_DEFAULT debe ser 'rd' o 'usa'.");
  if (!fs.existsSync(TOKENS_FILE)) fail(`No se encontró el archivo de tokens: ${TOKENS_FILE}`);

  const raw = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf-8'));
  const tokens = raw.tokens || {};
  const entries = Object.entries(tokens);

  console.log(`\n📦 Migrando ${entries.length} token(s) desde ${TOKENS_FILE}`);
  console.log(`   Strapi: ${STRAPI_URL}`);
  console.log(`   Idioma asignado: ${LANG_DEFAULT}\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const [token, info] of entries) {
    const clientName = info.clientName || info.client || 'Cliente sin nombre';
    try {
      if (await tokenExists(token)) {
        console.log(`⏭️  Ya existe, omitido: ${clientName} (${token.slice(0, 8)}…)`);
        skipped++;
        continue;
      }

      const data = {
        clientName,
        token,
        language: LANG_DEFAULT,
        active: info.active !== false,
        startDate: info.createdAt || null,
        endDate: info.expiresAt || null,
        notes: info.notes || null,
      };

      const { ok, status, json } = await strapiFetch('/api/access-tokens', {
        method: 'POST',
        body: JSON.stringify({ data }),
      });

      if (ok) {
        console.log(`✅ Creado: ${clientName} (${token.slice(0, 8)}…)`);
        created++;
      } else {
        console.error(`❌ Error (${status}) creando ${clientName}: ${JSON.stringify(json.error || json)}`);
        errors++;
      }
    } catch (err) {
      console.error(`❌ Excepción con ${clientName}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n— Resumen —`);
  console.log(`   Creados: ${created}`);
  console.log(`   Omitidos (ya existían): ${skipped}`);
  console.log(`   Errores: ${errors}\n`);
  if (errors > 0) process.exit(1);
}

main().catch((err) => fail(err.stack || err.message));
