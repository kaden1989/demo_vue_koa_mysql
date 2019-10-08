const auth = require('../controllers/user.js');
const router = require('koa-router')();

router.get('/user/:id', auth.getUserInfo) // 定义url的参数是id,用user的auth方法引入router
  .post('/user',auth.postUserAuth)
  .post('/register',auth.register);

module.exports = router; // 把router规则暴露出去
