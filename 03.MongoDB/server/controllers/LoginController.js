const LoginService = require("../services/LoginService");
const LoginController =  {
  postLogin: async (req, res) => {
    const { username, password } = req.body
    const data = await LoginService.postLogin(username, password)
    if(data) {
      req.session.user = data
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
