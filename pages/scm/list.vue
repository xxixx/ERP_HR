<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <!-- <h5 class="text-center mt-2">원단 조회</h5> -->
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else class="container chart_container"></div>
    <div class="album py-2 bg-body-tertiary"></div>
    <div class="container">
      <div class="mb-4 mx-4">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          class="form-control"
          placeholder="검색어를  입력하세요"
        />
      </div>
    
      <div class="text-end me-4">
        <input class="px-3 mx-1" type="date" v-model="startDate" />
        <input class="px-3 mx-1" type="date" v-model="endDate" />
        <button class="btn btn-sm btn-warning" @click="fetchDataByDateRange">
          조회
        </button>
      </div>
    </div>
    <hr />
    
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else class="container">
      <div class="text-end me-4">
        <div class="btn btn-sm btn-success sm-btn" @click="exportToExcel">
                  <svg width="24px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path fill="white" d="M0 0h24v24H0z" />
                      <path d="M2.859 2.877l12.57-1.795a.5.5 0 0 1 .571.495v20.846a.5.5 0 0 1-.57.495L2.858 21.123a1 1 0 0 1-.859-.99V3.867a1 1 0 0 1 .859-.99zM4 4.735v14.53l10 1.429V3.306L4 4.735zM17 19h3V5h-3V3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4v-2zm-6.8-7l2.8 4h-2.4L9 13.714 7.4 16H5l2.8-4L5 8h2.4L9 10.286 10.6 8H13l-2.8 4z" />
                    </g>
                  </svg>
                </div>
      </div>
      <div class="table-responsive">
        <table class="table table-sm text-center">
          <thead>
            <tr>
              <th>NO</th>
              <th>등록일</th>
              <th>BARCODE</th>
             
             
              <th>
                
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filterData" :key="index">
              <td>{{ item.NO }}</td>
              <td>{{ formatDate(item.REG_DATE) }}</td>
              <td>{{ item.BARCODE }}</td>
              
              
              <td>
                <div>
                 
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="totalPages > 1" class="pages d-flex justify-content-center">
      <ul class="pagination pages">
        <li>
          <a href="#" class="back" :class="{ disabled: currentPage === 1 }" @click.prevent="prevPage" aria-label="Previous">
            <span aria-hidden="true" class="fa fa-arrow-circle-left"></span>
            Prev
          </a>
        </li>
        <template v-for="page in getPageRange" :key="page">
          <li v-if="page === '...'" class="page-item d-inline">
            <span class="page-ellipsis">...</span>
          </li>
          <li v-else class="page-item d-inline" :class="{ active: currentPage === page }">
            <a href="#" class="page page-item" @click.prevent="goToPage(page)">
              {{ page }}
            </a>
          </li>
        </template>
        <li class="page-item d-inline">
          <a href="#" class="next" :class="{ disabled: currentPage === totalPages }" @click.prevent="nextPage" aria-label="Next">
            <span aria-hidden="true" class="fa fa-arrow-circle-right"></span>
            Next
          </a>
        </li>
      </ul>
    </div>
    <hr />
  
  </div>
</template>

<script setup lang="ts">
import type { WondanModel } from "~~/server/model/wondan";
import { useAccountStore } from "~/store/account";
import { formatDate } from "~/utils/datefomatter";

import { ref, reactive, computed, onMounted, watch } from 'vue';
import * as XLSX from "xlsx";

// 페이지 메타데이터 설정
const pageTitle = ref('등록 바코드 조회');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정
const accountStore = useAccountStore();
// 페이지  권한 설정
import { useAuthStore } from '~/store/auth';
  const authStore = useAuthStore();
 
  const userLevel = computed(() => {
    return authStore.getUser?.level ?? '로그인이 필요합니다';
  });
  



const regUser = ref("");
const registerData = ref([]); 
const isLoading = ref(true);


const searchQuery = ref("");

const totalRecords = ref(0);

const fetchData = async () => {
  try {
    const data = await $fetch('/api/scm/getRecord ')
   registerData.value = data.data
  
    await fetchPagedData();
  } catch {
    alert("Fetch error");
  }
};


// 상태 정의
const filterData = ref([]); 
const currentPage = ref(1);
const pageSize = 20;
const totalPages = ref(0);

const fetchPagedData = async (page = 1) => { 
  try {
    isLoading.value = true;
    const { data, totalPages: fetchedTotalPages } = await $fetch(`/api/scm/getPagedRecord?page=${page}&pageSize=${pageSize}`);
    
    registerData.value = data || [];
    filterData.value = data || [];
    totalPages.value = fetchedTotalPages || 0;
    
  } catch (error) {
    console.error("Error fetching data:", error);
    registerData.value = [];
    filterData.value = [];
    totalPages.value = 0;
  } finally {
    isLoading.value = false;
  }
};

// 기간별 조회 관련 상태
const startDate = ref('');
const endDate = ref('');
const RecordsByDate = ref('');
const fetchDataByDateRange = async () => {
  try {
    isLoading.value = true;
    const { data, totalPages: fetchedTotalPages } = await $fetch(
      `/api/scm/getRecordsByDate?startDate=${startDate.value}&endDate=${endDate.value}&page=${currentPage.value}&limit=${pageSize}`
    );
    
    filterData.value = data || [];
    totalPages.value = fetchedTotalPages || 0;
    
  } catch (error) {
    console.error("Error fetching records:", error);
    filterData.value = [];
    totalPages.value = 0;
  } finally {
    isLoading.value = false;
  }
};

