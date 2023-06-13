const Layout = () => import('@/layout/index.vue')

export default {
  name: 'AdminPage',
  path: '/',
  component: Layout,
  meta: {
    order: 11,
    role: ['admin'],
    requireAuth: true
  },
  children: [
    {
      name: 'AdminPage',
      path: 'admin_page',
      component: () => import('./admin.vue'),
      meta: {
        title: 'AdminPage',
        icon: 'mdi:hammer'
      }
    }
  ]
}