<template>
    <div id='register'>
      <vue3-lottie :animationData='LottieJson' />
      <n-card id='card' title='Apply Doctor Account'>
        <n-form :model='form' :rules='rules' ref='formRef'
                style='display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start;'>
          <n-form-item class='n-form-item' label='用户名' path='username'>
            <n-input v-model:value='form.username' />
          </n-form-item>
          <n-form-item class='n-form-item' label='密码' path='password'>
            <n-input v-model:value='form.password' type='password' />
          </n-form-item>
          <n-form-item class='n-form-item' label='姓名' path='name'>
            <n-input v-model:value='form.name' />
          </n-form-item>
          <n-form-item class='n-form-item' label='电话号码' path='number'>
            <n-input v-model:value='form.number' />
          </n-form-item>
          <n-button style='margin-left: 24%; width: 50%; margin-bottom: 6%' @click='submit' type='primary'>提交</n-button>
        </n-form>
      </n-card>
    </div>
</template>

<style scoped>
.n-form-item {
  width: 80%;
  padding-left: 20%;
  height: 100%;
}

#register {
  display: flex;
  /* //flex-direction: column; */
  align-items: center;
  justify-content: center;
  min-height: 80%;
  /* //margin: auto; */
  margin: 6rem 6rem 6rem 6rem;
}

#card {
  border-radius: 20px;
}
</style>


<script setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'
import { router } from '@/router'
import { Vue3Lottie } from 'vue3-lottie'
import LottieJson from '@/assets/lottie/register_doctor_lottie.json'
import api from '@/views/api/index'
const { register } = api

const message = useMessage()

const form = ref({
  username: '',
  password: '',
  name: '',
  number: ''
})

const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度应在6到12位之间', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  number: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
})

const submit = () => {
  formRef.value.validate().then(() => {
    // 发送请求示例
    register(form.value, {
      headers: {
      'Content-Type': 'application/json'
    }
  })
      .then(data => {
        // 处理响应数据
        console.log(data)
        router.push('/admin_page')
        $message.success('注册成功')
      }).catch(err => {
      // 处理错误
        console.error(err)
      })
    }).catch(() => {
      // 表单验证失败
      message.error('表单验证失败')
    })
}

let formRef = ref(null)

</script>

