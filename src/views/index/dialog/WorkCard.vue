<script setup>
import BatteryIcon from '@/components/icon/BatteryIcon.vue'
import { BATTERY_STATUS_LAYOUT_ENUM } from '@/utils/enum.js'

const props = defineProps({
  isWork: { type: Boolean, default: false },
})
</script>

<template>
  <div class="card work-card">
    <div class="card__header">
      <span class="card__header-title">作业信息</span>
      <div class="splie-line"></div>
      <span class="card__header-subtitle work-subtitle">预计切换完成时间：17:23:00</span>
    </div>
    <div class="qtyn-line"></div>
    <div class="card__content work-content">
      <div class="work-info">
        <battery-icon
          battery-num="01"
          batter-status="warning"
          :show-status="BATTERY_STATUS_LAYOUT_ENUM.vertical"
        />
        <div class="work-arrow">
          <img src="@/assets/images/popup/change-arrow.png" />
          <img src="@/assets/images/popup/change-arrow.png" />
          <img src="@/assets/images/popup/change-arrow.png" />
        </div>
        <battery-icon
          battery-num="06"
          batter-status="normal"
          :show-status="BATTERY_STATUS_LAYOUT_ENUM.horizontal"
        />
      </div>
      <div class="work-change">
        <div class="work-change__info">电池01 更换为 电池08</div>
        <div class="work-change__status" v-if="props.isWork">作业正常</div>
      </div>
      <div class="work-oprator">
        <div>操作电工：<span>张三</span></div>
        <div class="splie-line"></div>
        <div>联系电话：<span>152 1622 2865</span></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './card.less';

.work-card {
  width: 697px;

  .work-content {
    display: flex;
    flex-direction: column;
  }

  .work-subtitle {
    color: #00ff90;
    font-size: 16px;
    font-family: Alibaba PuHuiTi 2;
    font-weight: 400;
    letter-spacing: 1.6px;
    word-wrap: break-word;
  }

  .work-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 26px;

    .work-arrow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 155px;

      @keyframes wave-scale {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
      }

      img {
        width: 37px;
        height: 50px;
        margin: 0 4px;
        animation: wave-scale 1.2s infinite;
      }
      img:nth-child(1) {
        animation-delay: 0s;
      }
      img:nth-child(2) {
        animation-delay: 0.2s;
      }
      img:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }

  .work-change {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.4px;

    &__info {
      color: #fff;
    }

    &__info::before {
      content: ' ';
      display: inline-block;
      width: 2px;
      height: 8px;
      margin-right: 6px;
      border-radius: 12px;
      background: #fff;
      backdrop-filter: blur(12px);
    }

    &__status {
      color: #00ff90;
    }
  }

  .work-oprator {
    display: flex;
    align-items: center;
    margin-top: 16px;
    color: #5890a4;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1.4px;

    span {
      color: #34e0e0;
    }
  }
}
</style>
