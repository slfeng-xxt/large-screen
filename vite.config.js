import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'
import zipPack from 'vite-plugin-zip-pack'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('🚀 ~ defineConfig ~ command, mode:', command, mode)
  return {
    server: {
      proxy: {
        // 跨域代理百度天气API
        '/baiduApi': {
          target: 'https://api.map.baidu.com', // 替换为目标API的URL
          changeOrigin: true, // 更改请求源头信息
          rewrite: (path) => path.replace(/^\/baiduApi/, ''), // 重写路径
          secure: true, // 如果是HTTPS目标，则设置为true
        },
      },
    },
    plugins: [
      vue(),
      vueDevTools(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', // 仅在开发环境启用 Mock
        prodEnabled: command === 'build', // 在生产环境也启用 Mock
      }),
      zipPack({
        inDir: 'dist',
        outDir: './',
        pathPrefix: 'dist',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: './src/mock',
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'datav-vue3': ['@kjgl77/datav-vue3'],
            'vue-baidu-map-3x': ['vue-baidu-map-3x'],
            echarts: ['echarts'],
            vue: ['vue', 'vue-router', 'pinia'],
          },
        },
      },
      chunkSizeWarningLimit: 1000, // 设置 chunk 大小警告的限制，单位为 kbs
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true, // 支持内联 JavaScript
        },
      },
    },
  }
})
