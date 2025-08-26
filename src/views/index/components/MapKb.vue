<script setup>
import { OVERLAY_ENUM, STATUS_ENUM, DIALOG_TASK_PROGRESS_ENUM } from '@/utils/enum.js'
import { DEFAULT_CONFIG } from '@/config/index.js'
import { useControlStore } from '@/stores/control.js'
// useBezierCurve
import { useInitMap, useMarker, useOverlay, useUpdateOverlay, useFlyLineLayer } from '@/hooks/map'
import { getMarkerPositions, getTransportRoutes } from '@/utils/map-kb.js'
import AnimalDialog from '@/components/dialog/AnimalDialog.vue'
import ProgressBar from '@/components/progress/ProgressBar.vue'
import WellCard from '@/views/index/dialog/WellCard.vue'
import CarCard from '@/views/index/dialog/CarCard.vue'
import WorkCard from '@/views/index/dialog/WorkCard.vue'
import ChargeCard from '@/views/index//dialog/ChargeCard.vue'

const control = useControlStore()

// 地图标注详情
const showDialog = ref(false)

// 弹窗状态
const dialogStatus = ref(STATUS_ENUM.normal)

// 弹窗进度stage
const dialogStage = ref(1)

// 使用地图Hooks
const { map, BMapGL, initMap, destroyMap, isLoading } = useInitMap()

// 存储覆盖物引用, 用于后续更新
const { overlayRefs, updateOverlay } = useUpdateOverlay()

// 存储定时器ID
const timerRef = ref(null)

// 引入本地地图标注图标相关资源
const mapImages = import.meta.glob('@/assets/images/map/*.png', { eager: true })

// 模拟多个Marker
const markerPositions = getMarkerPositions(mapImages)

// 模拟运输任务数据
const transportationTask = getTransportRoutes(mapImages)

// 模拟运输任务小车信息数据
// const transportationCar = getTransportVehicles(mapImages)

// 获取当前弹窗进度详情参数
const getDialogStage = () => {
  let stage
  switch (dialogStatus.value) {
    case STATUS_ENUM.arrived:
      stage = DIALOG_TASK_PROGRESS_ENUM.change
      break
    case STATUS_ENUM.exchange:
      stage = DIALOG_TASK_PROGRESS_ENUM.change
      break
    case STATUS_ENUM.pull:
      stage = DIALOG_TASK_PROGRESS_ENUM.pull
      break

    default:
      stage = DIALOG_TASK_PROGRESS_ENUM.transportation
      break
  }
  return stage
}

// 控制弹窗中是否有换电操作详情
const isShowWorkCard = computed(() => {
  return ![STATUS_ENUM.normal, STATUS_ENUM.pull].includes(dialogStatus.value)
})

// 控制弹窗中是否有电池拉回的情况
const isBackWork = computed(() => {
  return dialogStatus.value === STATUS_ENUM.pull
})

watch(
  () => control.isShow,
  (val) => {
    showDialog.value = val
    // TODO: 配置运输详情状态，控制详情页面显示; 调接口查详情
    if (val) {
      const curStatus = control.currentStatus
      const normalList = [STATUS_ENUM.normal, STATUS_ENUM.warning, STATUS_ENUM.error]
      if (normalList.includes(curStatus)) {
        dialogStatus.value = STATUS_ENUM.normal
      } else {
        dialogStatus.value = curStatus
      }
      dialogStage.value = getDialogStage()
    }
  },
)
const locationSize = {
  small: [18, 30], // 小型地点标注
  medium: [40, 70], // 中型地点标注
  large: [58, 104], // 大型地点标注
}

const locationOffset = {
  small: [0, -20], // 小型地点标注
  medium: [0, -50], // 中型地点标注
  large: [0, -60], // 大型地点标注
}

const carSize = {
  small: [0, 0], // 小型小车标注
  medium: [40, 40], // 中型小车标注
  large: [50, 50], // 大型小车标注
}

