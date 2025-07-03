<script setup>
import ProgressSoc from '@/components/progress/ProgressSoc.vue'
import BatteryIcon from '@/components/icon/BatteryIcon.vue'

const props = defineProps({
  isShow: { type: Boolean, defalut: false },
})
</script>

<template>
  <div class="card">
    <div class="card__header">
      <span class="card__header-title">油井41-60</span>
      <div class="splie-line"></div>
      <span class="card__header-subtitle">一开钻井</span>
    </div>
    <div class="qtyn-line"></div>
    <div class="card__content">
      <div class="card__content-info">
        <div class="item-row">
          <span class="item-row__label">负责人：</span>
          <span class="item-row__value">张三</span>
        </div>
        <div class="item-row">
          <span class="item-row__label">联系电话：</span>
          <span class="item-row__value">152 1622 2865</span>
        </div>
        <div class="item-row">
          <span class="item-row__label">今日预估用电量：</span>
          <span class="item-row__value">800kWh</span>
        </div>
        <div class="item-row">
          <span class="item-row__label">今日预估功率范围：</span>
          <span class="item-row__value">100~3000kWh</span>
        </div>
        <div class="item-row">
          <span class="item-row__label">累计用电量：</span>
          <span class="item-row__value">11,000kWh/23,000元</span>
        </div>
      </div>
      <div class="card__content-status" v-if="props.isShow">
        <div class="battery-info">
          <battery-icon battery-num="01" batter-status="warning"></battery-icon>
          <div class="info-item">
            功率：<span class="power">100kW</span>SOC：<span class="soc">27%</span>
          </div>
        </div>
        <div class="battery-status">
          <progress-soc progressSOC="27" expectedArriveProgressSoc="8"></progress-soc>
        </div>
        <div class="footer">
          <div class="footer-left">
            <img class="car-icon" src="/src/assets/images/overlay/task-car-icon.png" alt="car" />
            <div class="arrival-time">
              后续车辆预计到达时间：
              <span class="time">15分钟</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './card.less';

.battery-info {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .info-item {
    padding-left: 16px;
    color: #5890a4;
    font-size: 18px;
    font-family: Alibaba PuHuiTi 2;
    font-weight: 300;
    letter-spacing: 1.8px;
    word-wrap: break-word;

    .power {
      color: #34e0e0;
      font-weight: 400;
      padding-right: 16px;
    }

    .soc {
      color: #ff9d00;
      font-weight: 400;
    }
  }
}

.battery-status {
  width: 300px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;

  .footer-left {
    display: flex;
    align-items: center;

    .car-icon {
      width: 20px;
      height: 14px;
    }

    .arrival-time {
      padding-left: 8px;
      color: #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 2.8px;

      .time {
        color: #00ff90;
      }
    }
  }
}
</style>
