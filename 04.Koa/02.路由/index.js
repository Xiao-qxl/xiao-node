const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = require('./routes')

app
  .use(router.routes())
  .use(router.allowedMethods()) // 请求方法method错误，提示405

app.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})
