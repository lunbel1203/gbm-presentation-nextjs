'use strict';

const crypto = require('crypto');

/**
 * Genera un token aleatorio seguro (64 caracteres hex = 32 bytes).
 * Mantiene el mismo formato que el sistema anterior basado en tokens.json.
 */
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (!data.token || String(data.token).trim() === '') {
      data.token = generateToken();
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    // Permitir "regenerar" enviando el token vacío explícitamente
    if (data && Object.prototype.hasOwnProperty.call(data, 'token')) {
      if (!data.token || String(data.token).trim() === '') {
        data.token = generateToken();
      }
    }
  },
};
