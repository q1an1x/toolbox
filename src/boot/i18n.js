import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'en-US',
    globalInjection: true,
    messages
  })

  app.config.globalProperties.$utils = {
    getPreference(key, fallback) {
      const preferences = app.config.globalProperties.$q.localStorage.getItem('preferences')
      if (! preferences) {
        app.config.globalProperties.$q.localStorage.set('preferences', {
          // save default preferences
          hideHint: false
        });
        return this.getPreference(key, fallback);
      }
      return preferences[key] ?? fallback;
    },

    setPreference(key, value) {
      const preferences = app.config.globalProperties.$q.localStorage.getItem('preferences')
      preferences[key] = value;
      app.config.globalProperties.$q.localStorage.set('preferences', preferences);
    }
  };

  // Set i18n instance on app
  app.use(i18n)
})
