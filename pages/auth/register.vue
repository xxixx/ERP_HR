<template>
  <div class="container mt-5">
      <div class="card" style="max-width: 400px; margin: auto; border: none;">
        <div class="card-body">
          <h2 class="text-center">사용자 등록</h2>
          
          <form @submit.prevent="register" class="mt-4">
            <div class="mb-3">
              <label for="username" class="form-label">이메일</label>
              <input 
                type="text" 
                id="username"
                v-model="EMAIL"
                class="form-control" 
                 placeholder="이메일을 입력하세요."
                required
              />
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">이름</label>
              <input 
                type="text" 
                id="username"
                v-model="NAME"
                class="form-control" 
                 placeholder="이름을 입력하세요."
                required
              />
            </div>
  
            <div class="mb-3">
              <label for="password" class="form-label">패스워드</label>
              <div class="input-group">
                <input 
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  class="form-control" 
                  placeholder="패스워드를 입력하세요."
                  required
                />
                <span class="input-group-text" @click="togglePassword">
                  <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                </span>
              </div>
            </div>
  
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">패스워드 확인</label>
              <div class="input-group">
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  class="form-control" 
                  placeholder="패스워드를 다시 입력하세요."
                  required
                />
                <span class="input-group-text" @click="toggleConfirmPassword">
                  <i :class="['fas', showConfirmPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                </span>
              </div>
            </div>
  
            <button type="submit" class="btn btn-primary w-100">등록하기</button>
          </form>
  
          <p v-if="message">{{ message }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const EMAIL = ref('');
const NAME = ref('');
const password = ref('');
const confirmPassword = ref('');
const message = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const register = async () => {
  if (password.value !== confirmPassword.value) {
    message.value = '패스워드가 일치하지 않습니다.';
    return;
  }

  try {
    console.log('등록 요청, 이메일:', EMAIL.value, '이름:', NAME.value,'비밀번호:', password.value);
    const response = await $fetch('/api/account/register', {
      method: 'POST',
      body: { EMAIL: EMAIL.value, NAME: NAME.value, password: password.value },
    });
    message.value = response.message;
  } catch (error) {
    message.value = '등록 중 오류가 발생했습니다.';
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<style scoped>
.container {
  max-width: 100%; /* 전체 너비를 사용 */
}

.card {
  border: 1px solid #e3e3e3; /* 카드 테두리 설정 */
  border-radius: 0.5rem; /* 카드 테두리 둥글게 */
}
</style>
