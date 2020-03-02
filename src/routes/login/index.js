import layouts from '@/layouts'

export default {
  path: 'login',
  component: layouts.LoginLayout,
  children: [
    {
      path: 'index',
      name: 'login-index',
      component: () => import(/* webpackChunkName: "login" */ './login')
    },
    {
      path: 'register',
      name: 'login-register',
      component: () => import(/* webpackChunkName: "login" */ './register')
    },
    {
      path: 'forget-password',
      name: 'forget-password',
      component: () => import(/* webpackChunkName: "login" */ './forget-password')
    }
  ]
}
