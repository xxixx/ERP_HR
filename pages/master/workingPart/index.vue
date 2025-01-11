<template>
  <div class="container-fluid">
    <div class="card">
      <!-- <div class="card-header">
        <div class="row align-items-center">
          <div class="col">
            <h5 class="mb-0">{{ pageTitle }}</h5>
          </div>
        </div>
      </div> -->
      
      <div class="card-body">
        <!-- 검색 영역 -->
        <!-- <div class="row mb-3">
          <div class="col-md-6">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="검색어를 입력하세요"
                v-model="searchTerm"
                @keyup.enter="search"
              />
              <button class="btn btn-primary" @click="search">
                검색
              </button>
            </div>
          </div>
          <div class="col-md-6 text-end">
            <button class="btn btn-success" @click="showAddModal = true">
              신규 등록
            </button>
          </div>
        </div> -->
        <!-- workingPartList{{ workingPartList }} -->
        <!-- totalItems{{ totalItems }} -->

        <!-- 테이블 -->
        <div class="table-responsive">
          <table class="table table-sm table-hover">
            <thead class="table-light">
              <tr >
                <th colspan= 5 class="mb-5" >
                  <div class="input-group w-100">
                      <input
                        type="text"
                        class="form-control "
                        v-model="searchTerm"
                        placeholder="검색어를 입력하세요"
                        @keyup.enter="search"
                      />
                      <button class="btn btn-secondary w-25 ms-2 " @click="search">
                        검색
                      </button>
                   </div>
                </th>
                <th></th>
                

                <th colspan="2">
                  <button class="btn btn-warning btn-sm text-white w-50" @click="showAddModal = true">
                    신규 등록
                   </button>
                </th>
              </tr>

              <tr>
                <th>번호</th>
                <th>조립부품명</th>
                <th>원단코드</th>
                <th>원단명</th>
                <th>보조원단</th>
                <th>제품코드</th>
                <th>박스수량</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in workingPartList" :key="item.NO">
                <td>{{ item.NO }}</td>
                <td>{{ item.ASSY_PART_NAME }}</td>
                <td>{{ item.WONDAN_CODE }}</td>
                <td>{{ item.WONDAN_NAME }}</td>
                <td>{{ item.SUB_WONDAN }}</td>
                <td>{{ item.PRODUCT_CODE }}</td>
                <td>{{ item.BOX_COUNT }}</td>
                <td>{{ item.STATE === 1 ? '사용' : '미사용' }}</td>
                <td>
                  <button class="btn btn-sm btn-secondary me-1" @click="editItem(item)">
                    수정
                  </button>
                  <button class="btn btn-sm btn-danger disabled" @click="deleteItem(item.NO)">
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 페이지네이션 -->
        <div class="d-flex justify-content-center mt-3">
          <Pagination
          :totalItems="totalItems"
            :itemsPerPage="itemsPerPage"
            v-model:currentPage="currentPage"
          />
        </div>
      </div>
    </div>

    <!-- 등록/수정 모달 -->
    <div v-if="showAddModal" class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editMode ? '작업파트 수정' : '작업파트 등록' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">조립부품명 <span class="text-danger">*</span></label>
              <input type="text" class="form-control" v-model="formData.ASSY_PART_NAME" required />
            </div>
            <div class="mb-3">
              <label class="form-label">원단코드 <span class="text-danger">*</span></label>
              <input type="number" class="form-control" v-model="formData.WONDAN_CODE" required />
            </div>
            <div class="mb-3">
              <label class="form-label">원단명</label>
              <input type="text" class="form-control" v-model="formData.WONDAN_NAME" />
            </div>
            <div class="mb-3">
              <label class="form-label">보조원단</label>
              <input type="text" class="form-control" v-model="formData.SUB_WONDAN" />
            </div>
            <div class="mb-3">
              <label class="form-label">제품코드</label>
              <input type="number" class="form-control" v-model="formData.PRODUCT_CODE" />
            </div>
            <div class="mb-3">
              <label class="form-label">박스수량</label>
              <input type="number" class="form-control" v-model="formData.BOX_COUNT" />
            </div>
            <div class="mb-3">
              <label class="form-label">상태</label>
              <select class="form-select" v-model="formData.STATE">
                <option value="1">사용</option>
                <option value="0">미사용</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              취소
            </button>
            <button type="button" class="btn btn-primary" @click="saveItem">
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAddModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Pagination from '~/components/common/Pagination.vue';

