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
  getUser: (page, limit) => {
    return UserModel
      .find({}, ["_id", "username", "age"])
      .sort({age: 1})
      .skip((page - 1) * limit)
      .limit(limit)
  }
}

module.exports = UserService
