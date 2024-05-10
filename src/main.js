import Vue from 'vue'
import App from './App.vue'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies, { expires: '1d'}) 

import'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './router'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
