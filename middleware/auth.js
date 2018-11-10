// https://blog.csdn.net/umufeng/article/details/80524766
// https://juejin.im/post/5aefc886f265da0b7e0c2e48
// https://github.com/justyeh/nuxt.justyeh.top/blob/master/server/index.js

import { getAccountFromCookie, getAccountFromBrowerCookie } from '~/utils/auth'

export default function(ctx) {
  const { store, req } = ctx
  const isServer = process.server
  // If nuxt generate, pass this middleware
  if (isServer && !req) {
    return
  }

  const account = isServer ? getAccountFromCookie(req) : getAccountFromBrowerCookie(ctx)
  store.commit('SET_ACCOUNT', account)
}
