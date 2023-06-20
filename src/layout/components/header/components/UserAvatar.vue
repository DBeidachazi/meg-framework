<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div flex cursor-pointer items-center>
<!--      <img src="http://tva1.sinaimg.cn/large/006Hj19Tly1hf4ppw4i52j30oe0mxn5d.jpg" mr10 h-35 w-35 rounded-full />-->
      <img :src="userStore.avatar" mr10 h-35 w-35 rounded-full />
<!--      <span>{{ userStore.name }}</span>-->
      <span>{{ name }}</span>
    </div>
  </n-dropdown>
</template>

<script setup>
import { useUserStore } from '@/store'
import { renderIcon } from '@/utils'
import { useStore } from '@/store/modules/store'

const userStore = useUserStore()
const store = useStore()

const name = localStorage.getItem('username')

const options = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:exit-to-app', { size: '14px' }),
  },
]

function handleSelect(key) {
  if (key === 'logout') {
    $dialog.confirm({
      title: '提示',
      type: 'info',
      content: '确认退出？',
      confirm() {
        userStore.logout()
        $message.success('已退出登录')
      },
    })
  }
}
</script>
