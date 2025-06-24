import { OVERLAY_ENUM, STATUS_ENUM } from '@/utils/enum'

/**
 * 废弃：新版本在 createOverlay 中直接创建DOM
 * @file overlayDom.js
 * @module overlayDom
 * @requires OVERLAY_ENUM
 * @author fsl
 * @version 1.0.0
 * @description 创建自定义覆盖物的DOM内容，包含不同类型的覆盖物DOM创建方法，用于在地图上显示自定义信息卡片
 */

// 创建DOM内容 - Demo
const createDOM = (params) => {
  const { title, text, imgSrc, zIndex } = params
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

// 创建运输状态覆盖物的DOM元素
const createTransportationTaskOnWellDOM = (params) => {
  console.log('🚀 ~ createTransportationTaskOnWellDOM ~ params:', params)
  const {
    title,
    zIndex,
    status = STATUS_ENUM.normal,
    availableTime,
    progressSOC = '15',
    expectedArriveTime = '0',
  } = params
  // 根据状态设置不同的背景颜色
  const statusList = [
    {
      background: 'linear-gradient(270deg, rgba(8, 70, 65, 0.35) 0%, #1D736C 100%)',
      textColor: '#00FF90',
    },
    {
      background: 'linear-gradient(270deg, rgba(85, 60, 15, 0.35) 0%, #73551D 100%)',
      textColor: '#FF9D00',
    },
    {
      background: 'linear-gradient(270deg, rgba(70, 8, 8, 0.35) 0%, #731D1D 100%)',
      textColor: '#FF0000',
    },
  ]

  //   创建刻度线方法
  const createTick = (options) => {
    const {
      tickTop = '-24px',
      tickLineHeight = '26px',
      hasText = true,
      tickColor,
      tickNodeText,
    } = options
    // 刻度
    const tick = document.createElement('div')
    tick.style.display = 'flex'
    tick.style.flexDirection = 'column'
    tick.style.alignItems = 'center'
    tick.style.justifyContent = 'space-between'
    tick.style.position = 'absolute'
    tick.style.left = tickNodeText + '%'
    tick.style.top = tickTop
    tick.style.width = '28px'
    tick.style.height = '50px'
    tick.style.zIndex = '2'

    if (hasText) {
      // 刻度文本
      const tickText = document.createElement('div')
      tickText.style.height = '20px'
      tickText.style.color = tickColor
      tickText.style.fontFamily = '"Alibaba PuHuiTi 2.0"'
      tickText.style.fontSize = '14px'
      tickText.style.fontWeight = '400'
      tickText.appendChild(document.createTextNode(tickNodeText + '%'))
      tick.appendChild(tickText)
    }

    // 刻度线
    const tickLine = document.createElement('div')
    tickLine.style.width = '2px'
    tickLine.style.height = tickLineHeight
    tickLine.style.backgroundColor = tickColor
    tick.appendChild(tickLine)

    return tick
  }

  // 创建卡片容器
  const div = document.createElement('div')
  div.style.zIndex = zIndex
  div.style.width = '332px'
  div.style.height = '157px'
  div.style.padding = '16px'
  div.style.borderRadius = '12px'
  div.style.border = '0.1px solid #FFF'
  div.style.background = statusList[status].background
  div.style.backdropFilter = 'blur(7.5px)'

  //  card header(标题 + 电池剩余可用时间 + ${time} 分钟)
  const header = document.createElement('div')
  header.style.display = 'flex'
  header.style.justifyContent = 'space-between'
  header.style.alignItems = 'center'

  // 标题
  const titleEl = document.createElement('div')
  titleEl.style.color = '#fff'
  titleEl.style.fontFamily = '"Alibaba PuHuiTi 2.0"'
  titleEl.style.fontSize = '18px'
  titleEl.style.fontWeight = '1000'
  titleEl.style.letterSpacing = '3.6px'
  titleEl.appendChild(document.createTextNode(title))

  // 电池剩余可用时间
  const batteryTime = document.createElement('div')
  batteryTime.style.color = '#fff'
  batteryTime.style.fontFamily = '"Alibaba PuHuiTi 2.0"'
  batteryTime.style.fontSize = '14px'
  batteryTime.style.fontWeight = '400'
  batteryTime.style.letterSpacing = '2.8px'
  batteryTime.appendChild(document.createTextNode('电池剩余可用时间:'))

  //   ${time} 分钟
  const time = document.createElement('span')
  time.style.color = '#FF9D00'
  time.appendChild(document.createTextNode(availableTime + '分钟')) // 假设时间为120分钟，可以根据实际情况动态设置
  batteryTime.appendChild(time)

  header.appendChild(titleEl)
  header.appendChild(batteryTime)

  // SOC进度条
  const progressBar = document.createElement('div')
  progressBar.style.position = 'relative'
  progressBar.style.width = '300px'
  progressBar.style.height = '26px'
  progressBar.style.marginTop = '31px'
  progressBar.style.backgroundColor = 'rgba(128, 128, 128, 0.20)'
  progressBar.style.borderRadius = '9999px'

  // 当前进度
  const currentProgress = document.createElement('div')
  currentProgress.style.position = 'absolute'
  currentProgress.style.left = '0'
  currentProgress.style.top = '0'
  currentProgress.style.width = '28%' // 假设当前进度为100%，可以根据实际情况动态设置
  currentProgress.style.height = '26px'
  currentProgress.style.backgroundColor = '#FF9D00'
  currentProgress.style.borderRadius = '9999px'
  currentProgress.style.zIndex = '1'

  // 10% 刻度
  const tick10 = createTick({
    tickColor: '#FF0000',
    tickNodeText: '10',
  })

  // 30% 刻度
  const tick30 = createTick({
    tickColor: '#FF8000',
    tickNodeText: '30',
  })

  // 预计到达刻度
  const arrivalTick = createTick({
    tickTop: '0',
    tickLineHeight: '42px',
    hasText: false,
    tickColor: '#80FF00',
    tickNodeText: progressSOC,
  })

  //   进度条百分比文字说明
  const progressText = document.createElement('div')
  progressText.style.position = 'absolute'
  progressText.style.right = '12px'
  progressText.style.top = '3px'
  progressText.style.color = '#FFF'
  progressText.style.fontFamily = '"Alibaba PuHuiTi 2.0"'
  progressText.style.fontSize = '14px'
  progressText.style.fontWeight = '400'
  progressText.style.zIndex = '2'
  // 添加百分比文本
  const progressValue = document.createElement('span')
  progressValue.style.color = '#FF9D00'
  progressValue.appendChild(document.createTextNode(progressSOC + '%')) // 假设当前SOC剩余为28%，可以根据实际情况动态设置
  progressText.appendChild(document.createTextNode('剩余soc：'))
  progressText.appendChild(progressValue)

  progressBar.appendChild(currentProgress)
  progressBar.appendChild(tick10)
  progressBar.appendChild(tick30)
  progressBar.appendChild(arrivalTick)
  progressBar.appendChild(progressText)

  //   底部
  const footer = document.createElement('div')
  footer.style.display = 'flex'
  footer.style.justifyContent = 'space-between'
  footer.style.alignItems = 'center'
  footer.style.marginTop = '19px'

  // 底部左侧
  const footerLeft = document.createElement('div')
  footerLeft.style.display = 'flex'
  footerLeft.style.alignItems = 'center'

  // 底部图标
  const iconImg = document.createElement('img')
  iconImg.style.width = '20px'
  iconImg.style.height = '14px'
  iconImg.src = '/src/assets/images/overlay/task-car-icon.png'
  footerLeft.appendChild(iconImg)

  // 底部文本
  const footerText = document.createElement('div')
  footerText.style.paddingLeft = '8px'
  footerText.style.color = '#fff'
  footerText.style.fontFamily = '"Alibaba PuHuiTi 2.0"'
  footerText.style.fontSize = '14px'
  footerText.style.fontWeight = '400'
  footerText.style.letterSpacing = '2.8px'
  footerText.appendChild(document.createTextNode('后续车辆预计到达时间：'))
  const arrivalTime = document.createElement('span')
  arrivalTime.style.color = '#00FF90'
  arrivalTime.appendChild(document.createTextNode(expectedArriveTime + '分钟'))
  footerText.appendChild(arrivalTime)
  footerLeft.appendChild(footerText)
  footer.appendChild(footerLeft)

  // 底部右侧(右箭头)
  const footerRight = document.createElement('img')
  footerRight.style.width = '24px'
  footerRight.style.height = '24px'
  footerRight.src = '/src/assets/images/overlay/right-arrow-icon.png'
  footerRight.style.cursor = 'pointer'
  footerRight.addEventListener(
    'click',
    () => {
      // 点击右箭头的逻辑
      console.log('右箭头被点击了')
    },
    { passive: true },
  )
  footer.appendChild(footerRight)

  div.appendChild(header)
  div.appendChild(progressBar)
  div.appendChild(footer)

  return div
}

// 定义卡片类型
export const cardTypeMap = {
  [OVERLAY_ENUM.demo]: createDOM,
  [OVERLAY_ENUM.transportation]: createTransportationTaskOnWellDOM,
}
