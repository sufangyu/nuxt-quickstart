export const state = () => {
  return {
    locales: ['en', 'zh'],
    locale: 'zh',
    account: null
  }
};


export const getters = {
  isAuthenticated(state) {
    return !!state.account
  },
  account(state) {
    return state.account
  }
};


export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_ACCOUNT(state, account) {
    state.account = account
  }
};


export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
  },
  async logout({ commit }) {
    // await axios.post('/api/logout')
    commit('SET_ACCOUNT', null)
  }
}
