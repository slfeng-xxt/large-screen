import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import { DEFAULT_CONFIG } from '@/config/index.js'

import DataVVue3 from '@kjgl77/datav-vue3'
// import BaiduMap from 'vue-baidu-map-3x'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(DataVVue3)
// app.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: DEFAULT_CONFIG.BAIDU_MAP_KEY,
//   // v:'2.0',  // 默认使用3.0
//   type: 'WebGL', // ||API 默认API  (使用此模式 BMap=BMapGL)
// })

app.mount('#app')
