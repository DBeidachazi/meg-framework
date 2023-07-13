<template>
  <div style='padding: 3rem 3.75rem 0 3.75rem'>
    <n-card rounded-10 >
      <div flex items-center>
        <img :src='userStore.avatar' width='100' alt='' rounded-full>
        <div mx-150>
          <div>
            <span>用户名：{{ userInfo.username }}</span><br>
            <span>账号ID：{{ userInfo.id }}</span><br>
            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;名：{{ userInfo.nickname }}</span>
          </div>
        </div>
        <div>
          <span>实名认证：</span><n-tag type='success'>已认证</n-tag>
          <br>
          <span>手机号码：{{ userInfo.phonenumber }}</span>
        </div>
      </div>
    </n-card>
    <n-card mt-20 rounded-10 >
      <div id='button'>
        <n-button mx-20 strong secondary round :type="buttonTwoType" @click='changeToTwoPage'>基础信息</n-button>
        <n-button strong secondary round :type="buttonOneType" @click='changeToOnePage'>安全设置</n-button>
        <br>

        <basic-setting v-if='pageOne' :phonenumber='safePhone' :email='safeEmail'/>
        <safe-setting v-if='pageTwo' @submit='father'/>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store'
import { onMounted, ref } from 'vue'
const userStore = useUserStore()
import api from '@/views/api/index'
import SafeSetting from '@/views/personalCenter/safeSetting.vue'
import BasicSetting from '@/views/personalCenter/basicSetting.vue'
import { getIcon } from '@iconify/vue'
const { getDoctorInfo } = api

const username = localStorage.getItem('username')

let safeEmail = ref('')
let safePhone = ref('')

let pageOne = ref(false)
let pageTwo = ref(true)
let buttonOneType = ref("default")
let buttonTwoType = ref("info")

const changeToOnePage = () => {
  pageOne.value = true
  pageTwo.value = false
  buttonOneType.value = "info"
  buttonTwoType.value = "default"
}
const changeToTwoPage = () => {
  pageOne.value = false
  pageTwo.value = true
  buttonOneType.value = "default"
  buttonTwoType.value = "info"
}


let userInfo = ref({})
onMounted(() => {
  getInfo()
})

const getInfo = async() => {
  console.log(username)
  const {data} = await getDoctorInfo(username)
  console.log(data)
  userInfo.value = data

  safePhone.value = "已绑定：" + data.phonenumber
  safeEmail.value = "已绑定：" + data.email
}

const father = () => {
  getInfo()
}



</script>