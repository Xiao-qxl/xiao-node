const crypto = require("crypto")

const hash = crypto.createHash("md5")
hash.update("hello world")
/*
* 对于同一个 digest 对象，我们只能进行一次 digest() 操作，重复调用会抛出错误。
* 因此，如果我们需要重新计算消息摘要，我们需要创建一个新的 digest 对象。
* */
console.log(hash.digest("hex"))

const hash1 = crypto.createHash("sha1")
hash1.update("hello world")
console.log(hash1.digest("base64"))
