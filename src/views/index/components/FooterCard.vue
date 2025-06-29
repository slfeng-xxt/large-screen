<script setup>
import { ref } from 'vue'
import AnimalDialog from '@/components/dialog/AnimalDialog.vue'

const descList = [
  {
    key: 'depth',
    unit: '米',
    desc: '清洁能源推动进尺',
  },
  {
    key: 'emissionReduction',
    unit: '吨',
    desc: '等效CO2减排量',
  },
  {
    key: 'completionRate',
    unit: '%',
    desc: '本年降碳指标完成率',
  },
  {
    key: 'reliablePower',
    unit: '%',
    desc: '井场供电可靠性',
  },
  {
    key: 'useRate',
    unit: '%',
    desc: '资产利用率',
  },
]
const descValue = ref({
  depth: '121,244',
  emissionReduction: '21,244',
  completionRate: '75',
  reliablePower: '75',
  useRate: '70',
})

const dialogVisible = ref(false)

// const handleDetail = (key) => {
//   if (key === 'completionRate') {
//     dialogVisible.value = true
//   }
// }
</script>

<template>
  <div class="base">
    <div class="base__item" v-for="item in descList" :key="item.key">
      <div class="base__item-bg">
        <div class="item-value">
          {{ descValue[item.key] }}<span>{{ item.unit }}</span>
        </div>
      </div>
      <div class="base__item-desc">
        {{ item.desc }}
        <!-- <span v-if="item.key === 'reliablePower'" @click="handleDetail(item.key)">详情</span> -->
      </div>
    </div>
  </div>
  <AnimalDialog v-model="dialogVisible">
    <template #content>
      <div class="dialog-content">
        <div class="dialog-content__title">
          <span>本年降碳指标完成率</span>
        </div>
      </div>
    </template>
    <template #footer>
      <!-- 底部确认按钮 -->
      <div class="dialog-footer">
        <button class="dialog-footer__btn" @click="dialogVisible = false">确认</button>
      </div>
    </template>
  </AnimalDialog>
</template>

<style lang="less" scoped>
.base {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4px 6px;

  &__item {
    width: 195px;
    &-bg {
      position: relative;
      height: 76px;
      flex-shrink: 0;
      background-image: url('@/assets/images/base-bg.png');
      background-size: 100% 100%;

      .item-value {
        font-size: 24px;
        color: #fff;
        text-align: center;
        text-shadow: 0px 0px 4px #fff;
        font-family: DIN-BlackItalic;
        font-size: 26px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 5.2px;

        span {
          font-family: 'Alibaba PuHuiTi 2.0';
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 2.8px;
        }
      }
    }
    &-desc {
      color: #97a9c4;
      text-align: center;
      font-family: 'Alibaba PuHuiTi 2.0';
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 3.6px;
      white-space: nowrap;
    }
  }
}

/* AnimalDialog内容样式补全 */
.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  min-height: 120px;
  padding: 16px 0 0 0;
}
.dialog-content__title {
  font-size: 22px;
  font-weight: bold;
  color: #222;
  margin-bottom: 18px;
  letter-spacing: 2px;
  text-align: center;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  padding-bottom: 8px;
}
.dialog-footer__btn {
  min-width: 96px;
  height: 38px;
  background: linear-gradient(90deg, #35b8ad 0%, #00ffe9 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 22px;
  box-shadow: 0 2px 8px rgba(0, 255, 233, 0.12);
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}
.dialog-footer__btn:hover {
  background: linear-gradient(90deg, #00ffe9 0%, #35b8ad 100%);
  color: #222;
}
</style>
