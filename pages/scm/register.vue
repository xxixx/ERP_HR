<template>
    <div class="w-full max-w-3xl mx-auto py-8">
     
      <!-- <h5 class="text-center mt-2">원단 조회</h5> -->
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else class="container chart_container"></div>
      <div class="album py-2 bg-body-tertiary"></div>
      <div class="container">
       <input 
                  type="text" 
                  class="form-control" 
                  v-model="barcode"
                  @keyup.enter="addBarcode"
                  placeholder="바코드를 스캔하거나 입력하세요"
                  ref="barcodeInput"
                  @paste="handlePaste"
              >
              <div class="text-center">
                 <button 
                  class="btn btn-warning btn-sm w-25 mt-2 text-white" 
                  @click="addBarcode"
              >
                  추가
              </button>
              </div>
             <hr>
        <div v-if = "barcodeListView"  class="text-start me-4">
         <p>스캔된 바코드 목록</p>
              <div class="list-group">
                  <div 
                      v-for="(code, index) in barcodeList" 
                      :key="index"
                      class="list-group-item"
                  >
                      {{ code }}
                  </div>
              </div>
        </div>
        <div v-if = "barcodeListView" class="  mt-2 text-center">
         <button 
                  class="btn btn-success btn-sm w-25" 
                  @click="saveAllBarcodes"
                  :disabled="barcodeList.length === 0"
              >
                  저장하기
              </button>
        </div>
      </div>
      <hr />
     
      <div  class="container">
        <div><p class="text-end mt-2">최근 데이타 20개</p></div>
        <div class="table-responsive">
          <table class="table table-sm text-center">
            <thead>
              <tr>
                <th>NO</th>
                <th>BARCODE</th>
                <th>DATE</th>
               
                
              
              </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="(item, index) in [...registerData].reverse()" :key="index"> -->
                    <tr v-for="(item, index) in registerData ? [...registerData].reverse() : []" :key="index">
                <td>{{ item.NO }}</td>
                <td>{{ item.BARCODE }}</td>
                
                <td>{{ formatDate(item.REG_DATE) }}</td>
              
               
             
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
       
      
      <hr />
    
    </div>
  </template>
  
  <script setup lang="ts">
  
  import { useAccountStore } from "~/store/account";
  import { formatDate } from "~/utils/datefomatter";
  
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  import * as XLSX from "xlsx";
  
  // 페이지 메타데이터 설정
  const pageTitle = ref('SCM 등록 바코드');
  // useHead를 사용하여 메타 태그 설정
  useHead({
    title: pageTitle.value, // 페이지 제목 설정
    
  });
  import { usePageStore } from '~/store/pageStore';
  const pageStore = usePageStore();
  pageStore.setTitle(pageTitle.value);
  // 페이지 메타데이터 설정
  const accountStore = useAccountStore();
  // 페이지  권한 설정
  import { useAuthStore } from '~/store/auth';
    const authStore = useAuthStore();
   
    const userLevel = computed(() => {
      return authStore.getUser?.level ?? '로그인이 필요합니다';
    });
    
  
  
  
  const regUser = ref("");
  
  const isLoading = ref(true);
  const barcode = ref('')
  const barcodeList = ref([])
  const barcodeListView = ref(false)
  const barcodeInput = ref(null)
  const registerData = ref(null)
  onMounted(() => {
      focusInput();
      fetchRegisterData();
  })
  
  const focusInput = () => {
      barcodeInput.value?.focus()
  }
  const fetchRegisterData = async () => {
      try {
          const response = await $fetch('/api/scm/getRecord ')
          registerData.value = response.data
          isLoading.value = false
        //   fetchRegisterData();
      } catch (error) {
          console.error(error)
      }
  }
  
  
  const addBarcode = () => {
    if (barcode.value.trim()) {
        // 현재 입력된 바코드가 중복되지 않은 경우에만 추가
        if (!barcodeList.value.includes(barcode.value.trim())) {
            barcodeList.value.push(barcode.value.trim());
            if (barcodeInput.value) {
                barcodeListView.value = true;
            }
        }
        // 입력 필드 초기화 및 포커스
        barcode.value = '';
        focusInput();
    }
  }

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    
    // 줄바꿈으로 분리하여 각각의 바코드 처리
    const barcodes = pastedText.split(/[\n\r]+/).filter(code => code.trim());
    
    barcodes.forEach(code => {
        if (code.trim() && !barcodeList.value.includes(code.trim())) {
            barcodeList.value.push(code.trim());
            barcodeListView.value = true;
        }
    });
    
    focusInput();
  }

  const saveAllBarcodes = async () => {
      try {
          for (const code of barcodeList.value) {
              await $fetch('/api/scm/register', {
                  method: 'POST',
                  body: {
                      barcode: code
                  }
              })
          }
          
          barcodeList.value = []
          alert('바코드가 성공적으로 저장되었습니다.')
          fetchRegisterData();
      } catch (error) {
          alert('바코드 저장 중 오류가 발생했습니다.')
          console.error(error)
      }
  }
  
  // 상태 정의
  const filterData = ref([]); // 모든 데이터를 저장할 배열
  const currentPage = ref(1);
  const pageSize = 20;
  const totalPages = ref(0);
  
  
  
  
  // 기간별 조회 관련 상태
  const startDate = ref('');
  const endDate = ref('');
  const RecordsByDate = ref('');
  
  
  // 검색 조회 관련 상태
  const searchTerm = ref('');
  const searchResults = ref([]);
  // 검색 조회 함수
  
  // watch(wondanInventory, (newValue) => {
  //   console.log("wondanInventory updated:", newValue);
  // }, { deep: true });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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
    font-size: 12px;
  }
  @media (max-width: 720.98px) {
    .table-sm td {
      font-size: 0.7rem;
    }
  }
  td {
    font-weight: 300;
  }
  @media (max-width: 720.98px) {
    .table-sm th {
      font-size: 0.7rem;
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
    padding-right: 1.5em;
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
    border-radius: 50%;
    background-clip: padding-box;
    width: 34px;
    height: 34px;
    margin: 0 4px;
    background: #cc1b6f;
    color: #fff;
    border: 2px solid #cc1b6f;
    display: inline-flex;
    justify-content: center;
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
  