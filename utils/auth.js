import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

/**
 * 从请求 cookie 获取用户信息
 * @param {*} req 
 */
export const getAccountFromCookie = (req) => {
  if (!req.headers.cookie) {
    return
  }
  
  const jwtCookie = req.headers.cookie.split(';').find((c) => {
    return c.trim().startsWith('token=')
  })
  
  if (!jwtCookie) {
    return
  }
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt)
}


/**
 * 从浏览器存储中获取用户
 */
export const getAccountFromBrowerCookie = (ctx) => {
  const jwtCookie = document.cookie.split(';').find((c) => {
    return c.trim().startsWith('token=')
  })

  if (!jwtCookie) {
    ctx.store.dispatch('logout')
    return
  }
  
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt)
}


/**
 * 设置 Token
 * @param {*} token 
 */
export const setToken = (token) => {
  if (process.SERVER_BUILD) {
    return
  }
  Cookie.set('token', token)
}


/**
 * 删除 Token
 */
export const unsetToken = () => {
  if (process.SERVER_BUILD) {
    return
  }
  Cookie.remove('token')
}
