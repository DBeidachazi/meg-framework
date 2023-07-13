<template>
  <div mt-20 f-c-c style='flex-direction: column'>
    <div>
      <span>123</span><n-input mt-20 v-model:value="a" type="text" placeholder="邮箱" style='width: 150rem'/>
    </div>
    <div>
      <span>123</span><n-input mt-20 v-model:value="a" type="text" placeholder="邮箱" style='width: 150rem'/>
    </div>
    <div>
      <span>123</span><n-input mt-20 v-model:value="a" type="text" placeholder="邮箱" style='width: 150rem'/>
    </div>
    <div>
      <span>123</span><n-input mt-20 v-model:value="a" type="text" placeholder="邮箱" style='width: 150rem'/>
    </div>
    <n-button mt-20 @click='submit'> 123</n-button>
  </div>
</template>

<script setup>
let a = ref('')


const submit = () => {
  console.log(a.value)
}

</script>