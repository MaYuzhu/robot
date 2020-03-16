// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.qs = qs
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      //config.headers.Authorization = localStorage.getItem('Authorization');
      config.headers.token = localStorage.getItem('token');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
