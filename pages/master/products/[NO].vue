<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <!-- product{{ product }} -->
      <div class="col-lg-10">
        <!-- 로딩 상태 -->
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else>
          <!-- 헤더 카드 -->
          <div class="card mb-4 shadow-sm">
            <div class="card-body text-center d-flex justify-content-between">
              <h2 class="card-title h4 mb-3">{{ product.data.PRODUCT_CODE_NAME }}</h2>
              <div>
                <span class="p-2 px-5" :class="[
                  'badge',
                  product.data.CERTIFY ? 'bg-success' : 'bg-danger'
                ]">
                  {{ product.data.CERTIFY ? '인증됨' : '미인증' }}
                </span>

              </div>
            </div>
          </div>

          <!-- 기본 정보 카드 -->
          <div class="card mb-4 shadow-sm">
            <div class="card-header card-bg">
              <span class=" mb-0">기본 정보</span>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">제품 코드</small>
                    <strong>{{ product.data.PRODUCT_CODE }}</strong>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">제품명</small>
                    <strong>{{ product.data.PRODUCT_NAME }}</strong>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">전체 제품명</small>
                    <strong>{{ product.data.PRODUCT_FULLNAME }}</strong>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">파트</small>
                    <strong>{{ product.data.PRODUCT_PART }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 바코드 정보 카드 -->
          <div class="card mb-4 shadow-sm">
            <div class="card-header card-bg">
              <span class="mb-0">바코드 정보</span>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-4">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">바코드</small>
                    <strong class="text-primary">{{ product.data.PRODUCT_BARCODE }}</strong>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">바코드 번호</small>
                    <strong>{{ product.data.BARCODE_NO }}</strong>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">REV</small>
                    <strong>{{ product.data.BARCODE_REV }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 차량/회사 정보 카드 -->
          <div class="card mb-4 shadow-sm">
            <div class="card-header card-bg">
              <span class="mb-0">차량/회사 정보</span>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-4">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">차종</small>
                    <strong>{{ product.data.CAR }}</strong>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">지역</small>
                    <strong>{{ product.data.LOCATION }}</strong>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">회사</small>
                    <strong>{{ product.data.COMPANY }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 제품 설명 카드 -->
          <div class="card mb-4 shadow-sm">
            <div class="card-header card-bg">
              <span class="mb-0">제품 설명</span>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-4">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">설명1</small>
                    <strong>{{ product.data.PRODUCT_DESC01 }}</strong>
                  </div>
                </div>
                <div class="col-4">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">설명2</small>
                    <strong>{{ product.data.PRODUCT_DESC02 }}</strong>
                  </div>
                </div>
                <div class="col-4">
                  <div class="border rounded p-3">
                    <small class="text-muted d-block">설명3</small>
                    <strong>{{ product.data.PRODUCT_DESC03 }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 인증 정보 카드 -->
          <div class="card mb-4 shadow-sm">
            <div class="card-header card-bg" >
              <span class="mb-0">인증 정보</span>
            </div>
            <div class="card-body">
              <div class="border rounded p-3">
                <small class="text-muted d-block">인증일</small>
                <strong>{{ formatDate(product.data.CERT_DATE) }}</strong>
              </div>
            </div>
          </div>

          <!-- 작업 버튼 -->
          <div class="d-flex justify-content-end">
            <router-link 
              :to="`/products/edit/${product.data.NO}`" 
              class="btn btn-warning text-white"
            >
              <i class="bi bi-pencil-square me-2"></i>
              수정하기
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { formatDate } from '~/utils/datefomatter';

const product = ref({
  data: {
    NO: '',
    PRODUCT_CODE: '',
    PRODUCT_CODE_NAME: '',
    PRODUCT_NAME: '',
    PRODUCT_FULLNAME: '',
    CERTIFY: false,
    CAR: '',
    LOCATION: '',
    COMPANY: '',
    PRODUCT_BARCODE: '',
    BARCODE_NO: '',
    BARCODE_REV: '',
    PRODUCT_PART: '',
    PRODUCT_DESC01: '',
    PRODUCT_DESC02: '',
    PRODUCT_DESC03: '',
    CERT_DATE: null
  }
});
const isLoading = ref(true);
const route = useRoute();

const fetchProduct = async () => {
  const NO = route.params.NO;
  try {
    const response = await fetch(`/api/products/getProducts/${NO}`);
    if (!response.ok) {
      throw new Error('네트워크 응답이 좋지 않습니다.');
    }
    const data = await response.json();
    console.log("Received data:", data);
    
    if (data && data.data) {
      product.value = data;
      console.log("Updated product:", product.value);
    } else {
      console.error('Invalid data structure received');
    }
  } catch (error) {
    console.error('상품 정보를 가져오는 중 오류 발생:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchProduct);
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card-bg {
  background-color: #cecece;
}
.card:hover {
  transform: translateY(-2px);
}

.border.rounded {
  transition: all 0.2s;
}

.border.rounded:hover {
  background-color: rgba(0,0,0,0.02);
}
</style>
