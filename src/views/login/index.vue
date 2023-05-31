<template xmlns:dark="http://www.w3.org/1999/xhtml" xmlns:md="http://www.w3.org/1999/xhtml">
  <AppPage :show-footer="true" bg-cover :style="{ backgroundImage: `url(${bgImg})` }">
    <div
      style="transform: translateY(25px)"
      class="m-auto max-w-700 min-w-345 f-c-c rounded-10 bg-white bg-opacity-60 p-15 card-shadow"
      dark:bg-dark
    >
      <div hidden w-380 px-20 py-35 md:block>
        <img src="@/assets/images/login_banner.webp" w-full alt="login_banner" />
      </div>

      <div w-320 flex-col px-20 py-35>
        <h5 f-c-c text-24 font-normal color="#6a6a6a">
          <icon-custom-logo mr-10 text-50 color-primary />{{ title }}
        </h5>
        <div mt-30>
          <n-input
            v-model:value="loginInfo.username"
            autofocus
            class="h-50 items-center pl-10 text-16"
            placeholder="admin"
            :maxlength="11"
          />
        </div>
        <div mt-30>
          <n-input
            v-model:value="loginInfo.password"
            class="h-50 items-center pl-10 text-16"
            type="password"
            show-password-on="mousedown"
            placeholder="123456"
            :maxlength="20"
            @keydown.enter="handleLogin"
          />
        </div>

        <div mt-20 flex>
          <n-checkbox
            :checked="isRemember"
            label="记住我"
            :on-update:checked="(val) => (isRemember = val)"
          />
          <div flex-1 text-right mr-6 >
            <Register></Register>
          </div>
        </div>

        <div mt-20>
          <n-button
            h-50
            w-full
            rounded-5
            text-16
            type="primary"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </n-button>
        </div>

        <!-- Added a new div for the registration link -->
        <div mt-20 f-c-c>
          <!-- Used a router-link component to navigate to the registration page -->
          <!-- You can change the path and the text as you like -->
          <!--          <router-link to="register" class="text-blue">没有账号？点击注册</router-link>-->
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import { lStorage, setToken } from '@/utils'
import { useStorage } from '@vueuse/core'
import bgImg from '@/assets/images/login_bg.webp'
import api from './api'
import { addDynamicRoutes } from '@/router'
import Register from '@/views/login/Register.vue'

const title = import.meta.env.VITE_TITLE

const router = useRouter()
const { query } = useRoute()

const loginInfo = ref({
  username: '',
  password: '',
})

initLoginInfo()

function initLoginInfo() {
  const localLoginInfo = lStorage.get('loginInfo')
  if (localLoginInfo) {
    loginInfo.value.username = localLoginInfo.username || ''
    loginInfo.value.password = localLoginInfo.password || ''
  }
}

const isRemember = useStorage('isRemember', false)
const loading = ref(false)
async function handleLogin() {
  const { username, password } = loginInfo.value
  if (!username || !password) {
    $message.warning('请输入用户名和密码')
    return
  }
  try {
    loading.value = true
    $message.loading('正在验证...')
    // 修改这里的请求参数
    const res = await api.login({ username, password })
    const { code, accessToken } = res.data
    // console.log(res.data)
    if (code === 200) {
      $message.success('登录成功')
      setToken(accessToken)
      localStorage.setItem("username", username)
      // setAccessExpire(accessExpire)
      if (isRemember.value) {
        lStorage.set('loginInfo', { username, password })
      } else {
        lStorage.remove('loginInfo')
      }
      await addDynamicRoutes()
      if (query.redirect) {
        const path = query.redirect
        Reflect.deleteProperty(query, 'redirect')
        router.push({ path, query })
      } else {
        router.push('/')
      }
    } else {
      // 处理其他状态码的情况，比如提示错误信息等
      $message.error('登录失败')
    }
  } catch (error) {
    console.error('error', error)
    $message.removeMessage()
  }
  loading.value = false
}
</script>