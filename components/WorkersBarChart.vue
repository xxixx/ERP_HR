<template>
    <div>
      <h1>일자별 Count 현황</h1>
      <div v-if="isLoading">데이터 로딩 중...</div>
      <div v-else>
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="chartSeries"
        ></apexchart>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
//   import { ApexOptions } from 'apexcharts';

  interface WorkerModel {
    DATE: string;
    COUNT: number;
  }
  
  const workers = ref<WorkerModel[]>([]);
  const isLoading = ref(true);
  const chartSeries = ref<any[]>([]);
  const chartOptions = ref<ApexOptions>({
    chart: {
      type: 'bar',
      height: 350
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
    xaxis: {
      categories: []
    },
    yaxis: {
      title: {
        text: 'Count'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + " counts";
        }
      }
    }
  });

  const fetchWorkersDate = async () => {
    try {
      const response = await $fetch<WorkerModel[]>(`/api/workers/getWorkersAllDate`);
      workers.value = response; // response.data가 아닌 response 자체로 변경
      isLoading.value = false;
    } catch (error) {
      console.error("Error fetching workers date:", error);
      alert("작업자 정보를 가져오는 데 실패했습니다.");
    }
  };

  const updateChart = () => {
    chartSeries.value = [{
      name: 'Count',
      data: workers.value.map(item => item.COUNT)
    }];
    chartOptions.value = {
      ...chartOptions.value,
      xaxis: {
        categories: workers.value.map(item => item.DATE)
      }
    };
  };

  watch(workers, (newVal) => {
    if (newVal.length > 0) {
      updateChart();
    }
  });

  onMounted(() => {
    fetchWorkersDate();
  });
  </script>
  
  <style scoped>
  /* 스타일 추가하기 */
  </style>
