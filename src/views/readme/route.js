const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Readme',
  path: '/',
  component: Layout,
  meta: {
    order: 20,
    role: ['editor'],
    requireAuth: true
  },
  children: [
    {
      name: 'Readme',
      path: 'readme',
      component: () => import('./readme.vue'),
      meta: {
        title: '使用教程',
        icon: 'mdi:book',
      }
    }
  ]
}