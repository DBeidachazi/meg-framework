<template>
  <n-card rounded-10 mr-10 h-120
          :title='props.title'
          embedded
  >

    <div flex justify-between >
      <span  style='font-size: 6rem'>
        {{props.value}}
      </span>
      <n-avatar :size="65" :src="props.imgurl" style="position: relative;bottom: 9rem"/>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
const props = defineProps({
  title: String,
  value: String,
  imgurl: String,
})
onMounted(() => {
  console.log(props.imgurl)
  console.log(props)
})
</script>