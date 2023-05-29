const http = require('http')

// 创建服务器
http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    // TODO 读取本地图标
    return
  }
  console.log(req.url)
  // req接受浏览器传的参数  res返回渲染的内容
  res.writeHead(200, {"Content-type": "text/html;charset=utf-8"})
  res.write(renderHtml(req.url))
  res.end('我是end返回的')
}).listen(8066, () => {
  console.log('server start at http://localhost:8066')
})

function renderHtml(url) {
  switch (url) {
    case '/':
      return `
        <html>
            <b>home页面</b>
        </html>
      `
    case '/abc':
      return `
        <html>
            <b>abc页面</b>
        </html>
      `
    default:
      return `
        <html>
            <b>404页面</b>
        </html>
      `
  }

}
