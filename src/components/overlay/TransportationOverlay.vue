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
    <progress-soc
      :progressSOC="progressSOC"
      :expectedArriveProgressSoc="expectedArriveProgressSoc"
    ></progress-soc>

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
import { useControlStore } from '@/stores/control.js'
import ProgressSoc from '@/components/progress/ProgressSoc.vue'

const control = useControlStore()

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
    if (newData.expectedArriveTime !== undefined)
      expectedArriveTime.value = newData.expectedArriveTime
    if (newData.expectedArriveProgressSoc !== undefined)
      expectedArriveProgressSoc.value = newData.expectedArriveProgressSoc
    if (newData.zIndex !== undefined) zIndex.value = newData.zIndex
  },
})

// 状态样式配置
const statusStyles = {
  [STATUS_ENUM.normal]: {
    background: 'linear-gradient(270deg, rgba(8, 70, 65, 0.35) 0%, #44657C 100%)',
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

// 事件处理
const handleArrowClick = () => {
  console.log('右箭头被点击了')
  control.changeStatus(status.value)
  control.toggleShow(true)
}
</script>

<style lang="less" scoped>
.transportation-overlay {
  position: absolute;
  width: 332px;
  height: 157px;
  padding: 16px;
  border-radius: 12px;
  border: 0.1px solid #fff;
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

  .arrow-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
