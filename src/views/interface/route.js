const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Interface',
  path: '/',
  component: Layout,
  meta: {
    order: 14,
    role: ['admin'],
    requireAuth: true
  },
  children: [
    {
      name: 'Interface',
      path: 'interface',
      component: () => import('./interface.vue'),
      meta: {
        title: '接口文档',
        icon: 'mdi:web'
      }
    }
  ]
}