<template>
  <div class="container mx-auto py-8 px-4">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">제품 상세 정보</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 기본 정보 섹션 -->
          <div class="info-section">
            <h3 class="section-title">기본 정보</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">제품 코드:</span>
                <span class="value">{{ product.PRODUCT_CODE }}</span>
              </div>
              <div class="info-item">
                <span class="label">제품명:</span>
                <span class="value">{{ product.PRODUCT_NAME }}</span>
              </div>
              <div class="info-item">
                <span class="label">전체 제품명:</span>
                <span class="value">{{ product.PRODUCT_FULLNAME }}</span>
              </div>
            </div>
          </div>

          <!-- 바코드 정보 섹션 -->
          <div class="info-section">
            <h3 class="section-title">바코드 정보</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">제품 바코드:</span>
                <span class="value">{{ product.PRODUCT_BARCODE }}</span>
              </div>
              <div class="info-item">
                <span class="label">바코드 번호:</span>
                <span class="value">{{ product.BARCODE_NO }}</span>
              </div>
              <div class="info-item">
                <span class="label">바코드 REV:</span>
                <span class="value">{{ product.BARCODE_REV }}</span>
              </div>
            </div>
          </div>

          <!-- 제품 상세 정보 섹션 -->
          <div class="info-section">
            <h3 class="section-title">제품 상세</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">차종:</span>
                <span class="value">{{ product.CAR }}</span>
              </div>
              <div class="info-item">
                <span class="label">지역:</span>
                <span class="value">{{ product.LOCATION }}</span>
              </div>
              <div class="info-item">
                <span class="label">회사:</span>
                <span class="value">{{ product.COMPANY }}</span>
              </div>
            </div>
          </div>

          <!-- 추가 설명 섹션 -->
          <div class="info-section">
            <h3 class="section-title">추가 설명</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">설명 1:</span>
                <span class="value">{{ product.PRODUCT_DESC01 }}</span>
              </div>
              <div class="info-item">
                <span class="label">설명 2:</span>
                <span class="value">{{ product.PRODUCT_DESC02 }}</span>
              </div>
              <div class="info-item">
                <span class="label">설명 3:</span>
                <span class="value">{{ product.PRODUCT_DESC03 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 인증 정보 -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <span class="font-semibold">인증 상태:</span>
              <span :class="product.CERTIFY ? 'text-green-600' : 'text-red-600'">
                {{ product.CERTIFY ? '인증됨' : '미인증' }}
              </span>
            </div>
            <div>
              <span class="font-semibold">인증 날짜:</span>
              <span>{{ formatDate(product.CERT_DATE) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { formatDate } from '~/utils/datefomatter';

const route = useRoute();
const product = ref({});

onMounted(async () => {
  try {
    const response = await $fetch(`/api/products/${route.params.NO}`);
    product.value = response;
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
});
</script>

<style scoped>
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.info-section {
  background-color: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.info-grid {
  display: grid;
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.value {
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .info-section {
    padding: 1rem;
  }
  
  .section-title {
    font-size: 1.1rem;
  }
}
</style>
