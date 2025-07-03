<script setup>
import ProgressSoc from '@/components/progress/ProgressSoc.vue'
// Props 定义
defineProps({
  title: { type: String, required: true },
  availableTime: { type: Number, required: true },
  progressSOC: { type: Number, default: 15 },
})
</script>

<template>
  <div class="well-error">
    <div class="well-error__header">
      <div class="title">{{ title }}</div>
      <div class="battery-time">
        电池剩余可用时间:
        <span class="time">{{ availableTime }}分钟</span>
      </div>
    </div>
    <!-- SOC进度条 -->
    <progress-soc :progressSOC="progressSOC"></progress-soc>
    <!-- Footer -->
    <div class="well-error__footer">
      <img src="@/assets/images/overlay/error-icon.png" alt="error-icon" />
      <div class="alert-tips">请注意，当前未有换电安排！</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.well-error {
  width: 333px;
  height: 154px;
  flex-shrink: 0;
  padding: 16px;
  border-radius: 12px;
  border: 0.1px solid #fff;
  background: linear-gradient(270deg, rgba(70, 8, 8, 0.35) 0%, #731d1d 100%);
  backdrop-filter: blur(7.5px);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      color: #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 18px;
      font-weight: 1000;
      letter-spacing: 3.6px;
    }

    .battery-time {
      color: #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 2.8px;

      .time {
        color: #ff9d00;
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;

    color: #f00;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 14px;
    font-weight: 1000;
    letter-spacing: 2.8px;

    img {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      margin-right: 12px;
    }
  }
}
</style>
