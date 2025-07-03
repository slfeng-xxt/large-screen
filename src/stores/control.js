import { ref } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_CONFIG } from '@/config/index'
import { STATUS_ENUM } from '@/utils/enum'

// This store manages the state of a control panel, allowing it to be toggled open or closed.
export const useControlStore = defineStore('control', () => {
  // The current zoom level of the control panel.
  const currentZoom = ref(DEFAULT_CONFIG.ZOOM)
  // A boolean value of the control AnimalDialog's visibility to toggle it.
  const isShow = ref(false)
  // The current status of the control panel, which can be normal, arrived, exchange, or pull.
  const currentStatus = ref(STATUS_ENUM.normal)

  function changeZoom(zoom) {
    currentZoom.value = zoom
  }

  function toggleShow(val) {
    isShow.value = val
  }

  function changeStatus(status) {
    currentStatus.value = status
  }

  return { currentZoom, changeZoom, isShow, toggleShow, currentStatus, changeStatus }
})
