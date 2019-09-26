const app = require('koa')()
  , json = require('koa-json')
  , logger = require('koa-logger')// 引入各种依赖
  ,routers = require('./server/routes/index');

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

app.use(routers); // 将路由规则挂载到Koa上。

app.listen(port,() => {
  console.log(`server in port http://localhost:${port}`);
});

module.exports = app;
