<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppProvider>

  <div v-if="store.requestShadow">
<!--    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; background: #eee; opacity: 0.5;"></div>-->
    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; background: #484848; opacity: 0.5;"></div>
    <div style="display: flex; flex-direction: column; ;width: 100%; height: 100%;font-size:50px; text-align:center; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999;">
<!--      <span style='color: black; font-size: larger'>widjoasefjioawjfioafjoiaesjfoiasjefios</span>-->
<!--      <div style='width: 50%; height: 50%'>-->
        <vue3-lottie :animationData='LottieJson'/>
        <i class="fa fa-spinner fa-spin" style="margin-bottom: 15%; margin-top: 5%">{{ store.shadowSpan }}</i>
<!--      </div>-->

    </div>
</div>

</template>

<script setup>
import { useStore } from '@/store/modules/store'
import AppProvider from '@/components/common/AppProvider.vue'
import { Vue3Lottie } from 'vue3-lottie'
import LottieJson from '@/assets/lottie/gear-loader.json'

const store = useStore()

// test

// setTimeout(() => {
//   store.turnOnShadow('预测中，请耐心等待...')
//   setTimeout(() => {
//       setTimeout(() => {
//         store.turnOffAndFailed('预测失败')
//         // store.turnOffAndSuccess('预测成功')
//       }, 1000)
//   })
// }, 2000)
</script>
