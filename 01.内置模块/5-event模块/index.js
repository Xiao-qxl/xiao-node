const EventEmitter = require('events')

const event = new EventEmitter()

event.on("play", (data) => {
  console.log('事件触发了-play', data)
})

event.emit("play", "111")
