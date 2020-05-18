import router from './routes'
import store from './store'
import { Message } from 'element-ui'
// // import NProgress from 'nprogress' // progress bar
// // import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// // NProgress.configure({ showSpinner: false }) // NProgress Configuration

// NOTE: router name
const whiteList = ['login', 'register', 'share', 'errorPage'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  // NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  if (whiteList.indexOf(to.name) !== -1) {
    next()
  } else {
    try {
      console.log('store.getters.name',store.getters.name)
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        await store.dispatch('user/getUserInfo')
        next()
      }
    }
    catch(err) {
      console.log(err)
      next(`/login?redirect=${to.path}`)
    }
  }




  // const hasToken = getToken()
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     // NProgress.done()
  //   } else {
  //     console.log('store.getters.name',store.getters.name)
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getUserInfo')

  //         next()
  //       } catch (error) {
  //         // token 过期或被修改
  //         // remove token and go to login page to re-login
  //         // await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         // next(`/login?redirect=${to.path}`)
  //         // NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.name) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     // NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
