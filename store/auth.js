import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null
  }),
  
  actions: {
    setTokens(access, refresh) {
      this.accessToken = access
      this.refreshToken = refresh
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
    },

    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },

    clearAuth() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    },

    async refreshAccessToken() {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken: this.refreshToken
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          this.setTokens(data.accessToken, data.refreshToken)
          return true
        }
        return false
      } catch (error) {
        console.error('Token refresh failed:', error)
        return false
      }
    },

    initializeAuth() {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const user = localStorage.getItem('user')

      if (accessToken) this.accessToken = accessToken
      if (refreshToken) this.refreshToken = refreshToken
      if (user) this.user = JSON.parse(user)
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getUser: (state) => {
      if (!state.accessToken) {
        console.log('토큰이 없음');
        return null;
      }
      try {
        console.log('토큰 디코딩 시도:', state.accessToken);
        const base64Url = state.accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = decodeURIComponent(escape(window.atob(base64)));
        const user = JSON.parse(decoded);
        
        // 토큰 만료 확인
        const payload = JSON.parse(atob(state.accessToken.split('.')[1]));
        const expTime = payload.exp * 1000; // 초를 밀리초로 변환
        
        if (Date.now() >= expTime) {
          console.log('토큰이 만료됨');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          state.accessToken = null;
          state.refreshToken = null;
          return null;
        }
        
        console.log('디코딩된 사용자 정보:', user);
        return user;
      } catch (error) {
        console.error('Token decode failed:', error);
        return null;
      }
    },
    getAccessToken: (state) => state.accessToken
  }
})
