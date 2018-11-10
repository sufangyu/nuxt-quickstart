const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const jwt = require('jsonwebtoken')

// Token 加密混淆
const secret = 'token@#$str'

const app = new Koa()
const router = new Router();
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')


async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app
    .use(bodyParser())
    .use(router.routes())

  router.post('/api/login', async(ctx, next) => {
    // ctx.router available
    console.log('--------------------------------------')
    console.log('/api/login =>>', ctx.request.body)
    const { name, password } = ctx.request.body;
    if (name === 'demo' && password === 'demo') {
      const account = {
        id: 1101,
        loginname: 'zsf',
        nickname: '张三疯',
        avator: '',
        phone: ''
      }
      const token = jwt.sign({ id: account.id, loginname: account.loginname }, secret)
  
      ctx.body = {
        success: true,
        account,
        token
      }
    } else {
      ctx.body = {
        success: false,
        message: '帐号或密码错误'
      }
    }
    
  });

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })
  

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
