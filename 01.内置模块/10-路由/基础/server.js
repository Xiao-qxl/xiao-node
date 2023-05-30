const http = require('http')
const route = require("./route");

http.createServer((req, res) => {
  const myUrl = new URL(req.url, "http://127.0.0.1")
  try {
    route[myUrl.pathname](res)
  } catch (e) {
    route['/404'](res)
  }
  res.end()
}).listen(3000, () => {
  console.log('server start at http://localhost:3000')
})
