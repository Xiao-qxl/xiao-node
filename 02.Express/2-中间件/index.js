const express = require('express')

const app = express()
const UserRouter = require('./router/user')

const func1 = (req, res, next) => {
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
}
const func2 = (req, res) => {
  console.log(res.isValid) // 判断验证中间件是否执行
  res.send({name: 'aaa', age: 100})
}
const func3 = (req, res, next) => {
  console.log('只响应home的中间件')
  next()
}
app.get("/", [func2])
/* 应用中间件 */
app.use(func1)
app.use('/home', func3)
app.get("/home", func2)
app.get("/login", func2)
app.use('/user', UserRouter)

/* 内置中间件 */
/* 第三方中间件 */

/* 错误中间件 */
app.use((req, res) => {
  res.status(404).send('404 ERROR')
})

app.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000')
})
