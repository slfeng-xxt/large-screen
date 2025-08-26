<script setup>
import TimeCard from '@/views/index/components/TimeCard.vue'
import WeatherCard from '@/views/index/components/WeatherCard.vue'
import MapKb from '@/views/index/components/MapKb.vue'
import BatteryInfo from '@/views/index/components/BatteryInfo.vue'
import ChargeSituation from '@/views/index/components/ChargeSituation.vue'
import ElectricityAccrual from '@/views/index/components/ElectricityAccrual.vue'
import OndutyStaff from '@/views/index/components/OndutyStaff.vue'
import FooterCard from '@/views/index/components/FooterCard.vue'
import CollapseSidebar from '@/views/index//components/CollapseSidebar.vue'
import ScaleIndeicator from '@/components/scale/ScaleIndeicator.vue'
import { useControlStore } from '@/stores/control.js'
import { getMapScale } from '@/utils/map-api.js'

const currentTask = ref(4)
const chargingStation = ref(1)
const wellDrilling = ref(5)
const toggle = ref(true)
const currentScale = ref(20000)

watchEffect(() => {
  const control = useControlStore()
  currentScale.value = getMapScale(Math.round(control.currentZoom))
})

const toggleAll = () => {
  toggle.value = !toggle.value
}
</script>

<template>
  <div class="yn">
    <!-- 第一层: 地图 -->
    <map-kb class="yn__map" />
    <!-- 第二层: 蒙板, 换个图片覆盖？ -->
    <div :class="['yn__cover-top', toggle ? '' : 'cover-top-collapsed']"></div>
    <div class="yn__cover-side yn__cover-left" v-show="toggle"></div>
    <div
      :class="['yn__cover-side', 'yn__cover-right', toggle ? '' : 'cover-right-collapsed']"
    ></div>
    <div :class="['yn__cover-bottom', toggle ? '' : 'cover-bottom-collapsed']"></div>
    <div :class="['yn__cover-focus', toggle ? '' : 'cover-focus-collapsed']"></div>
    <!-- 第三层: 标题,侧边,底部 -->
    <header class="yn__header">
      <div class="yn__header-info">
        <weather-card />
        <time-card />
      </div>
    </header>
    <main class="yn__main">
      <transition name="slide-left">
        <div class="yn__main-float left-float" v-show="toggle">
          <battery-info />
          <charge-situation />
        </div>
      </transition>
      <transition name="slide-right">
        <div class="yn__main-float right-float" v-show="toggle">
          <electricity-accrual />
          <onduty-staff />
        </div>
      </transition>
      <transition name="slide-bottom">
        <div class="yn__main-float bottom-float" v-show="toggle">
          <footer-card />
        </div>
      </transition>
      <!-- 调度信息 -->
      <div class="dispatch-info" :class="{ collapsed: !toggle }">
        <span class="dispatch-info__content">当前运输任务：{{ currentTask }}个</span>
        <span class="dispatch-info__content content-margin">充电站：{{ chargingStation }}个</span>
        <span class="dispatch-info__content">供电钻井：{{ wellDrilling }}个</span>
      </div>
      <!-- 浮动控制按钮 -->
      <div class="yn__main-float btn-float" :class="{ collapsed: !toggle }" @click="toggleAll">
        <collapse-sidebar :toggle="toggle" />
      </div>
      <!-- 浮动刻度尺 -->
      <div class="yn__main-float scale-float" :class="{ collapsed: !toggle }">
        <scale-indeicator :current="currentScale" />
      </div>
    </main>
    <footer class="yn__footer"></footer>
  </div>
</template>

<style lang="less" scoped>
.yn {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;

  &__map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }

  &__cover-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 159px;
    flex-shrink: 0;
    transition: background 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    background: linear-gradient(0deg, rgba(1, 3, 16, 0) 0%, #010310 100%);
    z-index: 6;
    pointer-events: none;
  }

  .cover-top-collapsed {
    height: 239px;
    background: linear-gradient(0deg, rgba(1, 3, 16, 0) 0%, rgba(1, 3, 16, 0.4) 100%);
  }

  &__cover-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 234px;
    transition: background 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    background: linear-gradient(180deg, rgba(1, 3, 16, 0) 0%, #010310 100%);
    z-index: 6;
    pointer-events: none;
  }

  .cover-bottom-collapsed {
    background: linear-gradient(180deg, rgba(1, 3, 16, 0) 0%, rgba(1, 3, 16, 0.4) 100%);
  }

  &__cover-side {
    position: absolute;
    top: 0;
    z-index: 6;
    pointer-events: none;
  }

  &__cover-left {
    left: 0;
    width: 460px;
    height: 100%;
    background: linear-gradient(270deg, rgba(8, 33, 49, 0) 0%, #010c14 100%);
  }

  &__cover-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 532px;
    height: 100%;
    transition: background 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    background: linear-gradient(90deg, rgba(1, 3, 16, 0) 0%, #010310 100%);
    z-index: 6;
  }

  .cover-right-collapsed {
    pointer-events: none;
    width: 239px;
    height: 100%;
    background: linear-gradient(90deg, rgba(1, 3, 16, 0) 0%, rgba(1, 3, 16, 0.4) 100%);
  }

  &__cover-focus {
    position: absolute;
    // 垂直居中
    width: 1282px;
    height: 791px;
    left: 50%; /* 横向距左 50% 的位置 */
    top: 50%; /* 纵向距上 50% 的位置 */
    transform: translate(-50%, -50%); /* 水平、垂直都居中 */
    z-index: 6;
    pointer-events: none;
    background-image: url('@/assets/images/focus-bg.png');
    background-size: 100% 100%;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .cover-focus-collapsed {
    width: 1712px;
    height: 913px;
  }

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 86px;
    z-index: 10;
    background: url('@/assets/images/header-bg.png') no-repeat center center;
    background-size: 100% 100%;

    &-info {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    }
  }

  &__main {
    position: relative;
    width: 100%;
    height: 100%;

    &-float {
      position: absolute;
      width: 317px;
      height: 80vh;
      z-index: 10;
    }

    .left-float {
      top: 112px;
      left: 5px;
    }

    .right-float {
      top: 112px;
      right: 5px;
    }

    .bottom-float {
      bottom: 69px;
      left: 50%;
      width: 60%;
      height: 111px;
      transform: translateX(-50%);
    }

    .dispatch-info {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 114px;
      left: 380px;
      pointer-events: none;
      transition: left 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      z-index: 10;

      &.collapsed {
        left: 30px;
      }

      &__content {
        color: #d8e3ee;
        font-family: 'Alibaba PuHuiTi 2.0';
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 2.8px;
      }
      .content-margin {
        margin: 12px 0;
      }
    }

    .btn-float {
      bottom: 70px;
      left: 350px;
      width: 46px;
      height: 153px;
      padding: 3px;
      flex-shrink: 0;
      border-radius: 100000000376832px;
      background: rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(2px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: left 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      transform: scale(1);
      z-index: 100;

      &:hover {
        transform: scale(1.05);
        background-color: rgba(0, 0, 0, 0.6);
      }
      &.collapsed {
        left: 30px;
      }
    }

    .scale-float {
      top: 207px;
      right: 350px;
      width: 150px;
      height: auto;
      pointer-events: none;
      transition: right 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);

      &.collapsed {
        right: 30px;
      }
    }
  }

  &__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 46px;
    background: url('@/assets/images/footer-bg.png') no-repeat center center;
    background-size: 100% 100%;
    z-index: 10;
  }
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
  transform: translateX(0);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
  transform: translateX(0);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: all 0.5s ease;
  transform: translateX(0);
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
