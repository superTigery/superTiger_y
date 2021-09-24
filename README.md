# cc-umi-template
> 前端项目模板
> **Node.js >= v14 !!!**

<br>

## 快速开始开始

安装依赖

```bash
$ yarn
```

本地运行

```bash
# 安装依赖
$ yarn
# 本地运行
$ yarn start
# or
$ yarn dev
```

## 目录及约定
本项目基于 umi3 构建，请务必阅读[umi3 官网文档](https://umijs.org/zh-CN/docs)！！！
### 一些常见的QA：
- 如何使用 npm私库？[npm 私库使用指南](http://192.168.10.60:4888/zh/%E5%89%8D%E7%AB%AF/%E6%96%B0%E6%89%8B%E6%8C%87%E5%8D%97/npm%E7%A7%81%E5%BA%93%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97)
- 路由如何配置？ [umi3 约定式路由](https://umijs.org/zh-CN/docs/convention-routing)
- 如何Mock 数据？[umi3 Mock数据](https://umijs.org/zh-CN/docs/mock)
- proxy 如何配置？[umi3 prox配置](https://umijs.org/zh-CN/docs/mock)、[http-proxy-middleware#options](https://github.com/chimurai/http-proxy-middleware#options)

### 目录约定
```
.
├── mock #mock数据
├── public #静态资源
├── config
│   ├── config.ts #umi 基础配置
│   ├── config.dev.ts # umi dev 配置
│   └── config.build.ts # umi build 配置
├── dist  #构建输出目录
├── src
│   ├── .umi #umi 临时目录
│   ├── .umi-production #umi 临时目录
│   ├── components #公共组件
│   │     ├── hooks
│   │     └── providers
│   ├── constants #常量
│   ├── layouts #布局  
│   ├── pages #页面及路由
│   ├── services
│   └── utils # 工具函数
└──  package.json
```

### 其他
1. 请使用 `git cz` 或者 `gcz` 提交代码。否则你可能无法通过 commitlint 的校验。本项目遵循 [cz-conventional-changelog](https://www.npmjs.com/package/cz-conventional-changelog) 提交规范

