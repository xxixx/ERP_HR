<template>
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12">
       
  
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
                <div class="col-md-2">
                  <button @click="searchEmployees" class="btn btn-warning text-white w-100">
                    검색
                  </button>
                </div>
                <div class="col-md-2 ms-auto">
                    <button @click="router.push('/hr/create')" class="btn btn-primary w-100">
                        신규 등록
                    </button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- 직원 목록 테이블 -->
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>사원번호</th>
                      <th>이름</th>
                      <th>이메일</th>
                      <th>전화번호</th>
                      <th>부서</th>
                      <th>입사일</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="employee in employees" :key="employee.EMPLOYEE_ID"
                     @click="navigateToDetail(employee.EMPLOYEE_ID)"
                    class="cursor-pointer">
                      <td>{{ employee.EMPLOYEE_ID }}</td>
                      <td>{{ employee.FULL_NAME }}</td>
                      <td>{{ employee.EMAIL }}</td>
                      <td>{{ employee.PHONE }}</td>
                      <td>{{ employee.DEPARTMENT_NAME }}</td>
                      <td>{{ formatDate(employee.HIRE_DATE) }}</td>
                      <td>
                        <span :class="getStatusBadgeClass(employee.STATUS)">
                          {{ employee.STATUS }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <!-- 페이지네이션 -->
              <Pagination
                v-if="totalItems > 0"
                :current-page="currentPage"
                :total-items="totalItems"
                :items-per-page="itemsPerPage"
                @update:current-page="handlePageChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Pagination from '~/components/common/Pagination.vue';
  
  // 페이지 메타데이터 설정
const pageTitle = ref('사원 관리');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정
  const employees = ref([]);
  const currentPage = ref(1);
  const totalItems = ref(0);
  const itemsPerPage = 10;
  
  const searchQuery = ref({
    name: '',
    employeeId: ''
  });
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR');
  };
  
  const getStatusBadgeClass = (status) => {
    const classes = {
      '재직': 'badge bg-success',
      '휴직': 'badge bg-warning',
      '퇴사': 'badge bg-danger'
    };
    return classes[status] || 'badge bg-secondary';
  };
  
  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/hr/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page: currentPage.value,
          pageSize: itemsPerPage,
          ...searchQuery.value
        })
      });
      const data = await response.json();
      employees.value = data.employees;
      totalItems.value = data.total;
      console.log('직원 목록 조회 결과:', data);
    } catch (error) {
      console.error('직원 정보 조회 실패:', error);
    }
  };
//   상세페이지 구현
const router = useRouter();

const navigateToDetail = (employeeId) => {
  router.push(`/hr/${employeeId}`);
};
//   페이징
  const handlePageChange = (page) => {
    currentPage.value = page;
    fetchEmployees();
  };
  
  const searchEmployees = () => {
    currentPage.value = 1;
    fetchEmployees();
  };
  
  onMounted(() => {
    fetchEmployees();
  });
  </script>
  
  <style scoped>
  .badge {
    padding: 0.5em 0.75em;
  }
  </style>