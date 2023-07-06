<template>
  <n-card rounded-10 mr-10 h-120
          :title='props.title'
          embedded
  >
    {{props.value}}
  </n-card>
</template>

<script setup lang='ts'>

const imgUrl:string = 'http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image'
const props = defineProps({
  title: String,
  value: Number,
})
</script>