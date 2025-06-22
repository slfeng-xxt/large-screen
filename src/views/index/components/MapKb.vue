<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useInitMap } from '@/hooks/map/useInitMap.js'
import { useMarker } from '@/hooks/map/useMarker'
import { useOverlay } from '@/hooks/map/useOverlay'
import { DEFAULT_CONFIG } from '@/config/index.js'

// 使用地图Hooks
const { map, BMapGL, initMap, destroyMap, isLoading } = useInitMap()

// 引入本地地图标注图标相关资源
// const mapImages = import.meta.glob('@/assets/images/map/*.png', { eager: true })

onMounted(async () => {
  try {
    // 初始化地图
    await initMap('bmap', DEFAULT_CONFIG)

    // map.value.loadMapStyleFiles(() => {
    //   console.log('地图样式加载完成')
    // })

    const { createInteractiveMarker } = useMarker(map.value, BMapGL.value)
    const { createTipOverlay } = useOverlay(map.value, BMapGL.value)

    // 创建交互式Marker
    // const point = new BMapGL.value.Point(DEFAULT_CONFIG.LONGITUDE, DEFAULT_CONFIG.LATITUDE)
    // createInteractiveMarker({
    //   image: mapImages['/src/assets/images/map/map-well-normal.png'].default,
    //   hoverImage: mapImages['/src/assets/images/map/map-well-yellow-normal.png'].default,
    //   pressedImage: mapImages['/src/assets/images/map/map-well-red-normal.png'].default,
    //   point,
    // })

    // 模拟多个Marker
    const markerPositions = [
      { lng: DEFAULT_CONFIG.LONGITUDE, lat: DEFAULT_CONFIG.LATITUDE },
      { lng: DEFAULT_CONFIG.LONGITUDE + 0.11, lat: DEFAULT_CONFIG.LATITUDE },
      { lng: DEFAULT_CONFIG.LONGITUDE, lat: DEFAULT_CONFIG.LATITUDE + 0.11 },
    ]

    markerPositions.forEach((pos) => {
      createInteractiveMarker({
        image: '/src/assets/images/map/map-well-normal.png',
        hoverImage: '/src/assets/images/map/map-well-hover.png',
        pressedImage: '/src/assets/images/map/map-well-pressed.png',
        point: new BMapGL.value.Point(pos.lng, pos.lat),
        content: `<h4>content</h4>`
      })
    })

    // 创建提示覆盖物
    createTipOverlay({
      point: { lng: 116.404, lat: 39.915 },
      title: '地图信息',
      text: '这是一个示例地图，支持Marker交互和覆盖物显示',
      imgSrc: 'https://bj.bcebos.com/v1/mapopen-pub-jsapigl/assets/images/gugong.png',
    })

  } catch (error) {
    console.error('地图部分功能加载失败:', error)
  }
})

onUnmounted(() => {
  // 销毁地图实例
  destroyMap()
})
</script>

<template>
  <!-- 百度地图 -->
  <div id="bmap">
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <div class="loading-text">地图加载中...</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#bmap {
  width: 100vw;
  height: 100vh;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #ccc;
  border-top: 5px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-text {
  font-size: 18px;
  color: #333;
}
::v-deep(.anchorBL img) {
  display: none;
}
</style>
