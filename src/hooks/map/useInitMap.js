import { ref, onUnmounted } from 'vue'
import { loadBMapScript } from '@/utils/bmap.js'

/**
 * 地图API主Hook, 初始化地图
 * @returns {Object} 地图相关方法和状态
 */
export const useInitMap = () => {
  const map = ref(null)
  const BMapGL = ref(null)
  const isLoading = ref(true)
  const error = ref(null)

  // 初始化地图
  const initMap = async (containerId, config) => {
    try {
      isLoading.value = true
      error.value = null

      // 动态加载百度地图脚本
      const BMapGLLib = await loadBMapScript(config.BAIDU_MAP_KEY)
      BMapGL.value = BMapGLLib

      // 创建地图实例
      map.value = new BMapGL.value.Map(containerId)

      // 设置地图中心点和缩放级别
      const point = new BMapGL.value.Point(config.LONGITUDE, config.LATITUDE)
      map.value.centerAndZoom(point, config.ZOOM)

      // 设置地图样式
      if (config.MAP_STYLE_ID) {
        map.value.setMapStyleV2({ styleId: config.MAP_STYLE_ID })
      }

      // 启用滚轮缩放
      map.value.enableScrollWheelZoom(true)

      // 加载完地图后执行回调
      map.value.addEventListener('tilesloaded', () => {
        console.log('地图加载完成')
        isLoading.value = false
      })

      return map.value
    } catch (err) {
      error.value = err.message
      console.error('地图初始化失败:', err)
      throw err
    } finally {
      // isLoading.value = false
    }
  }

  // 清理地图
  const destroyMap = () => {
    if (map.value) {
      map.value.destroy()
      map.value = null
    }
    BMapGL.value = null
  }

  // 组件卸载时清理
  onUnmounted(() => {
    destroyMap()
  })

  return {
    map,
    BMapGL,
    isLoading,
    error,
    initMap,
    destroyMap,
  }
}
