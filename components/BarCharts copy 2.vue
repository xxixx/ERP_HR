<template>
  <ClientOnly >
    <div class="chart-container">
      <apexchart type="bar" width="100%" height="300" :options="chartOptions" :series="series"></apexchart>
    </div>
  </ClientOnly>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  subCategoryAllName: Array,
  subCategoryAllCount: Array
});

const series = ref([
  {
    name: '',
    data: props.subCategoryAllCount
  },
  
]);

const chartOptions = ref({
  chart: {
    height:300, 
    type: 'bar',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: props.subCategoryAllName,
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
        return val + " 개"
      }
    }
  }
});
</script>
<style scoped>
.chart-container {
 
}
</style>