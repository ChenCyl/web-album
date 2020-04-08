import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './routes'
import store from './store'
import '@/styles/index.scss'
import moment from 'moment'

import HeadTitle from '@/components/head-title'
import DetailDrawer from '@/components/detail-drawer'

// 全局组件
Vue.component('head-title', HeadTitle)
Vue.prototype.$detail = DetailDrawer

// 外部组件库
Vue.use(ElementUI)

// 全局方法
window.$moment = moment

Vue.config.productionTip = false

// 创建实例并赋值给 Bus
Vue.prototype.$bus = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
