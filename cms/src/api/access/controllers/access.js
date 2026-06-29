'use strict';

const { parseUserAgent, geoLookup } = require('../../../utils/enrich');

const TOKEN_UID = 'api::access-token.access-token';
const LOG_UID = 'api::access-log.access-log';

/**
 * Determina la razón de denegación de un token, o null si es válido.
 * @returns {string|null} 'invalid' | 'disabled' | 'not-started' | 'expired'
 *                        | 'wrong-language' | 'limit-reached' | null (válido)
 */
function evaluateToken(entry, requestedLanguage) {
  if (!entry) return 'invalid';
  if (!entry.active) return 'disabled';

  const now = new Date();
  if (entry.startDate && now < new Date(entry.startDate)) return 'not-started';
  if (entry.endDate && now > new Date(entry.endDate)) return 'expired';

  // Idioma: el token sólo abre la presentación de su idioma (rd / usa)
  if (requestedLanguage && entry.language && entry.language !== requestedLanguage) {
    return 'wrong-language';
  }

  if (entry.maxAccesses && entry.maxAccesses > 0 && (entry.accessCount || 0) >= entry.maxAccesses) {
    return 'limit-reached';
  }

  return null;
}

/**
 * Dispara una notificación (webhook) en el primer acceso de un cliente.
 * Preparado para n8n / email — se activa configurando NOTIFY_WEBHOOK_URL.
 * Fire-and-forget: nunca bloquea ni rompe la validación.
 */
function notifyFirstAccess(payload) {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return; // Notificaciones desactivadas (fase posterior con n8n)
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 3000);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).catch(() => {});
  } catch (err) {
    /* ignore */
  }
}

module.exports = {
  /**
   * POST /api/access/validate
   * Body: { token, ip, userAgent, language, log }
   * Header: x-access-secret (debe coincidir con VALIDATION_SECRET)
   * Respuesta: { valid, reason, clientName, language }
   */
  async validate(ctx) {
    // 1) Verificación del secreto compartido (servidor a servidor)
    const expectedSecret = process.env.VALIDATION_SECRET;
    if (expectedSecret) {
      const provided = ctx.request.headers['x-access-secret'];
      if (provided !== expectedSecret) {
        return ctx.unauthorized('Secreto de validación inválido');
      }
    }

    const body = ctx.request.body || {};
    const token = (body.token || '').trim();
    const requestedLanguage = body.language || null;
    const ip = body.ip || ctx.request.ip || null;
    const userAgent = body.userAgent || ctx.request.headers['user-agent'] || '';
    const shouldLog = body.log !== false; // por defecto registra

    if (!token) {
      ctx.body = { valid: false, reason: 'missing' };
      return;
    }

    // 2) Buscar el token
    let entry = null;
    try {
      const results = await strapi.documents(TOKEN_UID).findMany({
        filters: { token: { $eq: token } },
        limit: 1,
      });
      entry = results && results[0] ? results[0] : null;
    } catch (err) {
      strapi.log.error(`[access.validate] error buscando token: ${err.message}`);
      ctx.body = { valid: false, reason: 'error' };
      return;
    }

    // 3) Evaluar validez
    const reason = evaluateToken(entry, requestedLanguage);
    const valid = reason === null;
    const status = valid ? 'granted' : 'denied';

    // 4) Registrar el acceso (sólo en navegaciones reales de documento)
    if (shouldLog) {
      try {
        const { browser, os, device } = parseUserAgent(userAgent);
        const geo = await geoLookup(ip);

        const logData = {
          accessedAt: new Date(),
          clientName: entry ? entry.clientName : null,
          language: entry ? entry.language : requestedLanguage,
          ipAddress: ip,
          userAgent,
          browser,
          os,
          device,
          country: geo.country || null,
          city: geo.city || null,
          status,
          reason: reason || null,
        };
        if (entry) {
          logData.accessToken = { connect: [{ documentId: entry.documentId }] };
        }

        await strapi.documents(LOG_UID).create({ data: logData });

        // 5) Si fue concedido, actualizar contadores del token
        if (valid && entry) {
          const isFirstAccess = !entry.firstAccessAt;
          await strapi.documents(TOKEN_UID).update({
            documentId: entry.documentId,
            data: {
              accessCount: (entry.accessCount || 0) + 1,
              lastAccessAt: new Date(),
              ...(isFirstAccess ? { firstAccessAt: new Date() } : {}),
            },
          });

          // 6) Notificación de primer acceso (webhook, n8n en fase posterior)
          if (isFirstAccess) {
            notifyFirstAccess({
              event: 'first_access',
              clientName: entry.clientName,
              language: entry.language,
              ip,
              browser,
              os,
              device,
              country: geo.country || null,
              city: geo.city || null,
              at: new Date().toISOString(),
            });
          }
        }
      } catch (err) {
        // El logging nunca debe romper la validación
        strapi.log.error(`[access.validate] error registrando acceso: ${err.message}`);
      }
    }

    ctx.body = {
      valid,
      reason: reason || null,
      clientName: entry ? entry.clientName : null,
      language: entry ? entry.language : null,
    };
  },
};
