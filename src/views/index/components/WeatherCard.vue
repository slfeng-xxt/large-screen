<script setup>
import axios from 'axios'
import { DEFAULT_CONFIG } from '@/config/index.js'
import { BAIDU_WEATHER_CODE } from '@/utils/bcode.js'

const weather = ref({
  isLoaded: true,
  iconType: '',
  description: '',
  tempMin: '',
  tempMax: '',
  name: '',
  windSpeed: '',
  windDeg: '',
})

// 方式一：
const getAssetsFile = (filePath) => {
  const path = `/src/assets/images/weather/${filePath}.png`
  const errorPath = '/src/assets/images/weather/404.png'
  const modules = import.meta.glob('@/assets/images/weather/*.png', { eager: true })
  return modules[path] ? modules[path].default : modules[errorPath].default
}

// 方式二：
// const getAssetsImages = (type) => {
//   return new URL(`/src/assets/images/weather/${type}.png`, import.meta.url).href //本地文件路径
// }

const fetchWeather = async () => {
  try {
    // district_id 和 location二选一
    const resp = await axios.get(DEFAULT_CONFIG.WEATHER_API_BASE_URL, {
      params: {
        district_id: DEFAULT_CONFIG.WEATHER_DISTRICT_ID,
        // location: `${DEFAULT_CONFIG.LONGITUDE},${DEFAULT_CONFIG.LATITUDE}`,
        data_type: 'all', // now/fc/index/alert/fc_hour/all
        ak: DEFAULT_CONFIG.WEATHER_API_KEY,
      },
    })
    const { forecasts, location, now } = resp.data.result
    weather.value.iconType = BAIDU_WEATHER_CODE[now.text]
    weather.value.isLoaded = true
    weather.value.description = now.text
    weather.value.tempMin = forecasts[0].low
    weather.value.tempMax = forecasts[0].high
    weather.value.name = location.city // name or city
    weather.value.windSpeed = now.wind_class
    weather.value.windDeg = now.wind_dir
  } catch (error) {
    console.error('获取天气信息失败:', error)
    weather.value.isLoaded = false
  } finally {
    weather.value.isLoaded = false
  }
}

onMounted(() => {
  fetchWeather()
})
</script>

<template>
  <div class="weather" v-if="!weather.isLoaded">
    <img :src="getAssetsFile(weather.iconType)" alt="天气图标" />
    <span class="weather-desc">{{ weather.description }}</span>
    <span class="weather-temp">温度{{ weather.tempMin }}℃ ~ {{ weather.tempMax }}℃</span>
    <span class="weather-name">{{ weather.name }}</span>
    <span class="weather-wind">{{ weather.windDeg }}</span>
    <span>{{ weather.windSpeed }}</span>
  </div>
  <div v-else class="weather-loading">none</div>
</template>

<style lang="less" scoped>
.weather {
  display: flex;
  align-items: center;
  margin-top: 10px;
  user-select: none;
  height: 32px;

  img {
    width: 21px;
    height: 21px;
  }

  span {
    color: #fff;
    text-shadow: 0px 0px 4px #fff;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &-desc {
    margin-left: 8px;
  }

  &-temp {
    margin-left: 6px;
  }

  &-name {
    margin-left: 12px;
  }

  &-wind {
    margin-left: 6px;
  }
}

.weather-loading {
  width: 10vh;
}
</style>
