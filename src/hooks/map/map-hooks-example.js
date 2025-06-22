/**
 * 地图Hooks使用示例
 * 展示如何在Vue组件中使用新的地图Hooks
 */

import { onMounted } from 'vue'
import { useInitMap } from '@/hooks/map/useInitMap.js'
import { useMarker } from '@/hooks/map/useMarker'
import { useOverlay } from '@/hooks/map/useOverlay'
import { useMapUtils } from '@/hooks/map/useMapUtils'
import { DEFAULT_CONFIG } from '@/config/index.js'

// 示例1: 基础地图初始化
export const useBasicMap = () => {
  const { map, BMapGL, isLoading, error, initMap, destroyMap } = useInitMap()

  const setupMap = async () => {
    try {
      await initMap('bmap', DEFAULT_CONFIG)
      console.log('地图初始化成功')
    } catch (err) {
      console.error('地图初始化失败:', err)
    }
  }

  onMounted(() => {
    setupMap()
  })

  return {
    map,
    BMapGL,
    isLoading,
    error,
    destroyMap
  }
}

// 示例2: 带Marker的地图
export const useMapWithMarkers = () => {
  const { map, BMapGL, isLoading, error, initMap } = useInitMap()
  const { markers, createMarkerIcon, createInteractiveMarker, clearAllMarkers } = useMarker(map, BMapGL)

  const setupMapWithMarkers = async () => {
    try {
      await initMap('bmap', DEFAULT_CONFIG)
      
      // 创建普通Marker
      const point = new BMapGL.value.Point(DEFAULT_CONFIG.LONGITUDE, DEFAULT_CONFIG.LATITUDE)
      createMarkerIcon({
        image: '/src/assets/images/map/map-well-normal.png',
        point
      })

      // 创建交互式Marker
      createInteractiveMarker({
        image: '/src/assets/images/map/map-well-normal.png',
        hoverImage: '/src/assets/images/map/map-well-hover.png',
        pressedImage: '/src/assets/images/map/map-well-pressed.png',
        point: new BMapGL.value.Point(DEFAULT_CONFIG.LONGITUDE + 0.01, DEFAULT_CONFIG.LATITUDE)
      })

      console.log('地图和Marker设置成功')
    } catch (err) {
      console.error('设置失败:', err)
    }
  }

  onMounted(() => {
    setupMapWithMarkers()
  })

  return {
    map,
    BMapGL,
    isLoading,
    error,
    markers,
    clearAllMarkers
  }
}

// 示例3: 带覆盖物的地图
export const useMapWithOverlays = () => {
  const { map, BMapGL, isLoading, error, initMap } = useInitMap()
  const { overlays, createTipOverlay, clearAllOverlays } = useOverlay(map, BMapGL)

  const setupMapWithOverlays = async () => {
    try {
      await initMap('bmap', DEFAULT_CONFIG)
      
      // 创建提示覆盖物
      createTipOverlay({
        point: { lng: DEFAULT_CONFIG.LONGITUDE, lat: DEFAULT_CONFIG.LATITUDE },
        title: '示例位置',
        text: '这是一个示例覆盖物，支持鼠标悬停效果',
        imgSrc: 'https://bj.bcebos.com/v1/mapopen-pub-jsapigl/assets/images/gugong.png'
      })

      console.log('地图和覆盖物设置成功')
    } catch (err) {
      console.error('设置失败:', err)
    }
  }

  onMounted(() => {
    setupMapWithOverlays()
  })

  return {
    map,
    BMapGL,
    isLoading,
    error,
    overlays,
    clearAllOverlays
  }
}

// 示例4: 完整的地图功能
export const useFullMap = () => {
  const { map, BMapGL, isLoading, error, initMap } = useInitMap()
  const { markers, createInteractiveMarker, clearAllMarkers } = useMarker(map, BMapGL)
  const { overlays, createTipOverlay, clearAllOverlays } = useOverlay(map, BMapGL)
  const { setCenter, setZoom, enableScrollWheelZoom, getCenter, getZoom } = useMapUtils(map, BMapGL)

  const setupFullMap = async () => {
    try {
      await initMap('bmap', DEFAULT_CONFIG)
      
      // 设置地图工具
      enableScrollWheelZoom(true)
      
      // 创建多个交互式Marker
      const markerPositions = [
        { lng: DEFAULT_CONFIG.LONGITUDE, lat: DEFAULT_CONFIG.LATITUDE },
        { lng: DEFAULT_CONFIG.LONGITUDE + 0.01, lat: DEFAULT_CONFIG.LATITUDE },
        { lng: DEFAULT_CONFIG.LONGITUDE, lat: DEFAULT_CONFIG.LATITUDE + 0.01 }
      ]

      markerPositions.forEach((pos) => {
        createInteractiveMarker({
          image: '/src/assets/images/map/map-well-normal.png',
          hoverImage: '/src/assets/images/map/map-well-hover.png',
          pressedImage: '/src/assets/images/map/map-well-pressed.png',
          point: new BMapGL.value.Point(pos.lng, pos.lat)
        })
      })

      // 创建提示覆盖物
      createTipOverlay({
        point: { lng: DEFAULT_CONFIG.LONGITUDE, lat: DEFAULT_CONFIG.LATITUDE },
        title: '示例位置',
        text: '这是一个示例覆盖物，支持鼠标悬停效果',
        imgSrc: 'https://bj.bcebos.com/v1/mapopen-pub-jsapigl/assets/images/gugong.png'
      })

      console.log('完整地图功能设置成功')
    } catch (err) {
      console.error('设置失败:', err)
    }
  }

  onMounted(() => {
    setupFullMap()
  })

  return {
    map,
    BMapGL,
    isLoading,
    error,
    markers,
    overlays,
    clearAllMarkers,
    clearAllOverlays,
    setCenter,
    setZoom,
    getCenter,
    getZoom
  }
} 