// websocket
const WebsocketServer = require('ws')
const wss = new WebsocketServer.WebSocketServer({ port: 8080 })

const JWT = require('./utils/JWT')

wss.on('connection', (ws, req) => {
  const myURL = new URL(req.url, "http://127.0.0.1:3000")
  const payload = JWT.verify(myURL.searchParams.get('token'))
  if (payload) {
    ws.send(createMessage(WebSocketType.GroupChat, null, "欢迎来到聊天室"))
    ws.user = payload
  } else {
    ws.send(createMessage(WebSocketType.Error, null, "身份验证失败"))
  }

  ws.on('message', (data) => {
    const msgObj = JSON.parse(data)

    switch (msgObj.type) {
      case WebSocketType.GroupList:
        sendAll()
        break;
      case WebSocketType.GroupChat:
        console.log(msgObj.data)
        wss.clients.forEach((client) => {
          if (client.readyState === WebsocketServer.OPEN) {
            client.send(createMessage(
              WebSocketType.GroupChat,
              ws.user,
              msgObj.data
            ))
          }
        })
        break;
      case WebSocketType.SingleChat:
        wss.clients.forEach((client) => {
          if (client.user?.username === msgObj.to && client.readyState === WebsocketServer.OPEN) {
            client.send(createMessage(
              WebSocketType.SingleChat,
              ws.user,
              msgObj.data
            ))
          }
        })
        break;
      case WebSocketType.Error:
        break;
      default:
        break
    }
  })

  ws.on('close', () => {
    wss.clients.delete(ws.user)
    sendAll()
  })
})

const WebSocketType = {
  Error: 0,
  GroupList: 1,
  GroupChat: 2,
  SingleChat: 3
}

function createMessage(type, user, data) {
  return JSON.stringify({
    type, user, data
  })
}

function sendAll() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebsocketServer.OPEN) {
      client.send(createMessage(
        WebSocketType.GroupList,
        null,
        Array.from(wss.clients)
          .map(item => item.user)
          .filter(item => item)
      ))
    }
  })
}

module.exports = wss
