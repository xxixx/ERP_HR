<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  stocks: {
    type: Array,
    required: true
  }
})

const chartData = ref({
  line: [],
  bar: []
})

const chartOptions = ref({
  line: {
    chart: {
      type: 'line',
      zoom: { enabled: true }
    },
    stroke: { 
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 4
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: { text: '생산량' }
    },
    tooltip: {
      x: {
        format: 'yyyy-MM-dd'
      }
    }
  },
  bar: {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}개`
    },
    xaxis: {
      title: { text: '생산량' }
    },
    yaxis: {
      title: { text: '부품명' }
    }
  }
})

const updateCharts = () => {
  if (!props.stocks?.length) return

  // 부품별 데이터 그룹화
  const groupedData = props.stocks.reduce((acc, item) => {
    const partName = item.PART_NAME
    if (!acc[partName]) {
      acc[partName] = {
        timeData: [],
        total: 0
      }
    }
    acc[partName].timeData.push({
      x: new Date(item.REG_DATE).getTime(),
      y: item.COUNT
    })
    acc[partName].total += item.COUNT
    return acc
  }, {})

  // 라인 차트 데이터 구성
  chartData.value.line = Object.entries(groupedData).map(([name, data]) => ({
    name,
    data: data.timeData.sort((a, b) => a.x - b.x)
  }))

  // 막대 차트 데이터 구성
  const sortedTotals = Object.entries(groupedData)
    .sort(([, a], [, b]) => b.total - a.total)
  
  chartData.value.bar = [{
    name: '총 생산량',
    data: sortedTotals.map(([, data]) => data.total)
  }]
  
  chartOptions.value.bar = {
    ...chartOptions.value.bar,
    xaxis: {
      categories: sortedTotals.map(([name]) => name)
    }
  }
}

// stocks prop이 변경될 때마다 차트 업데이트
watch(() => props.stocks, updateCharts, { deep: true, immediate: true })
</script>

<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-12 mb-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">생산량 추이</h4>
          </div>
          <div class="card-body">
            <apexchart
              type="line"
              height="350"
              :options="chartOptions.line"
              :series="chartData.line"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">부품별 총 생산량</h4>
          </div>
          <div class="card-body">
            <apexchart
              type="bar"
              height="350"
              :options="chartOptions.bar"
              :series="chartData.bar"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
