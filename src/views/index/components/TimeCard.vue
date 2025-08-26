<script setup>
const currentTime = ref({
  hours: '00',
  minutes: '00',
  seconds: '00',
})
const timer = ref(null)

const yearData = ref('')

const weekData = ref('')

// 年月日格式化 为 'YYYY-MM-DD'
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getYearAndWeek = () => {
  const now = new Date()
  yearData.value = formatDate(now)
  weekData.value = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][
    now.getDay()
  ]
}

onMounted(() => {
  getYearAndWeek()
  timer.value = setInterval(() => {
    const now = new Date()
    currentTime.value.hours = String(now.getHours()).padStart(2, '0')
    currentTime.value.minutes = String(now.getMinutes()).padStart(2, '0')
    currentTime.value.seconds = String(now.getSeconds()).padStart(2, '0')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer.value)
  timer.value = null
})
</script>

<template>
  <div class="yntime">
    <div class="yntime__time">
      {{ currentTime.hours }}:{{ currentTime.minutes }}:{{ currentTime.seconds }}
    </div>
    <div class="yntime__date year">{{ yearData }}</div>
    <div class="yntime__date week">{{ weekData }}</div>
  </div>
</template>

<style lang="less" scoped>
.yntime {
  display: flex;
  align-items: center;
  margin-top: 10px;
  user-select: none;

  &__time {
    color: #fff;
    font-family: 'Digital Numbers';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.28px;
  }

  &__date {
    color: #fff;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .year {
    margin-left: 16px;
  }

  .week {
    margin-left: 7px;
  }
}
</style>
