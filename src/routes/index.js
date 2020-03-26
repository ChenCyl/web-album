import Vue from 'vue'
import VueRouter from 'vue-router'
import layouts from '../layouts'
import login from './login'
import album from './album'
import Page404 from './404/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layouts.DefaultLayout,
    children: [
      login,
      album
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
