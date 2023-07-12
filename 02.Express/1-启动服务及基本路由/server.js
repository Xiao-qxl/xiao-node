const express = require('express')

const app = express()
/*
* 默认全匹配
* res.json 发送一个json的响应。这个方法和将一个对象或者一个数组作为参数传递给res.send()方法的效果相同。
*   不过，你可以使用这个方法来转换其他的值到json，例如null，undefined。
* res.render 是将一个视图文件（View）渲染成 HTML 或其他格式的文本，并将其发送到客户端浏览器显示。
*   视图文件通常使用模板引擎（如 EJS、Handlebars 等）生成动态内容，比如从数据库中读取数据并展示到页面上。
*   渲染的结果一般是一个 HTML 字符串，可以包含动态数据
* res.send 方法将一个字符串、一个对象、一个数组或一个 Buffer 发送到客户端浏览器。
*   如果发送的是一个字符串，Express 将会自动设置 Content-Type 头部为 "text/html"。
*   如果发送的是一个对象或数组，Express 将自动设置 Content-Type 头部为 "application/json"。
*   如果发送的是一个 Buffer，则默认 Content-Type 是 "application/octet-stream"。
* */
app.get("/", (req, res) => {
  // res.json([{'a': '1'}])
  res.send('默认页面') // res.send可以返回代码片段和数据
  // res.render('home')
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
