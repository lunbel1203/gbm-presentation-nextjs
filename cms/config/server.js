module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // URL pública del panel (necesaria detrás del proxy Traefik)
  url: env('PUBLIC_URL', undefined),
  // Confiar en el proxy (Traefik) para obtener el protocolo/host real
  proxy: env.bool('IS_PROXIED', true),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
