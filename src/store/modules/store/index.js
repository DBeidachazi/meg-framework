import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  let name = 'default'
  const setName = (newName) => {
    name = newName
  }

  return {
    name,

    setName
  }
})