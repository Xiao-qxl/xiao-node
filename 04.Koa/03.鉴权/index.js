const Koa = require('koa')
const session = require('koa-session-minimal')

const app = new Koa()
// session配置
app.use(session({
  key: 'SESSION_ID',
  cookie: {
    maxAge: 1000 * 60
  }
}))
// session判断拦截
app.use(async (ctx, next) => {
  if (ctx.url.includes('login')) {
    console.log('白名单')
    await next()
    return
  }
  if (ctx.session.user) {
    // 修改session后，session会重新计算过期时间
    ctx.session.date = Date.now()
    await next()
  } else {
    ctx.status = 401
    ctx.body = {
      ok: 401,
      msg: 'session验证错误'
    }
  }
})
// JWT验证拦截
const JWT = require('./utils/JWT')
app.use(async (ctx, next) => {
  if (ctx.url.includes('login')) {
    await next()
    return
  }
  const token = ctx.headers["authorization"]?.split(" ")[1]
  if (token && JWT.verify(token)) {
    const payload = JWT.verify(token)
    // 重新计算过期时间
    const newToken = JWT.generate({
      _id: payload._id,
      username: payload.username
    }, '60s')
    ctx.set("Authorization", newToken)
    await next()
  } else {
    ctx.status = 401
    ctx.body = {
      ok: 401,
      msg: 'token验证错误、过期'
    }
  }
})
// 路由配置
const router = require('./routes')
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen('3000', () => {
  console.log('server start at http://localhost:3000')
})
