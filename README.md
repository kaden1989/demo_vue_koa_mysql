# demo

> A Vue.js project  
> 技术实现 VUE + KOA + MySQL  
> 项目地址 https://github.com/kaden1989/demo_vue_koa_mysql.git
## 一、前端服务

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


## 二、服务端
1.启动
```
  终端输入 node app.js 启动服务端
```
## 三、目录结构
```
│  app.js  服务端启动文件
│  index.html 启动页面
│  package-lock.json
│  package.json 
│  README.md
│  
├─build 打包工具
│      build.js
│      check-versions.js
│      logo.png
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│      
├─config
│      dev.env.js
│      index.js
│      prod.env.js
│      
├─server 服务端
│  ├─config 配置文件（数据库配置）
│  │      db.js
│  │      
│  ├─controllers 控制层
│  │      todolist.js
│  │      user.js
│  │      
│  ├─models 
│  │      todolist.js
│  │      user.js
│  │      
│  ├─routes 路由层
│  │      api.js
│  │      auth.js
│  │      index.js
│  │      
│  └─schema 数据库表结构
│          list.js
│          user.js
│          
├─src 前端
│  │  App.vue 
│  │  main.js
│  │  
│  ├─assets 静态文件
│  │      logo.png
│  │      
│  ├─components 页面
│  │      HelloWorld.vue
│  │      Login.vue
│  │      Logout.vue
│  │      Regeiste.vue
│  │      test.vue
│  │      TodoList.vue
│  │      
│  └─router 路由
│          api.js
│          index.js
│          
└─static
        .gitkeep
     
```

