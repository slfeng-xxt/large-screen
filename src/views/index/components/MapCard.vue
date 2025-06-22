<script setup>
import { ref } from 'vue'
import { DEFAULT_CONFIG } from '@/config/index.js'

const center = ref({ lng: DEFAULT_CONFIG.LONGITUDE, lat: DEFAULT_CONFIG.LATITUDE })
const zoom = ref(DEFAULT_CONFIG.ZOOM)

const handleMapReady = ({ BMap, map }) => {
  console.log(BMap, map)
  center.value.lng = DEFAULT_CONFIG.LONGITUDE
  center.value.lat = DEFAULT_CONFIG.LATITUDE
  zoom.value = DEFAULT_CONFIG.ZOOM
  // 修改地图主题色方法2
  map.setMapStyleV2({ styleId: DEFAULT_CONFIG.MAP_STYLE_ID }) // 设置地图样式
  // 其他回调
}

// 点击 Marker 弹出 InfoWindow
const show = ref(true)
const infoWindowOpen = () => {
  show.value = true
}
const infoWindowClose = () => {
  show.value = false
}

// 自定义覆盖物
const active = ref(false)
const draw = ({ el, BMap, map }) => {
  const pixel = map.pointToOverlayPixel(
    new BMap.Point(DEFAULT_CONFIG.LONGITUDE, DEFAULT_CONFIG.LATITUDE),
  ) // 返回的坐标为覆盖物的左上角坐标。
  el.style.left = pixel.x + 'px' // 最终坐标 = 覆盖物坐标 - 覆盖物宽度/2。 // 居中显示
  el.style.top = pixel.y + 'px'
}
</script>

<template>
  <baidu-map
    :center="center"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    :double-click-zoom="false"
    :keyboard="false"
    @ready="handleMapReady"
  >
    <!-- 添加一个自定义图标的点  -->
    <bm-marker
      :position="center"
      :dragging="true"
      :icon="{
        url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
        size: { width: 300, height: 157 },
      }"
      @click="infoWindowOpen"
    >
      <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen"
        >我爱北京天安门</bm-info-window
      >
    </bm-marker>
    <!-- 自定义覆盖物所在容器。包含 floatPane、markerMouseTarget、floatShadow、labelPane、markerPane、markerShadow、mapPane 共 7 种合法值 -->
    <bm-overlay
      pane="labelPane"
      :class="{ sample: true, active }"
      @draw="draw"
      @mouseover="active = true"
      @mouseleave="active = false"
    >
      <div>bm-overlay</div>
    </bm-overlay>
  </baidu-map>
</template>

<style lang="less" scoped>
::v-deep(.anchorBL img) {
  display: none;
}

.sample {
  position: absolute;
  width: 100px;
  height: 50px;
  background-color: rgba(255, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  line-height: 50px;
  border-radius: 5px;
}
.active {
  background-color: rgba(0, 255, 0, 0.5);
}
</style>
