<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useInitMap } from '@/hooks/map/useInitMap.js'
import { useMarker } from '@/hooks/map/useMarker'
import { useOverlay } from '@/hooks/map/useOverlay'
import { useBezierCurve } from '@/hooks/map/useBezierCurve'
import { useUpdateOverlay } from '@/hooks/map/useUpdateOverlay'
import { DEFAULT_CONFIG } from '@/config/index.js'
import { OVERLAY_ENUM } from '@/utils/enum.js'
import { getMarkerPositions, getTransportRoutes, getTransportVehicles } from '@/utils/map-kb.js'
import { useControlStore } from '@/stores/control.js'
import AnimalDialog from '@/components/dialog/AnimalDialog.vue'

const control = useControlStore()

// 地图标注详情
const showDialog = ref(false)

// 使用地图Hooks
const { map, BMapGL, initMap, destroyMap, isLoading } = useInitMap()

// 存储覆盖物引用, 用于后续更新
const { overlayRefs, updateOverlay } = useUpdateOverlay()

// 存储定时器ID
const timerRef = ref(null)

// 引入本地地图标注图标相关资源
// const mapImages = import.meta.glob('@/assets/images/map/*.png', { eager: true })

// 模拟多个Marker
const markerPositions = getMarkerPositions()

// 模拟运输任务数据
const transportationTask = getTransportRoutes()

// 模拟运输任务小车信息数据
const transportationCar = getTransportVehicles()

watch(() => control.isShow, (val) => {
  showDialog.value = val
})

// 监听地图缩放
watch(() => Math.round(control.currentZoom), (newVal) => {
  console.log('newVal', newVal);
  // todo: 根据zoom值调整地图标注和覆盖物显示哪些
 // 根据地图缩放级别显示或隐藏覆盖物
 if (newVal >= 13) {
    // 显示所有覆盖物
    Object.values(overlayRefs.value).forEach((overlay) => {
      overlay.show()
    })
  } else {
    // 隐藏所有覆盖物
    Object.values(overlayRefs.value).forEach((overlay) => {
      overlay.hide()
  })
}
})

const createMarkerAndOverlay = () => {
  const { createInteractiveMarker } = useMarker(map.value, BMapGL.value)
    const { createTipOverlay } = useOverlay(map.value, BMapGL.value)
    const { createBezierCurve } = useBezierCurve(map.value, BMapGL.value)

    // 遍历 markerPositions 创建所有交互式Marker和覆盖物
    markerPositions.forEach((itemParams) => {
      createInteractiveMarker(itemParams)

      if (itemParams.overlayType) {
        // 创建覆盖物并保存引用
        const overlay = createTipOverlay(itemParams)
        // 默认隐藏覆盖物
        overlay.hide()

        // 保存覆盖物引用，以便后续更新
        if (itemParams.id) {
          overlayRefs.value[itemParams.id] = overlay
        }
      }
    })

    // 创建运输任务路线覆盖物
    transportationTask.forEach((itemParams) => {

      const path = [
        {
          lng: itemParams.startPoint.lng,
          lat: itemParams.startPoint.lat,
        },
        {
          lng: itemParams.endPoint.lng,
          lat: itemParams.endPoint.lat,
        },
      ]
      const controlPoints = [itemParams.controlPoints]

      createBezierCurve(path, controlPoints, {
        id: itemParams.id,
        taskStatus: itemParams.taskStatus, // 任务状态
      })
    })

    // 创建运输小车覆盖物
    transportationCar.forEach((itemParams) => {
      createInteractiveMarker({ ...itemParams, trigger: false, size: [50, 50], offset: [0, -70] })

      if (itemParams.overlayType) {
        // 创建覆盖物并保存引用
        const overlay = createTipOverlay(itemParams)
        // 默认隐藏覆盖物
        overlay.hide()

        // 保存覆盖物引用，以便后续更新
        if (itemParams.id) {
          overlayRefs.value[itemParams.id] = overlay
        }
      }
    })
}

const startTest = () => {
  // 这里仅作示例，实际项目中可能是通过WebSocket或轮询获取数据
  timerRef.value = setInterval(() => {
    // 模拟更新 markerPositions 中的覆盖物数据
    markerPositions.forEach((item) => {
      if (!item.id || !overlayRefs.value[item.id]) return
      // 模拟新的数据——运输类型覆盖物
      if (item.overlayType && item.overlayType === OVERLAY_ENUM.transportation) {
        const newTime = Math.floor(Math.random() * 30)
        const newProgressSoc = Math.floor(Math.random() * 10)
        const updataParams = {
          availableTime: newTime - 5, // 模拟减少5分钟
          expectedArriveTime: newTime,
          expectedArriveProgressSoc: newProgressSoc,
        }

        // 获取 markerPositions 中的id 并更新对应覆盖物
        updateOverlay(item.id, updataParams)
      }
    })
    // 模拟更新运输任务小车的覆盖物数据
    transportationCar.forEach((item) => {
      if (!item.id || !overlayRefs.value[item.id]) return
      // 模拟新的数据——运输类型覆盖物
      if (item.overlayType && item.overlayType === OVERLAY_ENUM.transportVehicle) {
        const newDistance = Math.floor(Math.random() * 50)
        const updataParams = {
          remainingtransportationDistance: newDistance,
          arrivedTime: `${Math.floor(newDistance / 10)}小时`, // 假设每10公里1小时
        }

        // 获取 markerPositions 中的id 并更新对应覆盖物
        updateOverlay(item.id, updataParams)
      }
    })
  }, 3000) // 每3秒更新一次
}

const stopTest = () => {
  // 清除定时器
  if (timerRef.value) {
    clearInterval(timerRef.value)
    timerRef.value = null
  }
}

onMounted(async () => {
  try {
    await initMap('bmap', DEFAULT_CONFIG)  // 初始化地图
    createMarkerAndOverlay() // 根据地图缩放级别显示覆盖物
    startTest() // 开始模拟数据更新
  } catch (error) {
    console.error('地图部分功能加载失败:', error)
  }
})

onUnmounted(() => {
  // 停止模拟数据更新
  stopTest()

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
    <div v-show="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <div class="loading-text">地图加载中...</div>
    </div>
    <animal-dialog v-bind:model-value="showDialog" ></animal-dialog>
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
// ::v-deep(.anchorBL img) {
//   display: none;
// }
</style>
