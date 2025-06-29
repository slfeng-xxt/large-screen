/**
 * 防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {number} wait 等待时间(毫秒)
 * @param {boolean} [immediate=false] 是否立即执行
 * @returns {Function} 返回防抖后的函数
 */
export function debounce(func, wait, immediate = false) {
  let timeoutId = null
  let result

  return function (...args) {
    const context = this

    // 如果已有定时器存在，清除它
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // 立即执行模式
    if (immediate) {
      // 如果定时器不存在，表示可以立即执行
      const callNow = !timeoutId
      // 设置定时器，wait时间后重置timeoutId
      timeoutId = setTimeout(() => {
        timeoutId = null
      }, wait)

      if (callNow) {
        result = func.apply(context, args)
      }
    }
    // 非立即执行模式
    else {
      timeoutId = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }

    return result
  }
}
