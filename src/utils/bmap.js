/**
 * Function to load the Baidu Map API script dynamically.
 * @param {String} key : Baidu Map API Key
 * @returns {Promise} Resolves with the BMapGL object when the script is loaded successfully.
 */
export function loadBMapScript(key) {
  return new Promise((resolve, reject) => {
    if (typeof BMapGL !== 'undefined') {
      // eslint-disable-next-line no-undef
      resolve(BMapGL)
      return
    }
    window.onCallback = function () {
      // eslint-disable-next-line no-undef
      resolve(BMapGL)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://api.map.baidu.com/api?type=webgl&v=1.0&ak=${key}&callback=onCallback`
    script.onerror = reject
    document.body.appendChild(script)
  })
}

// 废弃：百度不支持JSONP，只能用CORS或代理
/**
 * Function to load the Baidu Weather API script by JSONP.
 * @param {String} key : Baidu Weather API Key
 * @param {Object} params : 其他查询参数，如location等
 * @returns {Promise} Resolves with the weather API response.
 */
export function loadBMapWeatherScript(key, params = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = 'bmapWeatherCallback_' + Date.now() + Math.floor(Math.random() * 1000)
    window[callbackName] = function (data) {
      resolve(data)
      // 清理
      delete window[callbackName]
      script.remove()
    }
    // 拼接参数
    const query = new URLSearchParams({
      ak: key,
      output: 'json',
      callback: callbackName,
      ...params,
    }).toString()
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://api.map.baidu.com/weather/v1/?${query}`
    script.onerror = function (e) {
      reject(e)
      delete window[callbackName]
      script.remove()
    }
    document.body.appendChild(script)
  })
}
