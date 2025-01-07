<template>
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col">
          <h2>데이터베이스 백업 관리</h2>
        </div>
      </div>
  
      <div class="row mb-4">
        <div class="col">
          <button 
            class="btn btn-primary" 
            @click="createBackup" 
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            새 백업 생성
          </button>
        </div>
      </div>
  
      <!-- 백업 목록 테이블 -->
      <div class="row">
        <div class="col">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>파일명</th>
                  <th>크기</th>
                  <th>생성일</th>
                  <th>상태</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="backup in backupList" :key="backup.BACKUP_NAME">
                  <td>{{ backup.BACKUP_NAME }}</td>
                  <td>{{ formatFileSize(backup.BACKUP_SIZE) }}</td>
                  <td>{{ formatDate(backup.BACKUP_DATE) }}</td>
                  <td>
                    <span :class="getStatusBadgeClass(backup.STATUS)">
                      {{ backup.STATUS }}
                    </span>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button 
                        class="btn btn-sm btn-secondary" 
                        @click="downloadBackup(backup.BACKUP_NAME)"
                      >
                        다운로드
                      </button>
                      <button 
                        v-if="!selectedBackup || selectedBackup.BACKUP_NAME !== backup.BACKUP_NAME"
                        class="btn btn-sm btn-danger" 
                        @click="confirmDelete(backup)"
                      >
                        삭제
                      </button>
                    </div>
                    <!-- 삭제 확인 UI -->
                    <div v-if="selectedBackup && selectedBackup.BACKUP_NAME === backup.BACKUP_NAME" 
                         class="mt-2 p-2 bg-light rounded">
                      <p class="mb-2">정말 삭제하시겠습니까?</p>
                      <div class="btn-group">
                        <button 
                          class="btn btn-sm btn-danger" 
                          @click="deleteBackup"
                        >
                          확인
                        </button>
                        <button 
                          class="btn btn-sm btn-secondary" 
                          @click="selectedBackup = null"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="backupList.length === 0">
                  <td colspan="5" class="text-center">
                    백업 파일이 없습니다.
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
  
  const backupList = ref([]);
  const isLoading = ref(false);
  const selectedBackup = ref(null);
  
  // 백업 목록 조회
    // 백업 목록 조회
   // 백업 목록 조회
const fetchBackupList = async () => {
  try {
    isLoading.value = true;
    const response = await fetch('/api/admin/backup');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      backupList.value = data;
    } catch (e) {
      console.error('JSON 파싱 실패:', text);
      throw new Error('서버 응답을 처리할 수 없습니다.');
    }
  } catch (error) {
    console.error('백업 목록 조회 실패:', error);
    alert('백업 목록을 불러오는데 실패했습니다.');
  } finally {
    isLoading.value = false;
  }
};
  
  // 새 백업 생성
  const createBackup = async () => {
    try {
      isLoading.value = true;
      const response = await fetch('/api/admin/backup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        if (result.success) {
          alert('백업이 성공적으로 생성되었습니다.');
          await fetchBackupList();
        } else {
          throw new Error(result.message || '백업 생성 실패');
        }
      } catch (e) {
        console.error('JSON 파싱 실패:', text);
        throw new Error('서버 응답을 처리할 수 없습니다.');
      }
    } catch (error) {
      console.error('백업 생성 실패:', error);
      alert(error.message || '백업 생성에 실패했습니다.');
    } finally {
      isLoading.value = false;
    }
  };
  
  // 백업 파일 다운로드
  const downloadBackup = async (filename: string) => {
    try {
      console.log('다운로드 요청 파일명:', filename);
      // 전체 URL을 사용
      const baseUrl = window.location.origin;
      const downloadUrl = `${baseUrl}/api/admin/backup/file/${encodeURIComponent(filename)}`;
      console.log('다운로드 URL:', downloadUrl);
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('백업 다운로드 실패:', error);
      alert('백업 파일 다운로드에 실패했습니다.');
    }
  };
  
  // 유틸리티 함수
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusBadgeClass = (status: string) => {
    const classes = {
      'SUCCESS': 'badge bg-success',
      'FAILED': 'badge bg-danger',
      'IN_PROGRESS': 'badge bg-warning'
    };
    return classes[status] || 'badge bg-secondary';
  };
  
  // 컴포넌트 마운트 시 초기화
  onMounted(() => {
    fetchBackupList();
  });
  </script>
  
  <style scoped>
  .table td {
    vertical-align: middle;
  }
  </style>