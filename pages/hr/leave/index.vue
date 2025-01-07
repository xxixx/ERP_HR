<template>
    <div class="container-fluid">
      <!-- 연차 잔여일수 카드 -->
      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">총 연차</h6>
              <h4 class="card-title">{{ leaveBalance.TOTAL_DAYS || 0 }}일</h4>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">사용 연차</h6>
              <h4 class="card-title">{{ leaveBalance.USED_DAYS || 0 }}일</h4>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">잔여 연차</h6>
              <h4 class="card-title">{{ leaveBalance.REMAINING_DAYS || 0 }}일</h4>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 연차 신청 내역 -->
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title">연차 신청 내역</h5>
            <button class="btn btn-primary" @click="router.push('/hr/leave/request')">
              연차 신청
            </button>
          </div>
  
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>신청일</th>
                  <th>기간</th>
                  <th>일수</th>
                  <th>종류</th>
                  <th>사유</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="leave in leaveHistory" :key="leave.LEAVE_ID">
                  <td>{{ formatDate(leave.CREATED_AT) }}</td>
                  <td>{{ formatDate(leave.START_DATE) }} ~ {{ formatDate(leave.END_DATE) }}</td>
                  <td>{{ leave.DAYS_COUNT }}일</td>
                  <td>{{ leave.LEAVE_TYPE }}</td>
                  <td>{{ leave.REASON }}</td>
                  <td>
                    <span :class="getStatusBadgeClass(leave.STATUS)">
                      {{ leave.STATUS }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
 
   // 페이지 메타데이터 설정
const pageTitle = ref('년차 관리');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정

  const router = useRouter();
  const leaveBalance = ref({});
  const leaveHistory = ref([]);
  
  // 연차 잔여일수 조회
  const fetchLeaveBalance = async () => {
    try {
      const response = await fetch(`/api/hr/leave/balance/${employeeId}`);
      if (response.ok) {
        leaveBalance.value = await response.json();
      }
    } catch (error) {
      console.error('연차 정보 조회 실패:', error);
    }
  };
  
  // 연차 신청 내역 조회
  const fetchLeaveHistory = async () => {
    try {
      const response = await fetch(`/api/hr/leave/history/${employeeId}`);
      if (response.ok) {
        leaveHistory.value = await response.json();
      }
    } catch (error) {
      console.error('연차 내역 조회 실패:', error);
    }
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ko-KR');
  };
  
  const getStatusBadgeClass = (status) => {
    const classes = {
      '신청': 'badge bg-warning',
      '승인': 'badge bg-success',
      '반려': 'badge bg-danger'
    };
    return classes[status] || 'badge bg-secondary';
  };
  
  onMounted(() => {
    fetchLeaveBalance();
    fetchLeaveHistory();
  });
  </script>
  
  <style scoped>
  .card {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  }
  .badge {
    padding: 0.5em 0.75em;
  }
  </style>