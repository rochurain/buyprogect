import Vue from 'vue'
import App from './App.vue'
//导入首页的组件
import VueRouter from "vue-router";
import Index from "./components/index.vue";
import ProductDetail from "./components/productDetail.vue";
import shoppingCart from "./components/03.shoppingCart.vue";
import login from "./components/04.login.vue";
import FillOrder from "./components/05.fillOrder.vue";
import PayOrder from "./components/06.payOrder.vue";

import moment from "moment"
//使用vue组件
import Vuex from 'vuex'
Vue.use(Vuex)

import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// Vue.config.productionTip = false
import VueLazyload from 'vue-lazyload'

//商品放大镜效果
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

//引入吸顶效果
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import axios from "axios";

//跨域请求时 是否携带 凭证(cookie),默认的axios发送请求是不携带cookie的
axios.defaults.withCredentials = true;
//增加到vue的原型中
Vue.prototype.$axios = axios;

//实现懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error:require('./statics/site/imgs/erro.jpg'),
  loading: require('./assets/img/loading.gif'),
  attempt: 1
})
Vue.use(VueRouter);
//定义路由规则 
let routes = [{
    path: "/",
    redirect: '/index'
  },
  {
    path: "/index",
    component: Index,
  },
  {
    path: "/goodsInfo/:id",
    component: ProductDetail,
  },
  {
    path: "/shoppingCart",
    component: shoppingCart,
  },
  // 登录页路由
  {
    path: "/login",
    component: login,
  },

  //我的购物车详情路由
  {
    path: '/order/:ids',
    component: FillOrder,
    meta:{
      checkLogin:true
    }
  },
  //跳转到订单资料路由
  {
    path: '/payOrder/:orderid',
    component: PayOrder,
    meta:{
      checkLogin:true
    }
  }

]

//实例化路有对象
let router = new VueRouter({
  routes
})

//增加导航守卫
router.beforeEach((to, from, next) => {
  console.log(from)
  //下面的判断也可以,但是每次还要检测地址栏的地址关键字
  // if(to.path.indexOf("/order/")!=-1){
  //路由元信息,需要做登录判断的会进行如下登录判断
  if(to.meta.checkLogin==true){

    axios.get(`http://47.106.148.205:8899/site/account/islogin`)
    .then(response=>{
      if(response.data.code!="nologin"){
        next();
      }
      else{
        next("/login")
      }
    })
  }else{
    next();
  };
  //登陆后返回上一页
  store.commit('jumpBack',from.path)
  
})

//
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartDate: JSON.parse(window.localStorage.getItem("goodKey")) || {},
    isLogin:false,
    //存储页面跳转上一页地址
    fromPath:'',
  },
  mutations: {
    addGoods(state, goodInfo) {
      console.log(goodInfo)
      // state.count+=n
      if (state.cartDate[goodInfo.goodId] == undefined) {
        Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum);
      } else {
        // 传过来的id 已经存在 累加
        state.cartDate[goodInfo.goodId] += goodInfo.goodNum;
      }
    },
    //点击计数器变更使购物车数量同步
    updateGoodsNum(state, goodInfo) {
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
    },
    //点击删除使购物车数量同步
    deleteGoods(state, goodId) {
      Vue.delete(state.cartDate, goodId);
    },
    //登录状态显示
    changeShowStatus(state,isLogin){
      state.isLogin=isLogin;
    },
    // 登陆后返回对应的上一页
    jumpBack(state,fromPath){
      state.fromPath=fromPath;
    }


  },
  // getters vuex的计算属性
  getters: {
    goodsCount: state => {
      // 临时num
      let num = 0;
      //  循环数据对象
      for (const key in state.cartDate) {
        // console.log(key);
        num += state.cartDate[key]
      }
      // 累加总数
      // 返回总数
      return num;
    }
  }
})

//浏览器页面关闭的时候,存储购买的数量记录:
window.onbeforeunload = function () {
  window.localStorage.setItem('goodKey', JSON.stringify(store.state.cartDate))
}
//挂在到Vue实例上去
//定义全局格式化事件插件
// Vue.filter('capitalize', filterDate(val) {
//   return moment(val).format("YYYY年MM月DD日");
// })
Vue.filter('filterDate', function (value) {
  return moment(value).format("YYYY年MM月DD日");
})
new Vue({
  store,
  render: h => h(App),
  router,
  beforeCreate(){
    axios.get(`http://47.106.148.205:8899/site/account/islogin`)
    .then(response=>{
      if(response.data.code=="logined"){
        store.state.isLogin=true;
      }else{
      }
    })
  }
  
}).$mount('#app')