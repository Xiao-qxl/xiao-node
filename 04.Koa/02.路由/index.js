const path = require("path");
const Koa = require('koa')
const Router = require('koa-router')
/* 静态资源 */
const Static = require("koa-static");
/* 参数处理 */
const bodyParser = require("koa-bodyparser");
const multer = require("koa-multer");
/* ejs模板 */
const views = require('koa-views')

const app = new Koa()

app.use(Static(
  path.join(__dirname, "public")
))
// 使用koa-bodyparser中间件，JSON和URL编码数据。
// 获取post参数 application/x-www-form-urlencoded, application/json
app.use(bodyParser())
// 使用koa-multer中间件后，FormData编码数据。
const upload = multer();
app.use(upload.any())

/* 调用ejs */
app.use(views(path.join(__dirname, 'views'), { extension: "ejs" }))

/* 路由 */
const router = require('./routes')
app
  .use(router.routes())
  .use(router.allowedMethods()) // 请求方法method错误，提示405


app.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})
