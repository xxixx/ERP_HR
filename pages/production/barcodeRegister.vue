<template>
  <div class="w-full max-w-3xl mx-auto py-8">

    <div v-if="isLoading">
      <p>Loading...</p>
    </div>

    <div v-else class="container chart_container">
      <!-- {{ jaedanRecord }}
      {{ productionAccount }}
      pagedData {{ pagedData }} -->
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
          type="text"
          class="form-control"
          placeholder="검색어를 입력하세요"
        />
      </div>

      <div class="text-end me-4">
        <input class="px-3 mx-1" type="date" v-model="startDate" />
        <input class="px-3 mx-1" type="date" v-model="endDate" />
        <button class="btn btn-sm btn-warning" @click="fetchDataByDateRange">
          조회
        </button>
      </div>
      <!-- {{ pagedData }} -->
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
              <th>DATE</th>
              <th>품명</th>
              <th>공정진행표</th>
              <th>COUNT</th>
              <th class="d-none d-md-table-cell">NO</th>
              <th class="d-none d-md-table-cell">진척도</th>
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
          <tbody v-for="(item, index) in pagedData" :key="index">
          
            <tr>
              <td>{{ formatDateToMonthDay(item.CREATE_DATE) }}</td>
              <td>{{ item.PRODUCT_FULLNAME }}</td>
              <td @click="onPrint(item.NO)" class="btn btn-hover">
                <span>{{ item.PROCESSCODE }}</span>
              </td>
              <td>{{ item.COUNT }}</td>
              <td class="d-none d-md-table-cell">
                {{item.NO }}
              </td>
              <td class="d-none d-md-table-cell">
                <div class="progress" role="progressbar" 
                     :aria-label="'진행률: ' + Math.round((item.SCANNED_COUNT / item.COUNT) * 100) + '%'" 
                     :aria-valuenow="Math.round((item.SCANNED_COUNT / item.COUNT) * 100)" 
                     aria-valuemin="0" 
                     aria-valuemax="100">
                  <div class="progress-bar progress-bar-striped bg-warning" 
                       :style="{ width: Math.round((item.SCANNED_COUNT / item.COUNT) * 100) + '%' }">
                    {{ Math.round((item.SCANNED_COUNT / item.COUNT) * 100) }}%
                  </div>
                </div>
              </td>
              <td>
                <!-- <div
                  v-if="item.STATE === 2 && item.PROCESS_STATE ===2"
                  class="btn btn-sm btn-warning sm-btn disabled text-white me-1"
                >
                  공정진행중
                </div> -->
                <!-- <div v-if="item.STATE === 3" class="btn btn-sm btn-secondary sm-btn text-white" @click="onPrint(item.NO)">공정진행표출력</div> -->
                <div
                  v-if="item.STATE === 2 && item.PROCESS_STATE ===2"
                  class="d-grid gap-2"
                >
                  <button
                    @click="onBarcodeRegister(item)"
                    class="btn btn-outline-warning"
                    type="button"
                  >
                    생산출고(박스라벨)
                  </button>
                </div>
              </td>
            </tr>
            <tr class="tr-border">
              <td></td>
              <td> <strong>[계획수량 <span  class="text-danger ms-2">{{ item.COUNT }}</span>]</strong></td>
              <td class="">
                <strong
                  >바코드 출력수<span class="text-danger ms-3">[{{
                    item.PRINT_BARCODE_COUNT
                  }}]</span></strong
                >
              </td>
              <td class="d-none d-md-table-cell"></td>
              <td>
                <strong
                  >바코드 등록수<span class="text-danger ms-3">[{{ item.SCANNED_COUNT }}]</span></strong
                >
              </td>
              <td class="d-none d-md-table-cell"></td>
              <td>
                <div
                  v-if="item.STATE === 2"
                  class="d-grid gap-2"
                >
                  <!-- <button
                    @click="onProcessChangeState(item)"
                    class="btn btn-outline-success"
                    type="button"
                  >
                    공정완료하기
                  </button> -->
                  <button
                    @click="onProcessFinish(item)"
                    class="btn btn-outline-success"
                    type="button"
                  >
                    공정완료하기
                  </button>
                </div>
                <div v-else="item.PD_STATE === 1" class="d-grid gap-2">
                  <button class="btn btn-success disabled" type="button">
                    공정완료(마감)
                  </button>
                </div>
              </td>
              <!-- <td> <div v-if="item.PD_STATE === 1" class="d-grid gap-2">
                  <button @click="onProcessChangeState(item)" class="btn btn-outline-success disable" type="button">공정완료(마감)</button>
                </div>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>

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
              Prev
            </a>
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
              >Next
            </a>
          </li>
        </ul>
      </div>
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
import * as XLSX from "xlsx";
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();
import { useAccountStore } from "~/store/account";
const accountStore = useAuthStore();
// 페이지 메타데이터 설정
const pageTitle = ref('바코드 등록 / 박스라벨 출력/ 공정마감');
// useHead를 사용하여 메타 태그 설정
useHead({title: pageTitle.value, });// 페이지 제목 설정
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);


const router = useRouter();



const jaedanDetailData = ref<JaedanModel[]>();
const jaedanRecord = ref<JaedanModel[]>([]);
const isLoading = ref(true);
const productionAccount = ref("");

