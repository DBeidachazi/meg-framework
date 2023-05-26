const Layout = () => import('@/layout/index.vue')

export default {
  name: 'CRUD',
  path: '/',
  component: Layout,
  meta: {
    order: 2
  },
  children: [
    {
      name: 'crud',
      path: 'crud',
      component: () => import('./index.vue'),
      meta: {
        title: 'CRUD',
        icon: 'mdi:table',
      },
    },
  ],
}
