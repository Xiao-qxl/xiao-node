const http = require('http')
const url = require('url') // 处理url模块

const server = http.createServer()

server.on('request', (req, res) => {
    const reqUrl = req.url
    // url.parse 参数1：需解析url  参数2：是否将query参数转为对象
    const urlObj = url.parse(reqUrl)
    // console.log('解析url生成的对象', url.parse(reqUrl, true))
    const testUrlObj = {
        protocol: 'https:',
        slashes: true,
        auth: null,
        host: 'www.baidu.com:443',
        port: '443',
        hostname: 'www.baidu.com',
        hash: '#tag=110',
        search: '?id=8&name=mouse',
        query: {id: '8', name: 'mouse'},
        pathname: '/ad/index.html',
        path: '/ad/index.html?id=8&name=mouse'
    }
    // console.log('上述对象生成url', url.format(testUrlObj))
    // console.log('拼接url1', url.resolve('/111/', '222'))
    // console.log('拼接url2', url.resolve('/111', '222'))
    // console.log('拼接url3', url.resolve('/111/', '/222'))
    /* 上述format函数和resolve函数已废弃 */
    console.log(reqUrl)
    // new URL()包含resolve功能
    const myURL = new URL(reqUrl, 'http://localhost:8066')
    if (myURL.pathname !== '/favicon.ico') {
        console.log(myURL)
        const paramA = myURL.searchParams.get('a')
        console.log(paramA)
        for (const [key, value] of myURL.searchParams) {
            console.log({[key]: value})
        }
    }

    res.writeHead(200, {"Content-type": "text/html;charset=utf-8"})
    res.end('我是end返回的')
})

const nodeUrl = require('node:url')
/*
* URL <URL> 一个 WHATWG URL 对象
* options <Object>
    auth <boolean> (a:b@)如果序列化的网址字符串应包含用户名和密码，则为 true，否则为 false。 默认值: true。
    fragment <boolean> (#foo)如果序列化的网址字符串应包含片段，则为 true，否则为 false。 默认值: true。
    search <boolean> (?abc)如果序列化的网址字符串应包含搜索查询，则为 true，否则为 false。 默认值: true。
    unicode <boolean> true 如果出现在网址字符串的主机组件中的 Unicode 字符应该被直接编码而不是 Punycode 编码。 默认值: false。
* 返回： <string>
* */
const myURL = new URL('https://a:b@测试?abc#foo')
console.log(myURL)
const formatRes = nodeUrl.format(myURL, { auth: false, fragment: false, search: false, unicode: true })
console.log(formatRes)

server.listen(8066, () => {
    console.log('server start at http://localhost:8066')
})
