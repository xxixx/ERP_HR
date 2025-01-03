<template>
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12">
          <!-- 페이지 헤더 -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>연차 관리</h2>
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
                <div class="col-md-2">
                  <button @click="searchEmployees" class="btn btn-warning text-white w-100">
                    검색
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
                      <th>부서</th>
                      <th>직급</th>
                      <th>입사일</th>
                      <th>총 연차</th>
                      <th>사용 연차</th>
                      <th>잔여 연차</th>
                      <th>연차 등록</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="employee in employees" :key="employee.EMPLOYEE_ID">
                      <td>{{ employee.EMPLOYEE_ID }}</td>
                      <td>{{ employee.FULL_NAME }}</td>
                      <td>{{ employee.DEPARTMENT_NAME }}</td>
                      <td>{{ employee.JOB_TITLE }}</td>
                      <td>{{ employee.HIRE_DATE }}</td>
                      <td>{{ employee.TOTAL_DAYS || 0 }}</td>
                      <td>{{ employee.USED_DAYS || 0 }}</td>
                      <td>{{ employee.REMAINING_DAYS || 0 }}</td>
                      <td>
                        <button 
                          @click="openLeaveRegistration(employee)"
                          class="btn btn-sm btn-primary"
                          :disabled="!employee.REMAINING_DAYS"
                        >
                          연차 등록
                        </button>
                      </td>
                    </tr>
                    <tr v-if="!employees || employees.length === 0">
                      <td colspan="9" class="text-center">데이터가 없습니다.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <!-- 페이지네이션 -->
              <div v-if="totalItems > 0" class="d-flex justify-content-center mt-3">
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
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 연차 등록 모달 -->
      <div class="modal fade" id="leaveRegistrationModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">연차 등록 - {{ selectedEmployee?.FULL_NAME }}</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitLeaveRegistration">
                <div class="mb-3">
                  <label class="form-label">시작일</label>
                  <input 
                    type="date" 
                    class="form-control" 
                    v-model="leaveForm.START_DATE"
                    required
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">종료일</label>
                  <input 
                    type="date" 
                    class="form-control" 
                    v-model="leaveForm.END_DATE"
                    required
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">연차 종류</label>
                  <select class="form-select" v-model="leaveForm.LEAVE_TYPE" required>
                    <option value="연차">연차</option>
                    <option value="반차">반차</option>
                    <option value="병가">병가</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">일수</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="leaveForm.DAYS_COUNT"
                    step="0.5"
                    readonly
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">사유</label>
                  <textarea 
                    class="form-control" 
                    v-model="leaveForm.REASON" 
                    rows="3" 
                    required
                  ></textarea>
                </div>
                <div class="text-end">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    :disabled="!isValidLeaveRequest"
                  >
                    등록
                  </button>
                  <button type="button" class="btn btn-secondary ms-2" @click="closeModal">
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  
  // 상태 관리
  const employees = ref([]);
  const totalItems = ref(0);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const searchQuery = ref({
    name: '',
    employeeId: ''
  });
  
  // 선택된 직원 정보와 연차 등록 폼
  const selectedEmployee = ref(null);
  const leaveForm = ref({
    EMPLOYEE_ID: '',
    START_DATE: '',
    END_DATE: '',
    LEAVE_TYPE: '연차',
    DAYS_COUNT: 0,
    REASON: ''
  });
  
  // 연차 신청 유효성 검사
  const isValidLeaveRequest = computed(() => {
    const { START_DATE, END_DATE, DAYS_COUNT, REASON } = leaveForm.value;
    const startDate = new Date(START_DATE);
    const endDate = new Date(END_DATE);
    
    return (
      START_DATE && 
      END_DATE && 
      startDate <= endDate &&
      DAYS_COUNT > 0 &&
      DAYS_COUNT <= (selectedEmployee.value?.REMAINING_DAYS || 0) &&
      REASON.trim()
    );
  });
  
  // 직원 목록 조회
  const fetchEmployees = async () => {
    try {
      console.log('직원 목록 조회 시작');
      const params = new URLSearchParams({
        page: currentPage.value.toString(),
        limit: itemsPerPage.value.toString(),
        name: searchQuery.value.name,
        employeeId: searchQuery.value.employeeId
      });
  
      console.log('조회 파라미터:', Object.fromEntries(params));
  
      const response = await fetch(`/api/hr/employees/list?${params}`);
      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }
  
      const data = await response.json();
      console.log('직원 목록 조회 결과:', data);
  
      employees.value = data.employees || [];
      totalItems.value = data.total || 0;
    } catch (error) {
      console.error('직원 목록 조회 오류:', error);
      alert('직원 목록을 불러오는데 실패했습니다.');
    }
  };
  
  // 검색 실행
  const searchEmployees = () => {
    console.log('검색 실행:', searchQuery.value);
    currentPage.value = 1;
    fetchEmployees();
  };
  
  // 페이지 변경
  const handlePageChange = (page) => {
    console.log('페이지 변경:', page);
    currentPage.value = page;
    fetchEmployees();
  };
  
  // 연차 등록 모달 열기
  const openLeaveRegistration = (employee) => {
    console.log('연차 등록 모달 열기:', employee);
    selectedEmployee.value = employee;
    leaveForm.value = {
      EMPLOYEE_ID: employee.EMPLOYEE_ID,
      START_DATE: '',
      END_DATE: '',
      LEAVE_TYPE: '연차',
      DAYS_COUNT: 0,
      REASON: ''
    };
    
    const modal = document.getElementById('leaveRegistrationModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  };
  
  // 모달 닫기
  const closeModal = () => {
    console.log('모달 닫기');
    const modal = document.getElementById('leaveRegistrationModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    
    selectedEmployee.value = null;
    leaveForm.value = {
      EMPLOYEE_ID: '',
      START_DATE: '',
      END_DATE: '',
      LEAVE_TYPE: '연차',
      DAYS_COUNT: 0,
      REASON: ''
    };
  };
  
  // 날짜 변경 감지 및 일수 자동 계산
  watch(
    [
      () => leaveForm.value.START_DATE,
      () => leaveForm.value.END_DATE,
      () => leaveForm.value.LEAVE_TYPE
    ],
    ([start, end, type]) => {
      if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = (diffTime / (1000 * 60 * 60 * 24)) + 1;
        leaveForm.value.DAYS_COUNT = type === '반차' ? 0.5 : diffDays;
        
        console.log('연차 일수 계산:', {
          startDate,
          endDate,
          diffDays,
          type,
          result: leaveForm.value.DAYS_COUNT
        });
      }
    }
  );
  
  // 연차 등록 제출
  const submitLeaveRegistration = async () => {
    try {
      if (!isValidLeaveRequest.value) {
        throw new Error('유효하지 않은 연차 신청입니다.');
      }
  
      console.log('연차 등록 요청 데이터:', leaveForm.value);
  
      const response = await fetch('/api/hr/leave/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leaveForm.value,
          DAYS_COUNT: Number(leaveForm.value.DAYS_COUNT)
        })
      });
  
      const result = await response.json();
      console.log('연차 등록 응답:', result);
  
      if (!response.ok) {
        throw new Error(result.message || '연차 등록에 실패했습니다.');
      }
  
      alert(result.message || '연차가 등록되었습니다.');
      closeModal();
      await fetchEmployees();
    } catch (error) {
      console.error('연차 등록 오류:', error);
      alert(error.message);
    }
  };
  
  // 초기 데이터 로드
  onMounted(() => {
    console.log('컴포넌트 마운트');
    fetchEmployees();
  });
  </script>
  
  <style scoped>
  .modal.show {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-open {
    overflow: hidden;
  }
  
  .table-responsive {
    min-height: 400px;
  }
  </style>