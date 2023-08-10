const Router = require('koa-router')
const router = new Router()

router.get('/', (ctx, next) => {
  /* 设置cookie */
  ctx.cookies.set("location", 'susu')
  /* 读取cookie */
  ctx.cookies.get("location")
  ctx.body = {
    ok: 11,
    msg: '操作成功'
  }
})

const loginRouter = require('./login')
router.use(loginRouter.routes()).use(loginRouter.allowedMethods())

module.exports = router
