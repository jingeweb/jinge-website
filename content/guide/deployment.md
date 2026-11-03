---
title: 构建与部署
description: 把应用交付为静态资源。
group: 工程
---

## 生产构建

```sh
pnpm exec vite build
pnpm exec vite preview
```

Vite 插件默认在开发模式解析到 `jinge/dev`，生产构建使用正常的生产入口。HMR 服务于开发阶段，生产包依赖 Tree Shaking 去除相关代码。

## History 与 hash

HTML5 History 路由需要服务器将未知页面路径回退到入口 HTML。GitHub Pages 没有通用的服务器 rewrite 配置；简单 SPA 可以使用 hash 模式，公开文档站也可以在构建时为每个路径输出真实 HTML。

```ts
const router = createRouter({
  mode: 'hash',
  routes: [{ path: '/', component: Home }],
});
```

## 子目录部署

Vite 的 `base` 管理静态资源路径；路由的 `baseHref` 管理路由路径前缀。这两个配置承担不同职责。在 hash 模式下，`baseHref` 位于 hash 内，不要因为 HTML 部署在子目录就机械地添加同样的路由前缀。

## 官网如何部署

本官网为文档和示例页面生成独立 HTML，站内导航使用 jinge-router。已知路径刷新时由 Pages 返回真实文件；未知路径显示 404。`public/CNAME` 声明域名 `jinge.embjs.com`。

项目提供 GitHub Actions 工作流。仓库 Settings → Pages 的来源选择 GitHub Actions，然后在域名 DNS 中将 `jinge` 的 CNAME 指向所属账号的 `账号.github.io`。Pages 中配置自定义域名并启用 HTTPS。

## 兼容与验证

上线前测试直接访问子页、前进后退、资源加载和移动端布局。框架和编译器应使用兼容版本；当前官网锁定 Jinge 4.2 系列。
