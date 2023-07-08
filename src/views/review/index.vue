<template>

<div v-if="two" style="width: 100%;height: 100%;">
  <iframe :src=url frameborder='0' style='width: 50%; height: 100%'></iframe>
   <iframe :src=url frameborder='0' style='width: 50%; height: 100%'></iframe>
</div>

<iframe v-if="one" :src=url frameborder='0' style='width: 100%; height: 100%'></iframe>

</template>
<script setup>
import { useStore } from '~/src/store/modules/store/index';
const store = useStore()

let one = ref('')
let two = ref('')

onMounted(() => {
  if(store.reviewType === "one") {
    one.value = true
    two.value = false
  } else {
    one.value = false
    two.value = true
  }
})

let url = ref(import.meta.env.VITE_REACT_URL)
</script>