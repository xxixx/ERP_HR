<template>
  <div class="container vh-100">
    <div class="row h-100 align-items-center justify-content-center">
      <div class="col-auto text-center ">
        <img
          class="me-3 bg-white"
          src="../assets/images/logo.png"
          width="100"
          height="100"
          style="width: 100px; height: 100px"
        />
        <p> 알코에스씨 생산관리 프로그램</p>
        <div class="" style="height: 20rem;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const productionPlans = ref([]);
const router = useRouter();

const fetchProductionPlans = async () => {
  try {
    const response = await fetch('/api/production/getProductionPlans');
    productionPlans.value = await response.json();
  } catch (error) {
    console.error('생산계획 목록을 가져오는 데 오류가 발생했습니다:', error);
  }
};

const goToCreatePage = () => {
  router.push('/production/create');
};

const viewPlan = (planId) => {
  router.push(`/production/${planId}`);
};

const editPlan = (planId) => {
  router.push(`/production/edit/${planId}`);
};

onMounted(fetchProductionPlans);
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>