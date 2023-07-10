const express = require('express')

const app = express()
/*
* 默认全匹配
* */
app.get("/", (req, res) => {
  res.send('默认页面')
})
app.get("/login", (req, res) => {
  res.send('登录页面')
})
/*
* 内置匹配规则
* ?表示0个或者1个
* +表示1个或者多个
* *表示通配符
* ()表示分组
* :id表示动态参数
* */
app.get("/ab?cd", (req, res) => {
  res.send("/ab?cd")
})
app.get("/ab/:id", (req, res) => {
  res.send("/ab/:id")
})
/*
* 正则表达式匹配
* */
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
/*
* 启动服务
* */
app.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000')
})
