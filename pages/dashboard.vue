<template>
  <div>
    <div id="wrapper">
      <div class="d-flex flex-column" id="content-wrapper">
       
        <div id="content">
         
          <div class="container-fluid">
            <div
              class="d-sm-flex justify-content-between align-items-center mb-4"
            >
              <h3 class="text-dark mb-0">Dashboard</h3>
              <!-- <a
                class="btn btn-primary btn-sm d-none d-sm-inline-block"
                role="button"
                href="#"
                ><i class="fas fa-download fa-sm text-white-50"></i
                >&nbsp;Generate Report</a
              > -->
            </div>
            <div class="row">
             
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-primary py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-primary fw-bold text-xs mb-1 d-flex justify-content-between align-items-center"
                        >
                          <span>생샨 계획</span>   <i class="fas fa-calendar-check fa-2x text-gray-300"></i>
                        </div>
                      
                        <div v-for="item in workOrderList" :key="item.NO" class="text-dark fw-bold h6 mb-0">
                          <span class="" style="font-size: .8em;">{{item.PRODUCT_FULLNAME}}/{{ item.PRODUCT_CODE }}</span>
                        </div>
                        
                      </div>
                      <div class="col-auto">
                     
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-primary fw-bold text-xs mb-1 d-flex justify-content-between align-items-center"
                        >
                          <span>재단진행</span>
                          <i
                           class="fas fa-money-bill-wave fa-2x text-gray-300"
                        ></i>
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="">
                            <div v-for="item in getJaedanData" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span style="font-size: .8em;">{{ item.PRODUCT_FULLNAME }}</span>
                            </div>
                          </div>
                          <div class="">
                            <div v-if="getJaedanData.length > 0" class="progress progress-sm">
                              <div
                                class="progress-bar progress-bar-striped bg-info progress-bar-animated"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 90%"
                              >
                               
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                         class="text-uppercase text-primary fw-bold text-xs mb-1 d-flex justify-content-between align-items-center"
                        >
                          <span>재단완료품</span> 
                           <i
                            class="fas fa-boxes fa-2x text-gray-300"
                          ></i>
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="">
                            <div v-for="item in jaedanRecord" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span style="font-size: .8em;">{{ item.PRODUCT_FULLNAME }}</span>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      <div class="col-auto">
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-primary fw-bold text-xs mb-1 d-flex justify-content-between align-items-center"
                        >
                          <span>재단재고</span> 
                           <i
                            class="fas fa-box fa-2x text-gray-300"
                          ></i>
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="">
                            <div v-for="item in processStatenRecord" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span style="font-size: .8em;">{{ item.PRODUCT_FULLNAME }}</span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar bg-info"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 50%"
                              >
                                <span class="visually-hidden">50%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                        class="text-uppercase text-primary fw-bold text-xs mb-1 d-flex justify-content-between align-items-center"
                        >
                          <span>생산대기</span>
                          <i
                            class="fas fa-hourglass fa-2x text-gray-300"
                          ></i>
                            <!-- {{ standByprocess }} -->
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="">
                            <div v-for="item in standByprocess" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span style="font-size: .8em;">{{ item.PRODUCT_FULLNAME }}</span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar bg-info"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 50%"
                              >
                             
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                        
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-primary fw-bold text-xs mb-1 d-flex justify-content-between align-items-center"
                        >
                          <span>생산진행</span>
                          <i
                            class="fas fa-stroopwafel fa-2x text-gray-300"
                          ></i>
                          <!-- {{ standByprocess }} -->
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="">
                            <div v-for="item in stateOnProcess" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span style="font-size: .8em;">{{ item.PRODUCT_FULLNAME }}</span>
                            </div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar bg-info"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 50%"
                              >
                             
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-primary fw-bold text-xs mb-1 d-flex justify-content-between align-items-center"
                        >
                          <span>일별봉재생산량</span><span class="text-muted"v-if="latestProductionCushion && latestProductionCushion.data && latestProductionCushion.data.length > 0"> [{{ new Date(latestProductionCushion.data[0].REG_DATE).toLocaleDateString() }}]</span>
                          <i
                            class="fas fa-chart-bar fa-2x text-gray-300"
                          ></i>
                        </div>
                        <div class="row g-0 align-items-center">
                        
                          <div class="col-12">
                            <template v-if="latestProductionCushion && latestProductionCushion.data && latestProductionCushion.data.length > 0">
                              <div v-for="item in latestProductionCushion.data" :key="item.NO" class="d-flex justify-content-between align-items-center mb-2">
                                <div class="text-dark">
                                  <span class="fw-bold" style="font-size: 0.9rem;">생산파트 :{{ item.PART_NAME }}</span>
                                </div>
                                <div class="text-success">
                                  <span class="fw-bold" style="font-size: 0.9rem;">{{ item.PART_NAME }}개</span>
                                  <span class="fw-bold" style="font-size: 0.9rem;">{{ item.COUNT }}개</span>
                                  <span class="text-muted mx-1">/</span>
                                  <span class="text-success">{{ item.WORKERS_COUNT }}명</span>
                                </div>
                              </div>
                            </template>
                            <template v-else>
                              <div class="text-center text-muted">
                                데이터가 없습니다
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-primary fw-bold text-xs mb-1 d-flex justify-content-between align-items-center"
                        >
                          <span>일별폴딩생산량</span><span class="text-muted"v-if="latestProductionFolding && latestProductionFolding.data && latestProductionFolding.data.length > 0"> [{{ new Date(latestProductionFolding.data[0].REG_DATE).toLocaleDateString() }}]</span>
                          <i
                            class="fas fa-chart-bar fa-2x text-gray-300"
                          ></i>
                        </div>
                        <div class="row g-0 align-items-center">
                        
                          <div class="col-12">
                            <template v-if="latestProductionFolding && latestProductionFolding.data && latestProductionFolding.data.length > 0">
                              <div v-for="item in latestProductionFolding.data" :key="item.NO" class="d-flex justify-content-between align-items-center mb-2">
                                <div class="text-dark">
                                  <span class="fw-bold" style="font-size: 0.9rem;">{{ item.PART_NAME }}</span>
                                </div>
                                <div class="text-success">
                                  <span class="fw-bold" style="font-size: 0.9rem;">{{ item.PART_NAME }}개</span>
                                  <span class="fw-bold" style="font-size: 0.9rem;">{{ item.COUNT }}개</span>
                                  <span class="text-muted mx-1">/</span>
                                  <span class="text-success">{{ item.WORKERS_COUNT }}명</span>
                                </div>
                              </div>
                            </template>
                            <template v-else>
                              <div class="text-center text-muted">
                                데이터가 없습니다
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-info py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-primary fw-bold text-xs mb-1 d-flex justify-content-between align-items-center"
                        >
                          <span>일폴딩생산량</span><span class="text-muted"v-if="latestProductionFolding && latestProductionFolding.length > 0"> ({{ new Date(latestProductionCushion.data[0].REG_DATE).toLocaleDateString() }})</span>
                          <i
                            class="fas fa-chart-bar fa-2x text-gray-300"
                          ></i>
                        </div>
                        <div class="col-auto">
                            <div class="row g-0 align-items-center">
                         
                            <div v-for="item in latestProductionFoldinga" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <div class="text-success">
                                  <span class="fw-bold" style="font-size: 0.9rem;">{{ item.PART_NAME }}개</span>
                                  <span class="fw-bold" style="font-size: 0.9rem;">{{ item.COUNT }}개</span>
                                  <span class="text-muted mx-1">/</span>
                                  <span class="text-success">{{ item.WORKERS_COUNT }}명</span>
                                </div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div
                                class="progress-bar bg-info"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 50%"
                              >
                                <span class="visually-hidden">50%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="card shadow border-start-warning py-2">
                  <div class="card-body">
                    <div class="row align-items-center no-gutters">
                      <div class="col me-2">
                        <div
                          class="text-uppercase text-primary fw-bold text-xs mb-1 d-flex justify-content-between align-items-center"
                        >
                          <span>생산 투입인원</span>
                          <i class="fas fa-user-friends fa-2x text-gray-300"></i>
                        </div>
                        <div class="text-dark fw-bold h5 mb-0">
                          <span>18</span>
                        </div>
                      </div>
                      <div class="col-auto">
                     
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 mb-4">
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="text-primary fw-bold m-0">상품생산</h6>
                  </div>
                  <div class="card-body">
                    
                    <h4 class="small fw-bold">
                     <span class="float-start">생산 현황</span>
                    </h4>
                    <!-- <DayOfStockCharts :stocks="stocks" /> -->
                    <DayOfStockCharts :stocks="stocks" />
                  </div>
                </div>
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="text-primary fw-bold m-0">상품출고</h6>
                  </div>
                  <!-- <div class="card-body">
                    
                    <h4 class="small fw-bold">
                     <span class="float-start">출고 현황</span>
                    </h4>
                   
                    <DayOfStockPieCharts :stocks="stocks" />
                  </div> -->
                </div>
              </div>
             
              
            
              <!--  -->
              <div>
             
              </div>
              <!--  -->
          
            </div>
            <div class="row">
              <div class="col-lg-6 mb-4">
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="text-primary fw-bold m-0">상품생산</h6>
                  </div>
                  <div class="card-body">
                    
                    <h4 class="small fw-bold">
                     <span class="float-start">생산 현황</span>
                    </h4>
                   
                    <StockBarCharts/>
                  </div>
                </div>
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="text-primary fw-bold m-0">상품출고</h6>
                  </div>
                  <div class="card-body">
                    
                    <h4 class="small fw-bold">
                     <span class="float-start">출고 현황</span>
                    </h4>
                   
                    <DeliveryBarCharts/>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 mb-4">
                
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="text-primary fw-bold m-0">원단 재고</h6>
                  </div>
                  <div class="card-body ">
                    <template v-for="(data, name) in wondanCounts" :key="name">
                      <h4 class="small fw-bold">
                        {{ name }} ({{ data.count }} Role)<span class="float-end">{{ data.totalLength }}m</span>
                      </h4>
                      <div class="progress mb-4 ">
                        <div
                          class="progress-bar"
                          :class="{
                            'bg-danger': data.count < 2,
                            'bg-warning': data.count >= 2 && data.count < 4,
                            'bg-secondary': data.count >= 4 && data.count < 5,
                            'bg-info': data.count >= 5 && data.count < 6,
                            'bg-primary': data.count >= 6 && data.count < 7,
                            'bg-success': data.count >= 8
                          }"
                          :aria-valuenow="Math.min(100, (data.count/10)*100)"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          :style="{ width: Math.min(100, (data.count/10)*100) + '%' }"
                        >
                          <span class="visually-hidden">{{ Math.min(100, (data.count/10)*100) }}%</span>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="text-primary fw-bold m-0">공지사항</h6>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li v-for="notice in notices" :key="notice.POST_ID" class="list-group-item hover:bg-gray-100 cursor-pointer" @click="navigateToNotice">
                      <div class="row align-items-center no-gutters ">
                        <!-- <div class="col-1">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              :id="'notice-' + notice.POST_ID"
                              v-model="notice.isRead"
                              @change="handleNoticeRead(notice)"
                            />
                            <label
                              class="form-check-label"
                              :for="'notice-' + notice.POST_ID"
                            ></label>
                          </div>
                        </div> -->
                        <div class="col ms-2  d-flex justify-content-between">
                          <span class="mb-0">
                            <strong>{{ notice.TITLE }}</strong>
                          </span>
                          <span class="text-xs">{{ notice.FORMATTED_DATE }} | {{ notice.AUTHOR_NAME }}</span>
                        </div>
                        
                        
                      </div>
                      <div class="row align-items-center no-gutters">
                        <div class="col auto">
                          <h6 class="mb-0">
                            <p>{{ truncateText(stripHtml(notice.CONTENT), 30) }}</p>
                          </h6>
                         
                        </div>
                        
                        <div class="col-auto">
                         
                        </div>
                      </div>
                    </li>
                    <li v-if="notices.length === 0" class="list-group-item">
                      <div class="text-center text-muted">
                        공지사항이 없습니다.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="col">
                <div class="row">
                  <div class="col-lg-12 mb-4">
                    <div class="card  ">
                      <div class="card-body">
                    
                    <h4 class="small fw-bold">
                     <span class="float-start"> 재고 현황</span>
                    </h4>
                   
                    <InventoryBarCharts/>
                  </div>
                    </div>
                  </div>
                 
                </div>
              </div>
              <!--  -->
              <div>
             
              </div>
              <!--  -->
          
            </div>
          </div>
        </div>
      </div>
      <a class="border rounded d-inline scroll-to-top" href="#page-top"
        ><i class="fas fa-angle-up"></i
      ></a>
    </div>
  </div>
