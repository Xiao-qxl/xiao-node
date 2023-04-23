const http = require('http')

// 创建服务器
http.createServer((req, res) => {
    // req接受浏览器穿的参数  res返回渲染的内容

    res.writeHead(200, { "Content-type": "text/html;charset=utf-8" })
    res.write(`
        <html>
            <b>我是加粗的</b>
            <b>hello world</b>
        </html>
    `)
    res.end()
}).listen(3000, () => {
    console.log('server start at http://localhost:3000')
})