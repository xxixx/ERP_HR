<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <!-- <h5 class="text-center mt-2">원단 등록</h5> -->


    <div v-if="isLoading">
      <!-- Show loading indicator -->
      <p>Loading...</p>
    </div>
    <div v-else class="container chart_container"></div>

    <div class="album py-2 bg-body-tertiary"></div>
    <!-- workOrderList{{workOrderList}} -->
    <!-- wondanCode    {{ wondanCode}} -->
    <!-- {{ wondanInventory }} -->
    <div class="container">
      <!--  -->
      <form class="">
       

   

        <div class="">
        
            <div class="d-flex">
              <div class="col-3 ">
                        <label for="validationDefault01">날짜</label>
                        <input
                          v-model="form.REG_DATE"
                          type="DATE"
                          class="form-control border border-success"
                          id="validationDefault01"
                          placeholder="DATE"
                          required
                        />
                  </div>
                    <!--  -->
                    <div class="col-4 mx-2">
                        <label for="workingPartSelect">원단 분류</label>
                        <select
                          v-model="form.WONDAN_NAME"
                          id="workingPartSelect"
                          class="form-control border border-success"
                          required
                        >
                          <option value="" disabled selected>원단 종류를 선택하세요</option>
                          <option
                            v-for="wondan in wondanCode"
                            :value="wondan.WONDAN_NAME"
                            :key="wondan.WONDAN_NAME"
                          >
                            <span>{{ wondan.WONDAN_NAME }}</span>
                          </option>
                        </select>
                      </div>
                      <!--  -->
                      <div class="col-4">
                        <label for="validationDefault01">LOT_NO</label>
                        <input
                          v-model="form.LOT_NO"
                          type="text"
                          class="form-control border border-success"
                          id="validationDefault01"
                          placeholder="LOT_NO"
                          required
                        />
                      </div>
            
            </div>
              

                
                <div class = 'd-flex'>
                  <div class="col-3">
                            <label for="validationDefault01">LENGTH</label>
                            <input
                              v-model="form.LENGTH"
                              type="text"
                              class="form-control border border-success"
                              id="validationDefault01"
                              placeholder="LENGTH"
                              required
                            />
                          </div>
                          <div class="col-3 mx-2">
                            <label for="validationDefault01">REAL_LENGTH</label>
                            <input
                              v-model="form.REAL_LENGTH"
                              type="text"
                              class="form-control border border-success"
                              id="validationDefault01"
                              placeholder="REAL_LENGTH"
                              required
                            />
                          </div>
                          <div class="col-3 ">
                            <label for="validationDefault01">SUPPLIER</label>
                            <input
                              v-model="form.SUPPLIER"
                              type="text"
                              class="form-control border border-success"
                              id="validationDefault01"
                              placeholder="공급자"
                              required
                            />
                          </div>
                          <div class="col-3 ms-2">
                            <label class="text-white no-border">.</label>
                            <button
                              @click="insertData"
                              class="btn btn-warning btn-sm text-white instertBtn form-control w-50"
                              type="submit"
                            >
                              INSERT
                            </button>
                          </div>
                </div>
        
         

          <!--  -->
         

         
          <!--  -->
         
        </div>
        <div class="d-flex"></div>
      </form>
      <!--  -->
      <!-- <div class="d-flex mt-1 w-100 justify-content-center">
        <button
          @click="insertData"
          class="btn btn-warning btn-sm w-50 text-white mt-2"
          type="submit"
        >
          INSERT
        </button>
      </div> -->
    </div>

    <hr />
    <div class="container">
      <p class="text-end me-4">최근데이터 30개</p>

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
              <th class="">상태</th>

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
              <td>{{ item.NO }}</td>
              <td>{{ formatDate(item.REG_DATE) }}</td>

              <td>{{ item.WONDAN_NAME }}</td>
              <td>{{ item.LOT_NO }}</td>
              <td>{{ item.LENGTH }}</td>
              <td>{{ item.REAL_LENGTH }}</td>
              <td class="d-none d-md-table-cell">{{ item.SUPPLIER }}</td>
              <td class="d-none d-md-table-cell">{{ item.REG_ACCOUNT }}</td>
              <td>{{ item.STATE }}</td>

              <!--                  
                  <td>{{ item.COUNT }}</td>
                  <td>{{ item.STATE }}</td>
                  
                  <td class="d-none d-md-table-cell">{{ item.NAME }}</td> -->

              <td>
                <div>
                  <div   v-if="canDelete"
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

    <hr />
    <!-- Modal -->
    <!-- Modal for editing -->

    <!-- Modal -->

    <!-- <WondanEdit  v-if="isModalOpen" @close="isModalOpen = false" /> -->
    <!-- <ModalComponent :selectedItem ="selectedItem" :isModalOpen="isModalOpen" v-if="isModalOpen" @closeModal="isModalOpen = false"  @update-data="fetchData" /> -->
    <ModalComponent
      :selectedItem="selectedItem"
      :isModalOpen="isModalOpen"
      v-if="isModalOpen"
      @closeModal="isModalOpen = false"
      @update-data="fetchData"
    />
    <!-- <ModalComponent  v-if="isModalOpen" /> -->
  </div>
