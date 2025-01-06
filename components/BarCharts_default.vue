<template>
  <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup>
import { ref } from 'vue';
import ApexCharts from 'vue3-apexcharts';

const series = ref([
  {
    name: '시리즈 1',
    data: [44, 55, 41, 64, 22, 43, 21]
  },
  
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
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
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  },
  yaxis: {
    title: {
      text: '(천 단위)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " 천"
      }
    }
  }
});
</script>
