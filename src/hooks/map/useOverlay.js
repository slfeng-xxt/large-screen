import { ref } from 'vue'
import { checkParams } from '@/utils/map-api'
/**
 * 自定义覆盖物Hook
 * @param {Object} mapInstance - 地图实例
 * @param {Object} BMapGLLib - 百度地图库
 * @returns {Object} 覆盖物相关方法
 */
export const useOverlay = (mapInstance, BMapGLLib) => {
  const overlays = ref([])

  // 创建带提示信息的覆盖物
  const createTipOverlay = (params) => {
    checkParams(params)
    const { point, title, text, imgSrc, opacity = 0.5, offsetY = -10 } = params

    // 创建DOM内容 - Demo
    const createDOM = () => {
      const div = document.createElement('div')
      div.style.zIndex = BMapGLLib.Overlay.getZIndex(point.lat)
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

      // 文本内容
      const span = document.createElement('span')
      span.style.wordWrap = 'break-word'
      span.style.lineHeight = '16px'
      span.style.whiteSpace = 'normal'
      span.style.padding = '10px'
      span.style.color = '#666'
      div.appendChild(span)
      span.appendChild(document.createTextNode(text))

      // 图片
      if (imgSrc) {
        const img = document.createElement('img')
        img.style.width = '120px'
        img.style.height = '120px'
        img.src = imgSrc
        div.appendChild(img)
      }

      // 箭头
      const arrow = document.createElement('div')
      arrow.style.position = 'absolute'
      arrow.style.top = '164px'
      arrow.style.left = '106px'
      arrow.style.width = '0'
      arrow.style.height = '0'
      arrow.style.borderColor = 'white transparent transparent transparent'
      arrow.style.borderStyle = 'solid'
      arrow.style.borderWidth = '10px'
      arrow.style.overflow = 'hidden'
      div.appendChild(arrow)

      // 使用addEventListener替代onmouseover和onmouseout
      div.addEventListener(
        'mouseover',
        () => {
          div.style.backgroundColor = 'skyblue'
          div.style.color = '#fff'
          span.style.color = '#fff'
          arrow.style.top = '164px'
          arrow.style.borderColor = 'skyblue transparent transparent transparent'
        },
        { passive: true },
      )

      div.addEventListener(
        'mouseout',
        () => {
          div.style.backgroundColor = '#fff'
          div.style.color = '#333'
          span.style.color = '#333'
          arrow.style.borderColor = 'white transparent transparent transparent'
        },
        { passive: true },
      )

      return div
    }

    // 创建自定义覆盖物
    const customOverlay = new BMapGLLib.CustomOverlay(createDOM, {
      point: new BMapGLLib.Point(point.lng, point.lat),
      opacity,
      offsetY,
      properties: { title, text, imgSrc },
    })

    mapInstance.addOverlay(customOverlay)

    overlays.value.push(customOverlay)

    return customOverlay
  }

  // 移除覆盖物
  const removeOverlay = (overlay) => {
    if (overlay) {
      mapInstance.removeOverlay(overlay)
      const index = overlays.value.indexOf(overlay)
      if (index > -1) {
        overlays.value.splice(index, 1)
      }
    }
  }

  // 清理所有覆盖物
  const clearAllOverlays = () => {
    overlays.value.forEach((overlay) => {
      removeOverlay(overlay)
    })
    overlays.value = []
  }

  return {
    overlays,
    createTipOverlay,
    removeOverlay,
    clearAllOverlays,
  }
}
