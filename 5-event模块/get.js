const http = require('http')
const https = require('https')
const url = require('url')
const EventEmitter = require('events')

let event = null
http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true)
  const funName = urlObj.query.callback
  switch (urlObj.pathname) {
    case "/api/aaa":
      res.writeHead(200, {
        "Content-type": "application/json;charset=utf-8",
        "access-control-allow-origin": "*" // CORS头
      })
      event = new EventEmitter()
      event.on("play", (data) => {
        res.end(data)
      })
      httpGet()
      break;
    default:
      res.end("404")
  }

}).listen(3000)

function httpGet(cb) {
  let data = ""
  https.get(
    'https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E8%8B%8F%E5%B7%9E&ci=80&channelId=4',
    (res) => {
      res.on("data", (chunk) => {
        data += chunk
      })
      res.on("end", () => {
        // cb(data)
        event.emit("play", data)
      })
    }
  )
}
