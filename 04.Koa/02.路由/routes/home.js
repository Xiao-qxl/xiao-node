const Router = require('koa-router')
const router = new Router()

router.get('/', (ctx, next) => {
  ctx.body = `
    <html lang="en">
      <h1>home页面</h1>
    </html>  
  `
})

module.exports = router
