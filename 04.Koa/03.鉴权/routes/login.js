const Router = require('koa-router')
const JWT = require("../utils/JWT");
const router = new Router()

router.prefix('/login')
router.get('/', (ctx, next) => {
  console.log(ctx.session)
  // 设置sessionID
  ctx.session.user = {name: 'xiao', age: 18}
  // 设置JWT
  const token = JWT.generate({
    _id: "111",
    username: "xiao"
  }, '30s')
  ctx.set("Authorization", token)
  ctx.body = {ok: 1, msg: '登录成功'}
})

module.exports = router
