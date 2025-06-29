import { ref, onUnmounted } from 'vue'
import { loadBMapScript } from '@/utils/bmap.js'
import { useMapUtils } from '@/hooks/map/useMapUtils.js'
import { useControlStore } from '@/stores/control.js'

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
      if (!BMapGLLib) {
        throw new Error('加载百度地图脚本失败')
      }
      // 将BMapGLLib赋值给BMapGL
      BMapGL.value = BMapGLLib

      // 创建地图实例
      map.value = new BMapGLLib.Map(containerId, {
        minZoom: config.MIN_ZOOM,
        maxZoom: config.MAX_ZOOM,
      })

      // 使用地图工具方法
      const { setCenterAndZoom, setMapStyleV2, enableScrollWheelZoom, setTilt, onZoomChange, getZoom, onTilesloaded } = useMapUtils(
        map.value,
        BMapGL.value,
      )

      // 设置地图中心点和缩放级别
      setCenterAndZoom({ lng: config.LONGITUDE, lat: config.LATITUDE }, config.ZOOM)

      // 设置地图样式
      if (config.MAP_STYLE_ID) {
        setMapStyleV2(config.MAP_STYLE_ID)
      }

      // 启用滚轮缩放
      enableScrollWheelZoom(true)

      // 设置地图倾斜角度
      setTilt(config.TILT_ANGLE)

      // 监听地图缩放级别变化
      onZoomChange(() => {
        const control = useControlStore()
        control.changeZoom(getZoom())
      })

      // 加载完地图后执行回调
      onTilesloaded(() => {
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
    const { destroyMap } = useMapUtils(map.value, BMapGL.value)
    destroyMap()
    if (map.value) {
      map.value = null
      BMapGL.value = null
    }
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
