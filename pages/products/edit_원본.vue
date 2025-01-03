<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <!-- 로딩 상태 -->
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else>
          <!-- 헤더 -->
          <div class="card mb-4 shadow-sm">
            <div class="card-body">
              <h2 class="card-title h4 text-center mb-3">제품 정보 수정</h2>
              <div class="text-center">
                <span class="badge" :class="product.CERTIFY ? 'bg-success' : 'bg-danger'">
                  {{ product.CERTIFY ? '인증완료' : '미인증' }}
                </span>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
            <!-- 기본 정보 카드 -->
            <div class="card mb-4 shadow-sm">
              <div class="card-header bg-primary text-white">
                <h3 class="h5 mb-0">기본 정보1</h3>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">제품 코드</label>
                    <input type="text" class="form-control" v-model="product.PRODUCT_CODE" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">제품명</label>
                    <input type="text" class="form-control" v-model="product.PRODUCT_NAME" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">전체 제품명</label>
                    <input type="text" class="form-control" v-model="product.PRODUCT_FULLNAME" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">파트</label>
                    <input type="text" class="form-control" v-model="product.PRODUCT_PART" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">파트01</label>
                    <input type="text" class="form-control" v-model="product.PRODUCT_PART01">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">제품 코드명</label>
                    <input type="text" class="form-control" v-model="product.PRODUCT_CODE_NAME" required>
                  </div>
                </div>
              </div>
            </div>

            <!-- 바코드 정보 카드 -->
            <div class="card mb-4 shadow-sm">
              <div class="card-header bg-info text-white">
                <h3 class="h5 mb-0">바코드 정보</h3>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label">바코드</label>
                    <input type="text" class="form-control" v-model="product.PRODUCT_BARCODE" required>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">바코드 번호</label>
                    <input type="text" class="form-control" v-model="product.BARCODE_NO" required>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">REV</label>
                    <input type="text" class="form-control" v-model="product.BARCODE_REV" required>
                  </div>
                </div>
              </div>
            </div>

            <!-- 차량/회사 정보 카드 -->
            <div class="card mb-4 shadow-sm">
              <div class="card-header bg-success text-white">
                <h3 class="h5 mb-0">차량/회사 정보</h3>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label">차종</label>
                    <input type="text" class="form-control" v-model="product.CAR" required>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">지역</label>
                    <input type="text" class="form-control" v-model="product.LOCATION" required>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">회사</label>
                    <input type="text" class="form-control" v-model="product.COMPANY" required>
                  </div>
                </div>
              </div>
            </div>

            <!-- 제품 설명 카드 -->
            <div class="card mb-4 shadow-sm">
              <div class="card-header bg-warning">
                <h3 class="h5 mb-0">제품 설명</h3>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label">설명1</label>
                    <input type="text" class="form-control" v-model="product.PRODUCT_DESC01">
                  </div>
                  <div class="col-12">
                    <label class="form-label">설명2</label>
                    <input type="text" class="form-control" v-model="product.PRODUCT_DESC02">
                  </div>
                  <div class="col-12">
                    <label class="form-label">설명3</label>
                    <input type="text" class="form-control" v-model="product.PRODUCT_DESC03">
                  </div>
                </div>
              </div>
            </div>

            <!-- 인증 정보 카드 -->
            <div class="card mb-4 shadow-sm">
              <div class="card-header bg-secondary text-white">
                <h3 class="h5 mb-0">인증 정보</h3>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">인증일</label>
                    <input type="datetime-local" class="form-control" v-model="product.CERT_DATE">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">인증 상태</label>
                    <select class="form-select" v-model="product.CERTIFY">
                      <option :value="1">인증완료</option>
                      <option :value="0">미인증</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- 작업 버튼 -->
            <div class="d-flex justify-content-end gap-2">
              <router-link 
                :to="`/products/${product.NO}`"
                class="btn btn-secondary"
              >
                취소
              </router-link>
              <button type="submit" class="btn btn-primary">
                저장하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const product = ref({});
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();

const fetchProduct = async () => {
  const NO = route.params.NO;
  try {
    const response = await fetch(`/api/products/getProducts/${NO}`);
    if (!response.ok) {
      throw new Error('네트워크 응답이 좋지 않습니다.');
    }
    product.value = await response.json();
    console.log("product", product.value);
  } catch (error) {
    console.error('상품 정보를 가져오는 중 오류 발생:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  try {
    const response = await fetch(`/api/products/updateProduct/${product.value.NO}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product.value)
    });

    if (!response.ok) {
      throw new Error('저장 중 오류가 발생했습니다.');
    }

    // 성공적으로 저장되면 상세 페이지로 이동
    router.push(`/products/${product.value.NO}`);
  } catch (error) {
    console.error('저장 중 오류 발생:', error);
    alert('저장 중 오류가 발생했습니다.');
  }
};

onMounted(fetchProduct);
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}

.form-control:focus, .form-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>