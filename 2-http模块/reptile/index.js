const http = require('http')
const https = require('https')
const url = require('url')
const cheerio = require('cheerio')

http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true)
  const funName = urlObj.query.callback
  switch (urlObj.pathname) {
    case "/api/aaa":
      res.writeHead(200, {
        "Content-type": "application/json;charset=utf-8",
        "access-control-allow-origin": "*" // CORS头
      })
      httpGet((data) => {
        res.end(spider(data))
      })
      break;
    default:
      res.end("404")
  }

}).listen(3000)

function httpGet(cb) {
  let data = ""
  https.get(
    'https://i.maoyan.com/?requestCode=6bd219c43a8c9a214b0ba2dd6f5f5002zogfl#movie',
    (res) => {
      res.on("data", (chunk) => {
        data += chunk
      })
      res.on("end", () => {
        cb(data)
      })
    }
  )
}

function spider(data) {
  // npm i cheerio
  let $ = cheerio.load(data)
  const $movieList = $(".column.content")
  const movies = []
  $movieList.each((index, value) => {
    movies.push({
      title: $(value).find(".title").text(),
      grade: $(value).find(".grade").text(),
      actor: $(value).find(".actor").text(),
    })
  })
  return JSON.stringify(movies)
}
