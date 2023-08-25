const express = require("express")
const http = require('http');
const app = express()
const JWT = require("./utils/JWT");

const server = http.createServer(app);
// 引入socket.io
const socketServer = require('./socketServer')

socketServer(server)
// 页面资源
app.set("views", "./views")
app.set("view engine", "html")
app.engine("html", require("ejs").renderFile)

const PageRouter = require("./routes/page")
app.use('/page', PageRouter)

// 接口
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* 设置中间件，session、token过期校验 */
app.use((req, res, next) => {
  const { url } = req
  if ( url === '/' || url.includes('login') || url.includes('favicon.ico')) {
    console.log('白名单')
    return next()
  }
  // 校验token
  const token = req.headers["authorization"]?.split(' ')[1]
  if (token) {
    const payload = JWT.verify(token)
    if (payload) {
      // 重新计算token过期时间
      const timeDiff = payload.exp - new Date().getTime()/1000
      if (timeDiff < 10) {
        const newToken = JWT.generate({
          id: payload.id,
          username: payload.username
        }, '60s')
        res.header("Authorization", newToken)
      }
      console.log('token验证通过')
      next()
    } else {
      console.log('token验证不通过')
      return res.status(401).send({ ok: 0, errCode: 1, message: '无效token' })
    }
  }
  return res.status(401).send({ ok: 0, errCode: 1, message: '无效token' })
})

const LoginRouter = require("./routes/login")
app.use('/api/login', LoginRouter)

app.get('/', (req, res) => {
  res.render('login')
})

server.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})
