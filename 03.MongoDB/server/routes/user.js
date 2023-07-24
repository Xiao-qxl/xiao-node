const router = require('express').Router()
const UserController = require("../controllers/UserController");

// 新增
router.post('/', UserController.addUser)

// 更新
router.put('/:id', UserController.updateUser)

// 删除
router.delete('/:id', UserController.deleteUser)

// 查询
router.get('/', UserController.getUser)

module.exports = router
