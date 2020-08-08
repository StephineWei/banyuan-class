const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const app = new Koa()
const router = new Router()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const config = require('./config')
const routes = require('./routes')
const { resolve } = require('path')

const port = process.env.PORT || config.port

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(cors({
    credentials: true,
  }))
  
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'njk': 'nunjucks'},
    extension: 'njk'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})


routes(router)
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})


router.post('/checkName', async (ctx, next) => {
  const { name } = ctx.request.body;
  const n = ['isen', 'abcd', 'cindy'];
  var patten = /^[a-zA-Z0-9_-]{4,16}$/;
  var flag = patten.test(name);
  const data = {};
  if (n.indexOf(name) == -1) {
    data.include = false;
  }
  else {
    data.include = true;
  }

  ctx.response.body = {
    data, flag
  }
})

router.post('/checkname', async (ctx, next) => {
  const { name, password } = ctx.request.body;
  const n = ['abcd', '1234', '2222'];
  var pattenN = /^[a-zA-Z0-9_-]{4,16}$/;
  var flagN = pattenN.test(name);
  var pattenP = /^\w{8,15}$/;
  var flagP = pattenP.test(password);
  const data = {};
  if (n.indexOf(name) == -1) {
    data.include = false;
  }
  else {
    data.include = true;
  }
  if (flagN && flagP && !data.include) {
    ctx.response.body = { name, password }
  }

})




module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})


