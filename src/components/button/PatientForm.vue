<template>
  <n-form :model="formModel" :rules="formRules">
    <n-form-item label="姓名" path="name">
      <n-input v-model:value="formModel.name" />
    </n-form-item>
    <n-form-item label="性别" path="sex">
      <n-select v-model:value="formModel.sex" :options="sexOptions" />
    </n-form-item>
    <n-form-item label="年龄" path="age">
      <n-input-number v-model:value="formModel.age" />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useStore } from '@/store/modules/store'
const store = useStore()
// store.setInformation(formModel.value)



// 表单数据模型
const formModel = reactive({
  name: '',
  sex: '',
  age: ''
})
watch(() => formModel, () => {
  store.setInformation(formModel)
}, {deep:true})
// 表单验证规则
const formRules = ref({
  name: {
    required: true,
    message: '请输入姓名'
  },
  sex: {
    required: true,
    message: '请选择性别'
  },
  age: {
    required: true,
    message: '请输入年龄',
    type: 'number',
    min: 0,
    max: 120
  }
})

// 性别选项
const sexOptions = ref([
  { label: '男', value: 'male' },
  { label: '女', value: 'female' }
])
</script>