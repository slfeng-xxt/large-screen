<template>
  <div class="progress-container">
    <div
      class="progress-stage"
      :class="{
        active: currentStage >= DIALOG_TASK_PROGRESS_ENUM.transportation,
        'active-animation': currentStage === DIALOG_TASK_PROGRESS_ENUM.transportation,
      }"
    >
      <div class="stage-bar"></div>
      <div class="stage-label">
        <div class="stage-circle">
          <div class="center-circle"></div>
        </div>
        <div class="stage-name">运输中</div>
      </div>
    </div>
    <div
      class="progress-stage"
      :class="{
        active: currentStage >= DIALOG_TASK_PROGRESS_ENUM.change,
        'active-animation': currentStage === DIALOG_TASK_PROGRESS_ENUM.change,
      }"
    >
      <div class="stage-bar"></div>
      <div class="stage-label">
        <div class="stage-circle"><div class="center-circle"></div></div>
        <div class="stage-name">换电中</div>
      </div>
      <div class="stage-desc-1" v-if="currentStage === DIALOG_TASK_PROGRESS_ENUM.transportation">
        <span class="distance-label">总运输距离：</span
        ><span class="distance-value">{{ distance }}</span> <span class="surplus-label">剩余：</span
        ><span class="surplus-value">{{ surplus }}</span>
        <div class="line"></div>
        <span class="surplus-value">{{ time }}</span>
      </div>
      <div class="stage-desc-2" v-if="currentStage === DIALOG_TASK_PROGRESS_ENUM.change">
        车辆已到达
      </div>
    </div>
    <div
      class="progress-stage"
      :class="{
        active: currentStage >= DIALOG_TASK_PROGRESS_ENUM.pull,
        'active-animation': currentStage === DIALOG_TASK_PROGRESS_ENUM.pull,
      }"
    >
      <div class="stage-bar"></div>
      <div class="stage-label">
        <div class="stage-circle"><div class="center-circle"></div></div>
        <div class="stage-name">拉回</div>
      </div>
      <div class="stage-desc-1" v-if="currentStage === DIALOG_TASK_PROGRESS_ENUM.pull">
        <span class="distance-label">总运输距离：</span
        ><span class="distance-value">{{ distance }}</span> <span class="surplus-label">剩余：</span
        ><span class="surplus-value">{{ surplus }}</span>
        <div class="line"></div>
        <span class="surplus-value">{{ time }}</span>
      </div>
    </div>
    <div class="progress-stage">
      <div class="stage-bar"></div>
      <div class="stage-label"></div>
    </div>
  </div>
</template>

<script setup>
import { DIALOG_TASK_PROGRESS_ENUM } from '@/utils/enum.js'
defineProps({
  currentStage: {
    type: Number,
    required: true,
    validator: (value) =>
      [
        DIALOG_TASK_PROGRESS_ENUM.transportation,
        DIALOG_TASK_PROGRESS_ENUM.change,
        DIALOG_TASK_PROGRESS_ENUM.pull,
      ].includes(value),
  },
  distance: {
    type: String,
    default: '50km',
  },
  surplus: {
    type: String,
    default: '25km',
  },
  time: {
    type: String,
    default: '15分钟',
  },
})
</script>

<style scoped lang="less">
.progress-container {
  display: flex;
  justify-content: space-between;
  margin: 52px 0;

  .progress-stage {
    position: relative;

    .stage-bar {
      width: 504px;
      height: 4px;
      flex-shrink: 0;
      border-radius: 999999px;
      background-color: #134a59;
    }

    &:first-child,
    &:last-child {
      .stage-bar {
        width: 152px;
        height: 4px;
        flex-shrink: 0;
        border-radius: 999999px;
        background-color: #134a59;
      }
    }

    .stage-label {
      position: absolute;
      top: -8px;
      right: -30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      z-index: 10;

      .stage-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #497a87;
        margin-bottom: 16px;

        .center-circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #71949d;
        }
      }

      .stage-name {
        color: #71949d;
        text-align: center;
        font-family: 'Alibaba PuHuiTi 2.0';
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 1.8px;
      }
    }

    .stage-desc-1 {
      position: absolute;
      display: flex;
      align-items: center;
      top: -37px;
      right: 50%;
      transform: translateX(50%);
      color: #fff;
      white-space: nowrap;
      font-size: 16px;
      font-weight: 300;
      font-family: Alibaba PuHuiTi 2;
      letter-spacing: 3.2px;
      word-wrap: break-word;
    }

    .stage-desc-2 {
      position: absolute;
      top: -37px;
      right: -48px;
      color: #fff;
      font-size: 16px;
      font-family: Alibaba PuHuiTi 2;
      font-weight: 300;
      letter-spacing: 3.2px;
      word-wrap: break-word;
    }
  }

  .progress-stage.active {
    .stage-bar {
      background-color: #2ab7dd;
    }

    .stage-circle {
      background-color: #2e89a1;

      .center-circle {
        background-color: #00cbff;
        box-shadow: 0px 0px 4px #00cbff;
      }
    }

    .stage-name {
      color: #00cbff;
    }
  }

  .distance-label {
    color: #73b196;
  }
  .distance-value {
    color: white;
    font-weight: 500;
  }
  .surplus-label {
    padding-left: 16px;
    color: white;
  }
  .surplus-value {
    color: #00ff90;
  }
  .line {
    width: 2px;
    height: 10px;
    margin: 0 16px;
    background: #1f674e;
  }
}

@keyframes active-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.active-animation .stage-circle {
  animation: active-animation 2s infinite;
}
</style>
