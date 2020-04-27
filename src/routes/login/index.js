import layouts from '@/layouts'

export default {
  path: '',
  component: layouts.LoginLayout,
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './login')
    },
    {
      path: 'register',
      name: 'register',
      component: () => import(/* webpackChunkName: "login" */ './register')
    }
  ]
}
