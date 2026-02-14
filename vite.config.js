import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
// import zipPack from 'vite-plugin-zip-pack'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('🚀 ~ defineConfig ~ command, mode:', command, mode)
  return {
    base: '/large-screen/',
    server: {
      port: '3000',
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
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts', // 生成 `auto-imports.d.ts` 文件
        eslintrc: {
          enabled: false, // 是否生成 eslint 插件配置文件
          filepath: './.eslintrc-auto-import.json', // 配置文件路径
          globalsPropValue: true, // 支持全局变量
        },
      }),
      viteMockServe({
        mockPath: './src/mock',
        localEnabled: command === 'serve', // 仅在开发环境启用 Mock
        prodEnabled: command === 'build', // 在生产环境也启用 Mock
        injectCode:
          'import { setupProdMockServer } from "@/utils/mock-prod-server.js"; setupProdMockServer();',
      }),
      // zipPack({
      //   inDir: 'dist',
      //   outDir: './',
      //   pathPrefix: 'dist',
      // }),
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
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
          }),
        ],
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true, // 支持内联 JavaScript
        },
      },
    },
  }
})
