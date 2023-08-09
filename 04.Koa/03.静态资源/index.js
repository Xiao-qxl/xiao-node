const Koa = require('koa')
const path = require('path')
const Static = require('koa-static')

const app = new Koa()

app.use(Static(
  path.join(__dirname, "public")
))

app.use(async (ctx) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})