// 검색 조회 관련 상태
const searchTerm = ref('');
const searchResults = ref([]);
// 검색 조회 함수
const fetchDataSerch = async () => {
  // const { data, page, limit, totalPages: fetchedTotalPages } = await $fetch(`/api/wondan/getRecordsByDate?startDate=${startDate.value}&endDate=${endDate.value}&page=${currentPage.value}&limit=${pageSize}`);
  const { data, page, limit, totalPages: fetchedTotalPages } = await $fetch(`/api/scm/searchRecords?searchTerm=${searchTerm.value}&page=${currentPage.value}&limit=${pageSize}`);
  console.log("search data", searchTerm.value);
  totalPages.value = fetchedTotalPages; // 총 페이지 수 업데이트
  searchResults.value = data; // 검색 결과를 searchResults에 저장
  filterData.value = data; // 검색 결과를 filterData에 저장
  // currentPage.value = 1; // 검색 후 첫 페이지로 초기화 (필요시 주석 해제)
};

// 검색 관련 상태 및 함수
const handleSearch = async () => {
  try {
    isLoading.value = true;
    if (!searchQuery.value.trim()) {
      await fetchPagedData(currentPage.value);
      return;
    }
    
    const { records, totalPages: fetchedTotalPages } = await $fetch(
      `/api/scm/searchByQuery?searchQuery=${searchQuery.value}&page=${currentPage.value}&limit=${pageSize}`
    );
    
    filterData.value = records || [];
    totalPages.value = fetchedTotalPages || 0;
    
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
    filterData.value = [];
    totalPages.value = 0;
    alert('검색 중 오류가 발생했습니다.');
  } finally {
    isLoading.value = false;
  }
};

// watch(wondanInventory, (newValue) => {
//   console.log("wondanInventory updated:", newValue);
// }, { deep: true });

// 페이지네이션 표시 범위 계산
const getPageRange = computed(() => {
  const range = 2; // 현재 페이지 앞뒤로 표시할 페이지 수
  const showFirst = true; // 첫 페이지 표시 여부
  const showLast = true; // 마지막 페이지 표시 여부
  const pages = [];
  
  // 시작과 끝 페이지 계산
  let start = Math.max(1, currentPage.value - range);
  let end = Math.min(totalPages.value, currentPage.value + range);
  
  // 첫 페이지 표시
  if (showFirst && start > 1) {
    pages.push(1);
    if (start > 2) pages.push('...');
  }
  
  // 중간 페이지들 표시
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  // 마지막 페이지 표시
  if (showLast && end < totalPages.value) {
    if (end < totalPages.value - 1) pages.push('...');
    pages.push(totalPages.value);
  }
  
  return pages;
});

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    if (startDate.value && endDate.value) {
      await fetchDataByDateRange();
    } else {
      await fetchPagedData(currentPage.value);
    }
  }
};

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    if (startDate.value && endDate.value) {
      await   fetchDataByDateRange();
    } else {
      await fetchPagedData(currentPage.value);;
    }
  }
};

const goToPage = async (page: number) => {
  console.log("goToPage", page);
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    if (startDate.value && endDate.value) {
      await fetchDataByDateRange();
    } else {
      await fetchPagedData(currentPage.value);
    }
  }
};



onMounted(fetchData);
onMounted(fetchPagedData);

const onDelete = async (NO: number) => {
  const confirmation = confirm(NO + "번 항목을 정말 삭제하시겠습니까?");
  if (!confirmation) {
    return;
  }
  try {
    await $fetch("/api/wondan/delete/" + NO, {
      method: "DELETE",
    });
    alert(NO + "번 항목이 삭제되었습니다.");
    await fetchData();
  } catch (error) {
    alert("삭제 중 오류가 발생했습니다.");
  }
};

const onEdit = async (item: any) => {
  isModalOpen.value = true;
  selectedItem.value = item;
};

const exportToExcel = () => {
  const data = filterData.value;
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  const fileName = "table_data.xlsx";
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<style scoped>
label {
  padding-left: 10%;
  font-size: small;
  border-bottom: 1px solid rgb(182, 67, 67);
  width: 100%;
  margin-bottom: 5px;
}
.col,
.col-1,
.col-2,
.col-4 {
  margin-right: 5px;
  text-align: center;
}
.form-control::placeholder {
  font-size: 12px;
}
@media (max-width: 720.98px) {
  .table-sm td {
    font-size: 0.7rem;
  }
}
td {
  font-weight: 300;
}
@media (max-width: 720.98px) {
  .table-sm th {
    font-size: 0.7rem;
  }
}
th {
  font-weight: 500;
  background-color: rgb(247, 226, 226);
}
.table-sm .btn {
  font-size: 0.7rem;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right center;
  padding-right: 1.5em;
  font-size: 0.8rem;
}
input {
  font-size: 0.8rem;
}
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
  border-radius: 50%;
  background-clip: padding-box;
  width: 34px;
  height: 34px;
  margin: 0 4px;
  background: #cc1b6f;
  color: #fff;
  border: 2px solid #cc1b6f;
  display: inline-flex;
  justify-content: center;
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
.page-ellipsis {
  display: inline-block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  color: #666;
  font-weight: bold;
}

@media (max-width: 768px) {
  .pages .back,
  .pages .next {
    margin: 0 20px;
  }
  
  .pages .page {
    width: 30px;
    height: 30px;
    margin: 0 2px;
    font-size: 0.9rem;
  }
  
  .page-ellipsis {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
}
</style>
