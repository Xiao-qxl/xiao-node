const queryString = require("querystring")

const str = "name=111&age=22&location=bilibili"
const obj = queryString.parse(str)
console.log(obj)

const myObj = {a: 1, b: 1, c: 1,}
const myStr = queryString.stringify(myObj)
console.log(myStr)

// 转义
const str1 = "name=前端&age=a--bc>ab"
const myStr1 = queryString.escape(str1)
const myStr2 = queryString.unescape(myStr1)
console.log(myStr1)
console.log(myStr2)
