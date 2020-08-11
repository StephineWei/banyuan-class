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





router.get('/login', async (ctx, next) => {

  // ctx.session.user = {name:'tom'}
  await ctx.render('login')
})

router.post('/login',async (ctx, next) => {
    const{name,password} = ctx.request.body;

    let dataN = JSON.stringify(name)
    let dataP = JSON.stringify(password)
    // ctx.cookies.set('user',data)
    ctx.session.user = dataN;
    ctx.session.password = dataP;
    ctx.response.body = {
      status :'success',
    // name,
    // password
    }

  })


router.get('/loginTest', async(ctx, next) => {
let user = ctx.session.user;
let password = ctx.session.password;
  // let data;

    // if (ctx.cookies.get('user')){
    //   data = JSON.parse(ctx.cookies.get('user'))
    // }

      
    if(user && password){
      await ctx.render('test')
    }
    else{
      ctx.redirect('/login')
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

