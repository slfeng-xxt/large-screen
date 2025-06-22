/**
 * 当前文件用于封装百度地图API相关方法
 */

// params 参数非空校验方法
export const checkParams = (params) => {
  if (!params || Object.keys(params).length === 0) {
    throw new Error('请传入参数 params')
  }
}

// Demo: 创建一个自定义覆盖物，显示图片、标题和文本提示
export const createdOverlay4Tip = (BMapGL, map, params) => {
  // params 为空返回提示
  checkParams(params)
  console.log('createdOverlay4Tip params:', params)
  // const {lon, lat, img, title, text} = params
  // 自定义展示内容
  function createDOM() {
    var div = document.createElement('div')
    div.style.zIndex = BMapGL.Overlay.getZIndex(this.point.lat)
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

    var title = document.createElement('div')
    title.style.display = 'block'
    title.style.lineHeight = '16px'
    title.style.fontSize = '16px'
    title.style.fontWeight = '700'
    div.appendChild(title)
    title.appendChild(document.createTextNode(this.properties.title))

    var span = document.createElement('span')
    span.style.wordWrap = 'break-word'
    span.style.lineHeight = '16px'
    span.style.wordWrap = 'break-word'
    span.style.whiteSpace = 'normal'
    span.style.padding = '10px'
    span.style.color = '#666'
    div.appendChild(span)
    span.appendChild(document.createTextNode(this.properties.text))

    let img = document.createElement('img')
    img.style.width = '120px'
    img.src = this.properties.imgSrc
    div.appendChild(img)

    var arrow = document.createElement('div')
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

    div.onmouseover = function () {
      this.style.backgroundColor = 'skyblue'
      this.style.color = '#fff'
      span.style.color = '#fff'
      arrow.style.top = '164px'
      arrow.style.borderColor = 'skyblue transparent transparent transparent'
    }

    div.onmouseout = function () {
      this.style.backgroundColor = '#fff'
      this.style.color = '#333'
      span.style.color = '#333'
      arrow.style.borderColor = 'white transparent transparent transparent'
    }
    return div
  }
  // 创建自定义覆盖物
  var customOverlay = new BMapGL.CustomOverlay(createDOM, {
    point: new BMapGL.Point(116.40342230333138, 39.92498414216742),
    opacity: 0.5,
    offsetY: -10,
    properties: {
      title: '故宫博物馆',
      text: '成立于1925年，历经六百年兴衰荣辱，是世界上规模最大、保存最完整的紫禁城木结构宫殿建筑群。',
      imgSrc: 'https://bj.bcebos.com/v1/mapopen-pub-jsapigl/assets/images/gugong.png',
      //   imgSrc: mapImages['/src/assets/images/map/map-well-normal.png'].default, // 使用本地图片
    },
  })
  map.addOverlay(customOverlay)
}

// 创建一个marker图标
const createMarkerIcon = (BMapGL, map, params) => {
  checkParams(params)
  const { image, point } = params
  const myIcon = new BMapGL.Icon(image, new BMapGL.Size(58, 104))
  // 创建Marker标注，使用图标
  const marker = new BMapGL.Marker(point, {
    icon: myIcon,
  })
  // 将标注添加到地图
  map.addOverlay(marker)
  return marker
}

// 移除marker图标
export const removeMarker = (map, marker) => {
  checkParams(marker)
  console.log('🚀 ~ removeMarker ~ marker:')
  const hashcode = marker.hashCode
  const overlaysList = map.getOverlays()
  // 检查marker是否在地图上
  if (!overlaysList.some((overlay) => overlay.hashCode === hashcode)) {
    console.warn('Marker does not exist on the map.')
    return
  }
  // 获取overlaysList中要移除的marker
  const overlayToRemove = overlaysList.find((overlay) => overlay.hashCode === hashcode)
  console.log('🚀 ~ removeMarker ~ overlayToRemove:', overlayToRemove)
  map.removeOverlay(overlayToRemove)
  console.log('🚀 ~ removeMarker ~ overlayToRemove:', map.getOverlays())
  
}

// 自定义marker图标
export const createMarker = (BMapGL, map, params) => {
  checkParams(params)
  const { image, hoverImage, presseedImage, point } = params
  
  // 创建正常状态的marker
  let marker_normal = createMarkerIcon(BMapGL, map, { image, point })
  let marker_hover = null
  let marker_pressed = null

  // 显示hover状态的函数
  const showHover = () => {
    console.log('🚀 ~ mouseover: 显示hover状态')
    // 移除正常状态的marker
    removeMarker(map, marker_normal)
    // 创建hover状态的marker
    marker_hover = createMarkerIcon(BMapGL, map, { image: hoverImage, point })
    // 为hover状态的marker添加鼠标移出事件
    marker_hover.addEventListener('mouseout', showNormal, { passive: true })
    // 为hover状态的marker添加点击事件
    marker_hover.addEventListener('click', showPressed, { passive: true })
  }

  // 显示正常状态的函数
  const showNormal = () => {
    console.log('🚀 ~ mouseout: 恢复正常状态')
    // 移除hover状态的marker
    if (marker_hover) {
      removeMarker(map, marker_hover)
      marker_hover = null
    }
    // 移除pressed状态的marker
    if (marker_pressed) {
      removeMarker(map, marker_pressed)
      marker_pressed = null
    }
    // 重新创建正常状态的marker
    marker_normal = createMarkerIcon(BMapGL, map, { image, point })
    // 重新绑定鼠标经过事件
    marker_normal.addEventListener('mouseover', showHover, { passive: true })
  }

  // 显示pressed状态的函数
  const showPressed = () => {
    console.log('🚀 ~ click: 显示pressed状态')
    // 移除hover状态的marker
    if (marker_hover) {
      removeMarker(map, marker_hover)
      marker_hover = null
    }
    // 创建pressed状态的marker
    marker_pressed = createMarkerIcon(BMapGL, map, { image: presseedImage, point })
    // 为pressed状态的marker添加点击事件，恢复hover状态
    marker_pressed.addEventListener('click', () => {
      console.log('🚀 ~ click: 恢复hover状态')
      // 移除pressed状态的marker
      removeMarker(map, marker_pressed)
      marker_pressed = null
      // 重新创建hover状态的marker
      marker_hover = createMarkerIcon(BMapGL, map, { image: hoverImage, point })
      // 重新绑定事件
      marker_hover.addEventListener('mouseout', showNormal, { passive: true })
      marker_hover.addEventListener('click', showPressed, { passive: true })
    }, { passive: true })
  }

  // 初始绑定鼠标经过事件
  marker_normal.addEventListener('mouseover', showHover, { passive: true })
}
