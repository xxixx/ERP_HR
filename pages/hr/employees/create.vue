<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5>신규 사원 등록</h5>
          <button class="btn btn-secondary" @click="goBack">
            취소
          </button>
        </div>

        <form @submit.prevent="createEmployee" class="row g-3">
          <!-- 기본 정보 섹션 -->
          <div class="col-12 mb-3">
            <h6 class="border-bottom pb-2">기본 정보</h6>
          </div>

          <div class="col-md-6">
            <label class="form-label">사원번호</label>
            <input type="text" class="form-control" v-model="form.EMPLOYEE_ID" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">이름</label>
            <input type="text" class="form-control" v-model="form.FULL_NAME" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">이메일</label>
            <input type="email" class="form-control" v-model="form.EMAIL" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">전화번호</label>
            <input type="tel" class="form-control" v-model="form.PHONE" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">부서</label>
            <select class="form-select" v-model="form.DEPARTMENT_ID" required>
              <option value="">부서 선택</option>
              <option v-for="dept in departments" :key="dept.DEPARTMENT_ID" :value="dept.DEPARTMENT_ID">
                {{ dept.DEPARTMENT_NAME }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">직급</label>
            <select class="form-select" v-model="form.JOB_ID" required>
              <option value="">직급 선택</option>
              <option v-for="job in jobs" :key="job.JOB_ID" :value="job.JOB_ID">
                {{ job.JOB_TITLE }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">입사일</label>
            <input type="date" class="form-control" v-model="form.HIRE_DATE" required 
                   @change="calculateInitialLeave">
          </div>
          <div class="col-md-6">
            <label class="form-label">급여</label>
            <input type="number" class="form-control" v-model="form.SALARY" required
                   min="0" step="0.01">
            <small class="form-text text-muted">월 급여를 입력하세요. (예: 3000000.00)</small>
          </div>

          <!-- 연차 정보 섹션 -->
          <div class="col-12 mt-4 mb-3">
            <h6 class="border-bottom pb-2">연차 정보</h6>
          </div>

          <div class="col-md-4">
            <label class="form-label">기본 연차</label>
            <input type="number" class="form-control" v-model="leaveInfo.TOTAL_DAYS" 
                   min="0" step="0.5" required readonly>
            <small class="form-text text-muted">입사일 기준 자동 계산됩니다.</small>
          </div>
          <div class="col-md-4">
            <label class="form-label">사용 연차</label>
            <input type="number" class="form-control" v-model="leaveInfo.USED_DAYS" 
                   readonly>
          </div>
          <div class="col-md-4">
            <label class="form-label">잔여 연차</label>
            <input type="number" class="form-control" v-model="leaveInfo.REMAINING_DAYS" 
                   readonly>
          </div>

          <div class="col-12 mt-4">
            <button type="submit" class="btn btn-warning text-white me-2">등록</button>
            <button type="button" class="btn btn-secondary" @click="goBack">취소</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const pageTitle = ref('사원 등록');
useHead({
  title: pageTitle.value,
});

const router = useRouter();
const departments = ref([]);
const jobs = ref([]);

const form = ref({
  EMPLOYEE_ID: '',
  FULL_NAME: '',
  EMAIL: '',
  PHONE: '',
  DEPARTMENT_ID: '',
  JOB_ID: '',
  HIRE_DATE: '',
  SALARY: '',
  EMPLOYEES_STATUS: '재직'
});

const leaveInfo = ref({
  TOTAL_DAYS: 15.0,
  USED_DAYS: 0.0,
  REMAINING_DAYS: 15.0
});

// 입사일 기준 연차 계산
const calculateInitialLeave = () => {
  const today = new Date();
  const hireDate = new Date(form.value.HIRE_DATE);
  const monthsDiff = (today.getFullYear() - hireDate.getFullYear()) * 12 + 
                    (today.getMonth() - hireDate.getMonth());
  
  // 1년 미만: 15일
  // 1년 이상 3년 미만: 15일
  // 3년 이상: 20일
  if (monthsDiff >= 36) { // 3년 이상
    leaveInfo.value.TOTAL_DAYS = 20.0;
  } else {
    leaveInfo.value.TOTAL_DAYS = 15.0;
  }
  
  leaveInfo.value.REMAINING_DAYS = leaveInfo.value.TOTAL_DAYS;
  console.log('연차 계산 결과:', leaveInfo.value);
};

const fetchDepartments = async () => {
  try {
    const response = await fetch('/api/hr/departments');
    const data = await response.json();
    departments.value = data;
  } catch (error) {
    console.error('부서 정보 조회 실패:', error);
  }
};

const fetchJobs = async () => {
  try {
    const response = await fetch('/api/hr/jobs');
    const data = await response.json();
    jobs.value = data;
  } catch (error) {
    console.error('직급 정보 조회 실패:', error);
  }
};

const createEmployee = async () => {
    try {
        // 데이터 유효성 검사
        if (!form.value.EMPLOYEE_ID || !form.value.FULL_NAME) {
            throw new Error('필수 정보를 모두 입력해주세요.');
        }

        const formattedData = {
            ...form.value,
            DEPARTMENT_ID: parseInt(form.value.DEPARTMENT_ID),
            JOB_ID: parseInt(form.value.JOB_ID),
            HIRE_DATE: form.value.HIRE_DATE,
            SALARY: parseFloat(form.value.SALARY),
            EMPLOYEES_STATUS: '재직'
        };
        
        console.log('전송할 데이터:', formattedData);
        
        // API 엔드포인트 수정
        const response = await fetch('/api/hr/employees/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formattedData)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || '사원 등록에 실패했습니다.');
        }

        const result = await response.json();
        console.log('서버 응답:', result);

        if (result.success) {
            alert('사원 정보가 등록되었으며, 연차가 자동으로 부여되었습니다.');
            router.push('/hr/employees');
        } else {
            throw new Error(result.message || '사원 등록에 실패했습니다.');
        }
    } catch (error) {
        console.error('사원 등록 중 오류 발생:', error);
        alert(error.message || '사원 등록 중 오류가 발생했습니다.');
    }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchDepartments();
  fetchJobs();
});
</script>

<style scoped>
.form-label {
  font-weight: 500;
  color: #6c757d;
}
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
h6 {
  color: #495057;
  font-weight: 600;
}
.form-text {
  font-size: 0.875rem;
}
</style>