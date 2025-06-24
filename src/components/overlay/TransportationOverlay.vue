<template>
  <div class="transportation-overlay" :style="containerStyle">
    <!-- Header -->
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="battery-time">
        电池剩余可用时间:
        <span class="time">{{ availableTime }}分钟</span>
      </div>
    </div>

    <!-- SOC进度条 -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressSOC + '%' }" />
      
      <!-- 10% 刻度 -->
      <div class="tick" :style="{ left: '10%' }">
        <div class="tick-text" style="color: #FF0000">10%</div>
        <div class="tick-line" style="background-color: #FF0000" />
      </div>

      <!-- 30% 刻度 -->
      <div class="tick" :style="{ left: '30%' }">
        <div class="tick-text" style="color: #FF8000">30%</div>
        <div class="tick-line" style="background-color: #FF8000" />
      </div>

      <!-- 预计到达刻度 -->
      <div class="tick arrival-tick" :style="{ left: expectedArriveProgressSoc + '%' }">
        <div class="tick-line" style="background-color: #80FF00" />
      </div>

      <!-- 进度条百分比文字 -->
      <div class="progress-text">
        剩余soc：<span class="soc-value" :style="{ color: socValueColor }">{{ progressSOC }}%</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-left">
        <img class="car-icon" src="/src/assets/images/overlay/task-car-icon.png" alt="car" />
        <div class="arrival-time">
          后续车辆预计到达时间：
          <span class="time">{{ expectedArriveTime }}分钟</span>
        </div>
      </div>
      <img
        class="arrow-icon"
        src="/src/assets/images/overlay/right-arrow-icon.png"
        alt="arrow"
        @click="handleArrowClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { STATUS_ENUM } from '@/utils/enum'

// Props 定义
const props = defineProps({
  title: { type: String, required: true },
  status: { type: Number, default: STATUS_ENUM.normal },
  availableTime: { type: Number, required: true },
  progressSOC: { type: Number, default: 15 },
  expectedArriveTime: { type: Number, default: 0 },
  expectedArriveProgressSoc: { type: Number, default: 0 },
  zIndex: { type: Number, default: 1 },
})

// 本地响应式数据
const title = ref(props.title)
const status = ref(props.status)
const availableTime = ref(props.availableTime)
const progressSOC = ref(props.progressSOC)
const expectedArriveTime = ref(props.expectedArriveTime)
const expectedArriveProgressSoc = ref(props.expectedArriveProgressSoc)
const zIndex = ref(props.zIndex)

// 暴露更新方法
defineExpose({
  updateData(newData) {
    if (newData.title !== undefined) title.value = newData.title
    if (newData.status !== undefined) status.value = newData.status
    if (newData.availableTime !== undefined) availableTime.value = newData.availableTime
    if (newData.progressSOC !== undefined) progressSOC.value = newData.progressSOC
    if (newData.expectedArriveTime !== undefined) expectedArriveTime.value = newData.expectedArriveTime
    if (newData.expectedArriveProgressSoc !== undefined) expectedArriveProgressSoc.value = newData.expectedArriveProgressSoc
    if (newData.zIndex !== undefined) zIndex.value = newData.zIndex
  }
})

// 状态样式配置
const statusStyles = {
  [STATUS_ENUM.normal]: {
    background: 'linear-gradient(270deg, rgba(8, 70, 65, 0.35) 0%, #1D736C 100%)',
    textColor: '#00FF90',
  },
  [STATUS_ENUM.warning]: {
    background: 'linear-gradient(270deg, rgba(85, 60, 15, 0.35) 0%, #73551D 100%)',
    textColor: '#FF9D00',
  },
  [STATUS_ENUM.error]: {
    background: 'linear-gradient(270deg, rgba(70, 8, 8, 0.35) 0%, #731D1D 100%)',
    textColor: '#FF0000',
  },
}

// 计算容器样式
const containerStyle = computed(() => ({
  zIndex: zIndex.value,
  background: statusStyles[status.value]?.background,
  transform: 'translate(-50%, -100%)',
}))

// soc-value 字体颜色
const socValueColor = computed(() => (progressSOC.value > 85 ? '#fff' : '#FF9D00'))

// 事件处理
const handleArrowClick = () => {
  console.log('右箭头被点击了')
}
</script>

<style lang="less" scoped>
.transportation-overlay {
  position: absolute;
  width: 332px;
  height: 157px;
  padding: 16px;
  border-radius: 12px;
  border: 0.1px solid #FFF;
  backdrop-filter: blur(7.5px);
  left: 50%;
  top: 0;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: #fff;
    font-family: "Alibaba PuHuiTi 2.0";
    font-size: 18px;
    font-weight: 1000;
    letter-spacing: 3.6px;
  }

  .battery-time {
    color: #fff;
    font-family: "Alibaba PuHuiTi 2.0";
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 2.8px;

    .time {
      color: #FF9D00;
    }
  }
}

.progress-bar {
  position: relative;
  width: 300px;
  height: 26px;
  margin-top: 31px;
  background-color: rgba(128, 128, 128, 0.20);
  border-radius: 9999px;

  .progress {
    position: absolute;
    left: 0;
    top: 0;
    height: 26px;
    background-color: #FF9D00;
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
      font-family: "Alibaba PuHuiTi 2.0";
      font-size: 14px;
      font-weight: 400;
    }

    .tick-line {
      width: 2px;
      height: 26px;
    }

    &.arrival-tick {
      top: 0;

      .tick-line {
        height: 42px;
      }
    }
  }

  .progress-text {
    position: absolute;
    right: 12px;
    top: 3px;
    color: #FFF;
    font-family: "Alibaba PuHuiTi 2.0";
    font-size: 14px;
    font-weight: 400;
    z-index: 2;

    // .soc-value {
    //   /* color 由js动态控制 */
    // }
  }
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
      font-family: "Alibaba PuHuiTi 2.0";
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 2.8px;

      .time {
        color: #00FF90;
      }
    }
  }

  .arrow-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style> 