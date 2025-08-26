import { View, LineLayer, BrightEffect, BezierCurve, IconLayer } from 'mapvgl'
// import { utilCityCenter } from 'mapv'
import proj4 from 'proj4'
import coordtransform from 'coordtransform'
import { STATUS_ENUM } from '@/utils/enum.js'

/**
 * 基于 mapvgl 绘制飞线
 */
export const useFlyLineLayer = (mapInstance) => {
  // mapvgl
  const mapvglView = ref(null)
  const layers = ref([])

  /**
   * 根据任务状态获取对应颜色
   * @param {string} status - 任务状态
   * @param {number} [opacity=1] - 颜色透明度
   * @returns {string} - RGBA 颜色字符串
   */
  const strokeColor = (status, opacity = 1) => {
    switch (status) {
      case STATUS_ENUM.normal:
        return `rgba(0, 254, 173, ${opacity})` // 绿色
      case STATUS_ENUM.warning:
        return `rgba(255, 255, 0, ${opacity})` // 黄色
      case STATUS_ENUM.error:
        return `rgba(255, 0, 0, ${opacity})` // 红色
      default:
        return `rgba(0, 254, 173, ${opacity})` // 默认绿色
    }
  }

  /**
   * 转换 Web Mercator 坐标为百度地图坐标 (BD09)
   * @param {Array<number>} webMercatorCoords - Web Mercator 坐标 [lng, lat]
   * @returns {Object|null} - 转换后的 BD09 坐标 { lng, lat }，无效输入返回 null
   */
  const convertWebMercatorToBD09 = (webMercatorCoords) => {
    if (!webMercatorCoords || webMercatorCoords.length < 2) return null

    // EPSG:3857 -> EPSG:4326 (WGS84)
    const [lng, lat] = proj4('EPSG:3857', 'EPSG:4326', [webMercatorCoords[0], webMercatorCoords[1]])

    // WGS84 -> GCJ02
    const gcj02 = coordtransform.wgs84togcj02(lng, lat)

    // GCJ02 -> BD09
    const bd09 = coordtransform.gcj02tobd09(gcj02[0], gcj02[1])

    return {
      lng: bd09[0],
      lat: bd09[1] + 0.17, // 偏差微调
    }
  }

  /**
   * 计算当前动画飞线进度坐标数据集
   * @param {Array} data - 原始坐标数据集
   * @param {number} progress - 进度比例 (0-1)
   * @returns {Array} - 截取后的坐标数据集
   */
  const getFlyLayerProgress = (data, progress) => {
    return data.slice(0, Math.ceil(data.length * progress))
  }

  /**
   * 计算当前小车坐标点
   * @param {Array} data - 原始坐标数据集
   * @param {number} progress - 进度比例 (0-1)
   * @returns {Array} - 当前进度对应的坐标点
   */
  const getPointProgress = (data, progress) => {
    return data[Math.floor(data.length * progress)]
  }

  /**
   * 获取 PointLayer 当前坐标并转换为 BD09
   * @param {Array<number>} webMercatorCoords - Web Mercator 坐标 [lng, lat]
   * @returns {Object|null} - 转换后的 BD09 坐标 { lng, lat }，无效输入返回 null
   */
  const getPointLayerCoordinatesAsBD09 = (webMercatorCoords) => {
    return convertWebMercatorToBD09(webMercatorCoords)
  }

  /**
   * 创建飞线图层
   * @param {Array} path - 飞线路径数据
   * @param {Object} params - 配置参数
   * @returns {Object} - 创建的图层实例
   */
  const createFlyLineLayer = (path, params) => {
    const { taskStatus = STATUS_ENUM.normal, taskProgress = 0, image } = params || {}
    // 创建MapVGL图层管理器
    mapvglView.value = new View({
      map: mapInstance,
      effects: [
        new BrightEffect({
          threshold: 0,
          blurSize: 2,
          clarity: 1,
        }),
      ],
    })
    // 创建可视化图层
    const lineLayer = new LineLayer({
      blend: 'lighter',
      width: 4,
      color: strokeColor(taskStatus, 0.4),
    })
    // 添加到图层管理器中
    mapvglView.value.addLayer(lineLayer)
    layers.value.push(lineLayer)

    // 准备好规范化坐标数据
    // 生成贝塞尔曲线坐标集
    // 1. 实例化贝塞尔曲线对象
    const curve = new BezierCurve()
    // 2. 设置起点和终点坐标
    const [start, end] = path
    // const start = utilCityCenter.getCenterByCityName('营口')
    // const end = utilCityCenter.getCenterByCityName('锦州')

    curve.setOptions({
      start: [start.lng, start.lat],
      end: [end.lng, end.lat],
    })
    // 3. 生成贝塞尔曲线坐标集
    const curveData = curve.getPoints()

    const data = [
      {
        geometry: {
          type: 'LineString',
          coordinates: curveData,
        },
      },
    ]
    // 关联图层与数据
    lineLayer.setData(data)

    // 创建当前进度的飞线图层
    const flyLayer = new LineLayer({
      blend: 'lighter',
      color: strokeColor(taskStatus),
      width: 4,
      animation: true,
      duration: 2, // 循环时间2s
      trailLength: 0.8, // 拖尾长度占间隔的0.8
      interval: 0.2, // 粒子长度占线整体长度的0.2
      data: [
        {
          geometry: {
            type: 'LineString',
            coordinates: getFlyLayerProgress(curveData, taskProgress),
          },
        },
      ],
    })
    mapvglView.value.addLayer(flyLayer)
    layers.value.push(flyLayer)

    // 生成当前小车坐标点
    const currentProgressPoint = getPointProgress(curveData, taskProgress)
    const carLayer = new IconLayer({
      width: 40,
      height: 20,
      offset: [0, -12],
      opacity: 0.7,
      icon: image,
      data: [
        {
          geometry: {
            type: 'Point',
            coordinates: currentProgressPoint,
          },
        },
      ],
    })
    mapvglView.value.addLayer(carLayer)
    layers.value.push(carLayer)

    return getPointLayerCoordinatesAsBD09(currentProgressPoint)
  }

  /**
   * 销毁所有图层实例
   */
  const destroy = () => {
    if (mapvglView.value) {
      mapvglView.value.destroy()
      mapvglView.value = null
      layers.value = []
    }
  }

  return {
    createFlyLineLayer,
    destroy,
  }
}
