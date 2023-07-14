const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Readme',
  path: '/',
  component: Layout,
  meta: {
    order: 21,
    role: ['editor'],
    requireAuth: true
  },
  children: [
    {
      name: 'Readme',
      path: 'readme',
      component: () => import('./readme.vue'),
      meta: {
        title: '说明',
        icon: 'mdi:book',
      }
    }
  ]
}