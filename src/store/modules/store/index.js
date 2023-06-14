import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useStore = defineStore('store', () => {
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

    setUserName,
    setInformation,
    getInformation,
  }
})