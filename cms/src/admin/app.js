export default {
  config: {},
  register(app) {
    app.customFields.register({
      name: 'copyable-url',
      type: 'string',
      intlLabel: {
        id: 'copyable-url.label',
        defaultMessage: 'URL de acceso',
      },
      intlDescription: {
        id: 'copyable-url.description',
        defaultMessage: 'URL completa lista para copiar (solo lectura)',
      },
      components: {
        Input: async () => import('./components/CopyableUrlInput'),
      },
    });
  },
  bootstrap() {},
};
