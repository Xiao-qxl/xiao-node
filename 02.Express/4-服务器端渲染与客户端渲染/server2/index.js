const express = require('express')

const app = express()

/* 配置模板引擎 */
app.set("views", "./views")
app.set("view engine", "html")
app.engine("html", require("ejs").renderFile) // 支持直接渲染html
/* 配置静态资源 */
app.use(express.static("public"))
/*  */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.redirect('/login');
})

const LoginRouter = require('./router/login')
const HomeRouter = require('./router/home')
app.use('/login', LoginRouter)
app.use('/home', HomeRouter)

app.use((req, res) => {
  res.status(404).send('404 ERROR')
})

app.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000')
})
