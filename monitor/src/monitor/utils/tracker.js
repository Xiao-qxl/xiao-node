/*
* 阿里云文档：https://help.aliyun.com/zh/sls/developer-reference/putwebtracking
* HOST主机名：https://help.aliyun.com/zh/sls/developer-reference/endpoints?spm=a2c4g.11186623.0.0.3d676ab0ZEh5DP#reference-wgx-pwq-zdb
* SLS文档：https://help.aliyun.com/zh/sls/user-guide/use-web-tracking-sdk-for-javascript-to-collect-browser-logs?spm=a2c4g.11186623.0.0.3d676ab0ZEh5DP#task-2211485
* */
import SlsTracker from '@aliyun-sls/web-track-browser'
import userAgent from 'user-agent'

let host = 'cn-hangzhou.log.aliyuncs.com'
let project = 'xiao-monitor'
let logstore = 'xiao-monitor-logstore'
let APIVersion = '0.6.0'

function getExtraData() {
  return {
    title: document.title,
    url: location.url,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).fullName
  }
}

class SendTracker {
  constructor() {
    this.url = `https://${project}.${host}/logstores/${logstore}/track?APIVersion=${APIVersion}`; // 上报路径
    this.xhr = new XMLHttpRequest;
  }
  send(data = {}) {
    let extraData = getExtraData()
    let log = { ...extraData, ...data }
    // 方法一
    // 阿里云文档：https://help.aliyun.com/zh/sls/user-guide/use-web-tracking-sdk-for-javascript-to-collect-browser-logs?spm=a2c4g.11186623.0.0.3d676ab0ZEh5DP#task-2211485
    const opts = {
      host, // 所在地域的服务入口。例如cn-hangzhou.log.aliyuncs.com
      project, // Project名称。
      logstore, // Logstore名称。
      time: 10, // 发送日志的时间间隔，默认是10秒。
      count: 10, // 发送日志的数量大小，默认是10条。
      topic: 'xiao',// 自定义日志主题。
      source: 'PC',
    }
    const tracker = new SlsTracker(opts)
    tracker.send(log)

    // 方法二：直接请求地址
    // 对象的值不能是数字
    // for (let key in log) {
    //   if (typeof log[key] === 'number') {
    //     log[key] = `${log[key]}`
    //   }
    // }
    // console.log(log)
    // this.xhr.open('POST', this.url, true)
    // this.xhr.onload = () => {
    //   console.log('传输成功')
    // }
    // this.xhr.onerror = (error) => {
    //   console.log(error)
    // }
    // this.xhr.send(JSON.stringify({ __logs__: [log] }))
  }
}

export default new SendTracker();
