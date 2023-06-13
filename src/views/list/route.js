const Layout = () => import('@/layout/index.vue')

export default {
  name: 'list',
  path: '/',
  component: Layout,
  meta: {
    order: 4,
    requireAuth: true,
    role: ['editor']
  },
  children: [
    {
      name: 'list',
      path: 'list',
      component: () => import('./list.vue'),
      meta: {
        title: 'list',
        icon: 'mdi:table',
      }
    }
  ]
}