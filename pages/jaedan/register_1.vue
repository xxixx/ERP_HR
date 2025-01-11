<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <!-- <h5 class="text-center mt-2">재단 작업 등록</h5> -->
    <!-- <hr /> -->

    <!-- jaedanRecord{{ jaedanRecord }} -->
    <!-- getworkOrder{{ getworkOrder }} -->
    <!-- selectedWondanName {{ selectedWondanName }} -->
    <div v-if="isLoading">
      <!-- Show loading indicator -->
      <p>Loading...</p>
    </div>
    <div v-else class="container mt-2">
      <div class="table-responsive">
      <P class="border bg-secondary text-white  p-2">공정 등록 리스트(작업지시서))</P>
      <table class="table table-sm text-center">
        <thead>
          <tr> 
          <!-- <td  colspan='8'><h6 class="text-center">공정 목록</h6></td> -->
          
         
        </tr>
          <tr>
            <!-- <th>DATE</th> -->
            <th class="">NO</th>

            <th>공정번호</th>
            <th>등록일</th>

            <th>공정명</th>
            <th>COUNT</th>
            <th>원단명</th>

           
            <th class="">진행상태</th>
            <th class="d-none d-md-table-cell">등록자</th>

            <th>
              <div class="btn btn-sm btn-success sm-btn" @click="exportToExcel">
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
          <tr v-for="(item, index) in getworkOrder" :key="index">
            <td>{{ item.NO }}</td>
            <td>{{ item.ORDER_NO }}</td>
            <td>{{ formatDate(item.CREATE_DATE) }}</td>

            <td>{{ item.PRODUCT_FULLNAME }}{{ item.PRODUCT_CODE }}</td>
            <td>{{ item.COUNT }}</td>
         
            
            <td>{{ item.WONDAN_NAME }}</td>

            <td>{{ item.STATE }}</td>

            <td class="d-none d-md-table-cell">{{ item.ACCOUNT_NAME }}</td>

            <td>
              <div v-if="item.STATE === 0">
                <div
                  class="btn btn-sm btn-danger me-1"
                  @click="onDelete(item.NO)"
                >
                  삭제
                </div>
                <div
                  class="btn btn-sm btn-warning text-white"
                  @click="upJadanState(item)"
                >
                  작업지시서 수행
                </div>
              </div>
              <div v-else-if="item.STATE === 1">
                <div class="btn btn-sm btn-success disabled">재단수행</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
<!--  -->
    
