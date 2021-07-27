import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import router from '../router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VueRouter)

export default new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
