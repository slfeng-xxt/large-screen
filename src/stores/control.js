import { ref } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_CONFIG } from '@/config/index'

// This store manages the state of a control panel, allowing it to be toggled open or closed.
export const useControlStore = defineStore('control', () => {
  // The current zoom level of the control panel.
  const currentZoom = ref(DEFAULT_CONFIG.ZOOM)
  // A boolean value of the control AnimalDialog's visibility to toggle it.
  const isShow = ref(false)

  function changeZoom(zoom) {
    currentZoom.value = zoom
  }

  function toggleShow(val) {
    isShow.value = val
  }

  return {  currentZoom, changeZoom, isShow, toggleShow }
})
