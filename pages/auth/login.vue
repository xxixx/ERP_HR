<template>
    <div class="container mt-5">
      <div class="card" style="max-width: 400px; margin: auto; border: none;">
        <div class="card-body">
          <h2 class="text-center">로그인</h2>
          
          <form @submit.prevent="login" class="mt-4">
            <div class="mb-3">
              <label for="EMAIL" class="form-label">이메일</label>
              <input 
                type="text" 
                id="email"
                v-model="EMAIL"
                class="form-control" 
                placeholder="이메일을 입력하세요."
                required
              />
            </div>
  
            <div class="mb-3">
              <label for="password" class="form-label">패스워드</label>
              <div class="input-group">
                <input 
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="PASSWORD"
                  class="form-control" 
                  placeholder="패스워드를 입력하세요."
                  required
                />
                <span class="input-group-text" @click="togglePassword">
                  <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                </span>
              </div>
            </div>
  
            <div class="form-check mb-3">
              <input 
                type="checkbox"
                v-model="rememberMe"
                class="form-check-input"
                id="rememberMe"
              >
              <label class="form-check-label" for="rememberMe">이메일 기억하기</label>
              <!-- <a href="#" class="float-end text-primary">Forgot your password?</a> -->
            </div>
  
            <button type="submit" class="btn btn-primary w-100">로그인</button>
          </form>
          <div class="mt-3 text-center">
                <nuxt-link to="/auth/register"> <p class=" w-100">사용자 등록하러 가기</p></nuxt-link>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'

const EMAIL = ref('')
const PASSWORD = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const error = ref('')
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  isLoading.value = true
  try {
    const response = await $fetch('/api/account/login', {
      method: 'POST',
      body: { EMAIL: EMAIL.value, PASSWORD: PASSWORD.value },
    })
    
    if (response.success) {
      authStore.setTokens(response.accessToken, response.refreshToken)
      authStore.setUser(response.user)
      
      if (rememberMe.value) {
        localStorage.setItem('EMAIL', EMAIL.value)
      } else {
        localStorage.removeItem('EMAIL')
      }
      router.push('/')
    } else {
      error.value = response.message
    }
  } catch (err) {
    console.error('로그인 중 오류 발생:', err)
    error.value = '로그인 중 오류가 발생했습니다.'
  } finally {
    isLoading.value = false
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
.container {
  max-width: 100%; /* 전체 너비를 사용 */
}

.card {
  border: 1px solid #e3e3e3; /* 부트스트랩 기본 색상으로 테두리 설정 */
  border-radius: 0.5rem; /* 두리 둥글게 */
}
</style>