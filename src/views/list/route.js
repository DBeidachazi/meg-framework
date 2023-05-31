const Layout = () => import('@/layout/index.vue')

export default {
  name: 'list',
  path: '/',
  component: Layout,
  meta: {
    order: 10,
  },
  children: [
    {
      name: 'list',
      path: 'list',
      component: () => import('./list.vue'),
      meta: {
        title: 'list',
        icon: 'mdi:file',
      }
    }
  ]
}