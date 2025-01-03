<template>
     <div class="container mt-5">
   <div class="card" style="max-width: 400px; margin: auto; border: none;">
        <div class="card-body">
          <h4 class="text-center">패스워드 재설정</h4>
          
          <form @submit.prevent="updatePassword" class="mt-4">
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
              <label for="password" class="form-label">패스워드</label>
              <div class="input-group">
                <input 
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="new_password"
                  class="form-control" 
                  placeholder="패스워드를 입력하세요."
                  required
                />
                <span class="input-group-text" @click="togglePassword">
                  <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                </span>
              </div>
            </div>
  
           
  
            <button type="submit" class="btn btn-primary w-100">등록하기</button>
          </form>
  <div v-if="message">

      <p> {{ message }}</p>
      <nuxt-link to="/auth/login"> <button class="btn btn-warning w-100">로그인으로 이동</button></nuxt-link>
  </div>
       
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const EMAIL = ref('');
const new_password = ref('');
const message = ref('');
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const updatePassword = async () => {
  try {
    console.log('비밀번호 업데이트 요청, 이메일:', EMAIL.value, '새 비밀번호:', new_password.value);
    const response = await $fetch('/api/account/update-password', {
      method: 'POST',
      body: { EMAIL: EMAIL.value, new_password: new_password.value },
    });
    message.value = response.message;
  } catch (error) {
    message.value = '비밀번호 업데이트 중 오류가 발생했습니다.';
  }
};
</script>
