<template>
  <div class="w-full max-w-3xl mx-auto py-2">
   
<!-- {{ products }} -->
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="text-end mb-3">
        <nuxt-link to="/products/create" class="btn btn-sm btn-success">상품 등록</nuxt-link>
      </div>
      <div class="container">
        <div class="table-responsive">
          <table class="table table-sm text-start">
            <thead>
              <tr class="bg-body-secondary">
                <th>NO</th>
                <th>상품 코드</th>
                <th>차량</th>
                <th>위치</th>
                <th>상품명</th>
                <th>상품 바코드</th>
                <th>바코드 번호</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in products.data" :key="item.NO" height="50px" @click="gotoDetail(item.NO)">
              
                <td>{{ item.NO }}</td>
                <td>{{ item.PRODUCT_CODE }}</td>
                <td>{{ item.CAR }}</td>
                <td>{{ item.LOCATION }}</td>
                <td>{{ item.PRODUCT_NAME }}</td>
                <td>{{ item.PRODUCT_BARCODE }}</td>
                <td>{{ item.BARCODE_NO }}</td>
                <td>
                
                </td>
            
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// 페이지 메타데이터 설정
const pageTitle = ref('제품목록');
// useHead를 사용하여 메타 태그 설정
useHead({title: pageTitle.value, });// 페이지 제목 설정
import { usePageStore } from '~/store/pageStore';
const pageStore = usePageStore();
pageStore.setTitle(pageTitle.value);
const router = useRouter();
const products = ref([]);
const isLoading = ref(true);

const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products/getProducts');
    if (!response.ok) {
      throw new Error('네트워크 응답이 좋지 않습니다.');
    }
    products.value = await response.json(); // 서버에서 받은 데이터
    console.log("products", products.value);
  } catch (error) {
    console.error('상품 정보를 가져오는 중 오류 발생:', error);
  } finally {
    isLoading.value = false;
  }
};
const gotoDetail = (NO) => {
  router.push(`/products/${NO}`); // 상세 페이지로 이동
};
onMounted(fetchProducts);
</script>

<style>
/* 스타일 추가 */
table {
  font-size: .8em;
}

tr {
  height: 20px; /* 원하는 높이로 설정 */
  padding: 0;
}
th {
  font-weight: 500;
  background-color: rgb(247, 226, 226);
}
</style>
