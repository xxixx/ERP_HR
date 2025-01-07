<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <!-- <h5 class="text-center mt-2">
     
    </h5> -->
  
    <!-- filterData{{filterData}} -->
    <!-- {{ workOrderList }} -->
    <!-- workOrderList{{workOrderList}} -->
    <div v-if="isLoading">
      <!-- Show loading indicator -->
      <p>Loading...</p>
    </div>
    <div v-else class="container chart_container"></div>
    <!-- {{ pagedData }} -->
    <div class="album py-2 bg-body-tertiary"></div>
    <div class="container">
      <!-- 검색 입력 필드 추가 -->
      <!-- <div class="mb-4 mx-4">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="검색어를 입력하세요"
        />
      </div> -->
      <div class="mb-4 mx-4">
        <input
				    v-model="searchTerm"
				    @input="fetchDataSerch"
				    type="text"
				    class="form-control"
				    placeholder="검색어를 입력하세요.........."
					  />
      </div>
      
      <!-- Date Range Picker -->
      <div class="text-end me-4">
        <input class="px-3 mx-1" type="date" v-model="startDate" />
        <!-- 시작 날짜 선택 -->
        <input class="px-3 mx-1" type="date" v-model="endDate" />
        <!-- 종료 날짜 선택 -->
        <button class="btn btn-sm btn-warning" @click="fetchDataByDateRange">
          조회
        </button>
      </div>
    </div>
    <!-- {{ filteredData }} -->
    <!-- {{ pagedData }} -->
    <!-- workOrderList{{workOrderList}} -->
    <!-- WORKING_PART    {{ WORKING_PART}} -->
   

    <hr />
    <div class="container">
      <p class="text-end me-4">최근데이터 15개</p>

      <!--  -->
      <div class="table-responsive">
        <table class="table table-sm text-center">
          <thead>
            <tr>
              <!-- <th>DATE</th> -->
              <th class="">NO</th>

              <th>등록일</th>
              <th>PART</th>

              <th>품명</th>
              <th>COUNT</th>
              <th>원단명</th>

              <th class="">COUNT</th>
              <th class="">공정상태</th>
              <th class="d-none d-md-table-cell">등록자</th>

              <th>
                <div
                  class="btn btn-sm btn-success sm-btn"
                  @click="exportToExcel"
                >
                  <svg
                    width="24px"
                    height="14px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="white" d="M0 0h24v24H0z" />
                      <path
                        d="M2.859 2.877l12.57-1.795a.5.5 0 0 1 .571.495v20.846a.5.5 0 0 1-.57.495L2.858 21.123a1 1 0 0 1-.859-.99V3.867a1 1 0 0 1 .859-.99zM4 4.735v14.53l10 1.429V3.306L4 4.735zM17 19h3V5h-3V3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4v-2zm-6.8-7l2.8 4h-2.4L9 13.714 7.4 16H5l2.8-4L5 8h2.4L9 10.286 10.6 8H13l-2.8 4z"
                      />
                    </g>
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filterData" :key="index">
              <td>{{ item.ORDER_NO }}</td>
              <td>{{ formatDate(item.CREATE_DATE) }}</td>

              <td>{{ item.ASSY_PART_NAME }}</td>
              <td>{{ item.PRODUCT_CODE }}</td>
              <td>{{ item.PRODUCT_CODE_NAME }}</td>
              <td>{{ item.WONDAN_NAME }}</td>

              <td>{{ item.COUNT }}</td>
              <td>{{ item.ORDER_STATE }}</td>

              <td class="d-none d-md-table-cell">{{ item.ACCOUNT_NAME }}</td>

              <!-- <td><div class="btn btn-sm btn-danger" @click="onRegister(item)">REGISTER</div></td> -->
              <td>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--  -->
      <!-- paging  -->
      <div>
       <!-- paging -->
    <div v-if="filterData.length > 0" class="d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation">
          <ul class="pagination pages">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="back" href="#" @click.prevent="changePage(currentPage - 1)">
                <span aria-hidden="true" class="fa fa-arrow-circle-left"></span>
                Prev
              </a>
            </li>
            
            <template v-for="page in displayedPages" :key="page">
              <li v-if="page === -1" class="page-item disabled">
                <span class="page-link">...</span>
              </li>
              <li v-else class="page-item" :class="{ active: currentPage === page }">
                <a class="page page-item" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
            </template>

            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="next" href="#" @click.prevent="changePage(currentPage + 1)">
                <span aria-hidden="true" class="fa fa-arrow-circle-right"></span
                  >Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- paging -->
    </div>
      <!-- paging  -->
    </div>

    <hr />
  </div>
</template>

<script setup lang="ts">
import type { WorkOrderModel } from "~~/server/model/workOrder";
import type { WORKING_PART_Model } from "~~/server/model/working_part";
import { ref, reactive, computed, onMounted,watch ,nextTick} from 'vue';
// import { formatDate } from '~/utils/dateformatter';
import { useRoute } from "vue-router";
import { useWorkStore } from "~/store/works";
import * as XLSX from "xlsx";
// 페이지 메타데이터 설정
const pageTitle = ref('공정 조회');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정
const router = useRouter();
const form = reactive({
  CREATE_DATE: "",
  WORKING_PART: "",
  COUNT: "",
  REG_ACCOUNT: "",
});

