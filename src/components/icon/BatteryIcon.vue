<script setup>
import { computed } from 'vue'
import { BATTERY_STATUS_ENUM, BATTERY_STATUS_LAYOUT_ENUM } from '@/utils/enum.js'

const props = defineProps({
  batteryNum: { type: String, required: true },
  batterStatus: {
    type: String,
    default: 'normal',
    validator: (v) =>
      [BATTERY_STATUS_ENUM.normal, BATTERY_STATUS_ENUM.warning, BATTERY_STATUS_ENUM.error].includes(
        v,
      ),
  },
  showStatus: {
    type: Number,
    default: 0,
    validator: (v) =>
      [
        BATTERY_STATUS_LAYOUT_ENUM.hidden,
        BATTERY_STATUS_LAYOUT_ENUM.vertical,
        BATTERY_STATUS_LAYOUT_ENUM.horizontal,
      ].includes(v),
  },
  power: { type: Number, default: 0 },
  soc: { type: Number, default: 0 },
})

const isNormal = computed(() => props.batterStatus === BATTERY_STATUS_ENUM.normal)
</script>

<template>
  <div class="battery-card">
    <!-- icon -->
    <div :class="['icon', isNormal ? 'icon-normal' : '']">
      <div :class="['icon-battery', isNormal ? 'icon-battery-normal' : '']">
        <img v-if="isNormal" src="@/assets/images/popup/battery-green.png" />
        <img v-else src="@/assets/images/popup/battery-yellow.png" />
        <div :class="['battery-num', isNormal ? 'battery-num-normal' : '']">
          {{ props.batteryNum }}
        </div>
      </div>
    </div>
    <!-- status info -->
    <div class="status-info" v-if="showStatus === BATTERY_STATUS_LAYOUT_ENUM.vertical">
      <div :class="['status-info__item', isNormal ? 'info-normal' : '']">
        <span class="status-info__item-label">功率：</span>
        <span class="status-info__item-value">{{ power }}kW</span>
      </div>
      <div :class="['status-info__item', isNormal ? 'info-normal' : '']">
        <span class="status-info__item-label">SOC：</span>
        <span class="status-info__item-value">{{ soc }}%</span>
      </div>
    </div>
    <div class="status-info-row" v-if="showStatus === BATTERY_STATUS_LAYOUT_ENUM.horizontal">
      <div class="row-item" v-if="power">
        <span class="row-item-label">功率：</span>
        <span class="row-item-value">{{ power }}kW</span>
      </div>
      <div class="row-item">
        <span class="row-item-label">SOC：</span>
        <span
          class="row-item-value"
          :class="['row-item-value', isNormal ? 'row-item-value-normal' : 'row-item-value-waring']"
          >{{ soc }}%</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.battery-card {
  display: flex;
  align-items: center;

  .icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border: 1px solid #9f8d28;
    padding: 4px;

    .icon-battery {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border: 1px solid #ffcf10;
      background: rgba(53, 53, 53, 0.5);
      backdrop-filter: blur(2px);

      img {
        width: 26px;
        height: 26px;
        flex-shrink: 0;
      }

      .battery-num {
        margin-top: -5px;
        color: #ffcf10;
        font-family: 'Alibaba PuHuiTi 2.0';
        font-size: 12px;
        font-weight: 1000;
        letter-spacing: 1.2px;
      }
    }
  }

  .icon-normal {
    border: 1px solid #289f7a;

    .icon-battery-normal {
      border: 1px solid #10ffb3;

      .battery-num-normal {
        color: #10ffb3;
      }
    }
  }

  .status-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 16px;

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-label {
        color: #a4a458;
        font-size: 14px;
        font-family: Alibaba PuHuiTi 2;
        font-weight: 300;
        letter-spacing: 1.4px;
        word-wrap: break-word;
      }

      &-value {
        color: #ffcf10;
        font-size: 14px;
        font-family: Alibaba PuHuiTi 2;
        font-weight: 400;
        letter-spacing: 1.4px;
        word-wrap: break-word;
      }
    }

    .info-normal {
      .status-info__item-label {
        color: #58a47a;
      }
      .status-info__item-value {
        color: #34e07c;
      }
    }
  }

  .status-info-row {
    display: flex;
    align-items: center;

    .row-item {
      margin-left: 16px;
      color: #5890a4;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 18px;
      letter-spacing: 1.8px;
      &-label {
        font-weight: 300;
      }

      &-value {
        color: #34e0e0;
        font-weight: 400;
      }

      .row-item-value-normal {
        color: #00ff90;
      }

      .row-item-value-waring {
        color: #ff9d00;
      }
    }
  }
}
</style>
