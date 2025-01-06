<template>
    <div class="w-full max-w-3xl mx-auto py-8">
            <!-- Show loading indicator -->
           
      <!-- <h5 class="text-center mt-2">원단 조회</h5> -->
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else class="container chart_container"></div>
      <div class="album py-2 bg-body-tertiary"></div>
      <!--Top container -->
      <div class="container">
        <!-- 검색 입력 필드 추가 -->
        <div class="mb-4 mx-4">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="검색어를 입력하세요"
          />
        </div>
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
      </div>
      <hr />
      <!-- Table container -->
      <div class="container">
        <p class="text-end me-4">최근데이터 50개</p>
        <!--  -->
        <div class="table-responsive">
          <table class="table table-sm text-center">
            <thead>
              <tr>
                <!-- <th>DATE</th> -->
                <th class="">NO</th>
  
                <th>등록일</th>
                <th>원단구분</th>
  
                <th>LOT NO</th>
                <th>길이</th>
                <th>실길이</th>
  
                <th class="d-none d-md-table-cell">공급자</th>
                <th class="d-none d-md-table-cell">등록자</th>
                <!-- <th class="d-none d-md-table-cell">상태</th> -->
                <th class="d-none d-md-table-cell" @click="sortData('STATE')">
                  <div class="d-flex justify-content-center align-items-end">
                    <span>상태</span>
                    <div
                      class="d-flex flex-column align-items-end"
                      style="height: 30px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fill-rule="evenodd">
                          <path
                            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                          />
                          <path
                            fill="currentColor"
                            d="M11.293 8.293a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414L12 10.414l-4.95 4.95a1 1 0 0 1-1.414-1.414z"
                          />
                        </g>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fill-rule="evenodd">
                          <path
                            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                          />
                          <path
                            fill="currentColor"
                            d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
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
              <!-- <tr v-for="(item, index) in wondanInventory" :key="index"> -->
              <tr v-for="(item, index) in pagedData" :key="index">
                <td>{{ item.NO }}</td>
                <td>{{ formatDate(item.REG_DATE) }}</td>
  
                <td>{{ item.WONDAN_NAME }}</td>
                <td>{{ item.LOT_NO }}</td>
                <td>{{ item.LENGTH }}</td>
                <td>{{ item.REAL_LENGTH }}</td>
                <td class="d-none d-md-table-cell">{{ item.SUPPLY }}</td>
                <td class="d-none d-md-table-cell">{{ item.REG_ACCOUNT }}</td>
                <td class="d-none d-md-table-cell">{{ item.STATE }}</td>
  
                <!--                  
                    <td>{{ item.COUNT }}</td>
                    <td>{{ item.STATE }}</td>
                    
                    <td class="d-none d-md-table-cell">{{ item.NAME }}</td> -->
  
                <td>
                  <div>
                    <div
                      v-if="canDelete"
                      class="btn btn-sm btn-danger me-1"
                      @click="onDelete(item.NO)"
                    >
                      삭제
                    </div>
                    <div v-if="canEdit"
                      class="btn btn-sm btn-warning text-white"
                      @click="onEdit(item)"
                    >
                      수정
                    </div>
  
                    <!-- Button to open edit modal -->
                  </div>
                  <div>
                    <!-- <div class="btn btn-sm btn-success" @click="onRegister(item)">재단등록됨</div> -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--  -->
      </div>
      <!-- paging  -->
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
      <!-- paging  -->
      <hr />
      <!-- Modal -->
      <ModalComponent
        :selectedItem="selectedItem"
        :isModalOpen="isModalOpen"
        v-if="isModalOpen"
        @closeModal="isModalOpen = false"
        @update-data="fetchData"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import type { WondanModel } from "~~/server/model/wondan";
  //   import type { WORKING_PART_Model } from '~~/server/model/working_part';
  import { useAccountStore } from "~/store/account";
  import { formatDate } from "~/utils/datefomatter";
  import { useRoute } from "vue-router";
  import { useWorkStore } from "~/store/works";
  import * as XLSX from "xlsx";
  import { defineComponent } from 'vue'
  
  defineComponent({
    ssr: false
  })
  const accountStore = useAccountStore();
  // 페이지 메타데이터 설정
  const pageTitle = ref('원단 조회');
  // useHead를 사용하여 메타 태그 설정
  useHead({
    title: pageTitle.value, // 페이지 제목 설정
    
  });
  import { usePageStore } from '~/store/pageStore';
  const pageStore = usePageStore();
  pageStore.setTitle(pageTitle.value);
  
  // 페이지  권한 설정
  import { useAuthStore } from '~/store/auth';
  const authStore = useAuthStore();
  const userLevel = computed(() => {
    return authStore.getUser?.level ?? '로그인이 필요합니다';
  });
  const canDelete = computed(() => {
    return (authStore.getUser?.level ?? 0) >= 5;
  });
  const canEdit = computed(() => {
    const userRole = authStore.getUser?.role;
    const userLevel = authStore.getUser?.level ?? 0;
    return userRole === '재단' || userRole === '관리자' || userLevel >= 5;
  });

  const isModalOpen = ref(false);
  const selectedItem = ref(null);
  const router = useRouter();
  const form = reactive({
    REG_DATE: "",
    WONDAN_NAME: "",
    LOT_NO: "",
    LENGTH: "",
    REAL_LENGTH: "",
    SUPPLY: "",
    // REG_ACCOUNT:  parseInt(accountStore.user ? accountStore.user.NO : '')
    REG_ACCOUNT: "",
    DEFECTIVE_LENGTH: 0,
  });
  const regUser = ref("");
  //   const WORKING_PART = ref<WORKING_PART_Model[]>([]);
  const wondanCode = ref<WondanModel[]>([]);
  const wondanInventory = ref<WondanModel[]>([]);
  
  const isLoading = ref(true);
  
  const fetchData = async () => {
    try {
      const result = await $fetch<WondanModel[]>("/api/wondan/getWondanCode");
      console.log("result data", result);
  
      wondanInventory.value = result.data.data || []; // 데이터가 없을 경우 빈 배열로 설정
  
      form.REG_ACCOUNT = parseInt(accountStore.user ? accountStore.user.NO : "");
      regUser.value = accountStore.user ? accountStore.user.NAME : "";
  
      const regWondan = await $fetch("/api/wondan/getRecord");
      console.log("regWondan", regWondan.data);
      wondanInventory.value = regWondan.data.data;
  
      isLoading.value = false; // Set loading state to false when data is fetched
      filteredData.value = wondanInventory.value; // 전체 데이터를 filteredData에 할당
    } catch {
      alert("Fetch error");
    }
  };
  
  const insertData = async () => {
    // 입력값 검증을 위한 플래그 설정
    let isValid = true;
    let alertMessage = "";
  
    //각 입력 필드에 대한 검증
    if (!form.REG_DATE.trim()) {
      isValid = false;
      alertMessage += "DATE를 입력해주세요.\n";
    }
    //
    if (!form.WONDAN_NAME.trim()) {
      isValid = false;
      alertMessage += "WONDAN_NAME을 선택해주세요.\n";
    }
    if (!form.LOT_NO.trim()) {
      isValid = false;
      alertMessage += "LOT_NO를 선택해주세요.\n";
    }
  
    const countNumber = Number(form.LENGTH);
    if (!form.LENGTH || isNaN(countNumber) || countNumber <= 0) {
      isValid = false;
      alertMessage += "LENGTH를 입력해주세요.\n";
    }
    const countNumber2 = Number(form.REAL_LENGTH);
    if (!form.REAL_LENGTH || isNaN(countNumber2) || countNumber2 <= 0) {
      isValid = false;
      alertMessage += "REAL_LENGTH를 입력해주세요.\n";
    }
  
    //     if (!form.REG_ACCOUNT && form.REG_ACCOUNT !== 0) {
    //     isValid = false;
    //     alertMessage += '등록자를 입력해주세요.\n';
    //   }
  
    // if (!form.REG_ACCOUNT.trim()) {
    //   isValid = false;
    //   alertMessage += '등록자를 를 입력해주세요.\n';
    // }
  
    try {
      const response = await $fetch("/api/wondan/register", {
        method: "POST",
        body: form,
      });
  
      if (
        response.statusCode === 400 &&
        response.statusMessage === "LOT_NO already exists"
      ) {
        alert("LOT NO 중복된 값입니다.");
      } else if (response.data) {
        alert("등록되었습니다.");
        await fetchData();
      } else {
        alert("등록 중 오류가 발생했습니다.");
      }
    } catch {
      alert("등록 중 오류가 발생했습니다.!!");
    }
  };
  const onEdit = async (item: any) => {
    isModalOpen.value = true;
    selectedItem.value = item;
    console.log("isModalOpen", isModalOpen);
    console.log("item", item.NO);
    console.log("selectedItem", selectedItem.value);
  };
  const searchQuery = ref("");
  const startDate = ref("");
  const endDate = ref("");
  
  const filteredData = computed(() => {
    let filtered = wondanInventory.value;
  
    // 검색어 필터링
    if (searchQuery.value) {
      filtered = filtered.filter((item) => {
        return (
          item.LOT_NO.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.WONDAN_NAME.toLowerCase().includes(searchQuery.value.toLowerCase())
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
        const itemDate = new Date(item.REG_DATE);
        return itemDate >= start && itemDate <= end;
      });
    }
  
    return filtered;
  });
  // sort
  const sortKey = ref("");
  const sortOrder = ref(1);
  
  const sortData = (key) => {
    if (sortKey.value === key) {
      sortOrder.value = -sortOrder.value;
    } else {
      sortKey.value = key;
      sortOrder.value = 1;
    }
  
    filteredData.value.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
  
      if (valueA < valueB) {
        return -sortOrder.value;
      }
      if (valueA > valueB) {
        return sortOrder.value;
      }
      return 0;
    });
  };
  // ...
  // excel 데이터 받기
  const exportToExcel = () => {
    const data = wondanInventory.value; // Assuming getInsertData contains the table data
  
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
  //페이징 기�� 구�� //////////////////////////////////////////////////
  const itemsPerPage = 20; // 한 페이지당 아이템 수
  let currentPage = ref(1); // 현재 페이지
  const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / itemsPerPage) || 1; // 0일 경우 1로 설정
  });// 전체 페이지 수
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
    Math.min(startIndex.value + itemsPerPage, jaedanRecord.value.length),
  );
  const pagedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredData.value.slice(start, start + itemsPerPage);
  });
  // 검색기능
  
  onMounted(fetchData);
  const onRegister = async (item: any) => {
    // const store = useWorkStore();
    // store.addItem(item);
    const NO = item.NO;
    console.log("NO", NO);
    // router.push("/jaedan/register");
    router.push({ path: "/jaedan/register", query: { param: NO } });
    // router.push({ path: '/jaedan/regjadan', query: { param: NO} });
  
    // store.addItem(item);
  };
  
  const onDelete = async (NO: number) => {
    const confirmation = confirm(NO + "번 항목을 정말 삭제하시겠습니까?");
    if (!confirmation) {
      return; // 사용자가 취소를 선택하면 함수 실행을 중단
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
  /* 페이징 */
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
  