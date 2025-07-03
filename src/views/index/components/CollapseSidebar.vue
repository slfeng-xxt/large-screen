<script setup>
const props = defineProps({
  toggle: Boolean,
})
</script>

<template>
  <div class="colapse-sidebar">
    <div class="btn-icon">
      <img
        src="@/assets/images/arrow-icon.png"
        :style="{ transform: props.toggle ? 'none' : 'rotate(180deg)' }"
        alt="arrow"
      />
    </div>
    <transition name="fade" mode="out-in">
      <div class="btn-text" v-if="props.toggle">收 起 全 部</div>
      <div class="btn-text" v-else>展 开 全 部</div>
    </transition>
  </div>
</template>

<style lang="less" scoped>
.colapse-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;

  .btn-icon {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: rgba(0, 0, 0, 0.1);
    &:hover {
      transform: scale(1.05);
      background-color: rgba(256, 256, 256, 0.1);
    }

    img {
      width: 28px;
      height: 28px;
      color: rgba(158, 171, 189, 1);
      transition: transform 0.3s;
    }
  }

  .btn-text {
    // writing-mode: vertical-rl;
    width: 16px;
    color: #6b8aa4;
    text-align: center;
    font-family: 'Alibaba PuHuiTi 2.0';
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 3.2px;
  }

  // 文字淡入淡出效果
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
