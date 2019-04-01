const router = require('koa-router')();
const controller = require('../controller/c-posts')

// 重置到文章页
router.get('/', controller.getRedirectPosts)
// 文章页
router.get('/posts', controller.getHello)

module.exports = router