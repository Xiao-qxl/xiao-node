const UserService = require("../services/UserService");
const UserController = {
  getUser: async (ctx) => {
    console.log(ctx.query)
    const { page, limit } = ctx.query
    ctx.body = await UserService.getUser({}, page, limit)
  },
}

module.exports = UserController
