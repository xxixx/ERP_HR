<template>
  <div id="chart">
   
    <apexchart type="pie" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup>


const series = ref([44, 55, 13, 33]);
const chartOptions = ref({
  labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
  chart: {
    width: 380,
    type: 'pie'
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
});
</script>

<style>
/* 필요한 경우 차트 크기 조정 */
#chart {
  max-width: 500px;
}
</style>