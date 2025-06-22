// 基于axios封装一个请求工具
import axios from 'axios'

const service = axios.create({
  baseURL: '/mock/api', // API基础路径
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在这里添加请求头或其他配置
    return config
  },
  (error) => {
    // 请求错误处理
    console.error('请求错误:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 可以在这里处理响应数据
    return response.data
  },
  (error) => {
    // 响应错误处理
    console.error('响应错误:', error)
    return Promise.reject(error)
  },
)

export const baseRequest = (url, value = {}, method = 'get', options = {}) => {
  if (method.toLowerCase() === 'get') {
    return service.get(url, {
      params: value,
      ...options,
    })
  } else {
    return service.post(url, value, {
      ...options,
    })
  }
}
