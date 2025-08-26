<script setup>
import BatteryIcon from '@/components/icon/BatteryIcon.vue'
import { BATTERY_STATUS_LAYOUT_ENUM } from '@/utils/enum.js'
import { useControlStore } from '@/stores/control.js'

const control = useControlStore()

defineProps({
  title: { type: String, required: true },
  linkman: { type: String, default: '' },
  phone: { type: String, default: '' },
  electricQuantity: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  leisureNumber: { type: Number, default: 0 },
  batteryList: { type: Array, default: () => [] },
})

const isSimple = ref(true)

// 监听地图缩放
watch(
  () => Math.round(control.currentZoom),
  (newVal) => {
    isSimple.value = newVal <= 15
  },
  { immediate: true },
)
</script>

<template>
  <div class="charge-overlay">
    <div v-if="isSimple" class="simple-overlay">
      <div class="simple-overlay__title">{{ title }}</div>
      <div class="simple-overlay__info">
        <img class="simple-overlay__info-img" src="@/assets/images/overlay/operator-icon.png" />
        <span class="simple-overlay__info-label">负责人：</span>
        <span class="simple-overlay__info-value">{{ linkman }}</span>
      </div>
      <div class="simple-overlay__info">
        <img class="simple-overlay__info-img" src="@/assets/images/overlay/phone-icon.png" />
        <span class="simple-overlay__info-label">联系电话：</span>
        <span class="simple-overlay__info-value">{{ phone }}</span>
      </div>
    </div>
    <div v-else class="charge-normal">
      <div class="charge-normal__header">
        <div class="charge-normal__title">{{ title }}</div>
        <div class="charge-normal__contact">
          <span class="charge-normal__linkman">{{ linkman }}</span>
          <span class="charge-normal__phone">{{ phone }}</span>
        </div>
      </div>
      <div class="qtyn-charge-line"></div>
      <div class="charge-normal__content">
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
  </div>
</template>

<style lang="less" scoped>
.overlay-box {
  padding: 12px 16px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 0.1px solid #fff;
  background: linear-gradient(270deg, rgba(13, 72, 43, 0.35) 0%, #2e7e56 100%);
  backdrop-filter: blur(7.5px);
}

.simple-overlay {
  width: 269px;
  .overlay-box();

  &__title {
    color: #fff;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 18px;
    font-weight: 1000;
    letter-spacing: 3.6px;
  }

  &__info {
    display: flex;
    align-items: center;
    margin-top: 16px;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 2.8px;

    &-img {
      width: 20px;
      height: 20px;
    }

    &-label {
      color: #63a9a4;
    }

    &-value {
      color: #fff;
    }
  }
}

.charge-normal {
  width: 366px;
  .overlay-box();

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
