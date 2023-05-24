const http = require("http")
const fs = require("fs")
const zlib = require("zlib")

const gzip = zlib.createGzip()

http.createServer((req, res) => {
  // res本身就是一个可写流
  const readStream = fs.createReadStream("../6-fs模块/fs.md")
  res.writeHead(200, {
    "Content-type": "application/x-javascript;charset=utf-8",
    "Content-Encoding": "gzip"
  })
  readStream.pipe(gzip).pipe(res)
}).listen(3000, () => {
  console.log('server start http://localhost:3000')
})
