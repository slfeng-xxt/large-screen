<script setup>
import { getChargingStatus } from '@/api/index.js'
import { useEcharts } from '@/hooks/echarts/useEcharts'
import ScrollTable from '@/components/table/ScrollTable.vue'

const chartDom = ref(null)
const option = {
  tooltip: {
    trigger: 'axis',
  },
  color: ['#6F87FE', '#6FFEC5'],
  legend: {
    right: '0',
    icon: 'rect',
    textStyle: {
      color: '#D5E6EF',
      fontSize: 12,
      fontFamily: 'PingFang SC',
    },
    itemWidth: 12,
    itemHeight: 2,
    data: ['市电', '光伏'],
  },
  grid: {
    top: '20%',
    left: '10%',
    right: '4%',
    bottom: '15%',
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: true,
      lineStyle: {
        color: '#909AA2',
        width: 0.5,
      },
    },
    axisLabel: {
      show: true,
      color: '#D5E6EF',
    },
    data: ['6.19', '6.20', '6.21', '6.22', '6.23', '6.24', '6.25'],
  },
  yAxis: {
    type: 'value',
    name: '充电电费（千元）',
    axisLabel: {
      show: true,
      color: '#D5E6EF',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#909AA2',
        width: 0.5,
      },
    },
    nameTextStyle: {
      align: 'left',
      color: '#909AA2',
      fontSize: 12,
      fontFamily: 'PingFang SC',
      padding: [0, 0, 0, -20],
    },
  },
  series: [
    {
      name: '市电',
      type: 'line',
      symbol: 'none', //去掉折线图中的节点
      smooth: true, // 折线平滑
      stack: 'Total',
      data: [20, 32, 24, 34, 50, 30, 21],
    },
    {
      name: '光伏',
      type: 'line',
      symbol: 'none',
      smooth: true,
      stack: 'Total',
      data: [22, 48, 31, 24, 29, 33, 31],
    },
  ],
}
const { setChartOption } = useEcharts(chartDom)

const tableData = ref([])

const columns = [
  { key: 'name', title: '充电站桩' },
  { key: 'mode', title: '工作模式' },
  { key: 'power', title: '实时总功率' },
]

const getList = () => {
  getChargingStatus().then((res) => {
    tableData.value = res.records
  })
}

onMounted(() => {
  getList()
  setChartOption(option)
})
</script>

<template>
  <div class="charge">
    <img src="@/assets/images/title/title-charge.png" alt="charge info" />
    <!-- 图表 -->
    <div ref="chartDom" style="width: 317px; height: 200px"></div>
    <div class="qtyn-line"></div>
    <ScrollTable
      :columns="columns"
      :data="tableData"
      :interval="2000"
      :visibleRows="6"
      side-highligth="row-item-right"
      class="charge__table"
    >
    </ScrollTable>
    <div class="qtyn-line"></div>
  </div>
</template>

<style lang="less" scoped>
@import url('@/assets/styles/table.less');

.charge {
  img {
    width: 100%;
  }

  &__table {
    width: 100%;
  }
}
</style>
