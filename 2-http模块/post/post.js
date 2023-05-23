const http = require('http')
const https = require('https')
const url = require('url')

http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true)
  const funName = urlObj.query.callback
  switch (urlObj.pathname) {
    case "/api/aaa":
      res.writeHead(200, {
        "Content-type": "application/json;charset=utf-8",
        "access-control-allow-origin": "*" // CORS头
      })
      httpPost((data) => {
        res.end(data)
      })
      break;
    default:
      res.end("404")
  }

}).listen(3000)

function httpPost(cb) {
  let data = ""
  const options = {
    hostname: "m.xiaomiyoupin.com",
    port: "443",
    path: "/mtop/market/search/placeHolder",
    method: "POST",
    headers: {
      "Content-type": "application/json"
      // "Content-type": "x-www-form-urlencoded"
    }
  }
  const req = https.request(options, (res) => {
    res.on("data", chunk => {
      data += chunk
    })
    res.on("end", () => {
      cb(data)
    })
  })
  req.write(JSON.stringify([{},{"baseParam":{"ypClient":1}}]))
  // req.write("name=abc&age=100")
  req.end()
}
