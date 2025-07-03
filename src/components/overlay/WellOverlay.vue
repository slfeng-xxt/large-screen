<script setup>
import BatteryIcon from '@/components/icon/BatteryIcon.vue'
import { BATTERY_STATUS_LAYOUT_ENUM } from '@/utils/enum.js'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  estimatedPower: { type: String, required: true },
  totalelectricity: { type: String, required: true },
  totalMoney: { type: String, required: true },
  battery: {
    type: Object,
    default: () => ({
      num: '01',
      power: 100,
      soc: 80,
      status: 'normal',
    }),
  },
})
</script>

<template>
  <div class="well-normal">
    <div class="well-normal__header">
      <div class="well-normal__header-title">{{ title }}</div>
      <div class="split-line"></div>
      <div class="well-normal__header-subtitle">{{ subtitle }}</div>
    </div>
    <div class="qtyn-well-line"></div>
    <div class="well-normal__content">
      <div class="content-person">{{ name }} {{ phone }}</div>
      <div class="content-info">
        预估功率：<span>{{ estimatedPower }}kWh</span>
      </div>
      <div class="content-info">
        累计用电：<span>{{ totalelectricity }}kWh/{{ totalMoney }}元</span>
      </div>
    </div>
    <div class="qtyn-well-line"></div>
    <battery-icon
      :batteryNum="battery.num"
      :power="battery.power"
      :soc="battery.soc"
      :batterStatus="battery.status"
      :show-status="BATTERY_STATUS_LAYOUT_ENUM.vertical"
    />
  </div>
</template>

<style lang="less" scoped>
.well-normal {
  width: 278px;
  flex-shrink: 0;
  padding: 12px 16px;
  border-radius: 12px;
  border: 0.1px solid #fff;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.35) 0%, #44657c 100%);
  backdrop-filter: blur(12px);

  &__header {
    display: flex;
    align-items: center;

    &-title {
      color: #fff;
      text-align: center;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 16px;
      font-weight: 1000;
      letter-spacing: 1.6px;
    }

    .split-line {
      width: 2px;
      height: 10px;
      border-radius: 99999px;
      background: #296876;
      margin: 0 12px;
    }

    &-subtitle {
      color: #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 1.6px;
    }
  }

  &__content {
    .content-person {
      color: #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1.4px;
    }

    .content-info {
      margin-top: 7px;
      color: #5890a4;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 1.4px;

      span {
        color: #34e0e0;
        font-weight: 400;
      }
    }
  }
}
</style>
