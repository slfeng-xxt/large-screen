import { useResizeObserver } from '@vueuse/core'
import { debounce } from 'lodash-es'
import * as echarts from 'echarts'

export function useEcharts(containerRef) {
  const chartInstance = ref(null)

  // 防抖的resize处理
  const resizeHandler = debounce(() => {
    if (!chartInstance.value) return
    chartInstance.value.resize()
  }, 100)

  // 监听容器大小变化，自动调整图表大小
  useResizeObserver(containerRef.value, resizeHandler)

  // 初始化图表
  const initChart = () => {
    if (containerRef.value) {
      // Echarts 管理的状态和数据与 Vue 的响应式产生冲突，导致Echarts 无法正常更新而报错。取消代理
      chartInstance.value = markRaw(echarts.init(containerRef.value))
    }
  }

  // 图表数据设置
  const setChartOption = (newOptions) => {
    if (chartInstance.value) {
      chartInstance.value.setOption(newOptions)
    }
  }

  onMounted(() => {
    initChart()
  })

  onUnmounted(() => {
    if (chartInstance.value) {
      chartInstance.value.dispose()
      chartInstance.value = null
    }
    resizeHandler.cancel() // 清除防抖处理
  })

  return {
    chartInstance,
    initChart,
    setChartOption,
  }
}
