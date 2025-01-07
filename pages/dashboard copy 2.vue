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
                          class="text-uppercase text-primary fw-bold text-xs mb-1"
                        >
                          <span>생샨 계획</span>
                        </div>
                      
                        <div v-for="item in workOrderList" :key="item.NO" class="text-dark fw-bold h6 mb-0">
                          <span class="" style="font-size: .8em;">{{item.PRODUCT_FULLNAME}}/{{ item.PRODUCT_CODE }}</span>
                        </div>
                        
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-calendar-check fa-2x text-gray-300"></i>
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
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>재단진행</span>
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
                        <i
                           class="fas fa-money-bill-wave fa-2x text-gray-300"
                        ></i>
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
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>재단완료품</span>
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
                        <i
                          class="fas fa-boxes fa-2x text-gray-300"
                        ></i>
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
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>재단재고</span>
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
                        <i
                          class="fas fa-box fa-2x text-gray-300"
                        ></i>
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
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>생산대기</span>
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
                        
                        <i
                          class="fas fa-hourglass fa-2x text-gray-300"
                        ></i>
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
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>생산진행</span>
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
                        <i
                          class="fas fa-stroopwafel fa-2x text-gray-300"
                        ></i>
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
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>일별봉재생산량</span><span class="text-muted"v-if="latestProduction && latestProduction.length > 0"> ({{ new Date(latestProduction[0].REG_DATE).toLocaleDateString() }})</span>
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="" >
                           
                            <div v-for="item in latestProduction" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                             
                              <div><span style="font-size: .8em;">{{ item.PART_NAME }}: {{ item.COUNT }}개 / {{ item.WORKERS_COUNT }}명</span></div>
                             
                            </div>
                          </div>
                         
                        </div>
                      </div>
                      <div class="col-auto">
                        <i
                          class="fas fa-chart-bar fa-2x text-gray-300"
                        ></i>
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
                          class="text-uppercase text-info fw-bold text-xs mb-1"
                        >
                          <span>일폴딩생산량</span>
                        </div>
                        <div class="row g-0 align-items-center">
                          <div class="col-auto">
                            <div v-for="item in getLatestDayProduction" :key="item.NO" class="text-dark fw-bold h5 mb-0 me-3">
                              <span>{{ item.REG_DATE }}%</span>
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
                        <i
                          class="fas fa-chart-bar fa-2x text-gray-300"
                        ></i>
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
                          class="text-uppercase text-warning fw-bold text-xs mb-1"
                        >
                          <span>생산 투입인원</span>
                        </div>
                        <div class="text-dark fw-bold h5 mb-0">
                          <span>18</span>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-user-friends fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                  <div class="card-body">
                    <template v-for="(data, name) in wondanCounts" :key="name">
                      <h4 class="small fw-bold">
                        {{ name }} ({{ data.count }} Role)<span class="float-end">{{ data.totalLength }}m</span>
                      </h4>
                      <div class="progress mb-4">
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
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong> 바코드 확인</strong></h6>
                          <span class="text-xs">10:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-1"
                            /><label
                              class="form-check-label"
                              for="formCheck-1"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong>실수령 확인 서명하기</strong></h6>
                          <span class="text-xs">11:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-2"
                            /><label
                              class="form-check-label"
                              for="formCheck-2"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong>주간 품질 교육 실시</strong></h6>
                          <span class="text-xs">12:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-3"
                            /><label
                              class="form-check-label"
                              for="formCheck-3"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong>주간 품질 교육 실시</strong></h6>
                          <span class="text-xs">12:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-3"
                            /><label
                              class="form-check-label"
                              for="formCheck-3"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                          <h6 class="mb-0"><strong>주간 품질 교육 실시</strong></h6>
                          <span class="text-xs">12:30 AM</span>
                        </div>
                        <div class="col-auto">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="formCheck-3"
                            /><label
                              class="form-check-label"
                              for="formCheck-3"
                            ></label>
                          </div>
                        </div>
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

const latestProduction = ref([]);
const fetchLatestProduction = async () => {
  try {
    const result = await $fetch("/api/production/getLatestDayProduction");
    console.log("Latest production API response:", result);
    latestProduction.value = result.data;
  } catch (error) {
    console.error("Error fetching latest production:", error);
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

onMounted(() => {
  fetchWorkOrder();
  fetchJaedanData();
  fetchJaedanJegoData();
  fetchProcessStateRecord();
  fetchLatestProduction();
  standByprocessfetchData();
  getProcessStateOnRecord();
  fetetchUseableWondan();
});
</script>

<style lang="scss" scoped></style>
