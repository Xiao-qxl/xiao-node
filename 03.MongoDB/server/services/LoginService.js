const UserModel = require("../model/UserModel");
const LoginService = {
  postLogin: (username, password) => {
    return UserModel.findOne({
      username, password
    })
  }
}

module.exports = LoginService
