const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserType = {
  username: String,
  password: String,
  age: Number,
}
// 创建一个模型，一一对应数据库的集合
// 模型user将会对应users集合
const UserModel = mongoose.model('user', new Schema(UserType))

module.exports = UserModel
