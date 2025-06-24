<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

const props = defineProps({
  columns: {
    // 表头
    type: Array,
    required: true,
  },
  data: {
    // 表格数据
    type: Array,
    required: true,
  },
  interval: {
    type: Number,
    default: 2000, // 每行滚动间隔（毫秒）
  },
  visibleRows: {
    type: Number,
    default: 5, // 可见行数
  },
})

const startIndex = ref(0) // 当前显示的起始索引
let timer = null

const startScroll = () => {
  stopScroll()
  timer = setInterval(() => {
    if (props.data.length <= props.visibleRows) return
    startIndex.value = (startIndex.value + 1) % props.data.length
  }, props.interval)
}
const stopScroll = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startScroll()
})
onUnmounted(() => {
  stopScroll()
})

watch(
  () => [props.data, props.interval, props.visibleRows],
  () => {
    startIndex.value = 0
    startScroll()
  },
)

// 计算当前显示的行
const visibleData = computed(() => {
  if (props.data.length <= props.visibleRows) return props.data
  const result = []
  for (let i = 0; i < props.visibleRows; i++) {
    result.push(props.data[(startIndex.value + i) % props.data.length])
  }
  return result
})
</script>

<template>
  <div class="scroll-table">
    <div class="table-header">
      <div class="header">
        <div class="header-item" v-for="col in columns" :key="col.key || col">
          {{ col.title || col }}
        </div>
      </div>
    </div>
    <div class="table-rows">
      <div class="rows">
        <!-- 无数据状态 -->
        <div v-if="!visibleData.length" class="empty-state">
          <!-- slot -->
          <slot name="empty">
            <!-- 默认内容 -->
            <div class="empty-icon">📊</div>
            <div class="empty-text">暂无数据</div>
          </slot>
        </div>
        <!-- 有数据时正常显示 -->
        <div v-else class="row-item" v-for="(row, rowIdx) in visibleData" :key="rowIdx">
          <template v-if="$slots.row">
            <!-- 自定义整行 -->
            <slot name="row" :row="row" :rowIdx="rowIdx" :rowColumns="columns" />
          </template>
          <template v-else>
            <div class="ceil" v-for="col in columns" :key="col.key || col">
              <template v-if="$slots.cell">
                <!-- 自定义单元格 -->
                <slot name="cell" :row="row" :col="col" :rowIdx="rowIdx" />
              </template>
              <template v-else>
                {{ row[col.key || col] }}
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/styles/table.less';

.scroll-table {
  width: 100%;
  overflow: hidden;
}
</style>
