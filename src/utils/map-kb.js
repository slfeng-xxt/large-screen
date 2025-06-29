/**
 * @fileOverview MapKb组件相关数据处理
 */
import { DEFAULT_CONFIG } from '@/config/index.js'
import { OVERLAY_ENUM, STATUS_ENUM } from '@/utils/enum.js'
import { computedControlPoint } from '@/utils/map-api.js'

// 标注点接口数据转换
export const getMarkerPositions = () => {
  // TODO: 这里可以根据实际情况从接口获取数据并转换为标注点数据
  return [
    // 井上标注点
    {
      id: 'well1', // 标识符，用来查看详情
      lng: DEFAULT_CONFIG.LONGITUDE,
      lat: DEFAULT_CONFIG.LATITUDE,
      image: '/src/assets/images/map/map-well-yellow-normal.png',
      hoverImage: '/src/assets/images/map/map-well-yellow-hover.png',
      pressedImage: '/src/assets/images/map/map-well-yellow-pressed.png',
      // overlay
      title: '井上1',
      overlayType: OVERLAY_ENUM.transportation, // 覆盖物类型：运输类型
      status: STATUS_ENUM.warning, // 运输状态
      availableTime: 30, // 电池剩余可用时间
      progressSOC: 22, // 运输预计到达时候电池剩余soc的百分比
      expectedArriveTime: 15, // 预计到达时间
      expectedArriveProgressSoc: 3, // 预计到达时候电池剩余soc的百分比
    },
    {
      id: 'well2', // 标识符，用来查看详情
      lng: DEFAULT_CONFIG.LONGITUDE + 0.11,
      lat: DEFAULT_CONFIG.LATITUDE,
      image: '/src/assets/images/map/map-well-normal.png',
      hoverImage: '/src/assets/images/map/map-well-hover.png',
      pressedImage: '/src/assets/images/map/map-well-pressed.png',
      // overlay
      title: '井上2',
      overlayType: OVERLAY_ENUM.transportation, // 覆盖物类型：运输类型
      status: STATUS_ENUM.normal, // 运输状态
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
      overlayType: OVERLAY_ENUM.transportation, // 覆盖物类型：运输类型
      status: STATUS_ENUM.error, // 运输状态
      availableTime: 30, // 电池剩余可用时间
    },
    {
      id: 'well14', // 标识符，用来查看详情
      lng: DEFAULT_CONFIG.LONGITUDE + 0.22,
      lat: DEFAULT_CONFIG.LATITUDE + 0.11,
      image: '/src/assets/images/map/map-well-normal.png',
      hoverImage: '/src/assets/images/map/map-well-hover.png',
      pressedImage: '/src/assets/images/map/map-well-pressed.png',
      //  overlay
      title: '井上4',
      overlayType: OVERLAY_ENUM.transArrived, // 覆盖物类型：运输类型
      status: STATUS_ENUM.exchange, // 运输状态
      operator: 'Alex', // 操作员
      phone: '12345678901', // 联系电话
      completionTime: '12:00:00', // 预计切换完成时间
    },
    {
      id: 'well15', // 标识符，用来查看详情
      lng: DEFAULT_CONFIG.LONGITUDE + 0.12,
      lat: DEFAULT_CONFIG.LATITUDE + 0.11,
      image: '/src/assets/images/map/map-well-normal.png',
      hoverImage: '/src/assets/images/map/map-well-hover.png',
      pressedImage: '/src/assets/images/map/map-well-pressed.png',
      //  overlay
      title: '井上5',
      overlayType: OVERLAY_ENUM.transArrived, // 覆盖物类型：运输类型
      status: STATUS_ENUM.arrived, // 运输状态
      operator: 'TOM', // 操作员
      phone: '12345678901', // 联系电话
      completionTime: '12:00:00', // 预计切换完成时间
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
}

// 模拟一条运输路线数据
const start2end = {
  start: {
    lng: DEFAULT_CONFIG.LONGITUDE + 0.22,
    lat: DEFAULT_CONFIG.LATITUDE - 0.11,
  },
  end: {
    lng: DEFAULT_CONFIG.LONGITUDE,
    lat: DEFAULT_CONFIG.LATITUDE,
  },
}

// 获取运输路线数据
export const getTransportRoutes = () => {
  // TODO: 这里可以根据实际情况从接口获取数据并转换为运输路线数据
  return [
    {
      id: 'transport1', // 标识符，用来查看详情
      taskStatus: STATUS_ENUM.warning, // 任务状态
      startPoint: start2end.start,
      endPoint: start2end.end,
      controlPoints: [computedControlPoint(start2end.start, start2end.end)],
    },
  ]
}

// 获取运输任务车辆信息
export const getTransportVehicles = () => {
  // TODO: 这里可以根据实际情况从接口获取数据并转换为运输任务车辆信息
  return [
    {
      id: 'car1', // 标识符，用来查看详情
      lng: (start2end.start.lng + start2end.end.lng) / 2 - 0.04,
      lat: (start2end.start.lat + start2end.end.lat) / 2 - 0.04,
      image: '/src/assets/images/map/map-car-left-yellow.png',
      // image: '/src/assets/images/map/map-car-left-normal.png',
      // overlay
      overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
      status: STATUS_ENUM.warning, // 运输状态
      totalTransportationDistance: 50, // 总运输距离
      remainingtransportationDistance: 20, // 剩余运输的距离
      arrivedTime: '1小时', // 预计到达时间
    },
  ]
}