<div  class="container mt-2">
      <div class="table-responsive">
      <P class="border bg-secondary text-white  p-2">재단진행 목록</P>
      <table class="table table-sm text-center">
        <thead>
          <tr> 
          <!-- <td  colspan='8'><h6 class="text-center">공정 목록</h6></td> -->
          
         
        </tr>
          <tr>
            <!-- <th>DATE</th> -->
            <th class="">NO</th>

            <th>공정번호</th>
            <th>등록일</th>

            <th>공정명</th>
            <th>COUNT</th>
            <th>원단명</th>

           
            <th class="">진행상태</th>
            <th class="d-none d-md-table-cell">재단상태</th>
            <th class="d-none d-md-table-cell">작업자</th>

            <th>
             
            </th>
          
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in getOrderStateUp" :key="index">
            <td>{{ item.NO }}</td>
            <td>{{ item.ORDER_NO }}</td>
            <td>{{ formatDate(item.CREATE_DATE) }}</td>

            <td>{{ item.PRODUCT_FULLNAME }}{{ item.PRODUCT_CODE }}</td>
            <td>{{ item.COUNT }}</td>
         
            
            <td>{{ item.WONDAN_NAME }}</td>

            <td>{{ item.JAEDAN_STATE }}</td>
            <td> <span :class="{'text-primary': item.JAEDAN_STATE === 1}">
                  {{ item.JAEDAN_STATE === 1 ? ' 재단 진행중' : item.JAEDAN_STATE === 0 ? '대기' : item.JAEDAN_STATE }}
                 </span>
            </td>

            <td class="d-none d-md-table-cell">{{ item.ACCOUNT_NAME }}</td>

            <td>
              <div v-if="item.JAEDAN_STATE === 1">
                <div
                  class="btn btn-sm btn-danger me-1"
                  @click="jadanCancel(item.ORDER_NO)"
                >
                  취소
                </div>
                <div
                  class="btn btn-sm btn-warning text-white"
                  @click="onJaedanRegister(item)"
                >
                  완료등록
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
    </div>
    
    <!--  -->
    <div class="album py-5 bg-body-tertiary"></div>

   
    <!--  -->
    <h1></h1>
    <!-- routeParams{{ routeParams }} -->
    <!-- regUser{{ regUserNO }} -->
  <!-- REG_NO{{ REG_NO }} -->
  
  <!-- selectOrder{{ selectOrder }} -->
 
  <!-- jaedanRecord {{ jaedanRecord }} -->
  
    <!-- WORKING_PART{{ WORKING_PART }} -->
 
    <!-- workOrderList{{ workOrderList }} -->
   
    <!-- useableWondan{{ useableWondan }} -->
   
    <!-- filteredWondan{{ filteredWondan }} -->
   
    <!-- wondanCode{{ wondanCode }} -->

    <!-- {{ accountStore.user }} -->
    <!-- selectOrder{{ selectOrder }} -->
    <!-- wondanStore.selectedWondan {{ wondanStore.selectedWondan }} -->
    <!-- filteredWondan{{ filteredWondan }} -->

    <!-- selectedWondanName{{ selectedWondanName }} -->

    <!-- {{ wondanStore.selectedWondan.NO }} -->
    <!-- selectedWondanName{{ selectedWondanName }} -->
    <!-- {{ wondanStore.selectedWondan.LOT_NO }} -->
    <!-- selectOrder{{ selectOrder }} -->

    <!-- {{ useableWondan }} -->
    <div v-if="showWondan">
      <!-- getworkOrder{{ getworkOrder }} -->
      <h6 class="text-center">가용 원단</h6>
      <div class="table-responsive text-center d-flex justify-content-center">
        <table class="table table-sm text-center">
          <thead>
            <tr class="wondan-tr">
              <th>등록일</th>
              <th>LOT NO</th>
              <th>원단명</th>
              <th>길이</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wondan in filteredWondan">
              <td>{{ wondan.REG_DATE }}</td>
              <td>{{ wondan.LOT_NO }}</td>
              <td>{{ wondan.WONDAN_NAME }}</td>
              <td>{{ wondan.REAL_LENGTH }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--  -->
    </div>
   
    <!-- filteredWondan{{ filteredWondan }} -->
    <!-- wondanCode{{ wondanCode }} -->

    <!-- workOrderList{{workOrderList}} -->
    <!-- WORKING_PART    {{ WORKING_PART}} -->
    <div v-if="showRegForm" class="container">
      <!--  -->
      <form class="">
        <div class="d-flex justify-content-between">
          <div class="col-3">
            <label for="validationDefault01">등록일</label>
            <input
              v-model="form.CREATE_DATE"
              type="date"
              class="form-control border border-success"
              id="validationDefault01"
              placeholder="등록자"
              required
            />
          </div>
          <div class="col"></div>
          <div class="col-3">
            <label for="validationDefault01">작업일</label>
            <input
              v-model="form.WORK_DATE"
              type="date"
              class="form-control border border-success"
              id="validationDefault01"
              placeholder="등록자"
              required
            />
          </div>
        </div>

        <hr />

        <div class="d-flex flex-wrap border_bottom py-1">
          <!-- {{ product }} -->

          <div
            class="col-12 col-md-12 col-lg-3 border_bottom text-center text-lg-start mb-3 bg-lg-white p-1 p-lg-0"
          >
            <label for="validationDefault01">공정등록번호</label>

            <span>
              <!-- <img v-if="imageSrc" :src="imageSrc" alt="jaedan" style="width: 20px;"> -->
            </span>
            <!--  -->
            <!-- <span class="badge bg-warning text-white rounded-circle reg-no-badge"> -->
            <span
              :class="[
                'badge bg-warning text-white rounded-circle reg-no-badge',
                { 'reg-no-badge-reg': REG_STATE?.toString() === '1' },
              ]"
              style="font-size: 10px"
            >
              <span class="flex-center" style="font-size: 0.9em">{{
                REG_NO
              }}</span>
            </span>
            <!--  -->

            <!-- <span class="mx-3">
              {{
                REG_CREATE_DATE ? formatDate(REG_CREATE_DATE) : "날짜 없음"
              }}
              /
            </span> -->
            <span class="mx-3"> {{ PRODUCT_FULLNAME }} / </span>
            <div class="text-center">

              <span> {{ ProductCode }} </span>
            </div>
            <!-- <span>{{ REG_COUNT }} </span> -->
          </div>

          <div class="col-4 col-lg-3">
            <label for="validationDefault01">원단번호</label>

            <select
              v-model="selectedWondanName"
              id="workingPartSelect"
              class="form-control border border-success"
              required
              @change="updateSelectedWondan"
            >
              <option value="" disabled>원단 종류를 선택하세요</option>
              <option
                v-for="wondan in filteredWondan"
                :value="wondan.NO"
                :key="wondan.NO"
              >
                <span>{{ wondan.REG_DATE }}</span
                >/ <span>{{ wondan.WONDAN_NAME }}</span
                >/
                <span>{{ wondan.LOT_NO }}</span>
              </option>
            </select>
            <!-- <input v-model="form.WONDAN_STORE" type="text" class="form-control border border-success" id="validationDefault01" placeholder="WONDAN_STORE" required> -->
          </div>

          <!-- <div class="col-4 col-lg">
                  <label for="validationDefault01">LOT</label>
                
                  <input v-model="form.LOT" type="text" class="form-control border border-success" id="validationDefault01"  placeholder="COUNT" required>
            
                </div> -->

          <!--  -->
          <div class="col-2 col-lg-1 ">
            <label for="validationDefault01">원단</label>
            <input
              v-model="form.WONDAN_MANAGER_NO"
              type="text"
              class="form-control border border-success"
              id="validationDefault01"
              placeholder="원단관리번호"
              required
            />
          </div>
          <div class="col-3 col-lg-1">
            <label for="validationDefault01">연단매수</label>

            <input
              v-model="form.Y_COUNT"
              type="text"
              class="form-control border border-success"
              id="validationDefault01"
              placeholder="연단번호"
              required
            />
          </div>
          <div class="col-2 col-lg-1">
            <label for="validationDefault01">MARK</label>

            <input
              v-model="form.MARKS"
              type="text"
              class="form-control border border-success"
              id="validationDefault01"
              placeholder="MARK"
              required
            />
          </div>
          <div class="col">
            <label for="validationDefault01">수량</label>

            <input
              v-model="form.COUNT"
              type="text"
              class="form-control border border-success"
              id="validationDefault01"
              placeholder="수량"
              required
            />
          </div>
          <div class="col-2 col-lg-1">
            <label for="validationDefault01">불량</label>

            <input
              v-model="form.DEFECTIVE"
              type="text"
              class="form-control border border-success"
              id="validationDefault01"
              placeholder="불량"
              required
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
          재단 작업 저장
        </button>
      </div>
    </div>

   
    <div  class="container">
      <p class="text-end me-4"></p>
      <P class="border bg-secondary text-white  p-2">재단 등록 리스트</P>
      <!--  -->
      <div class="table-responsive">
        <table class="table table-sm text-center">
          <thead>
            <tr>
              <!-- <th>DATE</th> -->
              <th class="">등록번호</th>

              <th>등록일</th>
              <!-- <th>등록번호</th> -->
              <th>공정명</th>

              <th>원단관리</th>
              <th>LOT</th>
              <th>연단수</th>
              <th>마크수</th>
              <th>재단수</th>

              <th class="">불량</th>
              <th class="">상태</th>
              <th class="">작업일</th>
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
            <tr v-for="(item, index) in jaedanRecord" :key="index">
              <!-- <td>{{ item.NO }}</td> -->
              <td>{{ item.WORK_ORDER_NO }}</td>
              <td>{{ formatDate(item.CREATE_DATE) }}</td>

              <td>{{ item.PRODUCT_FULLNAME }}/{{ item.ProductCode }}</td>
              <td>{{ item.WONDAN_MANAGER_NO }}</td>
              <td>{{ item.LOT }}</td>
              <td>{{ item.Y_COUNT }}</td>

              <td>{{ item.MARKS }}</td>
              <td>{{ item.COUNT }}</td>
              <td>{{ item.DEFECTIVE }}</td>

              <td>{{ item.STATE }}</td>
              <td>{{ formatDate(item.WORK_DATE) }}</td>

              <td class="d-none d-md-table-cell">
                {{ item.REG_ACCOUNT_NAME }}
              </td>

              <td>
                <div v-if="item.STATE === 0">
                  
                  <div
                      class="btn btn-sm btn-warning text-white"
                 @click="onFinish(item)"
                  >
                    재단 완료  재단물 이동
                  </div>
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
import { ref, reactive, computed, watch, onMounted } from "vue";
import type { WorkOrderModel } from "~~/server/model/workOrder";
import type { WORKING_PART_Model } from "~~/server/model/working_part";
import type { JaedanModel } from "~~/server/model/jaedan";
import type { WondanModel } from "~~/server/model/wondan";
import { formatDate } from "../../utils/datefomatter";
import { useRoute } from "vue-router";
import { useWorkStore } from "~/store/works";
import { useAccountStore } from "~/store/account";
import { useWondanStore } from "~/store/wondan";
import { useAuthStore } from '~/store/auth';
  const authStore = useAuthStore();
  const accountStore = useAuthStore();
