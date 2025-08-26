/**
 * @description 更新覆盖物Hook
 */
export const useUpdateOverlay = () => {
  // 存储覆盖物引用
  const overlayRefs = ref({})

  const updateOverlay = (id, updataParams) => {
    const overlay = overlayRefs.value[id]

    if (overlay && overlay._vueContainer) {
      const { instance_qt: instance } = overlay._vueContainer._vueApp
      // bug: 生产有问题：Vue 3 在生产构建时会移除开发专用的属性（如 _instance）避免直接依赖内部属性，使用getCurrentInstance获取当前实例
      // const instance = overlay._vueContainer._vueApp._instance
      // console.log('🚀 ~ updateOverlay ~ instance:', instance)
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
