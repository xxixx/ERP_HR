<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <!-- <h5 class="text-center mt-2">공정등록</h5>
    -->

    <div v-if="isLoading">
      <!-- Show loading indicator -->
      <p>Loading...</p>
    </div>

    <div class="album py-5 bg-body-tertiary"></div>
    <!-- workOrderList{{workOrderList}} -->
    <!-- WORKING_PART    {{ WORKING_PART}} -->
    <div class="container">
      <!--  -->
      <form class="">
        <div class="d-flex justify-content-between">
          <!-- {{  accountStore.user }} user -->
          <!-- {{  accountStore.user ? accountStore.user.NAME : ''  }} -->
          <!-- regUser{{ regUser }} -->
          <!-- workOrderList{{ workOrderList }} -->
        </div>

        <hr />

        <div class="d-flex flex-wrap">
          <!-- {{ product }} -->

          <div class="col-2">
            <label for="validationDefault01">날짜</label>
            <input
              v-model="form.CREATE_DATE"
              type="DATE"
              class="form-control border border-success"
              id="validationDefault01"
              placeholder="DATE"
              required
            />
          </div>

          <!-- <div class="col-1 col-lg-1 d-none">
                <label for="validationDefault01">품명</label>
                <input v-model="form.WORKING_PART" type="text" class="form-control border border-success" id="validationDefault01" placeholder=""  required>
              </div> -->
          <!--  -->
          <div class="col-6 col-lg-4">
            <label for="workingPartSelect">품명</label>
            <select
  v-model="form.WORKING_PART"
  id="workingPartSelect"
  class="form-control border border-success"
  required
>
  <option value="" disabled selected>품명을 선택하세요</option>
  <option
    v-for="part in WORKING_PART"
    :value="part.WorkingPartNo" 
  >
    <span>{{ part.WorkingPartNo }}</span>
    <span>{{ part.ID }}</span>
    <span> [ </span>
    <span class="mx-2"> {{ part.PRODUCT_NAME }}  | </span>
    <span class="mx-2"> {{ part.CAR }}</span>
    <span class="mx-2"> {{ part.LOCATION }}</span>
    <span> / </span>
    <span style="margin-right: 10px">
      {{ part.PRODUCT_CODE }}</span
    >
    <span> ] </span>
    <span> {{ part.ProductCode }}</span>
    <span> {{ part.JAEDAN_PART_NAME }}</span>
    <span> - </span>
    <span> {{ part.WONDAN_CODE }}</span>
  </option>
</select>

          </div>
          <!--  -->

          <div class="col-3 col-lg-2">
            <label for="validationDefault01">COUNT</label>
            <input
              v-model="form.COUNT"
              type="text"
              class="form-control border border-success"
              id="validationDefault01"
              placeholder="COUNT"
              required
            />
          </div>

          <!--  -->
          <div class="col-2 col-lg-2">
            <label for="validationDefault01">등록자</label>
            <!-- <input v-model="form.REG_ACCOUNT" type="text" class="form-control border border-success" id="validationDefault01" placeholder="등록자" required> -->
            <input
              v-model="regUser"
              type="text"
              class="form-control border border-success"
              id="validationDefault01"
              placeholder="등록자"
              required
              readonly
            />
          </div>

          <div class="d-flex"></div>

          <!--  -->
          <div class="d-flex d-flex-wrap"></div>
        </div>
        <div class="d-flex"></div>
      </form>
      <!--  -->
      <div class="d-flex mt-1 w-100 justify-content-center">
        <button
          @click="insertData"
          class="btn btn-warning btn-sm w-50 text-white mt-2"
          type="submit"
        >
          INSERT
        </button>
      </div>
    </div>

    <hr />
    <div class="container">
      <p class="text-end me-4">최근데이터 210개</p>

      <!--  -->
      <div class="table-responsive">
        <table class="table table-sm text-center">
          <thead>
            <tr>
              <!-- <th>DATE</th> -->
              <th class="">NO</th>

              <th>등록일</th>
              <th>공정번호/공정명</th>

             
            
              <th>원단명</th>

              <th class="">COUNT</th>
              <th class="d-none d-md-table-cell"></th>
              <th class="">공정상태</th>
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
            <tr v-for="(item, index) in workOrderList" :key="index">
              <td>{{ item.ORDER_NO }}</td>
              <td>{{ formatDate(item.CREATE_DATE) }}</td>
              <td class="text-start">{{ item.WORKING_PART }}/{{ item.PRODUCT_FULLNAME }}/{{ item.PRODUCT_CODE }}</td>
            

              
              <td>{{ item.BUPUM_NO }}</td>
              <td>{{ item.COUNT }}</td>
              <td>{{ item.ORDER_STATE }}</td>
              <td>{{ item.STATE }}</td>
            


              <td class="d-none d-md-table-cell">{{ item.ACCOUNT_NAME }}</td>

              <td>
                <div v-if="item.ORDER_STATE === 0">
                  <div
                    class="btn btn-sm btn-danger me-1"
                    @click="onDelete(item.ORDER_NO)"
                  >
                    삭제
                  </div>
                  <div
                    class="btn btn-sm btn-warning text-white"
                    @click="onRegister(item)"
                  >
                    작업지시
                  </div>
                </div>
                <div v-else-if="item.STATE === 1">
                  <div class="btn btn-sm btn-success disabled">재단등록됨</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--  -->
    </div>

    <hr />
  </div>
