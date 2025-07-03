import { ref } from 'vue'
import { checkParams } from '@/utils/map-api'
/**
 * Marker标记点Hook
 * 百度地图API参考文档：https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b2
 * @param {Object} mapInstance - 地图实例
 * @param {Object} BMapGLLib - 百度地图库
 * @returns {Object} Marker相关方法
 */
export const useMarker = (mapInstance, BMapGLLib) => {
  const markers = ref([])
  const infoWindow = ref(null)

  // 创建图文信息窗口
  // const createInfoWindow = (params) => {
  //   checkParams(params)
  //   const { content } = params
  //   if (content) {
  //     infoWindow.value = new BMapGLLib.InfoWindow(content)
  //   }
  // }

  // 创建单个Marker图标
  const createMarkerIcon = (params) => {
    checkParams(params)
    const { image, point, size = [58, 104], offset = [0, -40] } = params

    const newSize = new BMapGLLib.Size(size[0], size[1]) // 设置图标大小
    const newOffset = new BMapGLLib.Size(offset[0], offset[1]) // 设置偏移量，使图标底部对齐点位置

    // size: 图片大小
    const myIcon = new BMapGLLib.Icon(image, newSize)
    // myIcon.setImageSize(size) // BMapGLLib.Icon方法中，图片大小默认为图片原始大小，需要手动设置

    // TODO: 地图放大时点标注（marker）变大，缩小时变小
    const marker = new BMapGLLib.Marker(point, { icon: myIcon, offset: newOffset })

    mapInstance.addOverlay(marker)
    markers.value.push(marker)

    return marker
  }

  // 创建交互式Marker（支持hover和click状态）
  const createInteractiveMarker = (params) => {
    checkParams(params)
    const { image, hoverImage, pressedImage, lng, lat, trigger = true } = params
    const point = new BMapGLLib.Point(lng, lat)

    let currentMarker = null
    let currentState = 'normal' // 'normal', 'hover', 'pressed'

    // 显示hover状态
    const showHover = () => {
      console.log('🚀 ~ mouseover: 显示hover状态')
      if (currentMarker) {
        removeMarker(currentMarker)
      }

      currentMarker = createMarkerIcon({ image: hoverImage, point })
      currentState = 'hover'

      // 绑定事件
      currentMarker.addEventListener('mouseout', showNormal, { passive: true })
      currentMarker.addEventListener('click', showPressed, { passive: true })
    }

    // 显示正常状态
    const showNormal = () => {
      console.log('🚀 ~ mouseout: 恢复正常状态')
      if (currentMarker) {
        removeMarker(currentMarker)
      }

      currentMarker = createMarkerIcon({ image, point })
      currentState = 'normal'

      // 重新绑定鼠标经过事件
      currentMarker.addEventListener('mouseover', showHover, { passive: true })
    }

    // 显示pressed状态
    const showPressed = () => {
      console.log('🚀 ~ click: 显示pressed状态')
      if (currentMarker) {
        removeMarker(currentMarker)
      }

      currentMarker = createMarkerIcon({ image: pressedImage, point })
      currentState = 'pressed'

      // 打开信息窗口
      if (infoWindow.value) {
        mapInstance.openInfoWindow(infoWindow.value, point)
      }

      // 点击恢复hover状态
      currentMarker.addEventListener(
        'click',
        () => {
          console.log('🚀 ~ click: 恢复hover状态')
          if (currentMarker) {
            removeMarker(currentMarker)
          }

          currentMarker = createMarkerIcon({ image: hoverImage, point })
          currentState = 'hover'

          // 重新绑定事件
          currentMarker.addEventListener('mouseout', showNormal, { passive: true })
          currentMarker.addEventListener('click', showPressed, { passive: true })
        },
        { passive: true },
      )
    }

    // 初始化正常状态
    currentMarker = createMarkerIcon({ point, ...params })
    if (trigger) {
      currentMarker.addEventListener('mouseover', showHover, { passive: true })
    }

    // 创建信息窗口
    // createInfoWindow({ '123' })

    return {
      marker: currentMarker,
      state: currentState,
      remove: () => {
        if (currentMarker) {
          removeMarker(currentMarker)
          currentMarker = null
        }
      },
    }
  }

  // 设置Marker动画效果
  const setMarkerAnimation = (marker, animation) => {
    checkParams(marker)
    marker.setAnimation(animation)
  }

  // 取消Marker动画效果
  const cancelMarkerAnimation = (marker) => {
    checkParams(marker)
    marker.setAnimation(null)
  }

  // 移除Marker
  const removeMarker = (marker) => {
    checkParams(marker)

    const hashcode = marker.hashCode
    const overlaysList = mapInstance.getOverlays()

    // 检查marker是否在地图上
    if (!overlaysList.some((overlay) => overlay.hashCode === hashcode)) {
      console.warn('Marker does not exist on the map.')
      return
    }

    // 获取并移除marker
    const overlayToRemove = overlaysList.find((overlay) => overlay.hashCode === hashcode)
    mapInstance.removeOverlay(overlayToRemove)

    // 从本地数组中移除
    const index = markers.value.findIndex((m) => m.hashCode === hashcode)
    if (index > -1) {
      markers.value.splice(index, 1)
    }
  }

  // 清理所有markers
  const clearAllMarkers = () => {
    markers.value.forEach((marker) => {
      removeMarker(marker)
    })
    markers.value = []
  }

  return {
    markers,
    createMarkerIcon,
    createInteractiveMarker,
    setMarkerAnimation,
    cancelMarkerAnimation,
    removeMarker,
    clearAllMarkers,
  }
}
