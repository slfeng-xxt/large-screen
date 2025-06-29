import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { debounce } from '@/utils/tool'

/**
 * ECharts 自适应 resize Hook
 * @param {HTMLElement} chartRef ECharts 容器引用
 * @param {echarts.ECharts} chartInstance ECharts 实例
 * @param {object} [options] 配置选项
 * @param {number} [options.delay=200] 防抖延迟(ms)
 * @param {boolean} [options.immediate=true] 是否立即执行一次resize
 */
export function useEchartsResize(chartRef, chartInstance, options = {}) {
  const { delay = 200, immediate = true } = options

  // 存储容器尺寸
  const dimensions = ref({ width: 0, height: 0 })

  // 防抖resize函数
  const debouncedResize = debounce(() => {
    if (chartInstance && !chartInstance.isDisposed()) {
      chartInstance.resize()
      dimensions.value = {
        width: chartRef.value?.clientWidth || 0,
        height: chartRef.value?.clientHeight || 0,
      }
    }
  }, delay)

  // 初始化监听
  const initResizeObserver = () => {
    if (!chartRef.value) return

    // 立即执行一次resize
    if (immediate) debouncedResize()

    // 创建ResizeObserver实例
    const observer = new ResizeObserver(debouncedResize)
    observer.observe(chartRef.value)

    // 返回清理函数
    return () => {
      observer.disconnect()
    }
  }

  // 组件挂载时开始监听
  onMounted(() => {
    const cleanup = initResizeObserver()

    // 组件卸载时清理
    onUnmounted(() => {
      cleanup?.()
      debouncedResize.cancel?.()
    })
  })

  // 当chartInstance变化时重新初始化
  watchEffect(() => {
    if (chartInstance) {
      initResizeObserver()
    }
  })

  return {
    dimensions,
  }
}
