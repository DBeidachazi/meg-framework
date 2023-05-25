const Layout = () => import('@/layout/index.vue')

export default {
  name: 'upload',
  path: '/',
  component: Layout,
  meta: {
    order: 2,
  },
  children: [
    {
      name: 'upload',
      path: 'upload',
      component: () => import('./index.vue'),
      meta: {
        title: '上传文件',
        icon: 'mdi:file',
      }
    }
  ]
}