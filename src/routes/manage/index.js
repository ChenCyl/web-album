import layouts from '@/layouts'

export default {
  path: 'manage',
  component: layouts.ManageLayout,
  children: [
    {
      path: 'share',
      name: 'manage-share',
      component: () => import('./share')
    },
    {
      path: 'setting',
      name: 'manage-setting',
      component: () => import('./setting')
    }
  ]
}
