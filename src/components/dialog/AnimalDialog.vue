<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  animal: {
    type: String,
    default: 'float' // 可选: 'bounce-bottom', 'fade', 'rotate', 'float', ''
  }
})
const emit = defineEmits(['update:modelValue'])

const visible = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  visible.value = val
})

const close = () => {
  visible.value = false
  emit('update:modelValue', false)
}

// 动画名映射
const animalTransition = computed(() => {
  switch (props.animal) {
    case 'bounce-bottom':
      return 'animal-dialog-bounce-bottom'
    case 'fade':
      return 'animal-dialog-fade'
    case 'rotate':
      return 'animal-dialog-rotate'
    case 'float':
      return 'animal-dialog-float'
    default:
      return '' // 无动画
  }
})

// 禁止滚动
const lockScroll = () => { document.body.style.overflow = 'hidden' }
const unlockScroll = () => { document.body.style.overflow = '' }

watch(visible, (val) => {
  if (val) lockScroll()
  else unlockScroll()
})
onMounted(() => { if (visible.value) lockScroll() })
onBeforeUnmount(unlockScroll)
</script>

<template>
  <teleport to="body">
    <transition :name="animalTransition">
      <div v-if="visible" class="animal-dialog__mask" @click.self="close">
        <div class="animal-dialog__wrapper">
          <div class="animal-dialog__content">
            <button class="animal-dialog__close" @click="close" aria-label="关闭弹窗">×</button>
            <!-- 支持默认插槽和具名插槽 -->
            <slot>
              <slot name="content" />
            </slot>
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.animal-dialog__mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}
.animal-dialog__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
.animal-dialog__content {
  background: #fff;
  border-radius: 10px;
  min-width: 320px;
  min-height: 160px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.18);
  padding: 32px 24px;
  position: relative;
  transition: box-shadow 0.2s;
}
.animal-dialog__close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(0,0,0,0.08);
  color: #888;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.animal-dialog__close:hover {
  background: #f44336;
  color: #fff;
}
/* 从底部弹跳缩放动画 */
.animal-dialog-bounce-bottom-enter-active {
  animation: bounce-bottom-in 0.8s cubic-bezier(.34,1.56,.64,1);
}
.animal-dialog-bounce-bottom-leave-active {
  animation: bounce-bottom-in 0.55s cubic-bezier(.34,1.56,.64,1) reverse;
}
@keyframes bounce-bottom-in {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  60% {
    transform: translateY(0) scale(1.25);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
/* 淡入动画 */
.animal-dialog-fade-enter-active, .animal-dialog-fade-leave-active {
  transition: opacity 0.3s;
}
.animal-dialog-fade-enter-from, .animal-dialog-fade-leave-to {
  opacity: 0;
}
.animal-dialog-fade-enter-to, .animal-dialog-fade-leave-from {
  opacity: 1;
}
/* 旋转弹出动画 */
.animal-dialog-rotate-enter-active, .animal-dialog-rotate-leave-active {
  transition: transform 0.5s cubic-bezier(.34,1.56,.64,1), opacity 0.35s;
}
.animal-dialog-rotate-enter-from, .animal-dialog-rotate-leave-to {
  transform: scale(0.7) rotateY(60deg);
  opacity: 0;
}
.animal-dialog-rotate-enter-to, .animal-dialog-rotate-leave-from {
  transform: scale(1) rotateY(0deg);
  opacity: 1;
}
/* 上浮动画 */
.animal-dialog-float-enter-active, .animal-dialog-float-leave-active {
  transition: transform 0.38s cubic-bezier(.4,2,.6,1), opacity 0.38s;
}
.animal-dialog-float-enter-from, .animal-dialog-float-leave-to {
  transform: translateY(32px);
  opacity: 0;
}
.animal-dialog-float-enter-to, .animal-dialog-float-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
