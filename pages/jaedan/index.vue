<template>
  <div class="w-full max-w-3xl mx-auto py-">
    <!-- <h5 class="text-center mt-2">재단 현황 보기</h5> -->
    <!-- <hr />{{ accountStore.user }} -->
    <!-- 재단등록 state = 0 재단진행 = 1 재단완료 =2 -->
    <hr />
    accountStore{{ accountStore.user }}
    {{authStore.getUser}}
    productionAccount{{ productionAccount }}
   <div class="ms-3">
        <span>
            <h6>재단물리스트는 재단이 완성되어진 상태의 재단물입니다.</h6>
            <h6>생산투입은 재단물을 생산에 가져가기위한 상태 변경을 의미하며 재단물 반출시 생산투입을 클릭하여 반출합니다.</h6>
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
        <!-- {{ jaedanRecord }} -->
        <!-- {{ pagedData }} -->
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
              <th>등록일</th>
              <th>ORDER NO</th>
              <th>품명</th>
              <th>파트명</th>
              <th>LOT</th>
              <!-- <th>LOT</th> -->
              <th>COUNT</th>
              <th class="d-none d-md-table-cell">LENGTH</th>
              <th class="d-none d-md-table-cell">연단길이</th>
              <th class="d-none d-md-table-cell">마크번호</th>
              <!-- <th class="d-none d-md-table-cell">불량</th> -->
              <!-- <th class="d-none d-md-table-cell">작업일</th> -->
              <th class="d-none d-md-table-cell">등록일</th>
              <th class="d-none d-md-table-cell">진행상태</th>
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
            <tr v-for="(item, index) in pagedData" :key="index">
              <!-- <td>{{item.NO }}</td> -->
              <td>{{ formatDateToMonthDay(item.CREATE_DATE) }}</td>
              <td>{{ item.WORK_ORDER_NO }}</td>
              <td>{{ item.ProductCode }}</td>
              <td>{{ item.PRODUCT_FULLNAME }}</td>
              <!-- <td>{{ item.WONDAN_NAME }}</td> -->
              <td>{{ item.LOT }}</td>
              <!-- <td>{{ item.LOT }}</td> -->
              <td>{{ item.COUNT }}</td>
              <td class="d-none d-md-table-cell">{{ item.LENGTH }}</td>
              <td class="d-none d-md-table-cell">{{ item.Y_COUNT }}</td>
              <td class="d-none d-md-table-cell">{{ item.MARKS }}</td>
              <!-- <td class="d-none d-md-table-cell">{{ item.DEFECTIVE }}</td> -->
              <td class="d-none d-md-table-cell">
                {{ formatDateToMonthDay(item.WORK_DATE) }}
              </td>
              <td class="d-none d-md-table-cell">{{ item.STATE }}</td>
              <!-- <td class="d-none d-md-table-cell">{{ formatDate(item.Y_COUNT) }}</td>
  <td class="d-none d-md-table-cell">{{ formatDate(item.Y_COUNT) }}</td> -->
              <td class="d-none d-md-table-cell">
                {{ item.REG_ACCOUNT_NAME }}
              </td>
              <td>
                <!-- <div class="btn btn-sm btn-danger" @click="onDelete(item.NO)">DEL</div> -->
                <!-- <div class="btn btn-sm btn-warning sm-btn" @click="onDetail(item.NO)" >Report</div> -->
                <div v-if="item.STATE === 0" class="d-grid gap-2">
                  <button
                    @click="onProduction(item)"
                    class="btn btn-outline-success sm-btn disabled"
                    type="button"
                  >
                   재단대기 중
                  </button>
                </div>
                <div v-if="item.STATE === 1" class="d-grid gap-2">
                  <button
                    @click="onProduction(item)"
                    class="btn btn-outline-danger sm-btn disabled"
                    type="button"
                  >
                   재단진행 중
                  </button>
                </div>
                <div v-if="item.STATE === 2" class="d-grid gap-2">
                  <button
                    @click="onProduction(item)"
                    class="btn btn-outline-warning"
                    type="button"
                  >
                    생산투입
                  </button>
                </div>

                <div
                  v-if="item.STATE === 3"
                  class="btn btn-sm btn-warning sm-btn disabled text-white me-1"
                >
                  공정진행중
                </div>
                <div
                  v-if="item.STATE === 2"
                  class="btn btn-sm btn-secondary sm-btn text-white"
                >
                  재단완성
                </div>
                <!-- <div class="btn btn-sm btn-warning sm-btn text-white" @click="onPrint(item.NO)" >생산투입</div> -->
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
import { ref, computed, onMounted } from 'vue';
import type { ProductModel } from "~~/server/model/product";
import { formatDateToMonthDay } from "~~/utils/formatDatetoMonth";
import { useRoute } from "vue-router";
import { useAccountStore } from "~/store/account";
import { useAuthStore } from '~/store/auth'
const authStore = useAuthStore()
// import { RouteLocationRaw } from 'vue-router';
//   interface RouteLocationRawWithParams extends RouteLocationRaw {
//   params?: Record<string, string>;
// }
import * as XLSX from "xlsx";
const router = useRouter();

// 페이지 메타데이터 설정
const pageTitle = ref('재단물 현황');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정

const accountStore = useAccountStore();

const jaedanDetailData = ref<JaedanModel[]>();
const jaedanRecord = ref<JaedanModel[]>([]);
 
const isLoading = ref(true);
// 검색기능
const searchQuery = ref("");
const startDate = ref("");
const endDate = ref("");

// const filteredData = ref<JaedanModel[]>([]);


