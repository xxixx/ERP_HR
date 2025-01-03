<template>
  <div class="container mt-5">
    <div class="card" style="max-width: 400px; margin: auto; border: none;">
      <div class="card-body">
        <h4 class="text-center">비밀번호 변경</h4>
        
        <form @submit.prevent="changePassword" class="mt-4">
          <div class="mb-3">
            <label for="current-password" class="form-label">현재 비밀번호</label>
            <div class="input-group">
              <input 
                :type="showCurrentPassword ? 'text' : 'password'"
                id="current-password"
                v-model="current_password"
                class="form-control" 
                placeholder="현재 비밀번호를 입력하세요"
                required
              />
              <span class="input-group-text" @click="toggleCurrentPassword">
                <i :class="['fas', showCurrentPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
              </span>
            </div>
          </div>

          <div class="mb-3">
            <label for="new-password" class="form-label">새 비밀번호</label>
            <div class="input-group">
              <input 
                :type="showNewPassword ? 'text' : 'password'"
                id="new-password"
                v-model="new_password"
                class="form-control" 
                placeholder="새 비밀번호를 입력하세요"
                required
              />
              <span class="input-group-text" @click="toggleNewPassword">
                <i :class="['fas', showNewPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
              </span>
            </div>
          </div>

          <div class="mb-3">
            <label for="confirm-password" class="form-label">새 비밀번호 확인</label>
            <div class="input-group">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                v-model="confirm_password"
                class="form-control" 
                placeholder="새 비밀번호를 다시 입력하세요"
                required
              />
              <span class="input-group-text" @click="toggleConfirmPassword">
                <i :class="['fas', showConfirmPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
              </span>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="!isFormValid">변경하기</button>
        </form>

        <div v-if="message" class="alert" :class="{'alert-success': success, 'alert-danger': !success}" role="alert">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const current_password = ref('');
const new_password = ref('');
const confirm_password = ref('');
const message = ref('');
const success = ref(false);

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const toggleCurrentPassword = () => showCurrentPassword.value = !showCurrentPassword.value;
const toggleNewPassword = () => showNewPassword.value = !showNewPassword.value;
const toggleConfirmPassword = () => showConfirmPassword.value = !showConfirmPassword.value;

const isFormValid = computed(() => {
  return current_password.value && 
         new_password.value && 
         confirm_password.value && 
         new_password.value === confirm_password.value;
});

const changePassword = async () => {
  if (new_password.value !== confirm_password.value) {
    message.value = '새 비밀번호가 일치하지 않습니다.';
    success.value = false;
    return;
  }

  try {
    const response = await $fetch('/api/account/change-password', {
      method: 'POST',
      body: {
        current_password: current_password.value,
        new_password: new_password.value
      },
      headers: {
        'Authorization': `Bearer ${authStore.accessToken}`
      }
    });

    message.value = response.message;
    success.value = response.success;

    if (response.success) {
      // 폼 초기화
      current_password.value = '';
      new_password.value = '';
      confirm_password.value = '';
    }
  } catch (error) {
    message.value = '비밀번호 변경 중 오류가 발생했습니다.';
    success.value = false;
  }
};
</script>

<style scoped>
.input-group-text {
  cursor: pointer;
}
</style>
