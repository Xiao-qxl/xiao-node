const UserModel = require("../model/UserModel");
const UserService = {
  addUser: (username, password, age) => {
    return UserModel.create({
      username, password, age
    })
  },
  updateUser: (id, username, password, age) => {
    return UserModel.updateOne({_id: id},{
      username, password, age
    })
  },
  deleteUser: (id) => {
    return UserModel.deleteOne({
      _id: id
    })
  },
  getUser: (filter = {}, page = 1, limit = 10) => {
    return UserModel
      .find(filter, ["_id", "username", "age", "avatar"])
      .sort({age: 1})
      .skip((page - 1) * limit)
      .limit(limit)
  },
  updateUserAvatar: (username, avatar) => {
    return UserModel
      .findOneAndUpdate({ username }, {avatar})
  }
}

module.exports = UserService
