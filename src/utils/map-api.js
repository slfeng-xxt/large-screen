/**
 * 当前文件用于封装地图相关方法
 */

// params 参数非空校验方法
export const checkParams = (params) => {
  if (!params || Object.keys(params).length === 0) {
    throw new Error('请传入参数 params')
  }
}

// 计算经纬度的控制点
export const computedControlPoint = (startPoint, endPoint) => {
  const midLng = (startPoint.lng + endPoint.lng) / 2
  const midLat = (startPoint.lat + endPoint.lat) / 2
  return {
    lng: midLng - 0.05, // 控制点稍微偏左
    lat: midLat - 0.05, // 控制点稍微偏上
  }
}

// 计算地图缩放级别
export const getMapScale = (zoom) => {
  // zoom 非数字类型，则抛出异常
  if (typeof zoom !== 'number') {
    throw new Error('zoom 必须为数字类型')
  }
  let scale = 0
  switch (zoom) {
    case 1:
      scale = 10000000
      break
    case 2:
      scale = 5000000
      break
    case 3:
      scale = 2000000
      break
    case 4:
      scale = 1000000
      break
    case 5:
      scale = 500000
      break
    case 6:
      scale = 200000
      break
    case 7:
      scale = 100000
      break
    case 8:
      scale = 50000
      break
    case 9:
      scale = 25000
      break
    case 10:
      scale = 20000
      break
    case 11:
      scale = 10000
      break
    case 12:
      scale = 5000
      break
    case 13:
      scale = 2000
      break
    case 14:
      scale = 1000
      break
    case 15:
      scale = 500
      break
    case 16:
      scale = 200
      break
    case 17:
      scale = 100
      break
    case 18:
      scale = 50
      break
    case 19:
      scale = 20
      break
    default:
      scale = 0
      break
  }
  return scale
}
