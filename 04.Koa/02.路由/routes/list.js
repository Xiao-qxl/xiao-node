const Router = require('koa-router')
const router = new Router()

/* 可链式书写 */
router.get("/", (ctx, next) => {
  ctx.body = ['111', '222', '333']
})
  .post("/", (ctx, next) => {
    ctx.body = {
      ok: 1,
      info: 'add list success'
    }
  })
  .put("/:id", (ctx, next) => {
    console.log(ctx.params)
    ctx.body = {
      ok: 1,
      info: 'put list success'
    }
  })
  .del("/:id", (ctx, next) => {
    ctx.body = {
      ok: 1,
      info: 'del list success'
    }
  })

module.exports = router
