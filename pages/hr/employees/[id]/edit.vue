<!-- 사원 정보 수정 페이지 -->
<template>
  <div class="container-fluid">
    <div class="row mb-4">
      <div class="col-12">
        <!-- 페이지 헤더 -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>사원 정보 수정</h2>
          <div class="btn-group">
            <button @click="saveEmployee" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
              저장
            </button>
            <NuxtLink :to="`/hr/employees/${employeeId}`" class="btn btn-secondary">
              취소
            </NuxtLink>
          </div>
        </div>

        <!-- 수정 폼 -->
        <div class="card">
          <div class="card-body">
            <form v-if="employee" @submit.prevent="saveEmployee" class="row g-4">
              <!-- 기본 정보 -->
              <div class="col-md-6">
                <h4 class="card-title mb-4">기본 정보</h4>
                <div class="mb-3">
                  <label class="form-label">사원번호</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="employee.EMPLOYEE_ID"
                    disabled
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">이름 *</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="employee.FULL_NAME"
                    required
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">부서 *</label>
                  <select class="form-select" v-model="employee.DEPARTMENT_ID" required>
                    <option v-for="dept in departments" :key="dept.DEPARTMENT_ID" :value="dept.DEPARTMENT_ID">
                      {{ dept.DEPARTMENT_NAME }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">직급 *</label>
                  <select class="form-select" v-model="employee.JOB_ID" required>
                    <option v-for="job in jobs" :key="job.JOB_ID" :value="job.JOB_ID">
                      {{ job.JOB_TITLE }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">상태 *</label>
                  <select class="form-select" v-model="employee.EMPLOYEES_STATUS" required>
                    <option value="재직">재직</option>
                    <option value="휴직">휴직</option>
                    <option value="퇴사">퇴사</option>
                  </select>
                </div>
              </div>

              <!-- 연락처 정보 -->
              <div class="col-md-6">
                <h4 class="card-title mb-4">연락처 정보</h4>
                <div class="mb-3">
                  <label class="form-label">이메일 *</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    v-model="employee.EMAIL"
                    required
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">전화번호 *</label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    v-model="employee.PHONE"
                    required
                  >
                </div>
              </div>

              <!-- 근무 정보 -->
              <div class="col-md-6">
                <h4 class="card-title mb-4">근무 정보</h4>
                <div class="mb-3">
                  <label class="form-label">입사일 *</label>
                  <input 
                    type="date" 
                    class="form-control" 
                    v-model="employee.HIRE_DATE"
                    required
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">급여 *</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="employee.SALARY"
                    required
                    min="0"
                    step="1000"
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">관리자</label>
                  <select class="form-select" v-model="employee.MANAGER_ID">
                    <option value="">선택 안함</option>
                    <option v-for="manager in managers" :key="manager.EMPLOYEE_ID" :value="manager.EMPLOYEE_ID">
                      {{ manager.FULL_NAME }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- 연차 정보 -->
              <div class="col-md-6">
                <h4 class="card-title mb-4">연차 정보</h4>
                <div class="mb-3">
                  <label class="form-label">총 연차</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="employee.TOTAL_DAYS"
                    min="0"
                    step="1"
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">사용 연차</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="employee.USED_DAYS"
                    min="0"
                    step="1"
                    disabled
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">잔여 연차</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    :value="employee.TOTAL_DAYS - (employee.USED_DAYS || 0)"
                    disabled
                  >
                </div>
              </div>
            </form>

            <!-- 로딩 상태 -->
            <div v-else class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const employeeId = route.params.id;

const employee = ref(null);
const departments = ref([]);
const jobs = ref([]);
const managers = ref([]);
const isSubmitting = ref(false);

// 직원 정보 조회
const fetchEmployee = async () => {
  try {
    console.log('직원 정보 조회:', employeeId);
    const response = await fetch(`/api/hr/employees/${employeeId}`);
    
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }

    const data = await response.json();
    console.log('직원 정보:', data);
    employee.value = data;
  } catch (error) {
    console.error('직원 정보 조회 오류:', error);
    alert('직원 정보를 불러오는데 실패했습니다.');
    router.push('/hr/employees');
  }
};

// 부서 목록 조회
const fetchDepartments = async () => {
  try {
    console.log('부서 목록 조회');
    const response = await fetch('/api/hr/departments');
    
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }

    const data = await response.json();
    console.log('부서 목록:', data);
    departments.value = data;
  } catch (error) {
    console.error('부서 목록 조회 오류:', error);
  }
};

// 직급 목록 조회
const fetchJobs = async () => {
  try {
    console.log('직급 목록 조회');
    const response = await fetch('/api/hr/jobs');
    
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }

    const data = await response.json();
    console.log('직급 목록:', data);
    jobs.value = data;
  } catch (error) {
    console.error('직급 목록 조회 오류:', error);
  }
};

// 관리자 목록 조회
const fetchManagers = async () => {
  try {
    console.log('관리자 목록 조회');
    const response = await fetch('/api/hr/managers');
    
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }

    const data = await response.json();
    console.log('관리자 목록:', data);
    managers.value = data;
  } catch (error) {
    console.error('관리자 목록 조회 오류:', error);
  }
};

// 직원 정보 저장
const saveEmployee = async () => {
  try {
    console.log('직원 정보 저장:', employee.value);
    isSubmitting.value = true;

    const response = await fetch(`/api/hr/employees/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee.value)
    });

    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }

    const result = await response.json();
    console.log('저장 결과:', result);

    alert('저장되었습니다.');
    router.push(`/hr/employees/${employeeId}`);
  } catch (error) {
    console.error('직원 정보 저장 오류:', error);
    alert('저장에 실패했습니다.');
  } finally {
    isSubmitting.value = false;
  }
};

// 초기 데이터 로드
onMounted(async () => {
  console.log('컴포넌트 마운트');
  await Promise.all([
    fetchEmployee(),
    fetchDepartments(),
    fetchJobs(),
    fetchManagers()
  ]);
});
</script>

<style scoped>
.card-title {
  color: #2c3e50;
  font-size: 1.2rem;
}

.form-label {
  font-weight: 500;
}

.form-control:disabled {
  background-color: #f8f9fa;
}
</style>