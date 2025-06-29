# large-screen

大屏可视化项目

## Project 目录结构

```txt
large-screen
├── public
│   └── favicon.png
├── src
│   └── assets
|          |─── fonts
|          |─── images
|          |─── styles
│   ├── components
|          |─── dialog          // 弹窗组件
|          |─── digital         // 数字滚动组件
|          |─── overlay         // 覆盖物组件
|          |─── table           // 表格组件
│   ├── api
│   ├── config
│   ├── hooks // 自定义Hooks
|          |─── map             // 百度地图相关
|          |─── amap            // 高德地图相关（TODO）
│   ├── mock                    // 模拟数据
│   ├── router
│   ├── store
│   ├── utils
|          |─── bcode            // 百度天气图标映射
|          |─── bmap             // 百度地图脚本加载
|          |─── createOverlayDom // 创建覆盖物Dom
|          |─── enum             // 枚举
|          |─── map-api          // 百度地图API相关（废弃）
|          |─── overlayDom       // 创建覆盖物Dom（废弃）
|          |─── request          // 请求封装
│   ├── views
│   ├── views
│   ├── App.vue
│   ├── main.js
└── vite.config.js
```

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
- [x] 天气
- [x] 滚动金额
- [x] 滚动列表
- [x] 弹窗

## 参考文档

- [百度开放平台](https://lbsyun.baidu.com/apiconsole/authflow/authresult)
- [百度地图](https://lbsyun.baidu.com/)
- [百度地图JSAPI WebGL v1.0类参考手册](https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_webgl_1_0.html)
- [百度国内天气查询](https://lbs.baidu.com/faq/api?title=webapi/weather/base)

- [高德地图](https://lbs.amap.com/)
- [高德地图 JS API 2.0](https://lbs.amap.com/api/javascript-api-v2/prerequisites)
- [vue3-amap](https://gitee.com/AuYuHui/vue3-amap)

## 开发过程记录

### 地图utils功能的开发

- 第一步：map-api.js 目的：当前文件用于封装百度地图API相关方法(添加marker、添加覆盖物等)（**废弃**）
- 第二步：引入Hooks方式（@/hooks/*.js）（**应用**）
- 第三步：overlayDom.js 目的：当前文件用于创建覆盖物Dom的工具（**废弃**）
- 第四步：createOverlayDom.js 目的：当前文件用于创建覆盖物Dom的工具
    两种方式：
        1. document（原始）（**废弃**）
        2. createApp(),将页面组件注册后挂载）（**应用**）
