const jwt = require('jsonwebtoken')
const secret = 'xiao-secret'

const JWT = {
  generate(data, expires = 10) {
    return jwt.sign(data, secret, { expiresIn: expires })
  },
  verify(token) {
    try {
      return jwt.verify(token, secret)
    } catch (e) {
      // console.log(e)
      return false
    }
  }
}

module.exports = JWT
