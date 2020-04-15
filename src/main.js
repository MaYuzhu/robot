// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { message } from './utils/resetMessage'

Vue.use(ElementUI)
// 命名根据需要，DonMessage只是在文章中使用
Vue.prototype.$message = message

//import store from './store'

import "babel-polyfill"  //兼容IE9
import 'es6-promise/auto'  //兼容IE9
import 'jquery'
import ros from '../static/js/roslib.min.js'
Vue.use(ros)
import base from './base'
Vue.use(base)
/*import table2excel from './excel'
Vue.use(table2excel)*/

// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图/柱状图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')//图例滚动
//import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.qs = qs
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 添加请求拦截器，在请求头中加token
/*axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      //config.headers.Authorization = localStorage.getItem('Authorization');
      config.headers.token = localStorage.getItem('token');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });*/

/*axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem("token");  //从缓存中取token
  if (token) {
    config.headers.token = token;    //将token放到请求头发送给服务器

    //这里主要是为了兼容IE9
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    if (browser == 'Netscape' && b_version.indexOf(';') < 0) {  //火狐


    } else {
      if (b_version.indexOf(';') < 0) {
        return config;
      }
      var version = b_version.split(";");
      var trim_Version = version[1].replace(/[ ]/g, "");


      if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {  //IE9
        if (config.url.indexOf('?') > 0) {
          config.url = config.url + "&token=" + JSON.parse(token).value;
        }
        else {
          config.url = config.url + "?token=" + JSON.parse(token).value;
        }
      }
    }
  } else {
    localStorage.clear();  //清空缓存
    if (router.currentRoute.name && router.currentRoute.name.toLowerCase() == "login") {
      //这里需要排除登陆(或者说是第一次请求获取token)的时候的请求验证，我这里没做处理
      //我的后台api接口，并没有对login接口做token验证，所以这里不做处理
    } else {
      //除登陆接口外，其他需要token验证的方法，会走这里且返回null
      return null;
    }
  }
  return config;
}, function (err) {
  // return Promise.reject(err);
});*/


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //store,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})
