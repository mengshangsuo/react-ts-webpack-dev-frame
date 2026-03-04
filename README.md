# react-ts-webpack-dev-frame

react 开发前端框架

```sh

# install
yarn install

# dev serve
yarn dev
```

## 特性

- 支持`Typescript`
- 支持`React`、`JSX`语法
- 支持`ES6`语法
- 支持`Less module`
- 支持`Eslint`、`Prettier`、`Pre-commit hook`
- 支持`HMR`快速热更新
- 支持`Antd`按需引入与主题样式覆盖
- 支持`Proxy`代理、`alias`别名

## 目录结构

```js
├── .husky                              // git hook 配置文件
├── dist                                // 默认的 build 输出目录
├── config                              // 全局配置文件 webpack打包配置
├── public                              // 静态文件
├── test                                // 测试文件
└── src                                 // 源码目录
    ├── assets                          // 公共的文件（如image、css、font等）
    ├── components                      // 项目组件
    ├── constants                       // 常量/接口地址等
    ├── layout                          // 全局布局
    ├── routes                          // 路由
    ├── store                           // 状态管理器
    ├── utils                           // 工具库
    ├── pages                           // 页面模块
        ├── Home                        // Home模块，建议组件统一大写开头
        ├── ...
    ├── App.tsx                         // react顶层文件
    ├── index.ts                        // 项目入口文件
    ├── typing.d.ts                     // ts类型文件
├── .editorconfig                       // IDE格式规范
├── .env                                // 环境变量
├── .eslintignore                       // eslint忽略
├── .eslintrc                           // eslint配置文件
├── .gitignore                          // git忽略
├── .npmrc                              // npm配置文件
├── .prettierignore                     // prettierc忽略
├── .prettierrc                         // prettierc配置文件
├── .stylelintrc                        // stylelint配置文件
├── .babel.config.js                    // babel配置文件
├── commitlint.config.js                // git commit lint 配置文件
├── LICENSE.md                          // LICENSE
├── package.json                        // package
├── postcss.config.js                   // postcss
├── README.md                           // README
├── setupEnzyme.ts                      // enzyme 测试配置文件
├── tsconfig.eslint.json                // eslint拓展typescript配置文件
└── tsconfig.json                       // tsconfig
```

## git部署

当向dev分支push代码的时候，会触发打包部署，部署后的访问地址是：https://mengshangsuo.github.io/react-ts-webpack-dev-frame

## 更新

lint 配置调整优化

热更新调整、bug fix
  - 热更新插件 react-hot-loader 改用 react-refresh

国际化采用 react-i18next实现  可参考知乎:https://juejin.cn/post/7380579033547702309?searchId=202501030914069B181C2C4C65B213705D
