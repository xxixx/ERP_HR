import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    isAuthenticated: false
  }),
  
  getters: {
    getUserInfo: (state) => state.userInfo,
    getUsername: (state) => state.userInfo?.NAME,
    getUserRole: (state) => state.userInfo?.ROLE,
    getUserLevel: (state) => state.userInfo?.LEVEL
  },
  
  actions: {
    setUserInfo(user) {
      this.userInfo = user
      this.isAuthenticated = true
      if (process.client) {
        sessionStorage.setItem('userInfo', JSON.stringify(user))
      }
    },
    
    clearUserInfo() {
      this.userInfo = null
      this.isAuthenticated = false
      if (process.client) {
        sessionStorage.removeItem('userInfo')
      }
    },

    checkAuth() {
      if (process.client) {
        const storedUser = sessionStorage.getItem('userInfo')
        if (storedUser) {
          this.userInfo = JSON.parse(storedUser)
          this.isAuthenticated = true
        }
      }
    }
  }
})
