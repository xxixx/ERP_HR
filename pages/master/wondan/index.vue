<template>
  <div class="container-fluid">
    <div class="card shadow">
      <!-- <div class="card-header py-3 d-flex justify-content-between align-items-center">
       
       
      </div> -->
      <div class="card-body">
        
       
        <!-- 검색 영역 -->
        <!-- <div class="row mb-3">
          <div class="col-md-6">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                v-model="searchTerm"
                placeholder="검색어를 입력하세요"
                @keyup.enter="search"
              />
              <button class="btn btn-outline-secondary" @click="search">
                검색
              </button>
            </div>
          </div>
        </div> -->

        <!-- 테이블 -->
        <div class="table-responsive">
          <table class="table  table-sm ">
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
                  <button class="btn btn-warning btn-sm text-white" @click="showAddModal = true">
                  원단 코드 추가
                   </button>
                </th>
              </tr>
              <tr>
                <th>NO</th>
                <th>원단코드</th>
                <th>원단명</th>
                <th>부품번호</th>
                <th>공급사</th>
                <th>DESCRIPTION</th>
                <th>상태 관리</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in wondanList" :key="item.NO">
                <td>{{ item.NO }}</td>
                <td>{{ item.WONDAN_NAME }}</td>
                <td>{{ item.NAME }}</td>
                <td>{{ item.BUPUM_NO }}</td>
                <td>{{ item.SUPPLAY }}</td>
                <td>{{ item.DESCRIPTION }}</td>
                <td>{{ item.STATE }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-outline-secondary me-2"
                    @click="editItem(item)"
                  >
                    수정
                  </button>
                  <!-- <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteItem(item.NO)"
                  >
                    삭제
                  </button> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 페이지네이션 -->
        <div class="mt-3">
          <Pagination
            :totalItems="totalItems"
            :itemsPerPage="itemsPerPage"
            v-model:currentPage="currentPage"
          />
        </div>
      </div>
    </div>

    <!-- 추가/수정 모달 -->
    <div v-if="showAddModal" class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ editMode ? '원단 코드 수정' : '원단 코드 추가' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveItem">
              <div class="mb-3">
                <label class="form-label">원단코드</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.WONDAN_NAME"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">원단명</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.NAME"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">부품번호</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.BUPUM_NO"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">공급사</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.SUPPLAY"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">DESCRIPTION</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.DESCRIPTION"
                  
                />
              </div>
              <div class="mb-3">
                <label class="form-label">사용/사용안함</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.STATE"
                  
                />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">
                  취소
                </button>
                <button type="submit" class="btn btn-primary">저장</button>
              </div>
            </form>
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
const pageTitle = ref('원단 기초 정보');
// useHead를 사용하여 메타 태그 설정
useHead({
  title: pageTitle.value,
});
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);

const allWondanList = ref([]); // 전체 데이터
const wondanList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return allWondanList.value.slice(start, end);
});

const totalItems = computed(() => allWondanList.value.length);
const currentPage = ref(1);
const itemsPerPage = ref(15);

const searchTerm = ref('');
const showAddModal = ref(false);
const editMode = ref(false);
const formData = ref({
  NO: null,
  WONDAN_NAME: '',
  NAME: '',
  BUPUM_NO: '',
  SUPPLAY: '',
  WONDAN_BARCODE: null,
  DESCRIPTION: '',
  STATE: '',
});

// 데이터 로드
const fetchData = async () => {
  try {
    const response = await $fetch('/api/wondan/master/list');
    allWondanList.value = response.data;
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
    const response = await $fetch('/api/wondan/master/search', {
      params: {
        searchTerm: searchTerm.value
      }
    });
    
    if (response.success) {
      allWondanList.value = response.data;
      currentPage.value = 1; // 검색 시 첫 페이지로 이동
      console.log('검색 결과:', response.data);
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
  formData.value = { 
    NO: item.NO,
    WONDAN_NAME: item.WONDAN_NAME,
    NAME: item.NAME,
    BUPUM_NO: item.BUPUM_NO || '',
    SUPPLAY: item.SUPPLAY,
    WONDAN_BARCODE: item.WONDAN_BARCODE,
    DESCRIPTION: item.DESCRIPTION,
    STATE: item.STATE || '',
  };
  showAddModal.value = true;
};

// 저장 (등록/수정)
const saveItem = async () => {
  try {
    if (!formData.value.WONDAN_NAME || !formData.value.NAME || !formData.value.SUPPLAY) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (editMode.value) {
      await $fetch(`/api/wondan/master/${formData.value.NO}`, {
        method: 'PUT',
        body: formData.value
      });
      alert('수정되었습니다.');
    } else {
      await $fetch('/api/wondan/master/register', {
        method: 'POST',
        body: formData.value
      });
      alert('등록되었습니다.');
    }
    await fetchData();
    closeModal();
  } catch (error) {
    console.error('저장 실패:', error);
    if (error.data?.statusMessage) {
      alert(error.data.statusMessage);
    } else {
      alert('저장에 실패했습니다.');
    }
  }
};

// 모달 닫기
const closeModal = () => {
  showAddModal.value = false;
  editMode.value = false;
  formData.value = {
    NO: null,
    WONDAN_NAME: '',
    NAME: '',
    BUPUM_NO: '',
    SUPPLAY: '',
    WONDAN_BARCODE: null,
    DESCRIPTION: '',
    STATE: '1',
  };
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>