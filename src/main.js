import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './routes'
import store from './store'
import '@/styles/index.scss'

import HeadTitle from '@/components/head-title'

// 全局组件
Vue.component('head-title', HeadTitle)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
