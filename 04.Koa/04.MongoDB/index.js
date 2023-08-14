const Koa = require('koa')
const app = new Koa()

require('./config/db.config')

const UserRouter = require('./routes/user')
app
  .use(UserRouter.routes())
  .use(UserRouter.allowedMethods())

app.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})
