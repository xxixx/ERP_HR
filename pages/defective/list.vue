
<template>
    <div class="w-full max-w-3xl mx-auto py-8">
        <div class="container">
        <!-- Date Range Picker -->
        <div class="text-end me-5">
            <div class="mb-4 mx-4">
                <input class="px-3 mx-1" type="date" v-model="startDate" />
                <!-- 시작 날짜 선택 -->
                <input class="px-3 mx-1" type="date" v-model="endDate" />
                <!-- 종료 날짜 선택 -->
                <button class="btn btn-sm btn-warning" @click="fetchDataByDateRange">
                조회
                </button>
                <!-- 조회 버튼 -->
                </div>
            </div>
        </div>

      <h5 class="text-center mt-2">Defective List</h5>
      
      <div v-if="isLoading">
        <!-- Show loading indicator -->
        <p>Loading...</p>
      </div>
      <div v-else class="container chart_container">
        <div class="table-responsive">
          <table class="table table-sm">
            <!-- Table Header -->
            <thead>
              <tr>
                <th>DATE</th>
                <th>PART</th>
                <th>CATEGORY</th>
                <th>SUB_CATEGORY</th>
                <th>COUNT</th>
                <th class="d-none d-md-table-cell">ETC</th>
                <th class="d-none d-md-table-cell">CREATE DATE</th>
                <th>
                  <div class="btn btn-sm btn-success sm-btn" @click="exportToExcel">To EXCEL</div>
                </th>
              </tr>
            </thead>
            <!-- Table Body -->
            <tbody>
              <tr v-for="(item, index) in filteredData" :key="index">
                <td>{{ formatDateToMonthDay(item.DATE) }}</td>
                <td>{{ item.PART }}</td>
                <td>{{ item.CATEGORY }}</td>
                <td>{{ item.SUB_CATEGORY }}</td>
                <td>{{ item.COUNT }}</td>
                <td class="d-none d-md-table-cell">{{ item.ETC }}</td>
                <td class="d-none d-md-table-cell">{{ formatDate(item.CREATED_DATE) }}</td>
                <td><div class="btn btn-sm btn-danger" @click="onDelete(item.no)">DEL</div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- paging  -->
      <Pagination
        v-model:currentPage="currentPage"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
      />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue';
  import type { DefectiveModel } from '~~/server/model/defective';
  import { formatDateToMonthDay } from '~~/utils/formatDatetoMonth';
  import Pagination from '@/components/common/Pagination.vue';
  // 페이지 메타데이터 설정
 import { usePageStore } from '~/store/pageStore';
    const pageTitle = ref('불량 현황');
    // useHead를 사용하여 메타 태그 설정
    useHead({
    title: pageTitle.value, // 페이지 제목 설정
    
    });
    const pageStore = usePageStore();
    pageStore.setTitle(pageTitle.value);
    
  const startDate = ref('');
  const endDate = ref('');
  const Data = ref<DefectiveModel[]>([]);
  const isLoading = ref(false);
  
  // 페이징 관련 상태
  const currentPage = ref(1);
  const itemsPerPage = ref(20);
  const totalItems = computed(() => Data.value.length);
  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

  // 표시할 페이지 번호 계산
  const displayedPages = computed(() => {
    const pages = [];
    const ellipsis = -1;
 // 항상 처음 2페이지는 표시
//  for (let i = 1; i <= Math.min(2, totalPages.value); i++) {
    // 항상 처음 3페이지는 표시
    for (let i = 1; i <= Math.min(3, totalPages.value); i++) {
      pages.push(i);
    }

    // 현재 페이지 주변 페이지 계산
    // 2게페이지 일떼
    // let startPage = Math.max(3, currentPage.value - 1);
    // let endPage = Math.min(totalPages.value - 2, currentPage.value + 1);


    //3개페이지 일때
    let startPage = Math.max(4, currentPage.value - 1);
    let endPage = Math.min(totalPages.value - 3, currentPage.value + 1);

    // 시작 부분에 '...' 추가
    // 2개페이지 일때 
    // if (startPage > 3) {

    //3개페이지 일때
    if (startPage > 4) {
      pages.push(ellipsis);
    }

    // 중간 페이지들 추가
    for (let i = startPage; i <= endPage; i++) {
      if (i > 3 && i < totalPages.value - 2) {
        pages.push(i);
      }
    }

    // 끝 부분에 '...' 추가
    // 2개페이지 일때
    // if (endPage < totalPages.value - 2) {

    // 3개페이지 일때
    if (endPage < totalPages.value - 3) {
      pages.push(ellipsis);
    }

    // 마지막 3페이지 추가
    // 2개페이지 일때
    // for (let i = Math.max(totalPages.value - 1, endPage + 1); i <= totalPages.value; i++) {

    // 3개페이지 일때
    for (let i = Math.max(totalPages.value - 2, endPage + 1); i <= totalPages.value; i++) {
      if (i > pages[pages.length - 1]) {
        pages.push(i);
      }
    }

    return pages;
  });

  // 페이지별 데이터 필터링
  const filteredData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return Data.value.slice(start, end);
  });

  // 페이지 변경 함수
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const fetchData = async () => {
    try {
      const result = await $fetch('/api/defective/getAllData');
      Data.value = result.data as DefectiveModel[];
      isLoading.value = false;
    } catch {
      alert('Fetch error');
    }
  };
  
  const fetchDataByDateRange = async () => {
    try {
      isLoading.value = true;
      console.log('기간 조회 시작:', startDate.value, endDate.value);
      
      if (!startDate.value || !endDate.value) {
        alert('시작일과 종료일을 모두 선택해주세요.');
        isLoading.value = false;
        return;
      }

      const result = await $fetch('/api/defective/getDataByDate', {
        method: 'GET',
        params: {
          startDate: startDate.value,
          endDate: endDate.value
        }
      });

      console.log('조회 결과:', result);
      Data.value = result.data;
      currentPage.value = 1; // 페이지를 1페이지로 리셋
    } catch (error) {
      console.error('기간 조회 에러:', error);
      alert('데이터 조회 중 오류가 발생했습니다.');
    } finally {
      isLoading.value = false;
    }
  };
  
  const exportToExcel = () => {
    // Function to export data to Excel
  };
  
  const onDelete = (no: number) => {
    // Function to delete item
  };
  
  onMounted(fetchData);

  
  </script>
  
  <style scoped>
