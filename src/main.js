import Vue from 'vue'
import App from './App.vue'
//导入首页的组件
import VueRouter from "vue-router";
import Index from "./components/index.vue";

import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// Vue.config.productionTip = false



Vue.use(VueRouter); 
//定义路由规则 
let routes = [
  {
    path: "/",
    redirect:'/index'
  },
  {
    path: "/index",
    component: Index,
  },
]
  
//实例化路有对象
let router=new VueRouter({
  routes
})

//挂在到Vue实例上去
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
