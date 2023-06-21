<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppProvider>

  <div v-if="store.requestShadow">
<!--    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; background: #eee; opacity: 0.5;"></div>-->
    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; background: #484848; opacity: 0.5;"></div>
    <div style="font-size:50px; text-align:center; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999;">
      <span style='color: black; font-size: larger'>widjoasefjioawjfioafjoiaesjfoiasjefios</span>
      <vue3-lottie :animationData='LottieJson' />
      <i class="fa fa-spinner fa-spin" style="margin-top:20%;"></i>
    </div>

  </div>

</template>

<script setup>
import { useStore } from '@/store/modules/store'
import AppProvider from '@/components/common/AppProvider.vue'
import { Vue3Lottie } from 'vue3-lottie'
import LottieJson from '@/assets/lottie/register_doctor_lottie.json'

const store = useStore()

// test
//
// setTimeout(() => {
//   store.turnOnShadow()
//   setTimeout(() => {
//       setTimeout(() => {
//         store.turnOffShadow()
//       }, 10000)
//   })
// }, 2000)
</script>
