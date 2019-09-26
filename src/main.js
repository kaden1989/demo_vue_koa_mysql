// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant);

Vue.prototype.$http = Axios// 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等

Vue.config.productionTip = false
/* eslint-disable no-new */

const app = new Vue({
  router:router,
  render: h => h(App)
}).$mount('#app')//挂载到id为app的元素上
