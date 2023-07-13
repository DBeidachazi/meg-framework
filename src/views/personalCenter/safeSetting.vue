<template>
  <div mt-20 f-c-c style='flex-direction: column'>
    <n-form :model='form'  ref='formRef'
            style='display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start;'>
      <n-form-item class='n-form-item' label='昵称' path='text' w-400>
        <n-input v-model:value='form.nickname' type='text' />
      </n-form-item>
      <n-form-item class='n-form-item' label='邮箱' path='text' w-400>
        <n-input v-model:value='form.email' />
      </n-form-item>
      <n-form-item class='n-form-item' label='国家/地区' path='text' w-400>
        <n-input v-model:value='form.regions' />
      </n-form-item>
      <n-form-item  class='n-form-item' label='个人简介' path='text' w-400>
        <n-input v-model:value='form.self_information' type='textarea'/>
      </n-form-item>
      <n-button style='margin-left: 24%; width: 50%; margin-bottom: 6%' @click='submit' type='primary'>提交</n-button>
    </n-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/views/api/index'
const { updateDoctorInfo } = api

const emit = defineEmits(['submit'])

const did = localStorage.getItem('username')

const form = ref({
  did: did,
  nickname: '',
  regions: '',
  self_information: '',
  email: ''
})

const submit = async() => {
  console.log(form.value)
  await updateDoctorInfo(form.value).then(res => {
    console.log(res)
  })
  emit('submit')
  $message.success("修改成功")

  form.value = {
    did: did,
    nickname: '',
    regions: '',
    self_information: '',
    email: ''
  }
}



</script>