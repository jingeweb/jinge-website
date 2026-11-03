---
title: 路由入门
description: 为单页应用建立清晰的页面结构。
group: 路由
---

## 安装

```sh
pnpm add jinge-router
```

应用 TSX 仍需要 Jinge 编译器。路由库与运行时应使用兼容版本。

## 定义页面

```tsx
import { Router, RouterView, RouterHref, createRouter } from 'jinge-router';

function Home() {
  return <h1>首页</h1>;
}
function About() {
  return <h1>关于</h1>;
}

const router = createRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
  ],
});

function App() {
  return (
    <Router router={router}>
      <nav>
        <RouterHref to="/about">关于</RouterHref>
      </nav>
      <RouterView />
    </Router>
  );
}
```

## 导航状态

`RouterHref` 的 `activeClass` 可让当前栏目持续高亮；`exactActiveClass` 表示精确匹配。需要自定义链接结构时使用 RouterLink。

## 页面在哪里运行

History 模式使用正常路径，但需要静态入口或服务器回退；hash 模式无需处理服务器子路由。查看[构建与部署](/guide/deployment/)。

## 试一试

[路由交互演示](/examples/router-navigation/)提供用户参数、query、嵌套布局和历史前进后退。地址栏只影响预览内部，便于观察页面切换。