const WORKING_PART = ref<WORKING_PART_Model[]>([]);
const workOrderList = ref<WorkOrderModel[]>([]);
// const filteredData = ref<WorkOrderModel[]>([]);

const isLoading = ref(true);

const fetchData = async () => {
  try {
    // const result = await $fetch('/api/workOrder/getOrder');
    const result = await $fetch("/api/workOrder/getOrderWithAccountAllPagedRecord");
    console.log("result data", result.data);
    workOrderList.value = result.data as WorkOrderModel[];
    filteredData.value = workOrderList.value;
    const WORKING_PART_Data = await $fetch("/api/working_part/getWORKING_PART");
    WORKING_PART.value = WORKING_PART_Data.data as WORKING_PART_Model[];
    console.log("workOrderList", workOrderList.value);

    isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};

// 상태 정의
const filterData = ref([]); // 모든 데이터를 저장할 배열
// const currentPage = ref(1);
const pageSize = 20;
const totalPages = ref(0);

const fetchPagedData = async (page = 1) => { // 기본값을 1로 설정
  console.log("page", page);
  console.log("pageSize", pageSize);
  
  const { data, totalPages: fetchedTotalPages } = await $fetch(`/api/workOrder/getPagedRecord?page=${page}&pageSize=${pageSize}`);
  isLoading.value = false;
  console.log("data", data);
  console.log("totalRecords", totalPages.value); // ref 객체의 값을 가져옵니다.
  console.log("data length", data.length);
  
  workOrderList.value = data; // 'data' 필드에서 실제 레코드 가져오기
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
    const { data, page, limit, totalPages: fetchedTotalPages } = await $fetch(`/api/workOrder/getRecordsByDate?startDate=${startDate.value}&endDate=${endDate.value}&page=${currentPage.value}&limit=${pageSize}`);
    
    RecordsByDate.value = data;
    // console.log("fetchRecordsByDate data", data);
    // console.log("fetchRecordsByDate page", page);
    // console.log("fetchRecordsByDate limit", limit);
    // console.log("fetchRecordsByDate totalPages", fetchedTotalPages);
    
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
  const { data, page, limit, totalPages: fetchedTotalPages } = await $fetch(`/api/workOrder/searchRecords?searchTerm=${searchTerm.value}&page=${currentPage.value}&limit=${pageSize}`);
  console.log("search data", searchTerm.value);
  totalPages.value = fetchedTotalPages; // 총 페이지 수 업데이트
  searchResults.value = data; // 검색 결과를 searchResults에 저장
  filterData.value = data; // 검색 결과를 filterData에 저장
  // currentPage.value = 1; // 검색 후 첫 페이지로 초기화 (필요시 주석 해제)
};





onMounted(fetchPagedData);
// onMounted(fetchDataByDateRange);




/// 페이징 관련 상태
const currentPage = ref(1);
const itemsPerPage = ref(20);
// const totalItems = computed(() => filterData.value.length);
// const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

// 표시할 페이지 번호 계산
const displayedPages = computed(() => {
  const pages = [];
  const ellipsis = -1;

  // 항상 처음 3페이지는 표시
  for (let i = 1; i <= Math.min(3, totalPages.value); i++) {
    pages.push(i);
  }

  // 현재 페이지 주변 페이지 계산
  let startPage = Math.max(4, currentPage.value - 1);
  let endPage = Math.min(totalPages.value - 3, currentPage.value + 1);

  // 시작 부분에 '...' 추가
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
  if (endPage < totalPages.value - 3) {
    pages.push(ellipsis);
  }

  // 마지막 3페이지 추가
  for (let i = Math.max(totalPages.value - 2, endPage + 1); i <= totalPages.value; i++) {
    if (i > pages[pages.length - 1]) {
      pages.push(i);
    }
  }

  return pages;
});

// 페이지 변경 함수
const changePage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // 날짜 검색이 있는 경우
    if (startDate.value && endDate.value) {
      await fetchDataByDateRange();
    } 
    // 검색어가 있는 경우
    else if (searchTerm.value) {
      await fetchDataSerch();
    } 
    // 일반 페이징
    else {
      await fetchPagedData(page);
    }
  }
};
// 현재 페이지의 데이터 계산
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return wondanInventory.value.slice(start, end);
});



// excel 데이터 받기
const exportToExcel = () => {
  const data = workOrderList.value; // Assuming getInsertData contains the table data

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
  font-size: 12px; /* 원하는 글자 크기로 조정 */
}
@media (max-width: 720.98px) {
  .table-sm td {
    font-size: 0.7rem; /* A
      /* font-size:.2em; 예시로 14px로 설정 */
  }
}
td {
  font-weight: 300;
}
@media (max-width: 720.98px) {
  .table-sm th {
    font-size: 0.7rem; /* A
      /* font-size:.2em; 예시로 14px로 설정 */
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
  padding-right: 1.5em; /* Adjust as needed */
  font-size: 0.8rem;
}
input {
  font-size: 0.8rem;
}
pages {
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
</style>
