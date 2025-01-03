<template>

  <div class="w-full max-w-3xl mx-auto py-8">
  
    <!-- {{ products }} -->
    <!-- {{ inventory }} -->
    <!-- {{ stocks }} -->
    <div v-if="isLoading">
      <!-- Show loading indicator -->
      <p>Loading...</p>
    </div>
    <div v-else class="container chart_container">
      <!-- {{ jaedanRecord }} -->
    </div>
    <div class="album py-1 bg-body-tertiary">
      <div class="container">
      
        <!-- {{ pagedData }} -->
      </div>
    </div>
    <div class="container">
      <div class="card mb-2">
        <div><p class="text-center mt-2">상품 재고 현황</p></div>
      <InventoryBarCharts />
      </div>
    
    <hr>
    <div class="card mb-2">
       <div class="text-center">

      <p>일별생산 현황</p>
      <StockBarCharts />
    </div>
  </div>
  <hr>
    <div class="card mb-2">
       <div class="text-center">

      <p>일별 출고 현황</p>
      <DeliveryBarCharts />
    </div>
  
    </div>
    <hr>
      <!-- Date Range Picker -->
   
      <!-- -->
      <div class="d-flex mt-1 w-100 justify-content-center">
        <!-- <button @click="insertData" class="btn btn-warning btn-sm w-50 text-white" type="submit">INSERT</button> -->
      </div>
    </div>
    <hr />
    <div class="container mb-3">
     

         
    </div>
   
  
    <div class="container">
      <h5 class="text-center mt-2">재고 목록</h5>
      <div class="table-responsive">
        <table class="table table-sm text-center">
          <thead>
            <tr>
              <!-- <th>DATE</th> -->
              <th>NO</th>
              <th>NAME</th>
              <th>DESCRIPTION</th>
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
            <tr v-for="(item, index) in inventory" :key="index">

              <td>{{ item.PRODUCT_NO }}</td>
              <td>{{ item.PRODUCT_CODE }}</td>
              <td>{{ item.PRODUCT_FULLNAME }}</td>
              <td>{{ item.SUM_COUNT }}</td>
              <td>{{ item.formatted_date }}</td>
              <td>
               
              </td>
            </tr>
          </tbody>
        </table>
      </div>
     
    </div>
    <hr />
  </div>
</template>


<script lang="ts" setup>

import { ref, onMounted,nextTick } from "vue";
import * as XLSX from 'xlsx';
import InventoryBarCharts from "~/components/InventoryBarCharts.vue";
import StockBarCharts from "~/components/StockBarCharts.vue";
import DeliveryBarCharts from "~/components/DeliveryBarCharts.vue";

// 페이지 메타데이터 설정
const pageTitle = ref('재고 현황');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정
const inventory = ref(null); // 초기값을 null로 설정


const fetchInventory = async () => {
  try {
    const response = await $fetch("/api/inventory/getinventory");
    const data = response.data;

    if (data && data.length > 0) {
         inventory.value = data; // 데이터를 받은 후에야 inventory를 설정
    } else {
      inventory.value = []; // 데이터가 없는 경우 빈 배열로 설정
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
    alert("재고 정보를 가져오는 데 실패했습니다.");
  }
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
onMounted(() => {
  fetchInventory();
});
</script>

<style scoped>
th {
  font-weight: 500;
  background-color: rgb(247, 226, 226);
}
</style>