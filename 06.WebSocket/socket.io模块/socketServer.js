// socket.io
const JWT = require("./utils/JWT");

function start(server) {
  const io = require('socket.io')(server)
  io.on('connection', (socket) => {
    // console.log(socket.handshake.query.token)
    const payload = JWT.verify(socket.handshake.query.token)
    if (payload) {
      socket.user = payload
      socket.emit(WebSocketType.GroupChat, createMessage(null, "欢迎来到聊天室"))
      sendAll(io)
    } else {
      socket.emit(WebSocketType.Error, createMessage(null, "身份验证不通过"))
    }

    socket.on(WebSocketType.GroupList, () => {
      sendAll(io)
    })

    socket.on(WebSocketType.GroupChat, (msg) => {
      io.sockets.emit(
        WebSocketType.GroupChat,
        createMessage(socket.user, msg.data)
      )
      // 广播：除了自己不发 给其他人发
      // socket.broadcast.emit(
      //   WebSocketType.GroupChat,
      //   createMessage(socket.user, msg.data)
      // )
    })

    socket.on(WebSocketType.SingleChat, (msgObj) => {
      console.log(msgObj)
      Array.from(io.sockets.sockets)
        .forEach(sSocket => {
          if (sSocket[1].user.username === msgObj.to) {
            sSocket[1].emit(
              WebSocketType.SingleChat,
              createMessage(socket.user.username, msgObj.data)
            )
          }
        })
    })

    socket.on('disconnect', () => {
      sendAll(io)
    })
  })
}

const WebSocketType = {
  Error: 0,
  GroupList: 1,
  GroupChat: 2,
  SingleChat: 3
}

function createMessage(user, data) {
  return {
    user, data
  }
}

function sendAll(io) {
  io.sockets.emit(
    WebSocketType.GroupList,
    Array.from(io.sockets.sockets)
      .map(item => item[1].user)
      .filter(item => item)
  )
}

module.exports = start
