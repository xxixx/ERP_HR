<template>
  <div class="card pt-3 px-4">
    <p class="text-center text-bold bg-primary text-white mb-0 p-1">부품별 불량률</p>
    <hr class="my-2">
    <div id="chart">
      <apexchart 
        v-if="chartPart_Count.length > 0" 
        type="pie" 
        height="350"
        :options="chartOptions" 
        :series="series" 
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, watch, ref, onMounted, computed } from 'vue';

const props = defineProps({
  chartPart_Count: {
    type: Array,
    required: true
  },
  chartPart_Name: {
    type: Array,
    required: true
  }
});

// computed property for series data
const series = computed(() => {
  return props.chartPart_Count.map(count => Number(count));
});

const chartOptions = ref({
  chart: {
    type: 'pie',
  },
  labels: [],
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
  }],
  dataLabels: {
    enabled: true,
    formatter: function (val, opts) {
      return opts.w.config.labels[opts.seriesIndex] + ': ' + val.toFixed(1) + '%'
    }
  },
  tooltip: {
    y: {
      formatter: function(value) {
        return value + ' 개'
      }
    }
  }
});

// props가 변경될 때마다 차트 옵션 업데이트
watch(() => props.chartPart_Name, (newVal) => {
  console.log('Updating chart labels with:', newVal);
  chartOptions.value.labels = [...newVal];
}, { immediate: true });

onMounted(() => {
  console.log('Initial chartPart_Count:', props.chartPart_Count);
  console.log('Initial chartPart_Name:', props.chartPart_Name);
  // 초기 라벨 설정
  chartOptions.value.labels = [...props.chartPart_Name];
});
</script>

<style scoped>
#chart {
  width: 100%;
  min-height: 350px;
}
</style>