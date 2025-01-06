<template>
    <div class="container-fluid mt-4">
      <!-- 부서 관리 섹션 -->
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="mb-0">부서 관리</h5>
        </div>
        <div class="card-body">
          <!-- 부서 추가/수정 폼 -->
          <div class="row mb-4" v-if="showDepartmentForm">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h6 class="mb-0">{{ isEdit ? '부서 수정' : '부서 추가' }}</h6>
                </div>
                <div class="card-body">
                  <form @submit.prevent="saveDepartment">
                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <label class="form-label">부서명</label>
                        <input v-model="departmentForm.DEPARTMENT_NAME" type="text" class="form-control" required>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">관리자</label>
                        <select v-model="departmentForm.MANAGER_ID" class="form-select">
                          <option value="">선택하세요</option>
                          <option v-for="manager in managers" :key="manager.EMPLOYEE_ID" :value="manager.EMPLOYEE_ID">
                            {{ manager.FULL_NAME }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">위치</label>
                        <input v-model="departmentForm.LOCATION" type="text" class="form-control" required>
                      </div>
                    </div>
                    <div class="text-end">
                      <button type="button" class="btn btn-secondary me-2" @click="cancelDepartmentEdit">취소</button>
                      <button type="submit" class="btn btn-primary">저장</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
  
          <!-- 부서 목록 -->
          <div class="text-end mb-3" v-if="!showDepartmentForm">
            <button class="btn btn-primary" @click="showDepartmentForm = true">
              부서 추가
            </button>
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>부서 ID</th>
                  <th>부서명</th>
                  <th>관리자</th>
                  <th>위치</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dept in departments" :key="dept.DEPARTMENT_ID">
                  <td>{{ dept.DEPARTMENT_ID }}</td>
                  <td>{{ dept.DEPARTMENT_NAME }}</td>
                  <td>{{ dept.MANAGER_ID || '-' }}</td>
                  <td>{{ dept.LOCATION }}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editDepartment(dept)">
                      수정
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- 직급 관리 섹션 -->
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">직급 관리</h5>
        </div>
        <div class="card-body">
          <!-- 직급 추가/수정 폼 -->
          <div class="row mb-4" v-if="showJobForm">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h6 class="mb-0">{{ isEdit ? '직급 수정' : '직급 추가' }}</h6>
                </div>
                <div class="card-body">
                  <form @submit.prevent="saveJob">
                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <label class="form-label">직급명</label>
                        <input v-model="jobForm.JOB_TITLE" type="text" class="form-control" required>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">최소 급여</label>
                        <input v-model="jobForm.MIN_SALARY" type="number" class="form-control" required>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label class="form-label">최대 급여</label>
                        <input v-model="jobForm.MAX_SALARY" type="number" class="form-control" required>
                      </div>
                    </div>
                    <div class="text-end">
                      <button type="button" class="btn btn-secondary me-2" @click="cancelJobEdit">취소</button>
                      <button type="submit" class="btn btn-primary">저장</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
  
          <!-- 직급 목록 -->
          <div class="text-end mb-3" v-if="!showJobForm">
            <button class="btn btn-primary" @click="showJobForm = true">
              직급 추가
            </button>
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>직급 ID</th>
                  <th>직급명</th>
                  <th>최소 급여</th>
                  <th>최대 급여</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="job in jobs" :key="job.JOB_ID">
                  <td>{{ job.JOB_ID }}</td>
                  <td>{{ job.JOB_TITLE }}</td>
                  <td>{{ formatSalary(job.MIN_SALARY) }}</td>
                  <td>{{ formatSalary(job.MAX_SALARY) }}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editJob(job)">
                      수정
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  // 상태 관리
  const departments = ref([]);
  const jobs = ref([]);
  const managers = ref([]);
  const isEdit = ref(false);
  const showDepartmentForm = ref(false);
  const showJobForm = ref(false);
  
  // 폼 데이터
  const departmentForm = ref({
    DEPARTMENT_ID: null,
    DEPARTMENT_NAME: '',
    MANAGER_ID: '',
    LOCATION: ''
  });
  
  const jobForm = ref({
    JOB_ID: null,
    JOB_TITLE: '',
    MIN_SALARY: '',
    MAX_SALARY: ''
  });
  
  // 초기 데이터 로드
  onMounted(async () => {
    await Promise.all([
      fetchDepartments(),
      fetchJobs(),
      fetchManagers()
    ]);
  });
  
  // 데이터 조회 함수
  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/hr/departments');
      const result = await response.json();
      departments.value = result;
    } catch (error) {
      console.error('부서 목록 조회 실패:', error);
      alert('부서 목록을 불러오는데 실패했습니다.');
    }
  };
  
  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/hr/jobs');
      const result = await response.json();
      jobs.value = result;
    } catch (error) {
      console.error('직급 목록 조회 실패:', error);
      alert('직급 목록을 불러오는데 실패했습니다.');
    }
  };
  
  const fetchManagers = async () => {
    try {
      const response = await fetch('/api/hr/employees/managers');
      const result = await response.json();
      managers.value = result;
    } catch (error) {
      console.error('관리자 목록 조회 실패:', error);
      alert('관리자 목록을 불러오는데 실패했습니다.');
    }
  };
  
  // 부서 관련 함수
  const editDepartment = (department) => {
    isEdit.value = true;
    departmentForm.value = { ...department };
    showDepartmentForm.value = true;
  };
  
  const cancelDepartmentEdit = () => {
    isEdit.value = false;
    departmentForm.value = {
      DEPARTMENT_ID: null,
      DEPARTMENT_NAME: '',
      MANAGER_ID: '',
      LOCATION: ''
    };
    showDepartmentForm.value = false;
  };
  
  const saveDepartment = async () => {
    try {
      const url = isEdit.value 
        ? `/api/hr/departments/${departmentForm.value.DEPARTMENT_ID}`
        : '/api/hr/departments';
      
      const response = await fetch(url, {
        method: isEdit.value ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departmentForm.value),
      });
  
      if (!response.ok) throw new Error('저장 실패');
  
      await fetchDepartments();
      cancelDepartmentEdit();
      alert(isEdit.value ? '부서가 수정되었습니다.' : '부서가 추가되었습니다.');
    } catch (error) {
      console.error('부서 저장 실패:', error);
      alert('부서 저장에 실패했습니다.');
    }
  };
  
  // 직급 관련 함수
  const editJob = (job) => {
    isEdit.value = true;
    jobForm.value = { ...job };
    showJobForm.value = true;
  };
  
  const cancelJobEdit = () => {
    isEdit.value = false;
    jobForm.value = {
      JOB_ID: null,
      JOB_TITLE: '',
      MIN_SALARY: '',
      MAX_SALARY: ''
    };
    showJobForm.value = false;
  };
  
  const saveJob = async () => {
    try {
      const url = isEdit.value 
        ? `/api/hr/jobs/${jobForm.value.JOB_ID}`
        : '/api/hr/jobs';
      
      const response = await fetch(url, {
        method: isEdit.value ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobForm.value),
      });
  
      if (!response.ok) throw new Error('저장 실패');
  
      await fetchJobs();
      cancelJobEdit();
      alert(isEdit.value ? '직급이 수정되었습니다.' : '직급이 추가되었습니다.');
    } catch (error) {
      console.error('직급 저장 실패:', error);
      alert('직급 저장에 실패했습니다.');
    }
  };
  
  // 유틸리티 함수
  const formatSalary = (value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(value);
  };
  </script>