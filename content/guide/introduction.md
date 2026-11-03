---
title: 认识 Jinge
description: 标准 TSX，轻巧的响应式应用。
group: 开始
---

## 写你熟悉的 TypeScript

Jinge 是面向浏览器界面的 MVVM 框架。组件由函数定义，使用标准 TSX 描述模板，使用 `vm()` 创建响应式数据。运行时基于 ES Proxy，模板经编译器转换为 DOM 操作与数据监听，不使用虚拟 DOM。

```tsx
import { bootstrap, vm } from 'jinge';

function App() {
  const state = vm({ count: 0 });
  return <button on:click={() => state.count++}>Count: {state.count}</button>;
}

bootstrap(App, document.getElementById('app')!);
```

## 三个协作的部分

| 包             | 职责                                                 |
| -------------- | ---------------------------------------------------- |
| jinge          | 响应式数据、组件、DOM 更新与生命周期                 |
| jinge-compiler | 基于 Rust / SWC 编译 TSX，提供 Vite 插件与国际化工具 |
| jinge-router   | SPA 导航、嵌套布局、响应式路径参数与 query           |

## 适合怎样的项目

从独立界面、小型工具到有多个页面和共享组件的 SPA，都可以从函数组件与响应式状态开始组织。Jinge 当前的工程集成以 Vite 为主。组件库、调试工具和第三方适配应按项目需要评估。

## 接下来

从[快速开始](/guide/quick-start/)搭建项目，再通过[交互示例](/examples/)学习具体功能。熟悉 Vue 或 React，可以先阅读[迁移心智模型](/guide/from-vue-react/)。
