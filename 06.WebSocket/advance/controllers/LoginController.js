const LoginService = require("../services/LoginService");
const JWT = require("../utils/JWT");
const LoginController =  {
  postLogin: async (req, res) => {
    const { username, password } = req.body
    const data = await LoginService.postLogin(username, password)
    if(data.length) {
      const userinfo = data[0]
      // 设置token
      const token = JWT.generate({
        id: userinfo.id,
        username: userinfo.username
      }, '60m')
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