const fetchData = async () => {
  try {
    const result = await $fetch("/api/jaedan/getProcessStateRecord");
    jaedanRecord.value = result.data as JaedanModel[];
    // filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
    isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};

// const onDelete = async (NO: number) => {
//   try {
//     console.log("no: " + NO);
//     // await $fetch('/api/jaedan/' + NO, {
//     // method: 'DELETE'
//     // });
//     alert(" " + NO + "번 삭제될.");
//     alert("지금은 삭제 할수 없습니다. 관리자에게 문의 하세요");
//     await fetchData();
//   } catch {
//     alert("Delete error");
//   }
// };
// ModalOpen
const isModalOpen = ref(false);
const onModal = async () => {
  isModalOpen.value = true;
  // jaedanDetailData.value = item;
  console.log("isModalOpen", isModalOpen);

  console.log("selectedItem", jaedanDetailData.value);
};
// const onDetail = async (NO: number) => {
//   try {
//     console.log("no: " + NO);
//     const result = await $fetch("/api/jaedan/" + NO, {
//       method: "GET",
//     });
//     console.log("DetailData", result.data);
//     jaedanDetailData.value = result.data as JaedanModel[];
//     onModal();
//     await fetchData();
//   } catch {
//     alert("Delete error");
//   }
// };
const productionAccount = ref("");
//STATE 값을 onProduction 이 아닌 JAEDAN STATE 값을 업데이트 하는 함수로 변경
// const onProduction = async (item) => {
//   console.log("item", item);
//   const JaedanNo = item.NO;
//   productionAccount.value = accountStore.user ? accountStore.user.NAME : "";
//     productionAccount.value = accountStore.user ? accountStore.user.NO : "";
//   // const WORK_DATE = formatDate(item.WORK_DATE)
//   // WORK_DATE 형식을 YYYYMMDD로 변환
//   const workDate = new Date(item.WORK_DATE);
//   const year = workDate.getFullYear();
//   const month = String(workDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
//   const day = String(workDate.getDate()).padStart(2, "0");
//   // PROCESSCODE 생성
//   // const PROCESSCODE = `${item.JAEDAN_PART_NAME}-${JaedanNo}-${item.WORK_DATE}`;
//   // const PROCESSCODE = `${item.JAEDAN_PART_NAME.replace(/\s/g, '')}${item.NO}${WORK_DATE}`;
//   const PROCESSCODE = `${item.JAEDAN_PART_NAME.replace(/\s/g, "")}${year}${month}${day}${item.NO}`;
//   console.log("PROCESSCODE", PROCESSCODE);
//   console.log("JaedanNo", JaedanNo);
//   console.log("PD_ACCOUNT",  productionAccount.value);
//   await $fetch(`/api/jaedan/updateStateProcess/${JaedanNo}`, {
//     method: "POST",
//     body: {
//       NO: JaedanNo,
//       STATE: 3, // 상태를 3로 설정
//       // PRODUCTION_ACCOUNT: productionAccount.value,
//       // PROCESSCODE: PROCESSCODE, // PROCESSCODE 추가
//       PD_STATE: 1, // 상태를 3로 설정
//       PD_ACCOUNT: productionAccount.value,
//       PD_DATE: new Date(),
//       // PROCESSCODE: PROCESSCODE, // PROCESSCODE 추가
//     },
//   });
//   await $fetch(`/api/production/register`, {
//     method: "POST",
//     body: {
//       JAEDAN_NO: JaedanNo,
//       PROCESS_CODE: PROCESSCODE, // PROCESSCODE 추가
//       STATE: 1, // 상태를 1로 설정
//     },
//   });

//   fetchData();
// };



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
  // productionAccount.value = accountStore.user ? accountStore.user.NAME : "";
    productionAccount.value = accountStore.user ? accountStore.user.NO : "";
  // const WORK_DATE = formatDate(item.WORK_DATE)
  // WORK_DATE 형식을 YYYYMMDD로 변환
  
  console.log("JaedanNo", JaedanNo);
  console.log("productionAccount",  productionAccount.value);
  console.log("JaedanNo", JaedanNo);
  await $fetch(`/api/jaedan/processUpdateState/${JaedanNo}`, {
    method: "POST",
    body: {
      NO: JaedanNo,
      PROCESS_STATE: 1, // 상태를 3 = 재단재고에서 생산 투입 상태로 설정
      // PROCESS_STATE_UP_ACCOUNT: productionAccount.value,
      PROCESS_STATE_UP_ACCOUNT: authStore.getUser.NO,
   
    },
  }).then(response => {
  // 응답이 성공적으로 반환된 경우
  console.log('응답 데이터:', response);
}).catch(error => {
  // 오류가 발생한 경우
  console.error('오류 발생:', error);
});;
  // await $fetch(`/api/production/register`, {
  //   method: "POST",
  //   body: {
  //     JAEDAN_NO: JaedanNo,
     
  //     STATE: 3, // 상태를 3 = 재단재고에서 생산 투입 상태로 설정
  //   },
  // });

  fetchData();
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



// 필터링된 데이터 계산
const filteredData = computed(() => {
  let filtered = jaedanRecord.value;

  // 검색어 필터링
  if (searchQuery.value) {
    const searchValue = searchQuery.value.toLowerCase();
    filtered = filtered.filter((item) => {
      const jaedan_part_name = item.JAEDAN_PART_NAME
        ? item.JAEDAN_PART_NAME.toLowerCase()
        : "";
      const wondan_name = item.WONDAN_NAME
        ? item.WONDAN_NAME.toLowerCase()
        : "";
      const wondan_store_no = item.WONDAN_STORE_NO
        ? item.WONDAN_STORE_NO.toLowerCase()
        : "";
      const lot = item.LOT ? item.LOT.toLowerCase() : "";

      return (
        jaedan_part_name.includes(searchValue) ||
        wondan_name.includes(searchValue) ||
        wondan_store_no.includes(searchValue) ||
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
