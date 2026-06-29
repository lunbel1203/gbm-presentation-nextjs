'use strict';

/**
 * Utilidades de enriquecimiento de logs de acceso.
 * Sin dependencias externas: parseo de User-Agent por regex + geolocalización
 * best-effort vía un servicio HTTP gratuito (opcional, controlado por env).
 */

/**
 * Parsea un User-Agent y devuelve { browser, os, device } de forma legible.
 * Es una heurística sencilla, suficiente para analítica de presentaciones.
 */
function parseUserAgent(ua = '') {
  const s = String(ua || '');

  // Sistema operativo
  let os = 'Desconocido';
  if (/Windows NT 10/.test(s)) os = 'Windows 10/11';
  else if (/Windows NT 6\.3/.test(s)) os = 'Windows 8.1';
  else if (/Windows NT 6\.1/.test(s)) os = 'Windows 7';
  else if (/Windows/.test(s)) os = 'Windows';
  else if (/iPhone|iPad|iPod/.test(s)) os = 'iOS';
  else if (/Mac OS X/.test(s)) os = 'macOS';
  else if (/Android/.test(s)) os = 'Android';
  else if (/Linux/.test(s)) os = 'Linux';
  else if (/CrOS/.test(s)) os = 'ChromeOS';

  // Navegador (el orden importa: Edge/Opera antes que Chrome, Chrome antes que Safari)
  let browser = 'Desconocido';
  if (/Edg\//.test(s)) browser = 'Edge';
  else if (/OPR\/|Opera/.test(s)) browser = 'Opera';
  else if (/SamsungBrowser/.test(s)) browser = 'Samsung Internet';
  else if (/Firefox\//.test(s)) browser = 'Firefox';
  else if (/Chrome\//.test(s)) browser = 'Chrome';
  else if (/Safari\//.test(s) && /Version\//.test(s)) browser = 'Safari';

  // Tipo de dispositivo
  let device = 'Escritorio';
  if (/iPad|Tablet/.test(s)) device = 'Tablet';
  else if (/Mobi|iPhone|Android.*Mobile/.test(s)) device = 'Móvil';

  return { browser, os, device };
}

/**
 * Geolocalización best-effort por IP. Devuelve { country, city } o {}.
 * Sólo se ejecuta si GEO_LOOKUP=true y la IP es pública.
 * Usa ip-api.com (gratuito, sin API key). Falla en silencio.
 */
async function geoLookup(ip) {
  try {
    if (String(process.env.GEO_LOOKUP).toLowerCase() !== 'true') return {};
    if (!ip || isPrivateIp(ip)) return {};

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,city`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);
    if (!res.ok) return {};
    const data = await res.json();
    if (data.status !== 'success') return {};
    return { country: data.country || null, city: data.city || null };
  } catch (err) {
    return {};
  }
}

function isPrivateIp(ip) {
  if (!ip) return true;
  if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('::ffff:127.')) return true;
  if (/^10\./.test(ip)) return true;
  if (/^192\.168\./.test(ip)) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip)) return true;
  if (/^169\.254\./.test(ip)) return true;
  if (/^fe80:/i.test(ip) || /^fc00:/i.test(ip) || /^fd/i.test(ip)) return true;
  return false;
}

module.exports = { parseUserAgent, geoLookup, isPrivateIp };
