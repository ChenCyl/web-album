import layouts from '@/layouts'

export default {
  path: 'home',
  component: layouts.AuthorisedLayout,
  children: [
    {
      path: 'all-photos',
      name: 'all-photos',
      component: () => import(/* webpackChunkName: "home" */ './all-photos'),
      meta: { title: '所有照片', icon: 'el-icon-location' },
      children: [
        {
          path: 'unpacked',
          name: 'unpacked',
          component: () => import(/* webpackChunkName: "home" */ './all-photos/unpacked'),
          meta: { title: '未整理', icon: 'el-icon-location' }
        },
        {
          path: 'date',
          name: 'date',
          component: () => import(/* webpackChunkName: "home" */ './all-photos/date'),
          meta: { title: '拍摄日期', icon: 'el-icon-location', group: '分类项' }
        },
        {
          path: 'camera',
          name: 'camera',
          component: () => import(/* webpackChunkName: "home" */ './all-photos/camera'),
          meta: { title: '照相机', icon: 'el-icon-location' }
        },
        {
          path: 'rate',
          name: 'rate',
          component: () => import(/* webpackChunkName: "home" */ './all-photos/rate'),
          meta: { title: '等级', icon: 'el-icon-location' }
        }
      ]
    },
    {
      path: 'album',
      name: 'album',
      component: () => import(/* webpackChunkName: "home" */ './album'),
      meta: { title: '相册', icon: 'el-icon-location' }
    }
  ]
}
