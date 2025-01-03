<template>
    <div class="container-fluid">
      <!-- 페이지 헤더 -->
      <div class="row mb-4">
        <div class="col">
          <h2>연차 초기화</h2>
        </div>
      </div>
  
      <!-- 연차 초기화 폼 -->
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="handleInitializeLeave">
                <div class="mb-3">
                  <label class="form-label">직원</label>
                  <select v-model="initLeaveForm.EMPLOYEE_ID" class="form-select" required>
                    <option value="">직원을 선택하세요</option>
  <option v-for="emp in employees" :key="emp.EMPLOYEE_ID" :value="emp.EMPLOYEE_ID">
    {{ emp.EMPLOYEE_ID }} ({{ emp.FULL_NAME }})
  </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">년도</label>
                  <input 
                    type="number" 
                    v-model="initLeaveForm.YEAR" 
                    class="form-control" 
                    required 
                    min="2000" 
                    max="2100"
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">총 연차</label>
                  <input 
                    type="number" 
                    v-model="initLeaveForm.TOTAL_DAYS" 
                    class="form-control" 
                    required 
                    min="0" 
                    step="0.5"
                    @input="calculateRemaining"
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">사용 연차</label>
                  <input 
                    type="number" 
                    v-model="initLeaveForm.USED_DAYS" 
                    class="form-control" 
                    required 
                    min="0" 
                    step="0.5"
                    @input="calculateRemaining"
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">잔여 연차</label>
                  <input 
                    type="number" 
                    v-model="initLeaveForm.REMAINING_DAYS" 
                    class="form-control" 
                    readonly
                  >
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">초기화</button>
                </div>
              </form>
            </div>
          </div>
        </div>
  
        <!-- 현재 연차 정보 테이블 -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-3">현재 연차 정보</h5>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>직원명</th>
                      <th>년도</th>
                      <th>총 연차</th>
                      <th>사용 연차</th>
                      <th>잔여 연차</th>
                    </tr>
                  </thead>
                  <tbody>
      <tr v-for="leave in leaveBalances" :key="`${leave.EMPLOYEE_ID}-${leave.YEAR}`">
        <td>{{ leave.NAME }}</td>
        <td>{{ leave.YEAR }}</td>
        <td>{{ leave.TOTAL_DAYS }}</td>
        <td>{{ leave.USED_DAYS }}</td>
        <td>{{ leave.REMAINING_DAYS }}</td>
      </tr>
    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  // 상태 관리
  const employees = ref([]);
  const leaveBalances = ref([]);
  const initLeaveForm = ref({
    EMPLOYEE_ID: '',
    YEAR: new Date().getFullYear(),
    TOTAL_DAYS: 15,
    USED_DAYS: 0,
    REMAINING_DAYS: 15
  });
  
  // 직원 목록 조회
  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/hr/employeesList');
      if (!response.ok) throw new Error('직원 목록 조회 실패');
      const data = await response.json();
      employees.value = data.data;
    } catch (error) {
      console.error('직원 목록 조회 오류:', error);
      alert('직원 목록을 불러오는데 실패했습니다.');
    }
  };
  
  // 연차 정보 조회
  const fetchLeaveBalances = async () => {
    try {
      const response = await fetch('/api/hr/leave/balances');
      if (!response.ok) throw new Error('연차 정보 조회 실패');
      const data = await response.json();
      leaveBalances.value = data.data;
    } catch (error) {
      console.error('연차 정보 조회 오류:', error);
      alert('연차 정보를 불러오는데 실패했습니다.');
    }
  };
  
  // 잔여 연차 계산
  const calculateRemaining = () => {
    const total = Number(initLeaveForm.value.TOTAL_DAYS) || 0;
    const used = Number(initLeaveForm.value.USED_DAYS) || 0;
    initLeaveForm.value.REMAINING_DAYS = total - used;
  };
  
  // 연차 초기화 처리
  const handleInitializeLeave = async () => {
    try {
      const response = await fetch('/api/hr/leave/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initLeaveForm.value)
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.statusMessage || '연차 초기화 중 오류가 발생했습니다.');
      }
  
      alert('연차가 성공적으로 초기화되었습니다.');
  
      // 폼 초기화
      initLeaveForm.value = {
        EMPLOYEE_ID: '',
        YEAR: new Date().getFullYear(),
        TOTAL_DAYS: 15,
        USED_DAYS: 0,
        REMAINING_DAYS: 15
      };
  
      // 목록 새로고침
      await fetchLeaveBalances();
    } catch (error) {
      alert(error instanceof Error ? error.message : '연차 초기화 중 오류가 발생했습니다.');
    }
  };
  
  // 컴포넌트 마운트 시 초기 데이터 로드
  onMounted(() => {
    fetchEmployees();
    fetchLeaveBalances();
  });
  </script>
  
  <style scoped>
  .card {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  }
  
  .table th {
    background-color: #f8f9fa;
  }
  
  .form-control:read-only {
    background-color: #e9ecef;
  }
  </style>