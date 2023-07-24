const express = require('express')

const session = require('express-session')
const app = express()

require('./config/db.config')

app.set("views", "./views")
app.set("view engine", "html")
app.engine("html", require("ejs").renderFile)

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
  resave: true,
  saveUninitialized: true
}))

/* 设置中间件，session过期校验 */
app.use((req, res, next) => {
  if (!(req.url.includes('login') || req.session.user)) return res.redirect('/login')
  next()
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/login', (req, res) => {
  res.render('login')
})

const LoginApiRouter = require('./routes/login')
app.use('/api/login', LoginApiRouter)

const UserApiRouter = require('./routes/user')
const e = require("express");
app.use('/api/user', UserApiRouter)

app.use((req, res) => {
  res.status(404).send('404 ERROR')
})

app.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000')
})
