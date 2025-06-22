import { ref } from 'vue'
import { defineStore } from 'pinia'

// This store manages the state of a control panel, allowing it to be toggled open or closed.
export const useControlStore = defineStore('control', () => {
  const isClose = ref(false)
  function changePannel() {
    isClose.value = !isClose.value
  }

  return { isClose, changePannel }
})
