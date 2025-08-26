<script setup>
import BatteryIcon from '@/components/icon/BatteryIcon.vue'
import { BATTERY_STATUS_LAYOUT_ENUM } from '@/utils/enum.js'
import { useControlStore } from '@/stores/control.js'

const control = useControlStore()

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
  <div class="well-overlay">
    <div v-if="isSimple" class="simple-overlay">
      <div class="simple-overlay__title">{{ title }}</div>
      <div class="simple-overlay__info">
        <img class="simple-overlay__info-img" src="@/assets/images/overlay/operator-icon.png" />
        <span class="simple-overlay__info-label">负责人：</span>
        <span class="simple-overlay__info-value">{{ name }}</span>
      </div>
      <div class="simple-overlay__info">
        <img class="simple-overlay__info-img" src="@/assets/images/overlay/phone-icon.png" />
        <span class="simple-overlay__info-label">联系电话：</span>
        <span class="simple-overlay__info-value">{{ phone }}</span>
      </div>
    </div>
    <div v-else class="well-normal">
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
  </div>
</template>

<style lang="less" scoped>
.overlay-box {
  flex-shrink: 0;
  padding: 12px 16px;
  border-radius: 12px;
  border: 0.1px solid #fff;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.35) 0%, #44657c 100%);
  backdrop-filter: blur(12px);
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

.well-normal {
  .overlay-box();
  width: 278px;

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
