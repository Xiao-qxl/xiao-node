const express = require('express')

const app = express()

require('./config/db.config')

app.set("views", "./views")
app.set("view engine", "html")
app.engine("html", require("ejs").renderFile)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.redirect('/login')
})

const LoginRouter = require('./router/login')
app.use('/login', LoginRouter)

const UserApiRouter = require('./apis/user')
app.use('/api/user', UserApiRouter)

app.use((req, res) => {
  res.status(404).send('404 ERROR')
})

app.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000')
})
