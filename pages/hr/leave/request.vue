<template>
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-4">연차 신청</h5>
          
          <form @submit.prevent="submitLeaveRequest" class="row g-3">
            <div class="col-md-6">
              <label class="form-label">시작일</label>
              <input 
                type="date" 
                class="form-control" 
                v-model="form.START_DATE"
                required
                :min="today"
              >
            </div>
            
            <div class="col-md-6">
              <label class="form-label">종료일</label>
              <input 
                type="date" 
                class="form-control" 
                v-model="form.END_DATE"
                required
                :min="form.START_DATE"
              >
            </div>
            
            <div class="col-md-6">
              <label class="form-label">연차 종류</label>
              <select class="form-select" v-model="form.LEAVE_TYPE" required>
                <option value="연차">연차</option>
                <option value="반차">반차</option>
                <option value="병가">병가</option>
              </select>
            </div>
            
            <div class="col-md-6">
              <label class="form-label">신청 일수</label>
              <input 
                type="number" 
                class="form-control" 
                v-model="form.DAYS_COUNT" 
                readonly
              >
            </div>
            
            <div class="col-12">
              <label class="form-label">사유</label>
              <textarea 
                class="form-control" 
                v-model="form.REASON" 
                rows="3" 
                required
              ></textarea>
            </div>
            
            <div class="col-12 mt-4">
              <button type="submit" class="btn btn-primary me-2">신청</button>
              <button type="button" class="btn btn-secondary" @click="router.push('/hr/leave')">
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '~/store/auth';
  
  const router = useRouter();
  const authStore = useAuthStore();
  const today = computed(() => new Date().toISOString().split('T')[0]);
  
  const form = ref({
    START_DATE: '',
    END_DATE: '',
    LEAVE_TYPE: '연차',
    DAYS_COUNT: 0,
    REASON: '',
    EMPLOYEE_ID: ''
  });
  
  // 컴포넌트 마운트 시 EMPLOYEE_ID 설정
  onMounted(() => {
    console.log('현재 로그인 사용자:', authStore.getUser);
    if (authStore.getUser && authStore.getUser.employee_id) {
      form.value.EMPLOYEE_ID = authStore.getUser.employee_id;
      console.log('설정된 EMPLOYEE_ID:', form.value.EMPLOYEE_ID);
    } else {
      console.error('사용자 정보 또는 employee_id가 없습니다.');
      alert('사용자 정보를 찾을 수 없습니다.');
      router.push('/hr/leave');
    }
  });
  
  // 날짜 차이 계산
  watch([() => form.value.START_DATE, () => form.value.END_DATE], ([start, end]) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = endDate - startDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1;
      form.value.DAYS_COUNT = form.value.LEAVE_TYPE === '반차' ? 0.5 : diffDays;
    }
  });
  
  const submitLeaveRequest = async () => {
    try {
      // 폼 제출 전 EMPLOYEE_ID 확인
      if (!form.value.EMPLOYEE_ID) {
        throw new Error('사원 번호가 없습니다. 다시 로그인해주세요.');
      }
  
      console.log('제출할 연차 신청 데이터:', form.value);
  
      const response = await fetch('/api/hr/leave/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      });
  
      if (response.ok) {
        alert('연차 신청이 완료되었습니다.');
        router.push('/hr/leave');
      } else {
        const errorData = await response.text();
        throw new Error(`연차 신청 실패: ${errorData}`);
      }
    } catch (error) {
      console.error('연차 신청 오류:', error);
      alert(error.message);
    }
  };
  </script>