const UserModel = require("../model/UserModel");
const UserService = {
  getUser: (filter = {}, page = 1, limit = 10) => {
    return UserModel
      .find(filter, ["_id", "username", "age", "avatar"])
      .sort({age: 1})
      .skip((page - 1) * limit)
      .limit(limit)
  },
}

module.exports = UserService
