<script setup>
import BatteryIcon from '@/components/icon/BatteryIcon.vue'
import { BATTERY_STATUS_LAYOUT_ENUM } from '@/utils/enum.js'

const props = defineProps({
  isShow: { type: Boolean, defalut: false },
})

const subTitle = computed(() => {
  if (props.isShow) {
    return '2025-6-15 15:12:00 到 油井41-60'
  } else {
    return '待作业'
  }
})
</script>

<template>
  <div class="card car-card">
    <div class="card__header">
      <span class="card__header-title">运输车辆</span>
      <div class="splie-line"></div>
      <span class="card__header-subtitle">{{ subTitle }}</span>
    </div>
    <div class="qtyn-line"></div>
    <div class="card__content car-content">
      <div class="card__content-info">
        <div class="item-row">
          <span class="item-row__label">司机：</span>
          <span class="item-row__value">张三</span>
        </div>
        <div class="item-row">
          <span class="item-row__label">司机联系电话：</span>
          <span class="item-row__value">152 1622 2865</span>
        </div>
        <div class="item-row">
          <span class="item-row__label">电工：</span>
          <span class="item-row__value">梁工</span>
        </div>
        <div class="item-row">
          <span class="item-row__label">电工联系电话：</span>
          <span class="item-row__value">152 1622 2865</span>
        </div>
      </div>
      <div class="card__content-status" v-if="props.isShow">
        <div class="car-desc">预计到达时间：<span class="time">2025-6-15 14:32:00</span></div>
        <battery-icon
          battery-num="06"
          batter-status="normal"
          :show-status="BATTERY_STATUS_LAYOUT_ENUM.horizontal"
          :soc="100"
        ></battery-icon>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './card.less';

.car-card {
  flex: 1;
}

.car-content {
  margin-top: 35px;
}

.car-desc {
  margin-bottom: 16px;
  color: #5890a4;
  font-family: 'Alibaba PuHuiTi 2.0';
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 1.4px;
  .time {
    color: #34e0e0;
  }
}

.car-info {
  display: flex;
  align-items: center;

  .info-item {
    padding-left: 16px;
    color: #5890a4;
    font-size: 18px;
    font-family: Alibaba PuHuiTi 2;
    font-weight: 300;
    letter-spacing: 1.8px;
    word-wrap: break-word;

    .soc {
      color: #00ff90;
      font-weight: 400;
    }
  }
}

.card__content-status {
  justify-content: flex-start;
}
</style>
