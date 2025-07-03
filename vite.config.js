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
        mockPath: './src/mock',
        localEnabled: command === 'serve', // 仅在开发环境启用 Mock
        prodEnabled: command === 'build', // 在生产环境也启用 Mock
        injectCode:
          'import { setupProdMockServer } from "@/utils/mock-prod-server.js"; setupProdMockServer();',
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
      outDir: 'dist',
      manifest: true,
      // minify: 'terser', // 使用terser进行压缩
      terserOptions: {
        compress: {
          drop_console: true, // 删除console
          drop_debugger: true, // 删除debugger
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
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
