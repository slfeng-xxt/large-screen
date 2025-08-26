/**
 * @fileOverview MapKb组件相关数据处理
 */
import { OVERLAY_ENUM, STATUS_ENUM } from '@/utils/enum.js'
// import { DEFAULT_CONFIG } from '@/config/index.js'
// import { computedControlPoint } from '@/utils/map-api.js'

const markerPositions = {
  // 井上标注点
  well1: {
    lng: 118.996877,
    lat: 32.158785,
  },
  well2: {
    lng: 118.746286,
    lat: 32.189116,
  },
  well3: {
    lng: 118.974509,
    lat: 32.074253,
  },
  well4: {
    lng: 118.584019,
    lat: 32.191989,
  },
  well5: {
    lng: 118.508359,
    lat: 32.036848,
  },
  // 充电站标注点
  charge1: {
    lng: 118.796877,
    lat: 32.060255,
  },
}
// 标注点接口数据转换
export const getMarkerPositions = (mapImages) => {
  const getImageUrl = (url) => (mapImages[url] ? mapImages[url].default : url)
  // TODO: 这里可以根据实际情况从接口获取数据并转换为标注点数据

  return [
    // 井上标注点
    {
      // 油井位置一 状态：有运输任务，正常运输
      id: 'well1', // 标识符，用来查看详情
      lng: markerPositions.well1.lng,
      lat: markerPositions.well1.lat,
      image: getImageUrl('/src/assets/images/map/map-well-normal.png'),
      hoverImage: getImageUrl('/src/assets/images/map/map-well-hover.png'),
      pressedImage: getImageUrl('/src/assets/images/map/map-well-pressed.png'),
      // overlay
      title: '井上1',
      overlayType: OVERLAY_ENUM.transportation, // 覆盖物类型：运输类型
      status: STATUS_ENUM.normal, // 运输状态
      availableTime: 30, // 电池剩余可用时间
      progressSOC: 22, // 运输预计到达时候电池剩余soc的百分比
      expectedArriveTime: 15, // 预计到达时间
      expectedArriveProgressSoc: 3, // 预计到达时候电池剩余soc的百分比
    },
    {
      // 油井位置二   状态：有运输任务，黄色警告
      id: 'well2', // 标识符，用来查看详情
      lng: markerPositions.well2.lng,
      lat: markerPositions.well2.lat,
      image: getImageUrl('/src/assets/images/map/map-well-yellow-normal.png'),
      hoverImage: getImageUrl('/src/assets/images/map/map-well-yellow-hover.png'),
      pressedImage: getImageUrl('/src/assets/images/map/map-well-yellow-pressed.png'),
      // overlay
      title: '井上2',
      overlayType: OVERLAY_ENUM.transportation, // 覆盖物类型：运输类型
      status: STATUS_ENUM.warning, // 运输状态
      availableTime: 30, // 电池剩余可用时间
      progressSOC: 22, // 运输预计到达时候电池剩余soc的百分比
      expectedArriveTime: 15, // 预计到达时间
      expectedArriveProgressSoc: 3,
    },
    {
      // 油井位置三      状态：有运输任务，红色警告
      id: 'well13', // 标识符，用来查看详情
      lng: markerPositions.well3.lng,
      lat: markerPositions.well3.lat,
      image: getImageUrl('/src/assets/images/map/map-well-red-normal.png'),
      hoverImage: getImageUrl('/src/assets/images/map/map-well-red-hover.png'),
      pressedImage: getImageUrl('/src/assets/images/map/map-well-red-pressed.png'),
      //  overlay
      title: '井上3',
      overlayType: OVERLAY_ENUM.transportation, // 覆盖物类型：运输类型
      status: STATUS_ENUM.error, // 运输状态
      availableTime: 30, // 电池剩余可用时间
    },
    {
      // 油井位置四     状态：无运输任务，红色，当前未有换电安排
      id: 'well14', // 标识符，用来查看详情
      lng: markerPositions.well4.lng,
      lat: markerPositions.well4.lat,
      image: getImageUrl('/src/assets/images/map/map-well-red-normal.png'),
      hoverImage: getImageUrl('/src/assets/images/map/map-well-red-hover.png'),
      pressedImage: getImageUrl('/src/assets/images/map/map-well-red-pressed.png'),
      //  overlay
      title: '油井4',
      overlayType: OVERLAY_ENUM.wellErrorOverlay, // 覆盖物类型：【井上】无运输任务异常状态
      availableTime: 102, // 电池剩余可用时间
      progressSOC: 22, // 运输预计到达时候电池剩余soc的百分比
    },
    {
      // 油井位置五     状态：有运输任务，电池拉回
      id: 'well15', // 标识符，用来查看详情
      lng: markerPositions.well5.lng,
      lat: markerPositions.well5.lat,
      image: getImageUrl('/src/assets/images/map/map-well-normal.png'),
      hoverImage: getImageUrl('/src/assets/images/map/map-well-hover.png'),
      pressedImage: getImageUrl('/src/assets/images/map/map-well-pressed.png'),
      //  overlay
      title: '井上5',
      overlayType: OVERLAY_ENUM.transArrived, // 覆盖物类型：运输类型
      status: STATUS_ENUM.pull, // 运输状态
      operator: 'TOM', // 操作员
      phone: '12345678901', // 联系电话
      completionTime: '12:00:00', // 预计切换完成时间
    },
    // 充电站标注点
    {
      id: 'charge1', // 标识符，用来查看详情
      lng: markerPositions.charge1.lng,
      lat: markerPositions.charge1.lat,
      image: getImageUrl('/src/assets/images/map/map-charge-normal.png'),
      hoverImage: getImageUrl('/src/assets/images/map/map-charge-hover.png'),
      pressedImage: getImageUrl('/src/assets/images/map/map-charge-pressed.png'),
      //  overlay
      title: '充电站3',
      overlayType: OVERLAY_ENUM.chargingStation, // 覆盖物类型：充电站类型
      linkman: '张三', // 联系人
      phone: '12345678901', // 联系电话
      electricQuantity: 800, // 电量
      money: 700, // 金额
      leisureNumber: 2,
      batteryList: [
        {
          num: '01',
          power: 100,
          soc: 100,
        },
        {
          num: '02',
          power: 100,
          soc: 100,
        },
      ],
    },
  ]
}

