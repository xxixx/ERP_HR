<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      productData{{ productData }}
      <div class="col-lg-10">
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h3 class="card-title mb-0">제품 정보 수정1111</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <!-- 기본 정보 -->
              <div class="row mb-4">
                <h5 class="border-bottom pb-2">기본 정보1</h5>
                <div class="col-md-6 mb-3">
                  <label class="form-label">제품 코드1</label>
                  <input type="text" class="form-control" v-model="product.PRODUCT_CODE">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">차종</label>
                  <input type="text" class="form-control" v-model="product.CAR">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">지역</label>
                  <input type="text" class="form-control" v-model="product.LOCATION">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">회사</label>
                  <input type="text" class="form-control" v-model="product.COMPANY">
                </div>
              </div>

              <!-- 제품명 정보 -->
              <div class="row mb-4">
                <h5 class="border-bottom pb-2">제품명 정보</h5>
                <div class="col-md-6 mb-3">
                  <label class="form-label">제품명</label>
                  <input type="text" class="form-control" v-model="product.PRODUCT_NAME">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">제품 코드명</label>
                  <input type="text" class="form-control" v-model="product.PRODUCT_CODE_NAME">
                </div>
                <div class="col-md-12 mb-3">
                  <label class="form-label">전체 제품명</label>
                  <input type="text" class="form-control" v-model="product.PRODUCT_FULLNAME">
                </div>
              </div>

              <!-- 바코드 정보 -->
              <div class="row mb-4">
                <h5 class="border-bottom pb-2">바코드 정보</h5>
                <div class="col-md-4 mb-3">
                  <label class="form-label">바코드</label>
                  <input type="text" class="form-control" v-model="product.PRODUCT_BARCODE">
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">바코드 번호</label>
                  <input type="text" class="form-control" v-model="product.BARCODE_NO">
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">바코드 리비전</label>
                  <input type="text" class="form-control" v-model="product.BARCODE_REV">
                </div>
              </div>

              <!-- 제품 상세 정보 -->
              <div class="row mb-4">
                <h5 class="border-bottom pb-2">제품 상세 정보</h5>
                <div class="col-md-6 mb-3">
                  <label class="form-label">제품 파트</label>
                  <input type="text" class="form-control" v-model="product.PRODUCT_PART">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">제품 파트01</label>
                  <input type="text" class="form-control" v-model="product.PRODUCT_PART01">
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">제품 설명01</label>
                  <input type="text" class="form-control" v-model="product.PRODUCT_DESC01">
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">제품 설명02</label>
                  <input type="text" class="form-control" v-model="product.PRODUCT_DESC02">
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">제품 설명03</label>
                  <input type="text" class="form-control" v-model="product.PRODUCT_DESC03">
                </div>
              </div>

              <!-- 인증 정보 -->
              <div class="row mb-4">
                <h5 class="border-bottom pb-2">인증 정보</h5>
                <div class="col-md-6 mb-3">
                  <label class="form-label">인증 날짜</label>
                  <input type="date" class="form-control" v-model="product.CERT_DATE">
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label">인증 상태</label>
                  <select class="form-select" v-model="product.CERTIFY">
                    <option :value="1">인증됨</option>
                    <option :value="0">미인증</option>
                  </select>
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label">상태</label>
                  <select class="form-select" v-model="product.STATE">
                    <option :value="1">활성</option>
                    <option :value="0">비활성</option>
                  </select>
                </div>
              </div>

              <!-- 버튼 -->
              <div class="d-flex justify-content-end gap-2">
                <!-- <button type="button" class="btn btn-secondary" @click="goBack">취소</button> -->
                <button type="submit" class="btn btn-primary" @click.prevent="handleSubmit">저장</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const productData = ref(null); // 디버깅을 위한 원본 데이터 저장
const product = ref({
  NO: null,
  PRODUCT_CODE: '',
  CAR: '',
  LOCATION: '',
  COMPANY: '',
  PRODUCT_NAME: '',
  PRODUCT_BARCODE: '',
  BARCODE_NO: '',
  BARCODE_REV: '',
  PRODUCT_CODE_NAME: '',
  PRODUCT_PART01: '',
  PRODUCT_FULLNAME: '',
  PRODUCT_DESC01: '',
  PRODUCT_DESC02: '',
  PRODUCT_DESC03: '',
  PRODUCT_PART: '',
  CERT_DATE: '',
  CERTIFY: 0,
  STATE: 1
});

onMounted(async () => {
  try {
    const NO = route.params.NO;
    console.log('Fetching product data for ID:', NO);
    
    const response = await fetch(`/api/products/getProducts/${NO}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Server response:', data);
    
    // 데이터가 배열인 경우 첫 번째 항목 사용
    const productData = Array.isArray(data) ? data[0] : data;
    
    if (productData) {
      // CERT_DATE 형식 변환 (YYYY-MM-DD)
      const certDate = productData.CERT_DATE ? 
        new Date(productData.CERT_DATE).toISOString().split('T')[0] : '';
      
      product.value = {
        NO: productData.NO,
        PRODUCT_CODE: productData.PRODUCT_CODE || '',
        CAR: productData.CAR || '',
        LOCATION: productData.LOCATION || '',
        COMPANY: productData.COMPANY || '',
        PRODUCT_NAME: productData.PRODUCT_NAME || '',
        PRODUCT_BARCODE: productData.PRODUCT_BARCODE || '',
        BARCODE_NO: productData.BARCODE_NO || '',
        BARCODE_REV: productData.BARCODE_REV || '',
        PRODUCT_CODE_NAME: productData.PRODUCT_CODE_NAME || '',
        PRODUCT_PART01: productData.PRODUCT_PART01 || '',
        PRODUCT_FULLNAME: productData.PRODUCT_FULLNAME || '',
        PRODUCT_DESC01: productData.PRODUCT_DESC01 || '',
        PRODUCT_DESC02: productData.PRODUCT_DESC02 || '',
        PRODUCT_DESC03: productData.PRODUCT_DESC03 || '',
        PRODUCT_PART: productData.PRODUCT_PART || '',
        CERT_DATE: certDate,
        CERTIFY: productData.CERTIFY || 0,
        STATE: productData.STATE || 1
      };
      console.log('Initialized product data:', product.value);
    } else {
      throw new Error('상품 데이터가 없습니다');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    alert('상품 정보를 가져오는데 실패했습니다: ' + error.message);
  } finally {
    isLoading.value = false;
  }
});

const handleSubmit = async () => {
  try {
    console.log('Frontend - Submitting product data:', product.value);
    
    const response = await fetch('/api/products/updateProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product.value)
    });
    
    console.log('Frontend - Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Frontend - Error response:', errorData);
      throw new Error(errorData.statusMessage || `HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Frontend - Success response:', responseData);
    
    alert('제품 정보가 성공적으로 업데이트되었습니다.');
    router.push(`/products/${product.value.NO}`);
  } catch (error) {
    console.error('Frontend - Error updating product:', error);
    alert('제품 정보 업데이트 중 오류가 발생했습니다: ' + error.message);
  }
};

// const goBack = () => {
//   router.back();
// };
</script>

<style scoped>
.form-label {
  font-weight: 500;
  font-size: 0.9rem;
}
.card-header {
  background-color: #0d6efd !important;
}
</style>