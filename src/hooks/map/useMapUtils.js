/**
 * 地图工具Hook
 * @param {Object} mapInstance - 地图实例
 * @param {Object} BMapGLLib - 百度地图库
 * @returns {Object} 地图工具方法
 */
export const useMapUtils = (mapInstance, BMapGLLib) => {
  // 设置地图中心点
  const setCenter = (lng, lat) => {
    const point = new BMapGLLib.Point(lng, lat)
    mapInstance.setCenter(point)
  }

  // 设置缩放级别
  const setZoom = (zoom) => {
    mapInstance.setZoom(zoom)
  }

  // 启用/禁用滚轮缩放
  const enableScrollWheelZoom = (enable = true) => {
    mapInstance.enableScrollWheelZoom(enable)
  }

  // 设置地图样式
  const setMapStyle = (styleId) => {
    mapInstance.setMapStyleV2({ styleId })
  }

  // 获取地图边界
  const getBounds = () => {
    return mapInstance.getBounds()
  }

  // 获取当前中心点
  const getCenter = () => {
    return mapInstance.getCenter()
  }

  // 获取当前缩放级别
  const getZoom = () => {
    return mapInstance.getZoom()
  }

  return {
    setCenter,
    setZoom,
    enableScrollWheelZoom,
    setMapStyle,
    getBounds,
    getCenter,
    getZoom,
  }
}
