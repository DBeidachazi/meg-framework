import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { useTagsStore, usePermissionStore } from '@/store'
import { removeToken, toLogin } from '@/utils'
import { users } from '~/mock/api/user'
import api from '@/api'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || [] // 这个是用户权限保存的地方 { 0: 'editor' }
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const auth = localStorage.getItem("user")
        if (auth === "admin") {
          const { id, name, avatar, role } = users.admin
          this.userInfo = { id, name, avatar, role }
          return Promise.resolve(users.admin)
        } else if ( auth === "editor" ) {
          const { id, name, avatar, role } = users.editor
          this.userInfo = { id, name, avatar, role }
          return Promise.resolve(users.editor)
        }
        // const res = await api.getUser()
        // const { id, name, avatar, role } = res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      const { resetTags } = useTagsStore()
      const { resetPermission } = usePermissionStore()
      removeToken()
      resetTags()
      resetPermission()
      resetRouter()
      this.$reset()
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
    setUserAvatar(avatar) {
      this.userInfo.avatar = avatar
    }
  },
})
