# 地图 Hooks 使用指南

## 概述

本项目将原有的地图 API 功能重构为 Vue 3 Composition API Hooks 模式，提供了更好的代码复用性和可维护性。

## 主要 Hooks

### 1. useMapApi

地图 API 主 Hook，负责地图的初始化和基础管理。

```javascript
import { useMapApi } from '@/utils/map-api.js'

const { map, BMapGL, isLoading, error, initMap, destroyMap } = useMapApi()

// 初始化地图
await initMap('bmap', DEFAULT_CONFIG)
```

**返回值：**
- `map`: 地图实例的响应式引用
- `BMapGL`: 百度地图库的响应式引用
- `isLoading`: 加载状态
- `error`: 错误信息
- `initMap`: 初始化地图方法
- `destroyMap`: 销毁地图方法

### 2. useMarker

Marker 标记点 Hook，负责创建和管理地图标记点。

```javascript
import { useMarker } from '@/utils/map-api.js'

const { markers, createMarkerIcon, createInteractiveMarker, clearAllMarkers } = useMarker(map, BMapGL)

// 创建普通 Marker
const normalMarker = createMarkerIcon({
  image: '/path/to/image.png',
  point: new BMapGL.value.Point(lng, lat)
})

// 创建交互式 Marker（支持 hover 和 click 状态）
const interactiveMarker = createInteractiveMarker({
  image: '/path/to/normal.png',
  hoverImage: '/path/to/hover.png',
  pressedImage: '/path/to/pressed.png',
  point: new BMapGL.value.Point(lng, lat)
})
```

**返回值：**
- `markers`: 所有 Marker 的数组
- `createMarkerIcon`: 创建普通 Marker
- `createInteractiveMarker`: 创建交互式 Marker
- `removeMarker`: 移除指定 Marker
- `clearAllMarkers`: 清理所有 Marker

### 3. useOverlay

自定义覆盖物 Hook，负责创建和管理地图覆盖物。

```javascript
import { useOverlay } from '@/utils/map-api.js'

const { overlays, createTipOverlay, removeOverlay, clearAllOverlays } = useOverlay(map, BMapGL)

// 创建提示覆盖物
const tipOverlay = createTipOverlay({
  point: { lng: 116.403422, lat: 39.924984 },
  title: '位置标题',
  text: '位置描述信息',
  imgSrc: '/path/to/image.png'
})
```

**返回值：**
- `overlays`: 所有覆盖物的数组
- `createTipOverlay`: 创建提示覆盖物
- `removeOverlay`: 移除指定覆盖物
- `clearAllOverlays`: 清理所有覆盖物

### 4. useMapUtils

地图工具 Hook，提供地图操作的工具方法。

```javascript
import { useMapUtils } from '@/utils/map-api.js'

const { setCenter, setZoom, enableScrollWheelZoom, getCenter, getZoom } = useMapUtils(map, BMapGL)

// 设置地图中心点
setCenter(116.403422, 39.924984)

// 设置缩放级别
setZoom(15)

// 启用滚轮缩放
enableScrollWheelZoom(true)
```

**返回值：**
- `setCenter`: 设置地图中心点
- `setZoom`: 设置缩放级别
- `enableScrollWheelZoom`: 启用/禁用滚轮缩放
- `setMapStyle`: 设置地图样式
- `getBounds`: 获取地图边界
- `getCenter`: 获取当前中心点
- `getZoom`: 获取当前缩放级别

## 使用示例

### 基础用法

```vue
<template>
  <div id="bmap" class="map-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMapApi, useMarker } from '@/utils/map-api.js'
import { DEFAULT_CONFIG } from '@/config/index.js'

const { map, BMapGL, initMap } = useMapApi()
const { createInteractiveMarker } = useMarker(map, BMapGL)

onMounted(async () => {
  await initMap('bmap', DEFAULT_CONFIG)
  
  createInteractiveMarker({
    image: '/src/assets/images/map/map-well-normal.png',
    hoverImage: '/src/assets/images/map/map-well-hover.png',
    pressedImage: '/src/assets/images/map/map-well-pressed.png',
    point: new BMapGL.value.Point(DEFAULT_CONFIG.LONGITUDE, DEFAULT_CONFIG.LATITUDE)
  })
})
</script>
```

### 完整功能示例

```vue
<template>
  <div class="map-wrapper">
    <div id="bmap" class="map-container"></div>
    <div v-if="isLoading" class="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useMapApi, useMarker, useOverlay, useMapUtils } from '@/utils/map-api.js'
import { DEFAULT_CONFIG } from '@/config/index.js'

const { map, BMapGL, isLoading, error, initMap, destroyMap } = useMapApi()
const { markers, createInteractiveMarker, clearAllMarkers } = useMarker(map, BMapGL)
const { overlays, createTipOverlay, clearAllOverlays } = useOverlay(map, BMapGL)
const { setCenter, setZoom, enableScrollWheelZoom } = useMapUtils(map, BMapGL)

onMounted(async () => {
  try {
    await initMap('bmap', DEFAULT_CONFIG)
    
    // 设置地图工具
    enableScrollWheelZoom(true)
    
    // 创建多个 Marker
    const positions = [
      { lng: 116.403422, lat: 39.924984 },
      { lng: 116.413422, lat: 39.934984 }
    ]
    
    positions.forEach(pos => {
      createInteractiveMarker({
        image: '/src/assets/images/map/map-well-normal.png',
        hoverImage: '/src/assets/images/map/map-well-hover.png',
        pressedImage: '/src/assets/images/map/map-well-pressed.png',
        point: new BMapGL.value.Point(pos.lng, pos.lat)
      })
    })
    
    // 创建覆盖物
    createTipOverlay({
      point: { lng: 116.403422, lat: 39.924984 },
      title: '示例位置',
      text: '这是一个示例覆盖物',
      imgSrc: '/path/to/image.png'
    })
  } catch (err) {
    console.error('地图初始化失败:', err)
  }
})

onUnmounted(() => {
  clearAllMarkers()
  clearAllOverlays()
  destroyMap()
})
</script>
```

## 优势

1. **代码复用**: Hooks 可以在多个组件中复用
2. **响应式**: 使用 Vue 3 的响应式系统，状态变化自动更新
3. **类型安全**: 更好的 TypeScript 支持
4. **生命周期管理**: 自动处理组件的生命周期
5. **模块化**: 功能分离，便于维护和测试
6. **向后兼容**: 保留了原有的导出函数

## 注意事项

1. 确保在使用 Hooks 之前已经正确配置了百度地图 API Key
2. 地图容器必须有明确的 ID 和尺寸
3. 在组件卸载时会自动清理资源
4. 所有事件监听器都使用了 `passive: true` 选项以提高性能

## 迁移指南

如果你正在使用原有的地图 API 函数，可以按以下步骤迁移：

1. 将 `loadBMapScript` 调用替换为 `useMapApi().initMap`
2. 将 `createMarker` 调用替换为 `useMarker().createInteractiveMarker`
3. 将 `createdOverlay4Tip` 调用替换为 `useOverlay().createTipOverlay`
4. 移除手动的事件监听器管理，Hooks 会自动处理

原有的导出函数仍然可用，但建议使用新的 Hooks 模式。 