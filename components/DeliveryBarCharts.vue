<template>
  <!-- {{ stocks }} -->
  <ClientOnly>
    <div class="chart-container">
      <apexchart type="bar" width="100%" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

type StockData = {
  NO: number;
  PRODUCT_NO: number;
  PRODUCT_CODE: string;
  PRODUCT_FULLNAME: string;
  COUNT: number;
  formatted_date: string;
};

const stocks = ref<StockData[]>([]);

const fetchStocks = async () => {
  try {
    const response = await $fetch("/api/inventory/getDeliveryChart");
    stocks.value = response.data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

// 각 날짜별로 중복되는 `PRODUCT_FULLNAME`을 고려한 시리즈 데이터 생성
const series = computed(() => {
  // 각 날짜와 제품명을 키로 하는 데이터 매핑
  const seriesData: Record<string, Record<string, number>> = {};

  stocks.value.forEach(stock => {
    if (!seriesData[stock.formatted_date]) {
      seriesData[stock.formatted_date] = {};
    }
    // 동일한 날짜와 제품이 여러 번 등장하는 경우 COUNT를 합산
    if (!seriesData[stock.formatted_date][stock.PRODUCT_FULLNAME]) {
      seriesData[stock.formatted_date][stock.PRODUCT_FULLNAME] = 0;
    }
    seriesData[stock.formatted_date][stock.PRODUCT_FULLNAME] += stock.COUNT;
  });

  // 유일한 제품명을 추출
  const uniqueProducts = Object.keys(
    stocks.value.reduce((acc, stock) => {
      acc[stock.PRODUCT_FULLNAME] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  // 시리즈 데이터 생성
  return uniqueProducts.map(productName => ({
    name: productName,
    data: Object.keys(seriesData).map(date => seriesData[date][productName] || 0)
  }));
});

const chartOptions = computed(() => ({
  chart: {
    height: 350,
    type: 'bar',
    stacked: false,  // 제품들을 개별 막대로 보여주기 위해 stacked를 false로 설정
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 15,
    colors: ['transparent'],
  },
  xaxis: {
    categories: [...new Set(stocks.value.map(stock => stock.formatted_date))],
    title: {
      text: '',
    },
    tickPlacement: 'between',  // tickPlacement를 'between'으로 설정하여 첫째날과 마지막날의 데이터가 잘리거나 겹치지 않도록 함
  },
  yaxis: {
    title: {
      text: 'Count',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + ' 개';
      },
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    offsetY: 0,
  },
}));

onMounted(() => {
  fetchStocks();
});
</script>

<style scoped>
.chart-container {
  margin: 0 auto;
}
</style>