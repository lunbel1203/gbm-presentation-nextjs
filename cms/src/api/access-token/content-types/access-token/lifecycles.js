'use strict';

const crypto = require('crypto');

const UID = 'api::access-token.access-token';

// URLs base por idioma (configurables por entorno).
const BASE_URLS = {
  rd: process.env.PRESENTATION_URL_RD || 'https://presentacionrd.glaringmaintenance.do',
  usa: process.env.PRESENTATION_URL_USA || 'https://presentationusa.glaringmaintenance.com',
};

/**
 * Genera un token aleatorio seguro (64 caracteres hex = 32 bytes).
 * Mantiene el mismo formato que el sistema anterior basado en tokens.json.
 */
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

/** Arma la URL completa lista para enviar al cliente. */
function buildUrl(language, token) {
  if (!token) return null;
  const base = BASE_URLS[language] || BASE_URLS.rd;
  return `${base}/?t=${token}`;
}

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (!data.token || String(data.token).trim() === '') {
      data.token = generateToken();
    }
    data.accessUrl = buildUrl(data.language, data.token);
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    // Permitir "regenerar" enviando el token vacío explícitamente
    if (Object.prototype.hasOwnProperty.call(data, 'token')) {
      if (!data.token || String(data.token).trim() === '') {
        data.token = generateToken();
      }
    }

    // Recalcular siempre la URL. En updates parciales puede faltar token o
    // language en `data`; los completamos con el registro actual.
    let token = data.token;
    let language = data.language;
    if ((!token || !language) && where) {
      try {
        const current = await strapi.db.query(UID).findOne({ where });
        if (current) {
          token = token || current.token;
          language = language || current.language;
        }
      } catch (err) {
        strapi.log.error(`[access-token] no se pudo leer el registro actual: ${err.message}`);
      }
    }
    if (token && language) {
      data.accessUrl = buildUrl(language, token);
    }
  },
};
