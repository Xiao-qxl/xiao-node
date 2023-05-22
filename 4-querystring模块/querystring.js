const queryString = require("querystring")

const str = "name=111&age=22&location=bilibili"
const obj = queryString.parse(str)
console.log(obj)

const myObj = {a: 1, b: 1, c: 1,}
const myStr = queryString.stringify(myObj)

console.log(myStr)