const watchCurrentZoomFn = (zoom) => {
  // 清除所有地点标注
  const { clearAllMarkers, markers } = useMarker(map.value, BMapGL.value)
  clearAllMarkers()
  // 根据地图缩放级别显示或隐藏覆盖物
  if (zoom >= 13) {
    // 重新创建地点标注
    createLocationMarker(locationSize.large, locationOffset.large)
    creatCarMarker(carSize.large)
    console.log('🚀 ~ markers:', markers)
    // 显示所有覆盖物
    Object.values(overlayRefs.value).forEach((overlay) => {
      overlay.show()
    })
  } else {
    // 重新创建地点标注
    createLocationMarker(locationSize.small, locationOffset.small)
    creatCarMarker(carSize.small)
    // 隐藏所有覆盖物
    Object.values(overlayRefs.value).forEach((overlay) => {
      overlay.hide()
    })
  }
}

// 监听地图缩放
watch(
  () => Math.round(control.currentZoom),
  (newVal) => {
    // todo: 根据zoom值调整地图标注和覆盖物显示哪些
    watchCurrentZoomFn(newVal)
  },
)

// 地点标注创建
const createLocationMarker = (size = locationSize.small, offset = locationOffset.small) => {
  const { createInteractiveMarker } = useMarker(map.value, BMapGL.value)

  // 遍历 markerPositions 创建所有交互式Marker和覆盖物
  markerPositions.forEach((itemParams) => {
    createInteractiveMarker({ ...itemParams, size, offset })
  })
}

// 地点标注覆盖物创建
const createLocationOverlay = () => {
  const { createTipOverlay } = useOverlay(map.value, BMapGL.value)

  markerPositions.forEach((itemParams) => {
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

// 任务路线创建
const createTransportationTask = () => {
  // const { createBezierCurve } = useBezierCurve(map.value, BMapGL.value)
  const { createFlyLineLayer } = useFlyLineLayer(map.value)

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
    // const controlPoints = [itemParams.controlPoints]

    // createBezierCurve(path, controlPoints, {
    //   id: itemParams.id,
    //   taskStatus: itemParams.taskStatus, // 任务状态
    // })
    const { lng, lat } = createFlyLineLayer(path, itemParams)
    itemParams.lng = lng
    itemParams.lat = lat
  })
}
// 小车标注创建
const creatCarMarker = (size = carSize.small) => {
  const { createInteractiveMarker } = useMarker(map.value, BMapGL.value)

  transportationTask.forEach((itemParams) => {
    createInteractiveMarker({ ...itemParams, trigger: false, size, offset: [0, -70] })
  })
}

const createCarOverlay = () => {
  const { createTipOverlay } = useOverlay(map.value, BMapGL.value)

  transportationTask.forEach((itemParams) => {
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
    transportationTask.forEach((item) => {
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
    await initMap('bmap', DEFAULT_CONFIG) // 初始化地图
    createLocationMarker() // 根据地图缩放级别显示覆盖物
    createLocationOverlay() // 创建地点标注覆盖物
    createTransportationTask() // 创建运输任务路线
    // creatCarMarker() // 创建小车标注
    createCarOverlay() // 创建小车覆盖物
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

  const { destroy } = useFlyLineLayer(map.value)
  destroy()

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
    <animal-dialog v-bind:model-value="showDialog">
      <template #content>
        <progress-bar
          :current-stage="dialogStage"
          distance="50km"
          surplus="25km"
          time="15分钟"
        ></progress-bar>
        <div class="content-main">
          <well-card :is-show="!isShowWorkCard"></well-card>
          <car-card :is-show="!isShowWorkCard"></car-card>
          <work-card
            v-if="isShowWorkCard"
            :is-work="dialogStatus === STATUS_ENUM.exchange"
          ></work-card>
        </div>
        <charge-card v-if="isBackWork"></charge-card>
      </template>
    </animal-dialog>
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

.content-main {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  margin-top: 84px;
}
</style>
