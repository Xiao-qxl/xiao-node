const crypto = require("crypto")

function enCrypto(key, iv, data) {
  const originData = Buffer.from(data, 'utf-8').toString("binary")
  let dep = crypto.createCipheriv("aes-128-cbc", key, iv )
  return dep.update(originData, "binary", 'hex') + dep.final('hex')
}

function deCrypto(key, iv, crypted) {
  const cryptedData = Buffer.from(crypted, "hex").toString("binary")
  const dep = crypto.createDecipheriv("aes-128-cbc", key, iv)
  return dep.update(cryptedData, 'binary', 'utf-8') + dep.final('utf-8')
}

const key = "abcdef1234567890"
const iv = "rbcdfs1234567890"

const data = '需要加密的消息'

const crypted = enCrypto(key, iv, data)
console.log("加密结果-", crypted)
const deCrypted = deCrypto(key, iv, crypted)
console.log("解密结果-", deCrypted)
