// overlay 的类型
export const OVERLAY_ENUM = {
  demo: 'demo',
  transportation: 'transportation',
  transportVehicle: 'transportVehicle',
  transArrived: 'transArrived',
  chargingStation: 'chargingStation',
}

//  运输状态类型
/**
 * 运输状态类型
 * - normal: 正常
 * - warning: 警告
 * - error: 异常
 * - arrived: 到达
 * - exchange: 换电中
 */
export const STATUS_ENUM = {
  normal: 0,
  warning: 1,
  error: 2,
  arrived: 3,
  exchange: 4,
}
