export default {
  config: {},
  register(app) {
    app.customFields.register({
      name: 'copyable-url',
      type: 'string',
      intlLabel: {
        id: 'copyable-url.label',
        defaultMessage: 'Access URL',
      },
      intlDescription: {
        id: 'copyable-url.description',
        defaultMessage: 'Full URL ready to copy (read-only)',
      },
      components: {
        Input: async () => import('./components/CopyableUrlInput'),
      },
    });
  },
  bootstrap() {},
};
