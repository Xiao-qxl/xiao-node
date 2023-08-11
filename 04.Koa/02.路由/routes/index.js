const Router = require('koa-router')
const router = new Router()

const listRouter = require("./list");
const homeRouter = require('./home')
const uploadRouter = require('./upload')

/* 统一加前缀 */
router.prefix('/api')
/* 注册路由级别中间件 */
router.use("/list", listRouter.routes(), listRouter.allowedMethods())
router.use("/home", homeRouter.routes(), homeRouter.allowedMethods())
router.use("/upload", uploadRouter.routes(), uploadRouter.allowedMethods())
router.redirect('/api', '/api/home')

module.exports = router
