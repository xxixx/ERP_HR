<template>

  <div class="w-full max-w-3xl mx-auto py-8">
  
    <!-- {{ products }} -->
    <!-- {{ stocks }} -->
      <!-- {{ onProcess }} -->
    <div v-if="isLoading">
      <!-- Show loading indicator -->
      <!-- <p>Loading...</p> -->
    </div>
    <div v-else class="container chart_container">
      <!-- {{ jaedanRecord }} -->
    </div>
    <div class="album py-2 bg-body-tertiary">
      <div class="container">
      
        <!-- {{ pagedData }} -->
      </div>
    </div>
    <div class="container ">
      <div class="row mb-3">
        <div class="col">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              v-model="searchKeyword"
              placeholder="검색어를 입력하세요"
              @keyup.enter="search"
            />
            <button class="col-2 ms-2 btn btn-sm btn-warning text-white" @click="search">검색</button>
          </div>
          
        </div>
    
      </div>
      <div class="row mb-3 d-flex justify-content-end">
      
        <div class="col">
          <div class="input-group">
            <input
              type="date"
              class="form-control"
              v-model="startDate"
            />
            <span class="input-group-text">~</span>
            <input
              type="date"
              class="form-control"
              v-model="endDate"
            />
            <button class="col-2 ms-2 btn btn-sm btn-warning text-white" @click="fetchDataByDateRange">
              날짜 검색
            </button>
          </div>
        </div>
      </div>
      
      <!-- Date Range Picker -->
      <!-- <div class="text-end me-4">
        <input class="px-3 mx-1" type="date" v-model="startDate" />
        시작 날짜 선택
        <input class="px-3 mx-1" type="date" v-model="endDate" />
        종료 날짜 선택
        <button class="btn btn-sm btn-warning" @click="fetchDataByDateRange">
          조회
        </button>
        조회 버튼
      </div> -->
      <!-- -->
      <div class="d-flex mt-1 w-100 justify-content-center">
        <!-- <button @click="insertData" class="btn btn-warning btn-sm w-50 text-white" type="submit">INSERT</button> -->
      </div>
    </div>
    <hr />
    <div class="container-fluid  ">
      <div class="bg-secondary w-100 text-white text-center">
            <p class="py-1">상품 입고 등록</p> 
      </div>
      <div class="">
          <form  @submit.prevent="stockRegister">
              <table class="table table-sm text-center">
                  <tr>
                      <td>
                          <p>품명을 선택하세요</p>
                          <select class="form-control" v-model="stockForm.PRODUCT_FULLNAME" @change="updateStockProductCode" required>
                              <option
                              v-for="product in onProcess"
                              :key="product.PRODUCT_FULLNAME"
                              :value="product.PRODUCT_FULLNAME"
                              >
                             {{ product.WORK_ORDER_NO }} {{ product.PRODUCT_CODE }}   {{ product.ProductCode }} {{ product.PRODUCT_FULLNAME }}{{ product.PROCESSCODE }}
                              </option>
                          </select>
                      </td>
                      <td>
                          <p>수량</p>
                          <input class="form-control text-center" type="number" v-model="stockForm.COUNT" required />
                      </td>
                      <td>
                          <p>날짜를 선택하세요</p>
                          <input class="form-control text-center" type="date" v-model="stockForm.DATE" required />
                      </td>
                      <td>
                       
                      </td>
                      <td class="col-2">
                        <p>저장</p>
                        <button class="w-100 btn btn-sm btn-warning  "  type="submit"> 등 록</button>
                      </td>
                  </tr>  
                  <!-- <button class="btn btn-sm btn-warning w-50"  type="submit"> 등록</button> -->
              </table>
       
       
      <!-- <button class="btn btn-sm btn-warning  text-white"  type="submit"> 등 록</button> -->
  </form>
     
      </div>
      <!--  -->
 
      <!--  -->
         
    </div>
    <hr>
  
    <div class="container">
    
      
      <div class="table-responsive">
        <table class="table table-sm">
          <thead class=" ">
            <tr  class="bg-body-secondary">
              <!-- <th>DATE</th> -->
              <th >NO</th>
              <th></th>
              <th >품명코드</th>
              <th>품명</th>
              <th>COUNT</th>
              <th>DATE</th>
            <th>
                <div
                  class="btn btn-sm btn-success"
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
            <tr v-if="isLoading">
              <td colspan="8" class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="currentPageData.length === 0">
              <td colspan="8" class="text-center">데이터가 없습니다.</td>
            </tr>
            <tr v-else v-for="(item, index) in currentPageData" :key="index">
              <td>{{ item.NO }}</td>
              <td>{{ item.PRODUCT }}</td>
              <td>{{ item.PRODUCT_CODE }}</td>
              <td>{{ item.PRODUCT_FULLNAME }}</td>
              <td>{{ item.COUNT }}</td>
              <td>{{ formatDateToMonthDay(item.DATE) }}</td>
            
           
         
             
              <td>
                <div class="btn btn-sm btn-danger" @click="deleteStock(item.NO)">
                  DEL
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- paging -->
      <div class="pages d-flex justify-content-center">
        <ul class="pagination pages">
          <li>
            <a
              href="#"
              class="back"
              :class="{ disabled: currentPage === 1 }"
              @click="prevPage"
              aria-label="Previous"
            >
              <span aria-hidden="true" class="fa fa-arrow-circle-left"></span>
              Prev</a
            >
          </li>
          <li
            class="page-item d-inline"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <a
              href="#"
              class="page page-item"
              :class="{ active: currentPage === page }"
              @click="changePage(page)"
              >{{ page }}</a
            >
          </li>
          <li class="page-item d-inline">
            <a
              href="#"
              class="next"
              :class="{ disabled: currentPage === totalPages }"
              @click="nextPage"
              aria-label="Next"
            >
              <span aria-hidden="true" class="fa fa-arrow-circle-right"></span
              >Next</a
            >
          </li>
        </ul>
      </div>
      <!-- paging -->
    </div>
    <hr />
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import * as XLSX from 'xlsx';


