<template>
    <div class="w-full max-w-3xl mx-auto py-2">
      
         <div v-if="isLoading">
        <!-- Show loading indicator -->
        <p>Loading...</p>
      </div>
     
      <div class="album py-2 bg-body-tertiary">
        <div class="container">
          <!-- {{ jaedanRecord }} -->
          <!-- {{ pagedData }} -->
        </div>
      </div>
      <div class="container">
        <div class="mb-4 mx-4">
          <input
            v-model="searchQuery"
            getProductionAllData
            type="text"
            class="form-control"
            placeholder="검색어를 입력하세요"
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
        <div class="table-responsive">
          <table class="table table-sm text-center">
            <thead>
              <tr>
                <!-- <th>DATE</th> -->
                <th>DATE</th>
                <th>공정번호</th>
                <th>PART</th>
                <th>품명</th>
                <!-- <th>원단명</th>
    <th>원단번호</th> -->
                <th>공정번호</th>
                <th>COUNT</th>
                <th>LOT</th>
                <!-- <th class="d-none d-md-table-cell">LENGTH</th> -->
                <!-- <th class="d-none d-md-table-cell">연단길이</th>
    <th class="d-none d-md-table-cell">마크번호</th>--->
                <!-- <th class="d-none d-md-table-cell">공정등록자</th> -->
                <th class="d-none d-md-table-cell">작업일</th>
                <th class="d-none d-md-table-cell">생산등록자</th>
                <th class="d-none d-md-table-cell">STATE</th>
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
                <!-- <td>{{item.NO }}</td> -->
                <td>{{ formatDateToMonthDay(item.CREATE_DATE) }}</td>
                <td>{{ item.WORK_ORDER_NO }}</td>
                <td>{{ item.PRODUCT_FULLNAME }}</td>
                <td>{{ item.ProductCode }}</td>
                <td>{{ item.PROCESSCODE }}</td>
                <td>{{ item.COUNT }}</td>
                <td>{{ item.LOT }}</td>
                <!-- <td>{{ item.WONDAN_NAME }}</td>
    <td>{{ item.WONDAN_STORE_NO }}</td> -->
                <!-- <td>{{ item.LOT }}</td> -->
                <!-- <td class="d-none d-md-table-cell">{{ item.LENGTH }}</td>
    <td class="d-none d-md-table-cell">{{ item.Y_COUNT }}</td>
    <td class="d-none d-md-table-cell">{{ item.MARKS }}</td>
    <td class="d-none d-md-table-cell">{{ item.DEFECTIVE }}</td> -->
                <td class="d-none d-md-table-cell">
                  {{ formatDateToMonthDay(item.WORK_DATE) }}
                </td>
                <!-- <td class="d-none d-md-table-cell">{{ formatDate(item.Y_COUNT) }}</td>
    <td class="d-none d-md-table-cell">{{ formatDate(item.Y_COUNT) }}</td> -->
                <td class="d-none d-md-table-cell">
                  {{ item.REG_ACCOUNT_NAME }}
                  {{ item.UPDATE_ACCOUNT }}
                </td>
                <td class="d-none d-md-table-cell">{{ item.PROCESS_STATE }}</td>
  
               
                <td>
                  <!-- <div class="btn btn-sm btn-danger" @click="onDelete(item.NO)">DEL</div> -->
  
                  <!-- <div class="btn btn-sm btn-warning sm-btn" @click="onDetail(item.NO)" >Report</div> -->
                
                  <div
                  
                    class="btn btn-sm btn-secondary sm-btn text-white"
                    @click="onPrint(item.NO)"
                  >
                    공정진행표출력
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- paging -->
        <div v-if="filteredData.length > 0" class="d-flex justify-content-center mt-3">
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
      <hr />
      <JadanDetailModal
        :jaedanDetailData="jaedanDetailData"
        :isModalOpen="isModalOpen"
        v-if="isModalOpen"
        @closeModal="isModalOpen = false"
      />
    </div>
  </template>
  <script setup lang="ts">
  import type { JaedanModel } from "~~/server/model/jaedan";
  import type { ProductionModel } from "~~/server/model/production";
  import type { ProductModel } from "~~/server/model/product";
  import { formatDateToMonthDay } from "~~/utils/formatDatetoMonth";
  import { useRoute } from "vue-router";
  import { useAccountStore } from "~/store/account";
  const accountStore = useAccountStore();
  import { useAuthStore } from '~/store/auth'
  const authStore = useAuthStore()
  // import { RouteLocationRaw } from 'vue-router';
  //   interface RouteLocationRawWithParams extends RouteLocationRaw {
  //   params?: Record<string, string>;
  // }
  import * as XLSX from "xlsx";
  const router = useRouter();
  
  // 페이지 메타데이터 설정
  const pageTitle = ref('공정진행표출력');
  // useHead를 사용하여 메타 태그 설정
  useHead({
    title: pageTitle.value, // 페이지 제목 설정
    
  });
  import { usePageStore } from '~/store/pageStore';
  const pageStore = usePageStore();
  pageStore.setTitle(pageTitle.value);
  // 페이지 메타데이터 설정
  const jaedanDetailData = ref<JaedanModel[]>();
  const jaedanRecord = ref<JaedanModel[]>([]);
  const isLoading = ref(true);
  const productionAccount = ref("");
  // const filteredData = ref<JaedanModel[]>([]);
  
  const fetchData = async () => {
    try {
      const result = await $fetch("/api/production/getProcessRecord");
      jaedanRecord.value = result.data as JaedanModel[];
      console.log("jaedanRecord: ", jaedanRecord.value);
      filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
      isLoading.value = false; // Set loading state to false when data is fetched
      productionAccount.value = accountStore.user ? accountStore.user.NAME : "";
      productionAccount.value = accountStore.user ? accountStore.user.NO : "";
    } catch {
      alert("Fetch error");
    }
  };
  
  const onDelete = async (NO: number) => {
    try {
      console.log("no: " + NO);
      // await $fetch('/api/jaedan/' + NO, {
      // method: 'DELETE'
      // });
      alert(" " + NO + "번 삭제될.");
      alert("지금은 삭제 할수 없습니다. 관리자에게 문의 하세요");
      await fetchData();
    } catch {
      alert("Delete error");
    }
  };
  // ModalOpen
  const isModalOpen = ref(false);
  const onModal = async () => {
    isModalOpen.value = true;
    // jaedanDetailData.value = item;
    console.log("isModalOpen", isModalOpen);
  
    console.log("selectedItem", jaedanDetailData.value);
  };
  const onDetail = async (NO: number) => {
    try {
      console.log("no: " + NO);
      const result = await $fetch("/api/jaedan/" + NO, {
        method: "GET",
      });
      console.log("DetailData", result.data);
      jaedanDetailData.value = result.data as JaedanModel[];
      onModal();
      await fetchData();
    } catch {
      alert("Delete error");
    }
  };
  
  //   const onPrint = async (NO: number) => {
  //   try {
  //     console.log('no: ' + NO);
  //     const result = await $fetch('/api/jaedan/' + NO, {
  //       method: 'GET'
  //     });
  //     console.log("DetailData", result.data);
  //     jaedanDetailData.value = result.data as JaedanModel[];
  
  //     router.push({
  //       path: '/jaedan/report',
  //       query: { data: JSON.stringify(result.data) } // result.data를 문자열로 변환하여 전달
  //     });
  //   } catch {
  //     alert('Delete error');
  //   }
  // };
  const onProduction = async (item) => {
    console.log("item", item);
    const JaedanNo = item.NO;
    // const WORK_DATE = formatDate(item.WORK_DATE)
    // WORK_DATE 형식을 YYYYMMDD로 변환
    const workDate = new Date(item.WORK_DATE);
    const year = workDate.getFullYear();
    const month = String(workDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(workDate.getDate()).padStart(2, "0");
    // PROCESSCODE 생성
    // const PROCESSCODE = `${item.JAEDAN_PART_NAME}-${JaedanNo}-${item.WORK_DATE}`;
    // const PROCESSCODE = `${item.JAEDAN_PART_NAME.replace(/\s/g, '')}${item.NO}${WORK_DATE}`;
    // const PROCESSCODE = `${item.JAEDAN_PART_NAME.replace(/\s/g, "")}${year}${month}${day}${item.NO}`;
    // console.log("PROCESSCODE", PROCESSCODE);
    console.log("JaedanNo", JaedanNo);
    await $fetch(`/api/production/updateStateProcess/${JaedanNo}`, {
      method: "POST",
      body: {
        NO: JaedanNo,
        PROCESS_STATE: 2, // 상태를 3로 설정
        PROCESS_START_ACCOUNT: authStore.getUser.NO,
        // PROCESSCODE: PROCESSCODE, // PROCESSCODE 추가
      },
    });
    // await $fetch(`/api/production/register`, {
    //   method: "POST",
    //   body: {
    //     JAEDAN_NO: JaedanNo,
    //     PROCESS_CODE: PROCESSCODE, // PROCESSCODE 추가
    //     STATE: 0, // 상태를 1로 설정
    //   },
    // });
  
    fetchData();
  };
  const onPrint = async (NO: number) => {
    try {
      console.log("no: " + NO);
      const result = await $fetch("/api/jaedan/getDetail/" + NO, {
        method: "GET",
      });
      console.log("DetailData", result.data);
      jaedanDetailData.value = result.data as JaedanModel[];
      console.log("jaedanDetailData", jaedanDetailData.value);
  
      router.push({
        path: "/jaedan/reportForm",
        // path: '/jaedan/reportPrint',
        // path: '/jaedan/report',
        // params: { data: JSON.stringify(result.data) } // result.data를 문자열로 변환하여 전달
        query: { data: JSON.stringify(result.data) }, // result.data를 문자열로 변환하여 전달
      });
    } catch {
      alert(" error");
    }
  };
  onMounted(fetchData);
  
  // excel 데이터 받기
  const exportToExcel = () => {
    const data = jaedanRecord.value; // Assuming getInsertData contains the table data
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
  
  // 검색기능
  const searchQuery = ref("");
  const startDate = ref("");
  const endDate = ref("");
  
  const filteredData = computed(() => {
    let filtered = jaedanRecord.value;
  
    // 검색어 필터링
    if (searchQuery.value) {
      filtered = filtered.filter((item) => {
        const jaedan_part_name = item.ProductCode
          ? item.ProductCode.toLowerCase()
          : "";
        const PROCESSCODE = item.PROCESSCODE
          ? item.PROCESSCODE.toLowerCase()
          : "";
        const PRODUCT_FULLNAME = item.PRODUCT_FULLNAME
          ? item.PRODUCT_FULLNAME.toLowerCase()
          : "";
        const lot = item.LOT ? item.LOT.toLowerCase() : "";
        const searchValue = searchQuery.value.toLowerCase();
  
        return (
          jaedan_part_name.includes(searchValue) ||
          PROCESSCODE.includes(searchValue) ||
          PRODUCT_FULLNAME.includes(searchValue) ||
          lot.includes(searchValue)
        );
      });
    }
  
    // 날짜 범위 필터링
    if (startDate.value && endDate.value) {
      const start = new Date(startDate.value);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate.value);
      end.setHours(23, 59, 59, 999);
  
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.CREATE_DATE);
        return itemDate >= start && itemDate <= end;
      });
    }
  
    return filtered;
  });
  
  /// 페이징 관련 상태
const currentPage = ref(1);
const itemsPerPage = ref(20);
const totalItems = computed(() => filteredData.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

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
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
// 현재 페이지의 데이터 계산
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});
  </script>
  
  <style scoped>
  label {
    padding-left: 10%;
    font-size: small;
    border-bottom: 1px solid rgb(182, 67, 67);
    width: 100%;
    margin-bottom: 5px;
  }
  .col {
    margin-right: 7px;
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
  에서
  