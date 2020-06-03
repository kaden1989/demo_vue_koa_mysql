# 项目笔记
> 记录一下项目中所遇见的问题及解决方案

## 一、项目开发思路
  ### 该工程只是简单的实现了全栈思路，即打通前后端实现业务整体闭环。
    
  #### 1. 前端
    前端采用VUE作为前端框架，还涉及vue-router和axios的开发
  #### 2. 后台
    服务端主要采用KOA框架
  #### 3. 数据库
    数据采用MySql
    

## 二、问题及方法
  #### 1、 跨域问题
  前后端接口请求一般都存在跨域问题，解决接口跨域请求用的是proxyTable配置，在config/index中对proxyTable属性进行配置，使webpack代理转发给服务端，从而实现同域请求
  配置思路是将通用中间件，比如/auth 和/api等接口前置中间件请求代理到服务器端口（8082）
  
  关于跨域问题，还有其他一些解决方案，如jsonp、cros等
  
  #### 2、 数据库操作
  本项目的node端操作数据库采用了Sequelize（它支持多种关系型数据库，如Sqlite、MySQL、Postgres等），它的操作基本都能返回一个Promise对象，这样在node端操作起来会方便很多
  >关于Sequelize的用法，可参考:[官方文档](https://sequelize.org/master/) | [Sequelize 中文API文档](https://itbilu.com/nodejs/npm/VkYIaRPz-.html) | [Sequelize 和 MySQL 对照](https://segmentfault.com/a/1190000003987871)  

在用Sequelize连接数据库之前我们需要把数据库的表结构用sequelize-auto导出来。
>更多关于sequelize-auto的使用可以参考[官方文档](https://github.com/sequelize/sequelize-auto)或者[sequelize-auto从数据库表自动生成Sequelize模型(Model)](https://itbilu.com/nodejs/npm/41mRdls_Z.html)  

由此我们需要分别安装这几个依赖：npm install sequelize-auto && npm install sequelize mysql。
>注：上面安装是nodejs环境下的mysql驱动。

##### 具体操作如下
1. 进入server的目录，执行如下语句sequelize-auto -o "./schema" -d todolist -h 127.0.0.1 -u root -p 3306 -x XXXXX -e mysql，（其中 -o 参数后面的是输出的文件夹目录， -d 参数后面的是数据库名， -h 参数后面是数据库地址， -u 参数后面是数据库用户名， -p 参数后面是端口号， -x 参数后面是数据库密码，这个要根据自己的数据库密码来！ -e 参数后面指定数据库为mysql）
2. 然后就会在schema文件夹下自动生成两个文件：list.js 和 user.js。这两个文件是自动生成的表结构文件，省去了自己定义表结构的时间。
3. 连接数据库的配置在config/db.js中，主要还是利用 Sequelize来进行连接的配置
4. 建立models文件夹用来连接数据库和表结构文件，也就是定义查询方式
5. 在控制层（controllers）连接路由和数据库，也就是根据业务用来调用models中的操作（增删改查）

>注意，在models中对数据库应该是实时操作的，但是sequelize中返回的是Promise对象，即IO操作是异步的。如果又想用同步的写法获取异步IO操作得到的数据的话，通常情况下是不能直接得到的。但是在Koa里，由于有[co](https://github.com/tj/co)的存在，让这一切变得十分简单。  
注意，function* 和 yield的关系。

#### 3、登录验证
>本项目的登录验证采用了 JSON-WEB-TOKEN 模式（无状态登录） 参考文档：[Node 实作jwt 验证API](https://segmentfault.com/a/1190000005783306#item-9)
 
基本思路如下：  
  1. 用户在客户端输入用户名、密码，将账号、密码（加密MD5）发送给后端
  2. 后端程式验证用户信息，如果通过则下发一个token给客户端，否则，不发放token并返回错误信息
  3. 用户登录成功，客户端通过缓存（sessionStorage、LocalStorage）存储token，之后在请求其他资源时在请求头（Header）里带上
  这个token
  4. 后端接受请求，先验证一下token是否有效，有效则下发资源，否则返回错误信息

使用方法也很简单  
  1. install koa-jwt ,安装JWT库
  2. 当用户登录成功时，签发token并在登录成功接口一并返给客户端
  3. 客户端把token缓存起来，并在每次请求前加上
  4. 后端验证token，并不是所有请求都进行验证，例如登录接口就不需要验证，所以要根据不同路由做验证处理
  
#### 4、项目部署
  1. 静态资源托管  
  将vue和koa完全结合起来需要webpack将vue进行打包成静态资源，然后将打包后的的静态文件给koa进行托管
      。  
      这里存在一个前后端路由不匹配的问题，简单来说是因为我们使用了前端路由，用了HTML5 的History模式，如果没有做其他任何配置的话，刷新页面，那么浏览器将会去服务端访问这个页面地址，因为服务端并没有配置这个地址的路由，所以自然就返回404 Not Found了。  
      该怎么解决？其实也很简单，多加一个中间件：koa-history-api-fallback即可.参考文档 [vue-router](https://router.vuejs.org/zh/guide/essentials/history-mode.html)  
  >在本项目中尝试，还没解决，还需研究
  
  2.Nginx配置  
  
    http {
      upstream koa.server{
        server 127.0.0.1:8889;
      }
    
      server {
        listen   80;
        server_name xxx.xxx.com;
    
        location / {
          proxy_pass http://koa.server;
          proxy_redirect off;
        }
    
       ....
      }
     ....
    }
    
    
#### 5. 仍存在的问题
  
  1. koa托管前端静态资源时，history模式下的路由问题
  2. 后端需添加token验证逻辑
  3. 前端目前逻辑较简单，还需对vue框架的具体深入实践
