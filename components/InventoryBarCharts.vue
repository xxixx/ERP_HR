<template>
  <ClientOnly>
    <div class="chart-container">
      <apexchart type="bar" width="100%" height="300" :options="chartOptions" :series="series"></apexchart>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const inventory = ref(null); // 초기값을 null로 설정

const inventoryNames = ref<string[]>([]); // 재고 이름 배열
const inventoryCounts = ref<number[]>([]); // 재고 개수 배열

const fetchInventory = async () => {
  try {
    const response = await $fetch("/api/inventory/getinventory");
    const data = response.data;

    if (data && data.length > 0) {
      // 기존 데이터를 초기화한 후, 다음 틱에서 새로운 데이터를 추가
      // inventoryNames.value = [];
      // inventoryCounts.value = [];

      await nextTick();  // Vue가 반응형 업데이트를 완료할 때까지 기다림

      inventory.value = data; // 데이터를 받은 후에야 inventory를 설정

      data.forEach((item) => {
        inventoryNames.value.push(item.PRODUCT_FULLNAME);
        inventoryCounts.value.push(item.SUM_COUNT);
      });
    } else {
      inventory.value = []; // 데이터가 없는 경우 빈 배열로 설정
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
    alert("재고 정보를 가져오는 데 실패했습니다.");
  }
};


onMounted(() => {
  fetchInventory();


});

// const props = defineProps({
//   subCategoryAllName: Array,
//   subCategoryAllCount: Array
// });

const series = ref([
  {
    name: '',
    data: inventoryCounts
  },
]);

const chartOptions = ref({
  chart: {
    height: 300,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      endingShape: 'rounded',
      distributed: true // 막대의 색상을 다르게 배분
    },
  },
  colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFAA33', '#33AAFF', '#FF57A1'], // 필요한 만큼의 색상을 정의
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: inventoryNames.value,
    labels: {
      show: true, // 라벨 보이기 설정
      rotate: -45, // 라벨 기울기 (원하는 각도로 조정 가능)
      style: {
        colors: [], // 색상 지정 (배열로 각 라벨의 색상을 따로 지정 가능)
        fontSize: '10px', // 글씨 크기
        fontFamily: 'Arial, sans-serif',
        fontWeight: 600,
      },
    },
  },
  yaxis: {
    title: {
      text: '(단위)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " 개";
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    offsetY: 0,
  },
});
</script>

<style scoped>
.chart-container {
}
</style>
