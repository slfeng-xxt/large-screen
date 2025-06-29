import { ref } from 'vue'

/**
 * @description 更新覆盖物Hook
 */
export const useUpdateOverlay = () => {
  // 存储覆盖物引用
  const overlayRefs = ref({})

  const updateOverlay = (id, updataParams) => {
    const overlay = overlayRefs.value[id]

    if (overlay && overlay._vueContainer) {
      const instance = overlay._vueContainer._vueApp._instance
      // 获取实际的组件实例
      const componentInstance = instance.refs.overlayRef

      if (componentInstance) {
        componentInstance.updateData(updataParams)
      } else {
        console.log('No exposed methods found on component')
      }
    }
  }

  return {
    overlayRefs,
    updateOverlay,
  }
}