const wondanStore = useWondanStore();
import * as XLSX from "xlsx";
import { defineComponent } from 'vue'
// 페이지 메타데이터 설정
const pageTitle = ref('재단 등록');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value, // 페이지 제목 설정
  
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
// 페이지 메타데이터 설정
defineComponent({
  ssr: false
})
import { useAsyncData } from 'nuxt/app'; // Nuxt 3에서 제공되는 useAsyncData 훅

// URL의 params를 가져와서 API 호출
// const { data, error } = await useAsyncData('fetch-data', async () => {
//   try {
//     const response = await getworkOrderList(); // 함수 호출 시 괄호 추가
//     return response;
//   } catch (err) {
//     console.error('Failed to fetch data:', err);
//     throw err;
//   }
// });

const route = useRoute();
const router = useRouter();
// const accountStore = useAccountStore();

// const routeParams = route.query.param;
const ORDER_NO = ref<number | undefined>(undefined);
const REG_NO = ref<number | undefined>(undefined);
const form = reactive({
  WORK_ORDER_NO: REG_NO.value,
  WONDAN_STORE: "",
  WONDAN_MANAGER_NO: "",
  LOT: "",
  Y_COUNT: "",
  MARKS: "",
  COUNT: "",
  DEFECTIVE: 0,
  CREATE_DATE: "",
  WORK_DATE: "",
  // REG_ACCOUNT: parseInt(accountStore.user ?  accountStore.user.NO : ''),
  REG_ACCOUNT: parseInt(accountStore.user ? accountStore.user.NO : ''),
  PROCESSCODE: "",
});
watch(
  [() => form.Y_COUNT, () => form.MARKS],
  ([newYCount, newMarks]) => {
    if (newYCount && newMarks) {
      form.COUNT = (Number(newYCount) * Number(newMarks)).toString();
    } else {
      form.COUNT = "";
    }
  }
);
const jaedanRecord = ref<JaedanModel[]>([]);
const jaedanItem = ref<JaedanModel[]>([]);
const WORKING_PART = ref<WORKING_PART_Model[]>([]);
const workOrderList = ref<WorkOrderModel[]>([]);
const wondanCode = ref([]);
const useableWondan = ref<WondanModel[]>([]);
const selectOrder = ref<number | string | undefined>(undefined);

