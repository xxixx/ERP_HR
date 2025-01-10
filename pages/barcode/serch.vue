<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col-md-6">
        <div class="input-group">
          <input 
            type="text" 
            class="form-control" 
            v-model="searchQuery"
            placeholder="바코드를 입력하세요"
            @keyup.enter="handleSearch"
          />
          <select v-model="searchType" class="form-select">
            <option value="exact">정확히 일치</option>
            <option value="partial">부분 일치</option>
          </select>
          <button class="btn btn-primary" @click="handleSearch">검색</button>
          <button class="btn btn-secondary" @click="refreshData">
            <i class="bi bi-arrow-clockwise"></i> 새로고침
          </button>
        </div>
      </div>
      <div class="col-md-3">
        <input 
          type="date" 
          class="form-control"
          v-model="dateRange.start"
          @change="handleSearch"
        />
      </div>
      <div class="col-md-3">
        <input 
          type="date" 
          class="form-control"
          v-model="dateRange.end"
          @change="handleSearch"
        />
      </div>
    </div>

    <!-- 로딩 상태 표시 -->
    <div v-if="isLoading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- 검색 결과 테이블 -->
    <div v-else>
      <div class="table-responsive" v-if="results.length > 0">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>NO</th>
              <th>바코드</th>
              <th>생성일자</th>
              <th>박스번호</th>
              <th>LOT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in results" :key="item.NO">
              <td>{{ item.NO }}</td>
              <td>{{ item.BARCODE }}</td>
              <td>{{ item.CREATE_DATE }}</td>
              <td>{{ item.BOX_NO }}</td>
              <td>{{ item.LOT }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="hasSearched" class="text-center mt-4">
        검색 결과가 없습니다.
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div class="d-flex justify-content-center mt-3" v-if="totalItems > 0">
      <Pagination 
        :totalItems="totalItems" 
        :itemsPerPage="itemsPerPage"
        v-model:currentPage="currentPage"
        @update:currentPage="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Pagination from '~/components/common/Pagination.vue'
// 페이지 메타데이터 설정
const pageTitle = ref('바코드 검색');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);

const searchQuery = ref('')
const searchType = ref('exact')
const dateRange = ref({
  start: '',
  end: ''
})
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = ref(0)
const results = ref([])
const hasSearched = ref(false)
const isLoading = ref(false)

// 검색 함수
const handleSearch = async () => {
  try {
    isLoading.value = true
    console.log('검색 시작:', {
      query: searchQuery.value,
      type: searchType.value,
      dateStart: dateRange.value.start,
      dateEnd: dateRange.value.end
    })

    const response = await $fetch('/api/barcode/search', {
      method: 'GET',
      params: {
        query: searchQuery.value,
        type: searchType.value,
        dateStart: dateRange.value.start,
        dateEnd: dateRange.value.end,
        page: currentPage.value,
        limit: itemsPerPage.value
      },
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
    
    console.log('검색 결과:', response)
    results.value = response.data
    totalItems.value = response.total
    hasSearched.value = true
  } catch (error) {
    console.error('검색 중 오류 발생:', error)
    alert('검색 중 오류가 발생했습니다.')
  } finally {
    isLoading.value = false
  }
}

// 페이지 변경 처리
const handlePageChange = (page) => {
  currentPage.value = page
  handleSearch()
}

// 데이터 새로고침
const refreshData = () => {
  results.value = []
  hasSearched.value = false
  currentPage.value = 1
  handleSearch()
}

// 컴포넌트 마운트 시 초기 검색
onMounted(() => {
//   handleSearch()
})

// 자동 새로고침 설정 (선택적)
let refreshInterval
onMounted(() => {
  // 30초마다 자동 새로고침
  refreshInterval = setInterval(refreshData, 30000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}

.btn-secondary {
  margin-left: 5px;
}

/* 스피너 스타일 */
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>