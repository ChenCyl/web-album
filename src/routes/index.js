import Vue from 'vue'
import VueRouter from 'vue-router'
import layouts from '../layouts'
import login from './login'
import home from './home'
import Page404 from './404/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layouts.DefaultLayout,
    children: [
      home,
      login
    ]
  },
  {
    path: '*',
    name: 'errorPage',
    component: Page404
  }
]

const router = new VueRouter({
  routes
})

export default router
