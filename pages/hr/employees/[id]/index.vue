<!-- 사원 상세 정보 페이지 -->
<template>
  <div class="container-fluid">
    <div class="row mb-4">
      <div class="col-12">
        <!-- 페이지 헤더 -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>사원 상세 정보</h2>
          <div class="btn-group">
            <NuxtLink :to="`/hr/employees/${employeeId}/edit`" class="btn btn-warning">
              수정
            </NuxtLink>
            <NuxtLink to="/hr/employees" class="btn btn-secondary">
              목록으로
            </NuxtLink>
          </div>
        </div>

        <!-- 사원 정보 카드 -->
        <div class="card">
          <div class="card-body">
            <div v-if="employee" class="row g-4">
              <!-- 기본 정보 -->
              <div class="col-md-6">
                <h4 class="card-title mb-4">기본 정보</h4>
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th width="30%">사원번호</th>
                      <td>{{ employee.EMPLOYEE_ID }}</td>
                    </tr>
                    <tr>
                      <th>이름</th>
                      <td>{{ employee.FULL_NAME }}</td>
                    </tr>
                    <tr>
                      <th>부서</th>
                      <td>{{ employee.DEPARTMENT_NAME }}</td>
                    </tr>
                    <tr>
                      <th>직급</th>
                      <td>{{ employee.JOB_TITLE }}</td>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>
                        <span :class="getStatusBadgeClass(employee.EMPLOYEES_STATUS)">
                          {{ employee.EMPLOYEES_STATUS }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 연락처 정보 -->
              <div class="col-md-6">
                <h4 class="card-title mb-4">연락처 정보</h4>
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th width="30%">이메일</th>
                      <td>{{ employee.EMAIL }}</td>
                    </tr>
                    <tr>
                      <th>전화번호</th>
                      <td>{{ employee.PHONE }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 근무 정보 -->
              <div class="col-md-6">
                <h4 class="card-title mb-4">근무 정보</h4>
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th width="30%">입사일</th>
                      <td>{{ employee.HIRE_DATE }}</td>
                    </tr>
                    <tr>
                      <th>급여</th>
                      <td>{{ formatSalary(employee.SALARY) }}</td>
                    </tr>
                    <tr>
                      <th>관리자</th>
                      <td>{{ employee.MANAGER_NAME || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 연차 정보 -->
              <div class="col-md-6">
                <h4 class="card-title mb-4">연차 정보</h4>
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th width="30%">총 연차</th>
                      <td>{{ employee.TOTAL_DAYS || 0 }}일</td>
                    </tr>
                    <tr>
                      <th>사용 연차</th>
                      <td>{{ employee.USED_DAYS || 0 }}일</td>
                    </tr>
                    <tr>
                      <th>잔여 연차</th>
                      <td>{{ employee.REMAINING_DAYS || 0 }}일</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

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
import { useRoute } from 'vue-router';

const route = useRoute();
const employeeId = route.params.id;
const employee = ref(null);

// 직원 정보 조회
const fetchEmployee = async () => {
  try {
    console.log('직원 상세 정보 조회:', employeeId);
    const response = await fetch(`/api/hr/employees/${employeeId}`);
    
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }

    const data = await response.json();
    console.log('직원 상세 정보:', data);
    employee.value = data;
  } catch (error) {
    console.error('직원 정보 조회 오류:', error);
    alert('직원 정보를 불러오는데 실패했습니다.');
  }
};

// 상태 뱃지 클래스
const getStatusBadgeClass = (status) => {
  const classes = {
    '재직': 'badge bg-success',
    '휴직': 'badge bg-warning',
    '퇴사': 'badge bg-danger'
  };
  return classes[status] || 'badge bg-secondary';
};

// 급여 포맷
const formatSalary = (salary) => {
  return salary ? new Intl.NumberFormat('ko-KR').format(salary) + '원' : '-';
};

// 초기 데이터 로드
onMounted(() => {
  console.log('컴포넌트 마운트');
  fetchEmployee();
});
</script>

<style scoped>
.badge {
  font-size: 0.8rem;
  padding: 0.35em 0.65em;
}

.table th {
  background-color: #f8f9fa;
}
</style>