export default (ctx) => {
  const { app } = ctx
  
  app.router.afterEach((to, from) => {
    console.log(to.path)
  })
}