</template>

<script setup>
// import DayOfStockCharts from '~/components/DayOfStockCharts.vue';
const workOrderList = ref([]);
// const filteredData = ref<WorkOrderModel[]>([]);

const isLoading = ref(true);

const fetchWorkOrder = async () => {
  try {
    // const result = await $fetch('/api/workOrder/getOrder');
    const result = await $fetch("/api/workOrder/getOrderWithAccount");
    console.log("result data", result.data);
    workOrderList.value = result.data;
   isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};
//재단 데이터 가져오기
const getJaedanData = ref([]);
const fetchJaedanData = async () => {
  try {
    const result = await $fetch("/api/workOrder/getOrderWithAccountStateUp");
    console.log("result data", result.data);
    getJaedanData.value = result.data;
    // isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};
//재단제고 데이터 가져오기
const jaedanRecord = ref([]);
const fetchJaedanJegoData = async () => {
  try {
    const result = await $fetch("/api/jaedan/getRecord10");
    jaedanRecord.value = result.data
    // filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
    isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};
//생산대기
const processStatenRecord = ref([]);
 const fetchProcessStateRecord = async () => {
  try {
    const result = await $fetch("/api/jaedan/getProcessStateRecord");
    processStatenRecord.value = result.data
    // filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
    isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};

// const latestProductionCushion = ref([]);
// const fetchLatestProduction = async () => {
//   try {
//     const result = await $fetch("/api/production/getLatestDayProduction");
//     console.log("Latest production API response:", result);
//     latestProductionCushion.value = result.data;
//   } catch (error) {
//     console.error("Error fetching latest production:", error);
//   }
// };
const latestProductionCushion = ref([]);
const fetchLatestProductionCushion = async () => {
  try {
    const result = await $fetch("/api/production/getLatestDayProductionCushion");
    console.log("Latest production API response:", result);
    latestProductionCushion.value = result;
  } catch (error) {
    console.error("Error fetching latest production:", error);
  }
};
const latestProductionFolding = ref([]);
const fetchLatestProductionFolding = async () => {
  try {
    const result = await $fetch("/api/production/getLatestDayProductionFolding");
    console.log("Latest production API response:", result);
    latestProductionFolding.value = result;
  } catch (error) {
    console.error("Error fetching latest production:", error);
  }
};
const stocks = ref([]);
const fetchDayStocks = async () => {
try {
  const response = await $fetch("/api/production/getDayProduction");
  console.log("Production data received:", response);
  if (response && response.data) {
    stocks.value = response.data;
  } else {
    console.warn("No data received from API");
  
  }
} catch (error) {
  console.error("Error fetching stocks:", error);
  
  alert("재고 정보를 가져오는 데 실패했습니다.");
}
};
//생산 대기 데이터
const standByprocess = ref([]);
const standByprocessfetchData = async () => {
  try {
    const result = await $fetch("/api/production/getProcessStateStandbyRecord");
    standByprocess.value = result.data;
    // console.log("jaedanRecord: ", standByprocess.value);
    // filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
    isLoading.value = false; // Set loading state to false when data is fetched
   
  } catch {
    alert("Fetch error");
  }
};
const stateOnProcess = ref([]);
const getProcessStateOnRecord = async () => {
  try {
    const result = await $fetch("/api/production/getProcessStateOnRecord");
    stateOnProcess.value = result.data;
    // console.log("jaedanRecord: ", standByprocess.value);
    // filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
    isLoading.value = false; // Set loading state to false when data is fetched
   
  } catch {
    alert("Fetch error");
  }
};
//사용가능 원단
const useableWondan =ref([]);
const fetetchUseableWondan = async () => {
  try {
    const result = await $fetch("/api/wondan/getUseable");
    useableWondan.value = result.data;
  
    isLoading.value = false; 
   
  } catch {
    alert("Fetch error");
  }
};

const wondanCounts = computed(() => {
  const counts = {};
  useableWondan.value.forEach(wondan => {
    if (!counts[wondan.WONDAN_NAME]) {
      counts[wondan.WONDAN_NAME] = {
        count: 0,
        totalLength: 0
      };
    }
    counts[wondan.WONDAN_NAME].count++;
    counts[wondan.WONDAN_NAME].totalLength += wondan.LENGTH;
  });
  return counts;
});

const notices = ref([]);

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const navigateToNotice = () => {
  navigateTo('/board/type/notice');
};

const fetchNotices = async () => {
  try {
    const response = await $fetch('/api/board/notice/list');
    if (response.success) {
      notices.value = response.data.map(notice => ({
        ...notice,
        CONTENT: stripHtml(notice.CONTENT)
      }));
      console.log('공지사항 목록:', notices.value);
    }
  } catch (error) {
    console.error('공지사항 조회 실패:', error);
  }
};

// const handleNoticeRead = (notice) => {
//   console.log('Notice read:', notice);
// };

onMounted(() => {
  fetchWorkOrder();
  fetchJaedanData();
  fetchJaedanJegoData();
  fetchProcessStateRecord();
  // fetchLatestProduction();
  standByprocessfetchData();
  getProcessStateOnRecord();
  fetetchUseableWondan();
  fetchNotices();
  fetchDayStocks();
  fetchLatestProductionCushion();
  fetchLatestProductionFolding();
});

</script>

<style lang="scss" scoped></style>
