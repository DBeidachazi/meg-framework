const Layout = () => import('@/layout/index.vue')

export default {
  name: 'RegisterDoctor',
  path: '/',
  component: Layout,
  meta: {
    order: 12,
    role: ['admin'],
    requireAuth: true
  },
  children: [
    {
      name: 'RegisterDoctor',
      path: 'register_doctor',
      component: () => import('./register.vue'),
      meta: {
        title: 'Register',
        icon: 'mdi:human'
      }
    }
  ]
}