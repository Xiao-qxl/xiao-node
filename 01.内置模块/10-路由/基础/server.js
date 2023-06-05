const http = require('http')

const Router = {}
/*
* @description 注册路由
* @param routeObj 路由对象
* */
function use(routeObj) {
  Object.assign(Router, routeObj)
}
function start() {
  http.createServer((req, res) => {
    const myUrl = new URL(req.url, "http://127.0.0.1")
    try {
      Router[myUrl.pathname](req, res)
    } catch (e) {
      Router['/404'](req, res)
    }
  }).listen(3000, () => {
    console.log('server start at http://localhost:3000')
  })
}

exports.start = start
exports.use = use
