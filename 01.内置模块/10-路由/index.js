const server = require('./server')
const route = require('./route')
const apiRouter = require('./api')
// 注册路由
server.use(route)
server.use(apiRouter)
// 启动服务器
server.start()