// 模拟一条运输路线数据【 warning 】
const start2end = {
  start: {
    lng: markerPositions.charge1.lng,
    lat: markerPositions.charge1.lat,
  },
  end: {
    lng: markerPositions.well2.lng,
    lat: markerPositions.well2.lat,
  },
}

// 模拟一条运输路线数据【 normal 】
const start2endNormal = {
  start: {
    lng: markerPositions.charge1.lng,
    lat: markerPositions.charge1.lat,
  },
  end: {
    lng: markerPositions.well1.lng,
    lat: markerPositions.well1.lat,
  },
}
// 模拟一条运输路线数据【 error 】
const start2endError = {
  start: {
    lng: markerPositions.charge1.lng,
    lat: markerPositions.charge1.lat,
  },
  end: {
    lng: markerPositions.well3.lng,
    lat: markerPositions.well3.lat,
  },
}

// 模拟一条运输路线数据【 arrived 】
// const start2endArrived = {
//   start: {
//     lng: DEFAULT_CONFIG.LONGITUDE + 0.33,
//     lat: DEFAULT_CONFIG.LATITUDE + 0.03,
//   },
//   end: {
//     lng: DEFAULT_CONFIG.LONGITUDE + 0.12,
//     lat: DEFAULT_CONFIG.LATITUDE + 0.11,
//   },
// }

// // 模拟一条运输路线数据【 exchange 】
// const start2endExchange = {
//   start: {
//     lng: DEFAULT_CONFIG.LONGITUDE + 0.33,
//     lat: DEFAULT_CONFIG.LATITUDE + 0.03,
//   },
//   end: {
//     lng: DEFAULT_CONFIG.LONGITUDE + 0.22,
//     lat: DEFAULT_CONFIG.LATITUDE + 0.11,
//   },
// }

// 模拟一条运输路线数据【 back  】
const start2endBack = {
  start: {
    lng: markerPositions.well5.lng,
    lat: markerPositions.well5.lat,
  },
  end: {
    lng: markerPositions.charge1.lng,
    lat: markerPositions.charge1.lat,
  },
}

// 获取运输路线数据
export const getTransportRoutes = (mapImages) => {
  const getImageUrl = (url) => (mapImages[url] ? mapImages[url].default : url)
  // TODO: 这里可以根据实际情况从接口获取数据并转换为运输路线数据
  return [
    {
      id: 'transport1', // 标识符，用来查看详情
      taskStatus: STATUS_ENUM.warning, // 任务状态
      startPoint: start2end.start,
      endPoint: start2end.end,
      taskProgress: 0.8,
      image: getImageUrl('/src/assets/images/map/map-car-left-yellow.png'),
      // overlay
      overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
      status: STATUS_ENUM.warning, // 运输状态
      totalTransportationDistance: 50, // 总运输距离
      remainingtransportationDistance: 20, // 剩余运输的距离
      arrivedTime: '1小时', // 预计到达时间
    },
    {
      id: 'transport2', // 标识符，用来查看详情
      taskStatus: STATUS_ENUM.normal, // 任务状态
      startPoint: start2endNormal.start,
      endPoint: start2endNormal.end,
      taskProgress: 0.6,
      image: getImageUrl('/src/assets/images/map/map-car-left-normal.png'),
      // overlay
      overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
      status: STATUS_ENUM.normal, // 运输状态
      totalTransportationDistance: 50, // 总运输距离
      remainingtransportationDistance: 20, // 剩余运输的距离
      arrivedTime: '1小时', // 预计到达时间
    },
    {
      id: 'transport3', // 标识符，用来查看详情
      taskStatus: STATUS_ENUM.error, // 任务状态
      startPoint: start2endError.start,
      endPoint: start2endError.end,
      taskProgress: 0.5,
      image: getImageUrl('/src/assets/images/map/map-car-left-red.png'),
      // overlay
      overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
      status: STATUS_ENUM.error, // 运输状态
      totalTransportationDistance: 50, // 总运输距离
      remainingtransportationDistance: 20, // 剩余运输的距离
      arrivedTime: '2小时', // 预计到达时间
      linkman: '张三', // 联系人
      phone: '12345678901', // 联系电话
    },
    {
      id: 'transport4', // 标识符，用来查看详情
      taskStatus: STATUS_ENUM.normal, // 任务状态
      startPoint: start2endBack.start,
      endPoint: start2endBack.end,
      taskProgress: 0.2,
      image: getImageUrl('/src/assets/images/map/map-car-right-normal.png'),
      // overlay
      overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
      status: STATUS_ENUM.pull, // 运输状态
      totalTransportationDistance: 50, // 总运输距离
      remainingtransportationDistance: 0, // 剩余运输的距离
      arrivedTime: '2小时', // 预计到达时间
    },
  ]
}

