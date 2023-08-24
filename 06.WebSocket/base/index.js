const express = require("express")

const app = express()

app.use(express.static('./web'))
app.get('/', (req, res) => {
  res.send({
    ok: 1
  })
})

app.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})

// websocket
const WebSocket = require('ws')
const wss = new WebSocket.WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log('received：%s', data)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false })
      }
    })
  })

  ws.send('欢迎来到聊天室')
})
