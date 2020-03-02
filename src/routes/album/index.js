import layouts from '@/layouts'

export default {
  path: 'album',
  component: layouts.AuthorisedLayout,
  children: [
    {
      path: 'all-photos',
      name: 'all-photos',
      component: () => import(/* webpackChunkName: "ablum" */ './all-photos'),
      meta: { title: '所有照片' }
    }
  ]
}
