<script setup>
const chartOptions = {
  chart: {
    id: 'line',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};
const series = [
{
          name: 'Website Blog',
          type: 'line',
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
        }, {
          name: 'Social Media',
          type: 'line',
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }
];
</script>

<template>
  <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
</template>
