<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { getEnergyCost } from '@/api/index.js'
import DigitalAmount from '@/components/digital/DigitalAmount.vue'
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

// const config = reactive({
//   header: ['钻井编号', '累计能耗（kWh）', '累计电费（元）'],
//   data: [],
//   index: false,
//   align: ['center'],
//   headerHeight: 25,
//   columnWidth: ['130', '130', '130'],
//   rowNum: 7,
//   // waitTime: 100000, // 调试开启
// })

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
    console.log("获取数据失败",error)
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
  <div class="electricity">
    <img src="@/assets/images/title/title-electricty.png" alt="electricity info" />
    <div class="electricity__card">
      <div class="electricity__card-line--long"></div>
      <div class="electricity__card-line--short"></div>
      <div class="electricity__card-title">
        <div class="title-left">
          <div class="title-icon-city"></div>
          <div class="title-name">市电</div>
        </div>
        <div class="title-right">
          <span>总计能耗</span>
          <span class="title-num">1000</span>
          <span>kWh</span>
        </div>
      </div>
      <div class="electricity__card-calc">
        <div class="calc-logo logo-city">
          <div class="calc-logo-middle logo-middle-city">
            <img src="@/assets/images/electric/electric-city-logo.png" alt="city logo" />
          </div>
        </div>
        <div class="calc-value">
          <div class="calc-name">总计电费（元）</div>
          <div class="calc-num">
            <digital-amount :value="amount" />
          </div>
        </div>
      </div>
      <div class="electricity__card-title clean-card">
        <div class="title-left">
          <div class="title-icon-clean"></div>
          <div class="title-name">清洁能源</div>
        </div>
        <div class="title-right">
          <span>总计能耗</span>
          <span class="title-num">1000</span>
          <span>kWh</span>
        </div>
      </div>
      <div class="electricity__card-calc">
        <div class="calc-logo logo-clean">
          <div class="calc-logo-middle logo-middle-clean">
            <img src="@/assets/images/electric/electric-clean-logo.png" alt="clean logo" />
          </div>
        </div>
        <div class="calc-value">
          <div class="calc-name">总计电费（元）</div>
          <div class="calc-num">
            <digital-amount :value="amount2" />
          </div>
        </div>
      </div>
    </div>
    <div class="qtyn-line"></div>
    <!-- <dv-scroll-board :config="config" class="electricity__table" /> -->
    <ScrollTable
      :columns="columns"
      :data="tableData"
      :interval="2000"
      :visibleRows="6"
      class="electricity__table"
    />
    <div class="qtyn-line"></div>
  </div>
</template>

<style lang="less" scoped>
@import url('@/assets/styles/table.less');

.electricity {
  margin-bottom: 13px;

  img {
    width: 100%;
  }

  &__card {
    position: relative;
    width: 100%;
    margin-top: 18px;
    padding: 12px 16px;
    flex-shrink: 0;
    border: 0.5px solid rgba(0, 255, 233, 0.1);
    background:
      radial-gradient(
        46.6% 40.04% at 0% 100%,
        rgba(38, 211, 198, 0.05) 0%,
        rgba(38, 211, 198, 0) 100%
      ),
      radial-gradient(
        60.05% 53.08% at 19.68% -13.86%,
        rgba(38, 211, 198, 0.2) 0%,
        rgba(8, 60, 56, 0) 100%
      ),
      radial-gradient(
        87.17% 68.61% at 100% 0%,
        rgba(38, 185, 211, 0.2) 0%,
        rgba(8, 60, 56, 0) 100%
      ),
      radial-gradient(
        67.87% 50.88% at 15.56% 0%,
        rgba(38, 179, 211, 0.1) 0%,
        rgba(8, 60, 56, 0) 100%
      ),
      radial-gradient(
        87.91% 67.53% at 100% 0%,
        rgba(38, 165, 211, 0.2) 0%,
        rgba(8, 60, 56, 0) 100%
      ),
      linear-gradient(180deg, rgba(21, 44, 45, 0.1) 31.82%, rgba(38, 153, 211, 0.1) 100%),
      rgba(7, 45, 56, 0.2);
    backdrop-filter: blur(6px);

    &-line--long {
      position: absolute;
      top: 0;
      right: 0;
      width: 76px;
      height: 1px;
      flex-shrink: 0;
      background: #00ffe9;
      z-index: 15;
    }

    &-line--short {
      position: absolute;
      top: -1px;
      right: 0;
      width: 9px;
      height: 2px;
      flex-shrink: 0;
      background: #00ffe9;
      z-index: 20;
    }

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    &-calc {
      display: flex;
      align-items: center;
    }
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

.clean-card {
  margin-top: 24px;
}

.title-left {
  display: flex;
  align-items: center;

  .title-icon-city {
    width: 9px;
    height: 9px;
    background: #0084ff;
  }

  .title-icon-clean {
    width: 9px;
    height: 9px;
    background: #00ffb7;
  }

  .title-name {
    padding-left: 12px;
    color: #fff;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2.8px;
  }
}

.title-right {
  color: #7dbac0;
  font-family: 'Alibaba PuHuiTi 2.0';
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 2.4px;

  .title-num {
    padding: 0 12px;
    color: #00ffe9;
    font-family: DIN-BlackItalic;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 3.2px;
  }
}

.calc-logo {
  width: 52px;
  height: 52px;
  padding: 6px;
  flex-shrink: 0;
}

.calc-logo-middle {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  padding: 8px;
  backdrop-filter: blur(2px);

  img {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    filter: blur(0.75px);
  }
}

.logo-city {
  border: 1px solid #303b55;
}

.logo-middle-city {
  border: 1px solid #345096;
  background: rgba(12, 65, 65, 0.5);
}

.logo-clean {
  border: 1px solid #33594f;
}

.logo-middle-clean {
  border: 1px solid #30ba93;
  background: rgba(12, 65, 65, 0.5);
}

.calc-value {
  margin-left: 12px;
  .calc-name {
    margin-bottom: 7px;
    color: #c6e5e9;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 2.4px;
  }
  .calc-num {
    height: 28px;
  }
}
</style>
