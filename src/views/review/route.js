const Layout = () => import('@/layout/index.vue')

export default {
  name: 'review',
  path: '/',
  component: Layout,
  meta: {
    order: 3,
  },
  children: [
    {
      name: 'review',
      path: 'review',
      component: () => import('./index.vue'),
      meta: {
        title: '阅片',
        icon: 'mdi:eye',
      }
    }
  ]
}
