import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import TodoList from '@/components/TodoList'
import regeiste from '@/components/regeiste'

Vue.use(Router)

const routes = [
//将根URL加入到路由表并声明对应Hello组件.
//   { path: '/', component: HelloWorld },
  {path:'/', component:Login},
  {path:'/regeiste', component:regeiste},
  {path:'/todoList', component:TodoList},
]
// 创建路由器实例，并且传入`routes`变量作为路由。
// 你还可以传入别的参数，不过在这里尽量简单化就可以了
const router = new Router({
  routes,
  mode: 'history',//开启H5的history模式，可以让地址栏的url和正常页面跳转的url一样
  base: __dirname,
})

router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('demo-token');
  if(to.path == '/'){
    if(token != null && token !='null'){
      next('/todoList')
    }
    next();
  }else if(to.path == '/regeiste'){
    next();
  }else{
    if(token != null && token !='null'){
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;//全局设定header的token验证
      next()
    }else{
      next('/');
    }
  }
})
export default router;
