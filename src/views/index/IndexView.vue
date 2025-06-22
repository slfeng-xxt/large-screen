<script setup>
import TimeCard from '@/views/index/components/TimeCard.vue'
import WeatherCard from '@/views/index/components/WeatherCard.vue'
// import MapCard from '@/views/index/components/MapCard.vue'
import MapKb from '@/views/index/components/MapKb.vue'
import BatteryInfo from '@/views/index/components/BatteryInfo.vue'
import ChargeSituation from '@/views/index/components/ChargeSituation.vue'
import ElectricityAccrual from '@/views/index/components/ElectricityAccrual.vue'
import OndutyStaff from '@/views/index/components/OndutyStaff.vue'
import FooterCard from '@/views/index/components/FooterCard.vue'
</script>

<template>
  <div class="yn">
    <!-- 第一层: 地图 -->
    <!-- <map-card class="yn__map" /> -->
    <map-kb class="yn__map" />
    <!-- 第二层: 蒙板 -->
    <div class="yn__top-bg"></div>
    <div class="yn__side-bg yn__side-left"></div>
    <div class="yn__side-bg yn__side-right"></div>
    <div class="yn__bottom-bg"></div>
    <!-- 第三层: 标题,侧边,底部 -->
    <header class="yn__header">
      <div class="yn__header-info">
        <weather-card />
        <time-card />
      </div>
    </header>
    <main class="yn__main">
      <div class="yn__main-float left-float">
        <battery-info />
        <charge-situation />
      </div>
      <div class="yn__main-float right-float">
        <electricity-accrual />
        <onduty-staff />
      </div>
      <div class="yn__main-float bottom-float">
        <footer-card />
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

  &__map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__top-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 123px;
    flex-shrink: 0;
    background: linear-gradient(0deg, rgba(8, 33, 49, 0) 0%, #010c14 100%);
    z-index: 6;
  }

  &__bottom-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 180px;
    background: linear-gradient(180deg, rgba(8, 33, 49, 0) 0%, #010c14 100%);
    z-index: 6;
  }

  &__side-bg {
    position: absolute;
    top: 0;
    z-index: 6;
  }

  &__side-left {
    left: 0;
    width: 22%;
    height: 100%;
    flex-shrink: 0;
    background: linear-gradient(270deg, rgba(8, 33, 49, 0) 0%, #010c14 100%);
  }

  &__side-right {
    right: 0;
    width: 22%;
    height: 100%;
    flex-shrink: 0;
    background: linear-gradient(90deg, rgba(8, 33, 49, 0) 0%, #010c14 100%);
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
      width: 330px;
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
      transform: translateX(-50%);
      width: 60%;
      height: 111px;
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
</style>
