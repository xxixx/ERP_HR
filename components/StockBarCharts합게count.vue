<template>
  <div class="chart-container">
    <apexchart type="bar" width="100%" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface StockData {
  NO: number;
  PRODUCT_NO: number;
  PRODUCT_CODE: string;
  PRODUCT_FULLNAME: string;
  COUNT: number;
  formatted_date: string;
}

const stocks = ref<StockData[]>([]);

const fetchStocks = async () => {
  try {
    const response = await $fetch("/api/inventory/getStockChart");
    stocks.value = response.data;
    updateChart();
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

const series = computed(() => {
  const productCodes = [...new Set(stocks.value.map(stock => stock.PRODUCT_CODE))];
  const data = productCodes.map(productCode => {
    const productData = stocks.value
      .filter(stock => stock.PRODUCT_CODE === productCode)
      .map(stock => stock.COUNT);
    return {
      name: productCode,
      data: productData
    };
  });

  return data;
});

const chartOptions = computed(() => ({
  chart: {
    height: 350,
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
    categories: stocks.value.map(stock => stock.formatted_date),
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
        return val + " 개";
      }
    }
  }
}));

const updateChart = () => {
  chartOptions.value.xaxis.categories = stocks.value.map(stock => stock.formatted_date);
};

onMounted(() => {
  fetchStocks();
});
</script>

<style scoped>
.chart-container {
  margin: 0 auto;
}
</style>