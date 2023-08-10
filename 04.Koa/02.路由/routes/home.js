const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx, next) => {
  await ctx.render("home", { title: '这是首页的传参' }) // 渲染ejs模板
})

module.exports = router