const REG_JAEDAN_PART_NAME = ref<string | undefined>(undefined);

const REG_CREATE_DATE = ref<WorkOrderModel | undefined>(undefined);

const REG_COUNT = ref<number | undefined>(undefined);
const REG_STATE = ref<number | undefined>(undefined);
const PRODUCT_FULLNAME = ref<number | undefined>(undefined);
const ProductCode = ref<number | undefined>(undefined);

const imageSrc = ref("");
// const selectOrder = ref<any>();
const regUser = ref("");
const regUserNO = ref("");
const isLoading = ref(true);
const showWondan = ref(false);
const showRegForm = ref(false);

// 등록리스트 가져오기
const getworkOrder = ref<WorkOrderModel[]>([]);

const getworkOrderList = async () => {
  try {
    const result = await $fetch("/api/workOrder/getOrderWithAccount");
    console.log("result data", result.data);

    form.REG_ACCOUNT = parseInt(accountStore.user ? accountStore.user.NO : "");
    getworkOrder.value = result.data as WorkOrderModel[];

      const WORKING_PART_Data = await $fetch('/api/working_part/getWORKING_PART');
      WORKING_PART.value = WORKING_PART_Data.data as WORKING_PART_Model[];
    //   console.log("workOrderList",getworkOrder.value)
    // console.log("WORKING_PART",WORKING_PART.value)
    form.REG_ACCOUNT =  parseInt(accountStore.user ?  accountStore.user.NO : '');
    // regUser.value = accountStore.user ?  accountStore.user.NAME : ''

    // isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};
const getOrderStateUp = ref<WorkOrderModel[]>([]);
const getworkOrderStateUp = async () => {
  try {
    const result = await $fetch("/api/workOrder/getOrderWithAccountStateUp");
    console.log("result data", result.data);

    form.REG_ACCOUNT = parseInt(accountStore.user ? accountStore.user.NO : "");
    getOrderStateUp.value = result.data as WorkOrderModel[];

      const WORKING_PART_Data = await $fetch('/api/working_part/getWORKING_PART');
      WORKING_PART.value = WORKING_PART_Data.data as WORKING_PART_Model[];
    //   console.log("workOrderList",getworkOrder.value)
    // console.log("WORKING_PART",WORKING_PART.value)
    form.REG_ACCOUNT =  parseInt(accountStore.user ?  accountStore.user.NO : '');
    // regUser.value = accountStore.user ?  accountStore.user.NAME : ''

    // isLoading.value = false; // Set loading state to false when data is fetched
  } catch {
    alert("Fetch error");
  }
};

// getworkOrder의 변화를 감시
watch(getworkOrder, (newVal, oldVal) => {
  console.log('getworkOrder가 변경되었습니다.');
  console.log('이전 값:', oldVal);
  console.log('새로운 값:', newVal);
  
  // 추가적인 처리 로직
  // 예: 변경된 데이터를 서버에 전송하거나 다른 상태 변경 작업을 실행
});
const fetchData = async () => {
  try {
    const NO = ORDER_NO.value;
    // const NO = route.query.param;
    console.log("route.query.param", NO);
    const getOrder = await $fetch(`/api/workOrder/getOrder/${NO}`);
    console.log("getOrder", getOrder.data);
    const selectOrder1 = ref<WorkOrderModel | undefined>(undefined);
    selectOrder1.value = getOrder.data as WorkOrderModel | undefined;
    selectOrder.value = selectOrder1.value;
    if (selectOrder.value) {
      REG_JAEDAN_PART_NAME.value = selectOrder.value.JAEDAN_PART_NAME;
      REG_CREATE_DATE.value = selectOrder.value.CREATE_DATE;
      REG_NO.value = selectOrder.value.NO;
      form.WORK_ORDER_NO = REG_NO.value;
      REG_COUNT.value = selectOrder.value.COUNT;
      REG_STATE.value = selectOrder.value.STATE;
      PRODUCT_FULLNAME.value = selectOrder.value.PRODUCT_FULLNAME;
      ProductCode.value = selectOrder.value.ProductCode;

      const useableWondanList = await $fetch("/api/wondan/getUseable");
      useableWondan.value = useableWondanList.data;
      wondanCode.value = useableWondanList.data;
      showWondan.value = false;
    } else {
      console.log("selectOrder is undefined");
    }

    const jaedanList = await $fetch("/api/jaedan/getRecord10");
    jaedanRecord.value = jaedanList.data as JaedanModel[];

    const result = await $fetch("/api/workOrder/getOrder");
    console.log("resut data", result.data);
    workOrderList.value = result.data as WorkOrderModel[];
    console.log("workOrderList", workOrderList.value);
    
    const WORKING_PART_Data = await $fetch("/api/working_part/getWORKING_PART");
    WORKING_PART.value = WORKING_PART_Data.data as WORKING_PART_Model[];
    console.log("workOrderList", WORKING_PART.value);
    // regUser.value = accountStore.user ? accountStore.user.NAME : "";
    regUserNO.value = accountStore.user ? accountStore.user.NO : "";
    isLoading.value = false;
  } catch {
    alert("Fetch workOrderList error");
  }
};

// const fetchUseableWondan = async () => {
//   try {
//     const useableWondanList = await $fetch('/api/wondan/getUseable');
//     useableWondan.value = useableWondanList.data;
//   } catch {
//     alert('Fetch error');
//   }
// };

const insertData = async () => {
  // 입력값 검증을 위한 플래그 설정
  let isValid = true;
  let alertMessage = "";

  if (!form.CREATE_DATE.trim()) {
    isValid = false;
    alertMessage += "CREATE_DATE를 입력해주세요.\n";
  }
  // if (!form.WONDAN_STORE.trim()) {
  //   isValid = false;
  //   alertMessage += 'WONDAN_STORE를 입력해주세요.\n';
  // }
  if (!form.WONDAN_MANAGER_NO.trim()) {
    isValid = false;
    alertMessage += "WONDAN_MANAGER_NO를 입력해주세요.\n";
  }
  // if (!form.LOT.trim()) {
  //   isValid = false;
  //   alertMessage += 'LOT를 입력해주세요.\n';
  // }

  const Y_COUNT_Number = Number(form.Y_COUNT);
  if (isNaN(Y_COUNT_Number) || Y_COUNT_Number <= 0) {
    isValid = false;
    alertMessage += "유효한 Y_COUNT를 입력해주세요.\n";
  }

  const MARKS_Number = Number(form.MARKS);
  if (isNaN(MARKS_Number) || MARKS_Number <= 0) {
    isValid = false;
    alertMessage += "유효한 MARKS를 입력해주세요.\n";
  }

  const countNumber = Number(form.COUNT);
  if (isNaN(countNumber) || countNumber <= 0) {
    isValid = false;
    alertMessage += "유효한 COUNT를 입력해주세요.\n";
  }

  const DEFECTIVE_Number = Number(form.DEFECTIVE);
  if (isNaN(DEFECTIVE_Number) || DEFECTIVE_Number < 0) {
    // 불량 수는 0 이상이어야 함
    isValid = false;
    alertMessage += "유효한 DEFECTIVE를 입력해주세요.\n";
  }

  if (!form.REG_ACCOUNT && form.REG_ACCOUNT !== 0) {
    isValid = false;
    alertMessage += "등록자를 입력해주세요.\n";
  }
  if (!isValid) {
    alert(alertMessage);
    return;
  }

  try {
    await $fetch("/api/jaedan/register", {
      method: "POST",
      body: form,
    });
    alert("등록되었습니다.");
    ////////////////////////////////////////////////////////

    const NO = REG_NO.value;
    console.log("NO", NO);
    
 
    upJadanStateFinish();
    alert("원단 상태변경");
    

    // onRegister();
    
    // REG_NO의 값을 사용하여 STATE 업데이트 요청
    // if (REG_NO.value !== undefined) {
    //   try {
    //     await $fetch("/api/workOrder/updateState", {
    //       method: "POST",
    //       body: { NO: REG_NO.value }, // REG_NO의 값을 사용합니다.
    //     });
    //     console.log("STATE 컬럼이 0으로 업데이트되었습니다.");
    //   } catch (error) {
    //     console.error("STATE 업데이트 중 오류 발생:", error);
    //   }
    // } else {
    //   console.error("REG_NO가 정의되지 않았습니다.");
    // }
    showWondan.value= false
    showRegForm.value= false
    ///////////////////////////////////////////////////////
    await fetchData();
    await getworkOrderList();
    await getworkOrderStateUp();
    } catch {
    alert("RECORD error");
  }
};

const onJaedanRegister = async (item: any) => {
  // const NO = item.ACCOUNT_NAME;
  const NO = item.ORDER_NO;
  console.log("NO", NO);
  ORDER_NO.value = NO;
  // router.push({ path: "/jaedan/register", query: { param: NO } });
  // route.query.param = NO;
  fetchData();
  showRegForm.value = true;
  showWondan.value = false;
};
const upJadanState = async (item) => {
    const REG_NO = item.ORDER_NO;
    console.log("REG_NO", REG_NO);
  await $fetch(`/api/workOrder/updateStateJadan/${REG_NO}`, {
    method: "POST",
    body: {
      NO: REG_NO,
      JAEDAN_STATE: 1, // 상태를 1로 설정
      UPDATE_ACCOUNT: regUserNO.value,
    },
  });
  await $fetch(`/api/workOrder/updateState/${REG_NO}`, {
      method: "POST",
      body: {
        NO: REG_NO,
        STATE: 1,
        UPDATE_ACCOUNT: regUserNO.value,
      },
    });
    await getworkOrderList();  
    await getworkOrderStateUp();
  // onRegister(item);
  fetchData();
};
const upJadanStateFinish = async () => {
  try {
    // First update the jaedan state
    await $fetch(`/api/workOrder/updateStateJadan/${REG_NO.value}`, {
      method: "POST",
      body: {
        NO: REG_NO.value,
        JAEDAN_STATE: 2,
        UPDATE_ACCOUNT: regUserNO.value,
      },
    });

    // Then update the work order state directly without using onRegister
    await $fetch(`/api/workOrder/updateState/${REG_NO.value}`, {
      method: "POST",
      body: {
        NO: REG_NO.value,
        STATE: 1,
        UPDATE_ACCOUNT: regUserNO.value,
      },
    });

    // Update wondan state if selectedWondanName exists
    if (selectedWondanName.value) {
      await $fetch(`/api/wondan/updateState/${selectedWondanName.value}`, {
        method: "POST",
        body: {
          NO: selectedWondanName.value,
          STATE: 1,
          UPDATE_ACCOUNT: regUserNO.value,
        },
      });
    }

    await fetchData();
  } catch (error) {
    console.error('Error in upJadanStateFinish:', error);
    alert('상태 업데이트 중 오류가 발생했습니다.');
  }
};
const onJaedan = async (item) => {
  const JaedanNo = item.NO;
  console.log("JaedanNo", JaedanNo);
  await $fetch(`/api/jaedan/updateState/${JaedanNo}`, {
    method: "POST",
    body: {
      NO: JaedanNo,
      STATE: 1, // 상태를 1로 설정
      UPDATE_ACCOUNT: regUserNO.value,
    },
  });
  fetchData();
};
// const onFinish = async (item) => {
//   const JaedanNo = item.NO;
//   // const WORK_DATE = formatDate(item.WORK_DATE)
//   // WORK_DATE 형식을 YYYYMMDD로 변환
//   const workDate = new Date(item.WORK_DATE);
//   const year = workDate.getFullYear();
//   const month = String(workDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
//   const day = String(workDate.getDate()).padStart(2, "0");
//   // PROCESSCODE 생성
//   // const PROCESSCODE = `${item.JAEDAN_PART_NAME}-${JaedanNo}-${item.WORK_DATE}`;
//   // const PROCESSCODE = `${item.JAEDAN_PART_NAME.replace(/\s/g, '')}${item.NO}${WORK_DATE}`;
//   const seqName = `PROCESS_${year}`;
//         const sequence = await $fetch(`/api/sequence/${seqName}`);
        
//         if (!sequence.success) {
//             throw new Error('시퀀스 생성 실패');
//         }

//         const paddedSequence = String(sequence.data.currentValue).padStart(4, '0');
//         const PROCESSCODE = `${item.ProductCode.replace(/\s/g, "")}${year}${month}${day}${paddedSequence}`;

//   // const PROCESSCODE = `${item.ProductCode.replace(/\s/g, "")}${year}${month}${day}${item.NO}`;
//   console.log("PROCESSCODE", PROCESSCODE);
//   console.log("JaedanNo", JaedanNo);
//   await $fetch(`/api/jaedan/updateState/${JaedanNo}`, {
//     method: "POST",
//     body: {
//       NO: JaedanNo,
//       STATE: 2, // 상태를 1로 설정
//       UPDATE_ACCOUNT: regUserNO.value,
//       PROCESSCODE: PROCESSCODE, // PROCESSCODE 추가
//     },
//   });
//   fetchData();
//   showWondan.value = true;
// };

const onFinish = async (item) => {
  try {
    // 입력값 검증
    if (!item || !item.NO || !item.WORK_DATE || !item.ProductCode) {
      throw new Error('필수 데이터가 누락되었습니다.');
    }

    const JaedanNo = item.NO;
    
    // 날짜 처리
    const workDate = new Date(item.WORK_DATE);
    if (isNaN(workDate.getTime())) {
      throw new Error('잘못된 날짜 형식입니다.');
    }

    const year = workDate.getFullYear();
    const month = String(workDate.getMonth() + 1).padStart(2, "0");
    const day = String(workDate.getDate()).padStart(2, "0");

    // 시퀀스 생성
    const seqName = `PROCESS_${year}`;
    const sequence = await $fetch(`/api/sequence/${seqName}`);
    
    if (!sequence || !sequence.success) {
      
      throw new Error('시퀀스 생성에 실패했습니다.');
    }

    // 프로세스 코드 생성
    const paddedSequence = String(sequence.data.currentValue).padStart(4, '0');
    const PROCESSCODE = `${item.ProductCode.replace(/\s/g, "")}${year}${month}${day}${paddedSequence}`;
    
    console.log("PROCESSCODE:", PROCESSCODE);
    console.log("JaedanNo:", JaedanNo);

    // 상태 업데이트
    const updateResponse = await $fetch(`/api/jaedan/updateState/${JaedanNo}`, {
      method: "POST",
      body: {
        NO: JaedanNo,
        STATE: 2,
        UPDATE_ACCOUNT: regUserNO.value,
        PROCESSCODE: PROCESSCODE,
      },
    });

    if (updateResponse === undefined) {
      throw new Error('상태 업데이트에 실패했습니다.');
    }

    // 데이터 새로고침 및 UI 업데이트
    await fetchData();
    showWondan.value = true;

  } catch (error) {
    console.error('처리 중 오류 발생:', error);
    alert(error.message || '처리 중 오류가 발생했습니다.');
  }
};

const selectedWondanName = ref("");

const updateSelectedWondan = () => {
  console.log("selectedWondanName", selectedWondanName.value);
  wondanStore.setWondan(selectedWondanName.value);
  form.WONDAN_STORE = selectedWondanName.value;
  const selectedWondan = filteredWondan.value.find(
    (wondan) => wondan.NO === selectedWondanName.value,
  );
  console.log("selectedWondan", selectedWondan);
  if (selectedWondan) {
    console.log("selectedWondan", selectedWondan);
    wondanStore.setWondan(selectedWondan);
    form.LOT = selectedWondan.LOT_NO || ""; // form.LOT에 selectedWondan.LOT_NO 값을 할당
  }
};

// const filteredWondan = computed(() => {
//   if (!selectOrder.value) return [];
//   return useableWondan.value.filter((wondan) =>
//     wondan.NO.includes(selectOrder.value.WONDAN_NAME),
//   );
// });
// filteredWondan을 computed로 정의하여 조건에 맞는 항목만 필터링
// const filteredWondan = computed(() => {
//   if (!selectOrder.value) return [];
//   return useableWondan.value.filter((wondan) =>
//     wondan.NO.includes(selectOrder.value.W_NO),
//   );
// });
const filteredWondan = computed(() => {
  return useableWondan.value.filter(wondan => wondan.WondanName === selectOrder.value.W_NAME);
});
// const updateSelectedWondan = () => {
//   const selectedWondans = useableWondan.value.filter(wondan => wondan.WONDAN_NAME === form.WONDAN_NAME);
//   console.log("selectedWondans", selectedWondans);
//   if (selectedWondans.length > 0) {
//     wondanStore.setWondan(selectedWondans[0]); // 첫 번째 일치하는 항목을 저장
//   }
// };

watch(() => form.WONDAN_STORE, updateSelectedWondan);
onMounted(async () => {
  // await fetchData();
  await getworkOrderList();
  await getworkOrderStateUp();

  // Set the selected WONDAN_STORE based on selectOrder.WONDAN_NAME
  if (selectOrder.value) {
    form.WONDAN_STORE = selectedWondanName.value;
    console.log("form.WONDAN_STORE", form.WONDAN_STORE);
  }
  imageSrc.value = "/images/jaedan.png";
});
// const filteredWondan = computed(() => {
//   if (!selectOrder.value) return [];
//   return useableWondan.value.filter(wondan => wondan.WONDAN_NAME.includes(selectOrder.value.WONDAN_NAME));
// });

// const onDelete = async (NO: number) => {
//   try {
//     console.log("no: "+NO)
//     await $fetch('/api/workOrder/' + NO, {
//       method: 'DELETE'
//     });
// alert(" "+NO+"번 삭제될.");
//     await fetchData();
//   } catch {
//     alert('Delete error');
//   }
// };
onMounted(() => {
      form.CREATE_DATE = new Date().toISOString().split('T')[0];
      form.WORK_DATE = new Date().toISOString().split('T')[0];
    });
onMounted(fetchData);
   
const onReRegister = async (item) => {
  const workNo = item.WORK_ORDER_NO;
  console.log("workNo", workNo);
  await $fetch(`/api/workOrder/updateState/{${workNo}`, {
    method: "POST",
    body: {
      NO: workNo,
      STATE: 0, // 상태를 0로 설정
      UPDATE_ACCOUNT: regUserNO.value,
    },
  });
  const wondanNo = item.WONDAN_MANAGER_NO;
  await $fetch(`/api/wondan/updateState/${wondanNo}`, {
    method: "POST",
    body: {
      NO: wondanNo,
      STATE: 0, // 상태를 0로 설정
      UPDATE_ACCOUNT: regUserNO.value,
    },
  });
   // route.query.param 초기화 (리다이렉트 방식)
   router.push({
    path: router.currentRoute.value.path,  // 현재 경로 유지
    query: {},  // 쿼리 파라미터 초기화
  });
 
  
};

const jadanCancel = async (item) => {
  const confirmation = confirm(item + "번 재단등록을 취소 하시겠습니까?");
  console.log("no: " + item);

  if (!confirmation) {
    return; // 사용자가 취소를 선택하면 함수 실행을 중단
  }

  try {
    const workNo = item;
    console.log("workNo", workNo);
    await $fetch(`/api/workOrder/updateState/{${workNo}`, {
      method: "POST",
      body: {
        NO: workNo,
        STATE: 0, // 상태를 0로 설정
        UPDATE_ACCOUNT: regUserNO.value,
      },
    });
    await $fetch(`/api/workOrder/updateStateJadan/${workNo}`, {
    method: "POST",
    body: {
      NO: workNo,
      JAEDAN_STATE: 0, // 상태를 1로 설정
      UPDATE_ACCOUNT: regUserNO.value,
    },
  });
    // const wondanNo = item.WONDAN_STORE;
    // await $fetch(`/api/wondan/updateState/${wondanNo}`, {
    //   method: "POST",
    //   body: {
    //     NO: wondanNo,
    //     STATE: 0, // 상태를 0로 설정
    //     UPDATE_ACCOUNT: regUserNO.value,
    //   },
    // });
    // const NO = item.NO;
    // await $fetch("/api/jaedan/" + NO, {
    //   method: "DELETE",
    // });
    // alert(NO + "번 재단등록이 취소 되었습니다.");
    await fetchData();
    await getworkOrderList();  
    await getworkOrderStateUp();
  } catch (error) {
    alert("취소 중 오류가 발생했습니다.");
  }
};
const onDelete = async (item) => {
  const confirmation = confirm(item.WORK_ORDER_NO + "번 재단등록을 취소 하시겠습니까?");
  console.log("no: " + item.NO);

  if (!confirmation) {
    return; // 사용자가 취소를 선택하면 함수 실행을 중단
  }

  try {
    const workNo = item.WORK_ORDER_NO;
    console.log("workNo", workNo);
    await $fetch(`/api/workOrder/updateState/{${workNo}`, {
      method: "POST",
      body: {
        NO: workNo,
        STATE: 0, // 상태를 0로 설정
        UPDATE_ACCOUNT: regUserNO.value,
      },
    });
    const wondanNo = item.WONDAN_STORE;
    await $fetch(`/api/wondan/updateState/${wondanNo}`, {
      method: "POST",
      body: {
        NO: wondanNo,
        STATE: 0, // 상태를 0로 설정
        UPDATE_ACCOUNT: regUserNO.value,
      },
    });
    const NO = item.NO;
    await $fetch("/api/jaedan/" + NO, {
      method: "DELETE",
    });
    alert(NO + "번 재단등록이 취소 되었습니다.");
    await fetchData();
  } catch (error) {
    alert("삭제 중 오류가 발생했습니다.");
  }
};
//삭제시 원단 상태 변경

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
  text-align: center;
}
.col,
.col-1,
.col-2,
.col-3,
.col-4 {
  margin-right: 5px;
  text-align: center;
}
.form-control::placeholder {
  font-size: 12px; /* 원하는 글자 크기로 조정 */
}
.wondan-tr > th {
  font-weight: 500;
  background-color: rgb(175, 245, 192);
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
.reg-no-badge1 {
  display: inline-block;
  width: 30px; /* 원의 크기를 조절하고 싶다면 이 값을 조정하세요 */
  height: 30px; /* 원의 크기를 조절하고 싶다면 이 값을 조정하세요 */
  text-align: center;
  line-height: 30px; /* 높이와 동일하게 설정하여 텍스트를 수직 중앙에 위치시킵니다 */
}
.reg-no-badge2 {
  display: inline-block;
  width: 30px; /* 원의 크기를 조절하고 싶다면 이 값을 조정하세요 */
  height: 30px; /* 원의 크기를 조절하고 싶다면 이 값을 조정하세요 */
  text-align: center;
  line-height: 30px; /* 높이와 동일하게 설정하여 텍스트를 수직 중앙에 위치시킵니다 */
  vertical-align: middle; /* 추가된 속성: 수직 가운데 정렬을 개선 */
}
.reg-no-badge3 {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 30px; /* 원의 크기를 조절하고 싶다면 이 값을 조정하세요 */
  height: 30px; /* 원의 크기를 조절하고 싶다면 이 값을 조정하세요 */
  border-radius: 50%; /* 원 모양 만들기 */
  background-color: #ffc107; /* Bootstrap 경고색 */
  color: white; /* 글자색 */
  font-size: 12px; /* 글자 크기 조정 */
}
.reg-no-badge {
  width: 30px;
  height: 30px;
  border-radius: 50%; /* 원 모양 만들기 */
  background-color: #ffc107; /* Bootstrap 경고색 */
  color: white; /* 글자색 */
}
.reg-no-badge-reg {
  width: 30px;
  height: 30px;
  border-radius: 50%; /* 원 모양 만들기 */
  background-color: #3737c9; /* Bootstrap 경고색 */
  color: rgb(237, 89, 89); /* 글자색 */
}

.flex-center {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%;
  height: 100%;
}
.border_bottom {
  border-bottom: 1px solid rgb(182, 67, 67);
  background-color: #faf9f9;
}
</style>
