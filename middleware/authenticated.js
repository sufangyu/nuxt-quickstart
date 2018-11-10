/**
 * 登录校验中间件
 * @param {*} ctx 
 */
export default function(ctx) {
  const { from, store, redirect, params } = ctx
  
  // 未认证, 重定向到登录页面
  if (!store.getters.isAuthenticated) {
    const fromUrl = from ? from.fullPath : ctx.req.url
    const loginUrl = params.lang ? `/${params.lang}/account/login` : `/account/login`;
    return redirect(loginUrl);
  }
}
