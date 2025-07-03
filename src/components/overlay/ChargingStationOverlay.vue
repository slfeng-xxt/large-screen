<script setup>
import BatteryIcon from '@/components/icon/BatteryIcon.vue'
import { BATTERY_STATUS_LAYOUT_ENUM } from '@/utils/enum.js'
defineProps({
  title: { type: String, required: true },
  linkman: { type: String, default: '' },
  phone: { type: String, default: '' },
  electricQuantity: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  leisureNumber: { type: Number, default: 0 },
  batteryList: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="charge-overlay">
    <div class="charge-overlay__header">
      <div class="charge-overlay__title">{{ title }}</div>
      <div class="charge-overlay__contact">
        <span class="charge-overlay__linkman">{{ linkman }}</span>
        <span class="charge-overlay__phone">{{ phone }}</span>
      </div>
    </div>
    <div class="qtyn-charge-line"></div>
    <div class="charge-overlay__content">
      <div class="charge-info">
        <div class="charge-info-item">
          <span class="item-label">单日用电量：</span>
          <span class="item-value">{{ electricQuantity }}kWh/{{ money }}元</span>
        </div>
        <div class="charge-info-item">
          <span class="item-label">空闲充电桩：</span>
          <span class="item-value">{{ leisureNumber }}</span>
        </div>
      </div>
      <div class="battery-list">
        <div class="battery-item" v-for="(battery, index) in batteryList" :key="index">
          <battery-icon
            :batteryNum="battery.num"
            :power="battery.power"
            :soc="battery.soc"
            :batterStatus="battery.status"
            :show-status="BATTERY_STATUS_LAYOUT_ENUM.vertical"
          />
        </div>
      </div>
    </div>
    <div class="qtyn-charge-line"></div>
  </div>
</template>

<style lang="less" scoped>
.charge-overlay {
  width: 366px;
  padding: 12px 16px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 0.1px solid #fff;
  background: linear-gradient(270deg, rgba(13, 72, 43, 0.35) 0%, #2e7e56 100%);
  backdrop-filter: blur(7.5px);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    color: #fff;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 16px;
    font-weight: 1000;
    letter-spacing: 1.6px;
  }

  &__contact {
    display: flex;
    align-items: center;
    color: #fff;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.4px;
  }

  &__content {
    display: flex;
    flex-direction: column;

    .charge-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 23px;

      .charge-info-item {
        .item-label {
          color: #58a47a;
          font-family: 'Alibaba PuHuiTi 2.0';
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 1.4px;
        }

        .item-value {
          color: #34e07c;
          font-family: 'Alibaba PuHuiTi 2.0';
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 1.4px;
        }
      }
    }

    .battery-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
</style>
