// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Qs from 'qs'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'



axios.defaults.baseURL = 'http://10.13.1.112:3002';
Vue.prototype.axios = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false;


console.log('3213');


axios.interceptors.request.use(function (config) {
  config.withCredentials = true;
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  config.data = Qs.stringify(config.data);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  let httpData = response.data;
  if(httpData){
    return httpData
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
