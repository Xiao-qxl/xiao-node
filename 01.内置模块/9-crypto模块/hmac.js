const crypto = require("crypto")

const hash = crypto.createHmac("md5", '密钥')
hash.update("这是要加密的内容")

console.log(hash.digest("hex"))
