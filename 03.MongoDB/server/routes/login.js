const express = require("express")
const LoginController = require("../controllers/LoginController");

const router = express.Router()

/**
* @api {post} /api/login 用户登录
* @apiName login
* @apiGroup login
* @apiVersion 1.0.0
*
* @apiParam {String} username 用户名
* @apiParam {String} password 密码
* @apiParam {Number} age 年龄
*
* @apiSuccess (200) {Number} ok 标识场馆字段
*
* @apiParamExample {multipart/form-data} Request-Example:
* {
*   username: 'xiao',
*   password: '123',
*   age: 10
* }
*
* @apiSuccessExample {type} Success-Response:
* {
*   ok: 1
* }
* */
router.post("/", LoginController.postLogin)

module.exports = router
