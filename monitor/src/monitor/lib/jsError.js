import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'
import tracker from '../utils/tracker'

export function injectJsError() {
  console.log('injectJsError')
  // 监听全局未捕获的错误
  // event: 错误事件对象
  window.addEventListener('error', (event) => {
    // console.log(event)
    let lastEvent = getLastEvent() // 最后一个交互事件
    // console.log(lastEvent)
    tracker.send({
      kind: 'stability', // 监控指标大类
      type: 'error', // 小类型
      errorType: 'jsError', // JS执行错误
      url: '', // 访问哪个路径报错了
      message: event.message, // 报错信息
      filename: event.filename, // 哪个文件报错了
      position: `${event.lineno}:${event.colno}`,
      stack: getLines(event.error.stack),
      selector: lastEvent? getSelector(lastEvent): '', // 代表最后一个操作的元素
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    console.log(event)
    let lastEvent = getLastEvent()
    let message, filename, line = 0, col = 0, stack = '';
    let { reason } = event
    if (typeof reason === 'string') {
      message = reason
    } else if (typeof reason === 'object') {
      if (reason.stack) {
        let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
        console.log(matchResult)
        filename = matchResult[1]
        line = matchResult[2]
        col = matchResult[3]
      }
      stack = getLines(reason.stack)
    }
    tracker.send({
      kind: 'stability', // 监控指标大类
      type: 'error', // 小类型
      errorType: 'jsError', // JS执行错误
      url: '', // 访问哪个路径报错了
      message, // 报错信息
      filename, // 哪个文件报错了
      position: `${line}:${col}`,
      stack,
      selector: lastEvent? getSelector(lastEvent): '', // 代表最后一个操作的元素
    })
  })
}

function getLines(stack) {
  return stack
    .split('\n')
    .slice(1)
    .map(item => item.replace(/^\s+at\s+/g, ""))
    .join('^')
}
