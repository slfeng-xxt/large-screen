import { OVERLAY_ENUM } from '@/utils/enum'
import TransportationOverlay from '@/components/overlay/TransportationOverlay.vue'
import TransportVehicle from '@/components/overlay/TransportVehicle.vue'
import TransArrived from '@/components/overlay/TransArrived.vue'
import ChargingStationOverlay from '@/components/overlay/ChargingStationOverlay.vue'
import WellOverlay from '@/components/overlay/WellOverlay.vue'
import WellErrorOverlay from '@/components/overlay/WellErrorOverlay.vue'

/**
 * @file createOverlayDom.js
 * @module overlayDom
 * @requires OVERLAY_ENUM
 * @author fsl
 * @version 1.0.0
 * @description 从overlayDom.js 演变过来的，便于维护和扩展。【组件化的方式创建自定义覆盖物DOM内容。】
 * 创建自定义覆盖物的DOM内容，包含不同类型的覆盖物DOM创建方法，用于在地图上显示自定义信息卡片
 * 有两种方式：
 * 1. 直接使用createDOM方法创建DOM内容(么有响应式数据更新，不符合需求实现)
 * 2. 使用createApp方法创建Vue组件实例，并挂载到DOM元素上。这样可以使用Vue的响应式特性，实现动态更新DOM内容
 */

// 创建DOM内容 - Demo
const createDOM = (params) => {
  const { title, zIndex } = params
  const div = document.createElement('div')
  div.style.zIndex = zIndex
  div.style.backgroundColor = '#fff'
  div.style.color = '#333'
  div.style.height = '160px'
  div.style.width = '230px'
  div.style.padding = '2px'
  div.style.lineHeight = '50px'
  div.style.whiteSpace = 'nowrap'
  div.style.MozUserSelect = 'none'
  div.style.fontSize = '12px'
  div.style.borderRadius = '10px'
  div.style.display = 'flex'
  div.style.justifyContent = 'center'
  div.style.alignItems = 'center'
  div.style.flexDirection = 'column'

  // 标题
  const titleEl = document.createElement('div')
  titleEl.style.display = 'block'
  titleEl.style.lineHeight = '16px'
  titleEl.style.fontSize = '16px'
  titleEl.style.fontWeight = '700'
  div.appendChild(titleEl)
  titleEl.appendChild(document.createTextNode(title))

  return div
}

// 创建Vue组件实例
const createAppContainer = (comp, params) => {
  try {
    const container = document.createElement('div')

    // 创建Vue应用实例
    const app = createApp({
      setup() {
        const instance = getCurrentInstance() // 获取当前实例
        return { instance }
      },
      render() {
        return h(comp, {
          ...params,
          ref: 'overlayRef',
        })
      },
    })

    // 挂载Vue应用
    const root = app.mount(container)

    // 保存app实例到container，以便后续清理
    container._vueApp = {
      app,
      instance_qt: root.instance,
    }

    return container
  } catch (error) {
    console.error('createAppContainer error:', error)
    return document.createElement('div') // 返回空容器兜底
  }
}

/**
 * 定义卡片类型
 * Demo
 * - demo: 使用createDOM方法创建简单的DOM内容
 *
 * 有运输任务情况：
 * - transportation:  井上有运输任务覆盖物，
 * - transportVehicle: 运输任务车辆信息覆盖物
 * - transArrived:    运输任务车辆到达覆盖物(两种状态：车辆到达和换电中)
 *
 * 无运输任务情况：
 * - chargingStation: 充电站覆盖物
 */
export const cardTypeMap = {
  [OVERLAY_ENUM.demo]: createDOM,
  [OVERLAY_ENUM.transportation]: createAppContainer.bind(null, TransportationOverlay), // 创建运输状态覆盖物的DOM元素(组件实例)
  [OVERLAY_ENUM.transportVehicle]: createAppContainer.bind(null, TransportVehicle), // 创建运输任务车辆信息覆盖物的DOM元素
  [OVERLAY_ENUM.transArrived]: createAppContainer.bind(null, TransArrived), // 创建运输任务车辆到达覆盖物的DOM元素
  [OVERLAY_ENUM.chargingStation]: createAppContainer.bind(null, ChargingStationOverlay), // 创建充电站覆盖物的DOM元素
  [OVERLAY_ENUM.wellOverlay]: createAppContainer.bind(null, WellOverlay), // 创建井上无运输任务正常状态覆盖物的DOM元素
  [OVERLAY_ENUM.wellErrorOverlay]: createAppContainer.bind(null, WellErrorOverlay), // 创建井上无运输任务异常状态覆盖物的DOM元素
}

// 清理Vue应用实例
export const cleanupOverlay = (container) => {
  if (!container) return
  // 1. 先卸载Vue应用
  if (container._vueApp && container._vueApp?.app) {
    // console.log(container._vueApp.app, '=========清理Vue应用实例=========')
    container._vueApp.app.unmount()
    delete container._vueApp
    container = null // 清理容器引用
  }
}
