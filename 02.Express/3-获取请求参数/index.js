const express = require('express')

const app = express()

app.get('/', (req, res) => {
  console.log(req.query)
  res.send('登录页面get请求')
})

/*
* 配置解析post参数的中间件
* */
app.use(express.urlencoded({ extended: false })) // application/x-www-form-urlencoded
app.use(express.json()) // application/json
app.post('/', (req, res) => {
  console.log(req.body)
  res.send('登录页面post请求')
})

app.use((req, res) => {
  res.status(404).send('404 ERROR')
})

app.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000')
})
