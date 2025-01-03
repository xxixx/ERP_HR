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
          v-model="searchTerm"
          @input="fetchDataSerch"
          type="text"
          class="form-control"
          placeholder="검색어를 입력하세요"
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
      <div class="table-responsive">
        <table class="table table-sm text-center">
          <thead>
            <tr>
              <th>NO</th>
              <th>등록일</th>
              <th>원단구분</th>
              <th>LOT NO</th>
              <th>길이</th>
              <th>실길이</th>
              <th>공급자</th>
              <th>등록자</th>
              <th class="d-none d-md-table-cell" @click="sortData('STATE')">
                <div class="d-flex justify-content-center align-items-end">
                  <span>상태</span>
                </div>
              </th>
              <th>
                <div class="btn btn-sm btn-success sm-btn" @click="exportToExcel">
                  <svg width="24px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path fill="white" d="M0 0h24v24H0z" />
                      <path d="M2.859 2.877l12.57-1.795a.5.5 0 0 1 .571.495v20.846a.5.5 0 0 1-.57.495L2.858 21.123a1 1 0 0 1-.859-.99V3.867a1 1 0 0 1 .859-.99zM4 4.735v14.53l10 1.429V3.306L4 4.735zM17 19h3V5h-3V3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4v-2zm-6.8-7l2.8 4h-2.4L9 13.714 7.4 16H5l2.8-4L5 8h2.4L9 10.286 10.6 8H13l-2.8 4z" />
                    </g>
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filterData" :key="index">
              <td>{{ item.NO }}</td>
              <td>{{ formatDate(item.REG_DATE) }}</td>
              <td>{{ item.WONDAN_NAME }}</td>
              <td>{{ item.LOT_NO }}</td>
              <td>{{ item.LENGTH }}</td>
              <td>{{ item.REAL_LENGTH }}</td>
              <td>{{ item.SUPPLY }}</td>
              <td>{{ item.REG_ACCOUNT }}</td>
              <td class="d-none d-md-table-cell">{{ item.STATE }}</td>
              <td>
                <div>
                 
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <div v-if="registerData.length > 0" class="pages d-flex justify-content-center">
      <ul class="pagination pages">
        <li>
          <a href="#" class="back" :class="{ disabled: currentPage === 1 }" @click.prevent="prevPage" aria-label="Previous">
            <span aria-hidden="true" class="fa fa-arrow-circle-left"></span>
            Prev
          </a>
        </li>
        <li class="page-item d-inline" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <a href="#" class="page page-item" @click.prevent="goToPage(page)">
            {{ page }}
          </a>
        </li>
        <li class="page-item d-inline">
          <a href="#" class="next" :class="{ disabled: currentPage === totalPages }" @click.prevent="nextPage" aria-label="Next">
            <span aria-hidden="true" class="fa fa-arrow-circle-right"></span>
            Next
          </a>
        </li>
      </ul>
    </div> -->
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
const pageTitle = ref('전체 원단 조회');
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
const registerData = ref(null)
const isLoading = ref(true);
const searchQuery = ref("");

const totalRecords = ref(0);

const fetchData = async () => {
  try {
    const result = await $fetch('/api/scm/getRecord ')
   registerData.value = result.data
   filterData.value = result.data
    regUser.value = accountStore.user ? accountStore.user.NAME : "";
    await fetchPagedData();
  } catch {
    alert("Fetch error");
  }
};


// 상태 정의
const filterData = ref([]); // 모든 데이터를 저장할 배열
const currentPage = ref(1);
const pageSize = 20;
const totalPages = ref(0);

const fetchPagedData = async (page = 1) => { // 기본값을 1로 설정
  console.log("page", page);
  console.log("pageSize", pageSize);
  
  const { data, totalPages: fetchedTotalPages } = await $fetch(`/api/wondan/getPagedRecord2?page=${page}&pageSize=${pageSize}`);
  isLoading.value = false;
  console.log("data", data);
  console.log("totalRecords", totalPages.value); // ref 객체의 값을 가져옵니다.
  console.log("data length", data.length);
  
  wondanInventory.value = data; // 'data' 필드에서 실제 레코드 가져오기
  filterData.value = data; // 'data' 필드에서 실제 레코드 가져오기
  
  // totalPages를 ref 객체에 할당
  totalPages.value = fetchedTotalPages; // 서버에서 가져온 totalPages를 ref 객체에 할당
  console.log("data totalPages", totalPages.value);
};


// 기간별 조회 관련 상태
const startDate = ref('');
const endDate = ref('');
const RecordsByDate = ref('');
const fetchDataByDateRange = async () => {
  console.log("fetchRecordsByDate", startDate.value, endDate.value);
  
  try {
    const { data, page, limit, totalPages: fetchedTotalPages } = await $fetch(`/api/wondan/getRecordsByDate?startDate=${startDate.value}&endDate=${endDate.value}&page=${currentPage.value}&limit=${pageSize}`);
    
    RecordsByDate.value = data;
    console.log("fetchRecordsByDate data", data);
    console.log("fetchRecordsByDate page", page);
    console.log("fetchRecordsByDate limit", limit);
    console.log("fetchRecordsByDate totalPages", fetchedTotalPages);
    
    totalPages.value = fetchedTotalPages; // 서버에서 받은 totalPages를 ref 객체에 할당
    
    filterData.value = data; // 기간별 조회 결과를 filterData에 저장
    console.log("fetchRecordsByDate totalPages", totalPages.value);
    
    // currentPage는 페이지를 변경할 때마다 업데이트해야 합니다.
  } catch (error) {
    console.error("Error fetching records:", error);
    // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
  }
};


// 검색 조회 관련 상태
const searchTerm = ref('');
const searchResults = ref([]);
// 검색 조회 함수
const fetchDataSerch = async () => {
  // const { data, page, limit, totalPages: fetchedTotalPages } = await $fetch(`/api/wondan/getRecordsByDate?startDate=${startDate.value}&endDate=${endDate.value}&page=${currentPage.value}&limit=${pageSize}`);
  const { data, page, limit, totalPages: fetchedTotalPages } = await $fetch(`/api/wondan/searchRecords?searchTerm=${searchTerm.value}&page=${currentPage.value}&limit=${pageSize}`);
  console.log("search data", searchTerm.value);
  totalPages.value = fetchedTotalPages; // 총 페이지 수 업데이트
  searchResults.value = data; // 검색 결과를 searchResults에 저장
  filterData.value = data; // 검색 결과를 filterData에 저장
  // currentPage.value = 1; // 검색 후 첫 페이지로 초기화 (필요시 주석 해제)
};

// watch(wondanInventory, (newValue) => {
//   console.log("wondanInventory updated:", newValue);
// }, { deep: true });




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
  const data = wondanInventory.value;
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
</style>
