const http = require('http')
const url = require('url')

http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true)
  const funName = urlObj.query.callback
  switch (urlObj.pathname) {
    // jsonp接口
    case "/api/aaa":
      res.end(`${funName}(${JSON.stringify({
        name: 'aaa',
        age: 12
      })})`)
      break;
    // CORS接口
    case "/api/bbb":
      res.writeHead(200, {
        "Content-type": "application/json;charset=utf-8",
        "access-control-allow-origin": "*" // CORS头
      })
      res.end(JSON.stringify({
        name: 'bbb',
        age: 12
      }))
      break;
    default:
      res.end("404")
  }

}).listen(3000)
