import { checkParams } from '@/utils/map-api'
import { cardTypeMap, cleanupOverlay } from '@/utils/createOverlayDom'
/**
 * 自定义覆盖物Hook
 * @param {Object} mapInstance - 地图实例
 * @param {Object} BMapGLLib - 百度地图库
 * @returns {Object} 覆盖物相关方法
 */
export const useOverlay = (mapInstance, BMapGLLib) => {
  const overlays = ref([])

  // 创建带提示信息的覆盖物
  const createTipOverlay = (params) => {
    checkParams(params)
    const { lng, lat, overlayType = 'demo', opacity = 0.5, offsetY = -140 } = params

    // 补充参数
    params.zIndex = BMapGLLib.Overlay.getZIndex(lat)

    // 获取对应类型的覆盖物DOM方法
    const customDom = cardTypeMap[overlayType]

    // 先生成 container
    const container = customDom(params)

    // 创建自定义覆盖物
    // const customOverlay = new BMapGLLib.CustomOverlay(customDom.bind(null, params), {})
    const customOverlay = new BMapGLLib.CustomOverlay(() => container, {
      point: new BMapGLLib.Point(lng, lat),
      opacity,
      offsetY,
      // properties: { title }, // demo原来的传递属性，可废弃
    })

    // 保存原始参数和container到覆盖物实例上
    customOverlay._params = params
    customOverlay._vueContainer = container

    mapInstance.addOverlay(customOverlay)
    overlays.value.push(customOverlay)

    return customOverlay
  }

  // 移除覆盖物
  const removeOverlay = (overlay) => {
    if (overlay) {
      // 清理Vue组件（如果有）
      // 对于自定义覆盖物，我们直接使用 _vueContainer
      const container = overlay._vueContainer || overlay.getContainer?.()
      if (container) {
        cleanupOverlay(container)
      }

      mapInstance.removeOverlay(overlay)
      const index = overlays.value.indexOf(overlay)
      if (index > -1) {
        overlays.value.splice(index, 1)
      }
    }
  }

  // 清理所有覆盖物
  const clearAllOverlays = () => {
    overlays.value.forEach((overlay) => {
      removeOverlay(overlay)
    })
    overlays.value = []
  }

  return {
    overlays,
    createTipOverlay,
    removeOverlay,
    clearAllOverlays,
  }
}
