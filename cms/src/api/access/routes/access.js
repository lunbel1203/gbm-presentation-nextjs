'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/access/validate',
      handler: 'access.validate',
      config: {
        // Ruta pública (servidor-a-servidor); protegida por el header x-access-secret
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
