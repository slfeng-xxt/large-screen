import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import fs from 'fs'
import path from 'path'

// 读取 auto-import 生成的 globals
let autoImportGlobals = {}
const autoImportPath = path.resolve(process.cwd(), '.eslintrc-auto-import.json')
if (fs.existsSync(autoImportPath)) {
  const autoImportConfig = JSON.parse(fs.readFileSync(autoImportPath, 'utf-8'))
  autoImportGlobals = autoImportConfig.globals || {}
}

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportGlobals, // 合并 auto-import 的全局变量
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
])
