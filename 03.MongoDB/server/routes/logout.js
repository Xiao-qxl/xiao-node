const router = require('express').Router()
const LogoutController = require("../controllers/LogoutController");

/**
 * @api {post} /api/logout 用户登出
 * @apiName 登出
 * @apiGroup login
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Number} ok 标识场馆字段
 * @apiSuccessExample {type} Success-Response:
 * {
 *   ok: 1
 * }
 * */
router.get('/', LogoutController.logout)

module.exports = router
