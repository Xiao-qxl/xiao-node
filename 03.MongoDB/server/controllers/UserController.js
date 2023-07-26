const UserService = require("../services/UserService");
const UserController = {
  addUser: async (req, res) => {
    const { username, password, age } = req.body
    // 引入并使用模型
    const data = await UserService.getUser({username},1, 1)
    if (data.length) {
      return res.send({ok: 0, message: '已存在该用户'})
    }
    await UserService.addUser(username, password, age)
    res.send({ok: 1})
  },
  updateUser: async (req, res) => {
    const { id } = req.params
    const { username, password, age } = req.body
    await UserService.updateUser(id, username, password, age)
    res.send({ok: 1})
  },
  deleteUser: async (req, res) => {
    const { id } = req.params
    await UserService.deleteUser(id)
    res.send({ok: 1})
  },
  getUser: async (req, res) => {
    const { page, limit } = req.query
    const data = await UserService.getUser({}, page, limit)
    res.send(data)
  }
}

module.exports = UserController
