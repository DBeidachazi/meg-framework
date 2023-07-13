<template>
  <n-list mt-20>
    <n-list-item>
      <n-thing title="登录密码" description="已设置，密码至少六位字符，支持数字、字母和除空格外的特殊字符，且必须同时包含数字和大小写字母" />
      <template #suffix>
        <n-button @click='changeDialog("password")'>修改</n-button>
      </template>
    </n-list-item>
    <n-list-item>
      <n-thing title="密保问题" description="密保问题可以有效的保护账号的安全" />
      <template #suffix>
        <n-button @click='changeDialog("question")'>修改</n-button>
      </template>
    </n-list-item>
    <n-list-item>
      <n-thing title="安全手机" :description="props.phonenumber" />
      <template #suffix flex>
        <n-button @click='changeDialog("phone")'>修改</n-button>
      </template>
    </n-list-item>
    <n-list-item>
      <n-thing title="安全邮箱" :description="props.email" />
      <template #suffix>
        <n-button @click='changeDialog("email")'>修改</n-button>
      </template>
    </n-list-item>
  </n-list>
</template>

<script setup>
import { h, onMounted } from 'vue'
import { useDialog, NInput } from 'naive-ui'

const dialog = useDialog()

const inputValue = ref('')
const getVNode = () => {

  return h(
    NInput,
    {
      vModel: inputValue,
    }
  )
}

const changeDialog = (msg) => {
  const inputRef = ref('')
  switch (msg){
    case "password":
      dialog.info({
        title: '修改密码',
        content: getVNode.bind(null, inputRef),
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          console.log(inputRef.value.value)
        },
        onNegativeClick: () => {
          console.log(inputRef.value.value)
        }
      })
      break
    case "question":
      dialog.info({
        title: '修改密保问题',
        content: '修改密保问题',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          console.log('positive')
        },
        onNegativeClick: () => {
          console.log('negative')
        }
      })
      break
    case "phone":
      dialog.info({
        title: '修改安全手机',
        content: '修改安全手机',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          console.log('positive')
        },
        onNegativeClick: () => {
          console.log('negative')
        }
      })
      break
    case "email":
      dialog.info({
        title: '修改安全邮箱',
        content: '修改安全邮箱',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          console.log('positive')
        },
        onNegativeClick: () => {
          console.log('negative')
        }
      })
      break
  }
}

const props = defineProps({
  phonenumber: String,
  email: String,
})

onMounted(() => {
  console.log(props)
})
</script>