/* 페이징 */
a {
    color: #cc1b6f;
    text-decoration: none;
    transition: color 0.5s ease;
  }
  .pages {
    text-align: center;
    margin-top: 10px;
  }
  
  .pages a {
    display: inline-block;
  }
  
  .pages .back,
  .pages .next {
    font-family: "Fira Sans", sans-serif;
    font-weight: 900;
    font-size: 10pt;
    margin: 0 40px;
    color: #23182c;
  }
  
  .pages .back span,
  .pages .next span {
    font-size: 13pt;
    margin: 0 4px;
  }
  .bg-warning {
   border-radius: 5px;
   height: 40px;
  }
  @media (max-width: 768px) {
    .pages .back,
    .pages .next {
      display: none;
    }
  }
  
  .pages .back:not(.disabled):hover,
  .pages .next:not(.disabled):hover {
    color: #cc1b6f;
  }
  
  .pages .back.disabled,
  .pages .next.disabled {
    color: #bdb9bf;
    cursor: default;
  }
  
  .pages .page {
    -webkit-border-radius: 50%;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 50%;
    -moz-background-clip: padding;
    border-radius: 50%;
    background-clip: padding-box;
    width: 34px;
    height: 34px;
    margin: 0 4px;
    background: #cc1b6f;
    color: #fff;
    border: 2px solid #cc1b6f;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  
  .pages .page:not(.active):hover {
    border-color: #23182c;
    background: #fff;
    color: #23182c;
  }
  
  .pages .page.active {
    background: #fff;
    color: #cc1b6f;
    cursor: default;
  }
  .ellipsis {
    color: #6c757d;
    cursor: default;
    padding: 0.5rem 0.75rem;
    text-decoration: none;
    border: none;
    background: transparent;
  }
</style>