import { OVERLAY_ENUM } from '@/utils/enum'
import { createApp, h } from 'vue'
// import TransportationOverlay from '@/components/overlay/TransportationOverlay.js'
import TransportationOverlay from '@/components/overlay/TransportationOverlay.vue'

/**
 * @file createOverlayDom.js
 * @module overlayDom
 * @requires OVERLAY_ENUM
 * @author fsl
 * @version 1.0.0
 * @description 创建自定义覆盖物的DOM内容，包含不同类型的覆盖物DOM创建方法，用于在地图上显示自定义信息卡片
 * 有两种方式：
 * 1. 直接使用createDOM方法创建DOM内容
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

// 创建Vue组件实例 - Demo
const createAppContainer = (comp, params) => {
  console.log(params, 'params');
  
  const container = document.createElement('div')
  // 创建Vue应用实例
  const app = createApp({
    render() {
      return h(comp, {
        ...params,
        ref: 'overlayRef',
      })
    },
  })
  
  // 挂载Vue应用
  app.mount(container)
  
  // 保存app实例到container，以便后续清理
  container._vueApp = app
  
  return container
}

// 创建运输状态覆盖物的DOM元素
// const createTransportationTaskOnWellDOM = (params) => {
//   const container = document.createElement('div')
  
//   // 创建Vue应用实例
//   const app = createApp({
//     render() {
//       return h(TransportationOverlay, {
//         ...params,
//         ref: 'overlayRef',
//       })
//     },
//   })
  
//   // 挂载Vue应用
//   app.mount(container)
  
//   // 保存app实例到container，以便后续清理
//   container._vueApp = app
  
//   return container
// }

// 定义卡片类型
export const cardTypeMap = {
  [OVERLAY_ENUM.demo]: createDOM,
  // [OVERLAY_ENUM.transportation]: createTransportationTaskOnWellDOM,
  [OVERLAY_ENUM.transportation]: createAppContainer.bind(null, TransportationOverlay),
}

// 清理Vue应用实例
export const cleanupOverlay = (container) => {
  if (container && container._vueApp) {
    container._vueApp.unmount()
    delete container._vueApp
  }
}
