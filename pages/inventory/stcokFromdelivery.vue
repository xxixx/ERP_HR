<template>

  <div class="w-full max-w-3xl mx-auto py-8">
  
    <!-- {{ products }} -->
    <!-- {{ inventory }} -->
    <!-- {{ deliveries }} -->
      <!-- {{ StockFromInventory }}
        {{ selectedProduct }} -->
    <div v-if="isLoading">
      <!-- Show loading indicator -->
      <p>Loading...</p>
    </div>
    <div v-else class="container chart_container">
      <!-- {{ jaedanRecord }} -->
    </div>
    <div class="album py-2 bg-body-tertiary">
      <div class="container">
      
        <!-- {{ pagedData }} -->
      </div>
    </div>
    <div class="container">
      <div class="mb-4 mx-4">
          <input
      v-model="searchKeyword"
      type="text"
      class="form-control"
      placeholder="검색어를 입력하세요"
      @input="search"
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
        <!-- 조회 버튼 -->
      </div>
      <!-- -->
      <div class="d-flex mt-1 w-100 justify-content-center">
        <!-- <button @click="insertData" class="btn btn-warning btn-sm w-50 text-white" type="submit">INSERT</button> -->
      </div>
    </div>
    <hr />
    <div class="container">
      <div class="bg-secondary w-100 text-white text-center">
            <p class="py-1">상품 출고 등록</p> 
      </div>
      <div class="">
          <form  @submit.prevent="submitForm">
              <table class="table table-sm text-center">
                  <tr>
                      <td>
                          <p>품명을 선택하세요</p>
                          <select class="form-control" v-model="form.NO" @change="updateProductCode" required>
                              <option
                              v-for="product in StockFromInventory"
                              :key="product.NO"
                              :value="product.NO"
                              >
                            {{   product.NO }}{{ product.PRODUCT_NO }}   {{ product.PRODUCT_CODE }} {{ product.PRODUCT_FULLNAME }} / {{ product.PROCESSCODE }} <span> 재고수량 [ </span><span class="btn bg-secondary option-span" style="color: blue;">{{ product.STOCK_INVENTORY }}</span> <span> ]</span>
                              </option>
                          </select>
                      </td>
                      <td>
                          <p>수량</p>
                          <input class="form-control text-center" type="number" v-model="form.COUNT" required />
                      </td>
                      <td>
                          <p>날짜를 선택하세요</p>
                          <input class="form-control text-center" type="date" v-model="form.DATE" required />
                      </td>
                      <td>
                      </td>
                  </tr>  
                  <!-- <button class="btn btn-sm btn-warning w-50"  type="submit"> 등록</button> -->
              </table>
       
       
      <button class="btn btn-sm btn-warning w-100"  type="submit"> 등록</button>
  </form>
     
      </div>

         
    </div>
   
    <hr>
    <div class="container">
      
      <div class="table-responsive">
        <table class="table table-sm text-center">
          <thead>
            <tr>
              <!-- <th>DATE</th> -->
              <th>NO</th>
              <th>품명코드</th>
              <th>품명</th>
              <th>COUNT</th>
              <th>DATE</th>
            <th>
              
              </th>
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
            <tr v-for="(item, index) in pagedData" :key="index">

              <td>{{ item.NO }}</td>
              <td>{{ item.PRODUCT_NO }}</td>
              <td>{{ item.PRODUCT_FULLNAME }}</td>
              <td>{{ item.COUNT }}</td>
              <td>{{ formatDateToMonthDay(item.DATE) }}</td>
              <td>{{ item.PRODUCT }}</td>
            
           
         
             
              <td>
                <div class="btn btn-sm btn-danger" @click="deleteDelivery(item.NO)">
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
              @click="goToPage(page)"
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

import { ref, onMounted,computed } from "vue";
import * as XLSX from 'xlsx';
// 페이지 메타데이터 설정
const pageTitle = ref('상품 출고 현황');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정

const form = ref({
NO: "",
PRODUCT_NO: "",
PRODUCT_CODE: "",
PRODUCT_FULLNAME: "",
COUNT: "",
DATE: "",
});

