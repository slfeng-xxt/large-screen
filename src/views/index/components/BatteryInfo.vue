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

// The `config` object defines the structure and appearance of the energy cabin table, including headers, data, alignment, and styles.
// const config = reactive({
//   header: ['能量舱', '所在钻井', '功率', '剩余SOC'],
//   data: [],
//   index: false,
//   align: ['center'],
//   headerHeight: 25,
//   // columnWidth: ['25%', '25%', '25%', '25%'],
//   rowNum: 7,
//   waitTime: 100000, // 调试开启
// })

// const getList = () => {
//   getEnergyCabinList().then((res) => {
//     // 判断soc值，设置不同的背景色
//     config.data = res.records.map((item) => {
//       let socClass = ''
//       if (item.soc >= 30) {
//         socClass = `<span style="color:#00FF73;">${item.soc}%</span>`
//       } else {
//         socClass = `<span style="color:#FF0404;">${item.soc}%</span>`
//       }
//       return {
//         ...item,
//         soc: socClass, // 添加一个新的属性用于设置样式
//       }
//     })
//   })
// }

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
    <!-- dv-scroll-board 组件不满足需求的实现 -->
    <!-- <dv-scroll-board :config="config" class="battery__table" /> -->
    <ScrollTable :columns="columns" :data="tableData" :visibleRows="5" class="battery__table">
      <template #row="{ row, rowIdx, rowColumns }">
        <div :class="[row.soc < 30 ? 'row-item-err' : 'row-item-normal']" :key="rowIdx">
          <div class="ceil" v-for="col in rowColumns" :key="col.key">
            <span :class="[row.soc < 30 && col.key === 'soc' ? 'ceil-err' : '']"
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

    .row-item-err {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 0, 0, 0.4);

      &::before,
      &::after {
        position: absolute;
        top: 0;
        content: '';
        width: 2px;
        height: 25px;
        flex-shrink: 0;
        background-color: rgba(255, 0, 0, 0.4);
        backdrop-filter: blur(6px);
      }
      &::before {
        left: 0;
      }

      &::after {
        right: 0;
      }

      .ceil-err {
        color: red !important;
      }
    }

    .row-item-normal {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(11, 40, 60, 0.4);
    }
  }
}

.select-radio {
  position: relative;
  z-index: 15;
  width: 80px;
  height: 80px;
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

// less循环练习
// 定义数组
// @errarr: v-bind(dvErrorRows);
@errarr: 2, 4, 6;
// 定义数组长度
@len: length(@errarr);

// 循环函数
.loop(@index) when (@index<=@len) {
  // 获取当前索引的值
  @value: extract(@errarr, @index);

  .row-item:nth-child(@{value}) {
    background-color: rgba(255, 0, 0, 0.4) !important;
    // background: rgba(66, 47, 47, 0.40);

    &::before,
    &::after {
      background-color: rgba(255, 0, 0, 0.4);
    }
  }
  // 循环增加
  .loop(@index+1);
}

// 定义数组
@set: 1, 3, 4;

.eachloop() {
  each(@set, {
      .row-item:nth-child(@{value}) {
        background-color:  rgba(255, 0, 0, 0.4) !important;
        // background: rgba(66, 47, 47, 0.40);

        &::before,
        &::after {
          background-color: rgba(255, 0, 0, 0.4);
        }
      }
      });
}
// 默认表格的样式
// ::v-deep(.dv-scroll-board) {
//   .table-header();
//   .table-rows();
//   .rows {
//     .loop(1); // 方式一
//     // .eachloop(); // 方式二
//   }
// }
</style>
