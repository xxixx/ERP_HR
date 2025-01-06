<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <h5 class="text-center mt-2">상품 상세 정보</h5>
    <hr />
    product{{ product }}
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div>
        <p><strong>상품 코드:</strong> {{ product.PRODUCT_CODE }}</p>
        <p><strong>차량:</strong> {{ product.CAR }}</p>
        <p><strong>위치:</strong> {{ product.LOCATION }}</p>
        <p><strong>상품명:</strong> {{ product.PRODUCT_NAME }}</p>
        <p><strong>상품 바코드:</strong> {{ product.PRODUCT_BARCODE }}</p>
        <p><strong>바코드 번호:</strong> {{ product.BARCODE_NO }}</p>
      </div>
      <router-link :to="`/products/edit/${product.NO}`" class="btn btn-warning">수정하기</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const product = ref({});
const isLoading = ref(true);
const route = useRoute();

const fetchProduct = async () => {
  const NO = route.params.NO; // URL에서 상품 ID 가져오기
  try {
    const response = await fetch(`/api/products/getProducts/${NO}`);
    if (!response.ok) {
      throw new Error('네트워크 응답이 좋지 않습니다.');
    }
    product.value = await response.json(); // 서버에서 받은 데이터
    console.log("product", product.value);
  } catch (error) {
    console.error('상품 정보를 가져오는 중 오류 발생:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchProduct);
</script>

<style>
/* 스타일 추가 */
</style>
