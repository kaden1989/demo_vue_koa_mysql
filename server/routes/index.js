const router = require('koa-router')()
  ,auth = require('./auth')
  ,api = require('./api')
  , jwt = require('koa-jwt');
const secret = 'vue-koa-demo-kaden';

router.use('/auth', auth.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use("/api",api.routes())//所有/api/打头的请求都要经过jwt中间件的验证，secret秘钥必须跟当初签发的secret一致

module.exports = router.routes()