// 페이지 메타데이터 설정
const pageTitle = ref('작업파트 관리');
useHead({
  title: pageTitle.value,
});

import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);

// 상태 관리
const allWorkingPartList = ref([]); // 전체 데이터
const workingPartList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return allWorkingPartList.value.slice(start, end);
});

const totalItems = computed(() => allWorkingPartList.value.length);
const currentPage = ref(1);
const itemsPerPage = ref(30);

const searchTerm = ref('');
const showAddModal = ref(false);
const editMode = ref(false);
const formData = ref({
  NO: null,
  ASSY_PART_NAME: '',
  WONDAN_CODE: '',
  WONDAN_NAME: '',
  SUB_WONDAN: '',
  PRODUCT_CODE: '',
  BOX_COUNT: '',
  STATE: '1'
});

// 데이터 로드
const fetchData = async () => {
  try {
    const response = await $fetch('/api/workingPart/list');
    if (response.success) {
      allWorkingPartList.value = response.data;
      console.log('데이터 로드 완료:', allWorkingPartList.value.length);
    } else {
      throw new Error('데이터 로드 실패');
    }
  } catch (error) {
    console.error('데이터 로드 실패:', error);
    alert('데이터를 불러오는데 실패했습니다.');
  }
};

// 검색
const search = async () => {
  if (!searchTerm.value.trim()) {
    await fetchData();
    return;
  }

  try {
    const response = await $fetch('/api/workingPart/search', {
      params: {
        searchTerm: searchTerm.value
      }
    });
    
    if (response.success) {
      allWorkingPartList.value = response.data;
      currentPage.value = 1; // 검색 시 첫 페이지로 이동
      console.log('검색 결과:', allWorkingPartList.value.length);
    } else {
      throw new Error('검색 실패');
    }
  } catch (error) {
    console.error('검색 실패:', error);
    alert('검색에 실패했습니다.');
  }
};

// 수정 모달 열기
const editItem = (item) => {
  editMode.value = true;
  formData.value = { ...item };
  showAddModal.value = true;
};

// 삭제
const deleteItem = async (NO) => {
  if (!confirm('정말 삭제하시겠습니까?')) return;
  
  try {
    const response = await $fetch(`/api/workingPart/${NO}`, {
      method: 'DELETE'
    });
    
    if (response.success) {
      await fetchData();
      alert('삭제되었습니다.');
    } else {
      throw new Error('삭제 실패');
    }
  } catch (error) {
    console.error('삭제 실패:', error);
    alert('삭제에 실패했습니다.');
  }
};

// 저장 (등록/수정)
const saveItem = async () => {
  try {
    if (!formData.value.ASSY_PART_NAME || !formData.value.WONDAN_CODE) {
      alert('필수 항목을 입력해주세요.');
      return;
    }

    let response;
    if (editMode.value) {
      response = await $fetch(`/api/workingPart/${formData.value.NO}`, {
        method: 'PUT',
        body: formData.value
      });
    } else {
      response = await $fetch('/api/workingPart/register', {
        method: 'POST',
        body: formData.value
      });
    }

    if (response.success) {
      await fetchData();
      closeModal();
      alert(editMode.value ? '수정되었습니다.' : '등록되었습니다.');
    } else {
      throw new Error(editMode.value ? '수정 실패' : '등록 실패');
    }
  } catch (error) {
    console.error('저장 실패:', error);
    alert('저장에 실패했습니다.');
  }
};

// 모달 닫기
const closeModal = () => {
  showAddModal.value = false;
  editMode.value = false;
  formData.value = {
    NO: null,
    ASSY_PART_NAME: '',
    WONDAN_CODE: '',
    WONDAN_NAME: '',
    SUB_WONDAN: '',
    PRODUCT_CODE: '',
    BOX_COUNT: '',
    STATE: '1'
  };
};

onMounted(() => {
  fetchData();
});
</script>