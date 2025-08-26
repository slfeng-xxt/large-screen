<script setup>
import { STATUS_ENUM } from '@/utils/enum'
import { useControlStore } from '@/stores/control.js'

const control = useControlStore()

// define props
const props = defineProps({
  linkman: { type: String, default: '' },
  phone: { type: String, default: '' },
  status: { type: Number, default: STATUS_ENUM.normal },
  totalTransportationDistance: { type: Number, required: true },
  remainingtransportationDistance: { type: Number, required: true },
  arrivedTime: { type: String, default: '0' },
  zIndex: { type: Number, default: 1 },
})

// local reactive data
const status = ref(props.status)
const totalTransportationDistance = ref(props.totalTransportationDistance)
const remainingtransportationDistance = ref(props.remainingtransportationDistance)
const arrivedTime = ref(props.arrivedTime)
const zIndex = ref(props.zIndex)

// styles of status config
const statusStyles = {
  [STATUS_ENUM.normal]: {
    background: 'linear-gradient(270deg, rgba(4, 40, 29, 0.35) 0%, #2C745D 100%)',
    borderBottom: '1px solid #3F7D6C',
    textColor: '#00FF90',
    content: '车辆正在运输',
  },
  [STATUS_ENUM.warning]: {
    background: 'linear-gradient(270deg, rgba(40, 27, 4, 0.35) 0%, #74592C 100%)',
    borderBottom: '1px solid #7D673F',
    textColor: '#FF0000',
    content: '车辆正在运输',
  },
  [STATUS_ENUM.error]: {
    background: 'linear-gradient(270deg, rgba(40, 4, 4, 0.35) 0%, #742C2C 100%)',
    borderBottom: '1px solid #7D3F3F',
    textColor: '#FF0000',
    content: '车辆发生故障',
  },
  [STATUS_ENUM.arrived]: {
    background: 'linear-gradient(270deg, rgba(4, 40, 29, 0.35) 0%, #2C745D 100%)',
    borderBottom: '1px solid #3F7D6C',
    textColor: '#00FF90',
    content: '车辆已到达',
  },
  [STATUS_ENUM.exchange]: {
    background: 'linear-gradient(270deg, rgba(4, 40, 29, 0.35) 0%, #2C745D 100%)',
    borderBottom: '1px solid #3F7D6C',
    textColor: '#00FF90',
    content: '正在换电中',
  },
  [STATUS_ENUM.pull]: {
    background: 'linear-gradient(270deg, rgba(4, 40, 29, 0.35) 0%, #2C745D 100%)',
    borderBottom: '1px solid #3F7D6C',
    textColor: '#00FF90',
    content: '电池正在拉回',
  },
}

// computed style
const containerStyle = computed(() => ({
  zIndex: zIndex.value,
  background: statusStyles[status.value]?.background,
}))

const headerStyle = computed(() => ({
  borderBottom: statusStyles[status.value]?.borderBottom,
}))

const mainDetailStyle = computed(() => ({
  color: statusStyles[status.value]?.textColor,
}))

// computed content
const mainContent = computed(() => {
  return statusStyles[status.value]?.content
})

const isArrived = computed(() => {
  return [STATUS_ENUM.arrived, STATUS_ENUM.exchange].includes(status.value)
})

// handle arrow click
const handleArrowClick = () => {
  console.log('右箭头被点击了')
  control.changeStatus(status.value)
  control.toggleShow(true)
}

// expose methods
defineExpose({
  updateData(newData) {
    if (newData.status !== undefined) {
      status.value = newData.status
    }
    if (newData.totalTransportationDistance !== undefined) {
      totalTransportationDistance.value = newData.totalTransportationDistance
    }
    if (newData.remainingtransportationDistance !== undefined) {
      remainingtransportationDistance.value = newData.remainingtransportationDistance
    }
    if (newData.arrivedTime !== undefined) {
      arrivedTime.value = newData.arrivedTime
    }
  },
})
</script>

<template>
  <div class="vehicle-overlay" :style="containerStyle">
    <div class="header header-error" :style="headerStyle" v-if="status === STATUS_ENUM.error">
      <div class="header__row">
        <span>司机：</span>
        <span class="header__value">{{ linkman }}</span>
      </div>
      <div class="header-row">
        <span>电话：</span>
        <span class="header__value">{{ phone }}</span>
      </div>
    </div>
    <div class="header" :style="headerStyle" v-else>
      <span>总运输距离：</span>
      <span class="header__value">{{ totalTransportationDistance }}km</span>
    </div>
    <div class="main">
      <div class="main__content">
        <div class="main__content-text">
          <span class="warning" v-if="status === STATUS_ENUM.warning">超时</span>
          <span>{{ mainContent }}</span>
        </div>
        <img
          class="main__content-arrow"
          src="/src/assets/images/overlay/right-arrow-icon.png"
          alt="arrow"
          @click.stop="handleArrowClick"
        />
      </div>
      <div class="main__details" v-if="!isArrived">
        <div class="remaining">
          <span>剩余：</span>
          <span class="distance" :style="mainDetailStyle" v-if="status === STATUS_ENUM.error">
            {{ remainingtransportationDistance }}/{{ totalTransportationDistance }}km
          </span>
          <span class="distance" :style="mainDetailStyle" v-else>
            {{ remainingtransportationDistance }}km
          </span>
        </div>
        <div class="line"></div>
        <span :style="mainDetailStyle">{{ arrivedTime }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.vehicle-overlay {
  white-space: nowrap;
  flex-shrink: 0;
  border-radius: 12px;
  border: 0.1px solid #fff;
  backdrop-filter: blur(7.5px);

  .header {
    display: flex;
    padding: 12px;
    color: #73b196;
    text-align: center;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 2.8px;

    &__value {
      color: #fff;
      font-weight: 500;
    }
  }

  .header-error {
    flex-direction: column;
    align-items: flex-start;
  }

  .main {
    padding: 12px;

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 3.6px;

      &-text {
        display: flex;
        align-items: center;
        .warning {
          color: #ff9500;
          margin-right: 14px;
        }
      }

      &-arrow {
        width: 24px;
        height: 24px;
        cursor: pointer;
        margin-left: 6px;
      }
    }

    &__details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 6px;
      color: #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 2.8px;

      .remaining {
        display: flex;
        align-items: center;

        .distance {
          color: #ff9d00;
          margin-left: 4px;
        }
      }

      .line {
        width: 2px;
        height: 10px;
        border-radius: 99999px;
        background: #1f674e;
        margin: 0 12px;
      }
    }
  }
}
</style>