// 페이지 메타데이터 설정
const pageTitle = ref('상품 입고 등록');
// useHead를 사용하여 메타 태그 설정
useHead({
title: pageTitle.value, // 페이지 제목 설정

});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정
const stockForm = ref({
PRODUCT_NO: "",
PRODUCT_CODE: "",
PRODUCT_FULLNAME: "",
PROCESSCODE: "",
COUNT: "",
DATE: "",

});

const isLoading = ref(true);
const products = ref([]);
const stocks = ref([]);
const onProcess = ref([]);
const onProcessfilteredData = ref([]);
const currentPage = ref(1);
const pageSize = 10;
const totalPages = ref(0);
const currentPageData = ref([]);
const startDate = ref("");
const endDate = ref("");
const searchTerm = ref("");
const searchKeyword = ref("");

// 공정진행중인 목록 가져오기
const onProcessfetchData = async () => {
try {
  const result = await $fetch("/api/production/getProcessStateRecord");
  onProcess.value = result.data;
  onProcessfilteredData.value = onProcess.value;
} catch {
  alert("Fetch error");
}
};

// 페이지별 데이터 가져오기
const fetchPagedData = async (page = 1) => {
try {
  isLoading.value = true;
  console.log("Fetching page:", page);
  const result = await $fetch(`/api/inventory/getPagedStock?page=${page}&pageSize=${pageSize}`);
  currentPageData.value = result.data;
  totalPages.value = result.totalPages;
  currentPage.value = result.currentPage;
} catch (error) {
  console.error("Error fetching data:", error);
} finally {
  isLoading.value = false;
}
};

// 제품 코드와 이름을 업데이트하는 메서드
const updateStockProductCode = () => {
const selectedStockProduct = onProcess.value.find(
  (onProcessData) => onProcessData.PRODUCT_FULLNAME === stockForm.value.PRODUCT_FULLNAME
);
if (selectedStockProduct) {
 
  stockForm.value.PRODUCT_NO = selectedStockProduct.PRODUCT_CODE;
  stockForm.value.PRODUCT_CODE = selectedStockProduct.PRODUCT_CODE;
  stockForm.value.PROCESSCODE = selectedStockProduct.PROCESSCODE;
 
 
}

};