// 获取运输任务车辆信息
export const getTransportVehicles = (mapImages) => {
  const getImageUrl = (url) => (mapImages[url] ? mapImages[url].default : url)
  // TODO: 这里可以根据实际情况从接口获取数据并转换为运输任务车辆信息
  return [
    {
      id: 'car1', // 标识符，用来查看详情
      // lng: (start2end.start.lng + start2end.end.lng) / 2 - 0.04,
      // lat: (start2end.start.lat + start2end.end.lat) / 2 - 0.04,
      image: getImageUrl('/src/assets/images/map/map-car-left-yellow.png'),
      // image: '/src/assets/images/map/map-car-left-normal.png',
      // overlay
      overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
      status: STATUS_ENUM.warning, // 运输状态
      totalTransportationDistance: 50, // 总运输距离
      remainingtransportationDistance: 20, // 剩余运输的距离
      arrivedTime: '1小时', // 预计到达时间
    },
    {
      id: 'car2', // 标识符，用来查看详情
      // lng: (start2endNormal.start.lng + start2endNormal.end.lng) / 2 - 0.04,
      // lat: (start2endNormal.start.lat + start2endNormal.end.lat) / 2 - 0.04,
      image: getImageUrl('/src/assets/images/map/map-car-left-normal.png'),
      // overlay
      overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
      status: STATUS_ENUM.normal, // 运输状态
      totalTransportationDistance: 50, // 总运输距离
      remainingtransportationDistance: 20, // 剩余运输的距离
      arrivedTime: '1小时', // 预计到达时间
    },
    {
      id: 'car3', // 标识符，用来查看详情
      // lng: (start2endError.start.lng + start2endError.end.lng) / 2 - 0.04,
      // lat: (start2endError.start.lat + start2endError.end.lat) / 2 - 0.04,
      image: getImageUrl('/src/assets/images/map/map-car-left-red.png'),
      // overlay
      overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
      status: STATUS_ENUM.error, // 运输状态
      totalTransportationDistance: 50, // 总运输距离
      remainingtransportationDistance: 20, // 剩余运输的距离
      arrivedTime: '2小时', // 预计到达时间
    },
    // {
    //   id: 'car4', // 标识符，用来查看详情
    //   lng: (start2endArrived.start.lng + start2endArrived.end.lng) / 2 - 0.04,
    //   lat: (start2endArrived.start.lat + start2endArrived.end.lat) / 2 - 0.04,
    //   image: getImageUrl('/src/assets/images/map/map-car-left-normal.png'),
    //   // overlay
    //   overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
    //   status: STATUS_ENUM.arrived, // 运输状态
    //   totalTransportationDistance: 50, // 总运输距离
    //   remainingtransportationDistance: 0, // 剩余运输的距离
    //   arrivedTime: '0小时', // 预计到达时间
    // },
    // {
    //   id: 'car5', // 标识符，用来查看详情
    //   lng: (start2endExchange.start.lng + start2endExchange.end.lng) / 2 - 0.04,
    //   lat: (start2endExchange.start.lat + start2endExchange.end.lat) / 2 - 0.04,
    //   image: getImageUrl('/src/assets/images/map/map-car-left-normal.png'),
    //   // overlay
    //   overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
    //   status: STATUS_ENUM.exchange, // 运输状态
    //   totalTransportationDistance: 50, // 总运输距离
    //   remainingtransportationDistance: 0, // 剩余运输的距离
    //   arrivedTime: '0小时', // 预计到达时间
    // },
    {
      id: 'car6', // 标识符，用来查看详情
      // lng: (start2endBack.start.lng + start2endBack.end.lng) / 2 - 0.04,
      // lat: (start2endBack.start.lat + start2endBack.end.lat) / 2 - 0.04,
      image: getImageUrl('/src/assets/images/map/map-car-right-normal.png'),
      // overlay
      overlayType: OVERLAY_ENUM.transportVehicle, // 覆盖物类型：运输类型
      status: STATUS_ENUM.pull, // 运输状态
      totalTransportationDistance: 50, // 总运输距离
      remainingtransportationDistance: 0, // 剩余运输的距离
      arrivedTime: '2小时', // 预计到达时间
    },
  ]
}
