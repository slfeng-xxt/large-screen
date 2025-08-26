import { STATUS_ENUM } from '@/utils/enum.js'
/**
 * @description: 创建贝塞尔曲线
 * @param {*} mapInstance
 * @param {*} BMapGLLib
 * @returns
 */
export const useBezierCurve = (mapInstance, BMapGLLib) => {
  const createBezierCurve = (path, controlPoints, params) => {
    if (path.length < 2 || !controlPoints.length) throw new Error('path or controlPoints is empty')

    const turnPoint = (lng, lat) => {
      return new BMapGLLib.Point(lng, lat)
    }

    const linePath = path.map((item) => turnPoint(item.lng, item.lat))

    // controlPoints = [[cp1, cp2], [cp4]]
    const linecontrolPoints = controlPoints.map((item) => {
      return item.map((cp) => turnPoint(cp.lng, cp.lat))
    })

    // 根据 taskStatus 状态展示不同颜色
    const { taskStatus = STATUS_ENUM.normal } = params || {}
    const strokeColor = (status) => {
      switch (status) {
        case STATUS_ENUM.normal:
          return '#00FEAD' // 绿色
        case STATUS_ENUM.warning:
          return '#FFFF00' // 黄色
        case STATUS_ENUM.error:
          return '#FF0000' // 红色
        default:
          return '#00FEAD' // 默认绿色
      }
    }

    const options = {
      strokeColor: strokeColor(taskStatus),
      strokeWeight: 3,
      strokeStyle: 'dashed',
      strokeOpacity: 0.5,
    }

    const curve = new BMapGLLib.BezierCurve(linePath, linecontrolPoints, options)
    mapInstance.addOverlay(curve)

    return curve
  }

  return {
    createBezierCurve,
  }
}
