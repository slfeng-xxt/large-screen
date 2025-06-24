<script setup>
import { onMounted, ref } from 'vue'
import { getChargingStatus } from '@/api/index.js'
import ScrollTable from '@/components/table/ScrollTable.vue'

// 模拟数据
const tableData = ref([])

const columns = [
  { key: 'name', title: '充电站名称' },
  { key: 'mode', title: '工作模式' },
  { key: 'power', title: '实时总功率' },
  { key: 'num', title: '充电桩(忙/闲' },
]

const getList = () => {
  getChargingStatus().then((res) => {
    tableData.value = res.records
  })
}

onMounted(() => {
  getList()
})
</script>

<template>
  <div class="charge">
    <img src="@/assets/images/title/title-charge.png" alt="charge info" />
    <div class="qtyn-line"></div>
    <!-- <dv-scroll-board :config="config" class="charge__table" /> -->
    <ScrollTable
      :columns="columns"
      :data="tableData"
      :interval="2000"
      :visibleRows="6"
      class="charge__table"
    >
    </ScrollTable>
    <div class="qtyn-line"></div>
  </div>
</template>

<style lang="less" scoped>
@import url('@/assets/styles/table.less');

.charge {
  img {
    width: 100%;
  }

  &__table {
    width: 100%;
  }
}
</style>
