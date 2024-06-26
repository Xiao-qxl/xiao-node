const express = require('express')

const session = require('express-session')
const MongoStore = require('connect-mongo')
const app = express()

require('./config/db.config')

app.set("views", "./views")
app.set("view engine", "html")
app.engine("html", require("ejs").renderFile)

app.use('/uploads', express.static('uploads'))

/* 页面路由 */
const PageRouter = require('./routes/page')
app.use('/', PageRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
/* session中间件 */
app.use(session({
  name: 'xiao\'s system',
  secret: "xiao system secret",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false
  },
  resave: true, // 重新设置session后，会重新计算过期时间
  saveUninitialized: true,
  rolling: true, //为 true 表示 超时前刷新，cookie 会重新计时； 为 false 表示在超时前刷新多少次，都是按照第一次刷新开始计时。
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/xiao_session', // 新建一个数据库来存session
    ttl: 1000 * 60 * 10 // 过期时间
  })
}))

const JWT = require("./utils/JWT");
/* 设置中间件，session、token过期校验 */
app.use((req, res, next) => {
  const { url, session } = req
  if (url.includes('login') || url.includes('upload') || url.includes('favicon.ico')) {
    console.log('白名单')
    return next()
  }
  // 校验token
  let tokenBool = false
  const token = req.headers["authorization"]?.split(' ')[1]
  if (token) {
    const payload = JWT.verify(token)
    if (payload) {
      tokenBool = true
      // 重新计算token过期时间
      const timeDiff = payload.exp - new Date().getTime()/1000
      if (timeDiff < 10) {
        const newToken = JWT.generate({
          _id: payload._id,
          username: payload.username
        }, '60s')
        res.header("Authorization", newToken)
      }
    } else {
      console.log('token验证不通过')
      return res.status(401).send({ ok: 0, errCode: 1, message: '无效token' })
    }
  }
  if (session.user && tokenBool){
    // 重新设置session（更新session）
    // session.mydate = Date.now()
    console.log('身份验证通过')
    next()
  } else {
    return res.status(401).send({ ok: 0, errCode: 1, message: '身份验证不通过' })
  }
})

const LoginApiRouter = require('./routes/login')
app.use('/api/login', LoginApiRouter)

const LogoutApiRouter = require('./routes/logout')
app.use('/api/logout', LogoutApiRouter)

const UserApiRouter = require('./routes/user')
app.use('/api/user', UserApiRouter)

const UploadApiRouter = require('./routes/upload')
app.use(UploadApiRouter)

app.use((req, res) => {
  res.status(404).send('404 ERROR')
})

app.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000')
})
