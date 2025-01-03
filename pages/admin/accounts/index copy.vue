<template>
    <div class="w-full max-w-3xl mx-auto py-">
     
      <hr />
     <div class="ms-3">
          <span>
           
          </span>
     </div> 
      <div v-if="isLoading">
        <!-- Show loading indicator -->
        <p>Loading...</p>
      </div>
      <div v-else class="container chart_container">
      
      </div>
      <div class="album py-5 bg-body-tertiary">
        <div class="container">
        
        </div>
      </div>
      <div class="container">
        <div class="mb-4 mx-4">
          <input
            v-model="searchQuery"
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
                <th>NO</th>
                <th>EMAIL</th>
                <th>NAME</th>
                <th>ROLE</th>
                <th>CREATE_DATE</th>
                <!-- <th>LOT</th> -->
                <th>STATE</th>
                
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
                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                    <td>{{ item.EMAIL }}</td>
                    <td>{{ item.ROLE }}</td>
                    <td>{{ item.POSITION }}</td>
                    <td>{{ formatDate(item.CREATE_DATE) }}</td>
                    <td>{{ item.ACCOUNT_STATE }}</td>
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
  <script setup lang="ts">
  
  import { ref, computed, onMounted } from 'vue';
  
  import { formatDate } from "~~/utils/datefomatter";
  import { useRoute } from "vue-router";
  import { useAccountStore } from "~/store/account";
  import { useAuthStore } from '~/store/auth'
  const authStore = useAuthStore()
  
  import * as XLSX from "xlsx";
  const router = useRouter();
  
  // 페이지 메타데이터 설정
  const pageTitle = ref('Accounts');
  // useHead를 사용하여 메타 태그 설정
  useHead({
    title: pageTitle.value, // 페이지 제목 설정
    
  });
  import { usePageStore } from '~/store/pageStore';
  const pageStore = usePageStore();
  pageStore.setTitle(pageTitle.value);
  // 페이지 메타데이터 설정
  
  const accountStore = useAccountStore();
  
  const accountDetailData = ref();
  const accounts = ref([]);
   
  const isLoading = ref(true);
  // 검색기능
  const searchQuery = ref("");
  const startDate = ref("");
  const endDate = ref("");
  
//   const filteredData = ref([]);
  
  
  const fetchData = async () => {
    try {
      const result = await $fetch("/api/account/getAccounts");
      accounts.value = result.data;
      filteredData.value = accounts.value; // filteredData에 초기값 할당
      isLoading.value = false; // Set loading state to false when data is fetched
    } catch {
      alert("Fetch error");
    }
  };
  
     
  
  
  onMounted(fetchData);
  
  // excel 데이터 받기
  const exportToExcel = () => {
    const data = accounts.value; // Assuming getInsertData contains the table data
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
  
  
  
  // 필터링된 데이터 계산
  const filteredData = computed(() => {
    let filtered = accounts.value;
  
    // 검색어 필터링
    if (searchQuery.value) {
      const searchValue = searchQuery.value.toLowerCase();
      filtered = filtered.filter((item) => {
        const EMAIL = item.EMAIL
          ? item.EMAIL.toLowerCase()
          : "";
        const NAME = item.NAME
          ? item.NAME.toLowerCase()
          : "";
        const ROLE = item.ROLE
          ? item.ROLE.toLowerCase()
          : "";
      
  
        return (
            EMAIL.includes(searchValue) ||
            NAME.includes(searchValue) ||
            ROLE.includes(searchValue) 
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
  
  //페이징 기능 구현 //////////////////////////////////////////////////
  const itemsPerPage = 10; // 한 페이지당 아이템 수
  let currentPage = ref(1); // 현재 페이지
  const totalPages = computed(() =>
    Math.ceil(filteredData.value.length / itemsPerPage),
  ); // 전체 페이지 수
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
  const endIndex = computed(() =>
    Math.min(startIndex.value + itemsPerPage, filteredData.value.length),
  );
  const pagedData = computed(() =>
    filteredData.value.slice(startIndex.value, endIndex.value),
  );
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
  