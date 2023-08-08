const Koa = require('koa')

const app = new Koa()

// ctx => context上下文
app.use((ctx, next) => {
  ctx.response.body = ctx
})

app.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})
