const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const cors = require('koa2-cors')
const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const session = require('koa-session');

const config = require('./config')
const routes = require('./routes')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
const { resolve } = require('path')
const { rejects } = require('assert')
const { Script } = require('vm')

const port = process.env.PORT || config.port



const CONFIG = {
  key: 'koa.sess'
};
// error handler
onerror(app)



// middlewares
app.use(bodyparser())
  .use(json())
  .use(cors({
    credentials: true,
  }))
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: { settings: { views: path.join(__dirname, 'views') } },
    map: { 'njk': 'nunjucks' },
    extension: 'njk'
  }))
  .use(session(CONFIG,app))
  .use(router.routes())
  .use(router.allowedMethods())

  app.keys= ['banyuan'];

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})



router.post('/check', (ctx, next) => {
  const { name, password, judge } = ctx.request.body;

    let patternName = /^([0-9a-zA-Z]|-|_){4,16}$/;
    let patternPwd = /^([0-9a-zA-Z]|_){8,15}$/;

    let nameFlag = patternName.test(name);
    let pwdFlag = patternPwd.test(password);

    let checkFlag = false;

    if (password === judge) {
        checkFlag = true;
    }

    if (nameFlag && pwdFlag && checkFlag) {
        ctx.response.body = {
            status: 'success'
        }
    }
})


  


routes(router)
app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})

