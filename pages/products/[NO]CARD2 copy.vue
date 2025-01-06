<template>
  <div class="container mx-auto p-4">
    <div class="product-card">
      <!-- 헤더 섹션 -->
      <div class="card-header">
        <h1 class="product-title">{{ product.PRODUCT_FULLNAME }}</h1>
        <div class="certification-badge" :class="{ 'certified': product.CERTIFY }">
          {{ product.CERTIFY ? '인증완료' : '미인증' }}
        </div>
      </div>

      <!-- 메인 정보 그리드 -->
      <div class="info-grid">
        <!-- 제품 코드 카드 -->
        <div class="info-card">
          <div class="card-content">
            <h3>제품 코드</h3>
            <p class="highlight">{{ product.PRODUCT_CODE }}</p>
            <div class="sub-info">
              <div>
                <span class="label">제품명:</span>
                <span>{{ product.PRODUCT_NAME }}</span>
              </div>
              <div>
                <span class="label">파트:</span>
                <span>{{ product.PRODUCT_PART }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 바코드 정보 카드 -->
        <div class="info-card">
          <div class="card-content">
            <h3>바코드 정보</h3>
            <p class="highlight">{{ product.PRODUCT_BARCODE }}</p>
            <div class="sub-info">
              <div>
                <span class="label">바코드 번호:</span>
                <span>{{ product.BARCODE_NO }}</span>
              </div>
              <div>
                <span class="label">REV:</span>
                <span>{{ product.BARCODE_REV }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 차량 정보 카드 -->
        <div class="info-card">
          <div class="card-content">
            <h3>차량 정보</h3>
            <p class="highlight">{{ product.CAR }}</p>
            <div class="sub-info">
              <div>
                <span class="label">지역:</span>
                <span>{{ product.LOCATION }}</span>
              </div>
              <div>
                <span class="label">회사:</span>
                <span>{{ product.COMPANY }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 제품 설명 카드 -->
        <div class="info-card">
          <div class="card-content">
            <h3>제품 설명</h3>
            <div class="description-list">
              <p>{{ product.PRODUCT_DESC01 }}</p>
              <p>{{ product.PRODUCT_DESC02 }}</p>
              <p>{{ product.PRODUCT_DESC03 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 하단 인증 정보 -->
      <div class="certification-info">
        <div class="cert-date">
          <span class="label">인증일:</span>
          <span>{{ formatDate(product.CERT_DATE) }}</span>
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
.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.product-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
}

.certification-badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #feb2b2;
  color: #c53030;
}

.certification-badge.certified {
  background-color: #9ae6b4;
  color: #276749;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-card {
  background: #f7fafc;
  border-radius: 8px;
  padding: 1.5rem;
  height: 100%;
}

.card-content h3 {
  color: #4a5568;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.highlight {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2b6cb0;
  margin: 0.5rem 0;
}

.sub-info {
  margin-top: 1rem;
}

.sub-info > div {
  margin: 0.5rem 0;
}

.label {
  color: #718096;
  font-weight: 500;
  margin-right: 0.5rem;
}

.description-list p {
  margin: 0.5rem 0;
  color: #4a5568;
}

.certification-info {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #e2e8f0;
  text-align: right;
  color: #718096;
}

@media (max-width: 768px) {
  .product-card {
    padding: 1rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .certification-badge {
    align-self: flex-start;
  }
}
</style>
