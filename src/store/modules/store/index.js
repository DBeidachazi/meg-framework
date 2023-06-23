import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useStore = defineStore('store', () => {
  let requestShadow = ref(false)
  let shadowSpan = ref('')

  const turnOffAndSuccess = (str) => {
    shadowSpan.value = str
    setTimeout(() => {
      requestShadow.value = false
    }, 1500)
  }

  const turnOffAndFailed = (str) => {
    shadowSpan.value = str
    setTimeout(() => {
      requestShadow.value = false
    }, 1500)
  }

  const turnOnShadow = (str) => {
    requestShadow.value = true
    shadowSpan.value = str
  }

  let information = reactive({
    name: '',
    sex: '',
    age: 0,
  })
  const setInformation = (info) => {
    information = info
    console.log(information)
  }
  const getInformation = () => {
    information.username = localStorage.getItem('username')
    console.log(information)
    return information
  }

  let username = ref('')
  const setUserName = (name) => {
    username.value = name
  }

  return {
    name,
    username,
    requestShadow,
    shadowSpan,

    turnOnShadow,
    turnOffAndSuccess,
    turnOffAndFailed,
    setUserName,
    setInformation,
    getInformation,
  }
})