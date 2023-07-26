const LoginService = require("../services/LoginService");
const JWT = require("../utils/JWF");
const LoginController =  {
  postLogin: async (req, res) => {
    const { username, password } = req.body
    const data = await LoginService.postLogin(username, password)
    if(data) {
      // 设置session
      req.session.user = data
      // 设置token
      const token = JWT.generate({
        _id: data._id,
        username: data.username
      }, '60s')
      res.header("Authorization", token)
      res.send({ ok: 1 })
      return
    }
    res.send({
      ok: 0,
      message: '用户名或者密码错误！'
    })
  }
}

module.exports = LoginController
