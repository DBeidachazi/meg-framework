const Layout = () => import('@/layout/index.vue')

export default {
  name: '个人中心',
  path: '/',
  component: Layout,
  meta: {
    order: 20,
    role: ['editor'],
    requireAuth: true
  },
  children: [
    {
      name: '个人中心',
      path: 'personal',
      component: () => import('./personal.vue'),
      meta: {
        title: '个人中心',
        icon: 'mdi:people',
      }
    }
  ]
}