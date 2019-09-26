const app = require('koa')()
  , koa = require('koa-router')()
  , json = require('koa-json')
  , logger = require('koa-logger')// 引入各种依赖
  , auth = require('./server/routes/auth.js')
  , api = require('./server/routes/api')
  , jwt = require('koa-jwt');

const secret = 'vue-koa-demo-kaden';

const port = 8082;

app.use(require('koa-bodyparser')())
  .use(json())
  .use(logger())
  .use(function* (next){
    let start = new Date;
    yield next;
    let ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms); // 显示执行的时间
  });

app.use(function *(next) {
  try{
    yield next;
  }catch (e) {
    if(401 ==e.status){
      this.status = 401;
      this.body = {
        success:false,
        token: null,
        info: 'protected resource, use Authorization header to get access'
      }
    }else{
      throw e;
    }
  }
})

app.on('error', function(err, ctx){
  console.log('server error', err);
});
koa.use('/auth', auth.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
koa.use("/api",api.routes())//所有/api/打头的请求都要经过jwt中间件的验证，secret秘钥必须跟当初签发的secret一致

app.use(koa.routes()); // 将路由规则挂载到Koa上。

app.listen(port,() => {
  console.log(`server in port http://localhost:${port}`);
});

module.exports = app;
