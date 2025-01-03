<template>
  <div class="container-fluid">
    <div class="row mb-4">
      <div class="col-12">
        <!-- 페이지 헤더 -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5>사원 정보</h5>
          <NuxtLink to="/hr/employees/create" class="btn btn-sm btn-warning text-white">
            신규 사원 등록
          </NuxtLink>
        </div>

        <!-- 검색 영역 -->
        <div class="card mb-4">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-3">
                <input 
                  v-model="searchQuery.name" 
                  type="text" 
                  class="form-control" 
                  placeholder="이름 검색"
                  @keyup.enter="searchEmployees"
                >
              </div>
              <div class="col-md-3">
                <input 
                  v-model="searchQuery.employeeId" 
                  type="text" 
                  class="form-control" 
                  placeholder="사원번호 검색"
                  @keyup.enter="searchEmployees"
                >
              </div>
              <div class="col-md-3">
                <select v-model="searchQuery.status" class="form-select">
                  <option value="">전체 상태</option>
                  <option value="재직">재직</option>
                  <option value="휴직">휴직</option>
                  <option value="퇴사">퇴사</option>
                </select>
              </div>
              <div class="col-md-2">
                <button @click="searchEmployees" class="btn btn-warning text-white w-100">
                  검색
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 사원 목록 테이블 -->
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>사원번호</th>
                    <th>이름</th>
                    <th>부서</th>
                    <th>직급</th>
                    <th>입사일</th>
                    <th>연락처</th>
                    <th>이메일</th>
                    <th>상태</th>
                    <th>총 연차</th>
                    <th>사용 연차</th>
                    <th>잔여 연차</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="employee in employees" 
                      :key="employee.EMPLOYEE_ID"
                      @click="viewEmployee(employee)"
                      class="employee-row"
                  >
                    <td>{{ employee.EMPLOYEE_ID }}</td>
                    <td>{{ employee.FULL_NAME }}</td>
                    <td>{{ employee.DEPARTMENT_NAME }}</td>
                    <td>{{ employee.JOB_TITLE }}</td>
                    <td>{{ employee.HIRE_DATE }}</td>
                    <td>{{ employee.PHONE }}</td>
                    <td>{{ employee.EMAIL }}</td>
                    <td>
                      <span :class="getStatusBadgeClass(employee.EMPLOYEES_STATUS)">
                        {{ employee.EMPLOYEES_STATUS }}
                      </span>
                    </td>
                    <td>{{ employee.TOTAL_DAYS || 0 }}</td>
                    <td>{{ employee.USED_DAYS || 0 }}</td>
                    <td>{{ employee.REMAINING_DAYS || 0 }}</td>
                    <td @click.stop>
                      <div class="btn-group">
                        <button 
                          @click="editEmployee(employee)"
                          class="btn btn-sm btn-outline-warning"
                        >
                          수정
                        </button>
                        <button 
                          v-if="employee.EMPLOYEES_STATUS === '재직'"
                          @click="updateStatus(employee.EMPLOYEE_ID, '퇴사')"
                          class="btn btn-sm btn-outline-success"
                        >
                          퇴사
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!employees || employees.length === 0">
                    <td colspan="12" class="text-center">데이터가 없습니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 페이지네이션 -->
            <!-- <div v-if="totalItems > 0" class="d-flex justify-content-center mt-3">
              <nav aria-label="Page navigation">
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="handlePageChange(currentPage - 1)">이전</a>
                  </li>
                  <li 
                    v-for="page in Math.ceil(totalItems / itemsPerPage)" 
                    :key="page" 
                    class="page-item"
                    :class="{ active: currentPage === page }"
                  >
                    <a class="page-link" href="#" @click.prevent="handlePageChange(page)">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === Math.ceil(totalItems / itemsPerPage) }">
                    <a class="page-link" href="#" @click.prevent="handlePageChange(currentPage + 1)">다음</a>
                  </li>
                </ul>
              </nav>
            </div> -->

            <Pagination
                v-if="totalPages > 1"
                :current-page="currentPage"
                :total-pages="totalPages"
                @page-change="handlePageChange"
              />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Pagination from '~/components/common/Pagination.vue';

const router = useRouter();

// 상태 관리
const employees = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
// 총 페이지 수 계산
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

// 페이지 변경 핸들러
const handlePageChange = async (page) => {
  await fetchEmployees();
};
const searchQuery = ref({
  name: '',
  employeeId: '',
  status: ''
});

// 직원 목록 조회
// const fetchEmployees = async () => {
//   try {
//     const response = await fetch(`/api/hr/employeesList?page=${currentPage.value}&limit=${itemsPerPage}`);
//     if (!response.ok) throw new Error('직원 목록 조회 실패');
//     const data = await response.json();
//     employees.value = data.data;
//     totalItems.value = data.total; // 전체 아이템 수 업데이트
//   } catch (error) {
//     console.error('직원 목록 조회 오류:', error);
//   }
// };

const fetchEmployees = async () => {
  try {
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: itemsPerPage.value.toString(),
      name: searchQuery.value.name,
      employeeId: searchQuery.value.employeeId,
      status: searchQuery.value.status
    });

    const response = await fetch(`/api/hr/employeesList?${params}`);
    if (!response.ok) throw new Error('직원 목록 조회 실패');
    const data = await response.json();
    employees.value = data.data;
    totalItems.value = data.total;
  } catch (error) {
    console.error('직원 목록 조회 오류:', error);
  }
};

// 검색 실행
const searchEmployees = () => {
  console.log('검색 실행:', searchQuery.value);
  currentPage.value = 1;
  fetchEmployees();
};

// 페이지 변경
// const handlePageChange = (page) => {
//   console.log('페이지 변경:', page);
//   currentPage.value = page;
//   fetchEmployees();
// };

// 상태 뱃지 클래스
const getStatusBadgeClass = (status) => {
  const classes = {
    '재직': 'badge bg-success',
    '휴직': 'badge bg-warning',
    '퇴사': 'badge bg-danger'
  };
  return classes[status] || 'badge bg-secondary';
};

// 직원 상세 정보 보기
const viewEmployee = (employee) => {
  console.log('직원 상세 정보 보기:', employee);
  router.push(`/hr/employees/${employee.EMPLOYEE_ID}`);
};

// 직원 수정
const editEmployee = (employee) => {
  console.log('직원 수정:', employee);
  router.push(`/hr/employees/${employee.EMPLOYEE_ID}/edit`);
};

// 상태 업데이트
const updateStatus = async (employeeId, status) => {
  try {
    console.log('직원 상태 업데이트:', { employeeId, status });
    
    if (!confirm(`정말 ${status} 처리하시겠습니까?`)) {
      return;
    }

    const response = await fetch(`/api/hr/employees/${employeeId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }

    const result = await response.json();
    console.log('상태 업데이트 결과:', result);

    alert('상태가 업데이트되었습니다.');
    fetchEmployees();
  } catch (error) {
    console.error('상태 업데이트 오류:', error);
    alert('상태 업데이트에 실패했습니다.');
  }
};

// 초기 데이터 로드
onMounted(() => {
  console.log('컴포넌트 마운트');
  fetchEmployees();
});
</script>

<style scoped>
.table-responsive {
  min-height: 400px;
}

.badge {
  font-size: 0.8rem;
  padding: 0.35em 0.65em;
}

.employee-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.employee-row:hover {
  background-color: #f8f9fa !important;
}

.btn-group {
  white-space: nowrap;
}

.pagination {
  margin-bottom: 0;
}

.page-link {
  cursor: pointer;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
}
</style>