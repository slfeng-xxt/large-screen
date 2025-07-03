<script setup>
import BatteryIcon from '@/components/icon/BatteryIcon.vue'
import { BATTERY_STATUS_LAYOUT_ENUM } from '@/utils/enum.js'
// const props = defineProps({
//   isShow: { type: Boolean, defalut: false },
// })

const batteryList = [
  {
    num: '01',
    status: 'normal',
    power: 100,
    soc: 100,
  },
  {
    num: '08',
    status: 'warning',
    power: 100,
    soc: 20,
  },
  {
    num: '06',
    status: 'normal',
    power: 100,
    soc: 100,
  },
  {
    num: '05',
    status: 'warning',
    power: 100,
    soc: 20,
  },
  {
    num: '03',
    status: 'normal',
    power: 100,
    soc: 100,
  },
  {
    num: '07',
    status: 'normal',
    power: 100,
    soc: 100,
  },
]
</script>

<template>
  <div class="card">
    <div class="card__header charge-header">
      <div class="charge-header-info">
        <span class="card__header-title">充电站1</span>
        <div class="splie-line"></div>
        <span class="card__header-subtitle">张三 15216222865</span>
        <div class="splie-line"></div>
        <span class="card__header-subtitle">单日用电量：800kWh/700元</span>
      </div>
      <div class="charge-proportion">充电桩（在用/空闲）：2/6</div>
    </div>
    <div class="qtyn-line"></div>
    <div class="card__content charge-content">
      <div v-for="battery in batteryList" :key="battery.num" class="battery-info">
        <battery-icon
          :battery-num="battery.num"
          :batter-status="battery.status"
          :show-status="BATTERY_STATUS_LAYOUT_ENUM.vertical"
          :power="battery.power"
          :soc="battery.soc"
        ></battery-icon>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './card.less';

.charge-header {
  justify-content: space-between;

  &-info {
    display: flex;
    align-items: center;
  }

  .charge-proportion {
    color: #fff;
    text-align: center;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 16px;
    font-style: normal;
    font-weight: 1000;
    line-height: normal;
    letter-spacing: 1.6px;
  }
}

.charge-content {
  justify-content: space-between;
  width: 1300px;
  flex-wrap: wrap;

  .battery-info {
    margin-top: 16px;
    margin-right: 36px;
  }
}
</style>
