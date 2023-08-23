const express = require("express")

const app = express()

app.use(express.static('../web'))
app.get('/', (req, res) => {
  res.send({
    ok: 1
  })
})

app.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})

// websocket
const { WebSocketServer } = require('ws')
const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  ws.send('欢迎来到聊天室')
})
