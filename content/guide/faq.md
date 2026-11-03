---
title: 常见问题
description: 遇到问题时，从更新链路和工程配置开始。
group: 工程
---

## 为什么修改变量后界面没有变化？

确认数据经过 `vm()` 包装，模板读取的是 VM 属性，并且 TSX 由 `jingeVitePlugin()` 编译。普通变量快照、原始对象的直接修改，不会自动通知模板。

## 能直接使用 React 组件吗？

TSX 是语法格式，不代表共享运行时。React 组件依赖 React 的渲染和状态机制，不能直接当作 Jinge 组件使用。普通 DOM 库可以通过 Ref 与生命周期接入。

## 支持服务端渲染吗？

当前这套代码面向浏览器 DOM。官网通过构建脚本生成静态文档 HTML，再在浏览器启动 Jinge；这不是框架级 SSR 或 hydration 能力的承诺。

## 为什么刷新路由页面会 404？

History 模式需要服务器回退，或者为公开路径输出真实 HTML。静态 SPA 可选 hash 模式，见[部署](/guide/deployment/)。

## 有在线编辑器吗？

目前提供可操作预览与源码阅读。Playground 已列入项目 TODO，前置工作是 jinge-compiler 接入 Rspack，并支持通过 WASM 形态接入 Rspack 的编译链路。

## 如何报告问题？

到对应的 GitHub 仓库提交 Issue，附最小复现、版本、浏览器与构建步骤。运行时、编译器和路由仓库可在[生态页面](/ecosystem/)找到。
