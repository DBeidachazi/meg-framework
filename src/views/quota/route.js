const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Quota',
  path: '/quota',
  component: Layout,
  redirect: '/quota/myquota',
  meta: {
    title: '配额管理',
    order: 13,
    role: ['editor'],
    requireAuth: true,
    icon: 'mdi:application-settings-outline',
  },
  children: [
    {
      name: 'MyQuota',
      path: 'myquota',
      component: () => import('./myquota.vue'),
      meta: {
        title: '我的额度',
        icon: 'mdi:book',
        role: ['editor'],
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      name: 'Quota',
      path: 'quotanalysis',
      component: () => import('./quotanalysis.vue'),
      meta: {
        title: '额度分析',
        icon: 'mdi:book',
        role: ['editor'],
        requireAuth: true,
        keepAlive: true
      }
    }
  ]
}