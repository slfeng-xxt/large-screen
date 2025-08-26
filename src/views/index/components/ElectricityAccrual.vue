<script setup>
import { getEnergyCost } from '@/api/index.js'
import ScrollTable from '@/components/table/ScrollTable.vue'

const amount = ref(1234.07)
const amount2 = ref(124.7)

const timer = ref(null)

const getStartAmount = () => {
  timer.value = setInterval(() => {
    amount.value++
    amount2.value += 1.1
  }, 1000)
}

const tableData = ref([])

const columns = [
  { key: 'name', title: '钻井编号' },
  { key: 'energy', title: '累计能耗（kWh）' },
  { key: 'cost', title: '累计电费（元）' },
]

const getList = async () => {
  try {
    const res = await getEnergyCost()
    tableData.value = res.records
  } catch (error) {
    console.log('获取数据失败', error)
  }
}

onMounted(() => {
  getList()
  getStartAmount()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>

<template>
  <div class="monitor">
    <img src="@/assets/images/title/title-monitor.png" alt="monitor info" />
    <!-- 告警totol -->
    <div class="run-days">
      <div class="run-days__total">
        <div class="run-days__total-value">{{ 999 }}<span>天</span></div>
        <div class="run-days__total-desc">已安全运行</div>
      </div>
      <div class="run-days__classify">
        <div class="run-days__classify-item item item-normal">
          一般告警<span>{{ 9 }}</span
          >个
        </div>
        <div class="run-days__classify-item item item-waring">
          严重告警<span>{{ 9 }}</span
          >个
        </div>
        <div class="run-days__classify-item item item-error">
          特大告警<span>{{ 9 }}</span
          >个
        </div>
      </div>
    </div>
    <!-- 运营监控 -->
    <div class="monitor-list">
      <div class="monitor-list__header">
        <div class="header-left">
          <span class="header-title">运营监控</span>
        </div>
        <div class="header-right">总计告警<span>3</span>条</div>
      </div>
      <div class="monitor-list__content">
        <div class="content__item">请注意，油井41-6中8号电池剩余可用时间不足</div>
        <div class="content__item">请注意，油井41-6出现长时间大功率作业</div>
        <div class="content__item">请注意，当前无满电充电舱</div>
      </div>
    </div>
    <!-- 设备监控 -->
    <div class="monitor-list">
      <div class="monitor-list__header">
        <div class="header-left">
          <span class="header-title">设备监控</span>
        </div>
        <div class="header-right">总计告警<span>3</span>条</div>
      </div>
      <div class="monitor-list__content">
        <div class="content__item">请注意，PCS1当前温度过高</div>
        <div class="content__item">请注意，10号能量舱运输过程中出现严重颠簸</div>
        <div class="content__item">请注意，2号能量舱无法进行充电</div>
      </div>
    </div>
    <div class="qtyn-line"></div>
    <ScrollTable
      :columns="columns"
      :data="tableData"
      :interval="2000"
      :visibleRows="4"
      class="electricity__table"
    />
    <div class="qtyn-line"></div>
  </div>
</template>

<style lang="less" scoped>
@import url('@/assets/styles/table.less');

.monitor {
  margin-bottom: 13px;

  img {
    width: 100%;
  }

  &__table {
    width: 100%;

    ::v-deep(.dv-scroll-board .row-item) {
      .ceil {
        width: 33%;
      }
    }
  }
}

.run-days {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;

  &__total {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 133px;
    height: 133px;
    background-image: url(@/assets/images/monitor/monitor-run-bg.png);
    background-size: 100% 100%;

    &-value {
      color: #fff;
      text-align: center;
      text-shadow: 0px 0px 4px #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 18px;
      font-weight: 1000;
      letter-spacing: 3.6px;
      span {
        font-size: 10px;
        font-weight: 300;
        letter-spacing: 2px;
      }
    }

    &-desc {
      color: #a6b9ca;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 12px;
      font-weight: 300;
      letter-spacing: 2.4px;
    }
  }

  &__classify {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 183px;
      height: 32px;
      flex-shrink: 0;
      color: #7a8799;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 2.8px;
    }

    .item > span {
      font-size: 16px;
      font-weight: 1000;
      letter-spacing: 3.2px;
    }

    .item-normal {
      background-image: url(@/assets/images/monitor/monitor-normal-bg.png);
      background-size: 100% 100%;
      border-right: 3px solid #1ca8ff;

      span {
        color: #1ca8ff;
      }
    }

    .item-waring {
      background-image: url(@/assets/images/monitor/monitor-waring-bg.png);
      background-size: 100% 100%;
      border-right: 3px solid #ffb71c;

      span {
        color: #ffb71c;
      }
    }
    .item-error {
      background-image: url(@/assets/images/monitor/monitor-error-bg.png);
      background-size: 100% 100%;
      border-right: 3px solid #ff1c1c;

      span {
        color: #ff1c1c;
      }
    }
  }
}

.monitor-list {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-title {
      color: #fff;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 2.8px;

      &::before {
        content: '';
        display: inline-block;
        width: 9px;
        height: 9px;
        margin-right: 6px;
        background: #51658b;
      }
    }

    .header-right {
      color: #7da4c0;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 2.4px;

      span {
        padding: 12px;
        color: #dbf3ff;
        font-family: DIN-BlackItalic;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 3.2px;
      }
    }
  }

  &__content {
    padding: 6px 0;

    .content__item {
      position: relative;
      width: 100%;
      height: 25px;
      flex-shrink: 0;
      padding: 4px 12px;
      margin-bottom: 3px;
      color: #f00;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 12px;
      font-weight: 300;
      letter-spacing: 1.2px;
      overflow: hidden;
      background:
        linear-gradient(90deg, rgba(66, 47, 47, 0) 0%, rgba(179, 54, 54, 0.4) 100%),
        rgba(66, 47, 47, 0.4);
      backdrop-filter: blur(6px);

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: ' ';
        width: 2px;
        height: 25px;
        flex-shrink: 0;
        background: #f00;
        backdrop-filter: blur(6px);
      }

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: ' ';
        width: 2px;
        height: 25px;
        flex-shrink: 0;
        background: rgba(255, 0, 0, 0.4);
        backdrop-filter: blur(6px);
      }
    }
  }
}
</style>
