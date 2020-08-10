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

const config = require('./config')
const routes = require('./routes')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
const { resolve } = require('path')
const { rejects } = require('assert')

const port = process.env.PORT || config.port

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
  .use(router.routes())
  .use(router.allowedMethods())


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})



let tasks = [{
  name:'T1',
  id :'a'
},{
  name:'T2',
  id :'b'
},{
  name:'T3',
  id : 'c'
},{
  name:'T4',
  id : 'd'
},{
  name:'T5',
  id : 'e'
},{
  name:'T6',
  id : 'f'
}]


router.get('/', async (ctx, next) => {
  ctx.state = {
    // title: ['banyuan','a11111'],
    // content:"We are superman",
    // test:"hello123",
    tasks:tasks
  }
  await ctx.render('test',ctx.state)
})

router.post('/checkTask', (ctx, next) => {
  const { name,checked } = ctx.request.body;
  tasks.forEach((item)=>{
    if(item.name ===name){
      item.checked = !item.checked
    }
  });

  // console.log(tasks)

  ctx.response.body = {
  status:'success'
  }
})

  router.post('/addTask', (ctx, next) => {
    const { name } = ctx.request.body;
    tasks.push({
      name,
      checked:false
    });
  
  
    ctx.response.body = {
    status:'success'
    }
  })

  router.post('/deleteTask', (ctx, next) => {
    const {ele}=ctx.request.body;
    console.log('ele ===>',ele)
    var index=0
  
    for(var i=0;i<tasks.length;i++){
      if(tasks[i].name==ele){
        index=i
        console.log(index)
        // tasks[data.flag+1].checked=tasks[data.flag].checked
      }
    }
    tasks.splice(index,1)
    // delete tasks[index]
  
    console.log(tasks)
  
  
  
    ctx.response.body={index};
  });




routes(router)
app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})