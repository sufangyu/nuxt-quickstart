import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zhLocale from '~/locales/zh.json';
import enLocale from '~/locales/en.json';

Vue.use(VueI18n)

const messages = {
  'zh': {
    ...zhLocale
  },
  'en': {
    ...enLocale
  }
}

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'zh', // 没有匹配时显示
    messages,
  })

  // add i18n path function
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
