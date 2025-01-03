<template>
  <apexchart width="100%" height="300" type="line" :options="chartOptions" :series="series"  ></apexchart>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  chartData_Count: Array,
  chartData_Date: Array
});

const chartOptions = {
  chart: {
    id: 'line',
    height: 200, // 차트의 높이를 250px로 설정
   
  },
  xaxis: {
    categories: props.chartData_Date // x축 카테고리를 props로 받은 날짜 데이터로 설정
  },
  // ... 기타 차트 옵션 설정
};

const series = [
  {
    name: 'Count',
    data: props.chartData_Count // 시리즈 데이터를 props로 받은 count 데이터로 설정
  },
  // 두 번째 시리즈 객체는 데이터가 없으므로 주석 처리하거나 제거하시는 것이 좋습니다.
];
</script>
