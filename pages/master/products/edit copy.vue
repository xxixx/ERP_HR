<template>
    <div class="w-full max-w-3xl mx-auto py-8">
      <h5 class="text-center mt-2">상품 수정</h5>
      <hr />
      <form @submit.prevent="updateProduct">
        <div class="mb-3">
          <label for="productCode" class="form-label">상품 코드</label>
          <input v-model="product.PRODUCT_CODE" type="text" class="form-control" id="productCode" required />
        </div>
        <div class="mb-3">
          <label for="car" class="form-label">차량</label>
          <input v-model="product.CAR" type="text" class="form-control" id="car" required />
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">위치</label>
          <input v-model="product.LOCATION" type="text" class="form-control" id="location" required />
        </div>
        <div class="mb-3">
          <label for="productName" class="form-label">상품명</label>
          <input v-model="product.PRODUCT_NAME" type="text" class="form-control" id="productName" required />
        </div>
        <div class="mb-3">
          <label for="productBarcode" class="form-label">상품 바코드</label>
          <input v-model="product.PRODUCT_BARCODE" type="text" class="form-control" id="productBarcode" required />
        </div>
        <div class="mb-3">
          <label for="barcodeNo" class="form-label">바코드 번호</label>
          <input v-model="product.BARCODE_NO" type="text" class="form-control" id="barcodeNo" required />
        </div>
        <button type="submit" class="btn btn-primary">수정</button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const product = ref({});
  const route = useRoute();
  const router = useRouter();
  
  const fetchProduct = async () => {
    const productId = route.params.id; // URL에서 상품 ID 가져오기
    try {
      const response = await fetch(`/api/products/getProducts/${productId}`);
      if (!response.ok) {
        throw new Error('네트워크 응답이 좋지 않습니다.');
      }
      product.value = await response.json(); // 서버에서 받은 데이터
    } catch (error) {
      console.error('상품 정보를 가져오는 중 오류 발생:', error);
    }
  };
  
  const updateProduct = async () => {
    try {
      const response = await fetch('/api/products/updateProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product.value)
      });
      if (!response.ok) {
        throw new Error('상품 수정 중 오류 발생');
      }
      router.push('/products'); // 수정 후 상품 목록 페이지로 이동
    } catch (error) {
      console.error('상품 수정 중 오류 발생:', error);
    }
  };
  
  onMounted(fetchProduct);
  </script>
  
  <style>
  /* 스타일 추가 */
  </style>
  