const products = ref([]);
const deliveries = ref([]);
const inventory = ref([]);
const filteredData = ref([]);
const searchKeyword = ref("");
const StockFromInventory = ref("");
const fetchProducts = async () => {
try {
  const response = await $fetch("/api/inventory/products");
  products.value = response.data;
  
} catch (error) {
  console.error("Error fetching products:", error);
  alert("제품 정보를 가져오는 데 실패했습니다.");
}
};
const fetchInventory = async () => {
try {
  const response = await $fetch("/api/inventory/getinventory");
  inventory.value = response.data;

} catch (error) {
  console.error("Error fetching products:", error);
  alert("제품 정보를 가져오는 데 실패했습니다.");
}
};
const fetchStockFromInventory = async () => {
try {
  const response = await $fetch("/api/inventory/getStockFromInventory");
  StockFromInventory.value = response.data;

} catch (error) {
  console.error("Error fetching products:", error);
  alert("제품 정보를 가져오는 데 실패했습니다.");
}
};
const updateProductCode1 = () => {
    const selectedProduct = products.value.find(
      (product) => product.NO === form.value.PRODUCT_NO
    );
    if (selectedProduct) {
     form.value.PRODUCT_NO = parseInt(selectedProduct.PRODUCT_NO);
      form.value.PRODUCT_CODE = selectedProduct.PRODUCT_CODE;
      form.value.PRODUCT_FULLNAME = selectedProduct.PRODUCT_FULLNAME;
    }
    console.log(form.value);
  };
const updateProductCode = () => {
    const selectedProduct = StockFromInventory.value.find(
      (product) => product.NO === form.value.NO
    );
    if (selectedProduct) {
      form.value.PRODUCT_NO = selectedProduct.PRODUCT_NO; // PRODUCT_NO 설정
      form.value.PRODUCT_CODE = selectedProduct.PRODUCT_CODE; // PRODUCT_CODE 설정
      form.value.PRODUCT_FULLNAME = selectedProduct.PRODUCT_FULLNAME; // PRODUCT_FULLNAME 설정
    }
    console.log(form.value);
  };
const submitForm = async () => {
try {
  await $fetch("/api/inventory/delivery", {
    method: "POST",
    body: form.value,
  });
  // await $fetch("/api/inventory/StockFromDelivery", {
  //   method: "POST",
  //   body: form.value,
  // });
  alert("출고가 등록되었습니다.");
  fetchDeliveries();
  fetchStockFromInventory();
} catch (error) {
  console.error("Error:", error);
  alert("재고 등록에 실패했습니다.");
}
};
const fetchDeliveries = async () => {
try {
  const response = await $fetch("/api/inventory/delivery");
  deliveries.value = response.data;
  filteredData.value = deliveries.value; // 초기값 설정
} catch (error) {
  console.error("Error fetching deliveries:", error);
  alert("출하 목록을 가져오는 중 오류가 발생했습니다.");
}
};

const deleteDelivery = async (NO:any) => {
try {
  await $fetch(`/api/inventory/delivery/${NO}`, {
    method: "DELETE",
  });
  alert("재고가 삭제되었습니다.");
  fetchDeliveries(); // 삭제 후 출하 목록 갱신
} catch (error) {
  console.error("Error:", error);
  alert("재고 삭제에 실패했습니다.");
}
};

// 날짜 범위로 필터링하는 메서드
const startDate = ref('');
const endDate = ref('');
const fetchDataByDateRange = () => {
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  // 종료 날짜(endDate)에 하루를 더하여 선택한 날짜의 데이터를 포함시킴
  start.setDate(start.getDate() - 1); 
  // end.setDate(end.getDate() + 1); 

  filteredData.value = inventory.value.filter(item => {
    const itemDate = new Date(item.DATE);
    return itemDate >= start && itemDate < end;
  });
};

// 검색 기능 구현
const search = () => {
const keyword = searchKeyword.value.toLowerCase(); // 소문자로 변환
filteredData.value = inventory.value.filter(item => {
  return (
    item.PRODUCT_CODE.toLowerCase().includes(keyword) || 
    item.PRODUCT_FULLNAME.toLowerCase().includes(keyword)
  );
});
};

// 엑셀 파일로 내보내는 기능
const exportToExcel = () => {
const data = inventory.value; // Assuming getInsertData contains the table data
const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
const blob = new Blob([wbout], { type: 'application/octet-stream' });
const fileName = 'table_data.xlsx';
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = fileName;
a.click();
URL.revokeObjectURL(url);
};

// 페이징 기능 구현
const itemsPerPage = 10; // 한 페이지당 아이템 수
let currentPage = ref(1); // 현재 페이지
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage)); // 전체 페이지 수
const prevPage = () => {
if (currentPage.value > 1) {
  currentPage.value--;
}
};

const nextPage = () => {
if (currentPage.value < totalPages.value) {
  currentPage.value++;
}
};

const goToPage = (page) => {
if (page >= 1 && page <= totalPages.value) {
  currentPage.value = page;
}
};

// 현재 페이지에 따라 표시할 아이템 범위 계산
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredData.value.length));
const pagedData = computed(() => filteredData.value.slice(startIndex.value, endIndex.value));


onMounted(() => {
fetchProducts();
fetchDeliveries();
fetchInventory();
fetchStockFromInventory();

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