<template>
  <n-card title="注册" style="width: 100%; height: 100%; margin: 0;">
    <n-form :model="form" :rules="rules" ref="formRef" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start;">
      <n-form-item style='width: 80%' label="用户名" path="username">
        <n-input v-model:value="form.username" />
      </n-form-item>
      <n-form-item style='width: 80%' label="密码" path="password">
        <n-input v-model:value="form.password" type="password" />
      </n-form-item>
      <n-form-item style='width: 80%' label="姓名" path="name">
        <n-input v-model:value="form.name" />
      </n-form-item>
      <n-form-item style='width: 80%' label="电话号码" path="number">
        <n-input v-model:value="form.number" />
      </n-form-item>
      <n-button @click="submit">提交</n-button>
    </n-form>
  </n-card>
</template>


<script setup>
  import { useMessage } from 'naive-ui'
  import { ref } from 'vue'
  import { router } from '@/router'

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
    fetch('http://localhost:8009/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    }).then(res => res.json()).then(data => {
      // 处理响应数据
      console.log(data)
      router.push('/admin_page')
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

