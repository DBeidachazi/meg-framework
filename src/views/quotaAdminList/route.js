const Layout = () => import('@/layout/index.vue')

export default {
  name: 'QuotaAdmin',
  path: '/quota_admin',
  component: Layout,
  redirect: '/quota_admin',
  meta: {
    title: '额度管理',
    order: 13,
    role: ['admin'],
    requireAuth: true,
    icon: 'mdi:application-settings-outline',
  },
  children: [
    {
      name: 'QuotaAdmin',
      path: 'quotaadmin',
      component: () => import('./quotaAdmin.vue'),
      meta: {
        title: '额度管理',
        icon: 'mdi:cup',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true
      }
    }
  ]
}