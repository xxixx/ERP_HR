<template>
  <ClientOnly>
    <div class="chart-container">
      <apexchart type="bar" width="100%" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { formatDate } from '~/utils/datefomatter';

const stocks = ref([]);

const fetchStocks = async () => {
  try {
    const response = await $fetch("/api/inventory/getStockChart");
    stocks.value = response.data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

const series = computed(() => {
  const groupedData = {};
  stocks.value.forEach(stock => {
    if (!groupedData[stock.PRODUCT_FULLNAME]) {
      groupedData[stock.PRODUCT_FULLNAME] = {};
    }
    groupedData[stock.PRODUCT_FULLNAME][stock.DATE] = stock.COUNT;
  });

  return Object.entries(groupedData).map(([product, data]) => ({
    name: product,
    data: Object.values(data)
  }));
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
    categories: [...new Set(stocks.value.map(stock => formatDate(stock.DATE)))],
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
      formatter: function (val) {
        return val + " 개";
      }
    }
  }
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