</template>

<script setup lang="ts">
import type { WondanModel } from "~~/server/model/wondan";
//   import type { WORKING_PART_Model } from '~~/server/model/working_part';

import { useAuthStore } from '~/store/auth';
  const accountStore = useAuthStore();
  // import { useAccountStore } from "~/store/account";
import { formatDate } from "~/utils/datefomatter";
import { useRoute } from "vue-router";
import { useWorkStore } from "~/store/works";
import * as XLSX from "xlsx";
// const accountStore = useAccountStore();
// 페이지 메타데이터 설정
const pageTitle = ref('원단등록');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정
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
  SUPPLIER: "",
  REG_ACCOUNT:  parseInt(accountStore.user ? accountStore.user.NO : ''),
  // REG_ACCOUNT: "",
  DEFECTIVE_LENGTH: 0,
  UPDATE_ACCOUNT: 0,
});
const regUser = ref("");
//   const WORKING_PART = ref<WORKING_PART_Model[]>([]);
const wondanCode = ref<WondanModel[]>([]);
const wondanInventory = ref<WondanModel[]>([]);
const filteredData = ref<WondanModel[]>([]);

const isLoading = ref(true);

const fetchData = async () => {
  try {
    const result = await $fetch<WondanModel[]>("/api/wondan/getWondanCode");
    console.log("result data", result);

    wondanCode.value = result.data;

    form.REG_ACCOUNT = parseInt(accountStore.user ? accountStore.user.NO : "");
    regUser.value = accountStore.user ? accountStore.user.NAME : "";

    const regWondan = await $fetch("/api/wondan/getRecord");
    console.log("regWondan", regWondan.data);
    wondanInventory.value = regWondan.data.data;

    isLoading.value = false; // Set loading state to false when data is fetched
    //데이터 갯수를 제한
    filteredData.value = wondanInventory.value.slice(0, 25); // 30개로 제한
  } catch {
    alert("Fetch error");
  }
};

const pagedData = computed(() => {
  return filteredData.value;
});

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
  if (!form.SUPPLIER.trim()) {
    isValid = false;
    alertMessage += "SUPPLIER 입력 해주세요.\n";
  }
  //     if (!form.REG_ACCOUNT && form.REG_ACCOUNT !== 0) {
  //     isValid = false;
  //     alertMessage += '등록자를 입력해주세요.\n';
  //   }

  // if (!form.REG_ACCOUNT.trim()) {
  //   isValid = false;
  //   alertMessage += '등록자를 를 입력해주세요.\n';
  // }
  form.UPDATE_ACCOUNT = parseInt(accountStore.user ? accountStore.user.NO : "");
  console.log("form.UPDATE_ACCOUNT", form.UPDATE_ACCOUNT);
  // 검증 실패 시 알림 표시 및 함수 종료
  if (!isValid) {
    alert(alertMessage);
    return;
  }

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

onMounted(fetchData);
onMounted(() => {
      form.REG_DATE = new Date().toISOString().split('T')[0];
    });
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
.no-border {
  border: none;
  
}
.instertBtn {
  font-size: 1rem;
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
  .instertBtn {
  font-size: .7rem;
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
