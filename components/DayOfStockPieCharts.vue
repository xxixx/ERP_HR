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
  pie: []
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
  pie: {
    chart: {
      type: 'pie'
    },
    labels: [],
    legend: {
      position: 'bottom',
      fontSize: '14px'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom',
          fontSize: '12px'
        }
      }
    }],
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        return opts.w.config.labels[opts.seriesIndex] + ': ' + opts.w.config.series[opts.seriesIndex] + '개'
      }
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

  // 파이 차트 데이터 구성
  const sortedTotals = Object.entries(groupedData)
    .sort(([, a], [, b]) => b.total - a.total)
  
  chartData.value.pie = sortedTotals.map(([, data]) => data.total)
  chartOptions.value.pie.labels = sortedTotals.map(([name]) => name)
}

// stocks prop이 변경될 때마다 차트 업데이트
watch(() => props.stocks, updateCharts, { deep: true, immediate: true })
</script>

<template>
  <div class="container-fluid mt-4">
    <div class="row">
     
      <div class="col-3">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">파트별  생산량</h4>
          </div>
          <div class="card-body">
            <apexchart
              type="pie"
              height="400"
              :options="chartOptions.pie"
              :series="chartData.pie"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
