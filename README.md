### 简介
MedSego是一个智能医疗影像平台，
旨在为医生提供一个更加便捷的阅片工具，
提高医生的工作效率，减少医生的工作压力，
同时也为患者提供更加便捷的就医方式
，减少患者的等待时间，提高患者的就医体验。

### 功能

- 🍒 集成 [Naive UI](https://www.naiveui.com)
- 🍑 集成登陆、注销及权限验证
- 🍐 集成多环境配置，dev、测试、生产和github pages环境
- 🍎 集成 `eslint + prettier`，代码约束和格式化统一
- 🍌 集成 `husky + commitlint`，代码提交规范化
- 🍉 集成 `mock` 接口服务，dev 环境和发布环境都支持，可动态配置是否启用 mock 服务，不启用时不会加载 mock 包，减少打包体积
- 🍍 集成 `pinia`，vuex 的替代方案，轻量、简单、易用
- 📦 集成 `unplugin` 插件，自动导入，解放双手，开发效率直接起飞
- 🤹 集成 `iconify` 图标，支持自定义 svg 图标, 优雅使用icon
- 🍇 集成 `unocss`，antfu 开源的原子 css 解决方案，非常轻量

### 快速开始

```shell
# nodejs 依赖
require: nodejs 16.0.0+

# 进入项目目录
cd meg-framework

# 安装依赖
npm i -g yarn# 装了可忽略
yarn # 或者 npm i

# 启动
yarn dev
```

### 目录说明

```
|-- .github                             // github相关，如推送github仓库后自动部署gh pages
|-- .husky                              // git commit钩子
|-- .vscode                             // vscode编辑器相关
|   |-- extensions.json                 // 插件推荐
|   |-- settings.json                   // 项目级别的vscode配置，优先级大于全局vscode配置
|-- build                               // 构建相关配置
|   |-- constant.js                     // 构建相关的常量
|   |-- utils.js                        // 构建相关的工具方法
|   |-- config                          
|   |   |-- define.js                   // 注入全局常量，启动或打包后将添加到window中
|   |   |-- proxy.js                    // 代理配置
|   |-- plugin                          
|   |   |-- html.js                     // vite-plugin-html插件，用于注入变量或者html标签
|   |   |-- mock.js                     // vite-plugin-mock插件，处理mock
|   |   |-- unplugin.js                 // unplugin相关插件，包含DefineOptions和自动导入
|   |-- script                          // 打包完成后执行的一些node脚本（不重要）
|       |-- build-cname.js              // 自动生成cname
|-- drop                                // 弃用文件
|-- mock                                // mock
|   |-- utils.js                        // mock请求需要用到的工具方法
|   |-- api                             // mock接口
|-- public                              // 公共资源，文件夹下的文件会在打包后会直接加到dist根目录下
|-- settings                            // 项目配置
|   |-- proxy-config.js                 // 代理配置文件
|   |-- theme.json                      // 主题配置项，主题色等
|-- src
|   |-- api                             // 公共api
|   |-- assets                          // 静态资源
|   |   |-- images                      // 图片
|   |   |-- svg                         // svg图标
|   |-- components                      // 全局组件
|   |   |-- common                      // 公共组件
|   |   |-- icon                        // icon相关组件
|   |   |-- page                        // 页面组件
|   |   |-- query-bar                   // 查询选项
|   |   |-- table                       // 封装的表格组件
|   |-- composables                     // 封装的组合式函数
|   |-- layout                          // 布局相关组件
|   |   |-- components
|   |       |-- AppMain.vue             // 主体内容
|   |       |-- header                  // 头部
|   |       |-- sidebar                 // 侧边菜单栏
|   |       |-- tags                    // 多页签栏
|   |-- router                          // 路由
|   |   |-- guard                       // 路由守卫
|   |   |-- routes                      // 路由列表
|   |-- store                           // 状态管理（pinia）
|   |   |-- modules                     // 模块
|   |       |-- app                     // 管理页面重新加载、折叠菜单栏和keepAlive等
|   |       |-- permission              // 权限相关，管理权限菜单
|   |       |-- tags                    // 管理多页签
|   |       |-- user                    // 用户模块，管理用户信息、登录登出
|   |-- styles                          // 样式
|   |-- utils                           // 封装的工具方法
|   |   |-- auth                        // 权限相关，如token、跳转登录页等
|   |   |-- common                      // 通用
|   |   |-- http                        // 封装axios
|   |   |-- storage                     // 封装localStorage和sessionStorage
|   |-- views                           // 页面
|   |   |-- admin                       // 管理员管理页面
|   |   |-- api                         // 请求接口
|   |   |-- interface                   // 接口页面
|   |   |-- login                       // 登录页面
|   |   |-- list                        // 医生查看病人列表
|   |   |-- personalCenter              // 个人中心
|   |   |-- workbench                   // 首页  
|   |   |-- quota                       // 配额管理
|   |   |-- readme                      // 项目说明
|   |   |-- Register                    // 注册页面
|   |   |-- review                      // 阅片界面
|   |   |-- workbenchfordocker          // 医生工作台
|   |-- App.vue
|   |-- main.js
|-- .cz-config.js                       // git提交配置
|-- .editorconfig                       // 编辑器配置
|-- .env                                // 环境文件，所有环境都会载入
|-- .env.development                    // 开发环境文件
|-- .env.production                     // 生产环境文件
|-- .env.test                           // 测试环境文件
|-- .eslintignore                       // eslint忽略
|-- .eslintrc.js                        // eslint配置
|-- .gitignore                          // git忽略
|-- .prettierignore                     // prettier格式化忽略
|-- commitlint.config.js                // commitlint规范配置
|-- index.html                          
|-- jsconfig.json                       // js配置
|-- LICENSE                             // 协议
|-- package.json                        // 依赖描述文件
|-- pnpm-lock.yaml                      // 依赖锁定文件
|-- prettier.config.js                  // prettier格式化配置
|-- README.md                           // 项目描述文档（英文）
|-- README.zh-CN.md                     // 项目描述文档（中文）
|-- unocss.config.js                    // unocss配置
|-- vite.config.js                      // vite配置
```