import layouts from '@/layouts'

export default {
  path: '',
  component: layouts.AuthorisedLayout,
  children: [
    {
      path: 'photo',
      name: 'photo',
      redirect: 'photo/all',
      component: layouts.DefaultLayout,
      meta: { title: '照片', icon: 'el-icon-picture-outline' },
      children: [
        {
          path: 'all',
          name: 'photo-all',
          component: () => import(/* webpackChunkName: "home" */ './photo/all'),
          meta: { title: '所有照片', icon: 'el-icon-receiving' }
        },
        {
          path: 'unpacked',
          name: 'photo-unpacked',
          component: () => import(/* webpackChunkName: "home" */ './photo/unpacked'),
          meta: { title: '未整理', icon: 'el-icon-news', group: "筛选" }
        },
        {
          path: 'date/:id', //TODO:
          name: 'photo-date',
          component: () => import(/* webpackChunkName: "home" */ './photo/date'),
          meta: { title: '拍摄日期', icon: 'el-icon-date' }
        },
        {
          path: 'camera',
          name: 'photo-camera',
          component: () => import(/* webpackChunkName: "home" */ './photo/camera'),
          meta: { title: '照相机', icon: 'el-icon-camera' }
        },
        {
          path: 'rate',
          name: 'photo-rate',
          component: () => import(/* webpackChunkName: "home" */ './photo/rate'),
          meta: { title: '等级', icon: 'el-icon-star-off' }
        }
      ]
    },
    {
      path: 'album',
      name: 'album',
      redirect: 'album/all',
      component: layouts.DefaultLayout,
      meta: { title: '相册', icon: 'el-icon-files' },
      children: [
        {
          path: 'all',
          name: 'album-all',
          component: () => import(/* webpackChunkName: "home" */ './album/all'),
          meta: { title: '所有相册', icon: 'el-icon-receiving' }
        }
      ]
    }
  ]
}
