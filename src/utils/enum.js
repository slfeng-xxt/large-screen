/**
 * 覆盖物类型
 * - demo: 演示类型
 * - transportation: 【井上】有运输任务覆盖物
 * - transportVehicle: 【车辆】运输任务覆盖物
 * - transArrived: 【井上】运输任务车辆到达（PS：运输任务车辆到达状态有两种：车辆到达和换电中）
 * - chargingStation: 【充电站】覆盖物
 * - wellOverlay: 【井上】无运输任务正常状态覆盖物
 * - wellErrorOverlay: 【井上】无运输任务异常状态覆盖物
 */
export const OVERLAY_ENUM = {
  demo: 'demo',
  transportation: 'transportation',
  transportVehicle: 'transportVehicle',
  transArrived: 'transArrived',
  chargingStation: 'chargingStation',
  wellOverlay: 'wellOverlay',
  wellErrorOverlay: 'wellErrorOverlay',
}

/**
 * 运输状态类型
 * - normal: 正常
 * - warning: 警告
 * - error: 异常
 * - arrived: 到达
 * - exchange: 换电中
 * - pull: 拉回
 */
export const STATUS_ENUM = {
  normal: 0,
  warning: 1,
  error: 2,
  arrived: 3,
  exchange: 4,
  pull: 5,
}

/**
 * 弹窗任务进度类型
 * - transportation 运输中
 * - change 换电中
 * - pull 拉回
 */
export const DIALOG_TASK_PROGRESS_ENUM = {
  transportation: 1,
  change: 2,
  pull: 3,
}

/**
 * 电池状态
 * - normal: 正常
 * - warning: 警告
 * - error: 异常
 */
export const BATTERY_STATUS_ENUM = {
  normal: 'normal',
  warning: 'warning',
  error: 'error',
}

/**
 * 电池状态组件状态信息布局类型
 *  0:隐藏
 *  1:垂直
 *  2:水平
 */
export const BATTERY_STATUS_LAYOUT_ENUM = {
  hidden: 0,
  vertical: 1,
  horizontal: 2,
}