// 재고 등록 메서드
const stockRegister = async () => {
try {
  await $fetch("/api/inventory/stock", {
    method: "POST",
    body: stockForm.value,
  });
    console.log(stockForm.value)
  alert("재고가 등록되었습니다.");
  fetchPagedData(currentPage.value); // 현재 페이지 데이터 새로고침
} catch (error) {
  console.error("Error:", error);
  alert("재고 등록에 실패했습니다.");
}
};

// 재고 삭제 메서드
const deleteStock = async (NO) => {
try {
  await $fetch(`/api/inventory/stock/${NO}`, {
    method: "DELETE",
  });
  alert("재고가 삭제되었습니다.");
  fetchPagedData(currentPage.value); // 현재 페이지 데이터 새로고침
} catch (error) {
  console.error("Error:", error);
  alert("재고 삭제에 실패했습니다.");
}
};

// 날짜 범위로 데이터 가져오기
const fetchDataByDateRange = async () => {
if (!startDate.value || !endDate.value) {
  alert("시작일과 종료일을 모두 선택해주세요.");
  return;
}
  
try {
  isLoading.value = true;
  const result = await $fetch(
    `/api/inventory/getStockByDate?startDate=${startDate.value}&endDate=${endDate.value}&page=${currentPage.value}&limit=${pageSize}`
  );
  
  currentPageData.value = result.data;
  totalPages.value = result.totalPages;
  currentPage.value = result.currentPage;
} catch (error) {
  console.error("Error fetching data by date:", error);
} finally {
  isLoading.value = false;
}
};

// 검색 기능 구현
const search = async () => {
if (!searchKeyword.value) {
  await fetchPagedData(1);
  return;
}

try {
  isLoading.value = true;
  const result = await $fetch(
    `/api/inventory/searchStockFrom?searchTerm=${searchKeyword.value}&page=${currentPage.value}&limit=${pageSize}`
  );
  
  currentPageData.value = result.data;
  totalPages.value = result.totalPages;
  currentPage.value = result.currentPage;
} catch (error) {
  console.error("Error searching data:", error);
} finally {
  isLoading.value = false;
}
};

// 엑셀 파일로 내보내기
const exportToExcel = () => {
const data = currentPageData.value;
const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
const blob = new Blob([wbout], { type: 'application/octet-stream' });
const fileName = 'stock_data.xlsx';
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = fileName;
a.click();
URL.revokeObjectURL(url);
};

// 페이지 변경
const changePage = async (page) => {
if (page >= 1 && page <= totalPages.value) {
  if (startDate.value && endDate.value) {
    currentPage.value = page;
    await fetchDataByDateRange();
  } else if (searchKeyword.value) {
    currentPage.value = page;
    await search();
  } else {
    await fetchPagedData(page);
  }
}
};

// 이전 페이지
const prevPage = () => {
if (currentPage.value > 1) {
  changePage(currentPage.value - 1);
}
};

// 다음 페이지
const nextPage = () => {
if (currentPage.value < totalPages.value) {
  changePage(currentPage.value + 1);
}
};

// 초기 데이터 로드
onMounted(async () => {
await onProcessfetchData();
await fetchPagedData();
});
</script>

<style scoped>
th {
font-weight: 500;
background-color: rgb(247, 226, 226);
}
.pages {
  text-align: center;
  margin-top: 10px;
}

.pages a {
  display: inline-block;
}

.pages .back, .pages .next {
  font-family: 'Fira Sans', sans-serif;
  font-weight: 900;
  font-size: 10pt;
  margin: 0 40px;
  color: #23182C;
}

.pages .back span, .pages .next span {
  font-size: 13pt;
  margin: 0 4px;
}

@media (max-width: 768px) {
  .pages .back, .pages .next {
    display: none;
  }
}

.pages .back:not(.disabled):hover, .pages .next:not(.disabled):hover {
  color: #cc1b6f;
}

.pages .back.disabled, .pages .next.disabled {
  color: #BDB9BF;
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
  border-color: #23182C;
  background: #fff;
  color: #23182C;
}

.pages .page.active {
  background: #fff;
  color: #cc1b6f;
  cursor: default;
}
</style>