const fetchData = async () => {
  try {
    // const result = await $fetch("/api/production/getProcessStateRecord");
    const result = await $fetch("/api/production/getProcessStateRecord");
    jaedanRecord.value = result.data as JaedanModel[];
    filteredData.value = jaedanRecord.value; // filteredData에 초기값 할당
    isLoading.value = false; // Set loading state to false when data is fetched
    productionAccount.value = accountStore.user ? accountStore.user.NAME : "";
    productionAccount.value = accountStore.user ? accountStore.user.NO : "";
  } catch {
    alert("Fetch error");
  }
};
// const fetchData = async () => {
//   try {
//     const result = await $fetch("/api/production/getRecord");
//     jaedanRecord.value = result.data as JaedanModel[];
//     filteredData.value = jaedanRecord.value;
//     isLoading.value = false;
//     productionAccount.value = accountStore.user ? accountStore.user.NAME : "";
//     productionAccount.value = accountStore.user ? accountStore.user.NO : "";
//   } catch {
//     alert("Fetch error");
//   }
// };

const onBarcodeRegister = async (item: ProductionModel) => {
  const PROCESS_CODE = item.PROCESSCODE;
  console.log("item.PROCESS_CODE", item.PROCESSCODE);
  console.log("PROCESS_CODE", PROCESS_CODE);
  console.log("ProductCode", item.ProductCode);
  console.log("PRODUCT_CODE", item.PRODUCT_CODE);

  router.push({
    path: "/barcode/barcodeRegister",
    query: { processCode: PROCESS_CODE,
       productCode: item.ProductCode, 
       PRODUCT_CODE: item.PRODUCT_CODE,
       PRODUCT_FULLNAME: item.PRODUCT_FULLNAME },
  });
};

const onDelete = async (NO: number) => {
  try {
    console.log("no: " + NO);
    alert(" " + NO + "번 삭제될.");
    alert("지금은 삭제 할수 없습니다. 관리자에게 문의 하세요");
    await fetchData();
  } catch {
    alert("Delete error");
  }
};

const isModalOpen = ref(false);

const onModal = async () => {
  isModalOpen.value = true;
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

const onProcessChangeState = (item) => {
  console.log("item", item);
  const JaedanNo = item.NO;

  console.log("JaedanNo", JaedanNo);

  const response = $fetch(`/api/production/updateStateProcess/${JaedanNo}`, {
    method: "POST",
    body: {
      NO: JaedanNo,
      PD_STATE: 1,
      PD_ACCOUNT: productionAccount.value,
      PD_DATE: new Date(),
    },
  })
    .then(() => {
      // 요청이 성공적으로 완료되면 이 부분이 실행됩니다.
      if (response) {
        alert("업데이트 성공");
        console.log("업데이트 성공");
      } else {
        console.log("업데이트 실패");
      }
      fetchData();
    })
    .catch((error) => {
      // 에러가 발생하면 이 부분이 실행됩니다.
      console.error("요청 중 에러 발생:", error);
    });
};
const onProcessFinish = async (item) => {
  console.log("item", item);
  const JaedanNo = item.NO;

  console.log("JaedanNo", JaedanNo);

  // 확인 창 표시
  if (!confirm("공정을 완료 하시겠습니까?")) {
    return; // 취소를 누르면 함수 종료
  }

  try {
    const response = await $fetch(`/api/production/processFinish/${JaedanNo}`, {
      method: "POST",
      body: {
        NO: JaedanNo,
        PROCESS_STATE: 3,
        PROCESS_STATE_UP_ACCOUNT: productionAccount.value,
        PROCESS_END_DATE: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식으로 변환
      },
    });

    if (response) {
      alert("업데이트 성공");
      console.log("업데이트 성공");
      await fetchData(); // 성공 후 데이터 새로고침
    } else {
      console.log("업데이트 실패");
      alert("업데이트 실패");
    }
  } catch (error) {
    console.error("요청 중 에러 발생:", error);
    alert("업데이트 실패");
  }
};

const onPrint = async (NO: number) => {
  try {
    console.log("no: " + NO);
    const result = await $fetch("/api/jaedan/" + NO, {
      method: "GET",
    });
    console.log("DetailData", result.data);
    jaedanDetailData.value = result.data as JaedanModel[];

    router.push({
      path: "/jaedan/reportForm",
      query: { data: JSON.stringify(result.data) },
    });
  } catch {
    alert("Delete error");
  }
};

onMounted(fetchData);

const exportToExcel = () => {
  const data = jaedanRecord.value;
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

const searchQuery = ref("");
const startDate = ref("");
const endDate = ref("");

const filteredData = computed(() => {
  let filtered = jaedanRecord.value;

  if (searchQuery.value) {
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
      const searchValue = searchQuery.value.toLowerCase();

      return (
        jaedan_part_name.includes(searchValue) ||
        wondan_name.includes(searchValue) ||
        wondan_store_no.includes(searchValue) ||
        lot.includes(searchValue)
      );
    });
  }

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

const itemsPerPage = 10;
let currentPage = ref(1);
const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / itemsPerPage),
);

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
.btn-hover :hover {
  background-color: aqua !important;
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
.tr-border > td {
  border-bottom: #cc1b6f;
  background-color: rgb(234, 234, 233) !important;
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
