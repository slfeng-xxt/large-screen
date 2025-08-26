import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/${url}`, ...arg)

// 获取能量舱的列表
export const getEnergyCabinList1 = (data) => {
  return request('getBatteryServer', data)
}
// 获取能量舱的列表
export const getEnergyCabinList2 = (data) => {
  return request('getBatteryCharge', data)
}
// 获取能量舱的列表
export const getEnergyCabinList3 = (data) => {
  return request('getBatteryWait', data)
}

// 获取充电情况
export const getChargingStatus = (data) => {
  return request('getChargingStatus', data)
}

// 获取钻井的电费与能耗
export const getEnergyCost = (data) => {
  return request('getEnergyCost', data)
}
