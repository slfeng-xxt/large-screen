# large-screen

大屏可视化项目

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## 代码提交规则

```txt
'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
'feat', // 新功能
'fix', // 修补bug
'docs', // 文档修改
'style', // 代码格式修改, 注意不是 css 修改
'refactor', // 重构
'perf', // 优化相关，比如提升性能、体验
'test', // 测试用例修改
'revert', // 代码回滚
'ci', // 持续集成修改
'config', // 配置修改
'chore', // 其他改动
```

## 部分组件

- [x] 地图（百度，后续补充高德）
- [x] 天气  WeatherCard.vue
- [x] 滚动金额  digital/*.vue
- [x] 滚动列表  ScrollTable.vue
- [x] 弹窗  AnimalDialog.vue
- [x] 地图响应刻度尺 ScaleIndeicator.vue
- [x] 进度条 progress/*.vue

## 部分功能介绍

- 插件（unplugin-auto-import/vite）：自动导入 API，无需手动导入

## 分支介绍

- main：主分支
- dev-1.0
- dev-2.0
- dev-2.1

## 性能问题

- dev-2.1版本添加动画效果后页面卡顿问题待优化

## 参考文档

- [百度开放平台](https://lbsyun.baidu.com/apiconsole/authflow/authresult)
- [百度地图](https://lbsyun.baidu.com/)
- [百度地图JSAPI WebGL v1.0类参考手册](https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_webgl_1_0.html)
- [百度国内天气查询](https://lbs.baidu.com/faq/api?title=webapi/weather/base)

- [高德地图](https://lbs.amap.com/)
- [高德地图 JS API 2.0](https://lbs.amap.com/api/javascript-api-v2/prerequisites)
- [vue3-amap](https://gitee.com/AuYuHui/vue3-amap)
