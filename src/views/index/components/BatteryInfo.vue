<script setup>
import { getEnergyCabinList1, getEnergyCabinList2, getEnergyCabinList3 } from '@/api/index.js'
import ScrollTable from '@/components/table/ScrollTable.vue'

// This component displays information about energy cabins, allowing users to select different types of energy cabins and view their details.
const SELECT_TYPE = {
  SERVER: 'server',
  NORMAL: 'charge',
  WAIT: 'wait',
}

const currentRadio = ref(SELECT_TYPE.SERVER)
const isLoading = ref(false)

const hanldeSelect = async (type) => {
  if (currentRadio.value === type || isLoading.value) return
  currentRadio.value = type
  await getList()
}

const tableData = ref([])
// 服务中
const columnsObj = {
  [SELECT_TYPE.SERVER]: [
    { key: 'name', title: '能量舱' },
    { key: 'addr', title: '所在钻井' },
    { key: 'power', title: '功率', unit: 'kWh' },
    { key: 'soc', title: '剩余SOC', unit: '%' },
  ],
  [SELECT_TYPE.NORMAL]: [
    { key: 'name', title: '能量舱' },
    { key: 'addr', title: '所在电站' },
    { key: 'power', title: '功率', unit: 'kWh' },
    { key: 'time', title: '充满时间', unit: '分钟' },
  ],
  [SELECT_TYPE.WAIT]: [
    { key: 'name', title: '能量舱' },
    { key: 'status', title: '当前情况' },
    { key: 'soc', title: '剩余SOC', unit: '%' },
  ],
}
const columns = computed(() => {
  return columnsObj[currentRadio.value] || []
})

const getList = async () => {
  isLoading.value = true
  try {
    // 根据当前选择的类型获取能量舱列表
    switch (currentRadio.value) {
      case SELECT_TYPE.SERVER:
        tableData.value = (await getEnergyCabinList1()).records
        break
      case SELECT_TYPE.NORMAL:
        tableData.value = (await getEnergyCabinList2()).records
        break
      case SELECT_TYPE.WAIT:
        tableData.value = (await getEnergyCabinList3()).records
        break

      default:
        break
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getList()
})
</script>

<template>
  <div class="battery">
    <img src="@/assets/images/title/title-battery.png" alt="battery info" />
    <div class="battery__select">
      <div class="battery__select-card">
        <div
          :class="[
            'select-radio',
            currentRadio === SELECT_TYPE.SERVER
              ? 'radio-select-sever'
              : 'radio-charge-server-normel',
          ]"
          @click="hanldeSelect(SELECT_TYPE.SERVER)"
        ></div>
        <div
          :class="[
            'select-radio',
            currentRadio === SELECT_TYPE.NORMAL ? 'radio-select-charge' : 'radio-charge-normel',
          ]"
          @click="hanldeSelect(SELECT_TYPE.NORMAL)"
        ></div>
        <div
          :class="[
            'select-radio',
            currentRadio === SELECT_TYPE.WAIT ? 'radio-select-wait' : 'radio-charge-wait-normel',
          ]"
          @click="hanldeSelect(SELECT_TYPE.WAIT)"
        ></div>
      </div>
      <div class="battery__select-desk"></div>
    </div>
    <div class="qtyn-line"></div>
    <div class="animation-container">
      <transition name="slide-fade" mode="out-in">
        <div v-if="!isLoading" key="table-content" class="table-animation-wrapper">
          <ScrollTable
            class="battery__table"
            :columns="columns"
            :data="tableData"
            :visible-rows="5"
          >
            <template #row="{ row, rowIdx, rowColumns }">
              <div
                :class="[
                  'row-item row-item-right-bg',
                  row.soc < 30 ? 'row-item-err' : 'row-item-normal',
                ]"
                :key="rowIdx"
              >
                <div class="row-ceil" v-for="col in rowColumns" :key="col.key">
                  <span :class="['ceil', col.key === 'soc' ? 'ceil-soc' : '']"
                    >{{ row[col.key || col] }}{{ col.unit ? col.unit : '' }}</span
                  >
                </div>
              </div>
            </template>
          </ScrollTable>
        </div>
        <div v-else key="loading" class="loading-wrapper">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>
      </transition>
    </div>
    <div class="qtyn-line"></div>
  </div>
</template>

<style lang="less" scoped>
@import url('@/assets/styles/table.less');

.battery {
  margin-bottom: 13px;

  img {
    width: 100%;
  }

  &__select {
    position: relative;
    margin-top: 16px;

    &-card {
      display: flex;
      width: 320px;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      padding-bottom: 10px;
    }

    &-desk {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 19px;
      flex-shrink: 0;
      background-image: url('@/assets/images/charge/charge-select-desk.png');
      background-size: 100% 100%;
    }
  }
}

.battery__table {
  width: 100%;

  .rows {
    .row-item-err {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      background:
        linear-gradient(90deg, rgba(66, 47, 47, 0) 0%, rgba(179, 54, 54, 0.4) 100%),
        rgba(66, 47, 47, 0.4) !important;
      backdrop-filter: blur(6px);

      &::before,
      &::after {
        position: absolute;
        top: 0;
        content: '';
        width: 2px;
        height: 25px;
        flex-shrink: 0;
        backdrop-filter: blur(6px);
      }
      &::before {
        left: 0;
        background: rgba(255, 0, 0, 0.4) !important;
      }

      &::after {
        right: 0;
        background: #f00 !important;
      }

      .ceil-soc {
        color: #ff0404 !important;
      }
    }

    .row-item-normal {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;

      .ceil-soc {
        color: #00ff73;
      }
    }
  }
}

.select-radio {
  position: relative;
  z-index: 15;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.95);
  }
}

.radio-charge-normel {
  background-image: url('@/assets/images/charge/charge-normel.png');
  background-size: 100% 100%;

  &:hover {
    background-image: url('@/assets/images/charge/charge-hover.png');
  }
}

.radio-select-charge {
  background-image: url('@/assets/images/charge/charge-pressed.png');
  background-size: 100% 100%;
}

.radio-charge-server-normel {
  background-image: url('@/assets/images/charge/charge-server-normel.png');
  background-size: 100% 100%;

  &:hover {
    background-image: url('@/assets/images/charge/charge-server-hover.png');
  }
}

.radio-select-sever {
  background-image: url('@/assets/images/charge/charge-server-pressed.png');
  background-size: 100% 100%;
}

.radio-charge-wait-normel {
  background-image: url('@/assets/images/charge/charge-wait-normel.png');
  background-size: 100% 100%;

  &:hover {
    background-image: url('@/assets/images/charge/charge-wait-hover.png');
  }
}

.radio-select-wait {
  background-image: url('@/assets/images/charge/charge-wait-pressed.png');
  background-size: 100% 100%;
}

/* 新增动画样式 */
.animation-container {
  position: relative;
  min-height: 200px;
  overflow: hidden;
}

.table-animation-wrapper {
  position: relative;
}

/* 滑动动画 */
.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  position: absolute;
  width: 100%;
  top: 0;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 加载动画 */
.loading-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 255, 115, 0.3);
  border-radius: 50%;
  border-top-color: #00ff73;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
