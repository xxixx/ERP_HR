<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <!-- productData{{ productData }} -->
      <!-- product{{ product }} -->
      <div class="col-lg-10">
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else class="card shadow-sm">
          <div class="card-header ">
            <span class="card-title mb-0">제품 정보 수정</span>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <!-- 기본 정보 -->
              <div class="row mb-4">
                <span class="border-bottom pb-2 card-bg">기본 정보</span>
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
                <span class="border-bottom pb-2 card-bg">제품명 정보</span>
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
                <span class="border-bottom pb-2 card-bg">바코드 정보</span>
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
                <span class="border-bottom pb-2 card-bg">제품 상세 정보</span>
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
                <span class="border-bottom pb-2 card-bg">인증 정보</span>
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
                <button type="button" class="btn btn-secondary" @click="goBack">취소</button>
                <button type="submit" class="btn btn-primary">저장</button>
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
const productData = ref(null); // 디버깅용 원본 데이터 저장
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
    console.log('Response status:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseData = await response.json();
    console.log('Raw server response:', responseData);
    
    // 서버 응답에서 data 객체 추출
    const data = responseData.data;
    productData.value = data; // 디버깅용 원본 데이터 저장
    console.log('Extracted product data:', data);

    if (data) {
      let certDate = data.CERT_DATE;
      if (certDate && certDate.includes('오전')) {
        certDate = certDate.split(' 오전')[0];
      } else if (certDate && certDate.includes('오후')) {
        certDate = certDate.split(' 오후')[0];
      }
      
      // 직접 각 필드를 할당
      product.value.NO = data.NO;
      product.value.PRODUCT_CODE = data.PRODUCT_CODE;
      product.value.CAR = data.CAR;
      product.value.LOCATION = data.LOCATION;
      product.value.COMPANY = data.COMPANY;
      product.value.PRODUCT_NAME = data.PRODUCT_NAME;
      product.value.PRODUCT_BARCODE = data.PRODUCT_BARCODE;
      product.value.BARCODE_NO = data.BARCODE_NO;
      product.value.BARCODE_REV = data.BARCODE_REV;
      product.value.PRODUCT_CODE_NAME = data.PRODUCT_CODE_NAME;
      product.value.PRODUCT_PART01 = data.PRODUCT_PART01;
      product.value.PRODUCT_FULLNAME = data.PRODUCT_FULLNAME;
      product.value.PRODUCT_DESC01 = data.PRODUCT_DESC01;
      product.value.PRODUCT_DESC02 = data.PRODUCT_DESC02;
      product.value.PRODUCT_DESC03 = data.PRODUCT_DESC03;
      product.value.PRODUCT_PART = data.PRODUCT_PART;
      product.value.CERT_DATE = certDate;
      product.value.CERTIFY = data.CERTIFY;
      product.value.STATE = data.STATE;

      console.log('Final product data:', product.value);
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
    console.log('Submitting product data:', product.value);
    
    const response = await fetch('/api/products/updateProducts', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product.value)
    });
    
    console.log('Update response status:', response.status);
    const responseData = await response.json();
    console.log('Update response data:', responseData);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    alert('제품 정보가 성공적으로 업데이트되었습니다.');
    router.push(`/products/${product.value.NO}`);
  } catch (error) {
    console.error('Error updating product:', error);
    alert('제품 정보 업데이트 중 오류가 발생했습니다: ' + error.message);
  }
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.form-label {
  font-weight: 500;
  font-size: 0.9rem;
}
.card-header {
  background-color: #d2d1d1 !important;
}
.card-bg {
  background-color: #e6e4e4 !important;
  padding: .5em;
}
</style>