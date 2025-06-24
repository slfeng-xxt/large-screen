<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useInitMap } from '@/hooks/map/useInitMap.js'
import { useMarker } from '@/hooks/map/useMarker'
import { useOverlay } from '@/hooks/map/useOverlay'
import { DEFAULT_CONFIG } from '@/config/index.js'
import { OVERLAY_ENUM, STATUS_ENUM } from '@/utils/enum.js'

// 使用地图Hooks
const { map, BMapGL, initMap, destroyMap, isLoading } = useInitMap()

// 存储覆盖物引用
const overlayRefs = ref({})

// 存储定时器ID
const timerRef = ref(null)

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
    const { createTipOverlay, clearAllOverlays } = useOverlay(map.value, BMapGL.value)

    // 创建交互式Marker
    // const point = new BMapGL.value.Point(DEFAULT_CONFIG.LONGITUDE, DEFAULT_CONFIG.LATITUDE)
    // createInteractiveMarker({
    //   image: mapImages['/src/assets/images/map/map-well-normal.png'].default,
    //   hoverImage: mapImages['/src/assets/images/map/map-well-yellow-normal.png'].default,
    //   pressedImage: mapImages['/src/assets/images/map/map-well-red-normal.png'].default,
    //   point,
    // })

    // 创建提示覆盖物
    // createTipOverlay({
    //   point: { lng: DEFAULT_CONFIG.LONGITUDE, lat: DEFAULT_CONFIG.LATITUDE },
    //   title: '井上1',
    //   cardType: OVERLAY_ENUM.transportation, // 覆盖物类型：运输类型
    //   status: STATUS_ENUM.normal, // 运输状态
    //   availableTime: 30, // 电池剩余可用时间
    // })

    // 模拟多个Marker
    const markerPositions = [
      // 井上标注点
      {
        id: 'well1', // 标识符，用来查看详情
        lng: DEFAULT_CONFIG.LONGITUDE,
        lat: DEFAULT_CONFIG.LATITUDE,
        image: '/src/assets/images/map/map-well-normal.png',
        hoverImage: '/src/assets/images/map/map-well-hover.png',
        pressedImage: '/src/assets/images/map/map-well-pressed.png',
        // overlay
        title: '井上1',
        cardType: OVERLAY_ENUM.transportation, // 覆盖物类型：运输类型
        status: STATUS_ENUM.normal, // 运输状态
        availableTime: 30, // 电池剩余可用时间
        progressSOC: 22, // 运输预计到达时候电池剩余soc的百分比
        expectedArriveTime: 15, // 预计到达时间
        expectedArriveProgressSoc: 3, // 预计到达时候电池剩余soc的百分比
      },
      {
        id: 'well2', // 标识符，用来查看详情
        lng: DEFAULT_CONFIG.LONGITUDE + 0.11,
        lat: DEFAULT_CONFIG.LATITUDE,
        image: '/src/assets/images/map/map-well-yellow-normal.png',
        hoverImage: '/src/assets/images/map/map-well-yellow-hover.png',
        pressedImage: '/src/assets/images/map/map-well-yellow-pressed.png',
        // overlay
        title: '井上2',
        cardType: OVERLAY_ENUM.transportation, // 覆盖物类型：运输类型
        status: STATUS_ENUM.warning, // 运输状态
        availableTime: 30, // 电池剩余可用时间
        progressSOC: 22, // 运输预计到达时候电池剩余soc的百分比
        expectedArriveTime: 15, // 预计到达时间
        expectedArriveProgressSoc: 3, 
      },
      {
        id: 'well13', // 标识符，用来查看详情
        lng: DEFAULT_CONFIG.LONGITUDE,
        lat: DEFAULT_CONFIG.LATITUDE + 0.11,
        image: '/src/assets/images/map/map-well-red-normal.png',
        hoverImage: '/src/assets/images/map/map-well-red-hover.png',
        pressedImage: '/src/assets/images/map/map-well-red-pressed.png',
        //  overlay
        title: '井上3',
        cardType: OVERLAY_ENUM.transportation, // 覆盖物类型：运输类型
        status: STATUS_ENUM.error, // 运输状态
        availableTime: 30, // 电池剩余可用时间
      },
      // 充电站标注点
      {
        id: 'charge1', // 标识符，用来查看详情
        lng: DEFAULT_CONFIG.LONGITUDE + 0.22,
        lat: DEFAULT_CONFIG.LATITUDE - 0.11,
        image: '/src/assets/images/map/map-charge-normal.png',
        hoverImage: '/src/assets/images/map/map-charge-hover.png',
        pressedImage: '/src/assets/images/map/map-charge-pressed.png',
      },
      {
        id: 'charge2', // 标识符，用来查看详情
        lng: DEFAULT_CONFIG.LONGITUDE + 0.33,
        lat: DEFAULT_CONFIG.LATITUDE + 0.03,
        image: '/src/assets/images/map/map-charge-normal.png',
        hoverImage: '/src/assets/images/map/map-charge-hover.png',
        pressedImage: '/src/assets/images/map/map-charge-pressed.png',
      },
    ]

    markerPositions.forEach(
      ({
        id,
        image,
        hoverImage,
        pressedImage,
        lng,
        lat,
        title,
        cardType,
        status,
        availableTime,
        progressSOC,
        expectedArriveTime,
        expectedArriveProgressSoc
      }) => {
        createInteractiveMarker({
          image,
          hoverImage,
          pressedImage,
          point: new BMapGL.value.Point(lng, lat),
        })
        
        if (title) {
          // 创建覆盖物并保存引用
          const overlay = createTipOverlay({
            point: { lng, lat },
            title,
            cardType,
            status,
            availableTime,
            progressSOC,
            expectedArriveTime,
            expectedArriveProgressSoc
          })
          
          // 保存覆盖物引用，以便后续更新
          if (id) {
            overlayRefs.value[id] = overlay
          }
        }
      },
    )

    // 模拟实时更新数据 方法
    const updateOverlay = (id) => {
      // const well1Overlay = overlayRefs.value['well1']
      const well1Overlay = overlayRefs.value[id]

      // console.log('well1Overlay', well1Overlay);
      
      if (well1Overlay && well1Overlay._vueContainer) {
        const instance = well1Overlay._vueContainer._vueApp._instance
        // 获取实际的组件实例
        // const componentInstance = instance?.subTree?.component
        const componentInstance = instance.refs.overlayRef
        // console.log('Component instance:', componentInstance)
        
        // if (componentInstance?.exposed) {
        if (componentInstance) {
          const newTime = Math.floor(Math.random() * 30)
          const newProgressSoc = Math.floor(Math.random() * 10)
          // componentInstance.exposed.updateData({ expectedArriveTime: newTime, expectedArriveProgressSoc: newProgressSoc })
          componentInstance.updateData({ expectedArriveTime: newTime, expectedArriveProgressSoc: newProgressSoc })
          // console.log('Updated expectedArriveTime to:', newTime)
        } else {
          console.log('No exposed methods found on component')
        }
      }
    }
    // 这里仅作示例，实际项目中可能是通过WebSocket或轮询获取数据
    timerRef.value = setInterval(() => {
      // 获取 markerPositions 中的id 并更新对应覆盖物
      markerPositions.forEach(item => updateOverlay(item.id))
    }, 3000) // 每3秒更新一次

  } catch (error) {
    console.error('地图部分功能加载失败:', error)
  }
})

onUnmounted(() => {
  console.log('组件卸载');
  
  // 清除定时器
  if (timerRef.value) {
    clearInterval(timerRef.value)
    timerRef.value = null
  }
  
  // 清除所有覆盖物
  const { clearAllOverlays } = useOverlay(map.value, BMapGL.value)
  clearAllOverlays()
  
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
