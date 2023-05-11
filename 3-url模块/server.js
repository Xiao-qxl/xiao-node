const http = require('http')
const url = require('url') // 处理url模块

const server =  http.createServer()

server.on('request', (req, res) => {
  console.log(req.url)
  console.log(url.parse(req.url).pathname)
  // req接受浏览器传的参数  res返回渲染的内容
  res.writeHead(200, {"Content-type": "text/html;charset=utf-8"})
  res.write('zzzz')
  res.end('我是end返回的')
})

server.listen(8066, () => {
  console.log('server start at http://localhost:8066')
})
