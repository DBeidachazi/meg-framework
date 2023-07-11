<template>
  <!--  todo 布局可能会修改-->

  <n-card rounded-10 mx-5 h-150 embedded >
  <div style="display: flex; justify-content: space-between; height: 100%;">
    <div style="display: flex; flex-direction: column; justify-content: space-between;">
      <div style="font-size: 20px; font-weight: bold">{{ props.title }}</div>
      <div style="font-size: 18px; position: relative; top: -4rem">{{ props.value }}</div>
<!--      position: relative; top: -1rem-->
    </div>
    <!-- todo 删除背景和边框 -->
    <div h-80 w-100 bg-white style="display:flex; border: 1px solid white; transform:scale(1.7);position: relative;top: 4rem;right: 4rem">
      <vue3-lottie :animation-data="props.lottie" style="width: 100%; height: 100%; object-fit: contain;" />
    </div>
  </div>
</n-card>


  <!--  <n-card rounded-10 mr-10 h-120-->
  <!--          :title='props.title'-->
  <!--          embedded-->
  <!--  >-->

  <!--    <div flex justify-between>-->
  <!--      <span  style='font-size: 6rem' block w-250>-->
  <!--        {{props.value}}-->
  <!--      </span>-->
  <!--&lt;!&ndash;      <n-avatar :size="65" :src="props.imgurl" style="position: relative;bottom: 9rem"/>&ndash;&gt;-->
  <!--      <vue3-lottie :animation-data='props.lottie' style='position: relative; bottom: 16rem; width: 60%'/>-->
  <!--    </div>-->
  <!--  </n-card>-->
</template>

<script setup lang='ts'>
import { Vue3Lottie } from 'vue3-lottie'

const props = defineProps({
  title: String,
  value: String,
  imgurl: String,
  lottie: Object,
})

</script>