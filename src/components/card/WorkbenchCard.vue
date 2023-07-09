<template>
  <n-card rounded-10 mr-10 h-120
          :title='props.title'
          embedded
  >

    <div flex justify-between>
      <span  style='font-size: 6rem' block w-250>
        {{props.value}}
      </span>
<!--      <n-avatar :size="65" :src="props.imgurl" style="position: relative;bottom: 9rem"/>-->
      <vue3-lottie :animation-data='props.lottie' style='position: relative; bottom: 16rem; width: 60%'/>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import { Vue3Lottie } from 'vue3-lottie'

const props = defineProps({
  title: String,
  value: String,
  imgurl: String,
  lottie: Object,
})
onMounted(() => {
  console.log(props.imgurl)
  console.log(props)
})
</script>