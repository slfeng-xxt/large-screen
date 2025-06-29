<template>
  <div class="trans-card">
    <div class="header">
      <div class="header__title">{{ props.title }}</div>
      <div class="header__status">
        <span v-if="isArrived">车辆已到达</span>
        <div v-else class="header__status-work">
          <span class="is-exchange">换电中</span>
          <span class="is-normal">作业正常</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-row">
        <img src="@/assets/images/overlay/operator-icon.png" alt="operator" />
        <span class="main-row__label">操作人员：</span>
        <span class="main-row__value">{{ props.operator }}</span>
      </div>
      <div class="main-row">
        <img src="@/assets/images/overlay/phone-icon.png" alt="phone" />
        <span class="main-row__label">联系电话：</span>
        <span class="main-row__value">{{ props.phone }}</span>
      </div>
      <div class="main-row">
        <img src="@/assets/images/overlay/time-icon.png" alt="completionTime" />
        <span class="main-row__label">预计切换完成时间：</span>
        <span class="main-row__value">{{ completionTime }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { STATUS_ENUM } from '@/utils/enum'

// Props 定义
const props = defineProps({
  title: { type: String, required: true },
  status: { type: Number, default: STATUS_ENUM.arrived },
  operator: { type: String, default: '张三' },
  phone: { type: String, default: '12345678901' },
  completionTime: { type: String, default: '12:00:00' },
})

const isArrived = computed(() => props.status === STATUS_ENUM.arrived)
</script>

<style lang="less" scoped>
.trans-card {
  width: 333px;
  // height: 157px;
  padding: 12px 16px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 0.1px solid #fff;
  background: linear-gradient(270deg, rgba(8, 70, 65, 0.35) 0%, #1d736c 100%);
  backdrop-filter: blur(7.5px);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
      color: #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 18px;
      font-weight: 1000;
      letter-spacing: 3.6px;
    }

    &__status {
      color: #6fff00;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 2.8px;

      &-work {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .is-exchange {
          color: #fff;
          padding-right: 16px;
        }

        .is-normal::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #6fff00;
          border-radius: 50%;
          margin-right: 6px;
        }
      }
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    // gap: 8px;

    .main-row {
      display: flex;
      align-items: center;
      margin-top: 12px;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      letter-spacing: 2.8px;

      img {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      &__label {
        padding-left: 3px;
        color: #63a9a4;
        font-weight: 400;
      }

      &__value {
        color: #fff;
        font-weight: 500;
      }
    }
  }
}
</style>
