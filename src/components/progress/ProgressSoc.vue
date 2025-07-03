<script setup>
import { computed } from 'vue'

const props = defineProps({
  progressSOC: { type: Number, default: 15 },
  expectedArriveProgressSoc: { type: Number, default: 0 },
})
// soc-value 字体颜色
const socValueColor = computed(() => (props.progressSOC.value > 85 ? '#fff' : '#FF9D00'))
</script>

<template>
  <!-- SOC进度条 -->
  <div class="progress-bar">
    <div class="progress" :style="{ width: progressSOC + '%' }" />

    <!-- 10% 刻度 -->
    <div class="tick" :style="{ left: '10%' }">
      <div class="tick-text text-percent-10">10%</div>
      <div class="tick-line line-percent-10"></div>
    </div>

    <!-- 30% 刻度 -->
    <div class="tick" :style="{ left: '30%' }">
      <div class="tick-text text-percent-30">30%</div>
      <div class="tick-line line-percent-30"></div>
    </div>

    <!-- 预计到达刻度 -->
    <div
      class="tick arrival-tick"
      :style="{ left: expectedArriveProgressSoc + '%' }"
      v-if="expectedArriveProgressSoc"
    >
      <div class="tick-line"></div>
    </div>

    <!-- 进度条百分比文字 -->
    <div class="progress-text">
      剩余soc：<span class="soc-value" :style="{ color: socValueColor }">{{ progressSOC }}%</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.progress-bar {
  position: relative;
  //   width: 300px;
  height: 26px;
  margin-top: 31px;
  background-color: rgba(128, 128, 128, 0.2);
  border-radius: 9999px;

  .progress {
    position: absolute;
    left: 0;
    top: 0;
    height: 26px;
    background-color: #ff9d00;
    border-radius: 9999px;
    z-index: 1;
    transition: width 0.3s ease;
  }

  .tick {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    width: 28px;
    height: 50px;
    top: -24px;
    z-index: 2;
    transform: translateX(-50%);

    .tick-text {
      height: 20px;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      font-weight: 400;
    }

    .text-percent-10 {
      color: #ff0000;
    }

    .text-percent-30 {
      color: #ff8000;
    }

    .tick-line {
      width: 2px;
      height: 26px;
    }

    .line-percent-10 {
      background-color: #ff0000;
    }

    .line-percent-30 {
      background-color: #ff8000;
    }

    &.arrival-tick {
      top: 0;

      .tick-line {
        height: 42px;
        background-color: #80ff00;
      }
    }
  }

  .progress-text {
    position: absolute;
    right: 12px;
    top: 3px;
    color: #fff;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 14px;
    font-weight: 400;
    z-index: 2;

    // .soc-value {
    //   /* color 由js动态控制 */
    // }
  }
}
</style>
