<script setup>
import { onMounted, ref } from 'vue'
import { getEnergyCabinList } from '@/api/index.js'
import ScrollTable from '@/components/table/ScrollTable.vue'

// This component displays information about energy cabins, allowing users to select different types of energy cabins and view their details.
const SELECT_TYPE = {
  SERVER: 'server',
  NORMAL: 'normal',
  WAIT: 'wait',
}

const currentRadio = ref(SELECT_TYPE.SERVER)
const hanldeSelect = (type) => {
  currentRadio.value = type
}

const tableData = ref([])
const columns = [
  { key: 'name', title: '能量舱' },
  { key: 'addr', title: '所在钻井' },
  { key: 'power', title: '功率', unit: 'kWh' },
  { key: 'soc', title: '剩余SOC', unit: '%' },
]

const getList = () => {
  getEnergyCabinList().then((res) => {
    tableData.value = res.records
  })
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
    <ScrollTable class="battery__table" :columns="columns" :data="tableData" :visible-rows="5">
      <template #row="{ row, rowIdx, rowColumns }">
        <div
          :class="['row-item row-item-right-bg', row.soc < 30 ? 'row-item-err' : 'row-item-normal']"
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

  &__table {
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
}

.select-radio {
  position: relative;
  z-index: 15;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  cursor: pointer;
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
</style>
