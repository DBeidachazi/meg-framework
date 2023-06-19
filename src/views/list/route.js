const Layout = () => import('@/layout/index.vue')

export default {
  name: 'patientList',
  path: '/',
  component: Layout,
  meta: {
    order: 4,
    requireAuth: true,
    role: ['editor']
  },
  children: [
    {
      name: 'patientList',
      path: 'list',
      component: () => import('./list.vue'),
      meta: {
        title: '病人信息',
        icon: 'mdi:table',
      }
    }
  ]
}