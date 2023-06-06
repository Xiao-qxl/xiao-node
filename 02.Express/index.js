const express = require('express')

const app = express()

app.get("/", (req, res, next) => {
  /*中间件*/
  // 验证用户token是否过期，cookie过期
  // 查询数据库
  console.log('验证')
  const isValid = true
  if (isValid) {
    res.isValid = isValid
    next()
  } else {
    res.send('验证失败')
  }
}, (req, res) => {
  console.log(res.isValid)
  res.send({name: 'aaa', age: 100})
})
app.get("/home", (req, res) => {
  // 返回内容
  res.send({name: 'aaa', age: 100})
})
/*
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

/* 正则表达式 */
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})

app.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000')
})
