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
import { h, onMounted, ref } from 'vue'
import { useDialog, NInput } from 'naive-ui'
import api from '@/views/api/index'
const { getDoctorInfo, updateDoctorInfo, changePassword, changePhoneNumber, changeEmail } = api
const dialog = useDialog()

const did = localStorage.getItem('username')
const userInfo = ref({})

onMounted(async() => {
  await getBasicSettingDoctorInfo()
})

const emit = defineEmits(['submit'])



const getBasicSettingDoctorInfo = async() => {
  const {data} = await getDoctorInfo(did)
  userInfo.value = data
  console.log(userInfo.value)
  emit('submit')
}

const inputValue = ref('')
const password = ref({
  old_password: '',
  new_password: '',
  username: did
})
const email = ref({
  email: '',
  username: did,
  password: '',
})
const phoneNumber = ref({
  phonenumber: '',
  username: did,
  password: '',
})
const oldPassword = ref('')
const newPassword = ref('')
const getPasswordVNode = (inputRef) => {
  return [h(
    NInput,
    {
      modelValue: inputValue,
      type: 'password',
      placeholder: "旧密码",
      onInput: (value) => {
        password.value.old_password = value
      },
    }
  ),
    h(
      NInput,
      {
        modelValue: inputValue,
        type: 'password',
        placeholder: "新密码",
        style: { marginTop: '20px'},
        onInput: (value) => {
          password.value.new_password = value
        },
      }
    ),
  ]
}

const questionVNode = () => {
  return h(
    NInput,
    {
      modelValue: inputValue,
      type: 'text',
      placeholder: "请填写密保",
      onInput: (value) => {
        password.value.old_password = value
      },
    }
  )
}
const phoneVNode = () => {
  return [h(
    NInput,
    {
      modelValue: inputValue,
      type: 'password',
      placeholder: "密码",
      onInput: (value) => {
        phoneNumber.value.password = value
      },
    }
  ),
    h(
      NInput,
      {
        modelValue: inputValue,
        type: 'text',
        placeholder: "手机号",
        style: { marginTop: '20px'},
        onInput: (value) => {
          phoneNumber.value.phonenumber= value
        },
      }
    ),
  ]
}
const emailVNode = () => {
  return [h(
    NInput,
    {
      modelValue: inputValue,
      type: 'password',
      placeholder: "密码",
      onInput: (value) => {
        email.value.password = value
      },
    }
  ),
    h(
      NInput,
      {
        modelValue: inputValue,
        type: 'text',
        placeholder: "邮箱",
        style: { marginTop: '20px'},
        onInput: (value) => {
          email.value.email = value
        },
      }
    ),
  ]
}

const changeDialog = (msg) => {
  const inputRef = ref('')
  switch (msg){
    case "password":
      dialog.info({
        title: '修改密码',
        content: getPasswordVNode.bind(null, inputRef),
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async() => {
          const {data}= await changePassword(password.value)
          if (data.code === 200) {
            $message.success(data.msg)
          } else {
            $message.error(data.msg)
          }
        },
        onNegativeClick: () => {}
      })
      break
    case "question":
      dialog.info({
        title: '修改密保问题',
        content: questionVNode.bind(null, null),
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          $message.success('修改成功')
        },
        onNegativeClick: () => {
          console.log('negative')
        }
      })
      break
    case "phone":
      dialog.info({
        title: '修改安全手机',
        content: phoneVNode.bind(null, null),
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async() => {
          const {data} = await changePhoneNumber(phoneNumber.value)
          console.log(data)
          if (data.code === '0') {
            $message.success("修改成功")
            emit('submit')
          } else {
            $message.error("修改失败")
          }
        },
        onNegativeClick: () => {
        }
      })
      break
    case "email":
      dialog.info({
        title: '修改安全邮箱',
        content: emailVNode.bind(null, null),
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async() => {
          console.log(email.value)
          const {data} = await changeEmail(email.value)
          console.log(data)
          if (data.status === 'success') {
            $message.success("修改成功")
            emit('submit')
          } else {
            $message.error("修改失败")
          }
        },
        onNegativeClick: () => {
        }
      })
      break
  }
}

const props = defineProps({
  phonenumber: String,
  email: String,
})

</script>