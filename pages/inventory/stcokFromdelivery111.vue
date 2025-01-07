<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    
    <div class="container">
      <div class="mb-4 mx-4">
        <input
          v-model="searchTerm"
          type="text"
          class="form-control"
          placeholder="검색어를 입력하세요"
          @input="searchData"
        />
      </div>
      
      <!-- Date Range Picker -->
      <div class="text-end me-4">
        <input class="px-3 mx-1" type="date" v-model="startDate" />
        <input class="px-3 mx-1" type="date" v-model="endDate" />
        <button class="btn btn-sm btn-warning" @click="fetchDataByDateRange">
          조회
        </button>
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
    <div class="container">
      <div class="table-responsive">
        <table class="table table-sm text-center">
          <thead>
            <tr>
              <th>NO</th>
              <th>품명코드</th>
              <th>품명</th>
              <th>COUNT</th>
              <th>DATE</th>
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
            <tr v-for="item in currentPageData" :key="item.NO">
              <td>{{ item.NO }}</td>
              <td>{{ item.PRODUCT_NO }}</td>
              <td>{{ item.PRODUCT_FULLNAME }}</td>
              <!-- <td>{{ item.COUNT }}</td> -->
              <td>{{ formatDateToMonthDay(item.DATE) }}</td>
              <td>
                <div class="btn btn-sm btn-danger" @click="deleteDelivery(item.NO)">
                  DEL
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 페이징 -->
      <div class="pages d-flex justify-content-center">
        <ul class="pagination pages">
          <li>
            <a
              href="#"
              class="back"
              :class="{ disabled: currentPage === 1 }"
              @click.prevent="changePage(currentPage - 1)"
              aria-label="Previous"
            >
              <span aria-hidden="true" class="fa fa-arrow-circle-left"></span>
              Prev
            </a>
          </li>

          <li
            v-for="page in displayedPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <template v-if="page === -1">
              <span class="page">...</span>
            </template>
            <a
              v-else
              href="#"
              class="page"
              :class="{ active: currentPage === page }"
              @click.prevent="changePage(page)"
            >
              {{ page }}
            </a>
          </li>

          <li>
            <a
              href="#"
              class="next"
              :class="{ disabled: currentPage === totalPages }"
              @click.prevent="changePage(currentPage + 1)"
              aria-label="Next"
            >
              <span aria-hidden="true" class="fa fa-arrow-circle-right"></span>
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import * as XLSX from 'xlsx';

// 상태 정의
const currentPage = ref(1);
const pageSize = 10;
const totalPages = ref(0);
const currentPageData = ref([]);
const startDate = ref("");
const endDate = ref("");
const searchTerm = ref("");
const isLoading = ref(true);

// 데이터 가져오기
const fetchPagedData = async (page = 1) => {
  try {
    isLoading.value = true;
    console.log("Fetching page:", page);
    const result = await $fetch(`/api/inventory/getPagedStockFromDelivery?page=${page}&pageSize=${pageSize}`);
    currentPageData.value = result.data;
    totalPages.value = result.totalPages;
    currentPage.value = result.currentPage;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
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
      `/api/inventory/getStockFromDeliveryByDate?startDate=${startDate.value}&endDate=${endDate.value}&page=${currentPage.value}&limit=${pageSize}`
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

// 검색어로 데이터 가져오기
const searchData = async () => {
  if (!searchTerm.value) {
    await fetchPagedData(1);
    return;
  }

  try {
    isLoading.value = true;
    const result = await $fetch(
      `/api/inventory/searchStockFromDelivery?searchTerm=${searchTerm.value}&page=${currentPage.value}&limit=${pageSize}`
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
const deliveries = ref([]);
const filteredData = ref([]);
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
const StockFromInventory = ref("");
const fetchStockFromInventory = async () => {
try {
  const response = await $fetch("/api/inventory/getStockFromInventory");
  StockFromInventory.value = response.data;

} catch (error) {
  console.error("Error fetching products:", error);
  alert("제품 정보를 가져오는 데 실패했습니다.");
}
};
const products = ref([]);
const fetchProducts = async () => {
try {
  const response = await $fetch("/api/inventory/products");
  products.value = response.data;
  
} catch (error) {
  console.error("Error fetching products:", error);
  alert("제품 정보를 가져오는 데 실패했습니다.");
}
};
const inventory = ref([]);
const fetchInventory = async () => {
try {
  const response = await $fetch("/api/inventory/getinventory");
  inventory.value = response.data;

} catch (error) {
  console.error("Error fetching products:", error);
  alert("제품 정보를 가져오는 데 실패했습니다.");
}
};

// 페이지 번호 표시 계산
const displayedPages = computed(() => {
  const pages = [];
  const totalPagesValue = totalPages.value;
  const currentPageValue = currentPage.value;

  // 항상 처음 3페이지 표시
  for (let i = 1; i <= Math.min(3, totalPagesValue); i++) {
    pages.push(i);
  }

  // 현재 페이지가 4페이지 이상이고 마지막 3페이지가 아닌 경우
  if (currentPageValue > 3 && currentPageValue < totalPagesValue - 2) {
    if (currentPageValue > 4) {
      pages.push(-1);
    }
    pages.push(currentPageValue - 1, currentPageValue, currentPageValue + 1);
    if (currentPageValue < totalPagesValue - 3) {
      pages.push(-1);
    }
  } else if (totalPagesValue > 6) {
    pages.push(-1);
  }

  // 마지막 3페이지 표시
  if (totalPagesValue > 3) {
    for (let i = Math.max(totalPagesValue - 2, 4); i <= totalPagesValue; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
  }

  return pages;
});

// 페이지 변경
const changePage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    if (startDate.value && endDate.value) {
      await fetchDataByDateRange();
    } else if (searchTerm.value) {
      await searchData();
    } else {
      await fetchPagedData(page);
    }
  }
};

// 날짜 포맷팅
const formatDateToMonthDay = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${month}-${day}`;
};

// 엑셀 내보내기
const exportToExcel = () => {
  const data = currentPageData.value;
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

// 삭제 기능
const deleteDelivery = async (NO) => {
  try {
    await $fetch(`/api/inventory/delivery/${NO}`, {
      method: "DELETE",
    });
    alert("재고가 삭제되었습니다.");
    await fetchPagedData(currentPage.value);
  } catch (error) {
    console.error("Error:", error);
    alert("재고 삭제에 실패했습니다.");
  }
};

// 초기 데이터 로드
onMounted(async () => {
  await fetchPagedData();
 await fetchProducts();
await fetchDeliveries();
  await fetchInventory();
await fetchStockFromInventory();
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