const router = require('express').Router()
const UserModel = require("../model/UserModel");

// 新增
router.post('/', (req, res) => {
  console.log(req.body)
  const { username, password, age } = req.body
  // 引入并使用模型
  UserModel.create({
    username, password, age
  })
    .then(data => {
      console.log(data)
      res.send({ok: 1})
    })
    .catch(err => {
      res.send(err)
    })
})

// 更新
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { username, password, age } = req.body
  // 引入并使用模型
  UserModel.updateOne({_id: id},{
    username, password, age
  })
    .then(data => {
      console.log(data)
      res.send({ok: 1})
    })
    .catch(err => {
      res.send(err)
    })
})

// 删除
router.delete('/:id', (req, res) => {
  const { id } = req.params
  UserModel.deleteOne({
    _id: id
  })
    .then(data => {
      console.log(data)
      res.send({ok: 1})
    })
    .catch(err => {
      res.send(err)
    })
})

// 查询
router.get('/', (req, res) => {
  const { page, limit } = req.query
  UserModel
    .find({}, ["_id", "username", "age"])
    .sort({age: 1})
    .skip((page - 1) * limit)
    .limit(limit)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router