</template>

<script setup lang="ts">
import type { WorkOrderModel } from "~~/server/model/workOrder";
import type { WORKING_PART_Model } from "~~/server/model/working_part";
import { useAccountStore } from "~/store/account";
// import { formatDate } from '~/utils/dateformatter';
import { useRoute } from "vue-router";
import { useWorkStore } from "~/store/works";
import * as XLSX from "xlsx";
import { useAuthStore } from '~/store/auth';
  const authStore = useAuthStore();
  const accountStore = useAuthStore();
// 페이지 메타데이터 설정
const pageTitle = ref('공정 등록');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정
const router = useRouter();
const form = reactive({
  CREATE_DATE: "",
  WORKING_PART: "",
  COUNT: "",
  REG_ACCOUNT:  parseInt(accountStore.user ? accountStore.user.NO : '')
  // REG_ACCOUNT: "",
});
const regUser  = ref("");
const WORKING_PART = ref<WORKING_PART_Model[]>([]);
const workOrderList = ref<WorkOrderModel[]>([]);

const isLoading = ref(true);

const fetchData = async () => {
  try {
    const result = await $fetch("/api/workOrder/getOrderWithAccount");
    console.log("result data", result.data);

    workOrderList.value = result.data as WorkOrderModel[];
   
    const WORKING_PART_Data = await $fetch("/api/working_part/getWORKING_PART");
   
    WORKING_PART.value = WORKING_PART_Data.data as WORKING_PART_Model[];
    console.log("workOrderList", workOrderList.value);
    // console.log("WORKING_PART", WORKING_PART.value);
    form.REG_ACCOUNT = parseInt(accountStore.user ? accountStore.user.NO : "");
    regUser.value = accountStore.user ? accountStore.user.NAME : "";

    isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};

const insertData = async () => {
  // 입력값 검증을 위한 플래그 설정
  let isValid = true;
  let alertMessage = "";

  //각 입력 필드에 대한 검증
  if (!form.CREATE_DATE.trim()) {
    isValid = false;
    alertMessage += "DATE를 입력해주세요.\n";
  }
  //
  // WORKING_PART 검증
  // 
  // WORKING_PART 검증
  if (!form.WORKING_PART || Object.keys(form.WORKING_PART).length === 0) {
    isValid = false;
    alertMessage += "품명을 선택해주세요.\n";
  }

  const countNumber = Number(form.COUNT);
  if (!form.COUNT || isNaN(countNumber) || countNumber <= 0) {
    isValid = false;
    alertMessage += "수량 을 입력해주세요.\n";
  }

  if (!form.REG_ACCOUNT && form.REG_ACCOUNT !== 0) {
    isValid = false;
    alertMessage += "등록자를 입력해주세요.\n";
  }
  // if (!form.REG_ACCOUNT.trim()) {
  //   isValid = false;
  //   alertMessage += '등록자를 를 입력해주세요.\n';
  // }

  try {
    await $fetch("/api/workOrder/registerOrder", {
      method: "POST",
      body: form,
    });
    alert("등록되었습니다.");
    // form 값 초기화
    form.CREATE_DATE = "";
    form.WORKING_PART = "";
    form.COUNT = "";
    form.REG_ACCOUNT = parseInt(accountStore.user ? accountStore.user.NO : '');
    await fetchData();
    // router.push('/blog');
  } catch {
    alert("RECORD error");
  }
};

onMounted(fetchData);
onMounted(() => {
      form.CREATE_DATE = new Date().toISOString().split('T')[0];
    });

const onRegister = async (item: any) => {
  // const store = useWorkStore();
  // store.addItem(item);
  const NO = item.ORDER_NO;
  console.log("NO", NO);
  router.push("/jaedan/register");
  // router.push({ path: "/jaedan/register", query: { param: NO } });
  // router.push({ path: '/jaedan/regjadan', query: { param: NO} });

  // store.addItem(item);
};

const onDelete = async (NO: number) => {
  const confirmation = confirm(NO + "선택한 공정을 정말 삭제하시겠습니까?");
  onReRegister(NO);
  if (!confirmation) {
    return; // 사용자가 취소를 선택하면 함수 실행을 중단
  }

  try {
    await $fetch("/api/workOrder/" + NO, {
      method: "DELETE",
    });
    alert(NO + "번  공정이 삭제되었습니다.");
    await fetchData();
  } catch (error) {
    alert("삭제 중 오류가 발생했습니다.");
  }
};

const onReRegister = async () => {
  const NO = parseInt(item.ORDER_NO);
  await $fetch(`/api/workOrder/updateState/${NO}`, {
    method: "POST",
    body: {
      NO: NO,
      STATE: 0, // 상태를 0로 설정
      UPDATE_ACCOUNT: regUser.value,
    },
  });
};
// excel 데이터 받기
const exportToExcel = () => {
  const data = workOrderList.value; // Assuming getInsertData contains the table data

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
</style>
